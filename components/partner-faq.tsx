"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"

export function PartnerFAQ() {
  const faqs = [
    {
      question: "¿Cómo funciona el sistema?",
      answer:
        "Al registrarte, te unimos al grupo de Telegram de tu especialidad (fontaneros, electricistas, cerrajeros, etc.). Cuando llega un cliente urgente, recibes una notificación con los detalles del trabajo. Si te interesa, compras el lead y recibes el teléfono del cliente al instante.",
    },
    {
      question: "¿Cobráis comisión sobre mis servicios?",
      answer:
        "No, absolutamente no. Solo pagas por el lead (la información del cliente). El dinero del servicio lo manejas tú directamente con el cliente. Es 100% tuyo.",
    },
    {
      question: "¿Cuánto cuesta cada lead?",
      answer:
        "El precio varía según el tipo de trabajo y urgencia, normalmente entre 30€ y 60€. Cada lead es exclusivo: solo tú recibes ese cliente. Si el cliente no responde, te devolvemos el dinero.",
    },
    {
      question: "¿Qué información incluye cada lead?",
      answer:
        "Antes de comprar ves: tipo de servicio, descripción del problema y ciudad. Al comprar el lead, se revela el teléfono completo y puedes llamar o escribir por WhatsApp al instante.",
    },
    {
      question: "¿Puedo rechazar leads?",
      answer:
        "Sí, solo compras los leads que te interesan. No hay obligación de comprar nada. Tú decides qué trabajos quieres según tu disponibilidad y zona.",
    },
    {
      question: "¿Qué zonas cubrís actualmente?",
      answer: "Actualmente operamos en Barcelona y área metropolitana. Estamos expandiendo a más ciudades pronto.",
    },
    {
      question: "¿Qué pasa si el cliente no responde?",
      answer:
        "Si el cliente no responde o el lead tiene información incorrecta, contacta con nosotros por Telegram y te devolvemos el dinero. Garantía de satisfacción.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Preguntas Frecuentes</h2>
          <p className="text-xl text-foreground/60">Todo lo que necesitas saber</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-foreground/10 rounded-lg px-6 bg-foreground/5"
            >
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 leading-relaxed pb-6">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center bg-foreground/5 rounded-xl p-8 border border-foreground/10">
          <p className="text-lg font-semibold mb-2">¿Listo para empezar?</p>
          <p className="text-foreground/60 mb-4">Rellena el formulario y te añadimos al grupo de tu especialidad</p>
          <a
            href="#partner-form"
            className="text-foreground font-bold hover:underline text-lg inline-flex items-center gap-2"
          >
            Registrarme ahora
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
