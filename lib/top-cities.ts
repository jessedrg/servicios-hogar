// =============================================================================
// TOP CIUDADES DE CATALUÑA PARA PRERENDER (ISR)
// =============================================================================
// Las 150 ciudades más pobladas/buscadas de Cataluña
// Estas páginas se generarán estáticamente para indexación instantánea
// =============================================================================

export const TOP_CITIES_CATALUNA = [
  // Barcelona y área metropolitana (máxima prioridad)
  "barcelona",
  "hospitalet-de-llobregat",
  "badalona",
  "terrassa",
  "sabadell",
  "mataro",
  "santa-coloma-de-gramenet",
  "cornella-de-llobregat",
  "sant-boi-de-llobregat",
  "sant-cugat-del-valles",
  "manresa",
  "rubí",
  "vilanova-i-la-geltru",
  "viladecans",
  "el-prat-de-llobregat",
  "castelldefels",
  "granollers",
  "cerdanyola-del-valles",
  "mollet-del-valles",
  "esplugues-de-llobregat",
  "gava",
  "sant-feliu-de-llobregat",
  "vic",
  "igualada",
  "vilafranca-del-penedes",
  "ripollet",
  "sant-adria-de-besos",
  "montcada-i-reixac",
  "sant-joan-despi",
  "barberà-del-valles",
  "olesa-de-montserrat",
  "martorell",
  "sant-pere-de-ribes",
  "sitges",
  "premia-de-mar",
  "el-masnou",
  "montgat",
  "pineda-de-mar",
  "calella",
  "arenys-de-mar",
  "malgrat-de-mar",
  "blanes",
  
  // Girona y Costa Brava
  "girona",
  "figueres",
  "lloret-de-mar",
  "olot",
  "salt",
  "palamos",
  "sant-feliu-de-guixols",
  "roses",
  "platja-d-aro",
  "palafrugell",
  "la-bisbal-d-emporda",
  "torroella-de-montgri",
  "l-escala",
  "cadaques",
  "empuriabrava",
  "banyoles",
  "ripoll",
  "puigcerda",
  "camprodon",
  
  // Tarragona y Costa Daurada
  "tarragona",
  "reus",
  "salou",
  "cambrils",
  "el-vendrell",
  "tortosa",
  "valls",
  "amposta",
  "vila-seca",
  "calafell",
  "torredembarra",
  "cunit",
  "altafulla",
  "mont-roig-del-camp",
  "l-hospitalet-de-l-infant",
  "deltebre",
  "sant-carles-de-la-rapita",
  
  // Lleida
  "lleida",
  "balaguer",
  "tarrega",
  "mollerussa",
  "la-seu-d-urgell",
  "cervera",
  "solsona",
  "tremp",
  "sort",
  "vielha",
  
  // Más ciudades importantes del Vallès
  "parets-del-valles",
  "la-garriga",
  "caldes-de-montbui",
  "lliça-d-amunt",
  "santa-perpetua-de-mogoda",
  "palau-solita-i-plegamans",
  "molins-de-rei",
  "sant-vicenç-dels-horts",
  "sant-andreu-de-la-barca",
  "palleja",
  "corbera-de-llobregat",
  "cervelló",
  "torrelles-de-llobregat",
  "begues",
  
  // Maresme
  "vilassar-de-mar",
  "vilassar-de-dalt",
  "cabrera-de-mar",
  "cabrils",
  "argentona",
  "dosrius",
  "sant-andreu-de-llavaneres",
  "sant-vicenç-de-montalt",
  "canet-de-mar",
  "sant-pol-de-mar",
  
  // Baix Llobregat
  "sant-just-desvern",
  "sant-joan-despi",
  "santa-coloma-de-cervello",
  "abrera",
  "olesa-de-montserrat",
  "esparreguera",
  "collbato",
  
  // Alt Penedès
  "sant-sadurni-d-anoia",
  "gelida",
  "subirats",
  "sant-pere-de-riudebitlles",
  
  // Garraf
  "cubelles",
  "olivella",
  "canyelles",
  
  // Osona
  "manlleu",
  "tona",
  "taradell",
  "centelles",
  "sant-hipolit-de-voltrega",
  
  // Bages
  "sant-joan-de-vilatorrada",
  "sant-vicenç-de-castellet",
  "sallent",
  "santpedor",
  "navarcles",
] as const

export const TOP_MODIFIERS = [
  "", // base (sin modificador)
  "-urgente",
  "-24-horas",
  "-economico",
  "-barato",
  "-cerca-de-mi",
] as const

export const PROFESSIONS = [
  "electricista",
  "fontanero", 
  "cerrajero",
  "desatascos",
  "calderas",
] as const

// Genera todas las combinaciones para prerender
export function generateStaticCombinations() {
  const combinations: { profession: string; city: string }[] = []
  
  for (const profession of PROFESSIONS) {
    for (const city of TOP_CITIES_CATALUNA) {
      // Página base de profesión
      combinations.push({ profession, city })
      
      // Top modificadores para ciudades principales (primeras 50)
      if (TOP_CITIES_CATALUNA.indexOf(city) < 50) {
        for (const mod of TOP_MODIFIERS) {
          if (mod) {
            combinations.push({ profession: `${profession}${mod}`, city })
          }
        }
      }
    }
  }
  
  return combinations
}
