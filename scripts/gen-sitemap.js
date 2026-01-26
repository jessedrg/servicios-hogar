const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.hogarya.eu';
const PROFESSIONS = ['electricista', 'fontanero', 'cerrajero', 'desatascos', 'calderas'];

// Modificadores de ALTA INTENCIÓN ordenados por valor de conversión
const HIGH_INTENT_MODIFIERS = [
  '', // base
  // URGENCIA MÁXIMA
  '-urgente', '-24-horas', '-ahora', '-hoy', '-rapido', '-inmediato',
  '-emergencia', '-24h', '-urgencias',
  // PRECIO
  '-economico', '-barato', '-mejor-precio', '-presupuesto-gratis',
  // DISPONIBILIDAD
  '-de-guardia', '-nocturno', '-festivos', '-mismo-dia',
  // CONFIANZA
  '-profesional', '-de-confianza', '-con-garantia', '-certificado',
  // COMBOS ALTA CONVERSIÓN
  '-urgente-24h', '-barato-urgente', '-urgente-economico'
];

const PREFIXES = ['precio-', 'presupuesto-'];

const PROBLEMS = {
  electricista: ['apagon', 'cortocircuito', 'diferencial-salta', 'cuadro-electrico', 'corte-luz'],
  fontanero: ['fuga-agua', 'tuberia-rota', 'inundacion', 'atasco-grave', 'humedad'],
  cerrajero: ['puerta-bloqueada', 'cerradura-rota', 'llave-dentro', 'cambio-cerradura'],
  desatascos: ['wc-atascado', 'fregadero-atascado', 'arqueta-atascada', 'bajante-atascado'],
  calderas: ['sin-agua-caliente', 'caldera-no-enciende', 'fuga-gas', 'caldera-se-apaga']
};

function parseCsvLine(line) {
  const out = []; let cur = ''; let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { 
      if (inQuotes && line[i+1] === '"') { cur += '"'; i++; } 
      else { inQuotes = !inQuotes; } 
      continue; 
    }
    if (ch === ',' && !inQuotes) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  out.push(cur); 
  return out;
}

function slugify(input) {
  return input.trim().toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Cargar municipios de Cataluña
const csvPath = path.join(__dirname, '..', 'Municipis_Catalunya_Geo.csv');
const raw = fs.readFileSync(csvPath, 'utf8');
const lines = raw.split(/\r?\n/).filter(Boolean);
const cities = new Set();

for (let i = 1; i < lines.length; i++) {
  const cols = parseCsvLine(lines[i]);
  const name = (cols[1] || '').trim();
  if (!name || name.toLowerCase() === 'no consta') continue;
  const slug = slugify(name);
  if (slug) cities.add(slug);
}

const cityList = Array.from(cities).sort();
console.log(`📍 ${cityList.length} municipios de Cataluña cargados\n`);

// Crear directorio output
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

// 1. Profesión + Modificador + Ciudad
for (const prof of PROFESSIONS) {
  const urls = [];
  for (const mod of HIGH_INTENT_MODIFIERS) {
    for (const city of cityList) {
      urls.push(`${BASE_URL}/${prof}${mod}/${city}/`);
    }
  }
  const filename = `sitemap-${prof}.xml`;
  fs.writeFileSync(path.join(outputDir, filename), generateXml(urls));
  sitemapFiles.push(filename);
  totalUrls += urls.length;
  console.log(`✅ ${filename}: ${urls.length.toLocaleString()} URLs`);
}

// 2. Prefijos (precio-X, presupuesto-X)
for (const prefix of PREFIXES) {
  const urls = [];
  for (const prof of PROFESSIONS) {
    for (const city of cityList) {
      urls.push(`${BASE_URL}/${prefix}${prof}/${city}/`);
    }
  }
  const filename = `sitemap-${prefix.replace('-', '')}.xml`;
  fs.writeFileSync(path.join(outputDir, filename), generateXml(urls));
  sitemapFiles.push(filename);
  totalUrls += urls.length;
  console.log(`✅ ${filename}: ${urls.length.toLocaleString()} URLs`);
}

// 3. Problemas específicos
const problemUrls = [];
for (const prof of PROFESSIONS) {
  const problems = PROBLEMS[prof] || [];
  for (const problem of problems) {
    for (const city of cityList) {
      problemUrls.push(`${BASE_URL}/problema/${prof}/${problem}/${city}/`);
    }
  }
}
const filename = 'sitemap-problemas.xml';
fs.writeFileSync(path.join(outputDir, filename), generateXml(problemUrls));
sitemapFiles.push(filename);
totalUrls += problemUrls.length;
console.log(`✅ ${filename}: ${problemUrls.length.toLocaleString()} URLs`);

// 4. Sitemap Index
let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const f of sitemapFiles) {
  indexXml += `<sitemap><loc>${BASE_URL}/sitemaps/${f}</loc><lastmod>${date}</lastmod></sitemap>\n`;
}
indexXml += '</sitemapindex>';
fs.writeFileSync(path.join(outputDir, 'sitemap-cataluna.xml'), indexXml);

console.log('\n' + '='.repeat(60));
console.log('🎯 SITEMAP CATALUÑA - ALTA INTENCIÓN');
console.log('='.repeat(60));
console.log(`📊 Total URLs: ${totalUrls.toLocaleString()}`);
console.log(`📁 Archivos: ${sitemapFiles.length + 1}`);
console.log(`📍 Municipios: ${cityList.length}`);
console.log(`🔧 Profesiones: ${PROFESSIONS.length}`);
console.log(`⚡ Modificadores: ${HIGH_INTENT_MODIFIERS.length}`);
console.log('='.repeat(60));
console.log(`\n📌 Sitemap Index: ${BASE_URL}/sitemaps/sitemap-cataluna.xml`);
console.log(`\n🚀 Añade a Google Search Console para indexar!`);
