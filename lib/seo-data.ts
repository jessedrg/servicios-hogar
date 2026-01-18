// SEO Data for programmatic page generation
// This file contains all professions, problems, and cities in SPAIN

export const PROFESSIONS = [
  {
    id: "electricista",
    name: "Electricista",
    namePlural: "Electricistas",
    icon: "Zap",
    color: "#FF6B35",
    urgentProblems: ["apagon", "cortocircuito", "olor-quemado", "diferencial-salta"],
    description: "Electricistas certificados disponibles 24/7",
    metaDescription: "Electricista urgente 24 horas. Llegamos en 10 minutos. Servicio profesional y garantizado.",
  },
  {
    id: "fontanero",
    name: "Fontanero",
    namePlural: "Fontaneros",
    icon: "Droplets",
    color: "#3B82F6",
    urgentProblems: ["fuga-agua", "tuberia-rota", "inundacion", "atasco-grave"],
    description: "Fontaneros profesionales disponibles 24/7",
    metaDescription: "Fontanero urgente 24 horas. Llegamos en 10 minutos. Reparaciones garantizadas.",
  },
  {
    id: "cerrajero",
    name: "Cerrajero",
    namePlural: "Cerrajeros",
    icon: "Key",
    color: "#8B5CF6",
    urgentProblems: ["puerta-bloqueada", "cerradura-rota", "llave-dentro", "robo"],
    description: "Cerrajeros de confianza disponibles 24/7",
    metaDescription: "Cerrajero urgente 24 horas. Abrimos sin daños. Llegamos en 10 minutos.",
  },
  {
    id: "desatascos",
    name: "Desatascos",
    namePlural: "Desatascos",
    icon: "Waves",
    color: "#10B981",
    urgentProblems: ["wc-atascado", "fregadero-atascado", "arqueta-atascada", "mal-olor"],
    description: "Servicio de desatascos profesional 24/7",
    metaDescription: "Desatascos urgentes 24 horas. Camión cuba. Llegamos en 10 minutos.",
  },
  {
    id: "calderas",
    name: "Calderas",
    namePlural: "Técnicos de Calderas",
    icon: "Flame",
    color: "#EF4444",
    urgentProblems: ["sin-agua-caliente", "caldera-no-enciende", "fuga-gas", "ruido-caldera"],
    description: "Técnicos de calderas certificados 24/7",
    metaDescription: "Reparación de calderas urgente 24h. Todas las marcas. Llegamos en 10 minutos.",
  },
]

export const PROBLEMS = {
  electricista: [
    { id: "apagon", name: "Apagón", description: "Sin luz en casa", urgent: true, emoji: "💡" },
    { id: "cortocircuito", name: "Cortocircuito", description: "Saltan los plomos", urgent: true, emoji: "⚡" },
    { id: "olor-quemado", name: "Olor a quemado", description: "Huele a quemado eléctrico", urgent: true, emoji: "🔥" },
    {
      id: "diferencial-salta",
      name: "Diferencial salta",
      description: "El diferencial salta solo",
      urgent: true,
      emoji: "⚠️",
    },
    {
      id: "enchufes-no-funcionan",
      name: "Enchufes no funcionan",
      description: "Enchufes sin corriente",
      urgent: false,
      emoji: "🔌",
    },
    { id: "luces-parpadean", name: "Luces parpadean", description: "Las luces parpadean", urgent: false, emoji: "✨" },
    {
      id: "cuadro-electrico",
      name: "Cuadro eléctrico",
      description: "Problemas con el cuadro",
      urgent: false,
      emoji: "⚙️",
    },
    {
      id: "instalacion-electrica",
      name: "Instalación eléctrica",
      description: "Instalación nueva o reforma",
      urgent: false,
      emoji: "🔧",
    },
    {
      id: "boletin-electrico",
      name: "Boletín eléctrico",
      description: "Certificado de instalación",
      urgent: false,
      emoji: "📋",
    },
  ],
  fontanero: [
    { id: "fuga-agua", name: "Fuga de agua", description: "Escape de agua", urgent: true, emoji: "💧" },
    { id: "tuberia-rota", name: "Tubería rota", description: "Rotura de tubería", urgent: true, emoji: "🚰" },
    { id: "inundacion", name: "Inundación", description: "Casa inundada", urgent: true, emoji: "🌊" },
    { id: "atasco-grave", name: "Atasco grave", description: "Atasco importante", urgent: true, emoji: "🚫" },
    { id: "grifo-gotea", name: "Grifo gotea", description: "Grifo que gotea", urgent: false, emoji: "💦" },
    { id: "cisterna-no-funciona", name: "Cisterna", description: "Cisterna no funciona", urgent: false, emoji: "🚽" },
    { id: "calentador", name: "Calentador", description: "Problemas con calentador", urgent: false, emoji: "🔥" },
    { id: "humedad", name: "Humedad", description: "Problemas de humedad", urgent: false, emoji: "💨" },
  ],
  cerrajero: [
    {
      id: "puerta-bloqueada",
      name: "Puerta bloqueada",
      description: "No puedo abrir la puerta",
      urgent: true,
      emoji: "🚪",
    },
    { id: "cerradura-rota", name: "Cerradura rota", description: "Cerradura estropeada", urgent: true, emoji: "🔐" },
    { id: "llave-dentro", name: "Llave dentro", description: "Me dejé las llaves dentro", urgent: true, emoji: "🔑" },
    { id: "robo", name: "Robo", description: "Intento de robo", urgent: true, emoji: "⚠️" },
    { id: "cambio-cerradura", name: "Cambio cerradura", description: "Cambiar cerradura", urgent: false, emoji: "🔄" },
    { id: "copia-llaves", name: "Copia de llaves", description: "Hacer copias de llaves", urgent: false, emoji: "🗝️" },
    {
      id: "cerradura-seguridad",
      name: "Cerradura seguridad",
      description: "Instalar cerradura de seguridad",
      urgent: false,
      emoji: "🛡️",
    },
  ],
  desatascos: [
    { id: "wc-atascado", name: "WC atascado", description: "El váter está atascado", urgent: true, emoji: "🚽" },
    {
      id: "fregadero-atascado",
      name: "Fregadero atascado",
      description: "El fregadero no traga",
      urgent: true,
      emoji: "🍽️",
    },
    { id: "arqueta-atascada", name: "Arqueta atascada", description: "Arqueta obstruida", urgent: true, emoji: "🕳️" },
    { id: "mal-olor", name: "Mal olor", description: "Mal olor en tuberías", urgent: true, emoji: "👃" },
    { id: "ducha-atascada", name: "Ducha atascada", description: "La ducha no traga", urgent: false, emoji: "🚿" },
    { id: "bajante-atascado", name: "Bajante atascado", description: "Bajante obstruido", urgent: false, emoji: "⬇️" },
    {
      id: "limpieza-tuberias",
      name: "Limpieza tuberías",
      description: "Limpieza preventiva",
      urgent: false,
      emoji: "🧹",
    },
  ],
  calderas: [
    {
      id: "sin-agua-caliente",
      name: "Sin agua caliente",
      description: "No sale agua caliente",
      urgent: true,
      emoji: "❄️",
    },
    {
      id: "caldera-no-enciende",
      name: "Caldera no enciende",
      description: "La caldera no arranca",
      urgent: true,
      emoji: "🔥",
    },
    { id: "fuga-gas", name: "Fuga de gas", description: "Posible fuga de gas", urgent: true, emoji: "⚠️" },
    { id: "ruido-caldera", name: "Ruido caldera", description: "La caldera hace ruido", urgent: true, emoji: "🔊" },
    { id: "revision-caldera", name: "Revisión caldera", description: "Revisión anual", urgent: false, emoji: "🔧" },
    { id: "cambio-caldera", name: "Cambio caldera", description: "Sustituir caldera", urgent: false, emoji: "🔄" },
    { id: "radiadores", name: "Radiadores", description: "Problemas con radiadores", urgent: false, emoji: "🌡️" },
  ],
}

// ALL CITIES IN SPAIN organized by region and province
export const CITIES_SPAIN: Record<string, string[]> = {
  // ============ CATALUNYA ============
  barcelona: [
    // Grandes ciudades
    "barcelona", "hospitalet-llobregat", "badalona", "terrassa", "sabadell", "mataro",
    "santa-coloma-gramenet", "cornella-llobregat", "sant-boi-llobregat", "sant-cugat-valles",
    "rubi", "vilanova-geltru", "viladecans", "prat-llobregat", "castelldefels", "granollers",
    "cerdanyola-valles", "mollet-valles", "gava", "esplugues-llobregat", "sant-feliu-llobregat",
    "ripollet", "sant-adria-besos", "montcada-reixac", "vic", "igualada", "vilafranca-penedes",
    "manresa",
    // Ciudades medianas
    "sant-vicenc-dels-horts", "premia-mar", "sitges", "el-masnou", "martorell", "sant-pere-ribes",
    "sant-andreu-barca", "pineda-mar", "barbera-valles", "calella", "molins-rei", "cardedeu",
    "berga", "caldes-montbui", "llinars-valles", "palau-solita-plegamans", "montornes-valles",
    "la-garriga", "parets-valles", "sant-quirze-valles", "tordera", "arenys-mar", "canet-mar",
    "sant-celoni", "malgrat-mar", "santa-perpetua-mogoda", "argentona", "cubelles",
    "castellar-valles", "sant-sadurni-anoia", "olesa-montserrat", "abrera", "badia-valles",
    // Pueblos importantes
    "begues", "cabrera-mar", "cabrils", "calaf", "canovelles", "capellades", "cardona",
    "centelles", "cervello", "corbera-llobregat", "esparreguera", "gelida", "gironella",
    "la-llagosta", "les-franqueses-valles", "manlleu", "masquefa", "montmelo", "navarcles",
    "palleja", "papiol", "piera", "polinya", "sallent", "sant-joan-despi", "sant-just-desvern",
    "santpedor", "teia", "tiana", "tona", "torello", "torrelles-llobregat", "vacarisses",
    "vallirana", "vilassar-dalt", "vilassar-mar",
    // NUEVAS CIUDADES - Expansion 500+
    "sant-fost-campsentelles", "la-roca-valles", "dosrius", "sant-pol-mar", "montgat",
    "alella", "llica-amunt", "llica-vall", "santa-eulalia-roncana", "bigues-riells",
    "santa-maria-martorelles", "vallromanes", "la-torre-claramunt", "vilanova-cami",
    "jorba", "castelloli", "odena", "rubio", "la-pobla-claramunt", "santa-margarida-montbui",
    "els-hostalets-pierola", "pierola", "monistrol-montserrat", "castellbell-vilar",
    "sant-esteve-sesrovires", "torrelles-foix", "avinyonet-penedes", "la-granada",
    "mediona", "subirats", "font-rubi", "torrelavit", "sant-marti-sarroca", "castellvi-rosanes",
    "cervelló", "la-palma-cervello", "sant-climent-llobregat", "santa-coloma-cervello",
    "sant-vicenc-torelló", "les-masies-voltrega", "santa-cecilia-voltrega", "gurb",
    "taradell", "santa-eugenia-berga", "calldetenes", "seva", "malla", "tavèrnoles",
    "roda-ter", "sant-hipolit-voltrega", "olost", "prats-lluçanes", "oristà", "santa-maria-olo",
    "avinyó", "balsareny", "gaià", "rajadell", "castellgalí", "el-pont-vilomara-rocafort",
    "castellnou-bages", "monistrol-calders", "calders", "moià", "collsuspina", "santa-maria-besora",
    "sant-quirze-besora", "sora", "orís", "sant-pere-torelló", "vidrà", "vallfogona-ripolles",
    "ripoll", "campdevànol", "gombrèn", "llanars", "setcases", "molló", "campelles",
  ],
  girona: [
    // Grandes ciudades
    "girona", "figueres", "blanes", "lloret-mar", "olot", "salt", "palafrugell",
    "sant-feliu-guixols", "roses", "banyoles", "palamos", "la-bisbal-emporda",
    "torroella-montgri", "castello-empuries", "calonge-sant-antoni", "lescala",
    // Ciudades medianas
    "santa-coloma-farners", "arbucies", "cassa-selva", "llagostera", "platja-aro",
    "puigcerda", "ripoll", "ribes-freser", "camprodon", "besalu", "angles", "amer",
    "celra", "hostalric", "llança", "pals", "peralada", "portbou", "sils", "tossa-mar",
    "vidreres", "cadaques", "empuriabrava", "begur", "caldes-malavella",
    // NUEVAS - Expansion Costa Brava y interior
    "macanet-selva", "fornells-selva", "quart", "vilablareix", "sarria-ter",
    "sant-julia-ramis", "aiguaviva", "sant-gregori", "bescanó", "sant-marti-vell",
    "bordils", "juia", "sant-joan-mollet", "corça", "mont-ras", "regencós",
    "ullastret", "fontanilles", "gualta", "serra-daro", "bellcaire-emporda",
    "albons", "viladamat", "ventalló", "saus-camallera-llampaies", "garrigàs",
    "navata", "llers", "pont-molins", "capmany", "masarac", "biure", "cantallops",
    "mollet-peralada", "vilajuïga", "pau", "palau-saverdera", "pedret-marza",
    "colera", "port-selva", "selva-mar", "vila-sacra", "santa-llogaia-algema",
    "san-pere-pescador", "fortia", "riumors", "vilamacolum", "armentera",
    "vilanant", "pontós", "borrassà", "ordis", "arenys-emporda", "cistella",
  ],
  tarragona: [
    // Grandes ciudades
    "tarragona", "reus", "tortosa", "salou", "cambrils", "vila-seca", "valls",
    "vendrell", "amposta", "calafell", "cunit", "torredembarra", "altafulla",
    // Ciudades medianas
    "sant-carles-rapita", "deltebre", "montblanc", "ulldecona", "roquetes",
    "mora-ebre", "alcanar", "constanti", "la-selva-camp", "riudoms", "mont-roig-camp",
    "creixell", "roda-bera", "les-borges-camp", "falset", "gandesa", "alcover", "arbos",
    // NUEVAS - Costa Dorada y interior
    "miami-platja", "hospitalet-infant", "vandellòs", "pratdip", "tivissa",
    "flix", "ascó", "vinebre", "benissanet", "ginestar", "rasquera", "benifallet",
    "xerta", "aldover", "aldea", "camarles", "ampolla", "perello", "rasquera",
    "santa-bàrbara", "freginals", "godall", "mas-barberans", "la-galera",
    "santa-oliva", "banyeres-penedes", "bellvei", "bonastre", "llorenç-penedes",
    "sant-jaume-domenys", "albinyana", "la-bisbal-penedes", "masllorenç",
  ],
  lleida: [
    // Grandes ciudades
    "lleida", "balaguer", "tarrega", "mollerussa", "la-seu-urgell", "cervera",
    "almacelles", "alpicat", "tremp", "solsona", "ponts", "agramunt",
    // Ciudades medianas
    "les-borges-blanques", "bellpuig", "guissona", "vielha", "sort", "alfarras",
    "almenar", "artesa-segre", "juneda", "bellver-cerdanya", "el-pont-suert",
    // NUEVAS - Pirineos y llano
    "torrefarrera", "rosselló", "torres-segre", "sudanell", "artesa-lleida",
    "gimenells-pla-ermita", "benavent-segria", "villanueva-barca", "termens",
    "menàrguens", "vallfogona-balaguer", "os-balaguer", "àger", "camarasa",
    "cubells", "montgai", "penelles", "tornabous", "anglesola", "barbens",
    "ivars-urgell", "miralcamp", "sidamon", "golmes", "bellvis", "fondarella",
    "el-palau-anglesola", "castellserà", "preixana", "ossó-sió", "peramola",
    "oliana", "coll-nargó", "organyà", "montferrer-castellbò", "alàs-cerc",
    "ribera-urgellet", "arsèguel", "les-valls-valira", "la-vansa-fòrnols",
  ],

  // ============ COMUNIDAD DE MADRID ============
  madrid: [
    // Grandes ciudades
    "madrid", "mostoles", "alcala-henares", "fuenlabrada", "leganes", "getafe", "alcorcon",
    "torrejon-ardoz", "parla", "alcobendas", "las-rozas", "san-sebastian-reyes", "pozuelo-alarcon",
    "coslada", "rivas-vaciamadrid", "valdemoro", "majadahonda", "collado-villalba", "aranjuez",
    "arganda-rey", "boadilla-monte", "pinto", "colmenar-viejo", "tres-cantos",
    // Ciudades medianas
    "san-fernando-henares", "galapagar", "arroyomolinos", "navalcarnero", "ciempozuelos",
    "villanueva-pardillo", "villaviciosa-odon", "torrelodones", "mejorada-campo", "humanes-madrid",
    "paracuellos-jarama", "algete", "moralzarzal", "villanueva-canada", "san-martin-valdeiglesias",
    "chinchon", "guadarrama", "el-escorial", "san-lorenzo-escorial", "alpedrete", "brunete",
    "sevilla-nueva", "villalbilla", "meco", "daganzo-arriba",
    // NUEVAS - Expansion 500+ pueblos
    "velilla-san-antonio", "loeches", "morata-tajuna", "campo-real", "nuevo-baztan",
    "torres-alameda", "camarma-esteruelas", "san-agustin-guadalix", "pedrezuela",
    "miraflores-sierra", "cercedilla", "navacerrada", "becerril-sierra", "hoyo-manzanares",
    "el-boalo", "moraleja-enmedio", "serranillos-valle", "griñon", "cubas-sagra",
    "casarrubuelos", "torrejon-velasco", "torrejon-calzada", "fuenlabrada",
    "alcorcon", "mostoles", "arroyomolinos", "navalcarnero", "el-alamo", "batres",
    "carranque", "ugena", "el-viso-san-juan", "casarrubios-monte", "venturada",
    "soto-real", "el-molar", "talamanca-jarama", "valdepielagos", "valdeolmos-alalpardo",
    "ribatejada", "fresno-torote", "ajalvir", "cobeña", "fuente-sauco-fuentidueña",
    "ambite", "orusco-tajuña", "carabana", "belmonte-tajo", "estremera", "fuentidueña-tajo",
    "villamanrique-tajo", "colmenar-oreja", "villaconejos", "titulcia", "san-martin-vega",
    "ciempozuelos", "san-martin-valdeiglesias", "pelayos-presa", "aldea-fresno",
    "cadalso-vidrios", "cenicientos", "rozas-puerto-real", "villa-prado",
    "navas-rey", "chapineria", "colmenarejo", "fresnedillas-oliva", "navalagamella",
    "robledo-chavela", "santa-maria-alameda", "zarzalejo", "valdemaqueda", "quijorna",
    "villanueva-perales", "perales-milla", "villamanta", "villamantilla",
  ],

  // ============ ANDALUCIA ============
  malaga: [
    // Costa del Sol - Alta demanda turistica
    "malaga", "marbella", "mijas", "velez-malaga", "fuengirola", "torremolinos", "benalmadena",
    "estepona", "rincon-victoria", "antequera", "alhaurin-torre", "alhaurin-grande", "coin",
    "nerja", "torrox", "cartama", "ronda", "manilva", "alora", "pizarra", "campillos",
    "mollina", "archidona", "alameda", "casabermeja", "colmenar", "frigiliana", "competa",
    "algarrobo", "torre-mar", "benahavis", "ojen", "istan", "casares", "gaucin", "san-pedro-alcantara",
    // NUEVAS - Costa y pueblos blancos
    "puerto-banus", "nueva-andalucia", "guadalmina", "cancelada", "la-cala-mijas",
    "riviera-sol", "calahonda", "cabopino", "costabella", "el-rosario", "los-monteros",
    "la-herradura", "almunecar", "salobrena", "motril", "castell-ferro", "calahonda-granada",
    "sayalonga", "archez", "canillas-albaida", "salares", "sedella", "canillas-aceituno",
    "alcaucin", "periana", "alfarnate", "alfarnatejo", "riogordo", "comares", "cutar",
    "el-borge", "benamargosa", "benamocarra", "iznate", "macharaviaya", "moclinejo",
    "totalán", "olias", "benagalbon", "chilches", "benajarafe", "almayate", "lagos",
  ],
  sevilla: [
    // Area metropolitana
    "sevilla", "dos-hermanas", "alcala-guadaira", "utrera", "mairena-aljarafe", "ecija",
    "los-palacios-villafranca", "la-rinconada", "carmona", "coria-rio", "moron-frontera",
    "tomares", "san-juan-aznalfarache", "bormujos", "lebrija", "marchena", "osuna", "camas",
    "gines", "castilleja-cuesta", "espartinas", "bollullos-mitacion", "lora-rio", "alcala-rio",
    "gelves", "mairena-alcor", "brenes", "palomares-rio", "santiponce", "la-algaba", "valencina-concepcion",
    // NUEVAS - Aljarafe y campiña
    "pilas", "sanlucar-mayor", "olivares", "villanueva-ariscal", "salteras", "guillena",
    "las-cabezas-san-juan", "el-coronil", "montellano", "pruna", "coripe", "algamitas",
    "villanueva-san-juan", "martin-jara", "el-saucejo", "la-roda-andalucia", "estepa",
    "herrera", "marinaleda", "el-rubio", "aguadulce", "badolatosa", "casariche", "lora-estepa",
    "pedrera", "gilena", "la-puebla-cazalla", "el-arahal", "paradas", "moron-frontera",
  ],
  granada: [
    // Area metropolitana y costa tropical
    "granada", "motril", "almunecar", "armilla", "maracena", "las-gabias", "loja", "baza",
    "guadix", "santa-fe", "atarfe", "albolote", "huetor-vega", "ogijares", "peligros",
    "pulianas", "la-zubia", "cenes-vega", "monachil", "salobrena", "chauchina",
    "fuente-vaqueros", "pinos-puente", "illora", "iznalloz", "durcal", "huetor-tajar",
    "cullar-vega", "otura", "churriana-vega", "vegas-genil",
    // NUEVAS - Alpujarra y poniente
    "la-herradura", "orgiva", "lanjaron", "pampaneira", "bubion", "capileira", "trevelez",
    "pitres", "portugos", "busquistar", "la-taha", "carataunas", "soportujar", "canar",
    "valor", "ugíjar", "cadiar", "berchules", "mecina-bombarón", "yegen", "golco",
    "nevada", "ferreira", "dolar", "la-calahorra", "aldeire", "lanteira", "jerez-marquesado",
    "cogollos-guadix", "purullena", "benalua", "fonelas", "cortes-baza", "benamaurel",
    "cullar", "orce", "galera", "castril", "huescar", "castillejar", "puebla-don-fadrique",
  ],
  cordoba: [
    "cordoba", "lucena", "puente-genil", "montilla", "priego-cordoba", "cabra", "palma-rio",
    "baena", "pozoblanco", "penaroya-pueblonuevo", "aguilar-frontera", "la-carlota",
    "castro-rio", "rute", "villanueva-cordoba", "fernan-nunez", "monturque", "montemayor",
    "espejo", "bujalance", "carcabuey", "dona-mencia",
    // NUEVAS
    "iznájar", "almedinilla", "fuente-tojar", "luque", "zuheros", "nueva-carteya", "belmez",
    "fuente-obejuna", "hinojosa-duque", "villanueva-duque", "villaralto", "alcaracejos",
    "el-viso", "santa-eufemia", "torrecampo", "dos-torres", "anora", "villafranca-cordoba",
    "adamuz", "montoro", "cardeña", "villa-rio", "pedro-abad", "el-carpio",
  ],
  cadiz: [
    "cadiz", "jerez-frontera", "algeciras", "san-fernando", "el-puerto-santa-maria",
    "chiclana-frontera", "sanlucar-barrameda", "la-linea-concepcion", "puerto-real",
    "arcos-frontera", "rota", "los-barrios", "barbate", "conil-frontera", "ubrique",
    "tarifa", "medina-sidonia", "vejer-frontera", "chipiona", "jimena-frontera", "san-roque",
    "trebujena", "puerto-serrano", "bornos", "villamartin", "olvera",
    // NUEVAS - Costa de la Luz y sierra
    "zahara-atunes", "bolonia", "el-palmar", "los-canos-meca", "caños-meca", "sancti-petri",
    "novo-sancti-petri", "la-barrosa", "el-colorado", "campamento", "palmones", "guadiaro",
    "sotogrande", "pueblo-nuevo-guadiaro", "torreguadiaro", "alcala-gazules", "benalup",
    "castellar-frontera", "prado-rey", "el-bosque", "grazalema", "villaluenga-rosario",
    "benaocaz", "zahara-sierra", "algodonales", "el-gastor", "setenil-bodegas", "torre-alhaquime",
  ],
  almeria: [
    "almeria", "el-ejido", "roquetas-mar", "nijar", "aguadulce", "vicar", "adra",
    "huercal-overa", "vera", "garrucha", "mojacar", "cuevas-almanzora", "albox",
    "pulpi", "carboneras", "berja", "dalias", "huercal-almeria", "la-mojonera",
    "viator", "tabernas", "rioja", "alhama-almeria",
    // NUEVAS - Costa y desierto
    "san-jose", "agua-amarga", "las-negras", "rodalquilar", "isleta-moro", "san-miguel-cabo-gata",
    "retamar", "costacabana", "almería-capital", "la-cañada", "gadorantilla", "antas",
    "los-gallardos", "turre", "somontin", "albanchez", "cobdar", "chercos", "lucar",
    "purchena", "olula-rio", "cantoria", "arboleas", "zurgena", "la-alfoquia", "huercal-overa",
  ],
  huelva: [
    "huelva", "lepe", "almonte", "isla-cristina", "moguer", "ayamonte", "punta-umbria",
    "cartaya", "bollullos-par-condado", "aljaraque", "palma-condado", "palos-frontera",
    "san-juan-puerto", "trigueros", "valverde-camino", "nerva", "gibraleon", "bonares",
    "minas-riotinto", "villanueva-cruces",
    // NUEVAS - Costa de la Luz y Andevalo
    "matalascanas", "mazagon", "el-rocio", "villablanca", "san-silvestre-guzman", "sanlucar-guadiana",
    "el-granado", "el-almendro", "villanueva-castillejos", "cabezas-rubias", "calañas", "el-cerro-andevalo",
    "minas-herrerias", "puebla-guzman", "alosno", "san-bartolome-torre", "villanueva-cruces",
    "beas", "niebla", "lucena-puerto", "chucena", "hinojos", "villamanrique-condesa", "pilas-huelva",
  ],
  jaen: [
    "jaen", "linares", "andujar", "ubeda", "martos", "alcala-real", "baeza", "la-carolina",
    "jodar", "mancha-real", "torre-campo", "alcaudete", "bailen", "villacarrillo",
    "villanueva-arzobispo", "santisteban-puerto", "porcuna", "torredonjimeno", "mengibar",
    "cazorla", "quesada", "pozo-alcon",
    // NUEVAS - Sierra de Cazorla y campiña
    "la-iruela", "hornos", "santiago-pontones", "segura-sierra", "orcera", "benatae",
    "la-puerta-segura", "siles", "génave", "torres-albanchez", "villarrodrigo", "beas-segura",
    "chiclana-segura", "sorihuela-guadalimar", "iznatoraf", "villanueva-arzobispo",
    "sabiote", "torreperogil", "rus", "canena", "ibros", "lupion", "begíjar",
    "baeza", "jimena", "bedmar-garcíez", "jódar", "cabra-santo-cristo", "larva",
  ],

  // ============ COMUNIDAD VALENCIANA ============
  valencia: [
    "valencia",
    "torrent",
    "gandia",
    "paterna",
    "sagunto",
    "mislata",
    "burjassot",
    "ontinyent",
    "manises",
    "aldaia",
    "alfafar",
    "catarroja",
    "xirivella",
    "quart-poblet",
    "alzira",
    "xativa",
    "sueca",
    "cullera",
    "requena",
    "lliria",
    "algemesi",
    "alaquàs",
    "picassent",
    "oliva",
    "paiporta",
    "massanassa",
    "silla",
    "benetusser",
    "tavernes-blanques",
    "moncada",
    "alboraya",
    "godella",
    "rocafort",
    "betera",
    "pobla-vallbona",
    "riba-roja-turia",
    "utiel",
    "chiva",
    "bunol",
    "carlet",
    "alginet",
    "beniparrell",
    "albal",
    "sedavi",
  ],
  alicante: [
    "alicante",
    "elche",
    "torrevieja",
    "orihuela",
    "benidorm",
    "alcoy",
    "elda",
    "san-vicente-raspeig",
    "denia",
    "villena",
    "petrer",
    "crevillent",
    "villajoyosa",
    "novelda",
    "santa-pola",
    "ibi",
    "altea",
    "calpe",
    "muchamiel",
    "aspe",
    "campello",
    "san-juan-alicante",
    "javea",
    "alfaz-pi",
    "guardamar-segura",
    "pilar-horadada",
    "moraira",
    "teulada",
    "finestrat",
    "la-nucia",
    "albir",
    "rojales",
    "almoradi",
    "catral",
    "callosa-segura",
    "cox",
    "dolores",
    "rafal",
  ],
  castellon: [
    "castellon-plana",
    "vila-real",
    "burriana",
    "vinaros",
    "benicarlo",
    "onda",
    "almazora",
    "la-vall-uixo",
    "benicassim",
    "nules",
    "oropesa-mar",
    "segorbe",
    "betxi",
    "borriol",
    "lucena-cid",
    "alcora",
    "moncofar",
    "torreblanca",
    "peniscola",
    "alcala-xivert",
    "san-mateo",
  ],

  // ============ PAIS VASCO ============
  bizkaia: [
    "bilbao",
    "barakaldo",
    "getxo",
    "portugalete",
    "santurtzi",
    "basauri",
    "leioa",
    "galdakao",
    "durango",
    "erandio",
    "sestao",
    "gernika-lumo",
    "mungia",
    "amorebieta",
    "bermeo",
    "sopela",
    "algorta",
    "plentzia",
    "gorliz",
    "bakio",
    "berango",
    "loiu",
    "derio",
    "zamudio",
    "arrigorriaga",
    "zaratamo",
    "etxebarri",
  ],
  gipuzkoa: [
    "san-sebastian",
    "irun",
    "errenteria",
    "donostia",
    "eibar",
    "zarautz",
    "hernani",
    "tolosa",
    "arrasate",
    "hondarribia",
    "lasarte-oria",
    "pasaia",
    "azpeitia",
    "azkoitia",
    "bergara",
    "andoain",
    "beasain",
    "zumarraga",
    "legazpi",
    "urnieta",
    "oiartzun",
    "usurbil",
    "getaria",
    "zumaia",
    "deba",
    "mutriku",
  ],
  araba: [
    "vitoria-gasteiz",
    "llodio",
    "amurrio",
    "salvatierra",
    "oyón",
    "labastida",
    "laguardia",
    "alegria-dulantzi",
    "santa-cruz-campezo",
    "araia",
  ],

  // ============ GALICIA ============
  a_coruna: [
    "a-coruna",
    "santiago-compostela",
    "ferrol",
    "naron",
    "oleiros",
    "arteixo",
    "carballo",
    "culleredo",
    "cambre",
    "ames",
    "riveira",
    "boiro",
    "betanzos",
    "sada",
    "noia",
    "cee",
    "muxia",
    "fisterra",
    "muros",
    "porto-son",
    "rianxo",
    "padron",
    "ordes",
    "melide",
    "arzua",
    "curtis",
    "teo",
    "brion",
  ],
  pontevedra: [
    "vigo",
    "pontevedra",
    "vilagarcia-arousa",
    "redondela",
    "marin",
    "cangas",
    "moana",
    "ponteareas",
    "lalin",
    "porriño",
    "tui",
    "sanxenxo",
    "cambados",
    "o-grove",
    "nigran",
    "baiona",
    "gondomar",
    "mos",
    "salceda-caselas",
    "bueu",
    "a-guarda",
    "poio",
    "caldas-reis",
    "vilanova-arousa",
    "ribadumia",
  ],
  ourense: [
    "ourense",
    "verin",
    "o-barco-valdeorras",
    "carballino",
    "xinzo-limia",
    "allariz",
    "ribadavia",
    "o-pereiro-aguiar",
    "coles",
    "maceda",
    "celanova",
    "a-rua",
    "o-carballiño",
    "bande",
    "leiro",
    "castrelo-miño",
  ],
  lugo: [
    "lugo",
    "monforte-lemos",
    "viveiro",
    "vilalba",
    "sarria",
    "foz",
    "ribadeo",
    "burela",
    "chantada",
    "guitiriz",
    "xove",
    "cervo",
    "mondoñedo",
    "ourol",
  ],

  // ============ CASTILLA Y LEON ============
  valladolid: [
    "valladolid",
    "laguna-duero",
    "medina-campo",
    "arroyo-encomienda",
    "tordesillas",
    "tudela-duero",
    "simancas",
    "cigales",
    "zaratán",
    "boecillo",
    "aldeamayor-san-martin",
    "peñafiel",
    "íscar",
    "olmedo",
    "portillo",
    "mojados",
    "villabáñez",
  ],
  burgos: [
    "burgos",
    "miranda-ebro",
    "aranda-duero",
    "briviesca",
    "medina-pomar",
    "villarcayo",
    "lerma",
    "salas-infantes",
    "roa",
    "belorado",
    "pradoluengo",
  ],
  leon: [
    "leon",
    "ponferrada",
    "san-andres-rabanedo",
    "villaquilambre",
    "astorga",
    "la-bañeza",
    "bembibre",
    "villablino",
    "cacabelos",
    "camponaraya",
    "valencia-don-juan",
    "cistierna",
    "boñar",
    "la-robla",
    "santa-maria-paramo",
  ],
  salamanca: [
    "salamanca",
    "santa-marta-tormes",
    "bejar",
    "ciudad-rodrigo",
    "villamayor",
    "carbajosa-sagrada",
    "peñaranda-bracamonte",
    "guijuelo",
    "alba-tormes",
  ],
  zamora: ["zamora", "benavente", "toro", "morales-vino", "puebla-sanabria", "fuentesaúco"],
  palencia: ["palencia", "aguilar-campoo", "guardo", "venta-baños", "villamuriel-cerrato"],
  segovia: ["segovia", "cuellar", "el-espinar", "san-ildefonso", "cantalejo", "carbonero-mayor"],
  soria: ["soria", "almazan", "el-burgo-osma", "san-esteban-gormaz", "agreda"],
  avila: ["avila", "arevalo", "las-navas-marques", "candeleda", "el-barco-avila", "el-tiemblo"],

  // ============ CASTILLA-LA MANCHA ============
  toledo: [
    "toledo",
    "talavera-reina",
    "illescas",
    "seseña",
    "yuncos",
    "fuensalida",
    "madridejos",
    "mora",
    "consuegra",
    "sonseca",
    "ocaña",
    "villacañas",
    "quintanar-orden",
    "torrijos",
    "bargas",
    "olias-rey",
    "nambroca",
  ],
  ciudad_real: [
    "ciudad-real",
    "puertollano",
    "tomelloso",
    "alcazar-san-juan",
    "valdepeñas",
    "manzanares",
    "daimiel",
    "la-solana",
    "miguelturra",
    "bolaños-calatrava",
    "socuellamos",
    "campo-criptana",
    "villanueva-infantes",
    "almaden",
    "herencia",
  ],
  albacete: [
    "albacete",
    "hellin",
    "villarrobledo",
    "almansa",
    "la-roda",
    "caudete",
    "tobarra",
    "casas-ibanez",
    "madrigueras",
    "tarazona-mancha",
  ],
  guadalajara: [
    "guadalajara",
    "azuqueca-henares",
    "alovera",
    "el-casar",
    "cabanillas-campo",
    "marchamalo",
    "villanueva-torre",
    "siguenza",
    "molina-aragon",
    "brihuega",
  ],
  cuenca: [
    "cuenca",
    "tarancon",
    "san-clemente",
    "motilla-palancar",
    "quintanar-rey",
    "las-pedroñeras",
    "mota-cuervo",
    "iniesta",
    "honrubia",
    "villamayor-santiago",
  ],

  // ============ ARAGON ============
  zaragoza: [
    "zaragoza",
    "calatayud",
    "utebo",
    "ejea-caballeros",
    "tarazona",
    "caspe",
    "la-almunia-doña-godina",
    "cuarte-huerva",
    "zuera",
    "illueca",
    "maria-huerva",
    "fuentes-ebro",
    "alagón",
    "borja",
    "alfajarin",
    "villanueva-gállego",
    "cadrete",
  ],
  huesca: [
    "huesca",
    "monzón",
    "barbastro",
    "jaca",
    "fraga",
    "sabiñánigo",
    "binéfar",
    "tamarite-litera",
    "graus",
    "almudevar",
    "ayerbe",
    "sariñena",
  ],
  teruel: [
    "teruel",
    "alcañiz",
    "andorra",
    "calamocha",
    "utrillas",
    "montalban",
    "albarracin",
    "mora-rubielos",
    "cella",
    "calanda",
  ],

  // ============ MURCIA ============
  murcia: [
    "murcia",
    "cartagena",
    "lorca",
    "molina-segura",
    "alcantarilla",
    "mazarron",
    "cieza",
    "aguilas",
    "yecla",
    "jumilla",
    "torre-pacheco",
    "san-javier",
    "san-pedro-pinatar",
    "los-alcazares",
    "las-torres-cotillas",
    "totana",
    "alhama-murcia",
    "la-union",
    "archena",
    "mula",
    "caravaca-cruz",
    "calasparra",
    "bullas",
    "ceutí",
    "lorquí",
    "alguazas",
    "beniel",
    "santomera",
  ],

  // ============ ISLAS BALEARES ============
  baleares: [
    "palma",
    "calvia",
    "ibiza",
    "manacor",
    "llucmajor",
    "marratxi",
    "inca",
    "santa-eulalia-rio",
    "sant-josep-sa-talaia",
    "alcudia",
    "felanitx",
    "mahon",
    "ciutadella-menorca",
    "pollença",
    "soller",
    "sant-llorenç-cardassar",
    "sant-antoni-portmany",
    "muro",
    "campos",
    "santanyi",
    "santa-margalida",
    "sa-pobla",
    "binissalem",
    "arta",
    "capdepera",
    "son-servera",
    "cala-millor",
  ],

  // ============ ISLAS CANARIAS ============
  las_palmas: [
    "las-palmas-gran-canaria",
    "telde",
    "santa-lucia-tirajana",
    "arrecife",
    "san-bartolome-tirajana",
    "aguimes",
    "ingenio",
    "galdar",
    "arucas",
    "mogan",
    "puerto-rosario",
    "tias",
    "la-oliva",
    "pajara",
    "tuineje",
    "antigua",
    "teror",
    "firgas",
    "valsequillo",
    "tejeda",
  ],
  tenerife: [
    "santa-cruz-tenerife",
    "san-cristobal-laguna",
    "arona",
    "adeje",
    "la-orotava",
    "granadilla-abona",
    "puerto-cruz",
    "los-realejos",
    "tacoronte",
    "candelaria",
    "guia-isora",
    "icod-vinos",
    "santiago-teide",
    "guimar",
    "el-rosario",
    "tegueste",
    "la-victoria-acentejo",
    "san-miguel-abona",
    "vilaflor",
    "arico",
  ],

  // ============ ASTURIAS ============
  asturias: [
    "gijon",
    "oviedo",
    "aviles",
    "siero",
    "langreo",
    "mieres",
    "castrillon",
    "san-martin-rey-aurelio",
    "corvera-asturias",
    "llanera",
    "villaviciosa",
    "llanes",
    "cangas-onis",
    "navia",
    "luarca",
    "pravia",
    "grado",
    "tineo",
    "cangas-narcea",
    "laviana",
    "aller",
    "lena",
    "ribadesella",
    "colunga",
  ],

  // ============ CANTABRIA ============
  cantabria: [
    "santander",
    "torrelavega",
    "castro-urdiales",
    "camargo",
    "piélagos",
    "el-astillero",
    "laredo",
    "santa-cruz-bezana",
    "santoña",
    "colindres",
    "reinosa",
    "suances",
    "noja",
    "comillas",
    "san-vicente-barquera",
    "ramales-victoria",
    "medio-cudeyo",
    "marina-cudeyo",
    "ribamontán-mar",
    "bareyo",
  ],

  // ============ NAVARRA ============
  navarra: [
    "pamplona",
    "tudela",
    "barañain",
    "burlada",
    "estella-lizarra",
    "zizur-mayor",
    "tafalla",
    "ansoain",
    "villava",
    "berriozar",
    "huarte",
    "noain",
    "cintruénigo",
    "corella",
    "sangüesa",
    "peralta",
    "alsasua",
    "elizondo",
    "baztan",
    "lodosa",
    "olite",
    "viana",
    "carcastillo",
    "caparroso",
  ],

  // ============ LA RIOJA ============
  la_rioja: [
    "logroño",
    "calahorra",
    "arnedo",
    "haro",
    "lardero",
    "villamediana-iregua",
    "najera",
    "alfaro",
    "santo-domingo-calzada",
    "autol",
    "rincon-soto",
    "aldeanueva-ebro",
  ],

  // ============ EXTREMADURA ============
  badajoz: [
    "badajoz",
    "merida",
    "don-benito",
    "almendralejo",
    "villanueva-serena",
    "zafra",
    "montijo",
    "villafranca-barros",
    "olivenza",
    "jerez-caballeros",
    "azuaga",
    "llerena",
    "castuera",
    "fregenal-sierra",
    "santos-maimona",
  ],
  caceres: [
    "caceres",
    "plasencia",
    "navalmoral-mata",
    "coria",
    "trujillo",
    "miajadas",
    "talayuela",
    "moraleja",
    "arroyo-luz",
    "jaraiz-vera",
    "montehermoso",
  ],
}

// Legacy support for Catalunya-only
export const CITIES_CATALUNYA = {
  barcelona: CITIES_SPAIN.barcelona,
  girona: CITIES_SPAIN.girona,
  tarragona: CITIES_SPAIN.tarragona,
  lleida: CITIES_SPAIN.lleida,
}

// Helper to get all cities as flat array
export function getAllCities(): string[] {
  return Object.values(CITIES_SPAIN).flat()
}

// Helper to get city display name
export function getCityDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace("Llobregat", "de Llobregat")
    .replace("Valles", "del Vallès")
    .replace(" Mar", " de Mar")
    .replace("Emporda", "d'Empordà")
    .replace("Selva", "de la Selva")
    .replace("Camp", "del Camp")
    .replace(" Frontera", " de la Frontera")
    .replace(" Henares", " de Henares")
    .replace(" Reina", " de la Reina")
    .replace(" Segura", " del Segura")
}

// Helper to get region from city
export function getCityRegion(citySlug: string): string {
  for (const [region, cities] of Object.entries(CITIES_SPAIN)) {
    if (cities.includes(citySlug)) {
      const regionNames: Record<string, string> = {
        barcelona: "Barcelona",
        girona: "Girona",
        tarragona: "Tarragona",
        lleida: "Lleida",
        madrid: "Madrid",
        malaga: "Málaga",
        sevilla: "Sevilla",
        granada: "Granada",
        cordoba: "Córdoba",
        cadiz: "Cádiz",
        almeria: "Almería",
        huelva: "Huelva",
        jaen: "Jaén",
        valencia: "Valencia",
        alicante: "Alicante",
        castellon: "Castellón",
        bizkaia: "Bizkaia",
        gipuzkoa: "Gipuzkoa",
        araba: "Álava",
        a_coruna: "A Coruña",
        pontevedra: "Pontevedra",
        ourense: "Ourense",
        lugo: "Lugo",
        valladolid: "Valladolid",
        burgos: "Burgos",
        leon: "León",
        salamanca: "Salamanca",
        zamora: "Zamora",
        palencia: "Palencia",
        segovia: "Segovia",
        soria: "Soria",
        avila: "Ávila",
        toledo: "Toledo",
        ciudad_real: "Ciudad Real",
        albacete: "Albacete",
        guadalajara: "Guadalajara",
        cuenca: "Cuenca",
        zaragoza: "Zaragoza",
        huesca: "Huesca",
        teruel: "Teruel",
        murcia: "Murcia",
        baleares: "Islas Baleares",
        las_palmas: "Las Palmas",
        tenerife: "Tenerife",
        asturias: "Asturias",
        cantabria: "Cantabria",
        navarra: "Navarra",
        la_rioja: "La Rioja",
        badajoz: "Badajoz",
        caceres: "Cáceres",
      }
      return regionNames[region] || region.charAt(0).toUpperCase() + region.slice(1)
    }
  }
  return "España"
}

// Alias for backward compatibility
export const getCityProvince = getCityRegion

// Get total number of pages that will be generated
export function getTotalPageCount(): number {
  const cities = getAllCities()
  let total = PROFESSIONS.length // Base profession pages

  for (const profession of PROFESSIONS) {
    total += cities.length // /profession/city
    total += cities.length // /profession-urgente/city
    const problems = PROBLEMS[profession.id as keyof typeof PROBLEMS] || []
    total += problems.length * cities.length // /problema/profession/problem/city
  }

  return total
}

// Generate all possible URL combinations
export function generateAllUrls(): string[] {
  const urls: string[] = []
  const cities = getAllCities()

  for (const profession of PROFESSIONS) {
    urls.push(`/${profession.id}`)

    for (const city of cities) {
      urls.push(`/${profession.id}/${city}`)
      urls.push(`/${profession.id}-urgente/${city}`)
    }

    const problems = PROBLEMS[profession.id as keyof typeof PROBLEMS] || []
    for (const problem of problems) {
      for (const city of cities) {
        urls.push(`/problema/${profession.id}/${problem.id}/${city}`)
      }
    }
  }

  return urls
}

// Get nearby cities for a given city (same region)
export function getNearbyCities(citySlug: string, limit = 6): string[] {
  const region = Object.entries(CITIES_SPAIN).find(([_, cities]) => cities.includes(citySlug))?.[0]
  if (!region) return []
  const regionCities = CITIES_SPAIN[region as keyof typeof CITIES_SPAIN]
  return regionCities.filter((c) => c !== citySlug).slice(0, limit)
}

export const KEYWORD_MODIFIERS = [
  // ALTA URGENCIA (High Intent - Emergency)
  { id: "24-horas", name: "24 Horas", searchIntent: "urgency", priority: 1 },
  { id: "urgente", name: "Urgente", searchIntent: "urgency", priority: 1 },
  { id: "ahora", name: "Ahora", searchIntent: "urgency", priority: 1 },
  { id: "hoy", name: "Hoy", searchIntent: "urgency", priority: 1 },
  { id: "rapido", name: "Rápido", searchIntent: "urgency", priority: 1 },
  { id: "inmediato", name: "Inmediato", searchIntent: "urgency", priority: 1 },
  { id: "ya", name: "Ya", searchIntent: "urgency", priority: 1 },
  { id: "emergencia", name: "Emergencia", searchIntent: "urgency", priority: 1 },
  { id: "express", name: "Express", searchIntent: "urgency", priority: 1 },
  { id: "al-momento", name: "Al Momento", searchIntent: "urgency", priority: 1 },
  { id: "en-10-minutos", name: "En 10 Minutos", searchIntent: "urgency", priority: 1 },
  { id: "servicio-rapido", name: "Servicio Rápido", searchIntent: "urgency", priority: 1 },
  
  // PRECIO (Price Intent - High Commercial)
  { id: "economico", name: "Económico", searchIntent: "price", priority: 1 },
  { id: "barato", name: "Barato", searchIntent: "price", priority: 1 },
  { id: "low-cost", name: "Low Cost", searchIntent: "price", priority: 1 },
  { id: "precio", name: "Precio", searchIntent: "price", priority: 1 },
  { id: "presupuesto", name: "Presupuesto", searchIntent: "price", priority: 1 },
  { id: "tarifa", name: "Tarifa", searchIntent: "price", priority: 1 },
  { id: "coste", name: "Coste", searchIntent: "price", priority: 1 },
  { id: "cuanto-cuesta", name: "Cuánto Cuesta", searchIntent: "price", priority: 1 },
  { id: "presupuesto-gratis", name: "Presupuesto Gratis", searchIntent: "price", priority: 1 },
  { id: "sin-compromiso", name: "Sin Compromiso", searchIntent: "price", priority: 1 },
  { id: "mejor-precio", name: "Mejor Precio", searchIntent: "price", priority: 1 },
  { id: "asequible", name: "Asequible", searchIntent: "price", priority: 1 },
  
  // DISPONIBILIDAD (Availability)
  { id: "de-guardia", name: "de Guardia", searchIntent: "availability", priority: 2 },
  { id: "nocturno", name: "Nocturno", searchIntent: "availability", priority: 2 },
  { id: "festivos", name: "Festivos", searchIntent: "availability", priority: 2 },
  { id: "fin-de-semana", name: "Fin de Semana", searchIntent: "availability", priority: 2 },
  { id: "mismo-dia", name: "Mismo Día", searchIntent: "availability", priority: 2 },
  { id: "24h", name: "24h", searchIntent: "availability", priority: 2 },
  { id: "abierto-ahora", name: "Abierto Ahora", searchIntent: "availability", priority: 2 },
  { id: "disponible", name: "Disponible", searchIntent: "availability", priority: 2 },
  { id: "sabados", name: "Sábados", searchIntent: "availability", priority: 2 },
  { id: "domingos", name: "Domingos", searchIntent: "availability", priority: 2 },
  { id: "madrugada", name: "Madrugada", searchIntent: "availability", priority: 2 },
  
  // UBICACION (Location Intent)
  { id: "cerca-de-mi", name: "Cerca de Mí", searchIntent: "location", priority: 1 },
  { id: "a-domicilio", name: "a Domicilio", searchIntent: "location", priority: 1 },
  { id: "zona", name: "Zona", searchIntent: "location", priority: 2 },
  { id: "barrio", name: "Barrio", searchIntent: "location", priority: 2 },
  { id: "centro", name: "Centro", searchIntent: "location", priority: 2 },
  { id: "alrededores", name: "Alrededores", searchIntent: "location", priority: 2 },
  
  // CONFIANZA (Trust Intent)
  { id: "profesional", name: "Profesional", searchIntent: "trust", priority: 2 },
  { id: "de-confianza", name: "de Confianza", searchIntent: "trust", priority: 2 },
  { id: "con-garantia", name: "Con Garantía", searchIntent: "trust", priority: 2 },
  { id: "autorizados", name: "Autorizados", searchIntent: "trust", priority: 2 },
  { id: "certificado", name: "Certificado", searchIntent: "trust", priority: 2 },
  { id: "garantizado", name: "Garantizado", searchIntent: "trust", priority: 2 },
  { id: "oficial", name: "Oficial", searchIntent: "trust", priority: 2 },
  { id: "titulado", name: "Titulado", searchIntent: "trust", priority: 2 },
  { id: "homologado", name: "Homologado", searchIntent: "trust", priority: 2 },
  { id: "cualificado", name: "Cualificado", searchIntent: "trust", priority: 2 },
  { id: "con-factura", name: "Con Factura", searchIntent: "trust", priority: 2 },
  { id: "asegurado", name: "Asegurado", searchIntent: "trust", priority: 2 },
  
  // SERVICIO ESPECIFICO (Service Type)
  { id: "reparacion", name: "Reparación", searchIntent: "service", priority: 2 },
  { id: "instalacion", name: "Instalación", searchIntent: "service", priority: 2 },
  { id: "mantenimiento", name: "Mantenimiento", searchIntent: "service", priority: 2 },
  { id: "revision", name: "Revisión", searchIntent: "service", priority: 2 },
  { id: "averias", name: "Averías", searchIntent: "service", priority: 2 },
  { id: "cambio", name: "Cambio", searchIntent: "service", priority: 2 },
  { id: "sustitucion", name: "Sustitución", searchIntent: "service", priority: 2 },
  
  // COMBINACIONES ALTA CONVERSION
  { id: "urgente-24h", name: "Urgente 24h", searchIntent: "urgency", priority: 1 },
  { id: "barato-urgente", name: "Barato Urgente", searchIntent: "price", priority: 1 },
  { id: "rapido-economico", name: "Rápido Económico", searchIntent: "price", priority: 1 },
  { id: "urgente-barato", name: "Urgente Barato", searchIntent: "urgency", priority: 1 },
  { id: "24h-economico", name: "24h Económico", searchIntent: "urgency", priority: 1 },
]

export const LONG_TAIL_KEYWORDS = {
  electricista: [
    // Problemas urgentes
    "reparacion-electrica", "instalacion-electrica", "averia-electrica", "cuadro-electrico",
    "cortocircuito", "apagon", "enchufes", "iluminacion", "boletin-electrico", "aumento-potencia",
    // Alta intencion comercial
    "electricista-urgente-24h", "electricista-barato-cerca", "precio-electricista-hora",
    "electricista-para-casa", "electricista-para-local", "electricista-para-oficina",
    // Problemas especificos
    "diferencial-salta", "subida-tension", "cable-quemado", "olor-quemado-enchufe",
    "luces-parpadean", "fusibles-saltan", "instalacion-nueva", "cambio-cuadro",
    "certificado-electrico", "revision-instalacion", "toma-tierra",
    // Marcas y tipos
    "punto-luz", "interruptor", "enchufe-roto", "lampara", "led", "domotica",
  ],
  fontanero: [
    // Problemas urgentes
    "fuga-de-agua", "tuberia-rota", "desatasco", "cisterna", "grifo", "calentador",
    "termo", "inundacion", "humedad", "bajante",
    // Alta intencion comercial
    "fontanero-urgente-24h", "fontanero-barato-cerca", "precio-fontanero",
    "fontanero-para-casa", "fontanero-para-bano", "fontanero-para-cocina",
    // Problemas especificos
    "goteo-grifo", "agua-marron", "sin-presion-agua", "tuberia-atascada",
    "cambio-grifo", "instalacion-termo", "calentador-no-funciona",
    "cisterna-pierde-agua", "wc-no-funciona", "bide-atascado",
    // Tipos de trabajo
    "reforma-bano", "cambio-tuberias", "instalacion-radiadores", "suelo-radiante",
  ],
  cerrajero: [
    // Problemas urgentes
    "apertura-puerta", "cambio-cerradura", "cerradura-rota", "llave-rota",
    "puerta-blindada", "bombin", "caja-fuerte", "cerradura-seguridad",
    // Alta intencion comercial
    "cerrajero-urgente-24h", "cerrajero-barato-cerca", "precio-cerrajero",
    "cerrajero-para-casa", "cerrajero-para-coche", "cerrajero-para-local",
    // Problemas especificos
    "llave-partida-cerradura", "cerradura-atascada", "puerta-no-cierra",
    "puerta-no-abre", "me-deje-llaves-dentro", "robo-forzar-cerradura",
    // Tipos de trabajo
    "cerradura-antibumping", "cerradura-electronica", "amaestramiento-llaves",
    "copia-llave", "puerta-acorazada", "cerrojo", "mirilla-digital",
  ],
  desatascos: [
    // Problemas urgentes
    "wc-atascado", "fregadero-atascado", "ducha-atascada", "arqueta",
    "bajante-atascado", "camion-cuba", "limpieza-tuberias", "mal-olor-tuberias",
    // Alta intencion comercial
    "desatascos-urgente-24h", "desatascos-barato-cerca", "precio-desatasco",
    "desatasco-para-casa", "desatasco-para-comunidad", "desatasco-para-local",
    // Problemas especificos
    "inodoro-atascado", "bañera-atascada", "lavabo-atascado", "bidet-atascado",
    "tuberia-obstruida", "arqueta-llena", "fosa-septica", "pozo-ciego",
    // Tipos de trabajo
    "inspeccion-camara", "limpieza-arquetas", "vaciado-fosa", "poceria",
    "raices-tuberias", "grasa-tuberias", "desatasco-industrial",
  ],
  calderas: [
    // Problemas urgentes
    "reparacion-caldera", "revision-caldera", "caldera-no-enciende", "sin-agua-caliente",
    "caldera-junkers", "caldera-vaillant", "caldera-saunier-duval", "caldera-baxi",
    "radiadores", "calefaccion",
    // Alta intencion comercial
    "tecnico-calderas-urgente", "reparacion-calderas-24h", "precio-revision-caldera",
    "cambio-caldera-precio", "instalacion-caldera-precio",
    // Problemas especificos
    "caldera-pierde-agua", "caldera-hace-ruido", "caldera-se-apaga",
    "radiador-no-calienta", "termostato-no-funciona", "presion-caldera-baja",
    "error-caldera", "piloto-caldera", "caldera-no-arranca",
    // Marcas
    "caldera-ferroli", "caldera-roca", "caldera-beretta", "caldera-ariston",
    "caldera-wolf", "caldera-viessmann", "caldera-buderus",
    // Tipos de trabajo
    "mantenimiento-caldera", "limpieza-caldera", "puesta-punto-caldera",
    "certificado-gas", "revision-obligatoria", "contrato-mantenimiento",
  ],
}

export function getKeywordModifier(id: string) {
  return KEYWORD_MODIFIERS.find((m) => m.id === id)
}

export function getLongTailKeywords(professionId: string) {
  return LONG_TAIL_KEYWORDS[professionId as keyof typeof LONG_TAIL_KEYWORDS] || []
}

export function generateAllKeywordUrls() {
  const urls: string[] = []
  const professions = getAllProfessionSlugs()
  const cities = getAllCitySlugs()

  // Base URLs: /{profession}/{city}
  professions.forEach((prof) => {
    cities.forEach((city) => {
      urls.push(`/${prof}/${city}`)
    })
  })

  // Urgent URLs: /{profession}-urgente/{city}
  professions.forEach((prof) => {
    cities.forEach((city) => {
      urls.push(`/${prof}-urgente/${city}`)
    })
  })

  // 24h URLs: /{profession}-24-horas/{city}
  professions.forEach((prof) => {
    cities.forEach((city) => {
      urls.push(`/${prof}-24-horas/${city}`)
    })
  })

  // Economico URLs: /{profession}-economico/{city}
  professions.forEach((prof) => {
    cities.forEach((city) => {
      urls.push(`/${prof}-economico/${city}`)
    })
  })

  // Barato URLs: /{profession}-barato/{city}
  professions.forEach((prof) => {
    cities.forEach((city) => {
      urls.push(`/${prof}-barato/${city}`)
    })
  })

  return urls
}

// Helper to get all profession slugs
export function getAllProfessionSlugs(): string[] {
  return PROFESSIONS.map((profession) => profession.id)
}

// Helper to get all city slugs
export function getAllCitySlugs(): string[] {
  return Object.values(CITIES_SPAIN).flat()
}

// Helper functions to get profession and city by slug
export function getProfessionBySlug(slug: string) {
  return PROFESSIONS.find((p) => p.id === slug)
}

export function getCityBySlug(slug: string) {
  const allCities = getAllCities()
  if (!allCities.includes(slug)) return null
  return {
    slug,
    name: getCityDisplayName(slug),
    province: getCityRegion(slug),
  }
}
