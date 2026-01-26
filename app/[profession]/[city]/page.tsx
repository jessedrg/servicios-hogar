import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { PROFESSIONS, getCityDisplayName, getKeywordModifier } from "@/lib/seo-data"

export const dynamicParams = true
export const revalidate = 604800

const VALID_PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

const RESERVED_PATHS = ["sitemap-files", "api", "problema", "precio", "presupuesto"]

const KNOWN_MODIFIERS = [
  // Alta urgencia (High Intent)
  "urgente", "24-horas", "ahora", "hoy", "rapido", "inmediato", "ya", "emergencia", "express", "24h",
  "urgencias", "ahora-mismo", "necesito",
  // Precio
  "economico", "barato", "low-cost", "precio", "presupuesto", "tarifa", "mejor-precio", "asequible",
  "presupuesto-gratis", "precio-justo", "cuanto-cuesta", "precios",
  // Disponibilidad
  "de-guardia", "nocturno", "festivos", "fin-de-semana", "mismo-dia", "sabados", "domingos", "madrugada",
  "abierto-hoy",
  // Ubicacion
  "cerca-de-mi", "a-domicilio", "zona", "barrio", "centro",
  // Confianza
  "profesional", "de-confianza", "con-garantia", "autorizados", "certificado", "oficial", "titulado",
  "recomendado", "mejor", "fiable",
  // Servicio
  "reparacion", "instalacion", "mantenimiento", "revision", "averias",
  // Combinaciones
  "urgente-24h", "barato-urgente", "rapido-economico", "urgente-barato", "24h-economico",
  "urgente-economico", "urgente-hoy", "rapido-barato", "profesional-barato",
  // Búsquedas naturales
  "busco", "contratar", "encontrar", "servicio",
] as const

function parseProfessionAndModifier(rawProfession: string): {
  professionId: string
  modifier?: (typeof KNOWN_MODIFIERS)[number]
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

function getModifierMeta(modifier: (typeof KNOWN_MODIFIERS)[number]) {
  const modifierText = getKeywordModifier(modifier)?.name || modifier
  const isUrgent = modifier === "urgente" || modifier === "24-horas" || modifier === "ahora" || modifier === "hoy"
  return { modifierText, isUrgent }
}

interface PageProps {
  params: Promise<{ profession: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: rawProfession, city: citySlug } = await params
  const { professionId, modifier } = parseProfessionAndModifier(rawProfession)
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.hogarya.eu").replace(/\/$/, "")

  if (!VALID_PROFESSIONS.includes(professionId)) {
    return { title: "No encontrado" }
  }

  const profession = PROFESSIONS.find((p) => p.id === professionId)
  const cityName = getCityDisplayName(citySlug)

  if (!profession) {
    return {
      title: `Servicio en ${cityName} | Rapidfix`,
      description: `Servicio profesional en ${cityName}. Llama: 711 267 223.`,
    }
  }

  if (modifier) {
    const { modifierText, isUrgent } = getModifierMeta(modifier)

    const urgencyText = isUrgent ? "Llegamos en 10 MIN. Disponible AHORA." : "Presupuesto SIN compromiso."

    const priceText =
      modifier === "economico" || modifier === "barato"
        ? "Precios desde 39€. Sin sorpresas."
        : "Precios justos y transparentes."

    return {
      title: `${profession.name} ${modifierText} en ${cityName} | 10 Min | 711 267 223`,
      description: `${profession.name} ${modifierText.toLowerCase()} en ${cityName}. ${urgencyText} ${priceText} Profesionales certificados 24/7. Llama GRATIS: 711 267 223`,
      keywords: `${profession.id} ${modifier} ${cityName}, ${profession.id} ${cityName}, ${profession.id} urgente ${cityName}, ${profession.id} barato ${cityName}, ${profession.id} 24 horas ${cityName}`,
      alternates: {
        canonical: `${siteUrl}/${rawProfession}/${citySlug}/`,
      },
      openGraph: {
        title: `${profession.name} ${modifierText} en ${cityName} - Llegamos en 10 min`,
        description: `Servicio de ${profession.name.toLowerCase()} ${modifierText.toLowerCase()} en ${cityName}. Disponibles 24/7. Llama: 711 267 223`,
        type: "website",
      },
    }
  }

  return {
    title: `${profession.name} en ${cityName} | Urgencias 24h | 711 267 223`,
    description: `${profession.name} profesional en ${cityName}. Llegamos en 10 MIN. Servicio 24h los 365 dias. Presupuesto GRATIS sin compromiso. Llama ahora: 711 267 223`,
    keywords: `${profession.id} ${cityName}, ${profession.id} urgente ${cityName}, ${profession.id} 24 horas ${cityName}, ${profession.id} economico ${cityName}, ${profession.id} barato ${cityName}`,
    alternates: {
      canonical: `${siteUrl}/${rawProfession}/${citySlug}/`,
    },
    openGraph: {
      title: `${profession.name} en ${cityName} - Servicio Urgente 24h`,
      description: `Servicio de ${profession.name.toLowerCase()} en ${cityName}. Profesionales certificados, llegamos en 10 minutos. Llama: 711 267 223`,
      type: "website",
    },
  }
}

export default async function ProfessionCityPage({ params }: PageProps) {
  const { profession: rawProfession, city: citySlug } = await params

  if (RESERVED_PATHS.includes(rawProfession)) {
    // Let the actual route handler process this
    redirect(`/${rawProfession}/${citySlug}`)
  }

  const { professionId, modifier } = parseProfessionAndModifier(rawProfession)

  if (!VALID_PROFESSIONS.includes(professionId)) {
    notFound()
  }

  const profession = PROFESSIONS.find((p) => p.id === professionId) || PROFESSIONS[0]

  const modifierMeta = modifier ? getModifierMeta(modifier) : undefined

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <ServiceLandingTemplate
          professionId={profession.id}
          citySlug={citySlug}
          modifier={modifier}
          modifierText={modifierMeta?.modifierText}
          isUrgent={modifierMeta?.isUrgent}
        />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
