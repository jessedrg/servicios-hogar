import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { PostalCodeHero } from "@/components/postal-code-hero"
import { PostalCodeStats } from "@/components/postal-code-stats"
import { PostalCodeFAQ } from "@/components/postal-code-faq"
import { PostalCodeSchema } from "@/components/postal-code-schema"
import { GuaranteeSection } from "@/components/guarantee-section"
import { ServiceReviews } from "@/components/service-reviews"
import {
  getPostalCodeData,
  getZoneName,
  getCityFromPostalCode,
  getZoneDescription,
  getTopPostalCodes,
  PROFESSIONS_POSTAL,
} from "@/lib/postal-data"

const VALID_PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

export const dynamicParams = true
export const revalidate = 604800 // 1 semana

// Pre-renderizar las ciudades más importantes
export async function generateStaticParams() {
  const topPostalCodes = getTopPostalCodes()
  const params: { profession: string; postalcode: string }[] = []

  for (const profession of VALID_PROFESSIONS) {
    for (const cp of topPostalCodes) {
      params.push({ profession, postalcode: cp })
    }
  }

  return params
}

interface PageProps {
  params: Promise<{ profession: string; postalcode: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession, postalcode } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.servicioshogar.xyz"

  if (!VALID_PROFESSIONS.includes(profession)) {
    return { title: "No encontrado" }
  }

  const professionData = PROFESSIONS_POSTAL.find((p) => p.id === profession)
  const postalData = getPostalCodeData(postalcode)
  const zoneName = getZoneName(postalcode)
  const cityName = getCityFromPostalCode(postalcode)

  if (!professionData) {
    return { title: "No encontrado" }
  }

  const title = `${professionData.name} Urgente en ${zoneName} (${postalcode}) | 10 Min | 936 946 639`
  const description = `${professionData.name} urgente en ${zoneName}, ${cityName}. Código postal ${postalcode}. Llegamos en 10 MINUTOS. Servicio 24h. Presupuesto GRATIS. Llama: 936 946 639`

  return {
    title,
    description,
    keywords: `${profession} ${postalcode}, ${profession} urgente ${zoneName}, ${profession} 24 horas ${cityName}, ${profession} cerca de mi ${postalcode}`,
    alternates: {
      canonical: `${siteUrl}/${profession}/cp/${postalcode}/`,
    },
    openGraph: {
      title: `${professionData.name} en ${zoneName} (${postalcode}) - Llegamos en 10 min`,
      description: `Servicio de ${professionData.name.toLowerCase()} urgente en código postal ${postalcode}. Disponibles 24/7. Llama: 936 946 639`,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// Reviews dinámicas por zona
function generateReviews(profession: string, zoneName: string, postalcode: string) {
  const seed = parseInt(postalcode.slice(-3))
  const names = [
    "María García", "Carlos Pérez", "Ana Martínez", "José López", "Laura Sánchez",
    "Miguel Fernández", "Carmen Ruiz", "David González", "Isabel Torres", "Pablo Díaz"
  ]
  const services: Record<string, string[]> = {
    fontanero: ["Fuga de agua", "Atasco tubería", "Reparación cisterna", "Cambio grifería"],
    electricista: ["Avería eléctrica", "Cuadro eléctrico", "Sin luz", "Cortocircuito"],
    cerrajero: ["Apertura puerta", "Cambio cerradura", "Cerradura atascada", "Bombín roto"],
    desatascos: ["Atasco WC", "Desatasco fregadero", "Arqueta atascada", "Limpieza tuberías"],
    calderas: ["Caldera no enciende", "Sin agua caliente", "Revisión caldera", "Fuga caldera"],
  }

  const profServices = services[profession] || services.fontanero

  return [
    {
      name: names[seed % names.length],
      location: zoneName,
      rating: 5 as const,
      date: "Hace 1 día",
      text: `Excelente servicio en ${zoneName}. Llegaron en menos de 10 minutos y solucionaron el problema rápidamente. Muy profesionales y precio justo.`,
      service: profServices[seed % profServices.length],
      verified: true,
    },
    {
      name: names[(seed + 3) % names.length],
      location: zoneName,
      rating: 5 as const,
      date: "Hace 3 días",
      text: `Llamé a las 11 de la noche y vinieron enseguida. El técnico era muy profesional y explicó todo claramente. 100% recomendado para ${zoneName}.`,
      service: profServices[(seed + 1) % profServices.length],
      verified: true,
    },
    {
      name: names[(seed + 5) % names.length],
      location: zoneName,
      rating: 5 as const,
      date: "Hace 1 semana",
      text: `Servicio impecable. Presupuesto sin sorpresas y trabajo de calidad. Ya los he recomendado a mis vecinos del ${postalcode}.`,
      service: profServices[(seed + 2) % profServices.length],
      verified: true,
    },
  ]
}

export default async function PostalCodePage({ params }: PageProps) {
  const { profession, postalcode } = await params

  // Validar profesión
  if (!VALID_PROFESSIONS.includes(profession)) {
    notFound()
  }

  // Validar formato código postal (5 dígitos)
  if (!/^\d{5}$/.test(postalcode)) {
    notFound()
  }

  const professionData = PROFESSIONS_POSTAL.find((p) => p.id === profession)
  if (!professionData) {
    notFound()
  }

  const postalData = getPostalCodeData(postalcode)
  const zoneName = getZoneName(postalcode)
  const cityName = getCityFromPostalCode(postalcode)
  const description = getZoneDescription(postalcode, profession)
  const reviews = generateReviews(profession, zoneName, postalcode)

  return (
    <>
      <PostalCodeSchema
        profession={professionData}
        postalcode={postalcode}
        zoneName={zoneName}
        cityName={cityName}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <UrgencyBanner />
        <Header />
        <main className="flex-1">
          <PostalCodeHero
            profession={professionData}
            postalcode={postalcode}
            zoneName={zoneName}
            cityName={cityName}
            description={description}
          />
          
          <PostalCodeStats postalcode={postalcode} />
          
          <ServiceReviews 
            service={professionData.name} 
            reviews={reviews} 
          />
          
          <GuaranteeSection />
          
          <PostalCodeFAQ
            profession={professionData}
            postalcode={postalcode}
            zoneName={zoneName}
            cityName={cityName}
          />
        </main>
        <Footer />
        <AIChatWidget service={profession} />
      </div>
    </>
  )
}
