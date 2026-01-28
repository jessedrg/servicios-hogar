export interface PostalCodeData {
  cp: string
  poblacio: string
  provincia: string
  provinciaId: string
}

export interface PostalCodeGroup {
  cp: string
  poblaciones: string[]
  provincia: string
  provinciaId: string
}

// Mapeo de provincias a nombres más amigables
const PROVINCIA_NAMES: Record<string, string> = {
  '01': 'Álava',
  '02': 'Albacete',
  '03': 'Alicante',
  '04': 'Almería',
  '05': 'Ávila',
  '06': 'Badajoz',
  '07': 'Baleares',
  '08': 'Barcelona',
  '09': 'Burgos',
  '10': 'Cáceres',
  '11': 'Cádiz',
  '12': 'Castellón',
  '13': 'Ciudad Real',
  '14': 'Córdoba',
  '15': 'A Coruña',
  '16': 'Cuenca',
  '17': 'Girona',
  '18': 'Granada',
  '19': 'Guadalajara',
  '20': 'Guipúzcoa',
  '21': 'Huelva',
  '22': 'Huesca',
  '23': 'Jaén',
  '24': 'León',
  '25': 'Lleida',
  '26': 'La Rioja',
  '27': 'Lugo',
  '28': 'Madrid',
  '29': 'Málaga',
  '30': 'Murcia',
  '31': 'Navarra',
  '32': 'Ourense',
  '33': 'Asturias',
  '34': 'Palencia',
  '35': 'Las Palmas',
  '36': 'Pontevedra',
  '37': 'Salamanca',
  '38': 'Santa Cruz de Tenerife',
  '39': 'Cantabria',
  '40': 'Segovia',
  '41': 'Sevilla',
  '42': 'Soria',
  '43': 'Tarragona',
  '44': 'Teruel',
  '45': 'Toledo',
  '46': 'Valencia',
  '47': 'Valladolid',
  '48': 'Vizcaya',
  '49': 'Zamora',
  '50': 'Zaragoza',
  '51': 'Ceuta',
  '52': 'Melilla',
}

// Datos de barrios de Barcelona por código postal
const BARCELONA_BARRIOS: Record<string, string> = {
  '08001': 'El Raval',
  '08002': 'Barri Gòtic',
  '08003': 'La Barceloneta',
  '08004': 'Poble Sec',
  '08005': 'El Poblenou',
  '08006': 'Gràcia',
  '08007': 'Eixample Dret',
  '08008': 'Eixample Dret',
  '08009': 'Eixample Dret',
  '08010': 'Eixample Dret',
  '08011': 'Eixample Esquerre',
  '08012': 'Gràcia',
  '08013': 'Camp de l\'Arpa',
  '08014': 'Les Corts',
  '08015': 'Eixample Esquerre',
  '08016': 'Horta',
  '08017': 'Sarrià-Sant Gervasi',
  '08018': 'El Poblenou',
  '08019': 'Sant Martí',
  '08020': 'Sant Martí',
  '08021': 'Sarrià-Sant Gervasi',
  '08022': 'Sarrià-Sant Gervasi',
  '08023': 'Gràcia',
  '08024': 'Gràcia',
  '08025': 'Camp de l\'Arpa',
  '08026': 'Sant Andreu',
  '08027': 'Sant Andreu',
  '08028': 'Les Corts',
  '08029': 'Les Corts',
  '08030': 'Sant Andreu',
  '08031': 'Nou Barris',
  '08032': 'Horta-Guinardó',
  '08033': 'Nou Barris',
  '08034': 'Pedralbes',
  '08035': 'Horta-Guinardó',
  '08036': 'Eixample Esquerre',
  '08037': 'Eixample Dret',
  '08038': 'Sants-Montjuïc',
  '08039': 'La Barceloneta',
  '08040': 'Zona Franca',
  '08041': 'Horta-Guinardó',
  '08042': 'Nou Barris',
}

// Datos de barrios de Madrid por código postal
const MADRID_BARRIOS: Record<string, string> = {
  '28001': 'Salamanca',
  '28002': 'Salamanca',
  '28003': 'Chamberí',
  '28004': 'Centro',
  '28005': 'Centro',
  '28006': 'Salamanca',
  '28007': 'Retiro',
  '28008': 'Moncloa',
  '28009': 'Retiro',
  '28010': 'Chamberí',
  '28011': 'Carabanchel',
  '28012': 'Centro',
  '28013': 'Centro',
  '28014': 'Centro',
  '28015': 'Chamberí',
  '28016': 'Chamartín',
  '28017': 'Ciudad Lineal',
  '28018': 'Puente de Vallecas',
  '28019': 'Carabanchel',
  '28020': 'Tetuán',
  '28021': 'Villaverde',
  '28022': 'San Blas',
  '28023': 'Aravaca',
  '28024': 'Latina',
  '28025': 'Carabanchel',
  '28026': 'Usera',
  '28027': 'Ciudad Lineal',
  '28028': 'Salamanca',
  '28029': 'Tetuán',
  '28030': 'Moratalaz',
  '28031': 'Villa de Vallecas',
  '28032': 'Vicálvaro',
  '28033': 'Hortaleza',
  '28034': 'Fuencarral',
  '28035': 'Fuencarral',
  '28036': 'Chamartín',
  '28037': 'San Blas',
  '28038': 'Puente de Vallecas',
  '28039': 'Tetuán',
  '28040': 'Moncloa',
  '28041': 'Usera',
  '28042': 'Barajas',
  '28043': 'Hortaleza',
  '28044': 'Latina',
  '28045': 'Arganzuela',
  '28046': 'Chamartín',
  '28047': 'Latina',
  '28048': 'El Pardo',
  '28049': 'Fuencarral',
  '28050': 'Hortaleza',
  '28051': 'Villa de Vallecas',
  '28052': 'Vicálvaro',
  '28053': 'Puente de Vallecas',
  '28054': 'Carabanchel',
  '28055': 'Vicálvaro',
}

// Derivar provincia del código postal (los 2 primeros dígitos)
function getProvinciaFromCP(cp: string): { provinciaId: string; provincia: string } {
  const provinciaId = cp.substring(0, 2)
  return {
    provinciaId,
    provincia: PROVINCIA_NAMES[provinciaId] || 'España',
  }
}

export function getPostalCodeData(cp: string): PostalCodeGroup | null {
  if (!/^\d{5}$/.test(cp)) return null
  
  const { provinciaId, provincia } = getProvinciaFromCP(cp)
  const barrio = BARCELONA_BARRIOS[cp] || MADRID_BARRIOS[cp]
  
  return {
    cp,
    poblaciones: barrio ? [barrio] : [],
    provincia,
    provinciaId,
  }
}

export function getAllPostalCodes(): string[] {
  // Retornar solo los códigos postales top para generateStaticParams
  return getTopPostalCodes()
}

export function getPostalCodesByProvincia(provinciaId: string): PostalCodeGroup[] {
  // No necesitamos esto sin el CSV, retornar array vacío
  return []
}

export function getBarrioName(cp: string): string | null {
  return BARCELONA_BARRIOS[cp] || MADRID_BARRIOS[cp] || null
}

export function getZoneName(cp: string): string {
  const barrio = getBarrioName(cp)
  const data = getPostalCodeData(cp)
  
  if (barrio) return barrio
  if (data && data.poblaciones.length > 0) {
    return data.poblaciones[0]
  }
  return `Zona ${cp}`
}

export function getCityFromPostalCode(cp: string): string {
  // Barcelona
  if (cp.startsWith('080') || cp.startsWith('081') || cp.startsWith('082') || cp.startsWith('083') || cp.startsWith('084') || cp.startsWith('085')) {
    if (parseInt(cp) >= 8001 && parseInt(cp) <= 8042) return 'Barcelona'
  }
  // Madrid
  if (cp.startsWith('280')) {
    if (parseInt(cp) >= 28001 && parseInt(cp) <= 28055) return 'Madrid'
  }
  
  const data = getPostalCodeData(cp)
  if (data && data.poblaciones.length > 0) {
    // Limpiar nombre de población
    let city = data.poblaciones[0]
    city = city.replace(/\s*\(.*\)\s*/g, '').trim()
    return city
  }
  
  return data?.provincia || 'España'
}

// Generar descripción única para la zona
export function getZoneDescription(cp: string, profession: string): string {
  const zona = getZoneName(cp)
  const city = getCityFromPostalCode(cp)
  const data = getPostalCodeData(cp)
  
  const descriptions: Record<string, string[]> = {
    fontanero: [
      `Servicio de fontanería urgente en ${zona} (${cp}). Atendemos fugas, atascos y averías en toda la zona.`,
      `Fontaneros profesionales disponibles 24h en ${zona}, ${city}. Llegamos en 10 minutos a tu domicilio.`,
      `¿Problemas de fontanería en ${zona}? Nuestros técnicos están cerca de ti. Código postal ${cp}.`,
    ],
    electricista: [
      `Electricistas urgentes en ${zona} (${cp}). Reparamos averías eléctricas, cuadros y cortocircuitos.`,
      `Servicio eléctrico 24 horas en ${zona}, ${city}. Técnicos certificados a 10 minutos de ti.`,
      `¿Sin luz en ${zona}? Electricistas profesionales disponibles ahora. CP ${cp}.`,
    ],
    cerrajero: [
      `Cerrajeros urgentes en ${zona} (${cp}). Aperturas, cambios de cerradura y urgencias 24h.`,
      `¿Te has quedado fuera en ${zona}? Cerrajeros a 10 minutos. Código postal ${cp}.`,
      `Servicio de cerrajería 24 horas en ${zona}, ${city}. Sin daños en tu puerta.`,
    ],
    desatascos: [
      `Desatascos urgentes en ${zona} (${cp}). Limpieza de tuberías y alcantarillado 24h.`,
      `¿Atasco en ${zona}? Servicio de desatascos profesional. Llegamos en 10 minutos.`,
      `Desatascos 24 horas en ${zona}, ${city}. Equipos de alta presión. CP ${cp}.`,
    ],
    calderas: [
      `Reparación de calderas en ${zona} (${cp}). Técnicos certificados disponibles 24h.`,
      `¿Caldera averiada en ${zona}? Servicio urgente de reparación. Llegamos en 10 minutos.`,
      `Mantenimiento y reparación de calderas en ${zona}, ${city}. CP ${cp}.`,
    ],
  }
  
  const profDescriptions = descriptions[profession] || descriptions.fontanero
  const index = parseInt(cp.slice(-2)) % profDescriptions.length
  return profDescriptions[index]
}

// Estadísticas ficticias pero realistas por zona
export function getZoneStats(cp: string): {
  serviciosHoy: number
  tiempoMedio: number
  tecnicos: number
  satisfaccion: number
} {
  // Generar números pseudo-aleatorios pero consistentes basados en el CP
  const seed = parseInt(cp)
  const serviciosHoy = 3 + (seed % 12)
  const tiempoMedio = 8 + (seed % 7)
  const tecnicos = 2 + (seed % 4)
  const satisfaccion = 4.7 + ((seed % 3) * 0.1)
  
  return {
    serviciosHoy,
    tiempoMedio,
    tecnicos,
    satisfaccion: Math.round(satisfaccion * 10) / 10,
  }
}

// Top códigos postales para pre-renderizar (ciudades grandes)
export function getTopPostalCodes(): string[] {
  const topCodes: string[] = []
  
  // Barcelona (08001-08042)
  for (let i = 8001; i <= 8042; i++) {
    topCodes.push(i.toString().padStart(5, '0'))
  }
  
  // Madrid (28001-28055)
  for (let i = 28001; i <= 28055; i++) {
    topCodes.push(i.toString())
  }
  
  // Valencia (46001-46026)
  for (let i = 46001; i <= 46026; i++) {
    topCodes.push(i.toString())
  }
  
  // Sevilla (41001-41020)
  for (let i = 41001; i <= 41020; i++) {
    topCodes.push(i.toString())
  }
  
  // Zaragoza (50001-50018)
  for (let i = 50001; i <= 50018; i++) {
    topCodes.push(i.toString())
  }
  
  // Málaga (29001-29018)
  for (let i = 29001; i <= 29018; i++) {
    topCodes.push(i.toString())
  }
  
  // Bilbao (48001-48015)
  for (let i = 48001; i <= 48015; i++) {
    topCodes.push(i.toString())
  }
  
  return topCodes
}

export const PROFESSIONS_POSTAL = [
  { id: 'fontanero', name: 'Fontanero', namePlural: 'Fontaneros' },
  { id: 'electricista', name: 'Electricista', namePlural: 'Electricistas' },
  { id: 'cerrajero', name: 'Cerrajero', namePlural: 'Cerrajeros' },
  { id: 'desatascos', name: 'Desatascos', namePlural: 'Desatascos' },
  { id: 'calderas', name: 'Técnico de Calderas', namePlural: 'Técnicos de Calderas' },
]
