// =============================================================================
// PREGUNTAS PAA (PEOPLE ALSO ASK) - LONG TAIL SEO
// =============================================================================
// Preguntas frecuentes que aparecen en Google para capturar featured snippets
// =============================================================================

export interface PAAQuestion {
  slug: string
  question: string
  profession: string
  professionName: string
  category: "precio" | "tiempo" | "disponibilidad" | "calidad" | "emergencia" | "comparativa"
  citySpecific: boolean
}

// Preguntas genéricas (se combinan con ciudades)
export const PAA_QUESTIONS: PAAQuestion[] = [
  // PRECIO
  {
    slug: "cuanto-cobra-electricista-por-hora",
    question: "¿Cuánto cobra un electricista por hora?",
    profession: "electricista",
    professionName: "Electricista",
    category: "precio",
    citySpecific: true,
  },
  {
    slug: "cuanto-cuesta-arreglar-enchufe",
    question: "¿Cuánto cuesta arreglar un enchufe?",
    profession: "electricista",
    professionName: "Electricista",
    category: "precio",
    citySpecific: true,
  },
  {
    slug: "cuanto-cobra-fontanero-desatascar",
    question: "¿Cuánto cobra un fontanero por desatascar?",
    profession: "fontanero",
    professionName: "Fontanero",
    category: "precio",
    citySpecific: true,
  },
  {
    slug: "cuanto-cuesta-cambiar-grifo",
    question: "¿Cuánto cuesta cambiar un grifo?",
    profession: "fontanero",
    professionName: "Fontanero",
    category: "precio",
    citySpecific: true,
  },
  {
    slug: "cuanto-cobra-cerrajero-abrir-puerta",
    question: "¿Cuánto cobra un cerrajero por abrir una puerta?",
    profession: "cerrajero",
    professionName: "Cerrajero",
    category: "precio",
    citySpecific: true,
  },
  {
    slug: "cuanto-cuesta-cambiar-cerradura",
    question: "¿Cuánto cuesta cambiar una cerradura?",
    profession: "cerrajero",
    professionName: "Cerrajero",
    category: "precio",
    citySpecific: true,
  },
  {
    slug: "cuanto-cuesta-desatascar-tuberia",
    question: "¿Cuánto cuesta desatascar una tubería?",
    profession: "desatascos",
    professionName: "Desatascos",
    category: "precio",
    citySpecific: true,
  },
  {
    slug: "cuanto-cuesta-revision-caldera",
    question: "¿Cuánto cuesta la revisión de una caldera?",
    profession: "calderas",
    professionName: "Calderas",
    category: "precio",
    citySpecific: true,
  },
  
  // TIEMPO
  {
    slug: "cuanto-tarda-electricista-en-llegar",
    question: "¿Cuánto tarda un electricista en llegar?",
    profession: "electricista",
    professionName: "Electricista",
    category: "tiempo",
    citySpecific: true,
  },
  {
    slug: "cuanto-tarda-fontanero-urgente",
    question: "¿Cuánto tarda un fontanero urgente?",
    profession: "fontanero",
    professionName: "Fontanero",
    category: "tiempo",
    citySpecific: true,
  },
  {
    slug: "cuanto-tarda-cerrajero-abrir-puerta",
    question: "¿Cuánto tarda un cerrajero en abrir una puerta?",
    profession: "cerrajero",
    professionName: "Cerrajero",
    category: "tiempo",
    citySpecific: true,
  },
  
  // DISPONIBILIDAD
  {
    slug: "hay-electricistas-24-horas",
    question: "¿Hay electricistas 24 horas?",
    profession: "electricista",
    professionName: "Electricista",
    category: "disponibilidad",
    citySpecific: true,
  },
  {
    slug: "fontanero-domingo-urgente",
    question: "¿Hay fontaneros que trabajen en domingo?",
    profession: "fontanero",
    professionName: "Fontanero",
    category: "disponibilidad",
    citySpecific: true,
  },
  {
    slug: "cerrajero-nocturno-precio",
    question: "¿Cuánto cobra un cerrajero de noche?",
    profession: "cerrajero",
    professionName: "Cerrajero",
    category: "disponibilidad",
    citySpecific: true,
  },
  {
    slug: "desatascos-festivos",
    question: "¿Hay servicio de desatascos en festivos?",
    profession: "desatascos",
    professionName: "Desatascos",
    category: "disponibilidad",
    citySpecific: true,
  },
  
  // EMERGENCIA
  {
    slug: "que-hacer-si-no-hay-luz-en-casa",
    question: "¿Qué hacer si no hay luz en casa?",
    profession: "electricista",
    professionName: "Electricista",
    category: "emergencia",
    citySpecific: false,
  },
  {
    slug: "que-hacer-si-hay-fuga-de-agua",
    question: "¿Qué hacer si hay una fuga de agua?",
    profession: "fontanero",
    professionName: "Fontanero",
    category: "emergencia",
    citySpecific: false,
  },
  {
    slug: "que-hacer-si-me-quedo-fuera-de-casa",
    question: "¿Qué hacer si me quedo fuera de casa?",
    profession: "cerrajero",
    professionName: "Cerrajero",
    category: "emergencia",
    citySpecific: false,
  },
  {
    slug: "que-hacer-si-se-atasca-el-water",
    question: "¿Qué hacer si se atasca el váter?",
    profession: "desatascos",
    professionName: "Desatascos",
    category: "emergencia",
    citySpecific: false,
  },
  {
    slug: "que-hacer-si-la-caldera-no-enciende",
    question: "¿Qué hacer si la caldera no enciende?",
    profession: "calderas",
    professionName: "Calderas",
    category: "emergencia",
    citySpecific: false,
  },
  
  // CALIDAD/CONFIANZA
  {
    slug: "como-saber-si-electricista-es-bueno",
    question: "¿Cómo saber si un electricista es bueno?",
    profession: "electricista",
    professionName: "Electricista",
    category: "calidad",
    citySpecific: false,
  },
  {
    slug: "como-elegir-fontanero-confianza",
    question: "¿Cómo elegir un fontanero de confianza?",
    profession: "fontanero",
    professionName: "Fontanero",
    category: "calidad",
    citySpecific: false,
  },
  {
    slug: "como-evitar-timos-cerrajeros",
    question: "¿Cómo evitar timos de cerrajeros?",
    profession: "cerrajero",
    professionName: "Cerrajero",
    category: "calidad",
    citySpecific: false,
  },
  
  // COMPARATIVAS
  {
    slug: "mejor-electricista-cerca-de-mi",
    question: "¿Cuál es el mejor electricista cerca de mí?",
    profession: "electricista",
    professionName: "Electricista",
    category: "comparativa",
    citySpecific: true,
  },
  {
    slug: "fontanero-mas-barato",
    question: "¿Cuál es el fontanero más barato?",
    profession: "fontanero",
    professionName: "Fontanero",
    category: "comparativa",
    citySpecific: true,
  },
  {
    slug: "cerrajero-mas-rapido",
    question: "¿Cuál es el cerrajero más rápido?",
    profession: "cerrajero",
    professionName: "Cerrajero",
    category: "comparativa",
    citySpecific: true,
  },
]

// Ciudades principales para combinar con preguntas
export const TOP_CITIES_PAA = [
  { slug: "barcelona", name: "Barcelona" },
  { slug: "hospitalet-de-llobregat", name: "L'Hospitalet" },
  { slug: "badalona", name: "Badalona" },
  { slug: "terrassa", name: "Terrassa" },
  { slug: "sabadell", name: "Sabadell" },
  { slug: "mataro", name: "Mataró" },
  { slug: "girona", name: "Girona" },
  { slug: "tarragona", name: "Tarragona" },
  { slug: "lleida", name: "Lleida" },
  { slug: "reus", name: "Reus" },
]

// Generar respuestas dinámicas
export function generatePAAAnswer(question: PAAQuestion, cityName?: string): string {
  const location = cityName ? ` en ${cityName}` : ""
  
  const answers: Record<string, string> = {
    "cuanto-cobra-electricista-por-hora": `Un electricista${location} cobra entre 30€ y 50€ por hora de media. En Servicios Hogar, nuestros electricistas profesionales tienen tarifas desde 39€, con presupuesto gratis y sin compromiso. Llama al 711 267 223 para un presupuesto exacto.`,
    
    "cuanto-cuesta-arreglar-enchufe": `Arreglar un enchufe${location} cuesta entre 40€ y 80€ dependiendo del problema. En Servicios Hogar ofrecemos reparación de enchufes desde 39€ con garantía. Llegamos en 10 minutos. Llama: 711 267 223.`,
    
    "cuanto-cobra-fontanero-desatascar": `Un fontanero${location} cobra entre 60€ y 150€ por desatascar, según la gravedad. En Servicios Hogar, desatascos desde 49€ con máquinas profesionales. Servicio 24h. Llama: 711 267 223.`,
    
    "cuanto-cuesta-cambiar-grifo": `Cambiar un grifo${location} cuesta entre 50€ y 120€ (mano de obra + materiales). En Servicios Hogar, cambio de grifos desde 45€. Fontaneros profesionales con garantía. Llama: 711 267 223.`,
    
    "cuanto-cobra-cerrajero-abrir-puerta": `Un cerrajero${location} cobra entre 60€ y 150€ por abrir una puerta, según el tipo de cerradura y la hora. En Servicios Hogar, apertura de puertas desde 49€, sin dañar la cerradura. Llegamos en 10 min. Llama: 711 267 223.`,
    
    "cuanto-cuesta-cambiar-cerradura": `Cambiar una cerradura${location} cuesta entre 80€ y 200€ según el modelo. En Servicios Hogar, cambio de cerraduras desde 69€ con cerraduras de seguridad incluidas. Llama: 711 267 223.`,
    
    "cuanto-cuesta-desatascar-tuberia": `Desatascar una tubería${location} cuesta entre 50€ y 200€ según la complejidad. En Servicios Hogar, desatascos profesionales desde 49€ con cámara de inspección incluida. Llama: 711 267 223.`,
    
    "cuanto-cuesta-revision-caldera": `La revisión de una caldera${location} cuesta entre 60€ y 100€. En Servicios Hogar, revisión completa de calderas desde 59€ con certificado oficial. Técnicos autorizados. Llama: 711 267 223.`,
    
    "cuanto-tarda-electricista-en-llegar": `Un electricista urgente${location} de Servicios Hogar llega en menos de 10 minutos. Tenemos profesionales distribuidos por toda la zona para garantizar la respuesta más rápida. Servicio 24h. Llama: 711 267 223.`,
    
    "cuanto-tarda-fontanero-urgente": `Un fontanero urgente${location} de Servicios Hogar llega en 10 minutos máximo. Disponemos de fontaneros de guardia las 24 horas, todos los días del año. Llama: 711 267 223.`,
    
    "cuanto-tarda-cerrajero-abrir-puerta": `Un cerrajero profesional tarda entre 5 y 15 minutos en abrir una puerta sin dañarla. En Servicios Hogar${location}, llegamos en 10 minutos y abrimos en otros 5-10 minutos. Llama: 711 267 223.`,
    
    "hay-electricistas-24-horas": `Sí, en Servicios Hogar tenemos electricistas 24 horas${location}. Trabajamos noches, fines de semana y festivos sin recargo adicional. Llegamos en 10 minutos. Llama: 711 267 223.`,
    
    "fontanero-domingo-urgente": `Sí, en Servicios Hogar tenemos fontaneros que trabajan domingos y festivos${location}. Servicio de urgencias 24/7 sin recargo. Llegamos en 10 minutos. Llama: 711 267 223.`,
    
    "cerrajero-nocturno-precio": `Un cerrajero de noche${location} en Servicios Hogar tiene el mismo precio que de día: desde 49€. No cobramos recargo nocturno ni por festivos. Servicio 24h. Llama: 711 267 223.`,
    
    "desatascos-festivos": `Sí, en Servicios Hogar ofrecemos servicio de desatascos en festivos${location}. Trabajamos 24/7 los 365 días del año sin recargo. Llegamos en 10 minutos. Llama: 711 267 223.`,
    
    "que-hacer-si-no-hay-luz-en-casa": `Si no hay luz en casa: 1) Comprueba el cuadro eléctrico y sube los interruptores. 2) Verifica si hay luz en el edificio. 3) Si el problema persiste, llama a un electricista urgente. En Servicios Hogar llegamos en 10 minutos. Llama: 711 267 223.`,
    
    "que-hacer-si-hay-fuga-de-agua": `Si hay una fuga de agua: 1) Cierra la llave de paso general inmediatamente. 2) Corta la luz si el agua está cerca de enchufes. 3) Llama a un fontanero urgente. En Servicios Hogar llegamos en 10 minutos. Llama: 711 267 223.`,
    
    "que-hacer-si-me-quedo-fuera-de-casa": `Si te quedas fuera de casa: 1) Mantén la calma. 2) Comprueba ventanas o puertas alternativas. 3) Llama a un cerrajero profesional. En Servicios Hogar abrimos tu puerta en 10 minutos sin dañar la cerradura. Llama: 711 267 223.`,
    
    "que-hacer-si-se-atasca-el-water": `Si se atasca el váter: 1) No sigas tirando de la cadena. 2) Usa un desatascador de ventosa. 3) Si no funciona, llama a profesionales. En Servicios Hogar desatascamos en 10 minutos con garantía. Llama: 711 267 223.`,
    
    "que-hacer-si-la-caldera-no-enciende": `Si la caldera no enciende: 1) Comprueba que hay gas y luz. 2) Verifica la presión (debe estar entre 1 y 1.5 bar). 3) Reinicia la caldera. 4) Si sigue sin funcionar, llama a un técnico. En Servicios Hogar llegamos en 10 minutos. Llama: 711 267 223.`,
    
    "como-saber-si-electricista-es-bueno": `Para saber si un electricista es bueno: 1) Pide referencias y opiniones. 2) Verifica que tenga carnet de instalador autorizado. 3) Exige presupuesto por escrito. 4) Comprueba que ofrezca garantía. En Servicios Hogar todos nuestros electricistas están certificados.`,
    
    "como-elegir-fontanero-confianza": `Para elegir un fontanero de confianza: 1) Busca opiniones online. 2) Pide presupuesto sin compromiso. 3) Verifica que tenga seguro de responsabilidad civil. 4) Exige factura. En Servicios Hogar cumplimos todos estos requisitos.`,
    
    "como-evitar-timos-cerrajeros": `Para evitar timos de cerrajeros: 1) Pide precio cerrado antes de que vengan. 2) Desconfía de precios muy bajos. 3) Exige factura con NIF. 4) Usa empresas con sede física. En Servicios Hogar ofrecemos precios transparentes desde 49€.`,
    
    "mejor-electricista-cerca-de-mi": `El mejor electricista${location} es aquel que llega rápido, tiene buenos precios y ofrece garantía. En Servicios Hogar cumplimos todo: llegamos en 10 minutos, precios desde 39€ y garantía por escrito. Llama: 711 267 223.`,
    
    "fontanero-mas-barato": `El fontanero más barato${location} con calidad garantizada es Servicios Hogar. Precios desde 39€, sin sorpresas ni recargos. Presupuesto gratis. Llegamos en 10 minutos. Llama: 711 267 223.`,
    
    "cerrajero-mas-rapido": `El cerrajero más rápido${location} es Servicios Hogar. Llegamos en menos de 10 minutos a cualquier punto. Abrimos tu puerta sin dañar la cerradura. Servicio 24h. Llama: 711 267 223.`,
  }
  
  return answers[question.slug] || `Contacta con Servicios Hogar${location} para resolver tu duda. Profesionales 24h. Llama: 711 267 223.`
}

// Generar todas las combinaciones para sitemap
export function generatePAACombinations() {
  const combinations: { slug: string; city?: string }[] = []
  
  for (const question of PAA_QUESTIONS) {
    if (question.citySpecific) {
      for (const city of TOP_CITIES_PAA) {
        combinations.push({
          slug: `${question.slug}-${city.slug}`,
          city: city.slug,
        })
      }
    } else {
      combinations.push({ slug: question.slug })
    }
  }
  
  return combinations
}
