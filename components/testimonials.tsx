import { Card } from "@/components/ui/card"
import { Star, CheckCircle } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    location: "Barcelona",
    service: "Desatasco",
    text: "Increíble servicio. Llegaron en 20 minutos y solucionaron el problema al instante. Muy profesionales.",
    rating: 5,
  },
  {
    name: "Carlos Ruiz",
    location: "Barcelona",
    service: "Electricista",
    text: "Profesionales de verdad. Me quedé sin luz a las 11 de la noche y en 30 minutos estaba todo arreglado.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    location: "Barcelona",
    service: "Cerrajero",
    text: "Me dejé las llaves dentro y vinieron rapidísimo. Precio justo y muy amables. 100% recomendable.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-32 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-bold shadow-lg mb-4">
            <Star className="h-4 w-4 fill-background" />
            <span>4.9/5 • 10,000+ servicios completados</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-balance leading-tight">Miles de clientes satisfechos</h2>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty leading-relaxed">
            Lee lo que dicen nuestros clientes sobre su experiencia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 space-y-6 hover:shadow-2xl transition-shadow border-2">
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-foreground text-foreground" />
                ))}
              </div>
              <p className="text-lg text-pretty leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="pt-6 border-t space-y-2">
                <div className="font-bold text-lg">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground font-medium">
                  {testimonial.service} • {testimonial.location}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CheckCircle className="h-4 w-4" />
                  <span>Cliente verificado</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
