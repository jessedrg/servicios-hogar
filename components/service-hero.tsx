"use client"

import { Clock, Flame, Key, Blinds, Wrench, Droplet, Zap, Phone, Shield, Star } from "lucide-react"
import { useState, useEffect } from "react"

interface ServiceHeroProps {
  iconName?: string
  title: string
  subtitle: string
  description: string
}

const iconMap = {
  flame: Flame,
  key: Key,
  blinds: Blinds,
  wrench: Wrench,
  droplet: Droplet,
  droplets: Droplet,
  zap: Zap,
}

export function ServiceHero({ iconName = "wrench", title, subtitle, description }: ServiceHeroProps) {
  const Icon = iconMap[iconName as keyof typeof iconMap] || Wrench
  const [phoneNumber] = useState("936946639")
  const [phoneFormatted] = useState("936 946 639")

  return (
    <section className="relative bg-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient Orb */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-400">Disponible ahora</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-background leading-[1.1]">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-background/60 max-w-xl leading-relaxed">{subtitle}</p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:+34${phoneNumber}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-foreground font-bold rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25 text-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Llamar: {phoneFormatted}</span>
              </a>

              <div className="flex items-center gap-3 px-6 py-4 bg-background/5 border border-background/10 rounded-full">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span className="text-background/80 font-medium">Llegamos en 30 min</span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-background/60">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">Profesionales verificados</span>
              </div>
              <div className="flex items-center gap-2 text-background/60">
                <Star className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">4.9/5 en reseñas</span>
              </div>
            </div>
          </div>

          {/* Icon Display */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-3xl scale-150" />

              {/* Icon Container */}
              <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                <Icon className="w-28 h-28 text-foreground" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 px-6 py-3 bg-background rounded-2xl shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="font-bold text-foreground">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
