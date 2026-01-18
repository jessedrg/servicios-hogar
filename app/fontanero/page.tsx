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
  title: "Fontanero Urgente 24h | HOGARYA | Servicio en 30 Minutos",
  description:
    "Fontanero urgente en toda España. Profesionales en 30 minutos. Fugas de agua, grifos, calderas, tuberías. Servicio 24/7. Presupuesto gratis.",
  keywords:
    "fontanero urgente, fontanero 24 horas, fuga de agua, reparación grifos, fontanero Madrid, fontanero Barcelona",
  openGraph: {
    title: "Fontanero Urgente 24h | HOGARYA",
    description: "Profesionales en 30 minutos. Presupuesto gratis sin compromiso.",
  },
}

const serviceData = {
  iconName: "wrench",
  title: "Fontanero Urgente 24h",
  subtitle: "Solución inmediata para fugas, grifos, calderas y problemas de fontanería",
  description:
    "Fontaneros profesionales en toda España. Llegamos en menos de 30 minutos para solucionar fugas, averías y cualquier problema de fontanería.",
  features: [
    "Reparación de fugas de agua",
    "Grifos y cisternas",
    "Calderas y calentadores",
    "Tuberías y desagües",
    "Instalación de sanitarios",
    "Servicio 24 horas todos los días",
  ],
  benefits: [
    "Respuesta en menos de 30 minutos",
    "Fontaneros certificados",
    "Reparaciones garantizadas",
    "Presupuesto sin compromiso",
    "Materiales de primera calidad",
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
    name: "Luis Moreno",
    location: "Madrid",
    rating: 5 as const,
    date: "Hace 1 día",
    text: "Fuga de agua en plena madrugada. Llegaron en 20 minutos y pararon la fuga inmediatamente. Salvaron mi casa de una inundación. Increíbles.",
    service: "Fuga urgente",
    verified: true,
  },
  {
    name: "Elena Castro",
    location: "Barcelona",
    rating: 5 as const,
    date: "Hace 3 días",
    text: "Muy profesionales. Arreglaron el grifo de la cocina que llevaba semanas goteando. Trabajo rápido y limpio.",
    service: "Reparación grifo",
    verified: true,
  },
  {
    name: "Roberto Vega",
    location: "Valencia",
    rating: 5 as const,
    date: "Hace 5 días",
    text: "La caldera dejó de funcionar en invierno. Vinieron el mismo día y la repararon. Excelente servicio y atención.",
    service: "Reparación caldera",
    verified: true,
  },
  {
    name: "Patricia Ramos",
    location: "Sevilla",
    rating: 5 as const,
    date: "Hace 1 semana",
    text: "Necesitaba cambiar la cisterna del baño. Hicieron un trabajo perfecto y dejaron todo impecable. Muy recomendable.",
    service: "Cambio cisterna",
    verified: true,
  },
  {
    name: "Manuel Ortiz",
    location: "Málaga",
    rating: 5 as const,
    date: "Hace 1 semana",
    text: "Servicio de 10. Solucionaron un problema de tuberías que otros fontaneros no pudieron. Muy profesionales.",
    service: "Reparación tuberías",
    verified: true,
  },
  {
    name: "Cristina Navarro",
    location: "Zaragoza",
    rating: 5 as const,
    date: "Hace 2 semanas",
    text: "Rapidísimos y eficaces. Arreglaron una fuga complicada en poco tiempo. Precio justo y trabajo garantizado.",
    service: "Fuga de agua",
    verified: true,
  },
]

const faqs = [
  {
    question: "¿Qué hago si tengo una fuga de agua?",
    answer:
      "Cierra la llave de paso general inmediatamente para evitar daños mayores. Luego llámanos y llegaremos en menos de 30 minutos para localizar y reparar la fuga. Es importante actuar rápido para evitar inundaciones.",
  },
  {
    question: "¿Reparan calderas de todas las marcas?",
    answer:
      "Sí, nuestros fontaneros están capacitados para reparar calderas y calentadores de todas las marcas: Vaillant, Junkers, Saunier Duval, Baxi, Roca, etc. Llevamos repuestos originales en nuestras furgonetas.",
  },
  {
    question: "¿Cuánto tarda una reparación de fontanería?",
    answer:
      "Depende del problema, pero la mayoría de reparaciones (grifos, cisternas, pequeñas fugas) se solucionan en 1-2 horas. Para trabajos más complejos, te informaremos del tiempo estimado tras la evaluación inicial.",
  },
  {
    question: "¿Qué incluye el presupuesto gratuito?",
    answer:
      "El fontanero evaluará el problema sin coste y te dará un presupuesto cerrado que incluye mano de obra, materiales y desplazamiento. Solo pagas si aceptas realizar el trabajo.",
  },
  {
    question: "¿Tienen garantía las reparaciones?",
    answer:
      "Sí, todas nuestras reparaciones tienen garantía. Si el problema persiste, volvemos sin coste adicional. Utilizamos materiales de calidad con garantía del fabricante.",
  },
]

export default function FontaneroPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <UrgencyBanner />
      <ServiceHero {...serviceData} />

      <div className="container mx-auto px-4 py-8">
        <LiveActivity />
      </div>

      <ServiceDetails {...serviceData} />

      <ServiceReviews service="Fontanero" reviews={reviews} />

      <GuaranteeSection />

      <ServiceFAQ faqs={faqs} />

      <Footer />

      <AIChatWidget service="fontanero" />
    </main>
  )
}
