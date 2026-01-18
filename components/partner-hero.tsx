import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Users } from "lucide-react"

export function PartnerHero() {
  return (
    <section className="bg-foreground text-background py-24 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-background/10 text-background px-6 py-3 rounded-full text-sm font-bold border-2 border-background/20">
          <Shield className="h-5 w-5" />
          Si el cliente no responde, te devolvemos el dinero
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Recibe Clientes
          <br />
          <span className="text-background/80">Cada Día en tu Móvil</span>
        </h1>

        <p className="text-xl md:text-2xl text-background/80 leading-relaxed max-w-2xl mx-auto">
          Te enviamos clientes que necesitan ayuda urgente.
          <span className="font-bold text-background"> Solo pagas por los que quieras aceptar.</span> Si el cliente no
          te responde, te hacemos reembolso.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-background/90">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Leads exclusivos (solo tú)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Sin cuotas mensuales
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Tú decides qué aceptas
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 font-bold"
            asChild
          >
            <a href="#partner-form">
              <Users className="mr-2 h-5 w-5" />
              Empezar a Recibir Clientes
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6 font-bold border-2"
            asChild
          >
            <a href="#partner-form">
              Ver cómo funciona
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>

        <div className="pt-8 text-background/60 text-sm space-y-2">
          <p className="font-semibold text-background">
            Fontaneros | Electricistas | Cerrajeros | Desatascos | Calderas
          </p>
          <p>Leads directos a tu WhatsApp - Trabajos de 150€ a 400€</p>
        </div>
      </div>
    </section>
  )
}
