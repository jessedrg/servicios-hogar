import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || "")

const DEFAULT_PHONE_OPTIONS = [
  { id: "phone1", label: "Telefono Principal", number: "711267223" },
  { id: "phone2", label: "Telefono Alternativo", number: "644536400" },
]

export async function GET() {
  try {
    const result = await sql`
      SELECT value FROM app_config WHERE key = 'phone_config' LIMIT 1
    `

    let activePhoneId = "phone1"
    let phoneOptions = DEFAULT_PHONE_OPTIONS

    if (result.length > 0 && result[0].value) {
      let config = result[0].value
      if (typeof config === "string") {
        try {
          config = JSON.parse(config)
        } catch {
          config = {}
        }
      }
      activePhoneId = config.activePhone || "phone1"
      phoneOptions = config.phoneOptions || DEFAULT_PHONE_OPTIONS
    }

    const phoneConfig = phoneOptions.find((p: { id: string }) => p.id === activePhoneId) || phoneOptions[0]

    return Response.json({
      phoneNumber: phoneConfig.number,
      formatted: phoneConfig.number.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"),
    })
  } catch (error) {
    console.error("Error getting phone config:", error)
    return Response.json({
      phoneNumber: "711267223",
      formatted: "711 267 223",
    })
  }
}
