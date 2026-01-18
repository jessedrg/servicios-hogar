import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { leadId, price, leadInfo } = await request.json()

    if (!leadId || !price) {
      return NextResponse.json({ success: false, error: "Faltan datos" }, { status: 400 })
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://www.rapidfix.es"

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Lead ${leadInfo?.service || "Urgencia"} - ${leadInfo?.city || "Barcelona"}`,
              description: leadInfo?.problem?.slice(0, 200) || "Lead de cliente urgente",
            },
            unit_amount: Math.round(price * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/pago-exitoso?lead_id=${leadId}`,
      cancel_url: `${baseUrl}/pago-cancelado`,
      metadata: {
        lead_id: leadId,
        price: price.toString(),
      },
    })

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    })
  } catch (error) {
    console.error("[v0] Error generating payment link:", error)
    return NextResponse.json({ success: false, error: "Error al generar link de pago" }, { status: 500 })
  }
}
