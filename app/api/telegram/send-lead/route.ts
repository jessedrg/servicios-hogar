import { neon } from "@neondatabase/serverless"
import { calculateLeadPriceWithAI } from "@/lib/lead-pricing"
import { getBotToken, getGroupChatId, normalizeService } from "@/lib/telegram-bots"

export async function POST(req: Request) {
  const databaseUrl = process.env.NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error("[v0] No database URL found")
    return Response.json({ success: false, message: "Database not configured" }, { status: 500 })
  }

  const sql = neon(databaseUrl)
  const lead = await req.json()

  console.log("[v0] Received lead:", lead)

  const service = normalizeService(lead.service || "fontanero")
  const TELEGRAM_BOT_TOKEN = getBotToken(service)
  const GROUP_CHAT_ID = getGroupChatId(service)

  if (!TELEGRAM_BOT_TOKEN) {
    console.error("[v0] Missing Telegram bot token for service:", service)
    return Response.json({ success: false, message: "Telegram not configured" }, { status: 500 })
  }

  console.log("[v0] Calculating dynamic price with AI...")
  const pricing = await calculateLeadPriceWithAI(lead.service, lead.problem, lead.city, lead.name)
  console.log("[v0] Pricing result:", pricing)

  // Insertar lead en la base de datos
  console.log("[v0] Inserting lead into database...")
  const leadResult = await sql`
    INSERT INTO leads (
      service, 
      problem, 
      phone, 
      city, 
      name, 
      lead_price,
      estimated_job_min,
      estimated_job_max,
      work_type,
      urgency,
      complexity,
      status,
      created_at
    )
    VALUES (
      ${lead.service},
      ${lead.problem},
      ${lead.phone},
      ${lead.city},
      ${lead.name || "Cliente"},
      ${pricing.leadPrice},
      ${pricing.estimatedJobValue.min},
      ${pricing.estimatedJobValue.max},
      ${pricing.workType},
      ${pricing.urgency},
      ${pricing.complexity},
      'pending',
      NOW()
    )
    RETURNING id
  `

  const leadId = leadResult[0].id
  console.log("[v0] Lead created with ID:", leadId)

  const urgencyEmoji: Record<string, string> = {
    normal: "🟢",
    urgente: "🟠",
    emergencia: "🔴",
  }

  const urgencyText: Record<string, string> = {
    normal: "Normal",
    urgente: "Urgente",
    emergencia: "EMERGENCIA",
  }

  const potentialProfit = {
    min: pricing.estimatedJobValue.min - pricing.leadPrice,
    max: pricing.estimatedJobValue.max - pricing.leadPrice,
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rapidfix.es"
  const buyUrl = `${baseUrl}/api/stripe/buy-lead?lead_id=${leadId}&price=${pricing.leadPrice}&service=${service}`

  const message = `
━━━━━━━━━━━━━━━━━━━━━━━━
🔔  *NUEVO LEAD EXCLUSIVO*
━━━━━━━━━━━━━━━━━━━━━━━━

🔧 *Servicio:* ${lead.service || "Servicio"}
📍 *Zona:* ${lead.city || "Barcelona"}
${urgencyEmoji[pricing.urgency]} *Urgencia:* ${urgencyText[pricing.urgency]}

━━━━━━━━━━━━━━━━━━━━━━━━

📝 *Descripción del problema:*
_"${lead.problem || "No especificado"}"_

━━━━━━━━━━━━━━━━━━━━━━━━

💰 *PRECIO:* ${pricing.leadPrice}€
📞 *Teléfono:* •••••••••• _(visible al comprar)_

💼 Valor estimado: ${pricing.estimatedJobValue.min}€ - ${pricing.estimatedJobValue.max}€
📈 *Tu beneficio potencial:* ${potentialProfit.min}€ - ${potentialProfit.max}€

━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ *ANTES DE COMPRAR - LEE ESTO:*

✅ Compra SOLO si puedes hacer el trabajo en las próximas *2-3 horas*

✅ El cliente espera tu llamada *INMEDIATA*

❌ Si no contactas al cliente y pierdes el lead, *NO hay reembolso*

💬 Si quieres negociar el precio con el cliente, hazlo directamente

🆘 *¿Problemas con el lead?*
Contacta al founder: @rapidlogitech
_Valoramos cada caso - si hay un problema real, podemos ayudarte_

━━━━━━━━━━━━━━━━━━━━━━━━

🏷️ Lead #${leadId} • ${new Date().toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })}
`.trim()

  try {
    // Enviar al grupo de Telegram con botón directo a Stripe
    if (GROUP_CHAT_ID) {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: GROUP_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: `💳 COMPRAR LEAD EXCLUSIVO (${pricing.leadPrice}€)`,
                  url: buyUrl,
                },
              ],
            ],
          },
        }),
      })

      const result = await response.json()

      if (result.ok) {
        await sql`
          UPDATE leads 
          SET telegram_message_id = ${result.result.message_id},
              telegram_group_id = ${GROUP_CHAT_ID}
          WHERE id = ${leadId}
        `
        console.log("[v0] Lead sent to group. Lead ID:", leadId, "Price:", pricing.leadPrice)
      } else {
        console.error("[v0] Telegram API error:", result)
      }
    }

    return Response.json({
      success: true,
      leadId,
      pricing: {
        price: pricing.leadPrice,
        jobValue: pricing.estimatedJobValue,
        urgency: pricing.urgency,
        complexity: pricing.complexity,
      },
    })
  } catch (error) {
    console.error("[v0] Error sending to Telegram:", error)
    return Response.json({ success: false, message: "Failed to send to Telegram" }, { status: 500 })
  }
}
