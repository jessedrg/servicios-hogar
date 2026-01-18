"use server"

import { type NextRequest, NextResponse } from "next/server"

// Webhook para respuestas de WhatsApp/Telegram
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Detectar si es WhatsApp o Telegram
    if (body.callback_query) {
      // Es Telegram
      return handleTelegramResponse(body)
    } else if (body.From && body.From.includes("whatsapp")) {
      // Es WhatsApp
      return handleWhatsAppResponse(body)
    }

    return NextResponse.json({ success: false })
  } catch (error) {
    console.error("[v0] Error handling response:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

async function handleTelegramResponse(body: any) {
  const callbackData = body.callback_query.data
  const [action, leadId] = callbackData.split("_")

  if (action === "accept") {
    // Partner aceptó el lead
    await acceptLead(leadId, body.callback_query.from.id)

    // Enviar confirmación
    await sendTelegramMessage(
      body.callback_query.from.id,
      `✅ Lead aceptado correctamente!\n\n` +
        `Se ha descontado 1 crédito de tu cuenta.\n` +
        `El cliente será notificado que estás en camino.`,
    )

    // Notificar al cliente
    await notifyCustomer(leadId)
  } else if (action === "reject") {
    // Partner rechazó el lead
    await rejectLead(leadId, body.callback_query.from.id)

    await sendTelegramMessage(
      body.callback_query.from.id,
      `Lead rechazado. Será enviado al siguiente partner disponible.`,
    )

    // Redistribuir a otro partner
    await redistributeLead(leadId)
  }

  return NextResponse.json({ success: true })
}

async function handleWhatsAppResponse(body: any) {
  const message = body.Body.trim().toUpperCase()
  const from = body.From.replace("whatsapp:", "")

  // Parsear respuesta: "SI lead_123456" o "NO lead_123456"
  const parts = message.split(" ")
  const action = parts[0]
  const leadId = parts[1]

  if (action === "SI") {
    await acceptLead(leadId, from)
    await sendWhatsAppMessage(
      from,
      `✅ Lead aceptado correctamente!\n\n` +
        `Se ha descontado 1 crédito de tu cuenta.\n` +
        `El cliente será notificado que estás en camino.`,
    )
    await notifyCustomer(leadId)
  } else if (action === "NO") {
    await rejectLead(leadId, from)
    await sendWhatsAppMessage(from, `Lead rechazado. Será enviado al siguiente partner disponible.`)
    await redistributeLead(leadId)
  }

  return NextResponse.json({ success: true })
}

async function acceptLead(leadId: string, partnerId: string) {
  // Actualizar estado del lead
  // Descontar crédito del partner
  // Registrar en base de datos
  console.log("[v0] Lead accepted:", leadId, "by partner:", partnerId)
}

async function rejectLead(leadId: string, partnerId: string) {
  // Actualizar estado del lead
  // Buscar siguiente partner disponible
  console.log("[v0] Lead rejected:", leadId, "by partner:", partnerId)
}

async function redistributeLead(leadId: string) {
  // Buscar siguiente partner disponible
  // Enviar lead al siguiente en la lista
  console.log("[v0] Redistributing lead:", leadId)
}

async function notifyCustomer(leadId: string) {
  // Enviar SMS/Email al cliente confirmando que un profesional aceptó
  console.log("[v0] Notifying customer for lead:", leadId)
}

async function sendTelegramMessage(chatId: string, text: string) {
  // Enviar mensaje por Telegram
  console.log("[v0] Sending Telegram message to:", chatId)
}

async function sendWhatsAppMessage(to: string, text: string) {
  // Enviar mensaje por WhatsApp
  console.log("[v0] Sending WhatsApp message to:", to)
}
