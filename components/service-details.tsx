import { MapPin, CheckCircle2, ArrowRight } from "lucide-react"

interface ServiceDetailsProps {
  features: string[]
  benefits: string[]
  cities: string[]
}

export function ServiceDetails({ features, benefits, cities }: ServiceDetailsProps) {
  return (
    <section className="py-20 md:py-28 px-4 bg-background">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Features & Benefits Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Features Column */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-sm font-semibold text-emerald-500 uppercase tracking-wider">Lo que hacemos</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Servicios incluidos
              </h2>
            </div>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-foreground/[0.02] border border-border/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-base lg:text-lg text-foreground/80 group-hover:text-foreground transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Column */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-sm font-semibold text-emerald-500 uppercase tracking-wider">Por qué elegirnos</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">Ventajas</h2>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-foreground/[0.02] border border-border/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                    <ArrowRight className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-base lg:text-lg text-foreground/80 group-hover:text-foreground transition-colors">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cities Section */}
        <div className="space-y-8 pt-12 border-t border-border/50">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-3">
              <span className="text-sm font-semibold text-emerald-500 uppercase tracking-wider">Cobertura</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Servicio en toda España
              </h2>
            </div>
            <p className="text-muted-foreground">Disponibles 24/7 en las principales ciudades</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {cities.map((city, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-foreground/[0.02] border border-border/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
              >
                <MapPin className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {city}
                </span>
              </div>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium">
            <MapPin className="w-4 h-4" />
            <span>+ Más de 100 ciudades en toda España</span>
          </div>
        </div>
      </div>
    </section>
  )
}
