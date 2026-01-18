"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/0x/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push("/0x/dashboard")
    } else {
      setError("ACCESO DENEGADO")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] animate-pulse opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Terminal header */}
        <div className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/80">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-4 text-xs text-zinc-500 font-mono">RAPIDFIX://CONTROL</span>
          </div>

          <div className="p-8">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-[#FF4D00] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#FF4D00]" fill="currentColor">
                    <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF4D00]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#FF4D00]" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-wider text-zinc-100">SISTEMA DE CONTROL</h1>
              <p className="text-xs text-zinc-500 mt-2 tracking-widest">ACCESO RESTRINGIDO</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs text-zinc-500 mb-2 tracking-wider">{">"} CLAVE DE ACCESO</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-zinc-100 font-mono focus:outline-none focus:border-[#FF4D00] transition-colors placeholder:text-zinc-600"
                  placeholder="••••••••••••"
                  autoFocus
                />
              </div>

              {error && <div className="text-red-500 text-xs text-center tracking-wider animate-pulse">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF4D00] hover:bg-[#FF6B2C] text-black font-bold py-3 tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="relative z-10">{loading ? "VERIFICANDO..." : "ACCEDER"}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <div className="flex items-center justify-between text-xs text-zinc-600">
                <span>v1.0.0</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  SISTEMA ACTIVO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
