"use client"

import { Shield, Phone, Clock, Banknote, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PartnerGuarantee() {
  return (
    <section className="py-20 px-4 bg-foreground text-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-background/10 px-6 py-3 rounded-full">
            <Shield className="h-5 w-5" />
            <span className="font-bold text-lg">Cómo Funciona</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Simple y Transparente
            <br />
            <span className="text-background/70">Sin Sorpresas</span>
          </h2>

          <p className="text-xl md:text-2xl text-background/80 max-w-3xl mx-auto leading-relaxed">
            Recibes clientes en tu móvil. Decides si te interesa. Pagas solo por los que aceptas. El dinero del trabajo
            es 100% tuyo.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-xl p-6 text-center space-y-4">
            <div className="bg-background text-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold">Te Registras</h3>
            <p className="text-background/70 text-sm">Rellenas el formulario con tus datos y te unes al grupo</p>
          </div>

          <div className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-xl p-6 text-center space-y-4">
            <div className="bg-background text-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold">Recibes Leads</h3>
            <p className="text-background/70 text-sm">Te llegan clientes que necesitan ayuda urgente en Barcelona</p>
          </div>

          <div className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-xl p-6 text-center space-y-4">
            <div className="bg-background text-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold">Decides y Pagas</h3>
            <p className="text-background/70 text-sm">Solo pagas por los clientes que quieras aceptar (30-50€/lead)</p>
          </div>

          <div className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-xl p-6 text-center space-y-4">
            <div className="bg-background text-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              4
            </div>
            <h3 className="text-xl font-bold">Contactas y Cobras</h3>
            <p className="text-background/70 text-sm">Llamas al cliente, haces el trabajo y cobras directamente</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-xl p-8 space-y-4">
            <div className="bg-background/20 w-14 h-14 rounded-full flex items-center justify-center">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold">Lead Exclusivo</h3>
            <p className="text-background/70">
              Solo TÚ recibes el contacto del cliente. Sin competencia, sin subastas.
            </p>
          </div>

          <div className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-xl p-8 space-y-4">
            <div className="bg-background/20 w-14 h-14 rounded-full flex items-center justify-center">
              <Banknote className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold">Sin Comisiones</h3>
            <p className="text-background/70">
              El dinero del servicio es 100% tuyo. Nosotros solo cobramos por el lead.
            </p>
          </div>

          <div className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-xl p-8 space-y-4">
            <div className="bg-background/20 w-14 h-14 rounded-full flex items-center justify-center">
              <Clock className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold">Garantía de Reembolso</h3>
            <p className="text-background/70">Si el cliente no responde o el dato es falso, te devolvemos el dinero.</p>
          </div>
        </div>

        <div className="text-center space-y-6">
          <Button
            size="lg"
            className="bg-background text-foreground hover:bg-background/90 text-lg px-10 py-6 font-bold"
            asChild
          >
            <a href="#partner-form">
              <Phone className="mr-2 h-5 w-5" />
              Empezar a Recibir Clientes
            </a>
          </Button>
          <p className="text-background/60 text-sm">Sin cuotas mensuales - Solo pagas por los leads que aceptes</p>
        </div>
      </div>
    </section>
  )
}
