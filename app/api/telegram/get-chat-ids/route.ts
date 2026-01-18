import { TELEGRAM_BOTS } from "@/lib/telegram-bots"

export async function GET() {
  const results: Record<string, any> = {}

  for (const [service, token] of Object.entries(TELEGRAM_BOTS)) {
    try {
      // First delete webhook temporarily
      await fetch(`https://api.telegram.org/bot${token}/deleteWebhook`)

      // Get updates
      const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`)
      const data = await response.json()

      results[service] = {
        token_preview: token.substring(0, 10) + "...",
        updates: data.result?.slice(-5) || [], // Last 5 updates
        chats:
          data.result
            ?.map((u: any) => ({
              chat_id: u.message?.chat?.id || u.my_chat_member?.chat?.id,
              chat_title: u.message?.chat?.title || u.my_chat_member?.chat?.title,
              chat_type: u.message?.chat?.type || u.my_chat_member?.chat?.type,
            }))
            .filter((c: any) => c.chat_id) || [],
      }
    } catch (error) {
      results[service] = { error: String(error) }
    }
  }

  return Response.json(
    {
      message: "Chat IDs found. Add these to Vercel environment variables:",
      instructions: [
        "1. Go to Vercel > Settings > Environment Variables",
        "2. Add each chat ID as shown below",
        "3. Redeploy after adding variables",
      ],
      results,
      env_variables_needed: [
        "TELEGRAM_GROUP_FONTANEROS=-100xxxxxxxxxx",
        "TELEGRAM_GROUP_ELECTRICISTAS=-100xxxxxxxxxx",
        "TELEGRAM_GROUP_CERRAJEROS=-100xxxxxxxxxx",
        "TELEGRAM_GROUP_DESATASCOS=-100xxxxxxxxxx",
        "TELEGRAM_GROUP_CALDERAS=-100xxxxxxxxxx",
      ],
    },
    { status: 200 },
  )
}
