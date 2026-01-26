import fs from "fs"
import path from "path"

// =============================================================================
// SITEMAP GENERATOR - CATALUÑA ALTA INTENCIÓN
// =============================================================================
// Genera sitemap XML optimizado para SEO con combinaciones de alta conversión
// Profesiones + Modificadores de alta intención + 948 municipios de Cataluña
// =============================================================================

const BASE_URL = "https://www.hogarya.eu"

// Profesiones principales
const PROFESSIONS = [
  "electricista", "fontanero", "cerrajero", "desatascos", "calderas"
]

// Modificadores de ALTA INTENCIÓN (ordenados por valor de conversión)
const HIGH_INTENT_MODIFIERS = [
  "", // base
  // URGENCIA MÁXIMA
  "-urgente", "-24-horas", "-ahora", "-hoy", "-rapido", "-inmediato",
  "-emergencia", "-24h", "-urgencias",
  // PRECIO
  "-economico", "-barato", "-mejor-precio", "-presupuesto-gratis",
  // DISPONIBILIDAD
  "-de-guardia", "-nocturno", "-festivos", "-mismo-dia",
  // CONFIANZA
  "-profesional", "-de-confianza", "-con-garantia", "-certificado",
  // COMBOS ALTA CONVERSIÓN
  "-urgente-24h", "-barato-urgente", "-urgente-economico",
]

// Prefijos adicionales de alta intención
const PREFIXES = [
  "precio-", "presupuesto-"
]

// Problemas por profesión (alta intención de búsqueda)
const PROBLEMS: Record<string, string[]> = {
  electricista: [
    "apagon", "cortocircuito", "diferencial-salta", "enchufes-no-funcionan",
    "cuadro-electrico", "instalacion-electrica", "corte-luz"
  ],
  fontanero: [
    "fuga-agua", "tuberia-rota", "inundacion", "atasco-grave",
    "cisterna-no-funciona", "humedad", "rotura-tuberia"
  ],
  cerrajero: [
    "puerta-bloqueada", "cerradura-rota", "llave-dentro", "robo",
    "cambio-cerradura", "apertura-urgente"
  ],
  desatascos: [
    "wc-atascado", "fregadero-atascado", "arqueta-atascada",
    "bajante-atascado", "atasco-grave"
  ],
  calderas: [
    "sin-agua-caliente", "caldera-no-enciende", "fuga-gas",
    "caldera-pierde-agua", "caldera-se-apaga"
  ],
}

// =============================================================================
// CSV PARSER
// =============================================================================
function parseCsvLine(line: string): string[] {
  const out: string[] = []
  let cur = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
      continue
    }
    if (ch === "," && !inQuotes) {
      out.push(cur)
      cur = ""
      continue
    }
    cur += ch
  }
  out.push(cur)
  return out
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function loadCataloniaCities(): string[] {
  const csvPath = path.join(process.cwd(), "Municipis_Catalunya_Geo.csv")
  const raw = fs.readFileSync(csvPath, "utf8")
  const lines = raw.split(/\r?\n/).filter(Boolean)

  const cities = new Set<string>()
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i])
    const name = (cols[1] || "").trim()
    if (!name || name.toLowerCase() === "no consta") continue
    const slug = slugify(name)
    if (slug) cities.add(slug)
  }

  return Array.from(cities).sort()
}

// =============================================================================
// SITEMAP GENERATION
// =============================================================================
function generateSitemapXml(urls: string[]): string {
  const date = new Date().toISOString().split("T")[0]
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  
  for (const url of urls) {
    xml += `  <url>\n`
    xml += `    <loc>${url}</loc>\n`
    xml += `    <lastmod>${date}</lastmod>\n`
    xml += `    <changefreq>weekly</changefreq>\n`
    xml += `    <priority>0.8</priority>\n`
    xml += `  </url>\n`
  }
  
  xml += '</urlset>'
  return xml
}

function generateSitemapIndex(sitemapFiles: string[]): string {
  const date = new Date().toISOString().split("T")[0]
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  
  for (const file of sitemapFiles) {
    xml += `  <sitemap>\n`
    xml += `    <loc>${BASE_URL}/sitemaps/${file}</loc>\n`
    xml += `    <lastmod>${date}</lastmod>\n`
    xml += `  </sitemap>\n`
  }
  
  xml += '</sitemapindex>'
  return xml
}

// =============================================================================
// MAIN
// =============================================================================
async function main() {
  console.log("🚀 Generando sitemap de Cataluña con alta intención...")
  
  const cities = loadCataloniaCities()
  console.log(`📍 ${cities.length} municipios de Cataluña cargados`)
  
  const outputDir = path.join(process.cwd(), "public", "sitemaps")
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const sitemapFiles: string[] = []
  let totalUrls = 0
  const MAX_URLS_PER_FILE = 45000
  
  // 1. Profesión + Modificador + Ciudad
  for (const profession of PROFESSIONS) {
    const urls: string[] = []
    
    for (const modifier of HIGH_INTENT_MODIFIERS) {
      for (const city of cities) {
        if (modifier) {
          urls.push(`${BASE_URL}/${profession}${modifier}/${city}/`)
        } else {
          urls.push(`${BASE_URL}/${profession}/${city}/`)
        }
      }
    }
    
    // Split into chunks if needed
    const chunks = Math.ceil(urls.length / MAX_URLS_PER_FILE)
    for (let i = 0; i < chunks; i++) {
      const chunk = urls.slice(i * MAX_URLS_PER_FILE, (i + 1) * MAX_URLS_PER_FILE)
      const filename = chunks > 1 ? `sitemap-${profession}-${i + 1}.xml` : `sitemap-${profession}.xml`
      const xml = generateSitemapXml(chunk)
      fs.writeFileSync(path.join(outputDir, filename), xml)
      sitemapFiles.push(filename)
      totalUrls += chunk.length
      console.log(`  ✅ ${filename}: ${chunk.length.toLocaleString()} URLs`)
    }
  }
  
  // 2. Prefijos (precio-X, presupuesto-X)
  for (const prefix of PREFIXES) {
    const urls: string[] = []
    for (const profession of PROFESSIONS) {
      for (const city of cities) {
        urls.push(`${BASE_URL}/${prefix}${profession}/${city}/`)
      }
    }
    const filename = `sitemap-${prefix.replace("-", "")}.xml`
    const xml = generateSitemapXml(urls)
    fs.writeFileSync(path.join(outputDir, filename), xml)
    sitemapFiles.push(filename)
    totalUrls += urls.length
    console.log(`  ✅ ${filename}: ${urls.length.toLocaleString()} URLs`)
  }
  
  // 3. Problemas específicos
  const problemUrls: string[] = []
  for (const profession of PROFESSIONS) {
    const problems = PROBLEMS[profession] || []
    for (const problem of problems) {
      for (const city of cities) {
        problemUrls.push(`${BASE_URL}/problema/${profession}/${problem}/${city}/`)
      }
    }
  }
  
  const problemChunks = Math.ceil(problemUrls.length / MAX_URLS_PER_FILE)
  for (let i = 0; i < problemChunks; i++) {
    const chunk = problemUrls.slice(i * MAX_URLS_PER_FILE, (i + 1) * MAX_URLS_PER_FILE)
    const filename = problemChunks > 1 ? `sitemap-problemas-${i + 1}.xml` : `sitemap-problemas.xml`
    const xml = generateSitemapXml(chunk)
    fs.writeFileSync(path.join(outputDir, filename), xml)
    sitemapFiles.push(filename)
    totalUrls += chunk.length
    console.log(`  ✅ ${filename}: ${chunk.length.toLocaleString()} URLs`)
  }
  
  // 4. Generar sitemap index
  const indexXml = generateSitemapIndex(sitemapFiles)
  fs.writeFileSync(path.join(outputDir, "sitemap-cataluna.xml"), indexXml)
  
  console.log("\n" + "=".repeat(60))
  console.log(`🎯 SITEMAP CATALUÑA GENERADO`)
  console.log("=".repeat(60))
  console.log(`📊 Total URLs: ${totalUrls.toLocaleString()}`)
  console.log(`📁 Archivos: ${sitemapFiles.length + 1}`)
  console.log(`📍 Municipios: ${cities.length}`)
  console.log(`🔧 Profesiones: ${PROFESSIONS.length}`)
  console.log(`⚡ Modificadores alta intención: ${HIGH_INTENT_MODIFIERS.length}`)
  console.log("=".repeat(60))
  console.log(`\n✅ Sitemap index: ${outputDir}/sitemap-cataluna.xml`)
  console.log(`\n📌 Añade a Google Search Console:`)
  console.log(`   ${BASE_URL}/sitemaps/sitemap-cataluna.xml`)
}

main().catch(console.error)
