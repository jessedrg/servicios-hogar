import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface LeadEmailData {
  service: string
  problem: string
  phone: string
  city: string
  name: string
  requestedDate?: string
  leadId: string
}

interface PartnerNotificationData {
  name: string
  company: string
  phone: string
  email: string
  service: string
}

export function createPartnerNotificationEmail(data: PartnerNotificationData): string {
  const { name, company, phone, email, service } = data

  const whatsappUrl = `https://wa.me/34${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${name}, soy de RapidFix. Vi que te interesa recibir clientes de ${service}. ¿Tienes un momento para hablar?`)}`
  const callUrl = `tel:+34${phone.replace(/\D/g, "")}`

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:500px;margin:0 auto;padding:20px;">
    
    <div style="background:#000;color:#fff;padding:20px;text-align:center;border-radius:12px 12px 0 0;">
      <h1 style="margin:0;font-size:20px;font-weight:600;">RapidFix</h1>
      <p style="margin:8px 0 0;opacity:0.7;font-size:14px;">Nuevo Partner Interesado</p>
    </div>
    
    <div style="background:#fff;padding:24px;border-radius:0 0 12px 12px;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
      
      <div style="text-align:center;margin-bottom:20px;">
        <span style="background:#22c55e;color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;">NUEVO PARTNER</span>
      </div>
      
      <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#6b7280;font-size:14px;">Nombre</td>
            <td style="padding:8px 0;text-align:right;font-weight:600;font-size:14px;">${name}</td>
          </tr>
          ${
            company
              ? `
          <tr>
            <td style="padding:8px 0;color:#6b7280;font-size:14px;">Empresa</td>
            <td style="padding:8px 0;text-align:right;font-weight:600;font-size:14px;">${company}</td>
          </tr>
          `
              : ""
          }
          <tr>
            <td style="padding:8px 0;color:#6b7280;font-size:14px;">Servicio</td>
            <td style="padding:8px 0;text-align:right;font-weight:600;font-size:14px;">${service.charAt(0).toUpperCase() + service.slice(1)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;font-size:14px;">Email</td>
            <td style="padding:8px 0;text-align:right;font-weight:600;font-size:14px;">${email}</td>
          </tr>
        </table>
      </div>
      
      <div style="background:#000;color:#fff;border-radius:8px;padding:20px;text-align:center;margin-bottom:20px;">
        <p style="margin:0 0 8px;font-size:13px;opacity:0.7;">Teléfono del partner</p>
        <p style="margin:0;font-size:28px;font-weight:700;letter-spacing:2px;">${phone}</p>
      </div>
      
      <div style="display:flex;gap:12px;">
        <a href="${callUrl}" style="flex:1;display:block;background:#FF4D00;color:#fff;text-decoration:none;padding:14px;border-radius:8px;text-align:center;font-weight:600;font-size:15px;">
          Llamar
        </a>
        <a href="${whatsappUrl}" style="flex:1;display:block;background:#25d366;color:#fff;text-decoration:none;padding:14px;border-radius:8px;text-align:center;font-weight:600;font-size:15px;">
          WhatsApp
        </a>
      </div>
      
      <p style="margin:20px 0 0;text-align:center;font-size:12px;color:#9ca3af;">
        ${new Date().toLocaleString("es-ES")}
      </p>
      
    </div>
  </div>
</body>
</html>
  `
}

export async function sendLeadEmail(data: LeadEmailData): Promise<{ success: boolean; error?: string }> {
  const { service, problem, phone, city, name, requestedDate, leadId } = data

  const dashboardUrl = `https://rapidfix.es/0x/dashboard`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:400px;margin:0 auto;padding:40px 20px;">
    
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="margin:0;font-size:24px;font-weight:700;color:#fff;letter-spacing:-0.5px;">RapidFix</h1>
    </div>
    
    <div style="background:#111;border:1px solid #222;border-radius:16px;padding:32px;margin-bottom:24px;">
      
      <p style="margin:0 0 24px;text-align:center;font-size:13px;color:#666;text-transform:uppercase;letter-spacing:1px;">Nuevo Lead</p>
      
      <div style="text-align:center;margin-bottom:28px;">
        <p style="margin:0;font-size:32px;font-weight:700;color:#fff;">${service.charAt(0).toUpperCase() + service.slice(1)}</p>
        <p style="margin:8px 0 0;font-size:15px;color:#888;">${city}</p>
      </div>
      
      <div style="border-top:1px solid #222;padding-top:20px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#666;font-size:13px;">Cliente</td>
            <td style="padding:10px 0;text-align:right;font-weight:500;font-size:14px;color:#fff;">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#666;font-size:13px;">Teléfono</td>
            <td style="padding:10px 0;text-align:right;font-weight:600;font-size:14px;color:#fff;">${phone}</td>
          </tr>
          ${
            requestedDate
              ? `
          <tr>
            <td style="padding:10px 0;color:#666;font-size:13px;">Cuándo</td>
            <td style="padding:10px 0;text-align:right;font-weight:500;font-size:14px;color:#FF4D00;">${requestedDate}</td>
          </tr>
          `
              : ""
          }
        </table>
      </div>
      
      <div style="background:#0a0a0a;border-radius:8px;padding:16px;margin-bottom:24px;">
        <p style="margin:0;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Problema</p>
        <p style="margin:0;font-size:14px;color:#ccc;line-height:1.5;">${problem}</p>
      </div>
      
      <a href="${dashboardUrl}" style="display:block;background:#fff;color:#000;text-decoration:none;padding:16px;border-radius:8px;text-align:center;font-weight:600;font-size:14px;">
        Abrir Dashboard
      </a>
      
    </div>
    
    <p style="text-align:center;font-size:11px;color:#444;">
      ${new Date().toLocaleString("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
    </p>
    
  </div>
</body>
</html>
  `

  try {
    const { error } = await resend.emails.send({
      from: "RapidFix <leads@upnesttalent.com>",
      to: ["jesse@upnesttalent.com", "amulero11@gmail.com"],
      subject: `Nuevo Lead · ${service} · ${city}`,
      html,
    })

    if (error) {
      console.error("[v0] Resend error:", error.message)
      return { success: false, error: error.message }
    }

    console.log("[v0] Lead email sent successfully")
    return { success: true }
  } catch (error: any) {
    console.error("[v0] Email send error:", error?.message)
    return { success: false, error: error?.message }
  }
}
