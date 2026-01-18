import Stripe from "stripe"
import { neon } from "@neondatabase/serverless"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const leadId = searchParams.get("lead_id")
  const price = searchParams.get("price") || "0.5"
  const service = searchParams.get("service") || "general"

  if (!leadId) {
    return new Response(generateErrorHTML("Faltan parámetros", "Vuelve a Telegram e intenta de nuevo."), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return new Response(
      generateErrorHTML("Error de configuración", "Stripe no está configurado. Contacta soporte: @rapidlogitech"),
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      },
    )
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const priceInCents = Math.round(Number.parseFloat(price) * 100)

  const databaseUrl = process.env.NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.DATABASE_URL
  if (!databaseUrl) {
    return new Response(
      generateErrorHTML("Error de configuración", "Base de datos no configurada. Contacta soporte: @rapidlogitech"),
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      },
    )
  }

  try {
    const sql = neon(databaseUrl)

    // Verificar que el lead existe y está disponible
    const leads = await sql`
      SELECT * FROM leads WHERE id = ${leadId}
    `

    if (!leads || leads.length === 0) {
      return new Response(generateErrorHTML("Lead no encontrado", "Este lead ya no existe. Vuelve a Telegram."), {
        status: 404,
        headers: { "Content-Type": "text/html" },
      })
    }

    const lead = leads[0]

    if (lead.status === "accepted") {
      return new Response(
        generateErrorHTML(
          "Lead ya vendido",
          "Este lead ya fue comprado por otro profesional. ¡Sé más rápido la próxima vez!",
        ),
        { status: 400, headers: { "Content-Type": "text/html" } },
      )
    }

    const baseUrl = "https://rapidfix.es"

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Lead ${lead.service || service}`,
              description: `📍 ${lead.city || "Barcelona"} - ${(lead.problem || "Servicio solicitado").substring(0, 80)}`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/api/stripe/lead-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/lead-cancelled`,
      metadata: {
        lead_id: leadId,
        price_euros: price,
        service: service,
        telegram_message_id: lead.telegram_message_id?.toString() || "",
        telegram_group_id: lead.telegram_group_id || "",
        type: "lead_purchase",
      },
    })

    // Redirigir directamente a Stripe Checkout
    if (!session.url) {
      return new Response(generateErrorHTML("Error de pago", "Stripe no devolvió URL de pago."), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      })
    }

    return Response.redirect(session.url, 303)
  } catch (error) {
    console.error("[v0] Error in buy-lead:", error)
    const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    return new Response(generateErrorHTML("Error de pago", `No se pudo crear la sesión de pago: ${errorMessage}`), {
      status: 500,
      headers: { "Content-Type": "text/html" },
    })
  }
}

function generateErrorHTML(title: string, message: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - RapidFix</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 24px;
      padding: 48px 40px;
      text-align: center;
      max-width: 420px;
      box-shadow: 0 25px 80px rgba(0,0,0,0.4);
    }
    .icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 40px;
    }
    h1 {
      color: #1f2937;
      margin-bottom: 12px;
      font-size: 24px;
      font-weight: 700;
    }
    p {
      color: #6b7280;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
      padding: 16px 32px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
    }
    .support {
      margin-top: 24px;
      font-size: 14px;
      color: #9ca3af;
    }
    .support a {
      color: #3b82f6;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✕</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="https://t.me/rapidfix_fontaneros" class="btn">
      ← Volver a Telegram
    </a>
    <div class="support">
      ¿Necesitas ayuda? <a href="https://t.me/foundertch">@foundertch</a>
    </div>
  </div>
</body>
</html>
  `
}
