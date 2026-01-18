"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Phone,
  Clock,
  Shield,
  Star,
  CheckCircle2,
  MapPin,
  Zap,
  Users,
  Award,
  Wrench,
  Droplet,
  Key,
  Flame,
} from "lucide-react"
import { Header } from "./header"
import { Footer } from "./footer"
import type { Profession, City, Problem } from "@/lib/seo-data"

interface ServiceLandingTemplateProps {
  profession: Profession
  city: City
  isUrgent?: boolean
  problem?: Problem
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  droplet: Droplet,
  droplets: Droplet,
  key: Key,
  flame: Flame,
  wrench: Wrench,
}

export function ServiceLandingTemplate({ profession, city, isUrgent = false, problem }: ServiceLandingTemplateProps) {
  const [phoneNumber, setPhoneNumber] = useState("711267223")
  const [phoneFormatted, setPhoneFormatted] = useState("711 267 223")
  const Icon = iconMap[profession.icon] || Wrench

  useEffect(() => {
    const fetchPhoneConfig = async () => {
      try {
        const res = await fetch("/api/config/phone")
        const data = await res.json()
        if (data.phoneNumber) {
          setPhoneNumber(data.phoneNumber)
          setPhoneFormatted(data.formatted || data.phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"))
        }
      } catch (error) {
        console.error("Error fetching phone config:", error)
      }
    }
    fetchPhoneConfig()
  }, [])

  const title = problem
    ? `${problem.name} en ${city.name}`
    : isUrgent
      ? `${profession.name} Urgente en ${city.name}`
      : `${profession.namePlural} en ${city.name}`

  const subtitle = problem
    ? `Servicio urgente de ${profession.name.toLowerCase()} para ${problem.name.toLowerCase()} en ${city.name}`
    : isUrgent
      ? `Servicio de emergencia 24 horas. Llegamos en menos de 30 minutos a cualquier punto de ${city.name}`
      : `Servicio profesional de ${profession.name.toLowerCase()}s las 24 horas en ${city.name} y alrededores`

  // Generate fake reviews for the city
  const reviews = [
    {
      name: "María G.",
      location: city.name,
      rating: 5,
      date: "Hace 2 días",
      text: `Excelente servicio de ${profession.name.toLowerCase()} en ${city.name}. Llegaron muy rápido y solucionaron el problema al momento. Muy profesionales.`,
      service: profession.name,
      verified: true,
    },
    {
      name: "Carlos M.",
      location: city.name,
      rating: 5,
      date: "Hace 1 semana",
      text: `Tuve una emergencia a las 3 de la madrugada y vinieron enseguida. Precio justo y trabajo impecable. Recomendado 100%.`,
      service: `${profession.name} urgente`,
      verified: true,
    },
    {
      name: "Ana P.",
      location: city.province,
      rating: 5,
      date: "Hace 2 semanas",
      text: `El mejor servicio de ${profession.name.toLowerCase()}s de ${city.name}. Puntuales, limpios y con muy buenos precios.`,
      service: profession.name,
      verified: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-[104px] sm:h-[112px]" />

      {/* Hero Section */}
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                {isUrgent && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30">
                    <Zap className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-medium text-red-400">URGENTE 24H</span>
                  </div>
                )}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">
                    {city.name}, {city.province}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-background leading-[1.1]">
                {title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-background/60 max-w-xl leading-relaxed">{subtitle}</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
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
                  <span className="text-sm">4.9/5 en {city.name}</span>
                </div>
              </div>
            </div>

            {/* Icon Display */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-3xl scale-150" />

                {/* Icon Container */}
                <div className="relative w-56 h-56 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                  <Icon className="w-24 h-24 text-foreground" />
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

      {/* Problems We Solve */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Problemas que solucionamos en {city.name}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestros {profession.name.toLowerCase()}s profesionales están preparados para resolver cualquier
              emergencia
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {profession.problems.map((prob, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border transition-all ${
                  problem?.slug === prob.slug
                    ? "bg-emerald-500/10 border-emerald-500/50"
                    : "bg-background border-border hover:border-emerald-500/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      problem?.slug === prob.slug ? "text-emerald-500" : "text-emerald-500/60"
                    }`}
                  />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{prob.name}</h3>
                    <p className="text-xs text-muted-foreground">{prob.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">24/7</div>
              <div className="text-background/60 text-sm">Servicio continuo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-background mb-2">30min</div>
              <div className="text-background/60 text-sm">Tiempo de llegada</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-background mb-2">+5.000</div>
              <div className="text-background/60 text-sm">Servicios en {city.province}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">4.9★</div>
              <div className="text-background/60 text-sm">Valoración media</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <span className="text-sm font-semibold text-emerald-600">4.9/5</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Opiniones de clientes en {city.name}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="p-6 bg-background rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-emerald-600">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{review.name}</span>
                      {review.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                    <span className="text-xs text-muted-foreground">{review.location}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-emerald-500 text-emerald-500" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{review.text}</p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-border">
                  <span className="text-emerald-600 font-medium">{review.service}</span>
                  <span className="text-muted-foreground">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Nuestra garantía en {city.name}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-muted/30 rounded-2xl border border-border hover:border-emerald-500/30 transition-all">
              <Clock className="w-10 h-10 text-emerald-500 mb-4" />
              <h3 className="font-bold mb-2">30 min o gratis</h3>
              <p className="text-sm text-muted-foreground">
                Si no llegamos en 30 minutos a {city.name}, el servicio es gratis.
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-2xl border border-border hover:border-emerald-500/30 transition-all">
              <Shield className="w-10 h-10 text-emerald-500 mb-4" />
              <h3 className="font-bold mb-2">Garantía total</h3>
              <p className="text-sm text-muted-foreground">Todos nuestros trabajos tienen garantía de satisfacción.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-2xl border border-border hover:border-emerald-500/30 transition-all">
              <Users className="w-10 h-10 text-emerald-500 mb-4" />
              <h3 className="font-bold mb-2">Profesionales verificados</h3>
              <p className="text-sm text-muted-foreground">Técnicos certificados con más de 10 años de experiencia.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-2xl border border-border hover:border-emerald-500/30 transition-all">
              <Award className="w-10 h-10 text-emerald-500 mb-4" />
              <h3 className="font-bold mb-2">Precio cerrado</h3>
              <p className="text-sm text-muted-foreground">Presupuesto gratuito sin sorpresas ni costes ocultos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-background mb-4">
            ¿Necesitas un {profession.name.toLowerCase()} en {city.name}?
          </h2>
          <p className="text-lg text-background/60 mb-8 max-w-2xl mx-auto">
            Llámanos ahora y tendrás a un profesional en tu puerta en menos de 30 minutos. Servicio 24 horas, los 365
            días del año.
          </p>
          <a
            href={`tel:+34${phoneNumber}`}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-foreground font-bold rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25 text-xl"
          >
            <Phone className="w-6 h-6" />
            <span>Llamar ahora: {phoneFormatted}</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
