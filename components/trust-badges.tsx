import { Shield, Award, Clock, ThumbsUp } from "lucide-react"

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Profesionales Verificados",
      description: "Todos nuestros técnicos están certificados",
    },
    {
      icon: Award,
      title: "Garantía de Calidad",
      description: "100% satisfacción garantizada",
    },
    {
      icon: Clock,
      title: "Respuesta Inmediata",
      description: "En tu ubicación en menos de 30 minutos",
    },
    {
      icon: ThumbsUp,
      title: "4.9/5 Valoración",
      description: "Más de 1.200 opiniones verificadas",
    },
  ]

  return (
    <section className="py-24 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl bg-background border border-border hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="h-14 w-14 rounded-2xl bg-foreground text-background flex items-center justify-center">
                <badge.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">{badge.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
