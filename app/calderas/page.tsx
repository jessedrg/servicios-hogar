import type { Metadata } from "next"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { ServiceReviews } from "@/components/service-reviews"
import { ServiceFaq } from "@/components/service-faq"
import { LiveActivity } from "@/components/live-activity"
import { GuaranteeSection } from "@/components/guarantee-section"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Reparación de Calderas 24h | Servicio Urgente | HOGARYA",
  description:
    "Reparación de calderas urgente en toda España. Técnicos en 30 minutos. Calderas de gas, gasoil, mantenimiento. Servicio 24/7. Presupuesto gratis.",
  keywords:
    "reparación calderas, caldera no enciende, mantenimiento calderas, calderas Madrid, calderas Barcelona, técnico calderas",
}

const serviceData = {
  title: "Reparación de Calderas 24h",
  subtitle: "Técnicos especializados para reparación y mantenimiento de calderas",
  description:
    "Técnicos certificados en calderas en toda España. Llegamos en menos de 30 minutos para reparar tu caldera y restaurar el agua caliente y calefacción.",
  features: [
    "Reparación de calderas de gas",
    "Calderas de gasoil",
    "Mantenimiento preventivo",
    "Revisión oficial",
    "Instalación de calderas nuevas",
    "Servicio 24 horas todos los días",
  ],
  benefits: [
    "Respuesta en menos de 30 minutos",
    "Técnicos certificados",
    "Todas las marcas",
    "Presupuesto sin compromiso",
    "Repuestos originales",
    "Garantía de reparación",
  ],
  cities: [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Sevilla",
    "Zaragoza",
    "Málaga",
    "Murcia",
    "Palma",
    "Bilbao",
    "Alicante",
    "Córdoba",
    "Valladolid",
  ],
}

const calderasReviews = [
  {
    name: "Carlos M.",
    location: "Madrid",
    rating: 5,
    text: "Mi caldera dejó de funcionar en pleno invierno. Vinieron en 25 minutos y la repararon en el acto. Excelente servicio.",
    service: "Reparación de caldera",
    verified: true,
  },
  {
    name: "Laura G.",
    location: "Barcelona",
    rating: 5,
    text: "Muy profesionales. Hicieron el mantenimiento anual de mi caldera y me explicaron todo perfectamente.",
    service: "Mantenimiento",
    verified: true,
  },
  {
    name: "Miguel A.",
    location: "Valencia",
    rating: 5,
    text: "Rápidos y eficientes. La caldera volvió a funcionar perfectamente. Precio justo y sin sorpresas.",
    service: "Reparación urgente",
    verified: true,
  },
  {
    name: "Ana P.",
    location: "Sevilla",
    rating: 5,
    text: "Excelente atención. Vinieron el mismo día y solucionaron el problema de agua caliente.",
    service: "Reparación",
    verified: true,
  },
  {
    name: "Roberto S.",
    location: "Málaga",
    rating: 5,
    text: "Técnico muy profesional. Explicó el problema claramente y lo resolvió rápido.",
    service: "Diagnóstico y reparación",
    verified: true,
  },
  {
    name: "Isabel R.",
    location: "Zaragoza",
    rating: 5,
    text: "Servicio impecable. La caldera funciona como nueva después de la reparación.",
    service: "Reparación completa",
    verified: true,
  },
]

const calderasFaqs = [
  {
    question: "¿Cuánto tarda en llegar el técnico?",
    answer:
      "Nuestros técnicos llegan en menos de 30 minutos en zonas urbanas. Te confirmamos el tiempo exacto al solicitar el servicio.",
  },
  {
    question: "¿Qué marcas de calderas reparan?",
    answer: "Reparamos todas las marcas: Vaillant, Junkers, Saunier Duval, Baxi, Roca, Ferroli, y muchas más.",
  },
  {
    question: "¿El presupuesto es gratis?",
    answer:
      "Sí, el presupuesto es completamente gratuito y sin compromiso. Solo pagas si decides realizar la reparación.",
  },
  {
    question: "¿Tienen repuestos disponibles?",
    answer:
      "Sí, nuestros técnicos llevan los repuestos más comunes. Para piezas específicas, las conseguimos en 24-48 horas.",
  },
]

export default function CalderasPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <UrgencyBanner />
      <ServiceHero iconName="flame" {...serviceData} />
      <LiveActivity service="calderas" />
      <ServiceDetails {...serviceData} />
      <GuaranteeSection />
      <ServiceReviews reviews={calderasReviews} />
      <ServiceFaq faqs={calderasFaqs} />
      <AIChatWidget service="calderas" />
      <Footer />
    </main>
  )
}
