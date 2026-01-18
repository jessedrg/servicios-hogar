export async function GET() {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
  const webhookUrl = "https://www.rapidfix.es/api/stripe/webhook"

  try {
    // List existing webhooks
    const webhooks = await stripe.webhookEndpoints.list({ limit: 100 })

    // Check if webhook already exists
    const existingWebhook = webhooks.data.find((wh: any) => wh.url === webhookUrl)

    if (existingWebhook) {
      return Response.json({
        success: true,
        message: "Webhook already configured",
        webhook: {
          id: existingWebhook.id,
          url: existingWebhook.url,
          status: existingWebhook.status,
          enabled_events: existingWebhook.enabled_events,
        },
      })
    }

    // Create new webhook
    const webhook = await stripe.webhookEndpoints.create({
      url: webhookUrl,
      enabled_events: ["checkout.session.completed", "payment_intent.succeeded", "payment_intent.payment_failed"],
    })

    return Response.json({
      success: true,
      message: "Webhook configured successfully",
      webhook: {
        id: webhook.id,
        url: webhook.url,
        status: webhook.status,
        enabled_events: webhook.enabled_events,
        secret: webhook.secret,
      },
      instructions: "Add this webhook secret to your environment variables as STRIPE_WEBHOOK_SECRET",
    })
  } catch (error: any) {
    console.error("[v0] Stripe webhook setup error:", error)
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
