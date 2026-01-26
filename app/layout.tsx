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
  title: "Servicios Hogar | Urgencias 24h - Fontaneros, Electricistas, Cerrajeros en Cataluña",
  description:
    "Servicios Hogar - Tu solución de emergencia 24/7 en Cataluña. Fontanero urgente, electricista 24h, cerrajero express, desatascos. Llegamos en 10 minutos. Presupuesto GRATIS. Llama: 711 267 223",
  keywords:
    "fontanero urgente 24 horas barcelona, electricista urgente cataluña, cerrajero 24 horas girona, desatasco urgente tarragona, reparación calderas urgente lleida, servicios hogar urgentes",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Servicios Hogar - Urgencias 24/7 en Cataluña | Llegamos en 10 min",
    description: "Profesionales verificados en menos de 10 minutos. Presupuesto gratis sin compromiso. Fontaneros, electricistas, cerrajeros, desatascos y calderas.",
    type: "website",
    locale: "es_ES",
    siteName: "Servicios Hogar",
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
    canonical: "https://www.hogarya.eu",
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
              name: "Servicios Hogar",
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
