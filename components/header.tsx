"use client"

import { Logo } from "./logo"
import { Menu, X, Phone, ChevronDown, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const services = [
  { name: "Fontaneros", href: "/fontanero", description: "Fugas, grifos, calderas" },
  { name: "Electricistas", href: "/electricista", description: "Averías eléctricas 24h" },
  { name: "Desatascos", href: "/desatascos", description: "Tuberías y desagües" },
  { name: "Cerrajeros", href: "/cerrajero", description: "Apertura sin roturas" },
  { name: "Calderas", href: "/calderas", description: "Reparación y mantenimiento" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [phoneNumber] = useState("936946639")
  const [phoneFormatted] = useState("936 946 639")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (pathname?.startsWith("/0x")) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white py-2 px-4 transition-all duration-300 ${scrolled ? "hidden" : "block"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm font-medium">
          <Zap className="h-3.5 w-3.5" />
          <span>Emergencia 24/7</span>
          <span className="opacity-60">•</span>
          <span className="hidden sm:inline">Respuesta garantizada en 30 minutos</span>
          <span className="sm:hidden">Respuesta en 30 min</span>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-background border-b border-border/50 shadow-lg shadow-black/5"
            : "bg-background/95 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors font-medium rounded-lg hover:bg-foreground/5">
                  Servicios
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 pt-2 transition-all duration-200 ${servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
                >
                  <div className="bg-background border border-border rounded-xl shadow-2xl shadow-black/20 p-2 min-w-[240px]">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex flex-col px-4 py-3 rounded-lg hover:bg-[#FF6B35]/10 transition-colors group"
                      >
                        <span className="font-medium text-foreground group-hover:text-[#FF6B35] transition-colors">
                          {service.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{service.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/partners"
                className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors font-medium rounded-lg hover:bg-foreground/5"
              >
                Profesionales
              </Link>

              <Link
                href="/#cobertura"
                className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors font-medium rounded-lg hover:bg-foreground/5"
              >
                Cobertura
              </Link>

              {/* Divider */}
              <div className="w-px h-6 bg-border mx-2" />

              {/* Call button */}
              <a
                href={`tel:+34${phoneNumber}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6B35] hover:bg-[#F7931E] text-white text-sm font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#FF6B35]/25"
              >
                <div className="relative">
                  <Phone className="w-4 h-4" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
                <span>{phoneFormatted}</span>
              </a>
            </nav>

            {/* Mobile: Phone + Menu */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href={`tel:+34${phoneNumber}`}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#FF6B35] text-white text-xs font-bold rounded-full"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Llamar</span>
              </a>
              <button
                className="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col gap-1">
                {/* Phone CTA */}
                <a
                  href={`tel:+34${phoneNumber}`}
                  className="flex items-center justify-center gap-2 px-4 py-4 bg-[#FF6B35] text-white text-sm font-bold rounded-xl mb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  <span>Llamar ahora: {phoneFormatted}</span>
                </a>

                {/* Services Label */}
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Servicios
                </div>

                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="flex items-center justify-between px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{service.name}</span>
                    <span className="text-xs text-muted-foreground">{service.description}</span>
                  </Link>
                ))}

                {/* Divider */}
                <div className="h-px bg-border my-2" />

                <Link
                  href="/partners"
                  className="px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Soy Profesional
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
