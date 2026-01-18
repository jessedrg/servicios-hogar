import { neon } from "@neondatabase/serverless"

export async function POST(req: Request) {
  const databaseUrl = process.env.NEON_NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error("[v0] No database URL found")
    return Response.json({ error: "Database not configured" }, { status: 500 })
  }

  const sql = neon(databaseUrl)
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
  const sig = req.headers.get("stripe-signature")
  const body = await req.text()

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    console.error("[v0] Webhook signature verification failed:", err.message)
    return Response.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object

    if (session.payment_status === "paid") {
      const chatId = session.metadata?.chat_id
      const leadId = session.metadata?.lead_id
      const credits = Number.parseInt(session.metadata?.credits || "0")

      try {
        if (leadId) {
          await sql`
            UPDATE leads 
            SET status = 'paid',
                updated_at = NOW()
            WHERE id = ${leadId}
          `
          console.log(`[v0] Lead ${leadId} marked as paid`)
        }

        // Handle credits purchase (existing logic)
        if (chatId && credits > 0) {
          await sql`
            UPDATE partners 
            SET credits = credits + ${credits},
                updated_at = NOW()
            WHERE telegram_chat_id = ${chatId}
          `

          await sql`
            INSERT INTO credit_transactions (partner_id, amount, type, stripe_session_id)
            SELECT id, ${credits}, 'purchase', ${session.id}
            FROM partners
            WHERE telegram_chat_id = ${chatId}
          `

          console.log(`[v0] Added ${credits} credits to partner ${chatId}`)

          await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: `✅ *Pago confirmado!*\n\nSe han añadido *${credits} créditos* a tu cuenta.\n\nUsa /credits para ver tu saldo.`,
              parse_mode: "Markdown",
            }),
          })
        }
      } catch (error) {
        console.error("[v0] Error processing payment:", error)
      }
    }
  }

  return Response.json({ received: true })
}
