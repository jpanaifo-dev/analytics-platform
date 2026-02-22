"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simular autenticación
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email === "admin@admin.com" && password === "Admin123") {
      // Credenciales válidas - guardar en localStorage
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("user", JSON.stringify({ email, name: "Administrador" }))
      router.push("/dashboard")
    } else {
      setError("Credenciales incorrectas. Intente nuevamente.")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Plataforma de Vigilancia</h1>
        <p className="text-muted-foreground text-sm">
          Ingrese sus credenciales para acceder
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Correo Electrónico</label>
        <Input 
          id="email" 
          type="email" 
          placeholder="admin@admin.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
        <Input 
          id="password" 
          type="password" 
          placeholder="Admin123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Credenciales: admin@admin.com / Admin123
      </p>
    </form>
  )
}
