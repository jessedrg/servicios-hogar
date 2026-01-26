// =============================================================================
// BARRIOS DE CATALUÑA - DATOS PARA SEO HIPERLOCAL
// =============================================================================

export interface Barrio {
  slug: string
  name: string
  city: string // slug de la ciudad
  cityName: string
}

// Barcelona - 73 barrios oficiales + zonas populares
export const BARRIOS_BARCELONA: Barrio[] = [
  // Ciutat Vella
  { slug: "el-raval", name: "El Raval", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-gotic", name: "El Gòtic", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-barceloneta", name: "La Barceloneta", city: "barcelona", cityName: "Barcelona" },
  { slug: "sant-pere-santa-caterina", name: "Sant Pere, Santa Caterina i la Ribera", city: "barcelona", cityName: "Barcelona" },
  
  // Eixample
  { slug: "eixample-dreta", name: "Dreta de l'Eixample", city: "barcelona", cityName: "Barcelona" },
  { slug: "eixample-esquerra", name: "Esquerra de l'Eixample", city: "barcelona", cityName: "Barcelona" },
  { slug: "sant-antoni", name: "Sant Antoni", city: "barcelona", cityName: "Barcelona" },
  { slug: "sagrada-familia", name: "Sagrada Família", city: "barcelona", cityName: "Barcelona" },
  { slug: "fort-pienc", name: "Fort Pienc", city: "barcelona", cityName: "Barcelona" },
  
  // Sants-Montjuïc
  { slug: "sants", name: "Sants", city: "barcelona", cityName: "Barcelona" },
  { slug: "sants-badal", name: "Sants-Badal", city: "barcelona", cityName: "Barcelona" },
  { slug: "hostafrancs", name: "Hostafrancs", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-bordeta", name: "La Bordeta", city: "barcelona", cityName: "Barcelona" },
  { slug: "poble-sec", name: "Poble Sec", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-marina-del-prat-vermell", name: "La Marina del Prat Vermell", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-marina-de-port", name: "La Marina de Port", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-font-de-la-guatlla", name: "La Font de la Guatlla", city: "barcelona", cityName: "Barcelona" },
  
  // Les Corts
  { slug: "les-corts", name: "Les Corts", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-maternitat", name: "La Maternitat i Sant Ramon", city: "barcelona", cityName: "Barcelona" },
  { slug: "pedralbes", name: "Pedralbes", city: "barcelona", cityName: "Barcelona" },
  
  // Sarrià-Sant Gervasi
  { slug: "sarria", name: "Sarrià", city: "barcelona", cityName: "Barcelona" },
  { slug: "sant-gervasi-galvany", name: "Sant Gervasi - Galvany", city: "barcelona", cityName: "Barcelona" },
  { slug: "sant-gervasi-bonanova", name: "Sant Gervasi - la Bonanova", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-putxet", name: "El Putxet i el Farró", city: "barcelona", cityName: "Barcelona" },
  { slug: "vallvidrera", name: "Vallvidrera, el Tibidabo i les Planes", city: "barcelona", cityName: "Barcelona" },
  { slug: "tres-torres", name: "Les Tres Torres", city: "barcelona", cityName: "Barcelona" },
  
  // Gràcia
  { slug: "gracia", name: "Gràcia", city: "barcelona", cityName: "Barcelona" },
  { slug: "vila-de-gracia", name: "Vila de Gràcia", city: "barcelona", cityName: "Barcelona" },
  { slug: "camp-den-grassot", name: "Camp d'en Grassot i Gràcia Nova", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-salut", name: "La Salut", city: "barcelona", cityName: "Barcelona" },
  { slug: "vallcarca", name: "Vallcarca i els Penitents", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-coll", name: "El Coll", city: "barcelona", cityName: "Barcelona" },
  
  // Horta-Guinardó
  { slug: "horta", name: "Horta", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-guinardo", name: "El Guinardó", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-carmel", name: "El Carmel", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-teixonera", name: "La Teixonera", city: "barcelona", cityName: "Barcelona" },
  { slug: "montbau", name: "Montbau", city: "barcelona", cityName: "Barcelona" },
  { slug: "sant-genis-dels-agudells", name: "Sant Genís dels Agudells", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-vall-dhebron", name: "La Vall d'Hebron", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-clota", name: "La Clota", city: "barcelona", cityName: "Barcelona" },
  { slug: "can-baro", name: "Can Baró", city: "barcelona", cityName: "Barcelona" },
  
  // Nou Barris
  { slug: "nou-barris", name: "Nou Barris", city: "barcelona", cityName: "Barcelona" },
  { slug: "vilapicina", name: "Vilapicina i la Torre Llobeta", city: "barcelona", cityName: "Barcelona" },
  { slug: "porta", name: "Porta", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-turo-de-la-peira", name: "El Turó de la Peira", city: "barcelona", cityName: "Barcelona" },
  { slug: "can-peguera", name: "Can Peguera", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-guineueta", name: "La Guineueta", city: "barcelona", cityName: "Barcelona" },
  { slug: "canyelles", name: "Canyelles", city: "barcelona", cityName: "Barcelona" },
  { slug: "les-roquetes", name: "Les Roquetes", city: "barcelona", cityName: "Barcelona" },
  { slug: "verdun", name: "Verdun", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-prosperitat", name: "La Prosperitat", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-trinitat-nova", name: "La Trinitat Nova", city: "barcelona", cityName: "Barcelona" },
  { slug: "torre-baro", name: "Torre Baró", city: "barcelona", cityName: "Barcelona" },
  { slug: "ciutat-meridiana", name: "Ciutat Meridiana", city: "barcelona", cityName: "Barcelona" },
  { slug: "vallbona", name: "Vallbona", city: "barcelona", cityName: "Barcelona" },
  
  // Sant Andreu
  { slug: "sant-andreu", name: "Sant Andreu", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-sagrera", name: "La Sagrera", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-congres", name: "El Congrés i els Indians", city: "barcelona", cityName: "Barcelona" },
  { slug: "navas", name: "Navas", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-bon-pastor", name: "El Bon Pastor", city: "barcelona", cityName: "Barcelona" },
  { slug: "baró-de-viver", name: "Baró de Viver", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-trinitat-vella", name: "La Trinitat Vella", city: "barcelona", cityName: "Barcelona" },
  
  // Sant Martí
  { slug: "sant-marti", name: "Sant Martí", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-camp-de-larpa", name: "El Camp de l'Arpa del Clot", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-clot", name: "El Clot", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-poblenou", name: "El Poblenou", city: "barcelona", cityName: "Barcelona" },
  { slug: "diagonal-mar", name: "Diagonal Mar i el Front Marítim", city: "barcelona", cityName: "Barcelona" },
  { slug: "el-besos", name: "El Besòs i el Maresme", city: "barcelona", cityName: "Barcelona" },
  { slug: "provencals-del-poblenou", name: "Provençals del Poblenou", city: "barcelona", cityName: "Barcelona" },
  { slug: "sant-marti-de-provencals", name: "Sant Martí de Provençals", city: "barcelona", cityName: "Barcelona" },
  { slug: "la-verneda", name: "La Verneda i la Pau", city: "barcelona", cityName: "Barcelona" },
  { slug: "22-arroba", name: "22@", city: "barcelona", cityName: "Barcelona" },
]

// Otras ciudades grandes de Cataluña con barrios
export const BARRIOS_HOSPITALET: Barrio[] = [
  { slug: "centre", name: "Centre", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
  { slug: "santa-eulalia", name: "Santa Eulàlia", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
  { slug: "collblanc", name: "Collblanc", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
  { slug: "la-torrassa", name: "La Torrassa", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
  { slug: "pubilla-cases", name: "Pubilla Cases", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
  { slug: "can-serra", name: "Can Serra", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
  { slug: "florida", name: "La Florida", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
  { slug: "gornal", name: "Gornal", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
  { slug: "bellvitge", name: "Bellvitge", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
  { slug: "gran-via-sud", name: "Gran Via Sud", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
  { slug: "sant-josep", name: "Sant Josep", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
  { slug: "sanfeliu", name: "Sanfeliu", city: "hospitalet-de-llobregat", cityName: "L'Hospitalet de Llobregat" },
]

export const BARRIOS_BADALONA: Barrio[] = [
  { slug: "centre", name: "Centre", city: "badalona", cityName: "Badalona" },
  { slug: "dalt-la-vila", name: "Dalt la Vila", city: "badalona", cityName: "Badalona" },
  { slug: "casagemes", name: "Casagemes", city: "badalona", cityName: "Badalona" },
  { slug: "coll-i-pujol", name: "Coll i Pujol", city: "badalona", cityName: "Badalona" },
  { slug: "la-salut", name: "La Salut", city: "badalona", cityName: "Badalona" },
  { slug: "sant-crist", name: "Sant Crist", city: "badalona", cityName: "Badalona" },
  { slug: "artigas", name: "Artigas", city: "badalona", cityName: "Badalona" },
  { slug: "llefià", name: "Llefià", city: "badalona", cityName: "Badalona" },
  { slug: "la-pau", name: "La Pau", city: "badalona", cityName: "Badalona" },
  { slug: "gorg", name: "Gorg", city: "badalona", cityName: "Badalona" },
  { slug: "sant-roc", name: "Sant Roc", city: "badalona", cityName: "Badalona" },
  { slug: "pomar", name: "Pomar", city: "badalona", cityName: "Badalona" },
]

export const BARRIOS_TERRASSA: Barrio[] = [
  { slug: "centre", name: "Centre", city: "terrassa", cityName: "Terrassa" },
  { slug: "ca-naurell", name: "Ca n'Aurell", city: "terrassa", cityName: "Terrassa" },
  { slug: "vallparadis", name: "Vallparadís", city: "terrassa", cityName: "Terrassa" },
  { slug: "sant-pere", name: "Sant Pere", city: "terrassa", cityName: "Terrassa" },
  { slug: "egara", name: "Ègara", city: "terrassa", cityName: "Terrassa" },
  { slug: "les-fonts", name: "Les Fonts", city: "terrassa", cityName: "Terrassa" },
  { slug: "can-palet", name: "Can Palet", city: "terrassa", cityName: "Terrassa" },
  { slug: "ca-nangles", name: "Ca n'Anglès", city: "terrassa", cityName: "Terrassa" },
  { slug: "la-maurina", name: "La Maurina", city: "terrassa", cityName: "Terrassa" },
  { slug: "can-jofresa", name: "Can Jofresa", city: "terrassa", cityName: "Terrassa" },
]

export const BARRIOS_SABADELL: Barrio[] = [
  { slug: "centre", name: "Centre", city: "sabadell", cityName: "Sabadell" },
  { slug: "la-creu-alta", name: "La Creu Alta", city: "sabadell", cityName: "Sabadell" },
  { slug: "gracia", name: "Gràcia", city: "sabadell", cityName: "Sabadell" },
  { slug: "can-puiggener", name: "Can Puiggener", city: "sabadell", cityName: "Sabadell" },
  { slug: "torre-romeu", name: "Torre-romeu", city: "sabadell", cityName: "Sabadell" },
  { slug: "can-rull", name: "Can Rull", city: "sabadell", cityName: "Sabadell" },
  { slug: "espronceda", name: "Espronceda", city: "sabadell", cityName: "Sabadell" },
  { slug: "ca-noriac", name: "Ca n'Oriac", city: "sabadell", cityName: "Sabadell" },
]

// Todos los barrios combinados
export const ALL_BARRIOS_CATALUNA = [
  ...BARRIOS_BARCELONA,
  ...BARRIOS_HOSPITALET,
  ...BARRIOS_BADALONA,
  ...BARRIOS_TERRASSA,
  ...BARRIOS_SABADELL,
]

// Función para obtener barrios de una ciudad
export function getBarriosByCity(citySlug: string): Barrio[] {
  return ALL_BARRIOS_CATALUNA.filter(b => b.city === citySlug)
}

// Función para obtener un barrio específico
export function getBarrio(citySlug: string, barrioSlug: string): Barrio | undefined {
  return ALL_BARRIOS_CATALUNA.find(b => b.city === citySlug && b.slug === barrioSlug)
}

// Generar combinaciones para sitemap
export function generateBarrioCombinations() {
  const professions = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]
  const modifiers = ["", "-urgente", "-24-horas", "-economico", "-barato"]
  const combinations: { profession: string; city: string; barrio: string }[] = []

  for (const barrio of ALL_BARRIOS_CATALUNA) {
    for (const profession of professions) {
      for (const mod of modifiers) {
        combinations.push({
          profession: `${profession}${mod}`,
          city: barrio.city,
          barrio: barrio.slug,
        })
      }
    }
  }

  return combinations
}
