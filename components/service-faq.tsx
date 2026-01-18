"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQ {
  question: string
  answer: string
}

interface ServiceFAQProps {
  faqs: FAQ[]
}

export function ServiceFAQ({ faqs }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 mb-4">
            <HelpCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Preguntas frecuentes</h2>
          <p className="text-muted-foreground text-lg">Todo lo que necesitas saber sobre nuestro servicio</p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                openIndex === index
                  ? "bg-emerald-500/5 border-emerald-500/30"
                  : "bg-foreground/[0.02] border-border/50 hover:border-border",
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span
                  className={cn(
                    "font-semibold text-lg pr-4 transition-colors",
                    openIndex === index ? "text-emerald-500" : "text-foreground",
                  )}
                >
                  {faq.question}
                </span>
                <div
                  className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    openIndex === index
                      ? "bg-emerald-500 text-foreground rotate-180"
                      : "bg-foreground/5 text-foreground/60",
                  )}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="px-6 pb-6 text-foreground/70 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ServiceFAQ as ServiceFaq }
