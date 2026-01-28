"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface PostalCodeFAQProps {
  profession: {
    id: string
    name: string
    namePlural: string
  }
  postalcode: string
  zoneName: string
  cityName: string
}

export function PostalCodeFAQ({
  profession,
  postalcode,
  zoneName,
  cityName,
}: PostalCodeFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: `¿Cuánto cuesta un ${profession.name.toLowerCase()} en ${zoneName} (${postalcode})?`,
      answer: `El precio de un ${profession.name.toLowerCase()} en ${zoneName} depende del tipo de servicio. Los precios empiezan desde 39€ para servicios básicos. Ofrecemos presupuesto GRATIS y sin compromiso para el código postal ${postalcode}. Llámanos al 936 946 639 para un presupuesto personalizado.`,
    },
    {
      question: `¿Cuánto tarda en llegar un ${profession.name.toLowerCase()} al ${postalcode}?`,
      answer: `Nuestros ${profession.namePlural.toLowerCase()} llegan en un máximo de 10 minutos a cualquier punto del código postal ${postalcode} (${zoneName}). Tenemos profesionales distribuidos por toda la zona de ${cityName} para garantizar una respuesta ultrarrápida.`,
    },
    {
      question: `¿Hay ${profession.namePlural.toLowerCase()} 24 horas en ${zoneName}?`,
      answer: `Sí, tenemos ${profession.namePlural.toLowerCase()} disponibles las 24 horas del día, los 7 días de la semana en ${zoneName} y todo el código postal ${postalcode}. Trabajamos noches, fines de semana y festivos sin recargo adicional.`,
    },
    {
      question: `¿Los ${profession.namePlural.toLowerCase()} del ${postalcode} están certificados?`,
      answer: `Sí, todos nuestros ${profession.namePlural.toLowerCase()} que trabajan en ${zoneName} (${postalcode}) están certificados y cuentan con años de experiencia. Además, ofrecemos garantía en todos nuestros trabajos realizados en ${cityName}.`,
    },
    {
      question: `¿Cómo contactar con un ${profession.name.toLowerCase()} urgente en ${postalcode}?`,
      answer: `Para contactar con un ${profession.name.toLowerCase()} urgente en el código postal ${postalcode}, llama al 936 946 639. Estamos disponibles 24/7 y un profesional estará en tu domicilio de ${zoneName} en menos de 10 minutos.`,
    },
    {
      question: `¿Qué zonas cubren cerca del ${postalcode}?`,
      answer: `Cubrimos todo ${zoneName} y códigos postales cercanos en ${cityName}. Nuestros ${profession.namePlural.toLowerCase()} están estratégicamente ubicados para llegar rápidamente a cualquier punto de la zona. Servicio garantizado en menos de 10 minutos.`,
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Preguntas frecuentes sobre {profession.namePlural.toLowerCase()}
            <span className="text-emerald-600"> en {postalcode}</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Todo lo que necesitas saber sobre nuestro servicio en {zoneName}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden bg-background hover:border-emerald-500/50 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
              >
                <span className="font-medium text-sm sm:text-base">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
