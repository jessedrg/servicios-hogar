import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { getCityBySlug, getProfessionBySlug, getProblemBySlug } from "@/lib/seo-data"

// ISR: regenerate pages weekly
export const revalidate = 604800
export const dynamicParams = true

interface PageProps {
  params: Promise<{
    profession: string
    problem: string
    city: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: professionSlug, problem: problemSlug, city: citySlug } = await params

  const profession = getProfessionBySlug(professionSlug)
  const city = getCityBySlug(citySlug)
  const problem = getProblemBySlug(professionSlug, problemSlug)

  if (!profession || !city || !problem) {
    return { title: "Página no encontrada" }
  }

  const title = `${problem.name} en ${city.name} - ${profession.name} 24H | HOGARYA`
  const description = `${problem.name} en ${city.name} ✓ ${profession.name} especializado ✓ Servicio 24h ✓ Llegamos en 30 min ✓ ${problem.description}. Llama: 711 267 223.`

  return {
    title,
    description,
    keywords: [
      `${problem.name.toLowerCase()} ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} ${problem.slug.replace("-", " ")} ${city.name.toLowerCase()}`,
      `reparar ${problem.name.toLowerCase()} ${city.name.toLowerCase()}`,
      `solucionar ${problem.name.toLowerCase()} ${city.province.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_ES",
    },
    alternates: {
      canonical: `https://hogarya.es/problema/${professionSlug}/${problemSlug}/${citySlug}`,
    },
  }
}

export default async function ProblemCityPage({ params }: PageProps) {
  const { profession: professionSlug, problem: problemSlug, city: citySlug } = await params

  const profession = getProfessionBySlug(professionSlug)
  const city = getCityBySlug(citySlug)
  const problem = getProblemBySlug(professionSlug, problemSlug)

  if (!profession || !city || !problem) {
    notFound()
  }

  return <ServiceLandingTemplate profession={profession} city={city} problem={problem} isUrgent={true} />
}
