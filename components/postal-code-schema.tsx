interface PostalCodeSchemaProps {
  profession: {
    id: string
    name: string
    namePlural: string
  }
  postalcode: string
  zoneName: string
  cityName: string
  phoneNumber?: string
}

export function PostalCodeSchema({
  profession,
  postalcode,
  zoneName,
  cityName,
  phoneNumber = "936946639",
}: PostalCodeSchemaProps) {
  const siteUrl = "https://www.servicioshogar.xyz"
  const phoneFormatted = phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, "+34 $1 $2 $3")

  const description = `${profession.name} urgente en ${zoneName} (${postalcode}), ${cityName}. Llegamos en 10 minutos. Servicio 24h. Presupuesto gratis.`

  // LocalBusiness Schema - Hiperlocal por código postal
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/${profession.id}/cp/${postalcode}/#business`,
    name: `${profession.name} en ${zoneName} (${postalcode})`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: phoneFormatted,
    url: `${siteUrl}/${profession.id}/cp/${postalcode}/`,
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
    address: {
      "@type": "PostalAddress",
      postalCode: postalcode,
      addressLocality: cityName,
      addressRegion: cityName,
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      postalCode: postalcode,
    },
    areaServed: {
      "@type": "PostalAddress",
      postalCode: postalcode,
      addressLocality: zoneName,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2847",
      bestRating: "5",
      worstRating: "1",
    },
  }

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/${profession.id}/cp/${postalcode}/#service`,
    name: `${profession.name} Urgente en ${postalcode}`,
    description: description,
    provider: {
      "@type": "LocalBusiness",
      name: "Servicios Hogar",
      telephone: phoneFormatted,
    },
    areaServed: {
      "@type": "PostalAddress",
      postalCode: postalcode,
      addressLocality: zoneName,
      addressRegion: cityName,
    },
    serviceType: `${profession.name} urgente`,
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

  // FAQ Schema específico para el código postal
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Cuánto cuesta un ${profession.name.toLowerCase()} en ${zoneName} (${postalcode})?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `El precio de un ${profession.name.toLowerCase()} en ${zoneName} empieza desde 39€. Ofrecemos presupuesto GRATIS para el código postal ${postalcode}. Llama al ${phoneFormatted}.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Cuánto tarda en llegar un ${profession.name.toLowerCase()} al ${postalcode}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Nuestros ${profession.namePlural.toLowerCase()} llegan en máximo 10 minutos a cualquier punto del código postal ${postalcode} (${zoneName}).`,
        },
      },
      {
        "@type": "Question",
        name: `¿Hay ${profession.namePlural.toLowerCase()} 24 horas en ${postalcode}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sí, tenemos ${profession.namePlural.toLowerCase()} disponibles 24/7 en ${zoneName} y todo el código postal ${postalcode}. Noches, fines de semana y festivos.`,
        },
      },
    ],
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
        name: `${profession.name} en ${postalcode}`,
        item: `${siteUrl}/${profession.id}/cp/${postalcode}/`,
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
    </>
  )
}
