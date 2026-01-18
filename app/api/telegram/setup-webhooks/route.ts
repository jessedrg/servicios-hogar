import { TELEGRAM_BOTS, AVAILABLE_SERVICES } from "@/lib/telegram-bots"

export async function GET(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.rapidfix.es"
  const results: Record<string, any> = {}

  for (const service of AVAILABLE_SERVICES) {
    const token = TELEGRAM_BOTS[service]
    const webhookUrl = `${baseUrl}/api/telegram/webhook/${service}`

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`)
      const result = await response.json()
      results[service] = {
        webhookUrl,
        success: result.ok,
        description: result.description,
      }
    } catch (error) {
      results[service] = {
        webhookUrl,
        success: false,
        error: String(error),
      }
    }
  }

  return Response.json({
    message: "Webhooks configurados",
    results,
  })
}
