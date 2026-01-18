import type { Metadata } from "next"
import { PartnerHeroSimple } from "@/components/partner-hero-simple"

export const metadata: Metadata = {
  title: "Trabaja con RapidFix - Fontaneros Barcelona",
  description: "Recibe trabajos urgentes de fontanería en Barcelona. Gana 300€+ por trabajo. Hablamos por WhatsApp.",
  keywords: "trabajo fontanero barcelona, clientes fontaneria, leads fontanero, trabajos urgentes fontanero",
}

export default function PartnersPage() {
  return (
    <main className="min-h-screen">
      <PartnerHeroSimple />
    </main>
  )
}
