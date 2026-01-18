import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST(request: NextRequest) {
  try {
    const { service, messages, sessionId } = await request.json()

    const sql = neon(process.env.NEON_DATABASE_URL!)

    // Extract info from messages if available
    const name = "WhatsApp Lead"
    let phone = ""
    let city = ""
    let problem = ""

    if (messages && messages.length > 0) {
      // Try to extract problem from user messages
      const userMessages = messages.filter((m: any) => m.role === "user")
      if (userMessages.length > 0) {
        problem = userMessages.map((m: any) => m.content).join(" | ")
      }

      // Try to find phone number in messages
      const phoneMatch = problem.match(/(\+34|0034)?[\s.-]?[6-9]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/)
      if (phoneMatch) {
        phone = phoneMatch[0].replace(/[\s.-]/g, "")
      }

      // Try to find city mentions
      const cities = [
        "barcelona",
        "madrid",
        "hospitalet",
        "badalona",
        "terrassa",
        "sabadell",
        "mataro",
        "sant cugat",
        "granollers",
        "cornella",
        "eixample",
        "gracia",
        "sants",
      ]
      for (const c of cities) {
        if (problem.toLowerCase().includes(c)) {
          city = c.charAt(0).toUpperCase() + c.slice(1)
          break
        }
      }
    }

    // Insert as pending lead with source = whatsapp
    await sql`
      INSERT INTO leads (name, phone, city, service, problem, status, source, session_id, created_at)
      VALUES (${name}, ${phone}, ${city}, ${service || "urgente"}, ${problem.slice(0, 500)}, 'pending', 'whatsapp', ${sessionId || null}, NOW())
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating WhatsApp lead:", error)
    return NextResponse.json({ error: "Error al crear lead" }, { status: 500 })
  }
}
