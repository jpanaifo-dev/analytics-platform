"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { useCanalEndemico, getZonaColor, getResumenZona } from "@/hooks/use-canalendemico"

interface CanalEndemicoProps {
  enfermedad?: string
  className?: string
}

function generateHistoricoData(): { semana: number; casos: number }[][] {
  const years = [2020, 2021, 2022, 2023, 2024, 2025]
  return years.map(() => {
    const data: { semana: number; casos: number }[] = []
    const casosBase = 30 + Math.random() * 50
    
    for (let semana = 1; semana <= 52; semana++) {
      const estacionalidad = Math.sin((semana / 52) * 2 * Math.PI) * 20
      const casos = Math.max(0, Math.round(casosBase + estacionalidad + (Math.random() - 0.5) * 30))
      data.push({ semana, casos })
    }
    return data
  })
}

function generateCasosActuales(): { semana: number; casos: number }[] {
  const data: { semana: number; casos: number }[] = []
  const casosBase = 40 + Math.random() * 30
  
  for (let semana = 1; semana <= 8; semana++) {
    const estacionalidad = Math.sin((semana / 52) * 2 * Math.PI) * 15
    const casos = Math.max(0, Math.round(casosBase + estacionalidad + (Math.random() - 0.5) * 25))
    data.push({ semana, casos })
  }
  return data
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value?: number; dataKey?: string; color?: string }>
  label?: string | number
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null

  const zonaData = payload.find(p => p.dataKey === "casosActuales")
  const casos = zonaData?.value || 0

  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="font-semibold text-sm">Semana {label}</p>
      <div className="mt-2 space-y-1">
        <p className="text-xs text-muted-foreground">
          Casos Actuales: <span className="font-medium text-foreground">{casos}</span>
        </p>
        <p className="text-xs text-green-600 dark:text-green-400">
          Éxito (&lt;Q1): <span className="font-medium">{payload.find(p => p.dataKey === "exito")?.value}</span>
        </p>
        <p className="text-xs text-yellow-600 dark:text-yellow-400">
          Seguridad (Q1-Q2): <span className="font-medium">{payload.find(p => p.dataKey === "seguridad")?.value}</span>
        </p>
        <p className="text-xs text-orange-600 dark:text-orange-400">
          Alarma (Q2-Q3): <span className="font-medium">{payload.find(p => p.dataKey === "alarma")?.value}</span>
        </p>
        <p className="text-xs text-red-600 dark:text-red-400">
          Epidemia (&gt;Q3): <span className="font-medium">{payload.find(p => p.dataKey === "epidemia")?.value}</span>
        </p>
      </div>
    </div>
  )
}

export function CanalEndemico({ enfermedad = "Dengue", className }: CanalEndemicoProps) {
  const historico = React.useMemo(() => generateHistoricoData(), [])
  const casosActuales = React.useMemo(() => generateCasosActuales(), [])
  
  const canalData = useCanalEndemico(historico, casosActuales)
  const resumen = getResumenZona(canalData)
  const zonaInfo = getZonaColor(resumen.zonaActual)

  const semanaActual = casosActuales.length > 0 ? Math.max(...casosActuales.map(c => c.semana)) : 1
  const casosSemanaActual = casosActuales.find(c => c.semana === semanaActual)?.casos || 0

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold">Canal Endémico - {enfermedad}</h3>
          <p className="text-xs text-muted-foreground">
            Comparación histórica (2020-2025)
          </p>
        </div>
        <Badge className={`${zonaInfo.bg} text-white text-xs font-bold`}>
          {zonaInfo.label}
        </Badge>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={canalData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorExito" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorSeguridad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#eab308" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorAlarma" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorCasos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="semana"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="epidemia"
              stroke="transparent"
              fill="#fca5a5"
              fillOpacity={0.2}
              name="Epidemia"
            />
            <Area
              type="monotone"
              dataKey="alarma"
              stroke="transparent"
              fill="#fdba74"
              fillOpacity={0.3}
              name="Alarma"
            />
            <Area
              type="monotone"
              dataKey="seguridad"
              stroke="transparent"
              fill="#fde047"
              fillOpacity={0.3}
              name="Seguridad"
            />
            <Area
              type="monotone"
              dataKey="exito"
              stroke="transparent"
              fill="url(#colorExito)"
              fillOpacity={0.5}
              name="Éxito"
            />

            <Line
              type="monotone"
              dataKey="casosActuales"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: "#8b5cf6", r: 3 }}
              name="Casos 2026"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-sm bg-green-500" />
            <span className="text-muted-foreground">Éxito</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-sm bg-yellow-400" />
            <span className="text-muted-foreground">Seguridad</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-sm bg-orange-400" />
            <span className="text-muted-foreground">Alarma</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-sm bg-red-400" />
            <span className="text-muted-foreground">Epidemia</span>
          </div>
        </div>
        <div className="text-muted-foreground">
          SE {semanaActual}: <span className="font-semibold text-foreground">{casosSemanaActual} casos</span>
        </div>
      </div>
    </div>
  )
}
