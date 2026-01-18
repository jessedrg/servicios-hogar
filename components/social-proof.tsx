"use client"

import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"

export function SocialProof() {
  const [recentServices, setRecentServices] = useState([
    { city: "Barcelona", service: "Desatasco urgente", time: "hace 3 minutos" },
    { city: "Barcelona", service: "Electricista 24h", time: "hace 7 minutos" },
    { city: "Barcelona", service: "Fontanero urgente", time: "hace 12 minutos" },
    { city: "Barcelona", service: "Cerrajero express", time: "hace 18 minutos" },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentServices.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [recentServices.length])

  return (
    <section className="py-20 px-4 bg-foreground text-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Servicios en tiempo real</h2>
            <p className="text-background/50">Clientes atendidos recientemente en Barcelona</p>
          </div>

          <div className="bg-background/5 border border-background/10 rounded-2xl p-6 max-w-md mx-auto backdrop-blur-sm">
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-3" key={currentIndex}>
              <div className="h-12 w-12 rounded-full bg-emerald-500 text-foreground flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold">{recentServices[currentIndex].service}</p>
                <p className="text-sm text-background/50">
                  {recentServices[currentIndex].city} • {recentServices[currentIndex].time}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-background/60">
              <span className="text-3xl font-bold text-emerald-500">247</span>
              <span className="ml-2">personas solicitaron servicio esta semana</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
