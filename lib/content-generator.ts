/**
 * Sistema de Generación de Contenido Único Programático
 * 
 * Genera contenido único para cada página combinando:
 * 1. Hash de la ciudad → selecciona variantes de texto
 * 2. Datos derivados (código provincia, población estimada)
 * 3. Frases rotativas basadas en el hash
 * 4. Estadísticas "únicas" generadas deterministicamente
 */

// Función hash simple para generar número consistente por ciudad
function hashCity(citySlug: string): number {
  let hash = 0
  for (let i = 0; i < citySlug.length; i++) {
    const char = citySlug.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Provincias de España con códigos
const PROVINCE_DATA: Record<string, { name: string; code: string; region: string }> = {
  "01": { name: "Álava", code: "01", region: "País Vasco" },
  "02": { name: "Albacete", code: "02", region: "Castilla-La Mancha" },
  "03": { name: "Alicante", code: "03", region: "Comunidad Valenciana" },
  "04": { name: "Almería", code: "04", region: "Andalucía" },
  "05": { name: "Ávila", code: "05", region: "Castilla y León" },
  "06": { name: "Badajoz", code: "06", region: "Extremadura" },
  "07": { name: "Baleares", code: "07", region: "Islas Baleares" },
  "08": { name: "Barcelona", code: "08", region: "Cataluña" },
  "09": { name: "Burgos", code: "09", region: "Castilla y León" },
  "10": { name: "Cáceres", code: "10", region: "Extremadura" },
  "11": { name: "Cádiz", code: "11", region: "Andalucía" },
  "12": { name: "Castellón", code: "12", region: "Comunidad Valenciana" },
  "13": { name: "Ciudad Real", code: "13", region: "Castilla-La Mancha" },
  "14": { name: "Córdoba", code: "14", region: "Andalucía" },
  "15": { name: "A Coruña", code: "15", region: "Galicia" },
  "16": { name: "Cuenca", code: "16", region: "Castilla-La Mancha" },
  "17": { name: "Girona", code: "17", region: "Cataluña" },
  "18": { name: "Granada", code: "18", region: "Andalucía" },
  "19": { name: "Guadalajara", code: "19", region: "Castilla-La Mancha" },
  "20": { name: "Guipúzcoa", code: "20", region: "País Vasco" },
  "21": { name: "Huelva", code: "21", region: "Andalucía" },
  "22": { name: "Huesca", code: "22", region: "Aragón" },
  "23": { name: "Jaén", code: "23", region: "Andalucía" },
  "24": { name: "León", code: "24", region: "Castilla y León" },
  "25": { name: "Lleida", code: "25", region: "Cataluña" },
  "26": { name: "La Rioja", code: "26", region: "La Rioja" },
  "27": { name: "Lugo", code: "27", region: "Galicia" },
  "28": { name: "Madrid", code: "28", region: "Comunidad de Madrid" },
  "29": { name: "Málaga", code: "29", region: "Andalucía" },
  "30": { name: "Murcia", code: "30", region: "Región de Murcia" },
  "31": { name: "Navarra", code: "31", region: "Navarra" },
  "32": { name: "Ourense", code: "32", region: "Galicia" },
  "33": { name: "Asturias", code: "33", region: "Asturias" },
  "34": { name: "Palencia", code: "34", region: "Castilla y León" },
  "35": { name: "Las Palmas", code: "35", region: "Canarias" },
  "36": { name: "Pontevedra", code: "36", region: "Galicia" },
  "37": { name: "Salamanca", code: "37", region: "Castilla y León" },
  "38": { name: "Santa Cruz de Tenerife", code: "38", region: "Canarias" },
  "39": { name: "Cantabria", code: "39", region: "Cantabria" },
  "40": { name: "Segovia", code: "40", region: "Castilla y León" },
  "41": { name: "Sevilla", code: "41", region: "Andalucía" },
  "42": { name: "Soria", code: "42", region: "Castilla y León" },
  "43": { name: "Tarragona", code: "43", region: "Cataluña" },
  "44": { name: "Teruel", code: "44", region: "Aragón" },
  "45": { name: "Toledo", code: "45", region: "Castilla-La Mancha" },
  "46": { name: "Valencia", code: "46", region: "Comunidad Valenciana" },
  "47": { name: "Valladolid", code: "47", region: "Castilla y León" },
  "48": { name: "Vizcaya", code: "48", region: "País Vasco" },
  "49": { name: "Zamora", code: "49", region: "Castilla y León" },
  "50": { name: "Zaragoza", code: "50", region: "Aragón" },
  "51": { name: "Ceuta", code: "51", region: "Ceuta" },
  "52": { name: "Melilla", code: "52", region: "Melilla" },
}

// Variantes de texto para intro (rotativas por hash)
const INTRO_VARIANTS = [
  (city: string, profession: string) => `¿Buscas un ${profession} de confianza en ${city}? Nuestro equipo de profesionales está disponible las 24 horas para atender cualquier emergencia.`,
  (city: string, profession: string) => `Servicio de ${profession} en ${city} con la máxima rapidez y profesionalidad. Llegamos a tu domicilio en minutos.`,
  (city: string, profession: string) => `En ${city} contamos con ${profession}s certificados listos para resolver tu problema. Sin esperas, sin complicaciones.`,
  (city: string, profession: string) => `Necesitas un ${profession} urgente en ${city}? Estamos disponibles ahora mismo para ayudarte.`,
  (city: string, profession: string) => `Los mejores ${profession}s de ${city} a tu servicio. Profesionales con años de experiencia en la zona.`,
  (city: string, profession: string) => `Servicio express de ${profession} en ${city}. Presupuesto sin compromiso y precios transparentes.`,
  (city: string, profession: string) => `Tu ${profession} de guardia en ${city}. Atendemos urgencias a cualquier hora del día o la noche.`,
  (city: string, profession: string) => `¿Problema urgente en ${city}? Nuestros ${profession}s están preparados para solucionarlo rápidamente.`,
]

// Variantes para sección de garantías
const GUARANTEE_VARIANTS = [
  "Todos nuestros trabajos incluyen garantía por escrito",
  "Garantía total en mano de obra y materiales utilizados",
  "Respaldamos cada servicio con nuestra garantía de satisfacción",
  "Si no quedas satisfecho, te devolvemos el dinero",
  "Garantía extendida en todos los servicios realizados",
]

// Variantes para llamada a la acción
const CTA_VARIANTS = [
  (city: string) => `No esperes más. Los vecinos de ${city} ya confían en nosotros.`,
  (city: string) => `Miles de clientes en ${city} nos avalan. Únete a ellos.`,
  (city: string) => `En ${city} somos la opción preferida. Descubre por qué.`,
  (city: string) => `La solución a tu problema en ${city} está a una llamada.`,
  (city: string) => `Profesionales de ${city} listos para atenderte ahora.`,
]

// Problemas comunes por profesión (para generar contenido específico)
const COMMON_ISSUES: Record<string, string[]> = {
  electricista: [
    "cortocircuitos y apagones",
    "instalaciones eléctricas antiguas",
    "cuadros eléctricos que saltan",
    "enchufes que no funcionan",
    "problemas con el diferencial",
  ],
  fontanero: [
    "fugas de agua urgentes",
    "tuberías atascadas",
    "problemas con el calentador",
    "grifos que gotean",
    "humedades en paredes",
  ],
  cerrajero: [
    "puertas bloqueadas",
    "llaves rotas en la cerradura",
    "cerraduras de seguridad",
    "cambios de bombín",
    "aperturas de emergencia",
  ],
  desatascos: [
    "atascos en el WC",
    "fregaderos obstruidos",
    "bajantes atascados",
    "malos olores en tuberías",
    "arquetas bloqueadas",
  ],
  calderas: [
    "calderas que no encienden",
    "falta de agua caliente",
    "ruidos extraños en la caldera",
    "fugas de gas",
    "revisiones obligatorias",
  ],
}

// Genera estadísticas "únicas" basadas en hash (pero consistentes)
function generateStats(cityHash: number) {
  const baseServices = 150 + (cityHash % 350) // 150-500 servicios
  const baseYears = 8 + (cityHash % 12) // 8-20 años
  const baseRating = 4.7 + ((cityHash % 3) * 0.1) // 4.7-4.9
  const baseTime = 8 + (cityHash % 7) // 8-15 minutos
  
  return {
    servicesThisMonth: baseServices,
    yearsExperience: baseYears,
    rating: baseRating.toFixed(1),
    avgResponseTime: baseTime,
    satisfactionRate: 95 + (cityHash % 5), // 95-99%
  }
}

// Genera código postal aproximado basado en provincia
function generatePostalCode(provinceCode: string, cityHash: number): string {
  const suffix = String(cityHash % 1000).padStart(3, '0')
  return `${provinceCode}${suffix}`
}

export interface UniqueContent {
  intro: string
  guarantee: string
  cta: string
  issues: string[]
  stats: {
    servicesThisMonth: number
    yearsExperience: number
    rating: string
    avgResponseTime: number
    satisfactionRate: number
  }
  localInfo: {
    province: string
    region: string
    postalCodeExample: string
  }
  seoText: string
}

/**
 * Genera contenido único para una página basándose en ciudad y profesión
 * El contenido es DETERMINÍSTICO - siempre genera lo mismo para la misma ciudad
 */
export function generateUniqueContent(
  citySlug: string,
  cityName: string,
  professionId: string,
  professionName: string,
  provinceCode?: string
): UniqueContent {
  const hash = hashCity(citySlug + professionId)
  
  // Seleccionar variantes basadas en hash
  const introVariant = INTRO_VARIANTS[hash % INTRO_VARIANTS.length]
  const guaranteeVariant = GUARANTEE_VARIANTS[hash % GUARANTEE_VARIANTS.length]
  const ctaVariant = CTA_VARIANTS[hash % CTA_VARIANTS.length]
  
  // Obtener problemas específicos de la profesión
  const allIssues = COMMON_ISSUES[professionId] || COMMON_ISSUES.electricista
  // Rotar qué problemas mostrar primero
  const rotatedIssues = [...allIssues.slice(hash % allIssues.length), ...allIssues.slice(0, hash % allIssues.length)]
  
  // Estadísticas generadas
  const stats = generateStats(hash)
  
  // Info local
  const provCode = provinceCode || "08" // Default Barcelona (Cataluña)
  const province = PROVINCE_DATA[provCode] || PROVINCE_DATA["08"]
  const postalCode = generatePostalCode(provCode, hash)
  
  // Generar texto SEO único combinando elementos
  const seoText = generateSeoText(cityName, professionName, province.region, stats, rotatedIssues, hash)
  
  return {
    intro: introVariant(cityName, professionName.toLowerCase()),
    guarantee: guaranteeVariant,
    cta: ctaVariant(cityName),
    issues: rotatedIssues,
    stats,
    localInfo: {
      province: province.name,
      region: province.region,
      postalCodeExample: postalCode,
    },
    seoText,
  }
}

// Genera párrafo SEO único combinando múltiples elementos
function generateSeoText(
  cityName: string,
  professionName: string,
  region: string,
  stats: ReturnType<typeof generateStats>,
  issues: string[],
  hash: number
): string {
  const templates = [
    () => `Nuestro servicio de ${professionName.toLowerCase()} en ${cityName} cuenta con ${stats.yearsExperience} años de experiencia atendiendo a los vecinos de ${region}. Este mes ya hemos realizado ${stats.servicesThisMonth} servicios en la zona, especializándonos en ${issues[0]} y ${issues[1]}. Con un tiempo medio de respuesta de ${stats.avgResponseTime} minutos y una valoración de ${stats.rating}/5, somos la opción preferida en ${cityName}.`,
    
    () => `En ${cityName}, ${region}, llevamos ${stats.yearsExperience} años siendo el ${professionName.toLowerCase()} de referencia. Nuestros técnicos están especialmente preparados para resolver ${issues[0]}, ${issues[1]} y ${issues[2]}. Con ${stats.satisfactionRate}% de clientes satisfechos y más de ${stats.servicesThisMonth} intervenciones mensuales, garantizamos un servicio de calidad.`,
    
    () => `¿Por qué elegir nuestro servicio de ${professionName.toLowerCase()} en ${cityName}? Porque conocemos ${region} como nadie. ${stats.yearsExperience} años resolviendo ${issues[0]} y ${issues[1]} nos avalan. Llegamos en ${stats.avgResponseTime} minutos de media y mantenemos un ${stats.rating} en valoraciones.`,
    
    () => `Los habitantes de ${cityName} confían en nosotros para sus problemas de ${issues[0]}, ${issues[1]} y ${issues[2]}. Como ${professionName.toLowerCase()}s con ${stats.yearsExperience} años en ${region}, ofrecemos respuesta en ${stats.avgResponseTime} minutos. Más de ${stats.servicesThisMonth} servicios este mes con ${stats.satisfactionRate}% de satisfacción.`,
  ]
  
  return templates[hash % templates.length]()
}

/**
 * Genera variantes de testimonios basados en la ciudad
 */
export function generateTestimonials(citySlug: string, cityName: string, professionName: string) {
  const hash = hashCity(citySlug)
  
  const firstNames = ["María", "Carlos", "Ana", "José", "Laura", "Pedro", "Carmen", "Antonio", "Isabel", "Manuel", "Lucía", "Francisco"]
  const lastInitials = ["G", "R", "M", "L", "S", "P", "F", "T", "V", "N"]
  
  const templates = [
    "Vinieron en menos de 15 minutos. Muy profesionales y el precio justo.",
    "Excelente servicio. Resolvieron el problema rápidamente.",
    "Los recomiendo 100%. Puntuales y muy limpios trabajando.",
    "Llamé a las 11 de la noche y vinieron enseguida. Muy agradecido.",
    "Presupuesto sin sorpresas y trabajo impecable.",
    "Llevaba días con el problema y lo solucionaron en una hora.",
    "Trato muy amable y precio competitivo.",
    "Segunda vez que les llamo. Siempre responden rápido.",
  ]
  
  const times = ["Hace 2 horas", "Hace 5 horas", "Ayer", "Hace 2 días", "Esta semana"]
  
  return [
    {
      name: `${firstNames[hash % firstNames.length]} ${lastInitials[hash % lastInitials.length]}.`,
      text: templates[hash % templates.length],
      time: times[hash % times.length],
      city: cityName,
    },
    {
      name: `${firstNames[(hash + 3) % firstNames.length]} ${lastInitials[(hash + 2) % lastInitials.length]}.`,
      text: templates[(hash + 2) % templates.length],
      time: times[(hash + 1) % times.length],
      city: cityName,
    },
    {
      name: `${firstNames[(hash + 7) % firstNames.length]} ${lastInitials[(hash + 5) % lastInitials.length]}.`,
      text: templates[(hash + 4) % templates.length],
      time: times[(hash + 2) % times.length],
      city: cityName,
    },
  ]
}
