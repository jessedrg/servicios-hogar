import Stripe from "stripe"
import { neon } from "@neondatabase/serverless"
import { getBotToken, normalizeService } from "@/lib/telegram-bots"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const SUPPORT_CONTACT = "@foundertch"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return new Response(generateHTML("error", "Faltan parámetros", ""), {
      headers: { "Content-Type": "text/html" },
    })
  }

  const databaseUrl = process.env.NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.DATABASE_URL
  if (!databaseUrl) {
    return new Response(generateHTML("error", "Error de configuración", ""), {
      headers: { "Content-Type": "text/html" },
    })
  }

  const sql = neon(databaseUrl)

  try {
    // Verificar pago en Stripe y obtener metadata
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== "paid") {
      return new Response(generateHTML("error", "El pago no se completó", ""), {
        headers: { "Content-Type": "text/html" },
      })
    }

    // Obtener datos del metadata de Stripe
    const leadId = session.metadata?.lead_id
    const priceEuros = Number.parseFloat(session.metadata?.price_euros || "18")
    const service = session.metadata?.service || "general"
    const telegramMessageId = session.metadata?.telegram_message_id
    const telegramGroupId = session.metadata?.telegram_group_id

    // Obtener email del comprador desde Stripe
    const customerEmail = session.customer_details?.email || ""

    if (!leadId) {
      return new Response(generateHTML("error", "Datos de sesión incompletos", ""), {
        headers: { "Content-Type": "text/html" },
      })
    }

    // Verificar que el lead existe
    const existingLead = await sql`
      SELECT * FROM leads WHERE id = ${leadId}
    `

    if (!existingLead || existingLead.length === 0) {
      return new Response(generateHTML("error", "Lead no encontrado", ""), {
        headers: { "Content-Type": "text/html" },
      })
    }

    const lead = existingLead[0]

    // Ya procesado anteriormente
    if (lead.status === "accepted" && lead.stripe_session_id === sessionId) {
      return new Response(
        generateHTML(
          "success",
          "¡Lead comprado!",
          lead.phone,
          lead.name,
          lead.city,
          lead.problem,
          lead.service,
          priceEuros,
          lead.estimated_job_min,
          lead.estimated_job_max,
        ),
        { headers: { "Content-Type": "text/html" } },
      )
    }

    // Comprado por otro
    if (lead.status === "accepted") {
      // Procesar reembolso automático
      try {
        const paymentIntent = session.payment_intent as string
        if (paymentIntent) {
          await stripe.refunds.create({
            payment_intent: paymentIntent,
            reason: "duplicate",
          })
        }
      } catch (refundError) {
        console.error("[v0] Error processing refund:", refundError)
      }

      return new Response(
        generateHTML("error", "Este lead ya fue comprado. Tu pago será reembolsado automáticamente.", ""),
        { headers: { "Content-Type": "text/html" } },
      )
    }

    // Actualizar lead como aceptado
    await sql`
      UPDATE leads 
      SET status = 'accepted', 
          accepted_at = NOW(),
          lead_price = ${priceEuros},
          stripe_session_id = ${sessionId},
          buyer_email = ${customerEmail}
      WHERE id = ${leadId} AND status = 'pending'
    `

    // Verificar que se actualizó (por si alguien más lo compró en ese momento)
    const updatedLead = await sql`SELECT * FROM leads WHERE id = ${leadId}`
    if (updatedLead[0]?.stripe_session_id !== sessionId) {
      // Otro lo compró primero, reembolsar
      try {
        const paymentIntent = session.payment_intent as string
        if (paymentIntent) {
          await stripe.refunds.create({ payment_intent: paymentIntent, reason: "duplicate" })
        }
      } catch (e) {
        console.error("[v0] Refund error:", e)
      }
      return new Response(generateHTML("error", "Lead comprado por otro. Pago reembolsado.", ""), {
        headers: { "Content-Type": "text/html" },
      })
    }

    // Actualizar el mensaje en el grupo de Telegram para mostrar que fue vendido
    const TELEGRAM_BOT_TOKEN = getBotToken(normalizeService(service))

    if (telegramGroupId && telegramMessageId && TELEGRAM_BOT_TOKEN) {
      try {
        const soldMessage = `
✅ *LEAD VENDIDO*

┏━━━━━━━━━━━━━━━━━━━━━━━━┓

   📋  *${lead.service || "Servicio"}*
   📍  ${lead.city || "Barcelona"}
   💰  ${priceEuros}€

┗━━━━━━━━━━━━━━━━━━━━━━━━┛

⏰ ${new Date().toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
        `.trim()

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramGroupId,
            message_id: Number.parseInt(telegramMessageId),
            text: soldMessage,
            parse_mode: "Markdown",
          }),
        })
      } catch (e) {
        console.error("[v0] Error updating group message:", e)
      }
    }

    // Mostrar página de éxito con los datos del lead
    return new Response(
      generateHTML(
        "success",
        "¡Lead comprado con éxito!",
        lead.phone,
        lead.name,
        lead.city,
        lead.problem,
        lead.service,
        priceEuros,
        lead.estimated_job_min || 80,
        lead.estimated_job_max || 200,
      ),
      { headers: { "Content-Type": "text/html" } },
    )
  } catch (error) {
    console.error("[v0] Error processing lead purchase:", error)
    return new Response(generateHTML("error", `Error al procesar. Contacta soporte: ${SUPPORT_CONTACT}`, ""), {
      headers: { "Content-Type": "text/html" },
    })
  }
}

function generateHTML(
  status: "success" | "error",
  message: string,
  phone?: string,
  name?: string,
  city?: string,
  problem?: string,
  service?: string,
  price?: number,
  jobMin?: number,
  jobMax?: number,
): string {
  const isSuccess = status === "success" && phone

  const phoneClean = phone?.replace(/\s+/g, "").replace(/^0/, "") || ""
  const phoneWhatsApp = phoneClean.startsWith("+") ? phoneClean.replace("+", "") : `34${phoneClean}`

  if (!isSuccess) {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error - RapidFix</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #FAFAFA;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 400px;
      width: 100%;
      text-align: center;
    }
    .logo {
      width: 48px;
      height: 48px;
      background: #FF4D00;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 32px;
    }
    .logo svg { width: 28px; height: 28px; }
    .card {
      background: white;
      border: 1px solid #E5E5E5;
      border-radius: 16px;
      padding: 32px 24px;
    }
    .icon {
      width: 56px;
      height: 56px;
      background: #FEE2E2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }
    .icon svg { width: 28px; height: 28px; color: #DC2626; }
    h1 { color: #171717; font-size: 20px; font-weight: 600; margin-bottom: 8px; }
    p { color: #737373; font-size: 15px; line-height: 1.5; margin-bottom: 24px; }
    .btn {
      display: inline-block;
      background: #171717;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
      transition: background 0.2s;
    }
    .btn:hover { background: #404040; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    </div>
    <div class="card">
      <div class="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M15 9l-6 6M9 9l6 6"/>
        </svg>
      </div>
      <h1>Error</h1>
      <p>${message}</p>
      <a href="https://t.me/rapidfix_fontaneros" class="btn">Volver a Telegram</a>
    </div>
  </div>
</body>
</html>`
  }

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lead Comprado - RapidFix</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #FAFAFA;
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 440px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 24px 0;
    }
    .logo {
      width: 40px;
      height: 40px;
      background: #FF4D00;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo svg { width: 24px; height: 24px; }
    .brand { font-size: 20px; font-weight: 700; color: #171717; }
    
    .success-badge {
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      border-radius: 100px;
      padding: 8px 16px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
    }
    .success-badge span { color: #059669; font-size: 14px; font-weight: 500; }
    .success-dot { width: 8px; height: 8px; background: #10B981; border-radius: 50%; }
    
    .card {
      background: white;
      border: 1px solid #E5E5E5;
      border-radius: 16px;
      overflow: hidden;
    }
    
    .phone-section {
      background: #171717;
      padding: 28px 24px;
      text-align: center;
    }
    .phone-label { 
      color: #A3A3A3; 
      font-size: 12px; 
      font-weight: 500;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .phone-number {
      color: white;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }
    
    /* New button styles for call and WhatsApp */
    .action-buttons {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .call-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #FF4D00;
      color: white;
      padding: 14px 24px;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      transition: all 0.2s;
      flex: 1;
      justify-content: center;
      min-width: 140px;
    }
    .call-btn:hover { background: #E64500; transform: translateY(-1px); }
    .call-btn svg { width: 20px; height: 20px; }
    
    .whatsapp-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #25D366;
      color: white;
      padding: 14px 24px;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      transition: all 0.2s;
      flex: 1;
      justify-content: center;
      min-width: 140px;
    }
    .whatsapp-btn:hover { background: #1DA851; transform: translateY(-1px); }
    .whatsapp-btn svg { width: 20px; height: 20px; }
    
    .details-section { padding: 24px; }
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .detail-item { }
    .detail-item.full { grid-column: 1 / -1; }
    .detail-label { 
      color: #737373; 
      font-size: 12px; 
      font-weight: 500;
      margin-bottom: 4px;
    }
    .detail-value { 
      color: #171717; 
      font-size: 15px; 
      font-weight: 500;
    }
    
    .divider {
      height: 1px;
      background: #E5E5E5;
      margin: 0 24px;
    }
    
    .tips-section { padding: 24px; }
    .tips-title {
      color: #171717;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tips-title svg { width: 16px; height: 16px; color: #FF4D00; }
    .tips-list { list-style: none; }
    .tips-list li {
      color: #525252;
      font-size: 14px;
      line-height: 1.5;
      padding: 6px 0;
      padding-left: 20px;
      position: relative;
    }
    .tips-list li:before {
      content: "";
      position: absolute;
      left: 0;
      top: 12px;
      width: 6px;
      height: 6px;
      background: #D4D4D4;
      border-radius: 50%;
    }
    
    .support {
      margin-top: 16px;
      padding: 16px;
      background: #FFFBEB;
      border: 1px solid #FDE68A;
      border-radius: 12px;
    }
    .support-text {
      color: #92400E;
      font-size: 13px;
      line-height: 1.5;
    }
    .support-text a { color: #D97706; font-weight: 500; }
    
    .footer {
      text-align: center;
      padding: 24px;
    }
    .footer a {
      color: #737373;
      font-size: 14px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s;
    }
    .footer a:hover { color: #171717; }
    .footer svg { width: 16px; height: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      </div>
      <span class="brand">RapidFix</span>
    </div>
    
    <div style="text-align: center;">
      <div class="success-badge">
        <span class="success-dot"></span>
        <span>Compra completada</span>
      </div>
    </div>
    
    <div class="card">
      <div class="phone-section">
        <div class="phone-label">TELÉFONO DEL CLIENTE</div>
        <div class="phone-number">${phone}</div>
        
        <!-- Two buttons: Call and WhatsApp -->
        <div class="action-buttons">
          <a href="tel:${phone}" class="call-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Llamar
          </a>
          <a href="https://wa.me/${phoneWhatsApp}?text=Hola%2C%20soy%20profesional%20de%20RapidFix.%20Vi%20que%20necesitas%20ayuda%20con%20${encodeURIComponent(service || "tu problema")}.%20%C2%BFCu%C3%A1ndo%20puedo%20pasar%3F" target="_blank" class="whatsapp-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
      
      <div class="details-section">
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-label">Cliente</div>
            <div class="detail-value">${name || "Cliente"}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Ciudad</div>
            <div class="detail-value">${city || "Barcelona"}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Servicio</div>
            <div class="detail-value">${service || "Fontanería"}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Pagaste</div>
            <div class="detail-value">${price}€</div>
          </div>
          <div class="detail-item full">
            <div class="detail-label">Problema</div>
            <div class="detail-value">${(problem || "No especificado").substring(0, 80)}</div>
          </div>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="tips-section">
        <div class="tips-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          Consejos para cerrar el trabajo
        </div>
        <ul class="tips-list">
          <li>Contacta en los próximos 5 minutos</li>
          <li>Preséntate como profesional de RapidFix</li>
          <li>Confirma la dirección y el problema</li>
          <li>Da un precio aproximado por teléfono</li>
        </ul>
        
        <div class="support">
          <div class="support-text">
            ¿Problema con el lead? Contacta a <a href="https://t.me/foundertch">@foundertch</a> y lo revisamos.
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <a href="https://t.me/rapidfix_fontaneros">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Volver a Telegram
      </a>
    </div>
  </div>
</body>
</html>`
}
