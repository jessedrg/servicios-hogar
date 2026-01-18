import Link from "next/link"
import { Wrench, Zap, Droplet, Key, Flame } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const services = [
  {
    icon: Droplet,
    title: "Desatascos",
    description: "Tuberías, desagües y sistemas de alcantarillado",
    href: "/desatascos",
  },
  {
    icon: Zap,
    title: "Electricista",
    description: "Averías eléctricas, instalaciones y reparaciones",
    href: "/electricista",
  },
  {
    icon: Wrench,
    title: "Fontanero",
    description: "Fugas, instalaciones y reparaciones de fontanería",
    href: "/fontanero",
  },
  {
    icon: Key,
    title: "Cerrajero",
    description: "Apertura de puertas, cambio de cerraduras",
    href: "/cerrajero",
  },
  {
    icon: Flame,
    title: "Calderas",
    description: "Reparación y mantenimiento de calderas",
    href: "/calderas",
  },
]

export function Services() {
  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 md:space-y-6 lg:space-y-8 mb-12 md:mb-20 lg:mb-24">
          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance leading-tight tracking-tight">
            Servicios express disponibles
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-4">
            Profesionales cualificados para cualquier emergencia en tu hogar o negocio
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="no-underline">
              <Card className="p-6 md:p-10 lg:p-12 h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group border hover:border-foreground/30 bg-background">
                <div className="space-y-4 md:space-y-6 lg:space-y-8">
                  <div className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-xl md:rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300 border border-foreground/10 group-hover:border-foreground">
                    <service.icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
                  </div>
                  <div className="space-y-2 md:space-y-3 lg:space-y-4">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold group-hover:text-foreground transition-colors leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base lg:text-lg">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-bold opacity-60 group-hover:opacity-100 transition-opacity pt-1 md:pt-2">
                    <span>Ver más</span>
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
