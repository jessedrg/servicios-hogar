import { Shield, Users, TrendingUp, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Panel Admin - rapidfix.es",
  description: "Panel de administración para gestionar leads y partners",
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Panel Admin</h1>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Admin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Leads Hoy</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-3xl font-bold">127</div>
            <div className="text-xs text-green-600 mt-1">+23% vs ayer</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Partners Activos</span>
              <Users className="w-4 h-4" />
            </div>
            <div className="text-3xl font-bold">542</div>
            <div className="text-xs text-muted-foreground mt-1">En toda España</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Tasa Aceptación</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-3xl font-bold">87%</div>
            <div className="text-xs text-green-600 mt-1">Excelente</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Ingresos Mes</span>
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-3xl font-bold">€42.5K</div>
            <div className="text-xs text-green-600 mt-1">+15% vs mes anterior</div>
          </Card>
        </div>

        {/* Recent Leads */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Leads Recientes</h2>
          <div className="space-y-4">
            {[
              {
                id: "1",
                service: "Desatasco",
                city: "Madrid",
                status: "accepted",
                partner: "Juan García",
                time: "Hace 2 min",
              },
              {
                id: "2",
                service: "Electricista",
                city: "Barcelona",
                status: "pending",
                partner: "-",
                time: "Hace 5 min",
              },
              {
                id: "3",
                service: "Fontanero",
                city: "Valencia",
                status: "accepted",
                partner: "María López",
                time: "Hace 8 min",
              },
            ].map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="font-semibold">
                    {lead.service} - {lead.city}
                  </div>
                  <div className="text-sm text-muted-foreground">{lead.time}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    {lead.status === "accepted" ? (
                      <span className="text-green-600">✓ Aceptado por {lead.partner}</span>
                    ) : (
                      <span className="text-yellow-600">⏳ Pendiente</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Integration Setup */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Configuración de Integraciones</h2>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">WhatsApp Business API</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Conecta con Twilio o Meta Business para enviar leads automáticamente
              </p>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Twilio Account SID"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                />
                <input
                  type="password"
                  placeholder="Twilio Auth Token"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                />
                <button className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold">
                  Conectar WhatsApp
                </button>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Telegram Bot</h3>
              <p className="text-sm text-muted-foreground mb-3">Crea un bot en @BotFather y pega el token aquí</p>
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Bot Token"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                />
                <button className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold">
                  Conectar Telegram
                </button>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Intercom</h3>
              <p className="text-sm text-muted-foreground mb-3">Chat en tiempo real para soporte inicial</p>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Intercom App ID"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                />
                <button className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold">
                  Conectar Intercom
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
