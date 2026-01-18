"use client"

import { Users, TrendingUp, Clock, Star } from "lucide-react"

export function PartnerStats() {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Profesionales activos",
    },
    {
      icon: TrendingUp,
      value: "2,500+",
      label: "Leads mensuales",
    },
    {
      icon: Clock,
      value: "< 5 min",
      label: "Tiempo de respuesta",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Satisfacción partners",
    },
  ]

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="bg-foreground/5 p-4 rounded-full">
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="text-sm text-foreground/60">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
