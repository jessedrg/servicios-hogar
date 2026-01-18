import { Euro, Users, Zap, Shield, Send, Wallet } from "lucide-react"

export function PartnerBenefits() {
  const benefits = [
    {
      icon: Send,
      title: "Leads por Telegram",
      description: "Recibe notificaciones instantáneas en Telegram. Acepta o rechaza leads con un simple comando.",
    },
    {
      icon: Euro,
      title: "Solo pagas por lead",
      description:
        "Compra créditos y paga únicamente por los leads que aceptes. Sin cuotas mensuales ni costes ocultos.",
    },
    {
      icon: Wallet,
      title: "Sin comisiones",
      description:
        "No cobramos comisión sobre tus servicios. El dinero del trabajo es 100% tuyo. Tú lo manejas con el cliente.",
    },
    {
      icon: Users,
      title: "Clientes cualificados",
      description: "Todos los leads están verificados y necesitan tu servicio urgentemente en Barcelona.",
    },
    {
      icon: Zap,
      title: "Tiempo real",
      description: "Los leads se generan y envían al instante. Sé el primero en contactar con el cliente.",
    },
    {
      icon: Shield,
      title: "Sin permanencia",
      description: "Usa tus créditos cuando quieras. Sin contratos de permanencia ni penalizaciones.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-foreground/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">¿Cómo funciona?</h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Sistema simple y transparente: compra créditos, recibe leads por Telegram, acepta los que quieras
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="bg-background p-8 rounded-lg space-y-4 border border-foreground/10">
                <div className="bg-foreground/5 w-14 h-14 rounded-full flex items-center justify-center">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-background border border-foreground/10 rounded-xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Flujo de trabajo simple</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="bg-foreground text-background w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                1
              </div>
              <h4 className="font-bold">Únete al bot</h4>
              <p className="text-sm text-foreground/60">Abre Telegram y únete a @rapidfix_leads_bot</p>
            </div>
            <div className="text-center space-y-3">
              <div className="bg-foreground text-background w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                2
              </div>
              <h4 className="font-bold">Compra créditos</h4>
              <p className="text-sm text-foreground/60">Compra créditos desde el bot cuando los necesites</p>
            </div>
            <div className="text-center space-y-3">
              <div className="bg-foreground text-background w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                3
              </div>
              <h4 className="font-bold">Recibe leads</h4>
              <p className="text-sm text-foreground/60">Te llegan notificaciones con información del cliente</p>
            </div>
            <div className="text-center space-y-3">
              <div className="bg-foreground text-background w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                4
              </div>
              <h4 className="font-bold">Acepta y cobra</h4>
              <p className="text-sm text-foreground/60">Acepta el lead, contacta al cliente y cobra directamente</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
