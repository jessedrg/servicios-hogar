export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const chatId = searchParams.get("chat_id")
  const credits = searchParams.get("credits") || "3"
  const service = searchParams.get("service") || "" // Added service parameter

  if (!chatId) {
    return Response.json({ error: "Missing chat_id" }, { status: 400 })
  }

  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

  const isCalderasTest = service === "calderas"

  const packages: Record<string, { amount: number; price: number; bonus: number }> = isCalderasTest
    ? {
        // Calderas TEST pricing - 1€ per lead
        "1": { amount: 1, price: 100, bonus: 0 }, // 1€
        "3": { amount: 3, price: 300, bonus: 0 }, // 3€
        "5": { amount: 5, price: 500, bonus: 0 }, // 5€
        "10": { amount: 10, price: 1000, bonus: 0 }, // 10€
      }
    : {
        // Normal pricing - 20€ per lead
        "1": { amount: 1, price: 2000, bonus: 0 }, // 20€
        "3": { amount: 3, price: 5500, bonus: 0 }, // 55€
        "5": { amount: 5, price: 9000, bonus: 0 }, // 90€
        "10": { amount: 10, price: 17000, bonus: 0 }, // 170€
      }

  const selectedPackage = packages[credits] || packages["3"]
  const totalCredits = selectedPackage.amount + selectedPackage.bonus

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${totalCredits} Lead${totalCredits > 1 ? "s" : ""} RapidFix`,
              description: `${totalCredits} lead${totalCredits > 1 ? "s" : ""} de clientes verificados con información completa`,
            },
            unit_amount: selectedPackage.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://rapidfix.es"}/partners?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://rapidfix.es"}/partners?canceled=true`,
      metadata: {
        chat_id: chatId,
        credits: totalCredits.toString(),
        service: service, // Store service in metadata
      },
    })

    return Response.redirect(session.url)
  } catch (error: any) {
    console.error("[v0] Stripe checkout error:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
