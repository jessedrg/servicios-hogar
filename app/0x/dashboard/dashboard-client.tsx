"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Users,
  DollarSign,
  Activity,
  LogOut,
  Zap,
  X,
  ChevronDown,
  Trash2,
  MessageCircle,
  Plus,
  Phone,
  MapPin,
  Briefcase,
  Edit2,
  Copy,
  Check,
  Filter,
  RotateCcw,
  Clock,
  Maximize2,
  GripVertical,
  Calendar,
  CheckCircle,
  CreditCard,
  UserCheck,
  FileText,
  Euro,
  Upload,
  ImageIcon,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ListOrdered,
} from "lucide-react"

const PHONE_CONFIG_ENDPOINT = "/api/0x/phone-config"

interface PhoneConfig {
  activePhone: string
  phoneOptions: { id: string; label: string; number: string }[]
}

interface Partner {
  id: string
  name: string
  phone: string
  services: string[]
  cities: string[]
  active: boolean
  created_at: string
}

interface Lead {
  id: string
  name: string
  phone: string
  city: string
  service: string
  problem: string
  status: string
  lead_price: number
  partner_id: string | null
  created_at: string
  requested_date: string | null
  service_time: string | null
  source?: string
  commission?: number // Added commission
  amount_charged?: number // Added amount_charged
  notes?: string // Added notes
}

interface Stats {
  total: number
  sold: number
  revenue: number
  todayLeads: number
  todaySold: number
  todayRevenue: number
  todayPending: number
  todayPotential: number
  weekLeads: number
  weekSold: number
  weekRevenue: number
  weekPending: number
  weekPotential: number
  recentLeads: Lead[]
  byService: any[]
  funnelStats: any[]
  partners: number
  partnersList: Partner[]
  ownerTelegramId: string
  conversionRate: string
  incompleteChats: any[]
  dateRange: string
}

interface DashboardClientProps {
  initialStats: Stats
}

const PIPELINE_STATUSES = [
  { key: "pending", label: "PENDIENTE", color: "yellow", icon: Clock },
  { key: "contacted", label: "CONTACTADO", color: "blue", icon: Phone },
  { key: "pending_appointment", label: "PDTE CITA", color: "cyan", icon: Calendar }, // Added new status
  { key: "confirmed", label: "CITA CONFIRMADA", color: "purple", icon: Calendar },
  { key: "completed", label: "TRABAJO ACABADO", color: "orange", icon: CheckCircle },
  { key: "paid", label: "PAGADO", color: "green", icon: CreditCard },
] as const

type PipelineStatus = (typeof PIPELINE_STATUSES)[number]["key"]

function KPICard({
  label,
  value,
  subvalue,
  icon,
  color,
}: {
  label: string
  value: string | number
  subvalue?: string
  icon: React.ReactNode
  color: "green" | "orange" | "zinc" | "blue" | "yellow" | "purple" | "cyan"
}) {
  const colors = {
    green: "border-green-500/30 bg-green-500/5",
    orange: "border-[#FF4D00]/30 bg-[#FF4D00]/5",
    zinc: "border-zinc-700 bg-zinc-800/30",
    blue: "border-blue-500/30 bg-blue-500/5",
    yellow: "border-yellow-500/30 bg-yellow-500/5",
    purple: "border-purple-500/30 bg-purple-500/5",
    cyan: "border-cyan-500/30 bg-cyan-500/5",
  }

  const textColors = {
    green: "text-green-500",
    orange: "text-[#FF4D00]",
    zinc: "text-zinc-100",
    blue: "text-blue-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
    cyan: "text-cyan-500",
  }

  return (
    <div className={`border ${colors[color]} p-2 sm:p-3`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[8px] sm:text-[10px] text-zinc-500 tracking-wider truncate">{label}</span>
        <div className={`${textColors[color]} hidden sm:block`}>{icon}</div>
      </div>
      <p className={`text-sm sm:text-lg font-bold tracking-tight ${textColors[color]}`}>{value}</p>
      {subvalue && <p className="text-[8px] sm:text-[10px] text-zinc-500 mt-0.5 truncate">{subvalue}</p>}
    </div>
  )
}

function PartnerDetailModal({
  partner,
  leads,
  onClose,
  onLeadClick,
}: {
  partner: Partner
  leads: Lead[]
  onClose: () => void
  onLeadClick: (leadId: string) => void
}) {
  const partnerLeads = leads.filter((l) => l.partner_id === partner.id && l.status !== "trashed")

  const pendingLeads = partnerLeads.filter((l) =>
    ["pending", "contacted", "pending_appointment", "confirmed"].includes(l.status),
  )
  const completedLeads = partnerLeads.filter((l) => l.status === "completed")
  const paidLeads = partnerLeads.filter((l) => l.status === "paid")

  const pendingRevenue = completedLeads.reduce((sum, l) => sum + (Number(l.lead_price) || 0), 0)
  const totalRevenue = paidLeads.reduce((sum, l) => sum + (Number(l.lead_price) || 0), 0)

  const serviceEmojis: Record<string, string> = {
    fontanero: "🔧",
    electricista: "⚡",
    cerrajero: "🔑",
    desatasco: "🚿",
    calderas: "🔥",
  }

  const statusColors: Record<string, string> = {
    pending: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    contacted: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    pending_appointment: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    confirmed: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    completed: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    paid: "text-green-400 border-green-500/30 bg-green-500/10",
  }

  const statusLabels: Record<string, string> = {
    pending: "Pendiente",
    contacted: "Contactado",
    pending_appointment: "Pdte Cita",
    confirmed: "Cita",
    completed: "Acabado",
    paid: "Pagado",
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl h-[90vh] sm:h-auto sm:max-h-[85vh] overflow-hidden border-t sm:border border-zinc-700 bg-zinc-900 flex flex-col rounded-t-xl sm:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mt-2 sm:hidden" />

        <div className="p-3 sm:p-4 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-xs sm:text-sm font-bold tracking-wider text-[#FF4D00] flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              {partner.name}
            </h3>
            <p className="text-[10px] sm:text-xs text-zinc-500 mt-1">
              {partner.phone} • {partner.services?.join(", ")}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1 sm:gap-2 p-2 sm:p-4 border-b border-zinc-800 shrink-0">
          <div className="text-center p-1.5 sm:p-2 border border-yellow-500/30 bg-yellow-500/5">
            <p className="text-base sm:text-lg font-bold text-yellow-500">{pendingLeads.length}</p>
            <p className="text-[8px] sm:text-[10px] text-zinc-500">EN PROCESO</p>
          </div>
          <div className="text-center p-1.5 sm:p-2 border border-orange-500/30 bg-orange-500/5">
            <p className="text-base sm:text-lg font-bold text-orange-500">{completedLeads.length}</p>
            <p className="text-[8px] sm:text-[10px] text-zinc-500">PDTE ({pendingRevenue}€)</p>
          </div>
          <div className="text-center p-1.5 sm:p-2 border border-green-500/30 bg-green-500/5">
            <p className="text-base sm:text-lg font-bold text-green-500">{paidLeads.length}</p>
            <p className="text-[8px] sm:text-[10px] text-zinc-500">PAGADOS ({totalRevenue}€)</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {pendingLeads.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-yellow-500 mb-2">EN PROCESO ({pendingLeads.length})</h4>
              <div className="space-y-2">
                {pendingLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onLeadClick(lead.id)}
                    className="p-2 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{serviceEmojis[lead.service] || "📋"}</span>
                        <span className="text-sm font-medium">{lead.name || "Sin nombre"}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 border ${statusColors[lead.status]}`}>
                          {statusLabels[lead.status]}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500">{lead.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedLeads.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-orange-500 mb-2">PENDIENTE DE PAGO ({completedLeads.length})</h4>
              <div className="space-y-2">
                {completedLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onLeadClick(lead.id)}
                    className="p-2 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{serviceEmojis[lead.service] || "📋"}</span>
                        <span className="text-sm font-medium">{lead.name || "Sin nombre"}</span>
                        {lead.lead_price > 0 && (
                          <span className="text-xs font-bold text-[#FF4D00]">{lead.lead_price}€</span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500">{lead.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {paidLeads.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-green-500 mb-2">PAGADOS ({paidLeads.length})</h4>
              <div className="space-y-2">
                {paidLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onLeadClick(lead.id)}
                    className="p-2 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors opacity-70"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{serviceEmojis[lead.service] || "📋"}</span>
                        <span className="text-sm font-medium">{lead.name || "Sin nombre"}</span>
                        {lead.lead_price > 0 && (
                          <span className="text-xs font-bold text-green-500">{lead.lead_price}€</span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500">{lead.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {partnerLeads.length === 0 && (
            <div className="text-center text-zinc-500 text-sm py-8">No hay trabajos asignados a este partner</div>
          )}
        </div>
      </div>
    </div>
  )
}

function PartnerModal({
  partner,
  onClose,
  onSave,
}: {
  partner: Partner | null
  onClose: () => void
  onSave: (data: any) => void
}) {
  const [name, setName] = useState(partner?.name || "")
  const [phone, setPhone] = useState(partner?.phone || "")
  const [services, setServices] = useState<string[]>(partner?.services || [])
  const [cities, setCities] = useState(partner?.cities?.join(", ") || "")
  const [saving, setSaving] = useState(false)

  const allServices = ["fontanero", "electricista", "cerrajero", "desatasco", "calderas"]

  const toggleService = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service))
    } else {
      setServices([...services, service])
    }
  }

  const handleSave = async () => {
    if (!name || !phone || services.length === 0) return
    setSaving(true)
    await onSave({
      id: partner?.id,
      name,
      phone,
      services,
      cities: cities
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    })
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md border border-zinc-700 bg-zinc-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold tracking-wider text-[#FF4D00]">
            {partner ? "EDITAR PARTNER" : "NUEVO PARTNER"}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 block mb-1">NOMBRE</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan García"
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">TELÉFONO</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="612345678"
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-2">SERVICIOS</label>
            <div className="flex flex-wrap gap-2">
              {allServices.map((service) => (
                <button
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`px-3 py-1.5 text-xs font-medium border transition-colors capitalize ${
                    services.includes(service)
                      ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                      : "border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">CIUDADES (separadas por coma)</label>
            <input
              type="text"
              value={cities}
              onChange={(e) => setCities(e.target.value)}
              placeholder="Barcelona, Madrid, Valencia"
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !name || !phone || services.length === 0}
          className="w-full mt-6 py-3 bg-[#FF4D00] text-black font-bold tracking-wider hover:bg-[#FF4D00]/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "GUARDANDO..." : partner ? "ACTUALIZAR" : "CREAR PARTNER"}
        </button>
      </div>
    </div>
  )
}

function LeadModal({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: (data: any) => void
}) {
  const [mode, setMode] = useState<"manual" | "screenshot">("manual")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [service, setService] = useState("")
  const [problem, setProblem] = useState("")
  const [saving, setSaving] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const allServices = ["fontanero", "electricista", "cerrajero", "desatasco", "calderas"]

  const handleSave = async () => {
    if (!name || !phone || !service) return
    setSaving(true)
    await onSave({ name, phone, city, service, problem, source: mode === "screenshot" ? "screenshot" : "manual" })
    setSaving(false)
  }

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona una imagen")
      return
    }

    // Show preview
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    // Analyze with AI
    setAnalyzing(true)
    try {
      const formData = new FormData()
      formData.append("image", file)

      const res = await fetch("/api/0x/analyze-screenshot", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (data.success && data.lead) {
        setName(data.lead.name || "")
        setPhone(data.lead.phone || "")
        setCity(data.lead.city || "")
        setService(data.lead.service || "")
        setProblem(data.lead.problem || "")
      } else if (data.error) {
        alert(data.error)
      }
    } catch (error) {
      console.error("Error analyzing screenshot:", error)
      alert("Error al analizar la imagen")
    } finally {
      setAnalyzing(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile()
        if (file) handleFileSelect(file)
        break
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
      onPaste={handlePaste}
    >
      <div className="w-full sm:max-w-md h-[95vh] sm:h-auto overflow-y-auto border-t sm:border border-zinc-700 bg-zinc-900 p-4 sm:p-6 rounded-t-xl sm:rounded-none">
        <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold tracking-wider text-[#FF4D00]">NUEVO LEAD</h3>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode("manual")}
            className={`flex-1 py-2 text-xs font-medium border transition-colors flex items-center justify-center gap-2 ${
              mode === "manual"
                ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                : "border-zinc-700 hover:border-zinc-600 text-zinc-400"
            }`}
          >
            <Edit2 className="w-3 h-3" />
            MANUAL
          </button>
          <button
            onClick={() => setMode("screenshot")}
            className={`flex-1 py-2 text-xs font-medium border transition-colors flex items-center justify-center gap-2 ${
              mode === "screenshot"
                ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                : "border-zinc-700 hover:border-zinc-600 text-zinc-400"
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            CAPTURA IA
          </button>
        </div>

        {/* Screenshot upload area */}
        {mode === "screenshot" && (
          <div className="mb-4">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed p-4 text-center cursor-pointer transition-all ${
                dragOver ? "border-[#FF4D00] bg-[#FF4D00]/10" : "border-zinc-700 hover:border-zinc-600"
              }`}
            >
              {analyzing ? (
                <div className="flex flex-col items-center gap-2 py-4">
                  <Loader2 className="w-8 h-8 text-[#FF4D00] animate-spin" />
                  <p className="text-sm text-zinc-400">Analizando con IA...</p>
                </div>
              ) : previewUrl ? (
                <div className="space-y-2">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="max-h-32 mx-auto object-contain"
                  />
                  <p className="text-xs text-zinc-500">Click para cambiar imagen</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-4">
                  <Upload className="w-8 h-8 text-zinc-500" />
                  <p className="text-sm text-zinc-400">Arrastra una captura o haz click</p>
                  <p className="text-xs text-zinc-500">También puedes pegar (Ctrl+V)</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-500 block mb-1">NOMBRE *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan"
                className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">TELÉFONO *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="612345678"
                className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">CIUDAD</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Barcelona"
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-2">SERVICIO *</label>
            <div className="flex flex-wrap gap-2">
              {allServices.map((s) => (
                <button
                  key={s}
                  onClick={() => setService(s)}
                  className={`px-3 py-1.5 text-xs font-medium border transition-colors capitalize ${
                    service === s
                      ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                      : "border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">PROBLEMA</label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Describe el problema..."
              rows={2}
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || analyzing || !name || !phone || !service}
          className="w-full mt-6 py-3 bg-[#FF4D00] text-black font-bold tracking-wider hover:bg-[#FF4D00]/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "GUARDANDO..." : "CREAR LEAD"}
        </button>
      </div>
    </div>
  )
}

function LeadDetailModal({
  lead,
  partners,
  onClose,
  onSave,
  onStatusChange,
  onPartnerAssign,
  onDelete,
}: {
  lead: Lead
  partners: Partner[]
  onClose: () => void
  onSave: (data: Partial<Lead>) => void
  onStatusChange: (status: string) => void
  onPartnerAssign: (partnerId: string | null) => void
  onDelete: () => void
}) {
  const [activeModalTab, setActiveModalTab] = useState<"info" | "sequence">("info") // Renamed from activeTab
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(lead.name || "")
  const [phone, setPhone] = useState(lead.phone || "")
  const [city, setCity] = useState(lead.city || "")
  const [service, setService] = useState(lead.service || "")
  const [problem, setProblem] = useState(lead.problem || "")
  const [leadPrice, setLeadPrice] = useState(lead.lead_price || 0)
  const [serviceTime, setServiceTime] = useState(lead.service_time || "")
  const [commission, setCommission] = useState(lead.commission || 0)
  const [amountCharged, setAmountCharged] = useState(lead.amount_charged || 0)
  const [notes, setNotes] = useState(lead.notes || "")
  const [partnerId, setPartnerId] = useState(lead.partner_id || null)
  const [status, setStatus] = useState(lead.status || "pending")
  const [saving, setSaving] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [analyzingScreenshot, setAnalyzingScreenshot] = useState(false)
  const screenshotInputRef = useRef<HTMLInputElement>(null)

  // Sync state when lead prop changes
  useEffect(() => {
    setName(lead.name || "")
    setPhone(lead.phone || "")
    setCity(lead.city || "")
    setService(lead.service || "")
    setProblem(lead.problem || "")
    setLeadPrice(lead.lead_price || 0)
    setServiceTime(lead.service_time || "")
    setCommission(lead.commission || 0)
    setAmountCharged(lead.amount_charged || 0)
    setNotes(lead.notes || "")
    setPartnerId(lead.partner_id || null)
    setStatus(lead.status || "pending")
  }, [lead])

  const allServices = ["fontanero", "electricista", "cerrajero", "desatasco", "calderas"]

  const sourceLabels: Record<string, { label: string; color: string }> = {
    whatsapp: { label: "WhatsApp", color: "text-green-400" },
    call: { label: "Llamada", color: "text-blue-400" },
    chat: { label: "Chat IA", color: "text-purple-400" },
    manual: { label: "Manual", color: "text-zinc-400" },
    screenshot: { label: "Screenshot IA", color: "text-cyan-400" },
  }

  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: "Pendiente", color: "text-yellow-400" },
    contacted: { label: "Contactado", color: "text-blue-400" },
    pending_appointment: { label: "Pdte Cita", color: "text-cyan-400" },
    confirmed: { label: "Cita Confirmada", color: "text-purple-400" },
    completed: { label: "Trabajo Acabado", color: "text-orange-400" },
    paid: { label: "Pagado", color: "text-green-400" },
    rejected: { label: "Rechazado", color: "text-red-400" },
  }

  const sequenceMessages = [
    {
      step: 1,
      title: "Primer contacto",
      message: `Hola${name ? ` ${name}` : ""}, soy de RapidFix. He recibido tu solicitud. ¿Me puedes explicar un poco mas el problema que tienes? Si es posible, enviame unas fotos para poder valorarlo mejor.`,
      status: "pending",
    },
    {
      step: 2,
      title: "Preguntar ubicacion",
      message: `Perfecto, gracias por la informacion. ¿En que zona te encuentras exactamente? Asi puedo asignarte al tecnico mas cercano.`,
      status: "contacted",
    },
    {
      step: 3,
      title: "Confirmar disponibilidad",
      message: `Genial. Tenemos un tecnico disponible en tu zona. ¿Cuando te vendria bien que pasara? ¿Manana por la manana o por la tarde?`,
      status: "contacted",
    },
    {
      step: 4,
      title: "Confirmar cita",
      message: `Perfecto, te confirmo la cita para [FECHA Y HORA]. El tecnico se pondra en contacto contigo 30 minutos antes de llegar. ¿Te parece bien?`,
      status: "pending_appointment",
    },
    {
      step: 5,
      title: "Recordatorio cita",
      message: `Hola${name ? ` ${name}` : ""}, te recuerdo que manana tienes la cita con nuestro tecnico. Te llamara 30 min antes. ¿Todo correcto?`,
      status: "confirmed",
    },
    {
      step: 6,
      title: "Seguimiento post-servicio",
      message: `Hola${name ? ` ${name}` : ""}, ¿que tal ha ido el servicio? ¿Ha quedado todo solucionado? Tu opinion nos ayuda a mejorar.`,
      status: "completed",
    },
    {
      step: 7,
      title: "Solicitar valoracion",
      message: `Nos alegra que todo haya salido bien. Si tienes un minuto, nos ayudaria mucho que dejaras una valoracion. ¡Gracias por confiar en RapidFix!`,
      status: "paid",
    },
  ]

  const handleCopyMessage = (message: string, index: number) => {
    navigator.clipboard.writeText(message)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave({
        name,
        phone,
        city,
        service,
        problem,
        lead_price: leadPrice,
        service_time: serviceTime || null,
        commission,
        amount_charged: amountCharged,
        notes,
        partner_id: partnerId,
        status,
      })
      console.log("[v0] Lead saved successfully")
      setEditing(false)
    } catch (error) {
      console.error("[v0] Error saving lead:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleStatusChangeLocal = (newStatus: string) => {
    setStatus(newStatus)
    onStatusChange(newStatus)
  }

  const handlePartnerAssignLocal = (partnerId: string) => {
    setPartnerId(partnerId || null)
    onPartnerAssign(partnerId || null)
  }

  const handleScreenshotAnalysis = async (file: File) => {
    setAnalyzingScreenshot(true)
    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })

      const res = await fetch("/api/0x/analyze-screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      })

      if (res.ok) {
        const data = await res.json()
        // Update fields with extracted data (only if not empty)
        if (data.name) setName(data.name)
        if (data.phone) setPhone(data.phone)
        if (data.city) setCity(data.city)
        if (data.service) setService(data.service)
        if (data.problem) setProblem(data.problem)
        setEditing(true) // Enable editing mode to review
      }
    } catch (error) {
      console.error("Error analyzing screenshot:", error)
    }
    setAnalyzingScreenshot(false)
  }

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleScreenshotAnalysis(file)
  }

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith("image/")) {
            const file = items[i].getAsFile()
            if (file) handleScreenshotAnalysis(file)
            break
          }
        }
      }
    }
    window.addEventListener("paste", handlePaste)
    return () => window.removeEventListener("paste", handlePaste)
  }, [])

  const source = sourceLabels[lead.source || "chat"] || sourceLabels.chat
  const selectedStatus = statusLabels[status] || statusLabels.pending
  const partner = partners.find((p) => p.id === partnerId)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Service emojis for lead detail
  const serviceEmojis: Record<string, string> = {
    fontanero: "🔧",
    electricista: "⚡",
    cerrajero: "🔑",
    desatasco: "🚿",
    calderas: "🔥",
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-hidden border-t sm:border border-zinc-700 bg-zinc-900 flex flex-col rounded-t-xl sm:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mt-2 sm:hidden" />

        <div className="p-3 sm:p-4 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <span className="text-xl sm:text-2xl">{serviceEmojis[lead.service] || "📋"}</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {name || lead.name || "Sin nombre"}
              </h3>
              <p className="text-[10px] sm:text-xs text-zinc-500">{city || lead.city || "Sin ciudad"}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => screenshotInputRef.current?.click()}
              className="p-1.5 sm:p-2 border border-cyan-500/50 hover:bg-cyan-500/10 transition-colors"
              title="Actualizar desde captura"
            >
              {analyzingScreenshot ? (
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-500 animate-spin" />
              ) : (
                <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-500" />
              )}
            </button>
            <input
              ref={screenshotInputRef}
              type="file"
              accept="image/*"
              onChange={handleScreenshotUpload}
              className="hidden"
            />
            {editing ? (
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-3 py-1.5 sm:py-2 border border-green-500 bg-green-500/20 hover:bg-green-500/30 transition-colors flex items-center gap-1.5"
              >
                {saving ? (
                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 animate-spin" />
                ) : (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                )}
                <span className="text-xs font-bold text-green-500">GUARDAR</span>
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 sm:p-2 border border-zinc-700 hover:border-zinc-600 transition-colors"
                title="Editar"
              >
                <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF4D00]" />
              </button>
            )}
            {!editing && (
              <button onClick={onClose} className="p-1.5 sm:p-2 hover:bg-zinc-800 transition-colors">
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
              </button>
            )}
          </div>
        </div>

        <div className="flex border-b border-zinc-800 shrink-0">
          <button
            onClick={() => setActiveModalTab("info")}
            className={`flex-1 py-2.5 text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
              activeModalTab === "info"
                ? "text-[#FF4D00] border-b-2 border-[#FF4D00] bg-[#FF4D00]/5"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            INFO
          </button>
          <button
            onClick={() => setActiveModalTab("sequence")}
            className={`flex-1 py-2.5 text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
              activeModalTab === "sequence"
                ? "text-[#FF4D00] border-b-2 border-[#FF4D00] bg-[#FF4D00]/5"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            SECUENCIA
          </button>
        </div>

        {analyzingScreenshot && (
          <div className="p-3 bg-cyan-500/10 border-b border-cyan-500/30 flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="text-sm text-cyan-400">Analizando captura con IA...</span>
          </div>
        )}

        {activeModalTab === "info" && (
          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-2 gap-3 p-3 border border-[#FF4D00]/30 bg-[#FF4D00]/5">
              <div>
                <label className="text-[10px] text-zinc-500 block mb-1">COMISION ESTIMADA</label>
                {editing ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={commission}
                      onChange={(e) => setCommission(Number(e.target.value))}
                      className="w-full bg-zinc-800 border border-zinc-700 px-2 py-1.5 text-sm focus:border-[#FF4D00] outline-none"
                    />
                    <span className="text-[#FF4D00]">€</span>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-[#FF4D00]">{commission || 0}€</p>
                )}
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 block mb-1">IMPORTE COBRADO</label>
                {editing ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={amountCharged}
                      onChange={(e) => setAmountCharged(Number(e.target.value))}
                      className="w-full bg-zinc-800 border border-zinc-700 px-2 py-1.5 text-sm focus:border-green-500 outline-none"
                    />
                    <span className="text-green-500">€</span>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-green-500">{amountCharged || 0}€</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-500 block mb-1">NOMBRE</label>
                {editing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                  />
                ) : (
                  <p className="text-sm font-medium">{name || "Sin nombre"}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">TELEFONO</label>
                {editing ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm font-mono focus:border-[#FF4D00] outline-none"
                  />
                ) : (
                  <p className="text-sm font-mono">{phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-500 block mb-1">CIUDAD</label>
                {editing ? (
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                  />
                ) : (
                  <p className="text-sm">{city || "No especificada"}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">SERVICIO</label>
                {editing ? (
                  <div className="flex flex-wrap gap-1">
                    {allServices.map((s) => (
                      <button
                        key={s}
                        onClick={() => setService(s)}
                        className={`px-2 py-1 text-xs border transition-colors capitalize ${
                          service === s
                            ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                            : "border-zinc-700 hover:border-zinc-600"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm capitalize">{service}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-500 block mb-1">PROBLEMA</label>
              {editing ? (
                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  rows={3}
                  className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none resize-none"
                />
              ) : (
                <p className="text-sm text-zinc-300 bg-zinc-800/50 p-3 border border-zinc-800">
                  {problem || "Sin descripcion"}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-zinc-500 block mb-1">
                <FileText className="w-3 h-3" />
                NOTAS
              </label>
              {editing ? (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Añade notas sobre este lead..."
                  className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none resize-none"
                />
              ) : (
                <p className="text-sm text-zinc-300 bg-zinc-800/50 p-3 border border-zinc-800 min-h-[60px]">
                  {notes || "Sin notas"}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-500 block mb-1">PRECIO LEAD (€)</label>
                {editing ? (
                  <input
                    type="number"
                    value={leadPrice}
                    onChange={(e) => setLeadPrice(Number(e.target.value))}
                    className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                  />
                ) : (
                  <p className="text-sm font-bold text-[#FF4D00]">{leadPrice ? `${leadPrice}€` : "Sin precio"}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">FECHA SERVICIO</label>
                {editing ? (
                  <input
                    type="datetime-local"
                    value={serviceTime || ""}
                    onChange={(e) => setServiceTime(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                  />
                ) : (
                  <p className="text-sm">{serviceTime ? formatDate(serviceTime) : "No programado"}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
              <div>
                <label className="text-xs text-zinc-500 block mb-1">ESTADO</label>
                <select
                  value={status}
                  onChange={(e) => handleStatusChangeLocal(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                >
                  <option value="pending">Pendiente</option>
                  <option value="contacted">Contactado</option>
                  <option value="pending_appointment">Pendiente de Cita</option>
                  <option value="confirmed">Cita Confirmada</option>
                  <option value="completed">Trabajo Acabado</option>
                  <option value="paid">Pagado</option>
                  <option value="rejected">Rechazado</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">PARTNER ASIGNADO</label>
                <select
                  value={partnerId || ""}
                  onChange={(e) => handlePartnerAssignLocal(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                >
                  <option value="">Sin asignar</option>
                  {partners.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
              <div>
                <span className="block mb-1">CREADO</span>
                <span>{formatDate(lead.created_at)}</span>
              </div>
              {lead.requested_date && (
                <div>
                  <span className="block mb-1">FECHA SOLICITADA</span>
                  <span>{formatDate(lead.requested_date)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-zinc-800">
              <a
                href={`https://wa.me/34${phone?.replace(/\D/g, "")}?text=${encodeURIComponent(
                  `Hola ${name || ""}, soy de RapidFix. He visto tu solicitud de ${service}. ¿Cuando te vendria bien que pasara el tecnico?`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium text-center transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={`tel:+34${phone?.replace(/\D/g, "")}`}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium text-center transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Llamar
              </a>
              <button
                onClick={onDelete}
                className="py-2 px-4 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 text-red-400 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeModalTab === "sequence" && (
          <div className="p-4 space-y-3 overflow-y-auto flex-1">
            <div className="p-3 bg-zinc-800/50 border border-zinc-700 mb-4">
              <p className="text-xs text-zinc-400">
                Mensajes predefinidos para convertir leads en clientes. Haz clic en cualquier mensaje para copiarlo y
                pegarlo en WhatsApp.
              </p>
            </div>

            {sequenceMessages.map((seq, index) => {
              const isCurrentStatus = status === seq.status
              const isPastStatus =
                PIPELINE_STATUSES.findIndex((s) => s.key === status) >
                PIPELINE_STATUSES.findIndex((s) => s.key === seq.status)

              return (
                <div
                  key={index}
                  className={`p-3 border transition-all ${
                    isCurrentStatus
                      ? "border-[#FF4D00] bg-[#FF4D00]/10"
                      : isPastStatus
                        ? "border-zinc-700 bg-zinc-800/30 opacity-50"
                        : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full ${
                          isCurrentStatus
                            ? "bg-[#FF4D00] text-black"
                            : isPastStatus
                              ? "bg-zinc-600 text-zinc-400"
                              : "bg-zinc-700 text-zinc-300"
                        }`}
                      >
                        {seq.step}
                      </span>
                      <span className={`text-xs font-medium ${isCurrentStatus ? "text-[#FF4D00]" : "text-zinc-400"}`}>
                        {seq.title}
                      </span>
                    </div>
                    {isCurrentStatus && (
                      <span className="text-[10px] px-2 py-0.5 bg-[#FF4D00]/20 text-[#FF4D00] border border-[#FF4D00]/30">
                        ACTUAL
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-zinc-300 mb-3 leading-relaxed">{seq.message}</p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyMessage(seq.message, index)}
                      className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                        copiedIndex === index
                          ? "bg-green-600/20 border border-green-500/50 text-green-400"
                          : "bg-zinc-700/50 border border-zinc-600 hover:bg-zinc-700 text-zinc-300"
                      }`}
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3 h-3" />
                          COPIADO
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          COPIAR
                        </>
                      )}
                    </button>
                    <a
                      href={`https://wa.me/34${phone?.replace(/\D/g, "")}?text=${encodeURIComponent(seq.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 bg-green-600/20 border border-green-500/50 hover:bg-green-600/30 text-green-400 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" />
                      ENVIAR
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function LeadCard({
  lead,
  partners,
  onStatusChange,
  onPartnerAssign,
  onWhatsApp,
  onCopy,
  onTrash,
  onPriceChange,
  onExpand,
  copiedLeadId,
  updatingLeadId,
  onDragStart,
}: {
  lead: Lead
  partners: Partner[]
  onStatusChange: (leadId: string, status: string) => void
  onPartnerAssign: (leadId: string, partnerId: string) => void
  onWhatsApp: (lead: Lead) => void
  onCopy: (lead: Lead) => void
  onTrash: (leadId: string) => void
  onPriceChange: (leadId: string, price: number) => void
  onExpand: (leadId: string) => void
  copiedLeadId: string | null
  updatingLeadId: string | null
  onDragStart: (e: React.DragEvent) => void
}) {
  const serviceEmojis: Record<string, string> = {
    fontanero: "🔧",
    electricista: "⚡",
    cerrajero: "🔑",
    desatasco: "🚿",
    calderas: "🔥",
  }

  const sourceLabels: Record<string, { label: string; color: string }> = {
    whatsapp: { label: "WA", color: "text-green-400 border-green-500/30 bg-green-500/10" },
    call: { label: "TEL", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
    chat: { label: "CHAT", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
    manual: { label: "MAN", color: "text-zinc-400 border-zinc-500/30 bg-zinc-500/10" },
    screenshot: { label: "IA", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
  }

  const partner = partners.find((p) => p.id === lead.partner_id)
  const source = sourceLabels[lead.source || "chat"] || sourceLabels.chat

  const commission = Number(lead.commission) || 0
  const amountCharged = Number(lead.amount_charged) || 0
  const hasFinancials = commission > 0 || amountCharged > 0

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`p-2 sm:p-3 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/30 transition-all cursor-grab active:cursor-grabbing group ${
        updatingLeadId === lead.id ? "opacity-50" : ""
      }`}
      data-lead-id={lead.id}
      onClick={() => onExpand(lead.id)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-base sm:text-lg shrink-0">{serviceEmojis[lead.service] || "📋"}</span>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium truncate">{lead.name || "Sin nombre"}</p>
            <p className="text-[10px] text-zinc-500 truncate">{lead.city || "Sin ciudad"}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className={`text-[8px] px-1 py-0.5 border ${source.color}`}>{source.label}</span>
          <GripVertical className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
        </div>
      </div>

      {/* Phone always on one line, partner on separate line if exists */}
      <div className="mb-2">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-400">
          <Phone className="w-3 h-3 shrink-0" />
          <span className="font-mono whitespace-nowrap">{lead.phone || "Sin teléfono"}</span>
        </div>
        {partner && (
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs mt-1">
            <UserCheck className="w-3 h-3 text-[#FF4D00] shrink-0" />
            <span className="text-[#FF4D00] truncate">{partner.name}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-1 mb-2 text-[9px] sm:text-[10px]">
        <div className="bg-zinc-800/50 p-1 text-center border border-zinc-700/50">
          <p className="text-zinc-500 uppercase">Comisión</p>
          <p className={`font-bold ${commission > 0 ? "text-[#FF4D00]" : "text-zinc-600"}`}>{commission}€</p>
        </div>
        <div className="bg-zinc-800/50 p-1 text-center border border-zinc-700/50">
          <p className="text-zinc-500 uppercase">Cobrado</p>
          <p className={`font-bold ${amountCharged > 0 ? "text-green-500" : "text-zinc-600"}`}>{amountCharged}€</p>
        </div>
      </div>

      {lead.problem && <p className="text-[10px] text-zinc-500 mb-2 line-clamp-1 italic">"{lead.problem}"</p>}

      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onWhatsApp(lead)
          }}
          className="p-1.5 border border-green-500/50 hover:bg-green-500/10 transition-colors"
          title="WhatsApp"
        >
          <MessageCircle className="w-3 h-3 text-green-500" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onCopy(lead)
          }}
          className="p-1.5 border border-zinc-700 hover:border-zinc-600 transition-colors"
          title="Copiar"
        >
          {copiedLeadId === lead.id ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <Copy className="w-3 h-3 text-zinc-400" />
          )}
        </button>

        <select
          value={lead.partner_id || ""}
          onChange={(e) => {
            e.stopPropagation()
            onPartnerAssign(lead.id, e.target.value)
          }}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-1 py-1 text-[10px] focus:border-[#FF4D00] outline-none truncate"
        >
          <option value="">Asignar partner</option>
          {partners.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onTrash(lead.id)
          }}
          className="p-1.5 border border-zinc-700 hover:border-red-500 transition-colors"
          title="Eliminar"
        >
          <Trash2 className="w-3 h-3 text-red-500" />
        </button>
      </div>
    </div>
  )
}

function PipelineColumn({
  status,
  label,
  color,
  icon: Icon,
  leads,
  partners,
  revenue,
  onStatusChange,
  onPartnerAssign,
  onWhatsApp,
  onCopy,
  onTrash,
  onPriceChange,
  onExpand,
  copiedLeadId,
  updatingLeadId,
  onDrop,
  draggedLeadId,
  expanded,
}: {
  status: string
  label: string
  color: string
  icon: React.ElementType
  leads: Lead[]
  partners: Partner[]
  revenue?: number
  onStatusChange: (leadId: string, status: string) => void
  onPartnerAssign: (leadId: string, partnerId: string) => void
  onWhatsApp: (lead: Lead) => void
  onCopy: (lead: Lead) => void
  onTrash: (leadId: string) => void
  onPriceChange: (leadId: string, price: number) => void
  onExpand: (leadId: string) => void
  copiedLeadId: string | null
  updatingLeadId: string | null
  onDrop: (leadId: string, newStatus: string) => void
  draggedLeadId: string | null
  expanded?: boolean
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleColumnDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleColumnDragLeave = () => {
    setIsDragOver(false)
  }

  const handleColumnDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const leadId = e.dataTransfer.getData("leadId")
    if (leadId) {
      onDrop(leadId, status)
    }
  }

  const borderColors: Record<string, string> = {
    yellow: "border-l-yellow-500",
    blue: "border-l-blue-500",
    purple: "border-l-purple-500",
    orange: "border-l-orange-500",
    green: "border-l-green-500",
    red: "border-l-red-500",
    cyan: "border-l-cyan-500", // Added for new status
  }

  const textColors: Record<string, string> = {
    yellow: "text-yellow-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    green: "text-green-500",
    red: "text-red-500",
    cyan: "text-cyan-500", // Added for new status
  }

  const bgColorClasses: Record<string, string> = {
    yellow: "bg-yellow-500/5",
    blue: "bg-blue-500/5",
    purple: "bg-purple-500/5",
    orange: "bg-orange-500/5",
    green: "bg-green-500/5",
    red: "bg-red-500/5",
    cyan: "bg-cyan-500/5", // Added for new status
  }

  return (
    <div
      className={`flex flex-col border border-zinc-800 bg-zinc-900/30 ${expanded ? "h-full" : ""} min-w-[280px] sm:min-w-0`}
      onDragOver={handleColumnDragOver}
      onDragLeave={handleColumnDragLeave}
      onDrop={handleColumnDrop}
    >
      <div className={`p-2 sm:p-3 border-b shrink-0 ${borderColors[color]}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${textColors[color]}`} />
            <span className={`text-[10px] sm:text-xs font-bold tracking-wider ${textColors[color]}`}>{label}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className={`text-xs sm:text-sm font-bold ${textColors[color]}`}>{leads.length}</span>
            {revenue !== undefined && <span className="text-[10px] sm:text-xs text-zinc-500">({revenue}€)</span>}
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div
        className={`flex-1 overflow-y-auto p-2 space-y-2 min-h-0 transition-all ${
          isDragOver ? "ring-2 ring-[#FF4D00]/50 ring-inset" : ""
        }`}
      >
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            partners={partners}
            onStatusChange={onStatusChange}
            onPartnerAssign={onPartnerAssign}
            onWhatsApp={() => onWhatsApp(lead)}
            onCopy={() => onCopy(lead)}
            onTrash={() => onTrash(lead.id)}
            onPriceChange={(price) => onPriceChange(lead.id, price)}
            onExpand={onExpand}
            copiedLeadId={copiedLeadId}
            updatingLeadId={updatingLeadId}
            onDragStart={(e) => {
              e.dataTransfer.setData("leadId", lead.id)
            }}
            // isDragging={draggedLeadId === lead.id} // Removed as it's not used in the original code
          />
        ))}
        {leads.length === 0 && (
          <p className={`text-xs text-zinc-600 text-center py-8 ${isDragOver ? "text-[#FF4D00]" : ""}`}>
            {isDragOver ? "Soltar aquí" : `Sin ${label.toLowerCase()}`}
          </p>
        )}
      </div>
    </div>
  )
}

export function DashboardClient({ initialStats }: DashboardClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const defaultStats: Stats = {
    total: 0,
    sold: 0,
    revenue: 0,
    todayLeads: 0,
    todaySold: 0,
    todayRevenue: 0,
    todayPending: 0,
    todayPotential: 0,
    weekLeads: 0,
    weekSold: 0,
    weekRevenue: 0,
    weekPending: 0,
    weekPotential: 0,
    recentLeads: [],
    byService: [],
    funnelStats: [],
    partners: 0,
    partnersList: [],
    ownerTelegramId: "",
    conversionRate: "0",
    incompleteChats: [],
    dateRange: "all",
  }

  const [stats, setStats] = useState<Stats>(() => {
    if (initialStats && Array.isArray(initialStats.recentLeads)) {
      return initialStats
    }
    return defaultStats
  })

  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState<"pipeline" | "partners" | "config">("pipeline") // Added config tab
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [showPartnerModal, setShowPartnerModal] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null)
  const [serviceFilter, setServiceFilter] = useState<string>("all")
  const [showTrashed, setShowTrashed] = useState(false)
  const [copiedLeadId, setCopiedLeadId] = useState<string | null>(null)
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null) // Changed from selectedPartner
  const [kanbanExpanded, setKanbanExpanded] = useState(false)
  const [mobileColumnIndex, setMobileColumnIndex] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false) // Added refresh state

  const [activePhone, setActivePhone] = useState("phone1")
  const [phoneOptions, setPhoneOptions] = useState([
    { id: "phone1", label: "Telefono Principal", number: "936946639" },
    { id: "phone2", label: "Telefono Alternativo", number: "644536400" },
  ])
  const [savingPhone, setSavingPhone] = useState(false)
  const [loadingPhoneConfig, setLoadingPhoneConfig] = useState(true)

  useEffect(() => {
    const loadPhoneConfig = async () => {
      // Set loading state to true
      setLoadingPhoneConfig(true)
      try {
        const res = await fetch(PHONE_CONFIG_ENDPOINT)
        if (res.ok) {
          const contentType = res.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            const config = await res.json()
            console.log("[v0] Phone config loaded on mount:", config)
            if (config.activePhone) {
              console.log("[v0] Setting activePhone to:", config.activePhone)
              setActivePhone(config.activePhone)
            }
            if (config.phoneOptions && Array.isArray(config.phoneOptions)) {
              console.log("[v0] Setting phoneOptions to:", config.phoneOptions)
              setPhoneOptions(config.phoneOptions)
            }
          }
        }
      } catch (error) {
        console.error("Error loading phone config:", error)
      } finally {
        // Set loading state to false
        setLoadingPhoneConfig(false)
      }
    }
    loadPhoneConfig()
  }, [])

  useEffect(() => {
    console.log("[v0] Current activePhone state:", activePhone)
  }, [activePhone])

  const refreshData = useCallback(async () => {
    setIsRefreshing(true)
    try {
      // Add fetch for phone config
      const phoneRes = await fetch(PHONE_CONFIG_ENDPOINT)
      let phoneConfig: PhoneConfig | null = null
      if (phoneRes.ok) {
        const contentType = phoneRes.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          phoneConfig = await phoneRes.json()
        }
      }

      const params = new URLSearchParams(searchParams.toString())
      const res = await fetch(`/api/0x/dashboard?${params.toString()}`) // Use searchParams here for dynamic range
      if (!res.ok) {
        setIsRefreshing(false)
        return
      }

      const contentType = res.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        setIsRefreshing(false)
        return
      }

      const data = await res.json()

      setStats({
        ...defaultStats,
        ...data,
        recentLeads: Array.isArray(data.recentLeads) ? data.recentLeads : [],
        partnersList: Array.isArray(data.partnersList) ? data.partnersList : [],
        byService: Array.isArray(data.byService) ? data.byService : [],
        funnelStats: Array.isArray(data.funnelStats) ? data.funnelStats : [],
        incompleteChats: Array.isArray(data.incompleteChats) ? data.incompleteChats : [],
      })

      // Update phone config state if fetched
      if (phoneConfig) {
        setActivePhone(phoneConfig.activePhone || "phone1")
        if (phoneConfig.phoneOptions && Array.isArray(phoneConfig.phoneOptions)) {
          setPhoneOptions(phoneConfig.phoneOptions)
        }
      }
    } catch (error) {
      console.error("Error refreshing data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }, [defaultStats, searchParams]) // Include searchParams here

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshData()
      }
    }

    const handleFocus = () => {
      refreshData()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleFocus)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleFocus)
    }
  }, [refreshData])

  const [dateFilterOpen, setDateFilterOpen] = useState(false)
  const dateButtonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null)
  const dateFilterRef = useRef<HTMLDivElement>(null)
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null)

  const expandedLead = expandedLeadId ? (stats.recentLeads || []).find((l) => l.id === expandedLeadId) || null : null
  const selectedPartner = selectedPartnerId ? (stats.partnersList || []).find((p) => p.id === selectedPartnerId) : null // Use selectedPartnerId

  const serviceEmojis: Record<string, string> = {
    fontanero: "🔧",
    electricista: "⚡",
    cerrajero: "🔑",
    desatasco: "🚿",
    calderas: "🔥",
  }

  const fetchData = async () => {
    try {
      const params = new URLSearchParams(searchParams.toString())
      const res = await fetch(`/api/0x/dashboard?${params.toString()}`)

      if (!res.ok) return

      const contentType = res.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) return

      const data = await res.json()

      setStats({
        ...defaultStats,
        ...data,
        recentLeads: Array.isArray(data.recentLeads) ? data.recentLeads : [],
        partnersList: Array.isArray(data.partnersList) ? data.partnersList : [],
        byService: Array.isArray(data.byService) ? data.byService : [],
        funnelStats: Array.isArray(data.funnelStats) ? data.funnelStats : [],
        incompleteChats: Array.isArray(data.incompleteChats) ? data.incompleteChats : [],
      })
    } catch (error) {
      // Silent fail - keep existing data
    }
  }

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const range = searchParams.get("range")
    if (range) {
      fetchData()
    }
  }, [searchParams])

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateFilterRef.current && !dateFilterRef.current.contains(event.target as Node)) {
        setDateFilterOpen(false)
      }
    }

    if (dateFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dateFilterOpen])

  useEffect(() => {
    if (dateFilterOpen && dateButtonRef.current) {
      const rect = dateButtonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      })
    }
  }, [dateFilterOpen])

  const handleDateFilter = (range: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (range === "all") {
      params.delete("range")
    } else {
      params.set("range", range)
    }
    router.push(`/0x/dashboard?${params.toString()}`)
    setDateFilterOpen(false)
  }

  const dateRangeLabels: Record<string, string> = {
    today: "Hoy",
    yesterday: "Ayer",
    week: "7 días",
    month: "30 días",
    all: "Todo",
  }

  const handleLogout = async () => {
    await fetch("/api/0x/auth", { method: "DELETE" })
    router.push("/0x")
  }

  const openWhatsAppLead = (lead: Lead) => {
    const phone = lead.phone?.replace(/\D/g, "") || ""
    const phoneWithCountry = phone.startsWith("34") ? phone : `34${phone}`
    const message = encodeURIComponent(
      `Hola! Veo que has solicitado servicio de ${lead.service || "urgencia"} en ${lead.city || "tu zona"}. Te escribo para confirmar si todavía necesitas el servicio.`,
    )
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, "_blank")
  }

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setStats((prev) => ({
      ...prev,
      recentLeads: prev.recentLeads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)),
    }))

    try {
      const res = await fetch("/api/0x/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: newStatus }),
      })
      const result = await res.json()
      if (!result.success) {
        setNotification({ type: "error", message: result.error || "Error al actualizar" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handlePartnerAssign = async (leadId: string, partnerId: string) => {
    setStats((prev) => ({
      ...prev,
      recentLeads: prev.recentLeads.map((lead) =>
        lead.id === leadId ? { ...lead, partner_id: partnerId || null } : lead,
      ),
    }))

    try {
      const res = await fetch("/api/0x/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, partnerId: partnerId || null }),
      })
      const result = await res.json()
      if (!result.success) {
        setNotification({ type: "error", message: result.error || "Error al asignar" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleUpdateLead = async (leadId: string, data: Partial<Lead>) => {
    try {
      console.log("[v0] HandleUpdateLead sending:", { id: leadId, ...data })
      const res = await fetch("/api/0x/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, ...data }),
      })
      const result = await res.json()
      console.log("[v0] HandleUpdateLead response:", result)

      if (res.ok && result.success && result.lead) {
        setStats((prev) => ({
          ...prev,
          recentLeads: prev.recentLeads.map((lead) => (lead.id === leadId ? { ...lead, ...result.lead } : lead)),
        }))
        setNotification({ type: "success", message: "Lead actualizado" })
      } else {
        setNotification({ type: "error", message: result.error || "Error al actualizar lead" })
      }
    } catch (error) {
      console.error("[v0] HandleUpdateLead error:", error)
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleSavePartner = async (data: any) => {
    try {
      const res = await fetch("/api/0x/manual-partners", {
        method: data.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result.success) {
        setNotification({ type: "success", message: data.id ? "Partner actualizado" : "Partner creado" })
        setShowPartnerModal(false)
        setEditingPartner(null)
        if (data.id) {
          setStats((prev) => ({
            ...prev,
            partnersList: prev.partnersList.map((p) => (p.id === data.id ? { ...p, ...data } : p)),
          }))
        } else if (result.partner) {
          setStats((prev) => ({
            ...prev,
            partnersList: [...prev.partnersList, result.partner],
          }))
        }
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleDeletePartner = async (partnerId: string) => {
    if (!confirm("¿Seguro que quieres eliminar este partner?")) return

    try {
      const res = await fetch("/api/0x/manual-partners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId }),
      })

      const result = await res.json()

      if (result.success) {
        setNotification({ type: "success", message: "Partner eliminado" })
        setStats((prev) => ({
          ...prev,
          partnersList: prev.partnersList.filter((p) => p.id !== partnerId),
        }))
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleSaveManualLead = async (data: any) => {
    try {
      const res = await fetch("/api/0x/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result.success) {
        setNotification({ type: "success", message: "Lead creado correctamente" })
        setShowLeadModal(false)
        if (result.lead) {
          setStats((prev) => ({
            ...prev,
            recentLeads: [result.lead, ...prev.recentLeads],
          }))
        }
      } else {
        setNotification({ type: "error", message: result.error || "Error al crear lead" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleCopyLead = (lead: Lead) => {
    const message = `🚨 *NUEVO TRABAJO* 🚨

${serviceEmojis[lead.service] || "📋"} *Servicio:* ${lead.service?.toUpperCase()}
📍 *Zona:* ${lead.city}

📝 *Problema:*
${lead.problem?.slice(0, 150)}

✅ *Reacciona si estás disponible*`

    navigator.clipboard.writeText(message)
    setCopiedLeadId(lead.id)
    setTimeout(() => setCopiedLeadId(null), 2000)
  }

  const handlePriceChange = async (leadId: string, price: number) => {
    setStats((prev) => ({
      ...prev,
      recentLeads: prev.recentLeads.map((lead) => (lead.id === leadId ? { ...lead, lead_price: price } : lead)),
    }))

    try {
      const res = await fetch("/api/0x/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, lead_price: price }),
      })
      const data = await res.json()
      if (!data.success) {
        setNotification({ type: "error", message: data.error || "Error al actualizar precio" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleTrashLead = async (leadId: string, restore = false) => {
    setStats((prev) => ({
      ...prev,
      recentLeads: prev.recentLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: restore ? "pending" : "trashed" } : lead,
      ),
    }))

    if (expandedLeadId === leadId) {
      setExpandedLeadId(null)
    }

    try {
      const res = await fetch("/api/0x/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: restore ? "pending" : "trashed" }),
      })
      const result = await res.json()
      if (result.success) {
        setNotification({ type: "success", message: restore ? "Lead restaurado" : "Lead eliminado" })
      } else {
        setNotification({ type: "error", message: result.error || "Error" })
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error de conexión" })
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const handleDrop = (leadId: string, newStatus: string) => {
    setDraggedLeadId(null)
    handleStatusChange(leadId, newStatus)
  }

  // Computed values from stats
  const recentLeads = stats.recentLeads || []
  const partnersList = stats.partnersList || []

  const filteredLeads = serviceFilter === "all" ? recentLeads : recentLeads.filter((l) => l.service === serviceFilter)

  const activeLeads = filteredLeads.filter((l) => l.status !== "trashed" && l.status !== "rejected")
  const trashedLeads = filteredLeads.filter((l) => l.status === "trashed")

  const pendingLeads = activeLeads.filter((l) => l.status === "pending")
  const contactedLeads = activeLeads.filter((l) => l.status === "contacted")
  const pendingAppointmentLeads = activeLeads.filter((l) => l.status === "pending_appointment") // New status
  const confirmedLeads = activeLeads.filter((l) => l.status === "confirmed")
  const completedLeads = activeLeads.filter((l) => l.status === "completed")
  const paidLeads = activeLeads.filter((l) => l.status === "paid")
  const rejectedLeads = filteredLeads.filter((l) => l.status === "rejected")

  // Calculate totals for new KPIs
  const totalCommission = recentLeads.reduce((sum, l) => sum + (Number(l.commission) || 0), 0)
  const totalCharged = recentLeads.reduce((sum, l) => sum + (Number(l.amount_charged) || 0), 0)

  const pendingRevenue = [...pendingLeads, ...contactedLeads, ...pendingAppointmentLeads, ...confirmedLeads].reduce(
    // Updated
    (sum, l) => sum + (Number(l.lead_price) || 0),
    0,
  )
  const completedRevenue = completedLeads.reduce((sum, l) => sum + (Number(l.lead_price) || 0), 0)
  const totalRevenue = paidLeads.reduce((sum, l) => sum + (Number(l.lead_price) || 0), 0)
  const todayLeadsCount = activeLeads.filter((l) => {
    const today = new Date()
    const leadDate = new Date(l.created_at)
    return leadDate.toDateString() === today.toDateString()
  }).length

  // Phone config save handler
  const handleSavePhoneConfig = async () => {
    setSavingPhone(true)
    try {
      console.log("[v0] Saving phone config:", { activePhone, phoneOptions })
      const res = await fetch(PHONE_CONFIG_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activePhone, phoneOptions }),
      })
      const result = await res.json()
      console.log("[v0] Phone config save response:", result)
      if (res.ok && result.success) {
        setNotification({ type: "success", message: "Configuración de teléfonos guardada" })
      } else {
        setNotification({ type: "error", message: result.error || "Error al guardar la configuración" })
      }
    } catch (error) {
      console.error("Error saving phone config:", error)
      setNotification({ type: "error", message: "Error de conexión" })
    } finally {
      setSavingPhone(false)
      setTimeout(() => setNotification(null), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
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

      {showPartnerModal && (
        <PartnerModal
          partner={editingPartner}
          onClose={() => {
            setShowPartnerModal(false)
            setEditingPartner(null)
          }}
          onSave={handleSavePartner}
        />
      )}

      {showLeadModal && <LeadModal onClose={() => setShowLeadModal(false)} onSave={handleSaveManualLead} />}

      {expandedLead && (
        <LeadDetailModal
          lead={expandedLead}
          partners={partnersList}
          onClose={() => setExpandedLeadId(null)}
          onSave={(data) => handleUpdateLead(expandedLead.id, data)}
          onStatusChange={(status) => handleStatusChange(expandedLead.id, status)}
          onPartnerAssign={(partnerId) => handlePartnerAssign(expandedLead.id, partnerId)}
          onDelete={() => handleTrashLead(expandedLead.id)}
        />
      )}

      {selectedPartner && (
        <PartnerDetailModal
          partner={selectedPartner}
          leads={recentLeads}
          onClose={() => setSelectedPartnerId(null)} // Changed to clear selectedPartnerId
          onLeadClick={(leadId) => {
            setSelectedPartnerId(null) // Changed to clear selectedPartnerId
            setExpandedLeadId(leadId)
          }}
        />
      )}

      <header className="border-b border-zinc-800 px-2 sm:px-4 lg:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D00]" />
            <h1 className="text-xs sm:text-sm font-bold tracking-wider">
              <span className="hidden sm:inline">URGENCIAS</span> 24H
            </h1>
          </div>
          {/* CHANGE: Added refresh button */}
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="p-1.5 hover:bg-zinc-800 transition-colors disabled:opacity-50"
            title="Recargar datos"
          >
            <RotateCcw className={`w-4 h-4 text-zinc-400 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
          {isRefreshing && <span className="text-[10px] text-zinc-500 hidden sm:inline">Actualizando...</span>}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative" ref={dateFilterRef}>
            <button
              ref={dateButtonRef}
              onClick={() => setDateFilterOpen(!dateFilterOpen)}
              className="flex items-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 border border-zinc-700 bg-zinc-900 hover:border-zinc-600 transition-colors text-[10px] sm:text-xs"
            >
              <Filter className="w-3 h-3" />
              <span className="hidden sm:inline">{dateRangeLabels[stats.dateRange] || "Todo"}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${dateFilterOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className="text-right hidden md:block">
            <p className="text-xs text-zinc-500">ACTIVO</p>
            <p className="text-xs font-mono text-[#FF4D00]">
              {currentTime.toLocaleTimeString("es-ES", { hour12: false })}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 sm:p-2 border border-zinc-700 hover:border-red-500/50 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
          </button>
        </div>
      </header>

      {dateFilterOpen && (
        <div
          className="fixed w-32 border border-zinc-700 bg-zinc-900 z-[9999] shadow-2xl"
          style={{ top: dropdownPosition.top, right: dropdownPosition.right }}
        >
          {Object.entries(dateRangeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleDateFilter(key)}
              className={`w-full px-3 py-2 text-left text-xs hover:bg-zinc-800 ${
                stats.dateRange === key ? "text-[#FF4D00]" : "text-zinc-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <main className="relative px-2 sm:px-4 lg:px-6 py-2 sm:py-4 space-y-2 sm:space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 sm:gap-2">
          <KPICard label="HOY" value={todayLeadsCount} icon={<Activity className="w-4 h-4" />} color="orange" />
          <KPICard
            label="PENDIENTES"
            value={pendingLeads.length + contactedLeads.length + pendingAppointmentLeads.length}
            subvalue={`${pendingRevenue}€ pot.`}
            icon={<Clock className="w-4 h-4" />}
            color="yellow"
          />
          <KPICard
            label="PDTE CITA"
            value={pendingAppointmentLeads.length}
            icon={<Calendar className="w-4 h-4" />}
            color="cyan"
          />
          <KPICard label="CITAS" value={confirmedLeads.length} icon={<Calendar className="w-4 h-4" />} color="purple" />
          <KPICard
            label="PDTE PAGO"
            value={completedLeads.length}
            subvalue={`${completedRevenue}€`}
            icon={<CheckCircle className="w-4 h-4" />}
            color="orange"
          />
          <KPICard
            label="PAGADOS"
            value={paidLeads.length}
            subvalue={`${totalRevenue}€`}
            icon={<DollarSign className="w-4 h-4" />}
            color="green"
          />
          <KPICard label="PARTNERS" value={partnersList.length} icon={<Users className="w-4 h-4" />} color="zinc" />
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          <KPICard
            label="COMISION"
            value={`${totalCommission.toFixed(0)}€`}
            icon={<Euro className="w-4 h-4" />}
            color="orange"
          />
          <KPICard
            label="COBRADO"
            value={`${totalCharged.toFixed(0)}€`}
            icon={<DollarSign className="w-4 h-4" />}
            color="green"
          />
          {/* Removed clientCost KPI card */}
        </div>

        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 overflow-x-auto">
          <div className="flex gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => {
                setActiveTab("pipeline")
                setShowTrashed(false)
              }}
              className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "pipeline" ? "text-[#FF4D00]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Pipeline ({activeLeads.length})
            </button>
            <button
              onClick={() => setActiveTab("partners")}
              className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "partners" ? "text-[#FF4D00]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Partners ({partnersList.length})
            </button>
            {/* Add "Config" tab button after "Partners" */}
            <button
              onClick={() => setActiveTab("config")}
              className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "config" ? "text-[#FF4D00]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Config
            </button>
          </div>

          {activeTab === "pipeline" && !kanbanExpanded && !showTrashed && (
            <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-2">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs focus:border-[#FF4D00] outline-none"
              >
                <option value="all">Todos</option>
                <option value="fontanero">🔧</option>
                <option value="electricista">⚡</option>
                <option value="cerrajero">🔑</option>
                <option value="desatasco">🚿</option>
                <option value="calderas">🔥</option>
              </select>

              <button
                onClick={() => setShowTrashed(!showTrashed)}
                className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs border transition-colors ${
                  showTrashed ? "border-red-500 text-red-500" : "border-zinc-700 text-zinc-500"
                }`}
              >
                <Trash2 className="w-3 h-3" />
                <span className="hidden sm:inline">{trashedLeads.length + rejectedLeads.length}</span>
              </button>

              <button
                onClick={() => setKanbanExpanded(true)}
                className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs border border-zinc-700 hover:border-[#FF4D00] transition-colors"
                title="Maximizar kanban"
              >
                <Maximize2 className="w-3 h-3" />
              </button>

              <button
                onClick={() => setShowLeadModal(true)}
                className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold bg-[#FF4D00] text-black"
              >
                <Plus className="w-3 h-3" />
                <span className="hidden sm:inline">LEAD</span>
              </button>
            </div>
          )}
        </div>

        {!kanbanExpanded && activeTab === "pipeline" && !showTrashed && (
          <>
            {/* Mobile column navigation */}
            <div className="flex items-center justify-between mb-2 sm:hidden">
              <button
                onClick={() => setMobileColumnIndex(Math.max(0, mobileColumnIndex - 1))}
                disabled={mobileColumnIndex === 0}
                className="p-1.5 border border-zinc-700 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1">
                {PIPELINE_STATUSES.map((s, i) => (
                  <button
                    key={s.key}
                    onClick={() => setMobileColumnIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      mobileColumnIndex === i ? "bg-[#FF4D00]" : "bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setMobileColumnIndex(Math.min(PIPELINE_STATUSES.length - 1, mobileColumnIndex + 1))}
                disabled={mobileColumnIndex === PIPELINE_STATUSES.length - 1}
                className="p-1.5 border border-zinc-700 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Desktop: grid, Mobile: horizontal scroll */}
            <div
              className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 h-[calc(100vh-320px)] sm:h-[calc(100vh-280px)] min-h-[300px] sm:min-h-[400px]"
              onDragStart={(e) => {
                const leadId = (e.target as HTMLElement).closest("[draggable]")?.getAttribute("data-lead-id")
                if (leadId) setDraggedLeadId(leadId)
              }}
              onDragEnd={() => setDraggedLeadId(null)}
            >
              <PipelineColumn
                status="pending"
                label="PENDIENTE"
                color="yellow"
                icon={Clock}
                leads={pendingLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
              />
              <PipelineColumn
                status="contacted"
                label="CONTACTADO"
                color="blue"
                icon={Phone}
                leads={contactedLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
              />
              <PipelineColumn
                status="pending_appointment"
                label="PDTE CITA"
                color="cyan"
                icon={Calendar}
                leads={pendingAppointmentLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
              />
              <PipelineColumn
                status="confirmed"
                label="CITA"
                color="purple"
                icon={Calendar}
                leads={confirmedLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
              />
              <PipelineColumn
                status="completed"
                label="PDTE PAGO"
                color="orange"
                icon={CheckCircle}
                leads={completedLeads}
                partners={partnersList}
                revenue={completedRevenue}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
              />
              <PipelineColumn
                status="paid"
                label="PAGADO"
                color="green"
                icon={CreditCard}
                leads={paidLeads}
                partners={partnersList}
                revenue={totalRevenue}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
              />
            </div>

            {/* Mobile: Single column view with swipe navigation */}
            <div className="sm:hidden h-[calc(100vh-380px)] min-h-[300px]">
              {mobileColumnIndex === 0 && (
                <PipelineColumn
                  status="pending"
                  label="PENDIENTE"
                  color="yellow"
                  icon={Clock}
                  leads={pendingLeads}
                  partners={partnersList}
                  onStatusChange={handleStatusChange}
                  onPartnerAssign={handlePartnerAssign}
                  onWhatsApp={openWhatsAppLead}
                  onCopy={handleCopyLead}
                  onTrash={handleTrashLead}
                  onPriceChange={handlePriceChange}
                  onExpand={setExpandedLeadId}
                  copiedLeadId={copiedLeadId}
                  updatingLeadId={updatingLeadId}
                  onDrop={handleDrop}
                  draggedLeadId={draggedLeadId}
                />
              )}
              {mobileColumnIndex === 1 && (
                <PipelineColumn
                  status="contacted"
                  label="CONTACTADO"
                  color="blue"
                  icon={Phone}
                  leads={contactedLeads}
                  partners={partnersList}
                  onStatusChange={handleStatusChange}
                  onPartnerAssign={handlePartnerAssign}
                  onWhatsApp={openWhatsAppLead}
                  onCopy={handleCopyLead}
                  onTrash={handleTrashLead}
                  onPriceChange={handlePriceChange}
                  onExpand={setExpandedLeadId}
                  copiedLeadId={copiedLeadId}
                  updatingLeadId={updatingLeadId}
                  onDrop={handleDrop}
                  draggedLeadId={draggedLeadId}
                />
              )}
              {mobileColumnIndex === 2 && (
                <PipelineColumn
                  status="pending_appointment"
                  label="PDTE CITA"
                  color="cyan"
                  icon={Calendar}
                  leads={pendingAppointmentLeads}
                  partners={partnersList}
                  onStatusChange={handleStatusChange}
                  onPartnerAssign={handlePartnerAssign}
                  onWhatsApp={openWhatsAppLead}
                  onCopy={handleCopyLead}
                  onTrash={handleTrashLead}
                  onPriceChange={handlePriceChange}
                  onExpand={setExpandedLeadId}
                  copiedLeadId={copiedLeadId}
                  updatingLeadId={updatingLeadId}
                  onDrop={handleDrop}
                  draggedLeadId={draggedLeadId}
                />
              )}
              {mobileColumnIndex === 3 && (
                <PipelineColumn
                  status="confirmed"
                  label="CITA"
                  color="purple"
                  icon={Calendar}
                  leads={confirmedLeads}
                  partners={partnersList}
                  onStatusChange={handleStatusChange}
                  onPartnerAssign={handlePartnerAssign}
                  onWhatsApp={openWhatsAppLead}
                  onCopy={handleCopyLead}
                  onTrash={handleTrashLead}
                  onPriceChange={handlePriceChange}
                  onExpand={setExpandedLeadId}
                  copiedLeadId={copiedLeadId}
                  updatingLeadId={updatingLeadId}
                  onDrop={handleDrop}
                  draggedLeadId={draggedLeadId}
                />
              )}
              {mobileColumnIndex === 4 && (
                <PipelineColumn
                  status="completed"
                  label="PDTE PAGO"
                  color="orange"
                  icon={CheckCircle}
                  leads={completedLeads}
                  partners={partnersList}
                  revenue={completedRevenue}
                  onStatusChange={handleStatusChange}
                  onPartnerAssign={handlePartnerAssign}
                  onWhatsApp={openWhatsAppLead}
                  onCopy={handleCopyLead}
                  onTrash={handleTrashLead}
                  onPriceChange={handlePriceChange}
                  onExpand={setExpandedLeadId}
                  copiedLeadId={copiedLeadId}
                  updatingLeadId={updatingLeadId}
                  onDrop={handleDrop}
                  draggedLeadId={draggedLeadId}
                />
              )}
              {mobileColumnIndex === 5 && (
                <PipelineColumn
                  status="paid"
                  label="PAGADO"
                  color="green"
                  icon={CreditCard}
                  leads={paidLeads}
                  partners={partnersList}
                  revenue={totalRevenue}
                  onStatusChange={handleStatusChange}
                  onPartnerAssign={handlePartnerAssign}
                  onWhatsApp={openWhatsAppLead}
                  onCopy={handleCopyLead}
                  onTrash={handleTrashLead}
                  onPriceChange={handlePriceChange}
                  onExpand={setExpandedLeadId}
                  copiedLeadId={copiedLeadId}
                  updatingLeadId={updatingLeadId}
                  onDrop={handleDrop}
                  draggedLeadId={draggedLeadId}
                />
              )}
            </div>
          </>
        )}

        {kanbanExpanded && activeTab === "pipeline" && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900 shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="text-sm font-bold text-white">Pipeline Completo</h2>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="text-xs bg-zinc-800 border border-zinc-700 px-2 py-1 text-zinc-300"
                >
                  <option value="all">Todos</option>
                  <option value="fontanero">Fontanero</option>
                  <option value="electricista">Electricista</option>
                  <option value="desatascos">Desatascos</option>
                  <option value="calderas">Calderas</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLeadModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90"
                >
                  <Plus className="w-3 h-3" />
                  Lead
                </button>
                <button
                  onClick={() => setKanbanExpanded(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Grid - takes all remaining height */}
            <div
              className="flex-1 grid grid-cols-6 gap-3 p-4 min-h-0 overflow-hidden"
              onDragStart={(e) => {
                const leadId = (e.target as HTMLElement).closest("[draggable]")?.getAttribute("data-lead-id")
                if (leadId) setDraggedLeadId(leadId)
              }}
              onDragEnd={() => setDraggedLeadId(null)}
            >
              <PipelineColumn
                status="pending"
                label="PENDIENTE"
                color="yellow"
                icon={Clock}
                leads={pendingLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
              <PipelineColumn
                status="contacted"
                label="CONTACTADO"
                color="blue"
                icon={Phone}
                leads={contactedLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
              <PipelineColumn
                status="pending_appointment"
                label="PDTE CITA"
                color="cyan"
                icon={Calendar}
                leads={pendingAppointmentLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
              <PipelineColumn
                status="confirmed"
                label="CITA"
                color="purple"
                icon={Calendar}
                leads={confirmedLeads}
                partners={partnersList}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
              <PipelineColumn
                status="completed"
                label="PDTE PAGO"
                color="orange"
                icon={CheckCircle}
                leads={completedLeads}
                partners={partnersList}
                revenue={completedRevenue}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
              <PipelineColumn
                status="paid"
                label="PAGADO"
                color="green"
                icon={CreditCard}
                leads={paidLeads}
                partners={partnersList}
                revenue={totalRevenue}
                onStatusChange={handleStatusChange}
                onPartnerAssign={handlePartnerAssign}
                onWhatsApp={openWhatsAppLead}
                onCopy={handleCopyLead}
                onTrash={handleTrashLead}
                onPriceChange={handlePriceChange}
                onExpand={setExpandedLeadId}
                copiedLeadId={copiedLeadId}
                updatingLeadId={updatingLeadId}
                onDrop={handleDrop}
                draggedLeadId={draggedLeadId}
                expanded
              />
            </div>
          </div>
        )}

        {activeTab === "pipeline" && showTrashed && (
          <div className="border border-zinc-800 bg-zinc-900/30">
            <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-xs font-bold text-red-500">
                PAPELERA Y RECHAZADOS ({trashedLeads.length + rejectedLeads.length})
              </h3>
              <button onClick={() => setShowTrashed(false)} className="text-xs text-zinc-500 hover:text-zinc-300">
                ← Volver
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
              {[...trashedLeads, ...rejectedLeads].map((lead) => (
                <div key={lead.id} className="p-3 border border-zinc-800 bg-zinc-900/30 opacity-60">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{serviceEmojis[lead.service] || "📋"}</span>
                    <span className="text-sm font-medium">{lead.name}</span>
                    <span className="text-xs text-zinc-500">{lead.city}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 border ml-auto ${lead.status === "rejected" ? "border-red-500/30 text-red-400" : "border-zinc-700 text-zinc-500"}`}
                    >
                      {lead.status === "rejected" ? "Rechazado" : "Eliminado"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTrashLead(lead.id, true)}
                    className="flex items-center gap-1 px-2 py-1 text-xs border border-green-500/30 text-green-500 hover:bg-green-500/10"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Restaurar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "partners" && (
          <div className="border border-zinc-800 bg-zinc-900/30">
            <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-400">PARTNERS</h3>
              <button
                onClick={() => setShowPartnerModal(true)}
                className="flex items-center gap-1 px-2 py-1 text-xs font-bold bg-[#FF4D00] text-black"
              >
                <Plus className="w-3 h-3" />
                NUEVO
              </button>
            </div>
            <div className="divide-y divide-zinc-800/50">
              {partnersList.map((partner) => {
                const partnerLeads = recentLeads.filter((l) => l.partner_id === partner.id && l.status !== "trashed")
                const partnerPending = partnerLeads.filter(
                  (l) => ["pending", "contacted", "pending_appointment", "confirmed"].includes(l.status), // Updated
                ).length
                const partnerCompleted = partnerLeads.filter((l) => l.status === "completed").length
                const partnerPaid = partnerLeads.filter((l) => l.status === "paid").length
                const partnerCompletedRevenue = partnerLeads
                  .filter((l) => l.status === "completed")
                  .reduce((s, l) => s + (Number(l.lead_price) || 0), 0)

                return (
                  <div
                    key={partner.id}
                    className="p-3 hover:bg-zinc-800/20 transition-colors cursor-pointer"
                    onClick={() => setSelectedPartnerId(partner.id)} // Changed to set selectedPartnerId
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{partner.name}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 border ${
                              partner.active
                                ? "border-green-500/30 text-green-400 bg-green-500/10"
                                : "border-red-500/30 text-red-400 bg-red-500/10"
                            }`}
                          >
                            {partner.active ? "ACTIVO" : "INACTIVO"}
                          </span>
                          {partnerPending > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 border border-yellow-500/30 text-yellow-400 bg-yellow-500/10">
                              {partnerPending} en proceso
                            </span>
                          )}
                          {partnerCompleted > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 border border-orange-500/30 text-orange-400 bg-orange-500/10">
                              {partnerCompleted} pdte pago ({partnerCompletedRevenue}€)
                            </span>
                          )}
                          {partnerPaid > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 border border-green-500/30 text-green-400 bg-green-500/10">
                              {partnerPaid} pagados
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {partner.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            {partner.services?.join(", ")}
                          </span>
                          {partner.cities?.length > 0 && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {partner.cities?.slice(0, 3).join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingPartner(partner)
                            setShowPartnerModal(true)
                          }}
                          className="p-1.5 border border-zinc-700 hover:border-[#FF4D00] transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#FF4D00]" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePartner(partner.id)
                          }}
                          className="p-1.5 border border-zinc-700 hover:border-red-500 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
              {partnersList.length === 0 && (
                <div className="p-8 text-center text-zinc-500 text-sm">No hay partners. Crea uno nuevo.</div>
              )}
            </div>
          </div>
        )}

        {/* Add a new tab content for phone config */}
        {activeTab === "config" && (
          <div className="border border-zinc-800 bg-zinc-900/30 p-4">
            <h3 className="text-sm font-bold text-zinc-400 mb-4">CONFIGURACIÓN TELÉFONOS</h3>
            {loadingPhoneConfig ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#FF4D00]" />
                <span className="ml-2 text-zinc-400">Cargando configuración...</span>
              </div>
            ) : (
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">TELÉFONO ACTIVO</label>
                  <select
                    value={activePhone}
                    onChange={(e) => setActivePhone(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:border-[#FF4D00] outline-none"
                  >
                    {phoneOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label} ({option.number})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-500 block mb-1">NÚMEROS DISPONIBLES</label>
                  <div className="space-y-2">
                    {phoneOptions.map((option) => (
                      <div key={option.id} className="flex items-center justify-between p-2 border border-zinc-800">
                        <div>
                          <p className="text-sm font-medium">{option.label}</p>
                          <p className="text-xs text-zinc-400 font-mono">{option.number}</p>
                        </div>
                        <button
                          onClick={() => {
                            // Logic to remove or edit phone numbers if needed
                            // For now, only allow setting active
                            if (option.id !== activePhone) {
                              setActivePhone(option.id)
                            }
                          }}
                          className={`text-xs px-2 py-1 border transition-colors ${
                            option.id === activePhone
                              ? "border-[#FF4D00] bg-[#FF4D00]/20 text-[#FF4D00]"
                              : "border-zinc-700 hover:border-zinc-600"
                          }`}
                        >
                          {option.id === activePhone ? "ACTIVO" : "SELECCIONAR"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSavePhoneConfig}
                  disabled={savingPhone}
                  className="w-full py-3 bg-[#FF4D00] text-black font-bold tracking-wider hover:bg-[#FF4D00]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingPhone ? "GUARDANDO..." : "GUARDAR CONFIGURACIÓN"}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
