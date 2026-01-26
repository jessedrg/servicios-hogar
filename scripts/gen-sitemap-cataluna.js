const fs = require('fs');
const path = require('path');

// =============================================================================
// SITEMAP CATALUÑA - HOGARYA - ALTA INTENCIÓN SEO
// =============================================================================
// Genera sitemap XML optimizado con combinaciones de máxima conversión
// Profesiones + Modificadores alta intención + 948 municipios Cataluña
// =============================================================================

const BASE_URL = 'https://www.servicioshogar.xyz';
const MAX_URLS_PER_SITEMAP = 2000; // Reducido para que Google cargue más rápido
const PROFESSIONS = ['electricista', 'fontanero', 'cerrajero', 'desatascos', 'calderas'];

// =============================================================================
// MODIFICADORES DE ALTA INTENCIÓN (ordenados por valor de conversión)
// =============================================================================
const HIGH_INTENT_MODIFIERS = [
  '', // base
  // URGENCIA MÁXIMA (highest commercial intent)
  '-urgente', '-24-horas', '-ahora', '-hoy', '-rapido', '-inmediato',
  '-emergencia', '-24h', '-urgencias', '-ahora-mismo', '-necesito',
  // PRECIO / PRESUPUESTO (commercial intent)
  '-economico', '-barato', '-mejor-precio', '-presupuesto-gratis',
  '-precio-justo', '-cuanto-cuesta', '-precios', '-tarifa',
  // DISPONIBILIDAD (time-sensitive)
  '-de-guardia', '-nocturno', '-festivos', '-mismo-dia', '-abierto-hoy',
  // CONFIANZA / CALIDAD
  '-profesional', '-de-confianza', '-con-garantia', '-certificado',
  '-recomendado', '-mejor', '-fiable',
  // COMBOS ALTA CONVERSIÓN (multi-intent - highest value)
  '-urgente-24h', '-barato-urgente', '-urgente-economico',
  '-urgente-hoy', '-rapido-barato', '-profesional-barato',
  // BÚSQUEDAS NATURALES
  '-busco', '-necesito', '-contratar', '-encontrar', '-servicio',
];

const PREFIXES = ['precio-', 'presupuesto-'];

// Problemas específicos de alta intención
const PROBLEMS = {
  electricista: ['apagon', 'cortocircuito', 'diferencial-salta', 'cuadro-electrico', 'corte-luz', 'enchufes-no-funcionan'],
  fontanero: ['fuga-agua', 'tuberia-rota', 'inundacion', 'atasco-grave', 'humedad', 'cisterna-no-funciona'],
  cerrajero: ['puerta-bloqueada', 'cerradura-rota', 'llave-dentro', 'cambio-cerradura', 'apertura-urgente'],
  desatascos: ['wc-atascado', 'fregadero-atascado', 'arqueta-atascada', 'bajante-atascado', 'atasco-grave'],
  calderas: ['sin-agua-caliente', 'caldera-no-enciende', 'fuga-gas', 'caldera-se-apaga', 'caldera-pierde-agua']
};

// =============================================================================
// CSV PARSER - Municipios Cataluña
// =============================================================================
function slugify(input) {
  return input.trim().toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Cargar municipios de Cataluña desde CSV
const csvPath = path.join(__dirname, '..', 'Municipis_Catalunya_Geo.csv');
const raw = fs.readFileSync(csvPath, 'utf8');
const lines = raw.split(/\r?\n/).filter(Boolean);
const cities = new Set();

for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(',');
  // El nombre está en la columna 1 (índice 1), puede tener comillas
  let name = (cols[1] || '').trim().replace(/^"|"$/g, '');
  if (!name || name === 'No consta') continue;
  const slug = slugify(name);
  if (slug) cities.add(slug);
}

const cityList = Array.from(cities).sort();
console.log(`\n📍 ${cityList.length} municipios de Cataluña cargados desde CSV\n`);

// =============================================================================
// GENERACIÓN DE SITEMAP
// =============================================================================
const outputDir = path.join(__dirname, '..', 'public', 'sitemaps');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const date = new Date().toISOString().split('T')[0];
let totalUrls = 0;
const sitemapFiles = [];

function generateXml(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const url of urls) {
    xml += `<url><loc>${url}</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
  }
  xml += '</urlset>';
  return xml;
}

// 1. Profesión + Modificador + Ciudad (CORE) - dividido en chunks
console.log('🔧 Generando sitemaps por profesión...');
for (const prof of PROFESSIONS) {
  const urls = [];
  for (const mod of HIGH_INTENT_MODIFIERS) {
    for (const city of cityList) {
      urls.push(`${BASE_URL}/${prof}${mod}/${city}/`);
    }
  }
  
  // Dividir en chunks de MAX_URLS_PER_SITEMAP
  const chunks = Math.ceil(urls.length / MAX_URLS_PER_SITEMAP);
  for (let i = 0; i < chunks; i++) {
    const chunk = urls.slice(i * MAX_URLS_PER_SITEMAP, (i + 1) * MAX_URLS_PER_SITEMAP);
    const filename = chunks > 1 ? `sitemap-cat-${prof}-${i + 1}.xml` : `sitemap-cat-${prof}.xml`;
    fs.writeFileSync(path.join(outputDir, filename), generateXml(chunk));
    sitemapFiles.push(filename);
    totalUrls += chunk.length;
    console.log(`   ✅ ${filename}: ${chunk.length.toLocaleString()} URLs`);
  }
}

// 2. Prefijos (precio-X, presupuesto-X)
console.log('\n💰 Generando sitemaps de precios...');
for (const prefix of PREFIXES) {
  const urls = [];
  for (const prof of PROFESSIONS) {
    for (const city of cityList) {
      urls.push(`${BASE_URL}/${prefix}${prof}/${city}/`);
    }
  }
  const filename = `sitemap-cat-${prefix.replace('-', '')}.xml`;
  fs.writeFileSync(path.join(outputDir, filename), generateXml(urls));
  sitemapFiles.push(filename);
  totalUrls += urls.length;
  console.log(`   ✅ ${filename}: ${urls.length.toLocaleString()} URLs`);
}

// 3. Problemas específicos
console.log('\n🔥 Generando sitemaps de problemas...');
const problemUrls = [];
for (const prof of PROFESSIONS) {
  const problems = PROBLEMS[prof] || [];
  for (const problem of problems) {
    for (const city of cityList) {
      problemUrls.push(`${BASE_URL}/problema/${prof}/${problem}/${city}/`);
    }
  }
}

const problemChunks = Math.ceil(problemUrls.length / MAX_URLS_PER_SITEMAP);
for (let i = 0; i < problemChunks; i++) {
  const chunk = problemUrls.slice(i * MAX_URLS_PER_SITEMAP, (i + 1) * MAX_URLS_PER_SITEMAP);
  const filename = problemChunks > 1 ? `sitemap-cat-problemas-${i + 1}.xml` : `sitemap-cat-problemas.xml`;
  fs.writeFileSync(path.join(outputDir, filename), generateXml(chunk));
  sitemapFiles.push(filename);
  totalUrls += chunk.length;
  console.log(`   ✅ ${filename}: ${chunk.length.toLocaleString()} URLs`);
}

// 4. Sitemap Index
let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const f of sitemapFiles) {
  indexXml += `<sitemap><loc>${BASE_URL}/sitemaps/${f}</loc><lastmod>${date}</lastmod></sitemap>\n`;
}
indexXml += '</sitemapindex>';
fs.writeFileSync(path.join(outputDir, 'sitemap-cat-v1.xml'), indexXml);

// =============================================================================
// RESUMEN
// =============================================================================
console.log('\n' + '='.repeat(65));
console.log('🎯 SITEMAP CATALUÑA - HOGARYA - ALTA INTENCIÓN GENERADO');
console.log('='.repeat(65));
console.log(`📊 Total URLs:              ${totalUrls.toLocaleString()}`);
console.log(`📁 Archivos sitemap:        ${sitemapFiles.length + 1}`);
console.log(`📍 Municipios Cataluña:     ${cityList.length}`);
console.log(`🔧 Profesiones:             ${PROFESSIONS.length}`);
console.log(`⚡ Modificadores:           ${HIGH_INTENT_MODIFIERS.length}`);
console.log(`🔥 Problemas:               ${Object.values(PROBLEMS).flat().length}`);
console.log('='.repeat(65));
console.log(`\n📂 Output: ${outputDir}/`);
console.log(`\n📌 SITEMAP INDEX para Google Search Console:`);
console.log(`   ${BASE_URL}/sitemaps/sitemap-cat-v1.xml`);
console.log('\n🚀 ¡Listo para indexar!\n');
