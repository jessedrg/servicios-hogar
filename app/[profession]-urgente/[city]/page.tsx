import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { getCityBySlug, getProfessionBySlug } from "@/lib/seo-data"

// ISR: regenerate pages weekly
export const revalidate = 604800
export const dynamicParams = true

interface PageProps {
  params: Promise<{
    "profession-urgente": string
    city: string
  }>
}

function extractProfessionSlug(professionUrgente: string): string {
  // Remove "-urgente" suffix to get the profession slug
  return professionUrgente.replace("-urgente", "")
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const professionSlug = extractProfessionSlug(resolvedParams["profession-urgente"] || "")
  const citySlug = resolvedParams.city

  const profession = getProfessionBySlug(professionSlug)
  const city = getCityBySlug(citySlug)

  if (!profession || !city) {
    return { title: "Página no encontrada" }
  }

  const title = `${profession.name} URGENTE en ${city.name} 【24H】 - Emergencias | HOGARYA`
  const description = `${profession.name} de URGENCIA en ${city.name} ⚡ Llegamos en 30 min ⚡ Servicio de emergencia 24/7 ⚡ Sin esperas. Llama ahora al 711 267 223.`

  return {
    title,
    description,
    keywords: [
      `${profession.name.toLowerCase()} urgente ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} emergencia ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} 24 horas ${city.name.toLowerCase()}`,
      `urgencias ${profession.name.toLowerCase()} ${city.province.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_ES",
    },
    alternates: {
      canonical: `https://hogarya.es/${professionSlug}-urgente/${citySlug}`,
    },
  }
}

export default async function UrgentProfessionCityPage({ params }: PageProps) {
  const resolvedParams = await params
  const professionSlug = extractProfessionSlug(resolvedParams["profession-urgente"] || "")
  const citySlug = resolvedParams.city

  const profession = getProfessionBySlug(professionSlug)
  const city = getCityBySlug(citySlug)

  if (!profession || !city) {
    notFound()
  }

  return <ServiceLandingTemplate profession={profession} city={city} isUrgent={true} />
}
