import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Header } from "@/components/header"
import Script from "next/script"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HOGARYA | Servicios Urgentes 24h - Fontaneros, Electricistas, Cerrajeros",
  description:
    "HOGARYA - Servicios de emergencia 24/7 en toda España. Fontanero urgente, electricista 24h, cerrajero express, desatascos. Respuesta en 30 minutos. Presupuesto gratis sin compromiso.",
  keywords:
    "fontanero urgente 24 horas, electricista urgente cerca de mi, cerrajero 24 horas, desatasco urgente, reparación calderas urgente, fontanero barcelona, electricista madrid urgente",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "HOGARYA - Servicios Urgentes 24/7 en Toda España",
    description: "Profesionales verificados en menos de 30 minutos. Presupuesto gratis sin compromiso.",
    type: "website",
    locale: "es_ES",
    siteName: "HOGARYA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://hogarya.es",
  },
    generator: 'v0.app'
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16741652529" strategy="afterInteractive" />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16741652529');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "HOGARYA",
              description: "Servicios de emergencia 24/7 en toda España",
              telephone: "+34-900-123-456",
              priceRange: "€€",
              openingHours: "Mo-Su 00:00-23:59",
              areaServed: {
                "@type": "Country",
                name: "España",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de Emergencia",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Fontanero Urgente 24h",
                      description: "Servicio de fontanería urgente disponible 24/7",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Electricista 24 Horas",
                      description: "Electricistas profesionales disponibles 24/7",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Cerrajero Urgente",
                      description: "Cerrajeros profesionales para emergencias",
                    },
                  },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "1247",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ScrollToTop />
        <Header />
        {children}
      </body>
    </html>
  )
}
