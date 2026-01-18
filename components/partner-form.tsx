"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, MessageCircle, Loader2 } from "lucide-react"
import { TELEGRAM_GROUP_LINKS } from "@/lib/telegram-bots"

export function PartnerForm() {
  const [step, setStep] = useState<"select" | "form" | "success">("select")
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  })

  const services = [
    { id: "fontanero", name: "Fontanero", icon: "🔧", description: "Reparaciones de agua, tuberías, grifos" },
    { id: "electricista", name: "Electricista", icon: "⚡", description: "Instalaciones eléctricas, averías" },
    { id: "cerrajero", name: "Cerrajero", icon: "🔑", description: "Apertura de puertas, cerraduras" },
    { id: "desatascos", name: "Desatascos", icon: "🚿", description: "Limpieza de tuberías, atascos" },
    { id: "calderas", name: "Calderas", icon: "🔥", description: "Reparación y mantenimiento de calderas" },
  ]

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setStep("form")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/notify-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          email: formData.email,
          service: selectedService,
        }),
      })

      if (!response.ok) {
        console.error("[v0] Failed to send notification")
      }
    } catch (error) {
      console.error("[v0] Error sending notification:", error)
    } finally {
      setIsSubmitting(false)
      setStep("success")
    }
  }

  const getTelegramLink = () => {
    if (!selectedService) return "#"
    return TELEGRAM_GROUP_LINKS[selectedService] || "#"
  }

  const getServiceName = () => {
    return services.find((s) => s.id === selectedService)?.name || ""
  }

  return (
    <section id="partner-form" className="py-20 px-4 bg-foreground text-background">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Únete ahora</h2>
          <p className="text-xl text-background/80 leading-relaxed">
            {step === "select" && "Selecciona tu profesión para unirte al canal de Barcelona"}
            {step === "form" && `Completa tus datos para unirte como ${getServiceName()}`}
            {step === "success" && "¡Ya casi estás! Únete al grupo de Telegram"}
          </p>
        </div>

        {step === "select" && (
          <div className="grid gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service.id)}
                className="bg-background/10 border border-background/20 rounded-lg p-6 text-left hover:bg-background/20 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{service.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-background">{service.name}</h3>
                    <p className="text-background/70">{service.description}</p>
                  </div>
                  <div className="text-background/50 group-hover:text-background transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
            <p className="text-center text-background/60 text-sm mt-4">Zona disponible: Barcelona</p>
          </div>
        )}

        {step === "form" && (
          <form
            onSubmit={handleSubmit}
            className="bg-background/10 border border-background/20 rounded-lg p-8 space-y-6"
          >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-background/20">
              <span className="text-3xl">{services.find((s) => s.id === selectedService)?.icon}</span>
              <div>
                <p className="text-background/70 text-sm">Profesión seleccionada</p>
                <p className="text-xl font-bold">{getServiceName()} - Barcelona</p>
              </div>
              <button
                type="button"
                onClick={() => setStep("select")}
                className="ml-auto text-background/60 hover:text-background text-sm underline"
              >
                Cambiar
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-background">
                  Nombre completo *
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background text-foreground border-background/20"
                  placeholder="Juan Pérez"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-background">
                  Nombre de empresa
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-background text-foreground border-background/20"
                  placeholder="Electricidad Pérez SL"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-background">
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background text-foreground border-background/20"
                  placeholder="+34 600 123 456"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-background">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background text-foreground border-background/20"
                  placeholder="juan@empresa.com"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-background text-foreground hover:bg-background/90 text-lg font-bold py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Continuar"
                )}
              </Button>
            </div>
          </form>
        )}

        {step === "success" && (
          <div className="bg-background/10 border border-background/20 rounded-lg p-8 text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-background" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">¡Datos guardados!</h3>
              <p className="text-background/80 leading-relaxed">
                Ahora únete al grupo de Telegram para empezar a recibir leads de {getServiceName()} en Barcelona.
              </p>
            </div>

            <a
              href={getTelegramLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors w-full"
            >
              <MessageCircle className="h-6 w-6" />
              Unirme al grupo de Telegram
            </a>

            <div className="text-sm text-background/60 space-y-2 pt-4 border-t border-background/20">
              <p className="font-semibold text-background/80">Próximos pasos:</p>
              <ol className="text-left list-decimal list-inside space-y-1">
                <li>Únete al grupo de Telegram</li>
                <li>Escribe /start para activar tu cuenta</li>
                <li>Compra créditos con /buy</li>
                <li>Empieza a recibir leads</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
