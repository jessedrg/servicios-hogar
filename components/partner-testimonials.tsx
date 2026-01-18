import { Star } from "lucide-react"

export function PartnerTestimonials() {
  const testimonials = [
    {
      name: "Carlos Martínez",
      role: "Electricista - Madrid",
      content:
        "Desde que me uní a rapidfix.es, mi agenda está siempre llena. Los leads son de calidad y los clientes realmente necesitan el servicio. Muy recomendable.",
      rating: 5,
    },
    {
      name: "Ana López",
      role: "Fontanera - Barcelona",
      content:
        "Lo mejor es que no hay cuotas mensuales. Solo pago por los leads que recibo y puedo elegir cuántos quiero. Perfecto para gestionar mi negocio.",
      rating: 5,
    },
    {
      name: "Miguel Sánchez",
      role: "Cerrajero - Valencia",
      content:
        "El sistema de notificaciones en tiempo real es increíble. Puedo responder rápido a los clientes y cerrar más trabajos. He duplicado mis ingresos.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Lo que dicen nuestros partners</h2>
          <p className="text-xl text-foreground/60">Profesionales que ya están creciendo con rapidfix.es</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-foreground/5 p-8 rounded-lg space-y-4">
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-foreground" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed italic">{testimonial.content}</p>
              <div className="pt-4 border-t border-foreground/10">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
