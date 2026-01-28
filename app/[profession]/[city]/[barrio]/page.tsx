import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { PROFESSIONS, getKeywordModifier } from "@/lib/seo-data"
import { SEOSchema } from "@/components/seo-schema"
import { getBarrio, generateBarrioCombinations } from "@/lib/barrios-data"

export const dynamicParams = true
export const revalidate = 604800

const VALID_PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

const KNOWN_MODIFIERS = [
  "urgente", "24-horas", "ahora", "hoy", "rapido", "inmediato",
  "economico", "barato", "cerca-de-mi", "de-guardia", "nocturno",
] as const

// Prerender top barrios
export async function generateStaticParams() {
  return generateBarrioCombinations().slice(0, 500) // Top 500 combinaciones
}

function parseProfessionAndModifier(rawProfession: string): {
  professionId: string
  modifier?: string
} {
  if (VALID_PROFESSIONS.includes(rawProfession)) {
    return { professionId: rawProfession }
  }

  for (const mod of KNOWN_MODIFIERS) {
    const suffix = `-${mod}`
    if (rawProfession.endsWith(suffix)) {
      const professionId = rawProfession.slice(0, -suffix.length)
      if (VALID_PROFESSIONS.includes(professionId)) {
        return { professionId, modifier: mod }
      }
    }
  }

  return { professionId: rawProfession }
}

interface PageProps {
  params: Promise<{ profession: string; city: string; barrio: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: rawProfession, city: citySlug, barrio: barrioSlug } = await params
  const { professionId, modifier } = parseProfessionAndModifier(rawProfession)
  const siteUrl = "https://www.servicioshogar.xyz"

  const barrio = getBarrio(citySlug, barrioSlug)
  if (!barrio) {
    return { title: "No encontrado" }
  }

  const profession = PROFESSIONS.find((p) => p.id === professionId)
  if (!profession) {
    return { title: "No encontrado" }
  }

  const modifierText = modifier ? getKeywordModifier(modifier)?.name || modifier : ""
  const fullLocation = `${barrio.name}, ${barrio.cityName}`

  return {
    title: `${profession.name} ${modifierText} en ${barrio.name} (${barrio.cityName}) | 10 Min | 936 946 639`,
    description: `${profession.name} ${modifierText.toLowerCase()} en ${fullLocation}. Llegamos en 10 MIN. Servicio 24h. Profesionales del barrio. Presupuesto GRATIS. Llama: 936 946 639`,
    keywords: `${profession.id} ${barrio.name}, ${profession.id} ${modifierText} ${barrio.name}, ${profession.id} urgente ${barrio.name} ${barrio.cityName}`,
    alternates: {
      canonical: `${siteUrl}/${rawProfession}/${citySlug}/${barrioSlug}/`,
    },
    openGraph: {
      title: `${profession.name} ${modifierText} en ${barrio.name} - Llegamos en 10 min`,
      description: `Servicio de ${profession.name.toLowerCase()} en ${fullLocation}. Profesionales locales 24/7.`,
      type: "website",
    },
  }
}

export default async function BarrioPage({ params }: PageProps) {
  const { profession: rawProfession, city: citySlug, barrio: barrioSlug } = await params
  const { professionId, modifier } = parseProfessionAndModifier(rawProfession)

  const barrio = getBarrio(citySlug, barrioSlug)
  if (!barrio) {
    notFound()
  }

  if (!VALID_PROFESSIONS.includes(professionId)) {
    notFound()
  }

  const profession = PROFESSIONS.find((p) => p.id === professionId) || PROFESSIONS[0]
  const modifierText = modifier ? getKeywordModifier(modifier)?.name || modifier : undefined
  const isUrgent = modifier === "urgente" || modifier === "24-horas"
  const fullLocation = `${barrio.name}, ${barrio.cityName}`

  return (
    <>
      <SEOSchema
        profession={profession}
        cityName={fullLocation}
        citySlug={`${citySlug}/${barrioSlug}`}
        modifier={modifier}
        modifierText={modifierText}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <UrgencyBanner />
        <Header />
        <main className="flex-1">
          <ServiceLandingTemplate
            professionId={profession.id}
            city={{ slug: barrioSlug, name: barrio.name, province: barrio.cityName }}
            modifier={modifier}
            modifierText={modifierText}
            isUrgent={isUrgent}
          />
        </main>
        <Footer />
        <AIChatWidget />
      </div>
    </>
  )
}
