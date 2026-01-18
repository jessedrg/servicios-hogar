import { MessageSquare, UserCheck, Wrench } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Solicita el servicio",
    description: "Completa el formulario con tu problema y ubicación",
  },
  {
    icon: UserCheck,
    title: "Te asignamos un profesional",
    description: "En menos de 5 minutos conectamos con el mejor experto",
  },
  {
    icon: Wrench,
    title: "Problema resuelto",
    description: "El profesional llega y soluciona tu emergencia",
  },
]

export function HowItWorks() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-balance leading-tight">Cómo funciona</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Tres pasos simples para resolver tu emergencia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 relative">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-2xl bg-foreground flex items-center justify-center shadow-lg">
                    <step.icon className="h-12 w-12 text-background" />
                  </div>
                  <div className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center text-lg font-bold border-4 border-background shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{step.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
