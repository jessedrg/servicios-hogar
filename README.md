# rapidfix.es - Plataforma de Generación de Leads para Servicios Express

## 🚀 Características

- ✅ Landing page optimizada para conversión
- ✅ 6 páginas de servicios individuales (SEO optimizado)
- ✅ Sistema automatizado de distribución de leads
- ✅ Integración WhatsApp/Telegram para partners
- ✅ Panel de administración completo
- ✅ Página de partners con garantía 45 días
- ✅ Sitemap y robots.txt para SEO
- ✅ Diseño minimalista en blanco y negro
- ✅ Notificaciones en tiempo real
- ✅ Formularios de alta conversión

## 📁 Estructura del Proyecto

\`\`\`
rapidfix.es/
├── app/
│   ├── page.tsx                 # Landing principal
│   ├── desatascos/page.tsx      # Página servicio desatascos
│   ├── electricista/page.tsx    # Página servicio electricista
│   ├── fontanero/page.tsx       # Página servicio fontanero
│   ├── cerrajero/page.tsx       # Página servicio cerrajero
│   ├── calderas/page.tsx        # Página servicio calderas
│   ├── persianas/page.tsx       # Página servicio persianas
│   ├── partners/page.tsx        # Página hazte partner
│   ├── admin/page.tsx           # Panel administración
│   ├── api/
│   │   ├── leads/route.ts       # API creación leads
│   │   └── leads/respond/route.ts # Webhook respuestas
│   ├── sitemap.ts               # Sitemap dinámico
│   └── robots.ts                # Robots.txt
├── components/
│   ├── hero.tsx                 # Hero principal
│   ├── services.tsx             # Grid de servicios
│   ├── lead-form.tsx            # Formulario leads
│   ├── live-activity.tsx        # Notificaciones tiempo real
│   ├── cta-floating.tsx         # CTA flotante
│   ├── partner-*.tsx            # Componentes partners
│   └── service-*.tsx            # Componentes servicios
└── SETUP_AUTOMATIZACION.md      # Guía configuración

\`\`\`

## 🛠️ Instalación

\`\`\`bash
# Clonar repositorio
git clone https://github.com/tu-usuario/rapidfix.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
\`\`\`

## 🔑 Variables de Entorno

\`\`\`bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Telegram
TELEGRAM_BOT_TOKEN=

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
\`\`\`

## 📊 Modelo de Negocio

**Ingresos:** €25-35 por lead
**Garantía:** 100% devolución si no entregas leads en 45 días
**Paquetes:**
- Starter: 5 leads en 15 días - €125
- Pro: 10 leads en 30 días - €250
- Premium: 20 leads en 45 días - €450

## 🎯 SEO Keywords

- desatasco urgente [ciudad]
- electricista 24 horas [ciudad]
- fontanero urgente [ciudad]
- cerrajero express [ciudad]
- reparación calderas [ciudad]
- reparación persianas [ciudad]

## 📈 Roadmap

- [x] Landing page y páginas de servicios
- [x] Sistema de leads automatizado
- [x] Integración WhatsApp/Telegram
- [x] Panel de administración
- [x] Página de partners con garantía
- [ ] Integración Stripe completa
- [ ] Dashboard de partners
- [ ] App móvil para partners
- [ ] Sistema de valoraciones

## 📄 Licencia

Propietario - rapidfix.es © 2025
