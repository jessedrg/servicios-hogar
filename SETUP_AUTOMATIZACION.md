# 🚀 Guía de Automatización de Leads - rapidfix.es

## Sistema Completo de Distribución Automática por WhatsApp/Telegram

### 📋 Resumen del Sistema

El sistema automatiza completamente el flujo de leads:
1. Cliente rellena formulario → Lead se crea automáticamente
2. Sistema busca partners disponibles en la zona
3. Envía lead por WhatsApp/Telegram al partner
4. Partner acepta/rechaza con un botón
5. Si rechaza → Se envía al siguiente partner
6. Si acepta → Se descuenta crédito y notifica al cliente

---

## 🔧 Configuración Paso a Paso

### 1. WhatsApp Business API (Opción Recomendada)

**Opción A: Twilio (Más Fácil)**

1. Crea cuenta en [Twilio](https://www.twilio.com)
2. Activa WhatsApp Business API
3. Obtén credenciales:
   - Account SID
   - Auth Token
   - WhatsApp Number

4. Añade variables de entorno en Vercel:
\`\`\`bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=+14155238886
\`\`\`

5. Configura webhook en Twilio:
   - URL: `https://rapidfix.es/api/leads/respond`
   - Método: POST

**Opción B: Meta Business (Gratis pero más complejo)**

1. Crea cuenta en [Meta Business](https://business.facebook.com)
2. Configura WhatsApp Business API
3. Obtén Access Token
4. Configura webhook similar a Twilio

**Costo:**
- Twilio: ~€0.005 por mensaje (€5 por 1000 leads)
- Meta: Gratis hasta 1000 conversaciones/mes

---

### 2. Telegram Bot (Más Fácil y Gratis)

1. Abre Telegram y busca [@BotFather](https://t.me/botfather)
2. Envía `/newbot` y sigue instrucciones
3. Copia el Bot Token que te da
4. Añade variable de entorno:
\`\`\`bash
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
\`\`\`

5. Configura webhook:
\`\`\`bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://rapidfix.es/api/leads/respond"
\`\`\`

**Ventajas Telegram:**
- ✅ Completamente gratis
- ✅ Botones inline nativos
- ✅ Más fácil de configurar
- ✅ No requiere verificación de negocio

---

### 3. Base de Datos (Supabase Recomendado)

Crea estas tablas en Supabase:

\`\`\`sql
-- Tabla de Partners
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  telegram TEXT,
  services TEXT[] NOT NULL,
  cities TEXT[] NOT NULL,
  credits INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  city TEXT NOT NULL,
  description TEXT NOT NULL,
  urgency TEXT DEFAULT 'normal',
  status TEXT DEFAULT 'pending',
  assigned_to UUID REFERENCES partners(id),
  created_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP,
  rejected_at TIMESTAMP
);

-- Tabla de Transacciones
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES partners(id),
  lead_id UUID REFERENCES leads(id),
  amount DECIMAL(10,2),
  type TEXT, -- 'credit_purchase', 'lead_charge'
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

---

### 4. Integración con Stripe (Pagos Automáticos)

1. Crea cuenta en [Stripe](https://stripe.com)
2. Obtén API Keys
3. Añade variables de entorno:
\`\`\`bash
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
\`\`\`

4. Crea productos en Stripe:
   - Paquete 5 leads: €125
   - Paquete 10 leads: €250
   - Paquete 20 leads: €450

---

### 5. Flujo Completo del Sistema

\`\`\`
┌─────────────────┐
│  Cliente Web    │
│  Rellena Form   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   API /leads    │
│  Crea Lead DB   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Busca Partners  │
│  Disponibles    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  Envía WhatsApp/Telegram    │
│  "Nuevo Lead - Acepta/Rechaza" │
└────────┬────────────────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌─────────┐
│ ACEPTA │ │ RECHAZA │
└───┬────┘ └────┬────┘
    │           │
    ▼           ▼
┌────────┐ ┌──────────────┐
│Descuenta│ │Envía a Otro  │
│Crédito │ │Partner       │
└───┬────┘ └──────────────┘
    │
    ▼
┌────────────┐
│Notifica    │
│Cliente     │
└────────────┘
\`\`\`

---

### 6. Ejemplo de Mensaje que Recibe el Partner

**WhatsApp:**
\`\`\`
🔔 NUEVO LEAD - DESATASCO

👤 Cliente: María García
📱 Teléfono: 612 345 678
📧 Email: maria@email.com
📍 Ciudad: Madrid (Chamberí)
⚡ Urgencia: URGENTE

📝 Descripción:
Atasco en el baño, no desagua nada. 
Necesito solución hoy mismo.

⏰ Tienes 15 minutos para responder

Para ACEPTAR: Responde SI lead_123456
Para RECHAZAR: Responde NO lead_123456
\`\`\`

**Telegram:**
\`\`\`
🔔 NUEVO LEAD - DESATASCO

👤 Cliente: María García
📱 Teléfono: 612 345 678
📧 Email: maria@email.com
📍 Ciudad: Madrid (Chamberí)
⚡ Urgencia: URGENTE ⚠️

📝 Descripción:
Atasco en el baño, no desagua nada.
Necesito solución hoy mismo.

⏰ Tienes 15 minutos para responder

[✅ ACEPTAR LEAD] [❌ RECHAZAR]
\`\`\`

---

### 7. Panel de Admin

Accede a `/admin` para:
- Ver leads en tiempo real
- Gestionar partners
- Ver estadísticas
- Configurar integraciones
- Monitorear ingresos

---

### 8. Intercom (Chat Inicial - Opcional)

1. Crea cuenta en [Intercom](https://www.intercom.com)
2. Obtén App ID
3. Añade el script en `layout.tsx`:

\`\`\`tsx
<Script id="intercom">
  {`
    window.intercomSettings = {
      app_id: "tu_app_id"
    };
  `}
</Script>
\`\`\`

Usa Intercom para:
- Soporte inicial a clientes
- Onboarding de partners
- Resolver dudas antes de automatizar

---

### 9. Costos Mensuales Estimados

**Escenario: 3,000 leads/mes**

- Twilio WhatsApp: €15/mes
- Telegram: €0 (gratis)
- Supabase: €25/mes
- Stripe: 1.5% + €0.25 por transacción
- Vercel Pro: €20/mes
- **Total: ~€60-80/mes**

**Ingresos potenciales: €75,000/mes** (3000 leads × €25)
**Margen: 99%+ después de costos**

---

### 10. Próximos Pasos

1. ✅ Conecta Telegram Bot (más fácil)
2. ✅ Configura Supabase con las tablas
3. ✅ Añade 5-10 partners de prueba
4. ✅ Prueba el flujo completo
5. ✅ Conecta Stripe para pagos
6. ✅ Escala a más ciudades

---

### 📞 Soporte

Si necesitas ayuda con la configuración, contacta:
- Email: admin@rapidfix.es
- WhatsApp: +34 900 123 456
