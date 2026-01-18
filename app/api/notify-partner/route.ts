import { Resend } from "resend"
import { createPartnerNotificationEmail } from "@/lib/email-templates"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, company, phone, email, service } = await request.json()

    // Validar datos requeridos
    if (!name || !phone || !email || !service) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Crear el HTML del email
    const html = createPartnerNotificationEmail({
      name,
      company: company || "",
      phone,
      email,
      service,
    })

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: "RapidFix <notifications@upnesttalent.com>",
      to: "jesse@upnesttalent.com",
      subject: `🔧 Nuevo Partner: ${name} - ${service}`,
      html,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Partner notification email sent:", data?.id)
    return Response.json({ success: true, emailId: data?.id })
  } catch (error) {
    console.error("[v0] Error sending partner notification:", error)
    return Response.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
