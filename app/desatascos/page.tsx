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
  title: "Desatascos Urgentes 24h en Toda España | SERVICIOS HOGAR | Respuesta en 30min",
  description:
    "Desatascos urgentes 24 horas en toda España. Desatasco de tuberías, fregaderos, inodoros, bajantes. Profesionales en 30 minutos. Presupuesto gratis sin compromiso. Servicio garantizado.",
  keywords:
    "desatascos urgentes 24 horas, desatascar tuberías urgente, desatasco inodoro atascado, desatascos madrid baratos, desatascos barcelona urgente, fontanero desatascos, desatasco fregadero, desatasco bajantes, servicio desatascos cerca de mi",
  openGraph: {
    title: "Desatascos Urgentes 24h | SERVICIOS HOGAR",
    description: "Profesionales en 30 minutos. Presupuesto gratis sin compromiso.",
  },
}

const serviceData = {
  iconName: "droplets",
  title: "Desatascos Urgentes 24h",
  subtitle: "Solución inmediata para atascos de tuberías, fregaderos, inodoros y bajantes",
  description:
    "Servicio profesional de desatascos en toda España. Llegamos en menos de 30 minutos con equipos especializados para solucionar cualquier atasco.",
  features: [
    "Desatasco de tuberías y bajantes",
    "Desatasco de inodoros y fregaderos",
    "Limpieza de arquetas",
    "Inspección con cámara",
    "Desatasco con camión cuba",
    "Servicio 24 horas todos los días",
  ],
  benefits: [
    "Respuesta en menos de 30 minutos",
    "Profesionales certificados",
    "Equipos de última generación",
    "Presupuesto sin compromiso",
    "Garantía de servicio",
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
    name: "Carlos M.",
    location: "Madrid",
    rating: 5 as const,
    date: "Hace 2 días",
    text: "Increíble servicio. Llegaron en 20 minutos y solucionaron el atasco del inodoro en menos de una hora. Muy profesionales y precio justo.",
    service: "Desatasco urgente",
    verified: true,
  },
  {
    name: "Ana García",
    location: "Barcelona",
    rating: 5 as const,
    date: "Hace 5 días",
    text: "Tuve un atasco grave en la cocina un domingo por la noche. Vinieron rapidísimo y lo arreglaron todo. 100% recomendable.",
    service: "Desatasco fregadero",
    verified: true,
  },
  {
    name: "Miguel Ruiz",
    location: "Valencia",
    rating: 5 as const,
    date: "Hace 1 semana",
    text: "Excelente atención. El técnico explicó todo el proceso y dejó todo limpio. Muy satisfecho con el resultado.",
    service: "Desatasco bajantes",
    verified: true,
  },
  {
    name: "Laura Sánchez",
    location: "Sevilla",
    rating: 5 as const,
    date: "Hace 1 semana",
    text: "Servicio rápido y eficaz. Solucionaron el problema de las tuberías en tiempo récord. Volveré a llamarles sin duda.",
    service: "Desatasco tuberías",
    verified: true,
  },
  {
    name: "Javier López",
    location: "Málaga",
    rating: 5 as const,
    date: "Hace 2 semanas",
    text: "Muy profesionales. Llegaron cuando dijeron y el precio fue exactamente el presupuestado. Sin sorpresas.",
    service: "Limpieza arquetas",
    verified: true,
  },
  {
    name: "Isabel Martín",
    location: "Zaragoza",
    rating: 5 as const,
    date: "Hace 2 semanas",
    text: "Trato excelente y trabajo impecable. Resolvieron un atasco complicado con mucha profesionalidad.",
    service: "Desatasco urgente",
    verified: true,
  },
]

const faqs = [
  {
    question: "¿Cuánto tiempo tardan en llegar?",
    answer:
      "Nuestro compromiso es llegar en menos de 30 minutos en zonas urbanas. En zonas más alejadas, te informaremos del tiempo estimado al solicitar el servicio. Trabajamos 24/7 todos los días del año.",
  },
  {
    question: "¿El presupuesto es realmente gratis?",
    answer:
      "Sí, totalmente gratis y sin compromiso. Nuestro técnico evaluará el problema y te dará un presupuesto cerrado antes de comenzar. Solo pagas si decides aceptar el servicio.",
  },
  {
    question: "¿Qué tipos de atascos solucionan?",
    answer:
      "Solucionamos todo tipo de atascos: inodoros, fregaderos, duchas, bañeras, bajantes, arquetas y tuberías principales. Contamos con equipos especializados incluyendo cámaras de inspección y camiones cuba.",
  },
  {
    question: "¿Tienen garantía los trabajos?",
    answer:
      "Sí, todos nuestros servicios tienen garantía de satisfacción. Si el problema persiste, volvemos sin coste adicional. Nuestros técnicos están certificados y utilizamos equipos profesionales.",
  },
  {
    question: "¿Trabajan en toda España?",
    answer:
      "Sí, tenemos cobertura en todas las provincias de España. Contamos con una red de profesionales certificados en las principales ciudades y también damos servicio en zonas rurales.",
  },
]

export default function DesatascosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <UrgencyBanner />
      <ServiceHero {...serviceData} />

      <LiveActivity />

      <ServiceDetails {...serviceData} />

      <ServiceReviews service="Desatascos" reviews={reviews} />

      <GuaranteeSection />

      <ServiceFAQ faqs={faqs} />

      <Footer />

      <AIChatWidget service="desatasco" />
    </main>
  )
}
