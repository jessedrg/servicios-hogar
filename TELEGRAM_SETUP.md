# Configuración de Telegram para Leads Automáticos

## 1. Crear Bot de Telegram

1. Abre Telegram y busca **@BotFather**
2. Envía el comando: `/newbot`
3. Sigue las instrucciones:
   - Nombre del bot: `RapidFix Leads Bot`
   - Username: `rapidfix_leads_bot` (debe terminar en `_bot`)
4. Guarda el **token** que te da (ej: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## 2. Obtener Chat ID

### Opción A: Grupo de Telegram (Recomendado)
1. Crea un grupo en Telegram llamado "RapidFix Leads"
2. Añade el bot al grupo
3. Envía un mensaje en el grupo
4. Visita: `https://api.telegram.org/bot<TU_TOKEN>/getUpdates`
5. Busca el `chat.id` (será un número negativo como `-1001234567890`)

### Opción B: Chat Personal
1. Envía un mensaje a tu bot
2. Visita: `https://api.telegram.org/bot<TU_TOKEN>/getUpdates`
3. Busca tu `chat.id` (será un número positivo)

## 3. Configurar Variables de Entorno

En Vercel o tu archivo `.env.local`:

\`\`\`
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=-1001234567890
NEXT_PUBLIC_APP_URL=https://rapidfix.es
DATABASE_URL=postgresql://user:pass@host:5432/rapidfix
\`\`\`

## 4. Cómo Funciona

1. **Cliente chatea con IA** → Captura servicio, problema, teléfono, ciudad
2. **Lead completo** → Se envía automáticamente a Telegram
3. **Partners reciben notificación** con botones:
   - ✅ Aceptar Lead
   - ❌ Rechazar
4. **Primer partner que acepta** → Recibe los datos del cliente

## 5. Comandos Útiles del Bot

Puedes configurar estos comandos en @BotFather con `/setcommands`:

\`\`\`
stats - Ver estadísticas de leads
help - Ayuda y soporte
config - Configuración del bot
\`\`\`

## 6. Múltiples Partners

Para enviar leads a múltiples partners:

1. **Opción A:** Crea un grupo con todos los partners
2. **Opción B:** Usa un canal de Telegram y añade partners como administradores
3. **Opción C:** Implementa lógica de rotación (próxima actualización)

## 7. Configurar Webhook para Respuestas (REQUERIDO)

Para que el sistema de créditos funcione, DEBES configurar el webhook:

1. Configura webhook con este comando: 
   \`\`\`bash
   curl -X POST "https://api.telegram.org/bot<TU_TOKEN>/setWebhook?url=https://rapidfix.es/api/telegram/webhook"
   \`\`\`

2. Verifica que está configurado:
   \`\`\`bash
   curl "https://api.telegram.org/bot<TU_TOKEN>/getWebhookInfo"
   \`\`\`

3. El endpoint ya está creado en `app/api/telegram/webhook/route.ts`

## 8. Sistema de Créditos y Protección de Teléfono

### Cómo Funciona

1. **Teléfono Oculto:** Los partners ven `***678` hasta que aceptan el lead
2. **Sistema de Créditos:** Cada partner tiene un balance de créditos
3. **Aceptar Lead = -1 Crédito:** Al aceptar, se descuenta 1 crédito y se revela el teléfono completo
4. **Sin Créditos = Sin Leads:** Partners sin créditos no pueden ver nuevos leads

### Base de Datos Requerida

Ejecuta el script SQL para crear las tablas:

\`\`\`bash
# En Supabase o tu base de datos PostgreSQL
psql -f scripts/create-partners-table.sql
\`\`\`

Esto crea:
- Tabla `partners`: Gestiona partners, créditos, servicios y ciudades
- Tabla `leads`: Almacena leads con estado y tracking

### Añadir Partners

\`\`\`sql
INSERT INTO partners (name, phone, telegram_chat_id, services, cities, credits) 
VALUES (
  'Juan Fontanero',
  '612345678',
  '123456789', -- Chat ID de Telegram del partner
  ARRAY['fontanero', 'desatascos'],
  ARRAY['Madrid', 'Barcelona'],
  10 -- Créditos iniciales
);
\`\`\`

### Recargar Créditos

\`\`\`sql
UPDATE partners 
SET credits = credits + 20 
WHERE telegram_chat_id = '123456789';
\`\`\`

### Flujo Completo

1. **Lead entra** → Sistema busca partner con créditos en la ciudad
2. **Partner recibe mensaje** con teléfono oculto (***678)
3. **Partner acepta** → Se descuenta 1 crédito
4. **Teléfono revelado** → Partner puede llamar al cliente
5. **Sin créditos** → Partner no recibe más leads hasta recargar

## Soporte

Si tienes problemas, verifica:
- ✅ El bot está añadido al grupo
- ✅ Las variables de entorno están configuradas
- ✅ El chat_id es correcto (negativo para grupos)
- ✅ El token del bot es válido
- ✅ El webhook está configurado correctamente
