"use client"

import * as React from "react"
import { AlertTriangle, Bell, CheckCircle, Info, XCircle } from "lucide-react"
import { Alerta, NivelAlerta } from "@/types/epidemiology"
import { BadgeNivelAlerta } from "./status-badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AlertaPanelProps {
  alertas: Alerta[]
  className?: string
}

export function AlertaPanel({ alertas, className }: AlertaPanelProps) {
  const getIconoAlerta = (nivel: NivelAlerta) => {
    switch (nivel) {
      case 'EMERGENCIA':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'ALERTA':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case 'ADVERTENCIA':
        return <Bell className="h-5 w-5 text-yellow-500" />
      case 'INFO':
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getBorderColor = (nivel: NivelAlerta) => {
    switch (nivel) {
      case 'EMERGENCIA':
        return "border-l-red-500"
      case 'ALERTA':
        return "border-l-orange-500"
      case 'ADVERTENCIA':
        return "border-l-yellow-500"
      case 'INFO':
        return "border-l-blue-500"
      default:
        return "border-l-gray-300"
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      {alertas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
          <p className="text-sm font-medium">Sin alertas activas</p>
          <p className="text-xs text-muted-foreground mt-1">
            No se detectaron situaciones epidemiologyas anómalas
          </p>
        </div>
      ) : (
        alertas.map((alerta) => (
          <div
            key={alerta.id}
            className={cn(
              "rounded-lg border bg-card p-4 border-l-4 transition-colors hover:bg-accent/50",
              getBorderColor(alerta.nivel)
            )}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getIconoAlerta(alerta.nivel)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold">{alerta.titulo}</h4>
                  <BadgeNivelAlerta nivel={alerta.nivel} />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {alerta.mensaje}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {alerta.casosRegistrados} caso{alerta.casosRegistrados !== 1 ? 's' : ''}
                    {alerta.umbral && ` / Umbral: ${alerta.umbral}`}
                  </span>
                  <span>
                    {format(new Date(alerta.fechaDeteccion), "dd/MM/yyyy HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

interface AlertaCardProps {
  alertas: Alerta[]
  className?: string
}

export function AlertaCard({ alertas, className }: AlertaCardProps) {
  const activas = alertas.filter(a => a.estado === 'ACTIVA')
  const emergencia = alertas.filter(a => a.nivel === 'EMERGENCIA')
  const alerta = alertas.filter(a => a.nivel === 'ALERTA')

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Panel de Alertas
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Total Activas</span>
          <span className="text-lg font-bold">{activas.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <XCircle className="h-3 w-3 text-red-500" /> Emergencia
          </span>
          <span className="text-lg font-bold text-red-600">{emergencia.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-orange-500" /> Alerta
          </span>
          <span className="text-lg font-bold text-orange-600">{alerta.length}</span>
        </div>
      </CardContent>
    </Card>
  )
}
