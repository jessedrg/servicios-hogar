"use client"

import { Phone, MapPin, Clock, Shield, Zap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PostalCodeHeroProps {
  profession: {
    id: string
    name: string
    namePlural: string
  }
  postalcode: string
  zoneName: string
  cityName: string
  description: string
}

export function PostalCodeHero({
  profession,
  postalcode,
  zoneName,
  cityName,
  description,
}: PostalCodeHeroProps) {
  const phoneNumber = "936946639"

  return (
    <section className="relative bg-foreground text-background overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Main content */}
          <div className="space-y-6">
            {/* Postal code badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              <span>Código Postal {postalcode} · {zoneName}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.95]">
              {profession.name}
              <br />
              <span className="text-emerald-500">Urgente</span>
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl text-background/70">
                en {zoneName}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-background/60 leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-background/80">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>Llegamos en 10 min</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-background/80">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>Presupuesto gratis</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-background/80">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>24/7 disponible</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg px-8 py-6"
              >
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="h-5 w-5 mr-2" />
                  Llamar Ahora
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/20 text-background hover:bg-background/10 font-semibold text-lg px-8 py-6"
              >
                <a href={`https://wa.me/34${phoneNumber}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp Urgente
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-background/50 pt-2">
              <Shield className="h-4 w-4" />
              <span>Profesionales verificados en {cityName}</span>
            </div>
          </div>

          {/* Right column - Stats */}
          <div className="grid grid-cols-1 gap-4">
            {/* Main stat - Tiempo */}
            <div className="bg-background/5 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-background/10 hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10">
                  <Zap className="h-8 w-8 text-emerald-500" />
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-bold tracking-tighter text-emerald-500">
                    10<span className="text-background/40 text-3xl">min</span>
                  </div>
                  <div className="text-sm text-background/60 font-medium">
                    Tiempo de llegada a {zoneName}
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/5 backdrop-blur-sm rounded-3xl p-5 lg:p-6 border border-background/10 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-emerald-500" />
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold tracking-tighter">24/7</div>
                    <div className="text-xs text-background/50 font-medium">Siempre disponibles</div>
                  </div>
                </div>
              </div>

              <div className="bg-background/5 backdrop-blur-sm rounded-3xl p-5 lg:p-6 border border-background/10 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-emerald-500" />
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold tracking-tighter">{postalcode}</div>
                    <div className="text-xs text-background/50 font-medium">Tu zona cubierta</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div className="bg-emerald-500/10 backdrop-blur-sm rounded-2xl p-4 border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-background/20 border-2 border-emerald-500/30 flex items-center justify-center text-xs font-bold"
                      >
                        {["JM", "AL", "CP"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-emerald-400">
                      {profession.namePlural} cerca de ti
                    </div>
                    <div className="text-xs text-background/50">
                      Disponibles ahora en {zoneName}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-400">4.9★</div>
                  <div className="text-xs text-background/50">+2.8k reseñas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
