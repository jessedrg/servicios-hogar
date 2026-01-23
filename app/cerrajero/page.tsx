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
  title: "Cerrajero Urgente 24h | Apertura en 15 Minutos | SERVICIOS HOGAR",
  description:
    "Cerrajero urgente en toda España. Profesionales en 15 minutos. Apertura de puertas, cambio de cerraduras, bombines. Servicio 24/7. Sin roturas.",
  keywords:
    "cerrajero urgente, cerrajero 24 horas, apertura de puertas, cerrajero Madrid, cerrajero Barcelona, puerta bloqueada",
}

const serviceData = {
  title: "Cerrajero Urgente 24h",
  subtitle: "Apertura de puertas sin roturas en 15 minutos",
  description:
    "Cerrajeros profesionales en toda España. Llegamos en menos de 15 minutos para abrir tu puerta sin daños y cambiar cerraduras de forma segura.",
  features: [
    "Apertura de puertas sin roturas",
    "Cambio de cerraduras y bombines",
    "Puertas acorazadas",
    "Cerraduras de seguridad",
    "Duplicado de llaves",
    "Servicio 24 horas todos los días",
  ],
  benefits: [
    "Respuesta en menos de 15 minutos",
    "Cerrajeros certificados",
    "Apertura sin daños",
    "Presupuesto sin compromiso",
    "Cerraduras de alta seguridad",
    "Precios transparentes",
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

const cerrajeroReviews = [
  {
    name: "Pedro L.",
    location: "Madrid",
    rating: 5,
    text: "Me quedé fuera de casa a las 2 AM. Llegaron en 12 minutos y abrieron la puerta sin romper nada. Increíble servicio.",
    service: "Apertura urgente",
    verified: true,
  },
  {
    name: "María J.",
    location: "Barcelona",
    rating: 5,
    text: "Muy profesionales. Cambiaron el bombín de mi puerta en 20 minutos. Precio justo y trabajo impecable.",
    service: "Cambio de bombín",
    verified: true,
  },
  {
    name: "José R.",
    location: "Valencia",
    rating: 5,
    text: "Rápidos y eficientes. Abrieron mi puerta sin daños y me dieron consejos de seguridad.",
    service: "Apertura de puerta",
    verified: true,
  },
  {
    name: "Carmen S.",
    location: "Sevilla",
    rating: 5,
    text: "Excelente atención. Vinieron en 10 minutos y resolvieron el problema de la cerradura atascada.",
    service: "Reparación cerradura",
    verified: true,
  },
  {
    name: "Antonio M.",
    location: "Málaga",
    rating: 5,
    text: "Muy recomendable. Instalaron una cerradura de seguridad de alta calidad.",
    service: "Instalación cerradura",
    verified: true,
  },
  {
    name: "Lucía F.",
    location: "Zaragoza",
    rating: 5,
    text: "Servicio impecable. Abrieron la puerta sin romper nada y el precio fue razonable.",
    service: "Apertura sin roturas",
    verified: true,
  },
]

const cerrajeroFaqs = [
  {
    question: "¿Cuánto tarda en llegar el cerrajero?",
    answer:
      "En emergencias urbanas llegamos en menos de 15 minutos. Te confirmamos el tiempo exacto al solicitar el servicio.",
  },
  {
    question: "¿Rompen la puerta al abrirla?",
    answer:
      "No, utilizamos técnicas profesionales de apertura sin roturas. Solo en casos extremos se requiere forzar la cerradura.",
  },
  {
    question: "¿El presupuesto es gratis?",
    answer:
      "Sí, el presupuesto es completamente gratuito y sin compromiso. Solo pagas si decides realizar el servicio.",
  },
  {
    question: "¿Trabajan de noche y festivos?",
    answer: "Sí, estamos disponibles 24 horas al día, 7 días a la semana, incluidos festivos.",
  },
]

export default function CerrajeroPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <UrgencyBanner />
      <ServiceHero iconName="key" {...serviceData} />
      <LiveActivity service="cerrajero" />
      <ServiceDetails {...serviceData} />
      <GuaranteeSection />
      <ServiceReviews reviews={cerrajeroReviews} />
      <ServiceFaq faqs={cerrajeroFaqs} />
      <AIChatWidget service="cerrajero" />
      <Footer />
    </main>
  )
}
