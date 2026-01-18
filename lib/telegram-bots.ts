export const TELEGRAM_BOTS: Record<string, string> = {
  fontanero: "8386699654:AAEIu6nyNJ5leXokavQeWRi6oKX1ufy2gD0",
  electricista: "7711759128:AAF-aB5GolPE6hcq9ZzmAL_QsOgYYfT5cO0",
  cerrajero: "8352762678:AAE3x8xR7EuNhhLzCzig1lqDsESaD3Ap1Lo",
  desatascos: "8372055405:AAG0jwYBroPTL-jjr9urOKjLwAhpd_zdKek",
  calderas: "8528879136:AAE4R0ZybIZOBMBoewRF-4AYrdqdR2R7keQ",
}

export const TELEGRAM_GROUP_LINKS: Record<string, string> = {
  fontanero: "https://t.me/+xuqfGGJdQH9mYWU0",
  electricista: "https://t.me/+kRCvVjSUaChmMTk0",
  cerrajero: "https://t.me/+CnDsBrv3TV05Y2Y0",
  desatascos: "https://t.me/+yNK1PsG7GzkwODE0",
  calderas: "https://t.me/+LyaRrI01V6E2MmI0",
}

export function getBotToken(service: string): string {
  const normalizedService = normalizeService(service)
  return TELEGRAM_BOTS[normalizedService] || TELEGRAM_BOTS.fontanero
}

export function getBotChatId(service: string): string {
  const normalizedService = normalizeService(service)

  const serviceForGroup = normalizedService === "desatascos" ? "fontanero" : normalizedService

  // Read directly from process.env at runtime
  const envVarMap: Record<string, string> = {
    fontanero: process.env.TELEGRAM_GROUP_FONTANEROS || "",
    electricista: process.env.TELEGRAM_GROUP_ELECTRICISTAS || "",
    cerrajero: process.env.TELEGRAM_GROUP_CERRAJEROS || "",
    desatascos: process.env.TELEGRAM_GROUP_FONTANEROS || "", // Also use fontaneros for desatascos
    calderas: process.env.TELEGRAM_GROUP_CALDERAS || "",
  }

  const chatId = envVarMap[serviceForGroup] || ""

  console.log("[v0] getBotChatId:", {
    input: service,
    normalized: normalizedService,
    serviceForGroup,
    chatId: chatId || "NOT FOUND",
  })

  return chatId
}

export function getGroupChatId(service: string): string {
  return getBotChatId(service)
}

export function getGroupLink(service: string): string {
  const normalizedService = normalizeService(service)
  const serviceForGroup = normalizedService === "desatascos" ? "fontanero" : normalizedService
  return TELEGRAM_GROUP_LINKS[serviceForGroup] || TELEGRAM_GROUP_LINKS.fontanero
}

export function normalizeService(service: string): string {
  const serviceLower = service.toLowerCase()

  if (
    serviceLower.includes("fontaner") ||
    serviceLower.includes("agua") ||
    serviceLower.includes("tubería") ||
    serviceLower.includes("grifo")
  ) {
    return "fontanero"
  }
  if (
    serviceLower.includes("electric") ||
    serviceLower.includes("luz") ||
    serviceLower.includes("enchufe") ||
    serviceLower.includes("cuadro")
  ) {
    return "electricista"
  }
  if (
    serviceLower.includes("cerrajer") ||
    serviceLower.includes("puerta") ||
    serviceLower.includes("llave") ||
    serviceLower.includes("cerradura")
  ) {
    return "cerrajero"
  }
  if (
    serviceLower.includes("desatasc") ||
    serviceLower.includes("atasco") ||
    serviceLower.includes("desagüe") ||
    serviceLower.includes("alcantarilla")
  ) {
    return "desatascos"
  }
  if (
    serviceLower.includes("caldera") ||
    serviceLower.includes("calefacción") ||
    serviceLower.includes("radiador") ||
    serviceLower.includes("gas")
  ) {
    return "calderas"
  }

  return "fontanero"
}

export const AVAILABLE_SERVICES = ["fontanero", "electricista", "cerrajero", "desatascos", "calderas"]
