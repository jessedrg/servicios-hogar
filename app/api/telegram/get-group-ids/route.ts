import { NextResponse } from "next/server"

// Bot tokens from your configuration
const BOTS = {
  fontaneros: {
    token: "8386699654:AAEIu6nyNJ5leXokavQeWRi6oKX1ufy2gD0",
    name: "Fontaneros",
  },
  electricistas: {
    token: "7711759128:AAF-aB5GolPE6hcq9ZzmAL_QsOgYYfT5cO0",
    name: "Electricistas",
  },
  cerrajeros: {
    token: "8352762678:AAE3x8xR7EuNhhLzCzig1lqDsESaD3Ap1Lo",
    name: "Cerrajeros",
  },
  desatascos: {
    token: "8372055405:AAG0jwYBroPTL-jjr9urOKjLwAhpd_zdKek",
    name: "Desatascos",
  },
  calderas: {
    token: "8528879136:AAE4R0ZybIZOBMBoewRF-4AYrdqdR2R7keQ",
    name: "Calderas",
  },
}

export async function GET() {
  const results: Record<string, { chatId: string | null; error?: string }> = {}

  for (const [service, bot] of Object.entries(BOTS)) {
    try {
      // Step 1: Delete webhook temporarily
      await fetch(`https://api.telegram.org/bot${bot.token}/deleteWebhook`)

      // Step 2: Wait a moment
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Step 3: Get updates
      const updatesRes = await fetch(`https://api.telegram.org/bot${bot.token}/getUpdates`)
      const updatesData = await updatesRes.json()

      // Step 4: Find group chat ID
      let chatId: string | null = null

      if (updatesData.ok && updatesData.result) {
        for (const update of updatesData.result) {
          const chat = update.message?.chat || update.my_chat_member?.chat
          if (chat && (chat.type === "group" || chat.type === "supergroup")) {
            chatId = String(chat.id)
            break
          }
        }
      }

      results[service] = { chatId }
    } catch (error) {
      results[service] = { chatId: null, error: String(error) }
    }
  }

  // Format for easy copy-paste to Vercel
  const envVars = Object.entries(results)
    .filter(([_, v]) => v.chatId)
    .map(([service, v]) => `TELEGRAM_GROUP_${service.toUpperCase()}=${v.chatId}`)
    .join("\n")

  return NextResponse.json({
    message: "Chat IDs found. Add these to Vercel Environment Variables:",
    results,
    envVars,
    nextStep: "If any chatId is null, send a message in that group and refresh this page",
  })
}
