 import fs from "fs";
import path from "path";

// =============================================================================
// SITEMAP DATA - Single Source of Truth for SEO URLs
// =============================================================================
// Auto-generated from Catalonia municipalities CSV
// Total: 948 Catalonia municipalities
// =============================================================================

export const VALID_PROFESSIONS = [
  "electricista", "fontanero", "cerrajero", "desatascos", "calderas"
] as const;

export type Profession = typeof VALID_PROFESSIONS[number];

// =============================================================================
// HIGH-INTENT KEYWORD MODIFIERS
// =============================================================================
export const MODIFIERS = [
  "", // base (no modifier)
  // ==========================================================================
  // URGENCIA MÁXIMA (highest commercial intent - emergency searches)
  // ==========================================================================
  "-urgente", "-24-horas", "-ahora", "-hoy", "-rapido", "-inmediato", "-ya",
  "-emergencia", "-express", "-24h", "-urgencias", "-sos", "-al-momento",
  "-ahora-mismo", "-de-urgencia", "-llamar-ahora", "-necesito",
  // ==========================================================================
  // PRECIO / PRESUPUESTO (commercial intent - price seekers)
  // ==========================================================================
  "-economico", "-barato", "-low-cost", "-mejor-precio", "-asequible",
  "-sin-compromiso", "-gratis-presupuesto", "-precios-justos", "-oferta",
  "-presupuesto-gratis", "-precio-justo", "-tarifas", "-cuanto-cuesta",
  "-precios", "-coste", "-tarifa",
  // ==========================================================================
  // DISPONIBILIDAD (time-sensitive searches)
  // ==========================================================================
  "-de-guardia", "-nocturno", "-festivos", "-fin-de-semana", "-mismo-dia",
  "-sabados", "-domingos", "-noche", "-365-dias", "-abierto-hoy",
  "-disponible", "-abierto-ahora", "-horario",
  // ==========================================================================
  // UBICACIÓN / LOCAL (geo-intent)
  // ==========================================================================
  "-cerca-de-mi", "-a-domicilio", "-zona", "-centro", "-local",
  "-cerca", "-mi-zona", "-barrio",
  // ==========================================================================
  // CONFIANZA / CALIDAD (trust signals)
  // ==========================================================================
  "-profesional", "-de-confianza", "-con-garantia", "-autorizados", "-certificado",
  "-oficial", "-titulado", "-homologado", "-experto", "-especialista", "-recomendado",
  "-fiable", "-serio", "-bueno", "-mejor", "-top",
  // ==========================================================================
  // SERVICIO / ACCIÓN (service-specific)
  // ==========================================================================
  "-reparacion", "-instalacion", "-mantenimiento", "-revision", "-averias",
  "-arreglar", "-reparar", "-instalar", "-cambiar", "-sustituir",
  // ==========================================================================
  // COMBOS ALTA CONVERSIÓN (multi-intent - highest value)
  // ==========================================================================
  "-urgente-24h", "-barato-urgente", "-rapido-economico", "-urgente-barato",
  "-24h-economico", "-profesional-urgente", "-economico-24h",
  "-urgente-hoy", "-barato-rapido", "-cerca-urgente", "-profesional-barato",
  "-urgente-economico", "-rapido-barato", "-hoy-urgente",
  // ==========================================================================
  // BÚSQUEDAS NATURALES CATALUÑA (natural language queries)
  // ==========================================================================
  "-busco", "-necesito", "-contactar", "-llamar", "-contratar",
  "-encontrar", "-servicio", "-empresa", "-empresas",
  // ==========================================================================
  // VALORACIONES / OPINIONES (review seekers - high intent)
  // ==========================================================================
  "-opiniones", "-valoraciones", "-resenas", "-comentarios",
] as const;

export type Modifier = typeof MODIFIERS[number];

// =============================================================================
// PROBLEMS BY PROFESSION
// =============================================================================
export const PROBLEMS: Record<Profession, readonly string[]> = {
  electricista: [
    "apagon", "cortocircuito", "olor-quemado", "diferencial-salta", "enchufes-no-funcionan",
    "luces-parpadean", "cuadro-electrico", "instalacion-electrica", "subida-tension",
    "cable-quemado", "fusibles", "interruptor-no-funciona", "enchufe-quemado",
    "sobrecarga-electrica", "corte-luz",
  ],
  fontanero: [
    "fuga-agua", "tuberia-rota", "inundacion", "atasco-grave", "grifo-gotea",
    "cisterna-no-funciona", "calentador", "humedad", "bajante-roto", "arqueta-atascada",
    "agua-no-sale", "presion-baja", "tuberia-atascada", "desague-lento", "rotura-tuberia",
  ],
  cerrajero: [
    "puerta-bloqueada", "cerradura-rota", "llave-dentro", "robo", "cambio-cerradura",
    "copia-llaves", "cerradura-seguridad", "puerta-blindada", "bombin-roto", "llave-rota",
    "cerrojo-atascado", "puerta-no-abre", "cerradura-atascada", "apertura-urgente",
  ],
  desatascos: [
    "wc-atascado", "fregadero-atascado", "arqueta-atascada", "mal-olor", "ducha-atascada",
    "bajante-atascado", "limpieza-tuberias", "poceria", "fosa-septica", "atasco-grave",
    "desague-atascado", "tuberia-obstruida", "alcantarillado", "sumidero-atascado",
  ],
  calderas: [
    "sin-agua-caliente", "caldera-no-enciende", "fuga-gas", "ruido-caldera", "revision-caldera",
    "cambio-caldera", "radiadores", "calefaccion-no-funciona", "caldera-pierde-agua",
    "presion-caldera", "termostato-roto", "piloto-no-enciende", "caldera-se-apaga",
  ],
} as const;

// =============================================================================
// ALL CATALONIA MUNICIPALITIES (948 total)
// =============================================================================

let cachedCities: string[] | null = null

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

function slugifyCityName(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function loadCataloniaCitiesFromCsv(): string[] {
  if (cachedCities) return cachedCities

  const csvPath = path.join(process.cwd(), "Municipis_Catalunya_Geo.csv")
  const raw = fs.readFileSync(csvPath, "utf8")
  const lines = raw.split(/\r?\n/).filter(Boolean)

  // Skip header
  const cities = new Set<string>()
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i])
    const name = (cols[1] || "").trim()
    if (!name) continue
    if (name.toLowerCase() === "no consta") continue

    const slug = slugifyCityName(name)
    if (slug) cities.add(slug)
  }

  cachedCities = Array.from(cities).sort()
  return cachedCities
}

export const CITIES: readonly string[] = loadCataloniaCitiesFromCsv()

export function isValidCity(slug: string): boolean {
  return CITIES.includes(slug)
}

export function isValidProfession(id: string): boolean {
  return VALID_PROFESSIONS.includes(id as Profession);
}
