import { Mail, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-5">
            <Logo variant="light" size="lg" />
            <p className="text-background/60 leading-relaxed text-sm">
              Tu solución inmediata para emergencias del hogar. Profesionales verificados disponibles 24/7 en toda
              España.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-background/40">Servicios</h4>
            <ul className="space-y-3 text-background/70 text-sm">
              <li>
                <Link href="/desatascos" className="hover:text-emerald-400 transition-colors">
                  Desatascos 24/7
                </Link>
              </li>
              <li>
                <Link href="/electricista" className="hover:text-emerald-400 transition-colors">
                  Electricista urgente
                </Link>
              </li>
              <li>
                <Link href="/fontanero" className="hover:text-emerald-400 transition-colors">
                  Fontanero express
                </Link>
              </li>
              <li>
                <Link href="/cerrajero" className="hover:text-emerald-400 transition-colors">
                  Cerrajero inmediato
                </Link>
              </li>
              <li>
                <Link href="/calderas" className="hover:text-emerald-400 transition-colors">
                  Reparación calderas
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-background/40">Profesionales</h4>
            <ul className="space-y-3 text-background/70 text-sm">
              <li>
                <Link href="/partners" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">→</span> Hazte Partner
                </Link>
              </li>
              <li className="text-xs text-background/50 pt-1">
                Únete a nuestra red y recibe leads cualificados todos los días
              </li>
            </ul>
            <div className="pt-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-background/40 mb-3">Cobertura</h4>
              <p className="text-sm text-emerald-400 font-medium">Barcelona</p>
              <p className="text-xs text-background/50 mt-1">Próximamente en más ciudades</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-background/40">Contacto 24/7</h4>
            <div className="space-y-3 text-background/70 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-500" />
                <span>info@hogarya.es</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-emerald-500" />
                <span className="font-medium text-background">Disponible 24 horas</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span>Toda España</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-background/40">
            <p>© 2025 SERVICIOS HOGAR. Todos los derechos reservados.</p>
            <p className="text-xs">Actualmente en Barcelona. Próximamente en más ciudades de España.</p>
          </div>
          <p className="text-xs text-background/30 max-w-3xl">
            SERVICIOS HOGAR actúa como plataforma de conexión entre clientes y profesionales independientes. La responsabilidad
            sobre la calidad, garantías y ejecución de los servicios recae exclusivamente en el profesional que realiza
            el trabajo.
          </p>
        </div>
      </div>
    </footer>
  )
}
