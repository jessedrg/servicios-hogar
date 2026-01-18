"use server"

import { type NextRequest, NextResponse } from "next/server"

// Tipos para el sistema de leads
interface Lead {
  id: string
  name: string
  phone: string
  email: string
  service: string
  city: string
  description: string
  urgency: "urgent" | "normal"
  createdAt: string
  status: "pending" | "accepted" | "rejected" | "expired"
  assignedTo?: string
}

interface Partner {
  id: string
  name: string
  phone: string
  whatsapp: string
  telegram?: string
  services: string[]
  cities: string[]
  credits: number
  active: boolean
}

// Simulación de base de datos (en producción usar Neon)
const leads: Lead[] = []
const partners: Partner[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Crear nuevo lead
    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      name: body.name,
      phone: body.phone,
      email: body.email,
      service: body.service,
      city: body.city,
      description: body.description,
      urgency: body.urgency || "normal",
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    leads.push(newLead)

    // Buscar partners disponibles
    const availablePartners = partners.filter(
      (p) => p.active && p.credits > 0 && p.services.includes(body.service) && p.cities.includes(body.city),
    )

    if (availablePartners.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No hay partners disponibles en esta zona",
      })
    }

    // Distribuir lead al primer partner disponible
    await distributeLeadToPartner(newLead, availablePartners[0])

    return NextResponse.json({
      success: true,
      leadId: newLead.id,
      message: "Lead enviado correctamente",
    })
  } catch (error) {
    console.error("[v0] Error creating lead:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error al procesar el lead",
      },
      { status: 500 },
    )
  }
}

async function distributeLeadToPartner(lead: Lead, partner: Partner) {
  // Enviar por WhatsApp
  if (partner.whatsapp) {
    await sendWhatsAppLead(lead, partner)
  }

  // Enviar por Telegram
  if (partner.telegram) {
    await sendTelegramLead(lead, partner)
  }

  lead.assignedTo = partner.id
}

async function sendWhatsAppLead(lead: Lead, partner: Partner) {
  // Integración con WhatsApp Business API
  const message = `
🔔 *NUEVO LEAD - ${lead.service.toUpperCase()}*

👤 Cliente: ${lead.name}
📱 Teléfono: ${lead.phone}
📧 Email: ${lead.email}
📍 Ciudad: ${lead.city}
⚡ Urgencia: ${lead.urgency === "urgent" ? "URGENTE" : "Normal"}

📝 Descripción:
${lead.description}

⏰ Tienes 15 minutos para responder

Para ACEPTAR el lead, responde: SI ${lead.id}
Para RECHAZAR el lead, responde: NO ${lead.id}
  `.trim()

  // Aquí integrarías con WhatsApp Business API
  // Ejemplo con Twilio WhatsApp API:
  /*
  await fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      From: 'whatsapp:+14155238886',
      To: `whatsapp:${partner.whatsapp}`,
      Body: message
    })
  })
  */

  console.log("[v0] WhatsApp message sent to:", partner.whatsapp)
  console.log("[v0] Message:", message)
}

async function sendTelegramLead(lead: Lead, partner: Partner) {
  // Integración con Telegram Bot API
  const message = `
🔔 <b>NUEVO LEAD - ${lead.service.toUpperCase()}</b>

👤 Cliente: ${lead.name}
📱 Teléfono: ${lead.phone}
📧 Email: ${lead.email}
📍 Ciudad: ${lead.city}
⚡ Urgencia: ${lead.urgency === "urgent" ? "URGENTE ⚠️" : "Normal"}

📝 Descripción:
${lead.description}

⏰ Tienes 15 minutos para responder
  `.trim()

  // Botones inline para aceptar/rechazar
  const keyboard = {
    inline_keyboard: [
      [
        { text: "✅ ACEPTAR LEAD", callback_data: `accept_${lead.id}` },
        { text: "❌ RECHAZAR", callback_data: `reject_${lead.id}` },
      ],
    ],
  }

  // Aquí integrarías con Telegram Bot API:
  /*
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: partner.telegram,
      text: message,
      parse_mode: 'HTML',
      reply_markup: keyboard
    })
  })
  */

  console.log("[v0] Telegram message sent to:", partner.telegram)
  console.log("[v0] Message:", message)
}
