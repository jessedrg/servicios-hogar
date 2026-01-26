import Link from "next/link"
import { ArrowRight, MapPin, Zap } from "lucide-react"
import { getCityDisplayName, getNearbyCities } from "@/lib/seo-data"

interface InternalLinksProps {
  professionId: string
  professionName: string
  citySlug: string
  cityName: string
  currentModifier?: string
}

// Modificadores más buscados para internal linking
const TOP_MODIFIERS = [
  { slug: "urgente", label: "Urgente", icon: "🚨" },
  { slug: "24-horas", label: "24 Horas", icon: "🕐" },
  { slug: "economico", label: "Económico", icon: "💰" },
  { slug: "barato", label: "Barato", icon: "🏷️" },
  { slug: "cerca-de-mi", label: "Cerca de mí", icon: "📍" },
  { slug: "de-guardia", label: "De guardia", icon: "🔔" },
  { slug: "nocturno", label: "Nocturno", icon: "🌙" },
  { slug: "profesional", label: "Profesional", icon: "👨‍🔧" },
]

export function InternalLinks({
  professionId,
  professionName,
  citySlug,
  cityName,
  currentModifier,
}: InternalLinksProps) {
  const nearbyCities = getNearbyCities(citySlug).slice(0, 6)
  
  // Filtrar el modificador actual de la lista
  const availableModifiers = TOP_MODIFIERS.filter(m => m.slug !== currentModifier)

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Enlaces a modificadores */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[#FF6B35]" />
            <h3 className="text-lg font-bold text-foreground">
              Más servicios de {professionName.toLowerCase()} en {cityName}
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Link a página base si estamos en modificador */}
            {currentModifier && (
              <Link
                href={`/${professionId}/${citySlug}/`}
                className="group flex items-center gap-2 p-3 rounded-xl border border-border bg-background hover:border-[#FF6B35]/50 hover:bg-[#FF6B35]/5 transition-all"
              >
                <span className="text-lg">🏠</span>
                <span className="text-sm font-medium text-foreground group-hover:text-[#FF6B35]">
                  {professionName} General
                </span>
              </Link>
            )}
            {availableModifiers.slice(0, currentModifier ? 7 : 8).map((mod) => (
              <Link
                key={mod.slug}
                href={`/${professionId}-${mod.slug}/${citySlug}/`}
                className="group flex items-center gap-2 p-3 rounded-xl border border-border bg-background hover:border-[#FF6B35]/50 hover:bg-[#FF6B35]/5 transition-all"
              >
                <span className="text-lg">{mod.icon}</span>
                <span className="text-sm font-medium text-foreground group-hover:text-[#FF6B35]">
                  {mod.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Enlaces a ciudades cercanas */}
        {nearbyCities.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#FF6B35]" />
              <h3 className="text-lg font-bold text-foreground">
                {professionName} en ciudades cercanas
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {nearbyCities.map((city) => (
                <Link
                  key={city}
                  href={currentModifier 
                    ? `/${professionId}-${currentModifier}/${city}/`
                    : `/${professionId}/${city}/`
                  }
                  className="group flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:border-[#FF6B35]/50 hover:bg-[#FF6B35]/5 transition-all"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-[#FF6B35] truncate">
                    {getCityDisplayName(city)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#FF6B35] shrink-0 ml-1" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Enlaces a otras profesiones en la misma ciudad */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🔧</span>
            <h3 className="text-lg font-bold text-foreground">
              Otros servicios en {cityName}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]
              .filter(p => p !== professionId)
              .map((prof) => (
                <Link
                  key={prof}
                  href={`/${prof}/${citySlug}/`}
                  className="px-4 py-2 rounded-full border border-border bg-background text-sm font-medium text-foreground hover:border-[#FF6B35]/50 hover:text-[#FF6B35] transition-all capitalize"
                >
                  {prof === "desatascos" ? "Desatascos" : prof.charAt(0).toUpperCase() + prof.slice(1)}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InternalLinks
