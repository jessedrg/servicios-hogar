"use client"

import { MessageCircle, Zap, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function PartnerHeroSimple() {
  const [phoneNumber, setPhoneNumber] = useState("936946639")

  useEffect(() => {
    fetch("/api/config/phone")
      .then((res) => res.json())
      .then((data) => {
        if (data.phoneNumber) {
          setPhoneNumber(data.phoneNumber)
        }
      })
      .catch(console.error)
  }, [])

  const whatsappMessage = encodeURIComponent("Hola! Quiero trabajar con vosotros y recibir clientes urgentes.")
  const whatsappLink = `https://wa.me/34${phoneNumber}?text=${whatsappMessage}`

  return (
    <section className="h-screen bg-[#fafafa] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 overflow-hidden">
      <div className="max-w-xl mx-auto text-center space-y-4 sm:space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-foreground/5 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-foreground/70">Buscamos profesionales en Barcelona</span>
        </div>

        {/* Main headline - reducido tamaños */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-foreground text-balance">
            Recibe trabajos urgentes cada dia
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 font-normal max-w-md mx-auto text-pretty">
            Fontaneros, electricistas, cerrajeros y mas. Clientes que te necesitan hoy.
          </p>
        </div>

        {/* Earnings highlight - reducido padding */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5 rounded-2xl blur-xl" />
          <div className="relative bg-foreground text-background rounded-2xl p-5 sm:p-6">
            <p className="text-xs uppercase tracking-widest text-background/60 mb-1">Ganancias por trabajo</p>
            <p className="text-4xl sm:text-5xl font-black">300-500€</p>
            <p className="text-background/60 text-sm mt-1">trabajos urgentes, tu pones el precio</p>
          </div>
        </div>

        {/* Benefits - horizontal en movil, mas compacto */}
        <div className="flex justify-center gap-4 sm:gap-8">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground/5 rounded-xl flex items-center justify-center">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
            </div>
            <p className="font-semibold text-foreground text-xs sm:text-sm">Leads exclusivos</p>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground/5 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
            </div>
            <p className="font-semibold text-foreground text-xs sm:text-sm">Tu decides</p>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground/5 rounded-xl flex items-center justify-center">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
            </div>
            <p className="font-semibold text-foreground text-xs sm:text-sm">Sin cuotas</p>
          </div>
        </div>

        {/* CTA - reducido tamaño boton */}
        <div className="space-y-3 pt-2">
          <Button
            size="lg"
            className="bg-[#25D366] hover:bg-[#1fbd5a] text-white text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-full font-bold w-full sm:w-auto shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              Escribenos por WhatsApp
            </a>
          </Button>

          <p className="text-foreground/40 text-xs sm:text-sm">Solo profesionales con experiencia</p>
        </div>
      </div>
    </section>
  )
}
