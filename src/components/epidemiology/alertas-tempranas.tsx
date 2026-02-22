"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  Bell,
  BellOff,
  CheckCircle,
  BarChart3,
  Info
} from "lucide-react"

interface AlertaBrote {
  id: string
  enfermedad: string
  distrito: string
  tipoAlerta: "epidemia" | "alarma" | "seguridad" | "info"
  casosActuales: number
  casosHistoricos: number
  incremento: number
  tendencia: "ascendente" | "estable" | "descendente"
  fechaDeteccion: string
  nivelPrioridad: "critico" | "alto" | "medio" | "bajo"
  estado: "activa" | "investigando" | "resuelta"
  recomendaciones: string[]
}

interface AlertasTempTempranasProps {
  enfermedad?: string
  className?: string
}

function generateMockAlertas(): AlertaBrote[] {
  return [
    {
      id: "ALT-2026-001",
      enfermedad: "Dengue",
      distrito: "IQUITOS",
      tipoAlerta: "epidemia",
      casosActuales: 45,
      casosHistoricos: 18,
      incremento: 150,
      tendencia: "ascendente",
      fechaDeteccion: "2026-02-21",
      nivelPrioridad: "critico",
      estado: "activa",
      recomendaciones: [
        "Activar brigadas de fumigación inmediata",
        "Intensificar vigilancia epidemiológica",
        "Coordinar conestablecimientos de salud",
        "Activar protocolo de respuesta rápida"
      ]
    },
    {
      id: "ALT-2026-002",
      enfermedad: "Dengue",
      distrito: "BELEN",
      tipoAlerta: "alarma",
      casosActuales: 22,
      casosHistoricos: 12,
      incremento: 83,
      tendencia: "ascendente",
      fechaDeteccion: "2026-02-20",
      nivelPrioridad: "alto",
      estado: "investigando",
      recomendaciones: [
        "Reforzar control vectorial",
        "Capacitar a agentes comunitarios",
        "Monitoreo diario de casos"
      ]
    },
    {
      id: "ALT-2026-003",
      enfermedad: "Influenza",
      distrito: "PUNCHANA",
      tipoAlerta: "alarma",
      casosActuales: 18,
      casosHistoricos: 10,
      incremento: 80,
      tendencia: "ascendente",
      fechaDeteccion: "2026-02-19",
      nivelPrioridad: "alto",
      estado: "activa",
      recomendaciones: [
        "Verificarstock de antivirales",
        "Activarsala de aislamiento",
        "Notificaciónobligatoria"
      ]
    },
    {
      id: "ALT-2026-004",
      enfermedad: "EDA",
      distrito: "NANAY",
      tipoAlerta: "seguridad",
      casosActuales: 35,
      casosHistoricos: 28,
      incremento: 25,
      tendencia: "estable",
      fechaDeteccion: "2026-02-18",
      nivelPrioridad: "medio",
      estado: "activa",
      recomendaciones: [
        "Monitoreo semanal",
        "Verificar calidad de agua",
        "Educación en higiene"
      ]
    },
    {
      id: "ALT-2026-005",
      enfermedad: "COVID-19",
      distrito: "YURIMAGUAS",
      tipoAlerta: "info",
      casosActuales: 8,
      casosHistoricos: 6,
      incremento: 33,
      tendencia: "ascendente",
      fechaDeteccion: "2026-02-17",
      nivelPrioridad: "bajo",
      estado: "resuelta",
      recomendaciones: [
        "Vigilancia pasiva",
        "Actualización de protocolos"
      ]
    }
  ]
}

function getColorAlerta(tipo: AlertaBrote["tipoAlerta"]) {
  switch (tipo) {
    case "epidemia": return "bg-red-500 text-white"
    case "alarma": return "bg-orange-500 text-white"
    case "seguridad": return "bg-yellow-500 text-white"
    default: return "bg-blue-500 text-white"
  }
}

function getColorPrioridad(nivel: AlertaBrote["nivelPrioridad"]) {
  switch (nivel) {
    case "critico": return "text-red-600 dark:text-red-400"
    case "alto": return "text-orange-600 dark:text-orange-400"
    case "medio": return "text-yellow-600 dark:text-yellow-400"
    default: return "text-blue-600 dark:text-blue-400"
  }
}

function getIconoTendencia(tendencia: AlertaBrote["tendencia"]) {
  switch (tendencia) {
    case "ascendente": return <TrendingUp className="h-4 w-4 text-red-500" />
    case "descendente": return <TrendingDown className="h-4 w-4 text-green-500" />
    default: return <Activity className="h-4 w-4 text-muted-foreground" />
  }
}

function getIconoEstado(estado: AlertaBrote["estado"]) {
  switch (estado) {
    case "activa": return <Bell className="h-4 w-4 text-red-500" />
    case "investigando": return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case "resuelta": return <CheckCircle className="h-4 w-4 text-green-500" />
  }
}

export function AlertasTempTempranas({ enfermedad, className }: AlertasTempTempranasProps) {
  const alertas = useMemo(() => generateMockAlertas(), [])
  
  const alertasFiltradas = useMemo(() => {
    if (!enfermedad) return alertas
    return alertas.filter(a => a.enfermedad === enfermedad)
  }, [alertas, enfermedad])

  const stats = useMemo(() => ({
    total: alertasFiltradas.length,
    criticas: alertasFiltradas.filter(a => a.nivelPrioridad === "critico").length,
    activas: alertasFiltradas.filter(a => a.estado === "activa").length,
    resueltas: alertasFiltradas.filter(a => a.estado === "resuelta").length
  }), [alertasFiltradas])

  const alertasPorTipo = useMemo(() => ({
    epidemia: alertasFiltradas.filter(a => a.tipoAlerta === "epidemia").length,
    alarma: alertasFiltradas.filter(a => a.tipoAlerta === "alarma").length,
    seguridad: alertasFiltradas.filter(a => a.tipoAlerta === "seguridad").length,
    info: alertasFiltradas.filter(a => a.tipoAlerta === "info").length
  }), [alertasFiltradas])

  return (
    <Card className={className}>
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alertas Tempranas de Brotes
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {stats.activas} activas
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="text-center p-2 rounded-lg bg-red-50 dark:bg-red-950/30">
            <p className="text-xl font-bold text-red-600">{stats.criticas}</p>
            <p className="text-[10px] text-red-700 dark:text-red-400">Críticas</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-orange-50 dark:bg-orange-950/30">
            <p className="text-xl font-bold text-orange-600">{alertasPorTipo.alarma}</p>
            <p className="text-[10px] text-orange-700 dark:text-orange-400">Alarmas</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
            <p className="text-xl font-bold text-yellow-600">{alertasPorTipo.seguridad}</p>
            <p className="text-[10px] text-yellow-700 dark:text-yellow-400">Seguridad</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
            <p className="text-xl font-bold text-green-600">{stats.resueltas}</p>
            <p className="text-[10px] text-green-700 dark:text-green-400">Resueltas</p>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {alertasFiltradas.map(alerta => (
            <div 
              key={alerta.id}
              className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`${getColorAlerta(alerta.tipoAlerta)} text-[10px] font-bold`}>
                      {alerta.tipoAlerta.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-semibold text-card-foreground">{alerta.enfermedad}</span>
                    <span className="text-xs text-muted-foreground">- {alerta.distrito}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className={getColorPrioridad(alerta.nivelPrioridad)}>
                      Prioridad: {alerta.nivelPrioridad.toUpperCase()}
                    </span>
                    {getIconoTendencia(alerta.tendencia)}
                    {getIconoEstado(alerta.estado)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-card-foreground">+{alerta.incremento}%</p>
                  <p className="text-[10px] text-muted-foreground">vs histórico</p>
                </div>
              </div>
              
              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                <span>Casos: <strong className="text-card-foreground">{alerta.casosActuales}</strong> (hist: {alerta.casosHistoricos})</span>
                <span>{alerta.fechaDeteccion}</span>
              </div>

              {alerta.estado !== "resuelta" && (
                <details className="mt-2">
                  <summary className="text-xs cursor-pointer text-primary hover:underline">
                    Ver recomendaciones ({alerta.recomendaciones.length})
                  </summary>
                  <ul className="mt-1 ml-4 text-xs text-muted-foreground space-y-1">
                    {alerta.recomendaciones.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-primary">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ))}
        </div>

        {alertasFiltradas.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <BellOff className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay alertas activas</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function ResumenAlertas({ className }: { className?: string }) {
  const alertas = useMemo(() => generateMockAlertas(), [])
  
  const stats = useMemo(() => ({
    total: alertas.length,
    criticas: alertas.filter(a => a.nivelPrioridad === "critico" && a.estado === "activa").length,
    activas: alertas.filter(a => a.estado === "activa").length,
    ultima: alertas[0]?.fechaDeteccion || "-"
  }), [alertas])

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        <span className="text-sm font-medium">{stats.criticas} alertas críticas</span>
      </div>
      <div className="h-4 w-px bg-border"></div>
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-yellow-500" />
        <span className="text-sm">{stats.activas} activas</span>
      </div>
      <div className="h-4 w-px bg-border"></div>
      <span className="text-xs text-muted-foreground">Última: {stats.ultima}</span>
    </div>
  )
}
