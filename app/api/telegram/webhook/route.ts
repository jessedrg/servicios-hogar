import { neon } from "@neondatabase/serverless"

export async function POST(req: Request) {
  const databaseUrl = process.env.NEON_NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error("[v0] No database URL found in environment variables")
    return Response.json({ ok: false, error: "Database not configured" }, { status: 500 })
  }

  const sql = neon(databaseUrl)
  const update = await req.json()

  console.log("[v0] Telegram webhook received:", JSON.stringify(update, null, 2))

  try {
    if (update.message?.text) {
      const text = update.message.text
      const chatId = update.message.chat.id.toString()
      const username = update.message.chat.username || update.message.chat.first_name || "Usuario"

      console.log("[v0] Message received - Text:", text, "ChatId:", chatId)

      await ensurePartnerExists(chatId, username, sql)

      if (text === "/start") {
        console.log("[v0] Handling /start command")
        await sendTelegramMessage(
          chatId,
          "🎯 *¡Bienvenido a RapidFix!*\n\n" +
            "Conectamos profesionales como tú con clientes que necesitan tus servicios *ahora mismo*.\n\n" +
            "━━━━━━━━━━━━━━━━━━━━\n\n" +
            "✅ *Cómo funciona:*\n" +
            "1️⃣ Recibes leads de clientes verificados\n" +
            "2️⃣ Decides si aceptar o rechazar cada lead\n" +
            "3️⃣ Solo pagas por los leads que aceptas\n" +
            "4️⃣ Contactas al cliente y cierras el trabajo\n\n" +
            "━━━━━━━━━━━━━━━━━━━━\n\n" +
            "💰 *Precio fijo:*\n" +
            "• 1 lead = 30€ (precio único para todos)\n" +
            "• Descuentos al comprar paquetes\n" +
            "• Sin sorpresas ni costes ocultos\n\n" +
            "━━━━━━━━━━━━━━━━━━━━\n\n" +
            "📱 *Comandos disponibles:*\n" +
            "💰 /credits - Ver tus créditos disponibles\n" +
            "🛒 /buy - Comprar paquetes de créditos\n" +
            "📊 /history - Ver tu historial completo\n\n" +
            "━━━━━━━━━━━━━━━━━━━━\n\n" +
            "💡 *Cada lead incluye:*\n" +
            "• Nombre y teléfono del cliente\n" +
            "• Descripción detallada del problema\n" +
            "• Ubicación exacta\n" +
            "• Cliente listo para contratar\n" +
            "• Lead exclusivo (nadie más puede comprarlo)\n\n" +
            "🚀 *¡Empieza a recibir trabajos ahora!*",
        )
        return Response.json({ ok: true })
      }

      if (text === "/credits") {
        console.log("[v0] Handling /credits command for chatId:", chatId)
        await handleCreditsCommand(chatId, sql)
        return Response.json({ ok: true })
      }

      if (text === "/buy" || text === "/buy_credits") {
        console.log("[v0] Handling /buy command")
        await handleBuyCreditsCommand(chatId, sql)
        return Response.json({ ok: true })
      }

      if (text === "/history") {
        console.log("[v0] Handling /history command")
        await handleHistoryCommand(chatId, sql)
        return Response.json({ ok: true })
      }
    }

    if (update.callback_query) {
      const callbackData = update.callback_query.data
      const messageId = update.callback_query.message.message_id
      const chatId = update.callback_query.message.chat.id.toString()

      if (callbackData.startsWith("buy_")) {
        const credits = callbackData.split("_")[1]
        await handleBuyPackage(chatId, credits, sql)

        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: update.callback_query.id,
            text: "✅ Abriendo página de pago...",
          }),
        })
        return Response.json({ ok: true })
      }

      const leadId = callbackData.replace("accept_lead_", "").replace("reject_lead_", "")
      const action = callbackData.startsWith("accept_lead_") ? "accept" : "reject"

      console.log("[v0] Callback query - Action:", action, "Lead ID:", leadId)

      if (action === "accept") {
        await handleAcceptLead(leadId, chatId, messageId, sql)
      } else if (action === "reject") {
        await handleRejectLead(leadId, chatId, messageId, sql)
      }

      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callback_query_id: update.callback_query.id,
          text: action === "accept" ? "✅ Lead aceptado!" : "❌ Lead rechazado",
        }),
      })
    }

    return Response.json({ ok: true })
  } catch (error) {
    console.error("[v0] Telegram webhook error:", error)
    return Response.json({ ok: false, error: String(error) }, { status: 500 })
  }
}

async function ensurePartnerExists(chatId: string, username: string, sql: any) {
  try {
    const partners = await sql`
      SELECT id FROM partners WHERE telegram_chat_id = ${chatId}
    `

    if (!partners || partners.length === 0) {
      console.log("[v0] Auto-registering new partner:", chatId, username)
      await sql`
        INSERT INTO partners (
          telegram_chat_id, 
          name, 
          phone,
          services,
          cities,
          credits,
          total_leads_received,
          total_leads_accepted
        )
        VALUES (
          ${chatId}, 
          ${username}, 
          'pending',
          ARRAY['general']::TEXT[],
          ARRAY['general']::TEXT[],
          0,
          0,
          0
        )
      `
      console.log("[v0] Partner registered successfully")
    }
  } catch (error) {
    console.error("[v0] Error ensuring partner exists:", error)
  }
}

async function handleCreditsCommand(chatId: string, sql: any) {
  try {
    console.log("[v0] Querying database for chatId:", chatId)

    const partners = await sql`
      SELECT * FROM partners 
      WHERE telegram_chat_id = ${chatId}
    `

    console.log("[v0] Database query result:", partners)

    if (!partners || partners.length === 0) {
      console.log("[v0] No partner found for chatId:", chatId)
      await sendTelegramMessage(chatId, "❌ Error al obtener tus créditos. Intenta de nuevo.")
      return
    }

    const partner = partners[0]
    console.log("[v0] Partner found:", partner)

    const message = `
💰 *TUS CRÉDITOS DISPONIBLES*

━━━━━━━━━━━━━━━━━━━━

🎯 *Créditos actuales:* ${partner.credits}

📊 *Estadísticas:*
✅ Leads aceptados: ${partner.total_leads_accepted}
📥 Leads recibidos: ${partner.total_leads_received}

━━━━━━━━━━━━━━━━━━━━

💡 *Precio fijo por lead:*
• 1 crédito = 1 lead = 30€
• Todos los leads cuestan lo mismo
• Descuentos al comprar paquetes

${partner.credits === 0 ? "\n⚠️ *¡Sin créditos!* Usa /buy para comprar más y seguir recibiendo trabajos." : ""}

🛒 Usa /buy para comprar más créditos
    `.trim()

    console.log("[v0] Sending credits message to chatId:", chatId)
    await sendTelegramMessage(chatId, message)
    console.log("[v0] Credits message sent successfully")
  } catch (error) {
    console.error("[v0] Error in handleCreditsCommand:", error)
    await sendTelegramMessage(chatId, "❌ Error al obtener tus créditos. Intenta de nuevo.")
  }
}

async function handleBuyCreditsCommand(chatId: string, sql: any) {
  const partners = await sql`
    SELECT * FROM partners 
    WHERE telegram_chat_id = ${chatId}
  `

  if (!partners || partners.length === 0) {
    await sendTelegramMessage(chatId, "❌ Error al procesar tu solicitud. Intenta de nuevo.")
    return
  }

  const message = `
🛒 *COMPRAR CRÉDITOS*

━━━━━━━━━━━━━━━━━━━━

Selecciona el paquete que mejor se adapte a ti:

💼 *PAQUETES DISPONIBLES:*
💡 1 crédito = 1 lead = 30€
  `.trim()

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🥉 BÁSICO: 1 Lead - 30€", callback_data: `buy_1` }],
          [{ text: "🥈 POPULAR: 3 Leads - 85€ (ahorra 5€)", callback_data: `buy_3` }],
          [{ text: "🥇 PRO: 5 Leads - 140€ (ahorra 10€)", callback_data: `buy_5` }],
          [{ text: "💎 PREMIUM: 10 Leads - 250€ (ahorra 50€)", callback_data: `buy_10` }],
        ],
      },
    }),
  })
}

async function handleHistoryCommand(chatId: string, sql: any) {
  const transactions = await sql`
    SELECT ct.*, l.service, l.city
    FROM credit_transactions ct
    LEFT JOIN leads l ON ct.lead_id = l.id
    WHERE ct.partner_id = (
      SELECT id FROM partners WHERE telegram_chat_id = ${chatId}
    )
    ORDER BY ct.created_at DESC
    LIMIT 10
  `

  if (!transactions || transactions.length === 0) {
    await sendTelegramMessage(
      chatId,
      "📊 *HISTORIAL DE TRANSACCIONES*\n\n━━━━━━━━━━━━━━━━━━━━\n\nNo tienes transacciones todavía.\n\nUsa /buy para comprar créditos y empezar a recibir leads.",
    )
    return
  }

  let message = "📊 *HISTORIAL DE TRANSACCIONES*\n\n━━━━━━━━━━━━━━━━━━━━\n\n"

  for (const tx of transactions) {
    const date = new Date(tx.created_at).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    const emoji = tx.amount > 0 ? "💰" : "📤"
    const sign = tx.amount > 0 ? "+" : ""
    const typeText = tx.type === "purchase" ? "Compra" : tx.type === "lead_accepted" ? "Lead aceptado" : tx.type
    message += `${emoji} *${sign}${tx.amount} créditos* - ${typeText}\n`
    message += `   📅 ${date}\n`
    if (tx.service) {
      message += `   🔧 ${tx.service} en ${tx.city}\n`
    }
    message += `\n`
  }

  message += "━━━━━━━━━━━━━━━━━━━━\n\n💡 Usa /credits para ver tu saldo actual"

  await sendTelegramMessage(chatId, message)
}

async function handleAcceptLead(leadId: string, chatId: string, messageId: string, sql: any) {
  console.log("[v0] Handling accept lead:", leadId, "chatId:", chatId)

  const leads = await sql`
    SELECT * FROM leads WHERE id = ${leadId}
  `

  if (!leads || leads.length === 0) {
    console.log("[v0] Lead not found:", leadId)
    await editTelegramMessage(chatId, messageId, "❌ *Lead no encontrado*\n\nEste lead ya no está disponible.")
    return
  }

  const lead = leads[0]
  console.log("[v0] Lead found:", lead)

  if (lead.status === "accepted") {
    console.log("[v0] Lead already accepted")
    await editTelegramMessage(
      chatId,
      messageId,
      "❌ *Lead ya no disponible*\n\n━━━━━━━━━━━━━━━━━━━━\n\nEste lead ya fue aceptado por otro profesional.\n\n🔒 *Los leads son exclusivos* - solo una persona puede aceptarlos.\n\n💡 Mantente atento para el próximo lead.",
    )
    return
  }

  const partners = await sql`
    SELECT * FROM partners WHERE telegram_chat_id = ${chatId}
  `

  if (!partners || partners.length === 0) {
    console.log("[v0] Partner not found for chatId:", chatId)
    await editTelegramMessage(chatId, messageId, "❌ Error al procesar tu solicitud")
    return
  }

  const partner = partners[0]
  const creditCost = lead.credit_cost || 1

  console.log("[v0] Partner credits:", partner.credits, "Credit cost:", creditCost)

  if (partner.credits < creditCost) {
    console.log("[v0] Insufficient credits")
    await editTelegramMessage(
      chatId,
      messageId,
      `❌ *No tienes créditos suficientes*\n\n━━━━━━━━━━━━━━━━━━━━\n\n💰 Este lead cuesta: ${creditCost} crédito${creditCost > 1 ? "s" : ""}\n💳 Tus créditos: ${partner.credits}\n\n━━━━━━━━━━━━━━━━━━━━\n\n🛒 Usa /buy para comprar créditos y seguir recibiendo trabajos.`,
    )
    return
  }

  await sql`
    UPDATE partners 
    SET credits = credits - ${creditCost},
        total_leads_accepted = total_leads_accepted + 1,
        updated_at = NOW()
    WHERE id = ${partner.id}
  `

  await sql`
    UPDATE leads 
    SET status = 'accepted',
        partner_id = ${partner.id},
        accepted_at = NOW()
    WHERE id = ${leadId}
  `

  await sql`
    INSERT INTO credit_transactions (partner_id, amount, type, lead_id)
    VALUES (${partner.id}, ${-creditCost}, 'lead_accepted', ${leadId})
  `

  console.log("[v0] Lead accepted successfully")

  const updatedMessage = `
✅ *LEAD ACEPTADO* (-${creditCost} crédito${creditCost > 1 ? "s" : ""})

━━━━━━━━━━━━━━━━━━━━

📋 *Servicio:* ${lead.service}
📝 *Problema:* ${lead.problem}
📞 *Teléfono:* *${lead.phone}* _(¡Llama ahora!)_
📍 *Ciudad:* ${lead.city}
👤 *Nombre:* ${lead.name || "No especificado"}

━━━━━━━━━━━━━━━━━━━━

💰 *Créditos restantes:* ${partner.credits - creditCost}

━━━━━━━━━━━━━━━━━━━━

⏰ *Contacta al cliente en los próximos 5 minutos para mayor conversión*

🔒 *Este lead es exclusivo para ti* - nadie más puede acceder a él.

💡 Usa /credits para ver tu saldo actual
  `.trim()

  await editTelegramMessage(chatId, messageId, updatedMessage)
}

async function handleRejectLead(leadId: string, chatId: string, messageId: string, sql: any) {
  await sql`
    UPDATE leads 
    SET status = 'rejected'
    WHERE id = ${leadId}
  `

  await editTelegramMessage(chatId, messageId, "❌ *Lead rechazado*\n\nSe ofrecerá a otro profesional.")
}

async function editTelegramMessage(chatId: string, messageId: string, text: string) {
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: text,
      parse_mode: "Markdown",
    }),
  })
}

async function sendTelegramMessage(chatId: string, text: string) {
  console.log("[v0] Sending Telegram message to chatId:", chatId, "Text:", text)

  const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown",
    }),
  })

  const result = await response.json()
  console.log("[v0] Telegram API response:", result)

  if (!result.ok) {
    console.error("[v0] Failed to send Telegram message:", result)
  }
}

async function handleBuyPackage(chatId: string, credits: string, sql: any) {
  const checkoutUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://www.rapidfix.es"}/api/stripe/create-checkout?chat_id=${chatId}&credits=${credits}`

  const packages: Record<string, { amount: number; price: string; bonus: number }> = {
    "1": { amount: 1, price: "30€", bonus: 0 },
    "3": { amount: 3, price: "85€", bonus: 0 },
    "5": { amount: 5, price: "140€", bonus: 0 },
    "10": { amount: 10, price: "250€", bonus: 0 },
  }

  const selectedPackage = packages[credits] || packages["3"]
  const totalCredits = selectedPackage.amount + selectedPackage.bonus

  const message = `
💳 *COMPLETAR COMPRA*

━━━━━━━━━━━━━━━━━━━━

📦 *Paquete seleccionado:*
${selectedPackage.amount} lead${selectedPackage.amount > 1 ? "s" : ""}
💰 *Total:* ${selectedPackage.price}

━━━━━━━━━━━━━━━━━━━━

✅ *Incluye:*
• ${totalCredits} lead${totalCredits > 1 ? "s" : ""} de clientes verificados
• Información completa de cada cliente
• Teléfono y ubicación exacta
• Leads exclusivos (nadie más puede comprarlos)
• Soporte prioritario

💡 *Precio por lead:* ${(Number.parseFloat(selectedPackage.price.replace("€", "")) / totalCredits).toFixed(2)}€

🔒 *Pago 100% seguro con Stripe*

👇 Haz clic en el botón para continuar:
  `.trim()

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: `💳 Pagar ${selectedPackage.price} - Stripe`, url: checkoutUrl }]],
      },
    }),
  })
}
