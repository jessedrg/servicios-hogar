import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { TELEGRAM_BOTS, getBotChatId, AVAILABLE_SERVICES } from "@/lib/telegram-bots"

const SESSION_SECRET = "rf_admin_session_2024_punk"

export async function POST(request: NextRequest) {
  // Verify admin session
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")?.value

  if (session !== SESSION_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { service } = await request.json()

    if (!service || !AVAILABLE_SERVICES.includes(service)) {
      return NextResponse.json({ error: "Servicio no válido" }, { status: 400 })
    }

    const botToken = TELEGRAM_BOTS[service]
    const chatId = getBotChatId(service)

    if (!chatId) {
      return NextResponse.json({ error: "Chat ID no configurado" }, { status: 400 })
    }

    let deletedCount = 0
    let failedCount = 0

    const testMessage = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "🧹 Limpiando canal...",
      }),
    })

    const testResult = await testMessage.json()

    if (testResult.ok && testResult.result?.message_id) {
      const maxMessageId = testResult.result.message_id

      // Delete messages from current back to maxMessageId - 200
      for (let msgId = maxMessageId; msgId > Math.max(1, maxMessageId - 200); msgId--) {
        try {
          const deleteResponse = await fetch(`https://api.telegram.org/bot${botToken}/deleteMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              message_id: msgId,
            }),
          })

          const deleteResult = await deleteResponse.json()

          if (deleteResult.ok) {
            deletedCount++
          } else {
            failedCount++
          }
        } catch (e) {
          failedCount++
        }

        // Small delay to avoid rate limiting
        if (deletedCount % 30 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }
    }

    return NextResponse.json({
      success: true,
      deletedCount,
      failedCount,
      message: `Eliminados ${deletedCount} mensajes del canal de ${service}`,
    })
  } catch (error) {
    console.error("Error clearing Telegram:", error)
    return NextResponse.json({ error: "Error al limpiar el canal", details: String(error) }, { status: 500 })
  }
}
