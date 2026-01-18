"use client"

import { Zap } from "lucide-react"

export function UrgencyBanner() {
  return (
    <div className="bg-emerald-500 text-foreground py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-medium">
        <Zap className="h-4 w-4" />
        <span>Emergencia 24/7</span>
        <span className="text-foreground/60">•</span>
        <span>Respuesta garantizada en 30 minutos</span>
      </div>
    </div>
  )
}
