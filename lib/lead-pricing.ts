// Pricing dinámico calculado con IA
// Basado en datos de mercado REALES España 2024
// Fuentes: Habitissimo, Zaask, Service Direct, profesionales reales
//
// JUSTIFICACIÓN DE PRECIOS:
// - Fontanero urgente cobra: 200-300€ por servicio
// - Cerrajero 24h cobra: 80-500€ (media 150€)
// - Cerrajero festivo: 300-550€
// - Electricista urgente: 150-400€
// - Desatascos: 60-800€
// - Calderas: 80-4000€
//
// El lead debería costar ~15-25% del valor del trabajo
// Leads EXCLUSIVOS valen más que compartidos (competencia cobra $60-255 USD)
//
// Precio mínimo: 30€
// Precio máximo: 90€

export interface PricingResult {
  leadPrice: number
  estimatedJobValue: { min: number; max: number }
  workType: string
  urgency: "normal" | "urgente" | "emergencia"
  complexity: "simple" | "medio" | "complejo"
  confidence: "alta" | "media" | "baja"
  reasoning: string
}

// Regla: Lead = 15-25% del valor del trabajo
const MARKET_PRICES = {
  fontanero: {
    // Simple: trabajos de 50-150€ → lead 25€ (23%)
    simple: { job: { min: 50, max: 150 }, lead: 25 },
    // Medio: trabajos de 150-350€ → lead 35€ (20%)
    medio: { job: { min: 150, max: 350 }, lead: 35 },
    // Complejo: trabajos de 350-1000€ → lead 55€ (15%)
    complejo: { job: { min: 350, max: 1000 }, lead: 55 },
    // Emergencia: trabajos de 250-600€ urgentes → lead 65€ (25%)
    emergencia_extra: { job: { min: 250, max: 600 }, lead: 65 },
  },
  electricista: {
    simple: { job: { min: 60, max: 150 }, lead: 25 },
    medio: { job: { min: 150, max: 400 }, lead: 38 },
    complejo: { job: { min: 400, max: 2000 }, lead: 60 },
    emergencia_extra: { job: { min: 200, max: 600 }, lead: 65 },
  },
  cerrajero: {
    // Cerrajeros SIEMPRE son urgentes - precios más altos
    // Apertura simple día: 80-120€ → lead 25€
    simple: { job: { min: 80, max: 120 }, lead: 25 },
    // Apertura noche/fin de semana: 120-200€ → lead 35€
    medio: { job: { min: 120, max: 200 }, lead: 35 },
    // Cerraduras seguridad/cambio completo: 200-500€ → lead 55€
    complejo: { job: { min: 200, max: 500 }, lead: 55 },
    // Festivo/emergencia extrema: 300-550€ → lead 70€
    emergencia_extra: { job: { min: 300, max: 550 }, lead: 70 },
  },
  desatascos: {
    // Fregadero/lavabo simple: 60-120€ → lead 25€
    simple: { job: { min: 60, max: 120 }, lead: 25 },
    // WC/bañera: 120-250€ → lead 35€
    medio: { job: { min: 120, max: 250 }, lead: 35 },
    // Bajante/arqueta: 250-800€ → lead 55€
    complejo: { job: { min: 250, max: 800 }, lead: 55 },
    // Inundación/emergencia: 300-1000€ → lead 75€
    emergencia_extra: { job: { min: 300, max: 1000 }, lead: 75 },
  },
  calderas: {
    // Revisión/ajuste: 80-150€ → lead 25€
    simple: { job: { min: 80, max: 150 }, lead: 25 },
    // Reparación avería: 150-400€ → lead 40€
    medio: { job: { min: 150, max: 400 }, lead: 40 },
    // Caldera nueva: 1500-4000€ → lead 85€ (máximo)
    complejo: { job: { min: 1500, max: 4000 }, lead: 85 },
    // Sin calefacción/agua caliente urgente: 200-500€ → lead 60€
    emergencia_extra: { job: { min: 200, max: 500 }, lead: 60 },
  },
}

const MIN_LEAD_PRICE = 30
const MAX_LEAD_PRICE = 90

const URGENCY_MULTIPLIERS = {
  normal: 1.0,
  urgente: 1.25, // +25% por urgencia
  emergencia: 1.0, // Ya tiene su precio en emergencia_extra
}

const TESTING_MODE = true
const TEST_PRICE = 0.5

function getTimeMultiplier(): number {
  const hour = new Date().getHours()
  // Noche (22:00 - 07:00): +15%
  if (hour >= 22 || hour < 7) return 1.15
  // Fin de semana
  const day = new Date().getDay()
  if (day === 0 || day === 6) return 1.1 // +10%
  return 1.0
}

export function calculateLeadPrice(service: string, problem: string): PricingResult {
  if (TESTING_MODE) {
    return {
      leadPrice: TEST_PRICE,
      estimatedJobValue: { min: 100, max: 300 },
      workType: "TEST - Precio reducido",
      urgency: "normal",
      complexity: "simple",
      confidence: "alta",
      reasoning: "MODO TEST - Precio fijo 0.50€",
    }
  }

  if (!problem || problem.length < 10) {
    return getDefaultPricing(service, "Información insuficiente")
  }

  const serviceKey = service.toLowerCase() as keyof typeof MARKET_PRICES
  const marketData = MARKET_PRICES[serviceKey] || MARKET_PRICES.fontanero

  const problemLower = problem.toLowerCase()
  let urgency: "normal" | "urgente" | "emergencia" = "normal"

  const emergencyKeywords = [
    "emergencia",
    "inundación",
    "inundando",
    "encerrado",
    "sin luz",
    "sin agua",
    "ahora mismo",
    "urgentísimo",
    "no puedo entrar",
    "fuga grande",
    "reventado",
    "cortocircuito",
    "huele a gas",
  ]
  const urgentKeywords = [
    "urgente",
    "rápido",
    "hoy",
    "pronto",
    "cuanto antes",
    "lo antes posible",
    "esta tarde",
    "esta mañana",
  ]

  if (emergencyKeywords.some((kw) => problemLower.includes(kw))) {
    urgency = "emergencia"
  } else if (urgentKeywords.some((kw) => problemLower.includes(kw))) {
    urgency = "urgente"
  }

  let complexity: "simple" | "medio" | "complejo" = "medio"
  const simpleKeywords = [
    "grifo",
    "goteo",
    "enchufe",
    "bombilla",
    "interruptor",
    "copia llave",
    "fregadero atascado",
    "revisar",
  ]
  const complexKeywords = [
    "instalación",
    "reforma",
    "caldera nueva",
    "inundación",
    "bajante",
    "arqueta",
    "cuadro eléctrico",
    "cambiar cerradura",
    "puerta blindada",
    "instalación completa",
  ]

  if (complexKeywords.some((kw) => problemLower.includes(kw))) {
    complexity = "complejo"
  } else if (simpleKeywords.some((kw) => problemLower.includes(kw))) {
    complexity = "simple"
  }

  // Obtener datos de precio
  let priceData = marketData[complexity]
  if (urgency === "emergencia" && marketData.emergencia_extra) {
    priceData = marketData.emergencia_extra
  }

  let leadPrice = priceData.lead
  leadPrice = Math.round(leadPrice * URGENCY_MULTIPLIERS[urgency])
  leadPrice = Math.round(leadPrice * getTimeMultiplier())

  // Asegurar límites
  leadPrice = Math.max(MIN_LEAD_PRICE, Math.min(MAX_LEAD_PRICE, leadPrice))

  return {
    leadPrice,
    estimatedJobValue: priceData.job,
    workType:
      complexity === "simple"
        ? "Reparación simple"
        : complexity === "complejo"
          ? "Trabajo complejo"
          : "Reparación estándar",
    urgency,
    complexity,
    confidence: "media",
    reasoning: "Análisis por palabras clave",
  }
}

export async function calculateLeadPriceWithAI(
  service: string,
  problem: string,
  city?: string,
  name?: string,
): Promise<PricingResult> {
  if (TESTING_MODE) {
    return {
      leadPrice: TEST_PRICE,
      estimatedJobValue: { min: 100, max: 300 },
      workType: "TEST - Precio reducido",
      urgency: "normal",
      complexity: "simple",
      confidence: "alta",
      reasoning: "MODO TEST - Precio fijo 0.50€",
    }
  }

  if (!problem || problem.length < 10) {
    return getDefaultPricing(service, "No hay suficiente información del problema")
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Eres un experto en servicios del hogar en España. Tu trabajo es analizar el problema descrito y determinar el PRECIO JUSTO del lead.

DATOS DE MERCADO REALES (España 2024):
- Fontanero urgente: 200-300€
- Cerrajero 24h: 80-500€ (media 150€)
- Cerrajero festivo/noche: 300-550€
- Electricista urgente: 150-400€
- Desatascos: 60-800€
- Calderas: 80-4000€

REGLA: El lead debe costar 15-25% del valor del trabajo

CRITERIOS DE CLASIFICACIÓN:

SIMPLE (trabajos de 50-150€, lead: 25€):
- Cambiar grifo, arreglar goteo pequeño
- Cambiar enchufe o interruptor
- Copia de llaves normal
- Desatascar fregadero fácil
- Revisar caldera

MEDIO (trabajos de 150-400€, lead: 35-40€):
- Reparar fuga en tubería
- Cambiar cisterna o termo
- Problema en cuadro eléctrico
- Apertura de puerta estándar
- Desatascar WC o bañera
- Reparar avería caldera

COMPLEJO (trabajos de 400-2000€+, lead: 55-85€):
- Instalaciones completas
- Reformas de fontanería/electricidad
- Cerraduras de alta seguridad
- Desatascos de bajantes/arquetas
- Instalar caldera nueva

EMERGENCIA (añade +40-60% al precio del lead):
- Inundación activa
- Encerrado fuera de casa
- Sin luz en toda la casa
- Fuga de gas
- Noche (22:00-07:00)
- Festivos

IMPORTANTE:
- Los leads son EXCLUSIVOS (solo un profesional lo compra)
- El profesional gana el 75-85% del trabajo
- Si la descripción es vaga → complejidad MEDIA
- Palabras de emergencia → SIEMPRE aumentar precio

Responde SOLO en JSON:
{
  "workType": "descripción corta",
  "complexity": "simple|medio|complejo",
  "urgency": "normal|urgente|emergencia",
  "estimatedJobMin": numero,
  "estimatedJobMax": numero,
  "suggestedLeadPrice": numero (entre 25 y 85),
  "confidence": "alta|media|baja",
  "reasoning": "explicación"
}`,
          },
          {
            role: "user",
            content: `Servicio: ${service}
Problema: "${problem}"
Ciudad: ${city || "Barcelona"}
Hora actual: ${new Date().toLocaleTimeString("es-ES")}
Día: ${new Date().toLocaleDateString("es-ES", { weekday: "long" })}

Analiza y calcula el precio del lead.`,
          },
        ],
        temperature: 0.1,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      console.error("[v0] OpenAI API error:", response.status)
      return getDefaultPricing(service, "Error al analizar con IA")
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return getDefaultPricing(service, "Respuesta vacía de IA")
    }

    const cleanedContent = content.replace(/```json\n?|\n?```/g, "").trim()
    const analysis = JSON.parse(cleanedContent)

    let leadPrice = analysis.suggestedLeadPrice || MIN_LEAD_PRICE

    // Aplicar multiplicador de hora si no es emergencia (ya incluido)
    if (analysis.urgency !== "emergencia") {
      leadPrice = Math.round(leadPrice * getTimeMultiplier())
    }

    // Ajuste por confianza baja
    if (analysis.confidence === "baja") {
      leadPrice = Math.max(leadPrice, MIN_LEAD_PRICE + 10) // Mínimo 35€ si no estamos seguros
    }

    // Asegurar límites
    leadPrice = Math.max(MIN_LEAD_PRICE, Math.min(MAX_LEAD_PRICE, leadPrice))

    return {
      leadPrice,
      estimatedJobValue: {
        min: analysis.estimatedJobMin || 100,
        max: analysis.estimatedJobMax || 300,
      },
      workType: analysis.workType || "Trabajo general",
      urgency: analysis.urgency || "normal",
      complexity: analysis.complexity || "medio",
      confidence: analysis.confidence || "media",
      reasoning: analysis.reasoning || "Análisis automático",
    }
  } catch (error) {
    console.error("[v0] Error calculating price with AI:", error)
    return getDefaultPricing(service, "Error en el cálculo")
  }
}

function getDefaultPricing(service: string, reason: string): PricingResult {
  const serviceKey = service.toLowerCase() as keyof typeof MARKET_PRICES
  const marketData = MARKET_PRICES[serviceKey] || MARKET_PRICES.fontanero

  return {
    leadPrice: 35,
    estimatedJobValue: marketData.medio.job,
    workType: "Trabajo general",
    urgency: "normal",
    complexity: "medio",
    confidence: "baja",
    reasoning: reason,
  }
}

export function formatPricingForTelegram(pricing: PricingResult): string {
  const urgencyEmoji = {
    normal: "🟢",
    urgente: "🟡",
    emergencia: "🔴",
  }

  const urgencyText = {
    normal: "Normal",
    urgente: "Urgente (+25%)",
    emergencia: "EMERGENCIA",
  }

  const potentialProfit = {
    min: pricing.estimatedJobValue.min - pricing.leadPrice,
    max: pricing.estimatedJobValue.max - pricing.leadPrice,
  }

  const roi = Math.round((potentialProfit.max / pricing.leadPrice) * 100)

  return `
💰 *PRECIO:* ${pricing.leadPrice}€

${urgencyEmoji[pricing.urgency]} *Urgencia:* ${urgencyText[pricing.urgency]}
📋 *Tipo:* ${pricing.workType}

💼 *Valor del trabajo:* ${pricing.estimatedJobValue.min}-${pricing.estimatedJobValue.max}€
📈 *Tu ganancia:* ${potentialProfit.min}-${potentialProfit.max}€
🎯 *ROI potencial:* ${roi}%
  `.trim()
}
