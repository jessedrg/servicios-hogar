import type { Metadata } from "next"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceReviews } from "@/components/service-reviews"
import { ServiceFAQ } from "@/components/service-faq"
import { GuaranteeSection } from "@/components/guarantee-section"
import { LiveActivity } from "@/components/live-activity"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Electricista Urgente 24h | HOGARYA | Servicio en 30 Minutos",
  description:
    "Electricista urgente en toda España. Profesionales en 30 minutos. Averías eléctricas, cuadros eléctricos, enchufes. Servicio 24/7. Presupuesto gratis.",
  keywords:
    "electricista urgente, electricista 24 horas, avería eléctrica, electricista Madrid, electricista Barcelona, sin luz",
  openGraph: {
    title: "Electricista Urgente 24h | HOGARYA",
    description: "Profesionales en 30 minutos. Presupuesto gratis sin compromiso.",
  },
}

const serviceData = {
  iconName: "zap",
  title: "Electricista Urgente 24h",
  subtitle: "Solución rápida para averías eléctricas, cortes de luz y problemas eléctricos",
  description:
    "Electricistas profesionales en toda España. Llegamos en menos de 30 minutos para solucionar cualquier problema eléctrico de forma segura.",
  features: [
    "Reparación de averías eléctricas",
    "Cuadros eléctricos y diferenciales",
    "Instalación de enchufes e interruptores",
    "Reparación de cortocircuitos",
    "Iluminación y lámparas",
    "Servicio 24 horas todos los días",
  ],
  benefits: [
    "Respuesta en menos de 30 minutos",
    "Electricistas certificados",
    "Trabajo seguro y garantizado",
    "Presupuesto sin compromiso",
    "Materiales de calidad",
    "Disponible 24/7 en toda España",
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

const reviews = [
  {
    name: "Pedro Fernández",
    location: "Madrid",
    rating: 5 as const,
    date: "Hace 1 día",
    text: "Se fue la luz en toda la casa a las 11 de la noche. Llamé y en 25 minutos estaba el electricista. Solucionó el problema del diferencial rápidamente. Muy profesional.",
    service: "Avería eléctrica urgente",
    verified: true,
  },
  {
    name: "Carmen Díaz",
    location: "Barcelona",
    rating: 5 as const,
    date: "Hace 3 días",
    text: "Excelente servicio. Necesitaba instalar varios enchufes y lo hicieron perfecto. Trabajo limpio y precio razonable.",
    service: "Instalación enchufes",
    verified: true,
  },
  {
    name: "Antonio Ruiz",
    location: "Valencia",
    rating: 5 as const,
    date: "Hace 4 días",
    text: "Tuve un cortocircuito y vinieron super rápido. El electricista era muy profesional y explicó todo claramente. Muy recomendable.",
    service: "Reparación cortocircuito",
    verified: true,
  },
  {
    name: "Rosa Jiménez",
    location: "Sevilla",
    rating: 5 as const,
    date: "Hace 1 semana",
    text: "Servicio impecable. Arreglaron el cuadro eléctrico que llevaba días dando problemas. Ahora funciona perfecto.",
    service: "Cuadro eléctrico",
    verified: true,
  },
  {
    name: "Francisco Gil",
    location: "Málaga",
    rating: 5 as const,
    date: "Hace 1 semana",
    text: "Muy contentos con el servicio. Rápidos, profesionales y precio justo. Sin duda volveré a llamarles.",
    service: "Instalación iluminación",
    verified: true,
  },
  {
    name: "María Torres",
    location: "Zaragoza",
    rating: 5 as const,
    date: "Hace 2 semanas",
    text: "Llamé por una emergencia eléctrica y respondieron inmediatamente. El técnico solucionó todo en poco tiempo. Muy satisfecha.",
    service: "Emergencia eléctrica",
    verified: true,
  },
]

const faqs = [
  {
    question: "¿Qué hago si se va la luz en mi casa?",
    answer:
      "Primero verifica si es un problema general del edificio o solo de tu vivienda. Si solo afecta a tu casa, no toques el cuadro eléctrico y llámanos inmediatamente. Llegamos en menos de 30 minutos para diagnosticar y solucionar el problema de forma segura.",
  },
  {
    question: "¿Son electricistas certificados?",
    answer:
      "Sí, todos nuestros electricistas están certificados y cuentan con el carnet profesional requerido. Tienen más de 10 años de experiencia y están al día con todas las normativas de seguridad eléctrica.",
  },
  {
    question: "¿Qué averías eléctricas solucionan?",
    answer:
      "Solucionamos todo tipo de problemas eléctricos: cortes de luz, diferenciales que saltan, cortocircuitos, enchufes que no funcionan, instalación de puntos de luz, cuadros eléctricos, y cualquier emergencia eléctrica.",
  },
  {
    question: "¿El servicio incluye los materiales?",
    answer:
      "El presupuesto incluye mano de obra y materiales necesarios. Te informaremos de todo antes de comenzar el trabajo. Utilizamos materiales de primeras marcas con garantía.",
  },
  {
    question: "¿Trabajan los fines de semana y festivos?",
    answer:
      "Sí, estamos disponibles 24 horas al día, 7 días a la semana, incluidos festivos. Las emergencias eléctricas no esperan y nosotros tampoco.",
  },
]

export default function ElectricistaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <UrgencyBanner />
      <ServiceHero {...serviceData} />

      <LiveActivity />

      <ServiceDetails {...serviceData} />

      <ServiceReviews service="Electricista" reviews={reviews} />

      <GuaranteeSection />

      <ServiceFAQ faqs={faqs} />

      <Footer />

      <AIChatWidget service="electricista" />
    </main>
  )
}
