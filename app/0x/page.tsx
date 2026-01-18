import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { LoginForm } from "./components/login-form"

const VALID_SESSION = "rf_admin_session_2024_punk"

export default async function AdminLoginPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value === VALID_SESSION) {
    redirect("/0x/dashboard")
  }

  return <LoginForm />
}
