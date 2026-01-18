import { neon } from "@neondatabase/serverless"
import { getBotToken, normalizeService, AVAILABLE_SERVICES } from "@/lib/telegram-bots"

const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS || "").split(",").filter(Boolean)
const SUPPORT_CONTACT = "@rapidlogitech"

export async function POST(req: Request, { params }: { params: Promise<{ service: string }> }) {
  const { service } = await params
  const normalizedService = normalizeService(service)

  if (!AVAILABLE_SERVICES.includes(normalizedService)) {
    return Response.json({ ok: false, error: "Invalid service" }, { status: 400 })
  }

  const TELEGRAM_BOT_TOKEN = getBotToken(normalizedService)
  const databaseUrl = process.env.NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error("[v0] No database URL found")
    return Response.json({ ok: false, error: "Database not configured" }, { status: 500 })
  }

  const sql = neon(databaseUrl)
  const update = await req.json()

  console.log(`[v0] Telegram webhook received for ${normalizedService}:`, JSON.stringify(update, null, 2))

  try {
    if (update.message?.text) {
      const text = update.message.text
      const chatId = update.message.chat.id.toString()
      const userId = update.message.from?.id?.toString() || ""
      const username = update.message.from?.username || update.message.from?.first_name || "Usuario"

      await ensurePartnerExists(chatId, username, normalizedService, sql)

      if (text === "/start") {
        await sendTelegramMessage(
          chatId,
          TELEGRAM_BOT_TOKEN,
          `*Bienvenido a RapidFix ${normalizedService.charAt(0).toUpperCase() + normalizedService.slice(1)}*\n\n` +
            "Conectamos profesionales como tú con clientes que necesitan tus servicios *ahora mismo*.\n\n" +
            "━━━━━━━━━━━━━━━━━━━━\n\n" +
            "*Cómo funciona:*\n" +
            "1. Recibes leads en este grupo\n" +
            "2. Haces click en 'Comprar Lead'\n" +
            "3. Pagas con tarjeta y recibes el teléfono al instante\n" +
            "4. Contactas al cliente y cierras el trabajo\n\n" +
            "━━━━━━━━━━━━━━━━━━━━\n\n" +
            `*Soporte:* ${SUPPORT_CONTACT}\n\n` +
            "*Empieza a recibir trabajos ahora!*",
        )
        return Response.json({ ok: true })
      }

      if (text === "/history" || text === "/historial") {
        await handleHistoryCommand(chatId, TELEGRAM_BOT_TOKEN, sql)
        return Response.json({ ok: true })
      }

      if (text === "/admin") {
        if (ADMIN_USER_IDS.includes(userId)) {
          await handleAdminCommand(chatId, TELEGRAM_BOT_TOKEN, normalizedService, sql)
        } else {
          await sendTelegramMessage(chatId, TELEGRAM_BOT_TOKEN, "No tienes permisos de administrador.")
        }
        return Response.json({ ok: true })
      }

      if (text === "/stats") {
        if (ADMIN_USER_IDS.includes(userId)) {
          await handleStatsCommand(chatId, TELEGRAM_BOT_TOKEN, normalizedService, sql)
        } else {
          await sendTelegramMessage(chatId, TELEGRAM_BOT_TOKEN, "No tienes permisos de administrador.")
        }
        return Response.json({ ok: true })
      }

      if (text === "/total") {
        if (ADMIN_USER_IDS.includes(userId)) {
          await handleTotalStatsCommand(chatId, TELEGRAM_BOT_TOKEN, sql)
        } else {
          await sendTelegramMessage(chatId, TELEGRAM_BOT_TOKEN, "No tienes permisos de administrador.")
        }
        return Response.json({ ok: true })
      }
    }

    // The "Comprar Lead" button opens /api/stripe/buy-lead directly in browser
    // No callback is needed anymore

    return Response.json({ ok: true })
  } catch (error) {
    console.error("[v0] Telegram webhook error:", error)
    return Response.json({ ok: false, error: String(error) }, { status: 500 })
  }
}

async function ensurePartnerExists(chatId: string, username: string, service: string, sql: any) {
  try {
    const partners = await sql`
      SELECT id FROM partners WHERE telegram_chat_id = ${chatId}
    `

    if (!partners || partners.length === 0) {
      console.log("[v0] Auto-registering new partner:", chatId, username, "for service:", service)
      await sql`
        INSERT INTO partners (
          telegram_chat_id, 
          name, 
          phone,
          services,
          cities,
          credits,
          balance_euros,
          total_leads_received,
          total_leads_accepted
        )
        VALUES (
          ${chatId}, 
          ${username}, 
          'pending',
          ARRAY[${service}]::TEXT[],
          ARRAY['general']::TEXT[],
          0,
          0,
          0,
          0
        )
      `
    }
  } catch (error) {
    console.error("[v0] Error ensuring partner exists:", error)
  }
}

async function sendTelegramMessage(chatId: string, botToken: string, text: string, replyMarkup?: any) {
  const body: any = {
    chat_id: chatId,
    text: text,
    parse_mode: "Markdown",
  }

  if (replyMarkup) {
    body.reply_markup = replyMarkup
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  return response.json()
}

async function handleHistoryCommand(chatId: string, botToken: string, sql: any) {
  const leads = await sql`
    SELECT l.*, p.name as partner_name
    FROM leads l
    LEFT JOIN partners p ON l.accepted_by = p.id
    WHERE l.accepted_by = (SELECT id FROM partners WHERE telegram_chat_id = ${chatId})
    ORDER BY l.created_at DESC
    LIMIT 10
  `

  if (!leads || leads.length === 0) {
    await sendTelegramMessage(
      chatId,
      botToken,
      `📋 *Tu historial*\n\nNo has comprado ningún lead todavía.\n\nCuando compres un lead, aparecerá aquí.\n\nSoporte: ${SUPPORT_CONTACT}`,
    )
    return
  }

  let message = `📋 *Tus últimos ${leads.length} leads*\n\n`

  for (const lead of leads) {
    const date = new Date(lead.created_at).toLocaleDateString("es-ES")
    message += `━━━━━━━━━━━━━━━━━━━━\n`
    message += `📅 ${date}\n`
    message += `📋 ${lead.service || "Servicio"}\n`
    message += `📍 ${lead.city || "Ciudad"}\n`
    message += `📞 ${lead.phone}\n`
    message += `💰 ${lead.lead_price || 18}€\n\n`
  }

  message += `\nSoporte: ${SUPPORT_CONTACT}`

  await sendTelegramMessage(chatId, botToken, message)
}

async function handleAdminCommand(chatId: string, botToken: string, service: string, sql: any) {
  const stats = await sql`
    SELECT 
      COUNT(*) as total_leads,
      COUNT(CASE WHEN status = 'accepted' THEN 1 END) as accepted_leads,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_leads,
      COALESCE(SUM(CASE WHEN status = 'accepted' THEN lead_price ELSE 0 END), 0) as total_revenue
    FROM leads 
    WHERE service = ${service}
  `

  const partnersCount = await sql`
    SELECT COUNT(*) as total FROM partners WHERE ${service} = ANY(services)
  `

  const s = stats[0]
  const p = partnersCount[0]

  await sendTelegramMessage(
    chatId,
    botToken,
    `🔧 *Panel Admin - ${service}*\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `📊 *Estadísticas:*\n` +
      `• Total leads: ${s.total_leads}\n` +
      `• Vendidos: ${s.accepted_leads}\n` +
      `• Pendientes: ${s.pending_leads}\n` +
      `• Ingresos: ${s.total_revenue}€\n\n` +
      `👥 *Partners:* ${p.total}\n\n` +
      `Soporte: ${SUPPORT_CONTACT}`,
  )
}

async function handleStatsCommand(chatId: string, botToken: string, service: string, sql: any) {
  const todayStats = await sql`
    SELECT 
      COUNT(*) as leads_today,
      COUNT(CASE WHEN status = 'accepted' THEN 1 END) as accepted_today,
      COALESCE(SUM(CASE WHEN status = 'accepted' THEN lead_price ELSE 0 END), 0) as revenue_today
    FROM leads 
    WHERE service = ${service}
    AND created_at >= CURRENT_DATE
  `

  const s = todayStats[0]

  await sendTelegramMessage(
    chatId,
    botToken,
    `📈 *Stats Hoy - ${service}*\n\n` +
      `• Leads: ${s.leads_today}\n` +
      `• Vendidos: ${s.accepted_today}\n` +
      `• Ingresos: ${s.revenue_today}€\n\n` +
      `Soporte: ${SUPPORT_CONTACT}`,
  )
}

async function handleTotalStatsCommand(chatId: string, botToken: string, sql: any) {
  const globalStats = await sql`
    SELECT 
      COUNT(*) as total_leads,
      COUNT(CASE WHEN status = 'accepted' THEN 1 END) as leads_vendidos,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as leads_pendientes,
      COALESCE(SUM(CASE WHEN status = 'accepted' THEN lead_price ELSE 0 END), 0) as ingresos_totales
    FROM leads
  `

  const serviceStats = await sql`
    SELECT 
      service,
      COUNT(*) as total,
      COUNT(CASE WHEN status = 'accepted' THEN 1 END) as vendidos,
      COALESCE(SUM(CASE WHEN status = 'accepted' THEN lead_price ELSE 0 END), 0) as ingresos
    FROM leads 
    GROUP BY service
    ORDER BY ingresos DESC
  `

  const todayStats = await sql`
    SELECT 
      COUNT(*) as leads_hoy,
      COUNT(CASE WHEN status = 'accepted' THEN 1 END) as vendidos_hoy,
      COALESCE(SUM(CASE WHEN status = 'accepted' THEN lead_price ELSE 0 END), 0) as ingresos_hoy
    FROM leads 
    WHERE created_at >= CURRENT_DATE
  `

  const weekStats = await sql`
    SELECT 
      COUNT(*) as leads_semana,
      COUNT(CASE WHEN status = 'accepted' THEN 1 END) as vendidos_semana,
      COALESCE(SUM(CASE WHEN status = 'accepted' THEN lead_price ELSE 0 END), 0) as ingresos_semana
    FROM leads 
    WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
  `

  const partnersCount = await sql`
    SELECT COUNT(*) as total FROM partners
  `

  const g = globalStats[0]
  const t = todayStats[0]
  const w = weekStats[0]
  const p = partnersCount[0]

  const conversionRate = g.total_leads > 0 ? ((g.leads_vendidos / g.total_leads) * 100).toFixed(1) : 0

  let message = `📊 *ESTADÍSTICAS TOTALES RAPIDFIX*\n\n`
  message += `━━━━━━━━━━━━━━━━━━━━\n`
  message += `📈 *GLOBAL*\n`
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`
  message += `📋 Total leads: *${g.total_leads}*\n`
  message += `✅ Vendidos: *${g.leads_vendidos}*\n`
  message += `⏳ Pendientes: *${g.leads_pendientes}*\n`
  message += `💰 Ingresos totales: *${g.ingresos_totales}€*\n`
  message += `📊 Tasa conversión: *${conversionRate}%*\n`
  message += `👥 Partners registrados: *${p.total}*\n\n`

  message += `━━━━━━━━━━━━━━━━━━━━\n`
  message += `📅 *HOY*\n`
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`
  message += `📋 Leads: *${t.leads_hoy}*\n`
  message += `✅ Vendidos: *${t.vendidos_hoy}*\n`
  message += `💰 Ingresos: *${t.ingresos_hoy}€*\n\n`

  message += `━━━━━━━━━━━━━━━━━━━━\n`
  message += `📆 *ÚLTIMA SEMANA*\n`
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`
  message += `📋 Leads: *${w.leads_semana}*\n`
  message += `✅ Vendidos: *${w.vendidos_semana}*\n`
  message += `💰 Ingresos: *${w.ingresos_semana}€*\n\n`

  if (serviceStats.length > 0) {
    message += `━━━━━━━━━━━━━━━━━━━━\n`
    message += `🔧 *POR SERVICIO*\n`
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`

    for (const s of serviceStats) {
      const serviceName = s.service ? s.service.charAt(0).toUpperCase() + s.service.slice(1) : "Sin definir"
      message += `*${serviceName}*\n`
      message += `  📋 ${s.total} leads | ✅ ${s.vendidos} vendidos | 💰 ${s.ingresos}€\n\n`
    }
  }

  message += `━━━━━━━━━━━━━━━━━━━━\n`
  message += `🕐 Actualizado: ${new Date().toLocaleString("es-ES")}`

  await sendTelegramMessage(chatId, botToken, message)
}
