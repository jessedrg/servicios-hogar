import { MapPin } from "lucide-react"

const cities = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Zaragoza",
  "Málaga",
  "Murcia",
  "Palma",
  "Las Palmas",
  "Bilbao",
  "Alicante",
  "Córdoba",
  "Valladolid",
  "Vigo",
  "Gijón",
  "Hospitalet",
  "Vitoria",
  "Granada",
  "Elche",
  "Oviedo",
  "Badalona",
  "Cartagena",
  "Terrassa",
  "Jerez",
  "Sabadell",
  "Santa Cruz",
  "Pamplona",
  "Almería",
  "Fuenlabrada",
  "Leganés",
]

export function Coverage() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Cobertura actual</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Actualmente operamos en Barcelona. Próximamente en más ciudades de España.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-4 px-8 py-6 bg-foreground text-background rounded-2xl">
            <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <span className="text-2xl font-bold">Barcelona</span>
              <p className="text-sm text-background/60">Disponible 24/7</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            <span className="text-emerald-500 font-medium">Próximamente:</span> Madrid, Valencia, Sevilla y más ciudades
          </p>
        </div>
      </div>
    </section>
  )
}
