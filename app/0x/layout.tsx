import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { cookies } from "next/headers"
import "../globals.css"

const mono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RAPIDFIX // CONTROL",
  description: "Sistema de control interno",
  robots: "noindex, nofollow",
}

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_session")
  return session?.value === process.env.ADMIN_SESSION_SECRET
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuth = await checkAuth()

  // Check if we're on the login page
  const isLoginPage = false // Will be handled by the page itself

  return (
    <html lang="es" className="dark">
      <body className={`${mono.className} bg-[#0a0a0a] text-zinc-100 antialiased`}>{children}</body>
    </html>
  )
}
