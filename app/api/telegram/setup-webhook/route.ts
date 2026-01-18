export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const webhookUrl = `https://www.rapidfix.es/api/telegram/webhook`

  if (!botToken) {
    return Response.json({ error: "TELEGRAM_BOT_TOKEN not configured" }, { status: 500 })
  }

  try {
    // Set webhook
    const setWebhookResponse = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ["message", "callback_query"],
      }),
    })

    const setWebhookResult = await setWebhookResponse.json()

    // Get webhook info
    const getWebhookResponse = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`)
    const webhookInfo = await getWebhookResponse.json()

    return Response.json({
      success: true,
      setWebhook: setWebhookResult,
      webhookInfo: webhookInfo,
      configuredUrl: webhookUrl,
    })
  } catch (error) {
    return Response.json({ error: "Failed to setup webhook", details: String(error) }, { status: 500 })
  }
}
