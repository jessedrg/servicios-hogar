import { Shield, Clock, ThumbsUp, Award } from "lucide-react"

export function GuaranteeSection() {
  const guarantees = [
    {
      icon: Clock,
      title: "Llegada en 30min",
      description: "O el servicio es gratis. Garantizamos rapidez en emergencias.",
    },
    {
      icon: Shield,
      title: "100% Garantizado",
      description: "Todos nuestros trabajos tienen garantía de satisfacción total.",
    },
    {
      icon: ThumbsUp,
      title: "Sin compromiso",
      description: "Presupuesto gratuito. Solo pagas si aceptas el servicio.",
    },
    {
      icon: Award,
      title: "Profesionales",
      description: "Técnicos certificados con más de 10 años de experiencia.",
    },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Nuestra garantía</h2>
          <p className="text-muted-foreground">Comprometidos con tu satisfacción</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, index) => (
            <div
              key={index}
              className="bg-background p-8 rounded-2xl border border-border hover:border-emerald-500/30 transition-all group"
            >
              <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-500 transition-colors">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
