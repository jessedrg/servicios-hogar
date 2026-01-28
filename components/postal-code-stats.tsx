"use client"

import { Users, Clock, Wrench, Star } from "lucide-react"
import { getZoneStats } from "@/lib/postal-data"

interface PostalCodeStatsProps {
  postalcode: string
}

export function PostalCodeStats({ postalcode }: PostalCodeStatsProps) {
  const stats = getZoneStats(postalcode)

  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Actividad en tu zona <span className="text-emerald-600">({postalcode})</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Datos en tiempo real de servicios en tu código postal
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Servicios hoy */}
          <div className="bg-background rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                <Wrench className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Servicios hoy</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-emerald-600">
              {stats.serviciosHoy}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              En código postal {postalcode}
            </p>
          </div>

          {/* Tiempo medio */}
          <div className="bg-background rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Tiempo llegada</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-blue-600">
              {stats.tiempoMedio}<span className="text-lg">min</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tiempo medio de respuesta
            </p>
          </div>

          {/* Técnicos disponibles */}
          <div className="bg-background rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Técnicos</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-purple-600">
              {stats.tecnicos}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Disponibles ahora cerca
            </p>
          </div>

          {/* Satisfacción */}
          <div className="bg-background rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Satisfacción</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-amber-600">
              {stats.satisfaccion}<span className="text-lg">★</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Valoración media clientes
            </p>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Datos actualizados en tiempo real</span>
        </div>
      </div>
    </section>
  )
}
