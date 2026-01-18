"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Users,
  Plus,
  X,
  Phone,
  MapPin,
  Briefcase,
  ArrowLeft,
  Trash2,
  Edit,
  MessageCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface Partner {
  id: string
  name: string
  phone: string
  telegram_chat_id: string
  services: string[]
  cities: string[]
  active: boolean
  created_at: string
  total_leads_accepted: number
  balance_euros: number
}

const SERVICES = [
  { id: "fontanero", label: "Fontanero", emoji: "🔧" },
  { id: "electricista", label: "Electricista", emoji: "⚡" },
  { id: "cerrajero", label: "Cerrajero", emoji: "🔑" },
  { id: "desatasco", label: "Desatascos", emoji: "🚿" },
  { id: "calderas", label: "Calderas", emoji: "🔥" },
]

const CITIES = [
  "Barcelona",
  "Madrid",
  "Valencia",
  "Sevilla",
  "Bilbao",
  "Malaga",
  "Zaragoza",
  "Hospitalet",
  "Badalona",
  "Terrassa",
  "Sabadell",
]

export function GestionPartnersClient({ partners: initialPartners }: { partners: Partner[] }) {
  const router = useRouter()
  const [partners, setPartners] = useState<Partner[]>(initialPartners)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    services: [] as string[],
    cities: [] as string[],
  })

  const resetForm = () => {
    setFormData({ name: "", phone: "", services: [], cities: [] })
    setEditingPartner(null)
  }

  const openWhatsAppPartner = (partner: Partner) => {
    const phone = partner.phone?.replace(/\D/g, "") || ""
    const phoneWithCountry = phone.startsWith("34") ? phone : `34${phone}`
    const message = encodeURIComponent(`Hola ${partner.name || ""}! Soy de RapidFix. ¿Cómo va todo?`)
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, "_blank")
  }

  const handleCreatePartner = async () => {
    if (!formData.name || !formData.phone || formData.services.length === 0) {
      setNotification({ type: "error", message: "Completa nombre, teléfono y al menos un servicio" })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/0x/gestion-partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({ type: "success", message: "Partner creado correctamente" })
        setShowCreateModal(false)
        resetForm()
        router.refresh()
      } else {
        setNotification({ type: "error", message: result.error || "Error al crear" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setLoading(false)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleUpdatePartner = async () => {
    if (!editingPartner) return

    setLoading(true)
    try {
      const response = await fetch("/api/0x/gestion-partners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId: editingPartner.id, ...formData }),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({ type: "success", message: "Partner actualizado" })
        setEditingPartner(null)
        resetForm()
        router.refresh()
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setLoading(false)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleDeletePartner = async (partnerId: string) => {
    if (!confirm("¿Seguro que quieres eliminar este partner?")) return

    try {
      const response = await fetch("/api/0x/gestion-partners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId }),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({ type: "success", message: "Partner eliminado" })
        router.refresh()
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleToggleActive = async (partnerId: string, currentActive: boolean) => {
    try {
      const response = await fetch("/api/0x/gestion-partners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId, active: !currentActive }),
      })

      const result = await response.json()

      if (result.success) {
        setNotification({ type: "success", message: currentActive ? "Partner desactivado" : "Partner activado" })
        router.refresh()
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const openEditModal = (partner: Partner) => {
    setEditingPartner(partner)
    setFormData({
      name: partner.name || "",
      phone: partner.phone || "",
      services: partner.services || [],
      cities: partner.cities || [],
    })
  }

  const toggleService = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }))
  }

  const toggleCity = (city: string) => {
    setFormData((prev) => ({
      ...prev,
      cities: prev.cities.includes(city) ? prev.cities.filter((c) => c !== city) : [...prev.cities, city],
    }))
  }

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

      {/* Create/Edit Modal */}
      {(showCreateModal || editingPartner) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg border border-zinc-700 bg-zinc-900 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold tracking-wider text-[#FF4D00]">
                {editingPartner ? "EDITAR PARTNER" : "CREAR PARTNER"}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setEditingPartner(null)
                  resetForm()
                }}
                className="p-1 hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">NOMBRE</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Juan García"
                  className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">TELÉFONO</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="612345678"
                  className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                />
              </div>

              {/* Services */}
              <div>
                <label className="text-xs text-zinc-500 mb-2 block">PROFESIÓN</label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`px-3 py-2 text-sm border transition-colors flex items-center gap-2 ${
                        formData.services.includes(service.id)
                          ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                          : "border-zinc-700 hover:border-zinc-600"
                      }`}
                    >
                      <span>{service.emoji}</span>
                      <span>{service.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cities */}
              <div>
                <label className="text-xs text-zinc-500 mb-2 block">TERRITORIO</label>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => toggleCity(city)}
                      className={`px-3 py-1.5 text-xs border transition-colors ${
                        formData.cities.includes(city)
                          ? "border-blue-500 bg-blue-500/20 text-blue-400"
                          : "border-zinc-700 hover:border-zinc-600"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={editingPartner ? handleUpdatePartner : handleCreatePartner}
              disabled={loading}
              className="w-full mt-6 py-3 bg-[#FF4D00] text-black font-bold tracking-wider hover:bg-[#FF4D00]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "GUARDANDO..." : editingPartner ? "ACTUALIZAR PARTNER" : "CREAR PARTNER"}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => router.push("/0x/dashboard")}
              className="p-2 border border-zinc-700 hover:border-zinc-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-[#FF4D00] flex items-center justify-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D00]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-wider">GESTIÓN PARTNERS</h1>
              <p className="text-[10px] sm:text-xs text-zinc-500 tracking-widest">{partners.length} PARTNERS</p>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF4D00] text-black font-bold text-sm hover:bg-[#FF4D00]/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">CREAR PARTNER</span>
          </button>
        </div>
      </header>

      {/* Partners List */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
          <div className="divide-y divide-zinc-800/50">
            {partners.map((partner) => (
              <div key={partner.id} className="p-4 hover:bg-zinc-800/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 border flex items-center justify-center shrink-0 ${
                      partner.active ? "border-green-500/50 bg-green-500/10" : "border-zinc-700 bg-zinc-800"
                    }`}
                  >
                    <span className="text-lg">
                      {partner.services?.[0] ? SERVICES.find((s) => s.id === partner.services[0])?.emoji : "👤"}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{partner.name || "Sin nombre"}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 border ${
                          partner.active
                            ? "border-green-500/30 bg-green-500/10 text-green-400"
                            : "border-zinc-700 bg-zinc-800 text-zinc-500"
                        }`}
                      >
                        {partner.active ? "ACTIVO" : "INACTIVO"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {partner.phone || "Sin teléfono"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {partner.services?.join(", ") || "Sin servicios"}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {partner.cities?.join(", ") || "Sin territorio"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="text-zinc-500">
                        Leads: <span className="text-zinc-300">{partner.total_leads_accepted || 0}</span>
                      </span>
                      <span className="text-zinc-500">
                        Balance:{" "}
                        <span className="text-[#FF4D00]">{Number(partner.balance_euros || 0).toFixed(0)}€</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openWhatsAppPartner(partner)}
                      className="p-2 border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-all"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-green-500" />
                    </button>
                    <button
                      onClick={() => openEditModal(partner)}
                      className="p-2 border border-zinc-700 hover:border-[#FF4D00] hover:bg-[#FF4D00]/10 transition-all"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 text-zinc-400" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(partner.id, partner.active)}
                      className={`p-2 border transition-all ${
                        partner.active
                          ? "border-yellow-500/30 hover:border-yellow-500 hover:bg-yellow-500/10"
                          : "border-green-500/30 hover:border-green-500 hover:bg-green-500/10"
                      }`}
                      title={partner.active ? "Desactivar" : "Activar"}
                    >
                      {partner.active ? (
                        <XCircle className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeletePartner(partner.id)}
                      className="p-2 border border-zinc-700 hover:border-red-500 hover:bg-red-500/10 transition-all"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {partners.length === 0 && (
              <div className="p-8 text-center text-zinc-500">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No hay partners todavía</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 px-4 py-2 border border-[#FF4D00] text-[#FF4D00] hover:bg-[#FF4D00]/10 transition-colors text-sm"
                >
                  Crear primer partner
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
