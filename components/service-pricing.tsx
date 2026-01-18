"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface PriceOption {
  name: string
  price: string
  description: string
}

interface ServicePricingProps {
  service: string
  prices: PriceOption[]
}

export function ServicePricing({ service, prices }: ServicePricingProps) {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Precios transparentes</h2>
          <p className="text-xl text-muted-foreground text-pretty">Sin sorpresas, presupuesto claro desde el inicio</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {prices.map((price, index) => (
            <Card key={index} className="p-8 space-y-6 hover:shadow-lg transition-shadow">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{price.name}</h3>
                <div className="text-4xl font-bold">{price.price}</div>
                <p className="text-muted-foreground">{price.description}</p>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4" />
                  <span>Desplazamiento incluido</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4" />
                  <span>Presupuesto sin compromiso</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4" />
                  <span>Garantía de servicio</span>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={scrollToForm}>
                Solicitar servicio
              </Button>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          * Precios orientativos. El precio final puede variar según la complejidad del trabajo.
        </p>
      </div>
    </section>
  )
}
