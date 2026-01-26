"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { PROFESSIONS } from "@/lib/seo-data"

interface FAQSectionProps {
  profession: (typeof PROFESSIONS)[0]
  cityName: string
  modifier?: string
}

export function FAQSection({ profession, cityName, modifier }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = generateVisualFAQs(profession, cityName, modifier)

  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas frecuentes</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Todo sobre {profession.namePlural.toLowerCase()} en {cityName}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-background overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function generateVisualFAQs(
  profession: (typeof PROFESSIONS)[0],
  cityName: string,
  modifier?: string
): { question: string; answer: string }[] {
  const baseFAQs = [
    {
      question: `¿Cuánto cuesta un ${profession.name.toLowerCase()} en ${cityName}?`,
      answer: `El precio de un ${profession.name.toLowerCase()} en ${cityName} varía según el servicio. Los precios comienzan desde 39€ para trabajos básicos. Ofrecemos presupuesto GRATIS y sin compromiso. Llámanos al 711 267 223 para conocer el precio exacto de tu caso.`,
    },
    {
      question: `¿Cuánto tarda en llegar un ${profession.name.toLowerCase()} a mi casa en ${cityName}?`,
      answer: `Nuestros ${profession.namePlural.toLowerCase()} llegan en un máximo de 10 minutos a cualquier punto de ${cityName}. Tenemos profesionales distribuidos estratégicamente por toda la zona para garantizar la respuesta más rápida del mercado.`,
    },
    {
      question: `¿Trabajan ${profession.namePlural.toLowerCase()} en ${cityName} los fines de semana y festivos?`,
      answer: `Sí, nuestro servicio de ${profession.namePlural.toLowerCase()} en ${cityName} está disponible las 24 horas del día, los 365 días del año. Trabajamos noches, fines de semana y festivos sin ningún recargo adicional.`,
    },
    {
      question: `¿Los ${profession.namePlural.toLowerCase()} están certificados y tienen garantía?`,
      answer: `Absolutamente. Todos nuestros ${profession.namePlural.toLowerCase()} en ${cityName} están certificados, con años de experiencia y formación continua. Además, ofrecemos garantía por escrito en todos nuestros trabajos para tu total tranquilidad.`,
    },
    {
      question: `¿Cómo puedo contactar con un ${profession.name.toLowerCase()} urgente en ${cityName}?`,
      answer: `Para contactar con un ${profession.name.toLowerCase()} urgente en ${cityName}, simplemente llama al 711 267 223. Atendemos tu llamada al instante y en menos de 10 minutos tendrás un profesional en tu domicilio.`,
    },
  ]

  // FAQs específicas según el modificador
  if (modifier === "economico" || modifier === "barato") {
    baseFAQs.unshift({
      question: `¿Dónde encontrar el ${profession.name.toLowerCase()} más barato en ${cityName}?`,
      answer: `En HogarYa ofrecemos los precios más competitivos de ${profession.namePlural.toLowerCase()} en ${cityName}. Nuestras tarifas son hasta un 20% más económicas que la competencia, sin sacrificar calidad. Pide tu presupuesto gratis llamando al 711 267 223.`,
    })
  }

  if (modifier === "urgente" || modifier === "24-horas" || modifier === "ahora") {
    baseFAQs.unshift({
      question: `¿Qué hago si tengo una emergencia de ${profession.name.toLowerCase()} en ${cityName}?`,
      answer: `En caso de emergencia, llama inmediatamente al 711 267 223. Nuestro servicio de ${profession.name.toLowerCase()} urgente en ${cityName} está operativo 24/7 y garantizamos llegada en 10 minutos para resolver cualquier emergencia.`,
    })
  }

  if (modifier === "nocturno" || modifier === "de-guardia") {
    baseFAQs.unshift({
      question: `¿Hay ${profession.namePlural.toLowerCase()} de guardia por la noche en ${cityName}?`,
      answer: `Sí, tenemos ${profession.namePlural.toLowerCase()} de guardia toda la noche en ${cityName}. Nuestro servicio nocturno funciona de 22:00 a 08:00 sin ningún recargo extra. Llama al 711 267 223 a cualquier hora.`,
    })
  }

  return baseFAQs.slice(0, 6) // Máximo 6 FAQs
}

export default FAQSection
