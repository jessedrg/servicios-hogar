"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Users,
  UserX,
  UserCheck,
  Phone,
  Mail,
  Clock,
  DollarSign,
  ShoppingBag,
  Search,
  Send,
} from "lucide-react"

interface Partner {
  id: string
  name: string
  email: string
  phone: string
  company: string
  services: string[]
  cities: string[]
  telegram_chat_id: string
  active: boolean
  created_at: string
  leads_bought: number
  total_spent: number
  last_purchase: string | null
  isOwner: boolean
}

interface PartnersData {
  partners: Partner[]
  ownerTelegramId: string
}

export function PartnersClient({ data }: { data: PartnersData }) {
  const router = useRouter()
  const [partners, setPartners] = useState(data.partners)
  const [search, setSearch] = useState("")
  const [filterService, setFilterService] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)

  const serviceEmojis: Record<string, string> = {
    fontanero: "🔧",
    electricista: "⚡",
    cerrajero: "🔑",
    desatasco: "🚿",
    calderas: "🔥",
  }

  const serviceLabels: Record<string, string> = {
    fontanero: "Fontanero",
    electricista: "Electricista",
    cerrajero: "Cerrajero",
    desatasco: "Desatasco",
    calderas: "Calderas",
  }

  const allServices = ["fontanero", "electricista", "cerrajero", "desatasco", "calderas"]

  const filteredPartners = partners.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.phone?.includes(search) ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.company?.toLowerCase().includes(search.toLowerCase())

    const matchesService = filterService === "all" || p.services?.includes(filterService)

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && p.active) ||
      (filterStatus === "expelled" && !p.active) ||
      (filterStatus === "owner" && p.isOwner)

    return matchesSearch && matchesService && matchesStatus
  })

  const handleExpel = async (partner: Partner) => {
    if (partner.isOwner) {
      setNotification({ type: "error", message: "No puedes expulsarte a ti mismo" })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    setActionLoading(partner.id)
    try {
      const response = await fetch("/api/0x/partners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId: partner.id, telegramChatId: partner.telegram_chat_id }),
      })

      const result = await response.json()

      if (result.success) {
        setPartners(partners.map((p) => (p.id === partner.id ? { ...p, active: false } : p)))
        setNotification({ type: "success", message: `${partner.name || "Partner"} expulsado correctamente` })
        if (selectedPartner?.id === partner.id) {
          setSelectedPartner({ ...selectedPartner, active: false })
        }
      } else {
        setNotification({ type: "error", message: result.error || "Error al expulsar" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setActionLoading(null)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleReactivate = async (partner: Partner) => {
    setActionLoading(partner.id)
    try {
      const response = await fetch("/api/0x/partners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId: partner.id, active: true }),
      })

      const result = await response.json()

      if (result.success) {
        setPartners(partners.map((p) => (p.id === partner.id ? { ...p, active: true } : p)))
        setNotification({ type: "success", message: `${partner.name || "Partner"} reactivado` })
        if (selectedPartner?.id === partner.id) {
          setSelectedPartner({ ...selectedPartner, active: true })
        }
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setActionLoading(null)
    setTimeout(() => setNotification(null), 3000)
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—"
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const totalActive = partners.filter((p) => p.active).length
  const totalExpelled = partners.filter((p) => !p.active).length
  const totalRevenue = partners.reduce((sum, p) => sum + Number(p.total_spent || 0), 0)
  const totalLeadsBought = partners.reduce((sum, p) => sum + Number(p.leads_bought || 0), 0)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 border ${
            notification.type === "success"
              ? "border-green-500/50 bg-green-500/20 text-green-400"
              : "border-red-500/50 bg-red-500/20 text-red-400"
          }`}
        >
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => router.push("/0x/dashboard")}
              className="p-2 border border-zinc-700 hover:border-[#FF4D00] hover:bg-[#FF4D00]/10 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-[#FF4D00] flex items-center justify-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D00]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-wider">PARTNERS</h1>
              <p className="text-[10px] sm:text-xs text-zinc-500 tracking-widest">{partners.length} REGISTRADOS</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 text-xs">
              <div className="text-center">
                <p className="text-lg font-bold text-green-500">{totalActive}</p>
                <p className="text-zinc-500">activos</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#FF4D00]">{totalRevenue.toFixed(0)}€</p>
                <p className="text-zinc-500">total</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, teléfono, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 pl-10 pr-4 py-2 text-sm focus:border-[#FF4D00] outline-none"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="bg-zinc-900/50 border border-zinc-800 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
            >
              <option value="all">Todos los servicios</option>
              {allServices.map((s) => (
                <option key={s} value={s}>
                  {serviceEmojis[s]} {serviceLabels[s]}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-zinc-900/50 border border-zinc-800 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
            >
              <option value="all">Todos</option>
              <option value="active">Activos</option>
              <option value="expelled">Expulsados</option>
              <option value="owner">Owner</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Partners List */}
          <div className="lg:col-span-2 border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
            <div className="p-3 sm:p-4 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-wider text-zinc-400">LISTADO</h3>
              <span className="text-xs text-zinc-600">{filteredPartners.length} resultados</span>
            </div>
            <div className="divide-y divide-zinc-800/50 max-h-[600px] overflow-y-auto">
              {filteredPartners.map((partner) => (
                <div
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner)}
                  className={`px-3 sm:px-4 py-3 hover:bg-zinc-800/20 transition-colors cursor-pointer ${
                    selectedPartner?.id === partner.id ? "bg-zinc-800/30 border-l-2 border-l-[#FF4D00]" : ""
                  } ${!partner.active ? "opacity-60" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 flex items-center justify-center text-lg font-bold ${
                        partner.isOwner
                          ? "bg-[#FF4D00]/20 border border-[#FF4D00]/50 text-[#FF4D00]"
                          : "bg-zinc-800 border border-zinc-700"
                      }`}
                    >
                      {partner.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm truncate">{partner.name || "Sin nombre"}</span>
                        {partner.isOwner && (
                          <span className="text-[10px] px-2 py-0.5 border border-[#FF4D00]/50 text-[#FF4D00] bg-[#FF4D00]/10">
                            OWNER
                          </span>
                        )}
                        {!partner.active && (
                          <span className="text-[10px] px-2 py-0.5 border border-red-500/30 text-red-400 bg-red-500/10">
                            EXPULSADO
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
                        {partner.services?.map((s) => (
                          <span key={s}>{serviceEmojis[s]}</span>
                        ))}
                        <span className="text-zinc-600">•</span>
                        <span>{partner.cities?.length || 0} ciudades</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#FF4D00]">{Number(partner.total_spent || 0).toFixed(0)}€</p>
                      <p className="text-[10px] text-zinc-500">{partner.leads_bought || 0} leads</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPartners.length === 0 && (
                <div className="px-4 py-12 text-center text-zinc-500 text-sm">No se encontraron partners</div>
              )}
            </div>
          </div>

          {/* Partner Detail */}
          <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
            {selectedPartner ? (
              <>
                <div className="p-3 sm:p-4 border-b border-zinc-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold tracking-wider text-zinc-400">DETALLE</h3>
                    {selectedPartner.active ? (
                      <button
                        onClick={() => handleExpel(selectedPartner)}
                        disabled={selectedPartner.isOwner || actionLoading === selectedPartner.id}
                        className={`flex items-center gap-1 px-2 py-1 text-xs border transition-all ${
                          selectedPartner.isOwner
                            ? "border-zinc-800 text-zinc-700 cursor-not-allowed"
                            : "border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-400"
                        }`}
                      >
                        <UserX className="w-3 h-3" />
                        {selectedPartner.isOwner ? "OWNER" : "Expulsar"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReactivate(selectedPartner)}
                        disabled={actionLoading === selectedPartner.id}
                        className="flex items-center gap-1 px-2 py-1 text-xs border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 text-green-400 transition-all"
                      >
                        <UserCheck className="w-3 h-3" />
                        Reactivar
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Name & Company */}
                  <div className="text-center pb-4 border-b border-zinc-800">
                    <div
                      className={`w-16 h-16 mx-auto mb-3 flex items-center justify-center text-2xl font-bold ${
                        selectedPartner.isOwner
                          ? "bg-[#FF4D00]/20 border border-[#FF4D00]/50 text-[#FF4D00]"
                          : "bg-zinc-800 border border-zinc-700"
                      }`}
                    >
                      {selectedPartner.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <h4 className="font-bold text-lg">{selectedPartner.name || "Sin nombre"}</h4>
                    {selectedPartner.company && <p className="text-sm text-zinc-500">{selectedPartner.company}</p>}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    {selectedPartner.phone && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-zinc-500" />
                        <span>{selectedPartner.phone}</span>
                      </div>
                    )}
                    {selectedPartner.email && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-zinc-500" />
                        <span className="truncate">{selectedPartner.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-zinc-500" />
                      <span>Desde {formatDate(selectedPartner.created_at)}</span>
                    </div>
                    {selectedPartner.telegram_chat_id && (
                      <a
                        href={`https://t.me/${selectedPartner.telegram_chat_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#0088cc] hover:bg-[#0077b5] text-white font-medium text-sm transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        Abrir Telegram
                      </a>
                    )}
                    {selectedPartner.phone && (
                      <a
                        href={`https://wa.me/34${selectedPartner.phone.replace(/\D/g, "").replace(/^34/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-sm transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Abrir WhatsApp
                      </a>
                    )}
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-xs text-zinc-500 mb-2">SERVICIOS</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner.services?.map((s) => (
                        <span key={s} className="px-2 py-1 text-xs bg-zinc-800 border border-zinc-700">
                          {serviceEmojis[s]} {serviceLabels[s]}
                        </span>
                      ))}
                      {(!selectedPartner.services || selectedPartner.services.length === 0) && (
                        <span className="text-xs text-zinc-600">Sin servicios</span>
                      )}
                    </div>
                  </div>

                  {/* Cities */}
                  <div>
                    <p className="text-xs text-zinc-500 mb-2">CIUDADES</p>
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                      {selectedPartner.cities?.map((city) => (
                        <span key={city} className="px-2 py-0.5 text-[10px] bg-zinc-800/50 text-zinc-400">
                          {city}
                        </span>
                      ))}
                      {(!selectedPartner.cities || selectedPartner.cities.length === 0) && (
                        <span className="text-xs text-zinc-600">Sin ciudades</span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
                    <div className="text-center p-3 bg-zinc-800/30 border border-zinc-800">
                      <ShoppingBag className="w-5 h-5 mx-auto mb-1 text-green-500" />
                      <p className="text-xl font-bold text-green-500">{selectedPartner.leads_bought || 0}</p>
                      <p className="text-[10px] text-zinc-500">LEADS COMPRADOS</p>
                    </div>
                    <div className="text-center p-3 bg-zinc-800/30 border border-zinc-800">
                      <DollarSign className="w-5 h-5 mx-auto mb-1 text-[#FF4D00]" />
                      <p className="text-xl font-bold text-[#FF4D00]">
                        {Number(selectedPartner.total_spent || 0).toFixed(0)}€
                      </p>
                      <p className="text-[10px] text-zinc-500">TOTAL GASTADO</p>
                    </div>
                  </div>

                  {selectedPartner.last_purchase && (
                    <p className="text-xs text-zinc-500 text-center">
                      Última compra: {formatDate(selectedPartner.last_purchase)}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-zinc-500">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Selecciona un partner para ver detalles</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
