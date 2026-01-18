"use client"

import { CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function PagoExitoso() {
  const [phoneNumber, setPhoneNumber] = useState("711267223")

  useEffect(() => {
    fetch("/api/config/phone")
      .then((res) => res.json())
      .then((data) => {
        if (data.phoneNumber) {
          setPhoneNumber(data.phoneNumber)
        }
      })
      .catch(console.error)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Pago completado</h1>
        <p className="text-zinc-400 mb-6">
          Gracias por tu pago. En breve recibirás los datos del cliente por WhatsApp.
        </p>
        <a
          href={`https://wa.me/34${phoneNumber}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  )
}
