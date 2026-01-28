import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, Clock, CheckCircle2, ArrowRight, HelpCircle } from "lucide-react"
import { PAA_QUESTIONS, TOP_CITIES_PAA, generatePAAAnswer, generatePAACombinations } from "@/lib/paa-questions"

export const dynamicParams = true
export const revalidate = 604800

// Prerender todas las combinaciones PAA
export async function generateStaticParams() {
  return generatePAACombinations()
}

interface PageProps {
  params: Promise<{ slug: string }>
}

function parseSlug(slug: string): { question: typeof PAA_QUESTIONS[0] | undefined; city?: typeof TOP_CITIES_PAA[0] } {
  // Buscar si termina con una ciudad
  for (const city of TOP_CITIES_PAA) {
    if (slug.endsWith(`-${city.slug}`)) {
      const questionSlug = slug.replace(`-${city.slug}`, "")
      const question = PAA_QUESTIONS.find(q => q.slug === questionSlug)
      return { question, city }
    }
  }
  
  // Sin ciudad
  const question = PAA_QUESTIONS.find(q => q.slug === slug)
  return { question }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { question, city } = parseSlug(slug)
  
  if (!question) {
    return { title: "Pregunta no encontrada" }
  }

  const cityText = city ? ` en ${city.name}` : ""
  const fullQuestion = question.citySpecific && city 
    ? question.question.replace("?", `${cityText}?`)
    : question.question

  return {
    title: `${fullQuestion} | Servicios Hogar`,
    description: `Respuesta profesional: ${fullQuestion} Descubre precios, tiempos y consejos de expertos. Servicio 24h. Llama: 936 946 639`,
    alternates: {
      canonical: `https://www.servicioshogar.xyz/preguntas/${slug}/`,
    },
    openGraph: {
      title: fullQuestion,
      description: `Respuesta de expertos a: ${fullQuestion}`,
      type: "article",
    },
  }
}

export default async function PAAPage({ params }: PageProps) {
  const { slug } = await params
  const { question, city } = parseSlug(slug)

  if (!question) {
    notFound()
  }

  const cityText = city ? ` en ${city.name}` : ""
  const fullQuestion = question.citySpecific && city 
    ? question.question.replace("?", `${cityText}?`)
    : question.question
  
  const answer = generatePAAAnswer(question, city?.name)

  // Preguntas relacionadas
  const relatedQuestions = PAA_QUESTIONS
    .filter(q => q.profession === question.profession && q.slug !== question.slug)
    .slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="py-12 bg-gradient-to-b from-[#FF6B35]/5 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-[#FF6B35] text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>Pregunta frecuente</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-6">
              {fullQuestion}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Respuesta verificada
              </span>
              <span>•</span>
              <span>Actualizado 2024</span>
            </div>
          </div>
        </section>

        {/* Respuesta principal */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="prose prose-lg max-w-none">
              <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6B35]" />
                  Respuesta rápida
                </h2>
                <p className="text-foreground leading-relaxed text-lg">
                  {answer}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 bg-[#FF6B35] rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">¿Necesitas un {question.professionName.toLowerCase()}?</h3>
              <p className="opacity-90 mb-6">Llegamos en 10 minutos. Presupuesto gratis.</p>
              <a
                href="tel:+34936946639"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#FF6B35] font-bold text-lg rounded-xl hover:bg-gray-100 transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>936 946 639</span>
              </a>
              <p className="mt-4 text-sm opacity-80 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Servicio 24h - 7 días - Festivos incluidos
              </p>
            </div>
          </div>
        </section>

        {/* Preguntas relacionadas */}
        {relatedQuestions.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Preguntas relacionadas
              </h2>
              <div className="grid gap-3">
                {relatedQuestions.map((q) => {
                  const qCity = city && q.citySpecific ? `-${city.slug}` : ""
                  return (
                    <Link
                      key={q.slug}
                      href={`/preguntas/${q.slug}${qCity}/`}
                      className="flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:border-[#FF6B35]/50 transition-all group"
                    >
                      <span className="font-medium text-foreground group-hover:text-[#FF6B35]">
                        {q.citySpecific && city ? q.question.replace("?", ` en ${city.name}?`) : q.question}
                      </span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-[#FF6B35]" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Otras ciudades */}
        {question.citySpecific && (
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Esta pregunta en otras ciudades
              </h2>
              <div className="flex flex-wrap gap-2">
                {TOP_CITIES_PAA.filter(c => c.slug !== city?.slug).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/preguntas/${question.slug}-${c.slug}/`}
                    className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-foreground hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] transition-all"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
