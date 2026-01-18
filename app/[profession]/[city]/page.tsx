import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { getCityBySlug, getProfessionBySlug } from "@/lib/seo-data"

// ISR: regenerate pages weekly
export const revalidate = 604800
export const dynamicParams = true

interface PageProps {
  params: Promise<{
    profession: string
    city: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: professionSlug, city: citySlug } = await params

  const profession = getProfessionBySlug(professionSlug)
  const city = getCityBySlug(citySlug)

  if (!profession || !city) {
    return { title: "Página no encontrada" }
  }

  const title = `${profession.namePlural} en ${city.name} 【24H】 - Urgencias ${city.province} | HOGARYA`
  const description = `${profession.name} en ${city.name} ✓ Servicio 24 horas ✓ Llegamos en 30 min ✓ Profesionales verificados ✓ Presupuesto gratis. Llama ahora al 711 267 223.`

  return {
    title,
    description,
    keywords: [
      `${profession.name.toLowerCase()} ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} urgente ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} 24 horas ${city.name.toLowerCase()}`,
      `${profession.namePlural.toLowerCase()} ${city.province.toLowerCase()}`,
      `servicio ${profession.name.toLowerCase()} ${city.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_ES",
    },
    alternates: {
      canonical: `https://hogarya.es/${professionSlug}/${citySlug}`,
    },
  }
}

export default async function ProfessionCityPage({ params }: PageProps) {
  const { profession: professionSlug, city: citySlug } = await params

  const profession = getProfessionBySlug(professionSlug)
  const city = getCityBySlug(citySlug)

  if (!profession || !city) {
    notFound()
  }

  return <ServiceLandingTemplate profession={profession} city={city} />
}
