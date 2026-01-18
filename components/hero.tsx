"use client"

import { CheckCircle, Shield, ArrowRight, Zap } from "lucide-react"

export function Hero() {
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column - Main content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>Servicio 24/7 en toda España</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
              Tu hogar,
              <br />
              <span className="text-emerald-500">resuelto.</span>
            </h1>

            <p className="text-xl sm:text-2xl text-background/60 leading-relaxed max-w-xl">
              Profesionales verificados en tu puerta en menos de 30 minutos. Fontaneros, electricistas, cerrajeros y
              más.
            </p>

            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-medium text-background/80">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>Presupuesto gratis</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-background/80">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-background/80">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>Garantía 100%</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <div className="flex items-center gap-2 text-sm text-background/50">
                <Shield className="h-4 w-4" />
                <span>Todos los profesionales están verificados</span>
              </div>
            </div>
          </div>

          {/* Right column - Stats grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Main stat */}
            <div className="bg-background/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-background/10 hover:border-emerald-500/30 transition-colors group">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter mb-3 text-emerald-500">
                30<span className="text-background/40">min</span>
              </div>
              <div className="text-lg text-background/60 font-medium">Tiempo de respuesta garantizado</div>
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-background/5 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-background/10 hover:border-emerald-500/30 transition-colors">
                <div className="text-4xl sm:text-5xl font-bold tracking-tighter mb-2">24/7</div>
                <div className="text-sm text-background/50 font-medium">Siempre disponibles</div>
              </div>

              <div className="bg-background/5 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-background/10 hover:border-emerald-500/30 transition-colors">
                <div className="text-4xl sm:text-5xl font-bold tracking-tighter mb-2">15k+</div>
                <div className="text-sm text-background/50 font-medium">Clientes satisfechos</div>
              </div>
            </div>

            {/* CTA hint */}
            <div className="flex items-center justify-center gap-2 text-sm text-background/40 pt-2">
              <span>Chatea con nosotros para empezar</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
