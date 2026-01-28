import { PROFESSIONS } from "@/lib/seo-data"

interface SEOSchemaProps {
  profession: (typeof PROFESSIONS)[0]
  cityName: string
  citySlug: string
  modifier?: string
  modifierText?: string
  problemName?: string
  phoneNumber?: string
}

export function SEOSchema({
  profession,
  cityName,
  citySlug,
  modifier,
  modifierText,
  problemName,
  phoneNumber = "936946639",
}: SEOSchemaProps) {
  const siteUrl = "https://www.servicioshogar.xyz"
  const phoneFormatted = phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, "+34 $1 $2 $3")
  
  const serviceName = problemName 
    ? `${problemName} - ${profession.name}`
    : modifierText 
      ? `${profession.name} ${modifierText}`
      : profession.name

  const description = problemName
    ? `Servicio de ${profession.name.toLowerCase()} para ${problemName.toLowerCase()} en ${cityName}. Llegamos en 10 minutos. Disponible 24/7.`
    : `${profession.name} ${modifierText?.toLowerCase() || 'profesional'} en ${cityName}. Servicio urgente 24h. Llegamos en 10 minutos. Presupuesto gratis.`

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/${profession.id}/${citySlug}/#business`,
    name: `${profession.name} en ${cityName} - Servicios Hogar`,
    image: "https://www.hogarya.eu/og-image.jpg",
    telephone: phoneFormatted,
    email: "info@hogarya.eu",
    url: `${siteUrl}/${profession.id}${modifier ? `-${modifier}` : ''}/${citySlug}/`,
    description: description,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Efectivo, Tarjeta, Bizum",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      "@id": `https://www.wikidata.org/wiki/${citySlug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2847",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Servicios de ${profession.name}`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${profession.name} Urgente`,
            description: `Servicio de ${profession.name.toLowerCase()} urgente en ${cityName}. Llegada en 10 minutos.`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${profession.name} 24 Horas`,
            description: `${profession.name} disponible las 24 horas en ${cityName}. Noches y festivos.`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${profession.name} Económico`,
            description: `${profession.name} con los mejores precios en ${cityName}. Presupuesto gratis.`,
          },
        },
      ],
    },
  }

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/${profession.id}/${citySlug}/#service`,
    name: serviceName,
    description: description,
    provider: {
      "@type": "LocalBusiness",
      name: "Servicios Hogar",
      telephone: phoneFormatted,
    },
    areaServed: {
      "@type": "City",
      name: cityName,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Servicios de ${profession.name} en ${cityName}`,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        price: "39",
        minPrice: "39",
        description: "Precio desde 39€. Presupuesto sin compromiso.",
      },
    },
  }

  // FAQ Schema - Preguntas dinámicas por profesión y ciudad
  const faqItems = generateFAQs(profession, cityName, modifier)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: profession.name,
        item: `${siteUrl}/${profession.id}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${profession.name} en ${cityName}`,
        item: `${siteUrl}/${profession.id}/${citySlug}/`,
      },
    ],
  }

  // Review Schema (sample reviews)
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${profession.name} en ${cityName}`,
    description: description,
    brand: {
      "@type": "Brand",
      name: "Servicios Hogar",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2847",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "María García",
        },
        reviewBody: `Excelente servicio de ${profession.name.toLowerCase()} en ${cityName}. Llegaron en 10 minutos y solucionaron el problema rápidamente. Muy profesionales.`,
        datePublished: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "Carlos Pérez",
        },
        reviewBody: `El mejor ${profession.name.toLowerCase()} de ${cityName}. Precio justo y trabajo impecable. 100% recomendado.`,
        datePublished: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </>
  )
}

// Generador de FAQs dinámicas por profesión y ciudad
function generateFAQs(
  profession: (typeof PROFESSIONS)[0],
  cityName: string,
  modifier?: string
): { question: string; answer: string }[] {
  const baseFAQs = [
    {
      question: `¿Cuánto cuesta un ${profession.name.toLowerCase()} en ${cityName}?`,
      answer: `El precio de un ${profession.name.toLowerCase()} en ${cityName} depende del tipo de servicio. Los precios empiezan desde 39€ para servicios básicos. Ofrecemos presupuesto GRATIS y sin compromiso. Llámanos al 711 267 223 para un presupuesto personalizado.`,
    },
    {
      question: `¿Hay ${profession.namePlural.toLowerCase()} 24 horas en ${cityName}?`,
      answer: `Sí, en HogarYa tenemos ${profession.namePlural.toLowerCase()} disponibles las 24 horas del día, los 7 días de la semana en ${cityName}. Trabajamos noches, fines de semana y festivos sin recargo adicional.`,
    },
    {
      question: `¿Cuánto tarda en llegar un ${profession.name.toLowerCase()} a ${cityName}?`,
      answer: `Nuestros ${profession.namePlural.toLowerCase()} llegan en un máximo de 10 minutos a cualquier punto de ${cityName}. Tenemos profesionales distribuidos por toda la zona para garantizar una respuesta rápida.`,
    },
    {
      question: `¿Los ${profession.namePlural.toLowerCase()} de ${cityName} están certificados?`,
      answer: `Sí, todos nuestros ${profession.namePlural.toLowerCase()} en ${cityName} están certificados y cuentan con años de experiencia. Además, ofrecemos garantía en todos nuestros trabajos.`,
    },
    {
      question: `¿Cómo contactar con un ${profession.name.toLowerCase()} urgente en ${cityName}?`,
      answer: `Para contactar con un ${profession.name.toLowerCase()} urgente en ${cityName}, llama al 711 267 223. Estamos disponibles 24/7 y un profesional estará en tu domicilio en menos de 10 minutos.`,
    },
  ]

  // FAQs específicas por modificador
  if (modifier === "economico" || modifier === "barato") {
    baseFAQs.push({
      question: `¿Dónde encontrar un ${profession.name.toLowerCase()} barato en ${cityName}?`,
      answer: `En Servicios Hogar ofrecemos los mejores precios de ${profession.namePlural.toLowerCase()} en ${cityName}. Nuestros precios son hasta un 20% más económicos que la competencia, manteniendo la máxima calidad y garantía en todos los trabajos.`,
    })
  }

  if (modifier === "urgente" || modifier === "24-horas") {
    baseFAQs.push({
      question: `¿Qué hacer en caso de emergencia de ${profession.name.toLowerCase()} en ${cityName}?`,
      answer: `En caso de emergencia, llama inmediatamente al 711 267 223. Nuestro servicio de ${profession.name.toLowerCase()} urgente en ${cityName} está disponible 24/7 y llegamos en 10 minutos para solucionar cualquier emergencia.`,
    })
  }

  return baseFAQs
}

export default SEOSchema
