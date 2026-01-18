"use client"

import { useEffect, useState } from "react"
import { MapPin, Clock, CheckCircle2 } from "lucide-react"

const activities = [
  {
    name: "Carlos M.",
    city: "Barcelona",
    neighborhood: "Eixample",
    service: "Desatasco urgente",
    time: "Justo ahora",
    verified: true,
  },
  {
    name: "Ana G.",
    city: "Madrid",
    neighborhood: "Chamberí",
    service: "Electricista 24h",
    time: "Hace 1 min",
    verified: true,
  },
  {
    name: "Miguel R.",
    city: "Valencia",
    neighborhood: "Ruzafa",
    service: "Fontanero urgente",
    time: "Hace 3 min",
    verified: false,
  },
  {
    name: "Laura P.",
    city: "Sevilla",
    neighborhood: "Triana",
    service: "Cerrajero urgente",
    time: "Hace 4 min",
    verified: true,
  },
  {
    name: "David S.",
    city: "Málaga",
    neighborhood: "Centro",
    service: "Reparación calderas",
    time: "Hace 6 min",
    verified: true,
  },
  {
    name: "Isabel F.",
    city: "Bilbao",
    neighborhood: "Deusto",
    service: "Desatasco urgente",
    time: "Hace 8 min",
    verified: false,
  },
  {
    name: "Roberto L.",
    city: "Zaragoza",
    neighborhood: "Centro",
    service: "Electricista 24h",
    time: "Hace 11 min",
    verified: true,
  },
  {
    name: "Carmen V.",
    city: "Alicante",
    neighborhood: "Playa",
    service: "Fontanero urgente",
    time: "Hace 13 min",
    verified: true,
  },
]

interface LiveActivityProps {
  service?: string
}

export function LiveActivity({ service }: LiveActivityProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length)
        setIsVisible(true)
      }, 400)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const activity = activities[currentIndex]

  const initials = activity.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div
      className={`hidden md:block fixed bottom-32 lg:bottom-40 right-4 md:right-6 z-40 max-w-[300px] transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-4 scale-95"
      }`}
    >
      <div className="bg-foreground border border-background/10 rounded-2xl p-4 shadow-2xl shadow-black/20">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="font-bold text-sm text-emerald-400">{initials}</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-foreground animate-pulse" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-semibold text-sm text-background truncate">{activity.name}</span>
              {activity.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
            </div>

            <div className="text-xs text-emerald-400 font-medium mb-1.5 truncate">{activity.service}</div>

            <div className="flex items-center gap-3 text-xs text-background/50">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{activity.city}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="whitespace-nowrap">{activity.time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
