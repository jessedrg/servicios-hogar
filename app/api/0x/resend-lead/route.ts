import { neon } from "@neondatabase/serverless"
import { getBotToken, getGroupChatId, normalizeService } from "@/lib/telegram-bots"
import { cookies } from "next/headers"

const SESSION_SECRET = "rf_admin_session_2024_punk"

export async function POST(req: Request) {
  // Verify auth
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_session")?.value

  if (session !== SESSION_SECRET) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  const databaseUrl = process.env.NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.DATABASE_URL
  if (!databaseUrl) {
    return Response.json({ success: false, message: "Database not configured" }, { status: 500 })
  }

  const sql = neon(databaseUrl)
  const { leadId, offerPrice } = await req.json()

  if (!leadId || !offerPrice) {
    return Response.json({ success: false, message: "Missing leadId or offerPrice" }, { status: 400 })
  }

  // Get lead from database
  const leads = await sql`SELECT * FROM leads WHERE id = ${leadId}`

  if (leads.length === 0) {
    return Response.json({ success: false, message: "Lead not found" }, { status: 404 })
  }

  const lead = leads[0]

  if (lead.status === "accepted") {
    return Response.json({ success: false, message: "Lead already sold" }, { status: 400 })
  }

  const service = normalizeService(lead.service || "fontanero")
  const TELEGRAM_BOT_TOKEN = getBotToken(service)
  const GROUP_CHAT_ID = getGroupChatId(service)

  if (!TELEGRAM_BOT_TOKEN || !GROUP_CHAT_ID) {
    return Response.json({ success: false, message: "Telegram not configured for this service" }, { status: 500 })
  }

  const originalPrice = Number(lead.lead_price) || 35
  const discount = Math.round(((originalPrice - offerPrice) / originalPrice) * 100)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rapidfix.es"
  const buyUrl = `${baseUrl}/api/stripe/buy-lead?lead_id=${leadId}&price=${offerPrice}&service=${service}`

  const message = `
🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
⚡️  *SÚPER OFERTA FLASH* ⚡️
🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

💥 *-${discount}% DESCUENTO* 💥

━━━━━━━━━━━━━━━━━━━━━━━━

🔧 *Servicio:* ${lead.service}
📍 *Zona:* ${lead.city}

📝 *Problema:*
_"${lead.problem}"_

━━━━━━━━━━━━━━━━━━━━━━━━

💰 *ANTES:* ~${originalPrice}€~
🎯 *AHORA:* *${offerPrice}€*

📞 *Teléfono:* •••••••••• _(visible al comprar)_

━━━━━━━━━━━━━━━━━━━━━━━━

⏰ *OFERTA LIMITADA*
_Este precio especial es solo por tiempo limitado_

⚠️ Contacta al cliente en las próximas *2-3 horas*

━━━━━━━━━━━━━━━━━━━━━━━━

🏷️ Lead #${leadId}
`.trim()

  try {
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
                text: `🔥 COMPRAR AHORA POR SOLO ${offerPrice}€ 🔥`,
                url: buyUrl,
              },
            ],
          ],
        },
      }),
    })

    const result = await response.json()

    if (result.ok) {
      // Update lead with new offer price
      await sql`
        UPDATE leads 
        SET lead_price = ${offerPrice},
            telegram_message_id = ${result.result.message_id}
        WHERE id = ${leadId}
      `

      return Response.json({
        success: true,
        message: `Lead reenviado con oferta de ${offerPrice}€`,
        messageId: result.result.message_id,
      })
    } else {
      console.error("[v0] Telegram API error:", result)
      return Response.json({ success: false, message: "Error sending to Telegram" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] Error resending lead:", error)
    return Response.json({ success: false, message: "Failed to resend lead" }, { status: 500 })
  }
}
