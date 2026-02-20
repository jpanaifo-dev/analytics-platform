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
} from "recharts"
import { DatoCanalEndemico } from "@/types/epidemiology"

interface CanalEndemicoChartProps {
  data: DatoCanalEndemico[]
  semanaActual?: number
  titulo?: string
  className?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value?: number }>
  label?: string | number
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="font-semibold text-sm">Semana {label}</p>
      <div className="mt-2 space-y-1">
        <p className="text-xs text-muted-foreground">
          Casos: <span className="font-medium text-foreground">{payload[0]?.value}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Mín: <span className="font-medium">{payload[1]?.value}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          P25: <span className="font-medium">{payload[2]?.value}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          P50: <span className="font-medium">{payload[3]?.value}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          P75: <span className="font-medium">{payload[4]?.value}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Máx: <span className="font-medium">{payload[5]?.value}</span>
        </p>
      </div>
    </div>
  )
}

export function CanalEndemicoChart({
  data,
  titulo = "Canal Endémico",
  className,
}: CanalEndemicoChartProps) {
  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-base font-semibold">{titulo}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Comparación con canales históricos (2019-2025)
        </p>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCasos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="semana"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              label={{ value: "SE", position: "insideBottomRight", offset: -5 }}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip content={<CustomTooltip />} />

            <ReferenceLine
              y={data[data.length - 1]?.p75 || 0}
              stroke="#f97316"
              strokeDasharray="5 5"
              label={{ value: "Umbral Alarma", fontSize: 10, fill: "#f97316" }}
            />

            <Area
              type="monotone"
              dataKey="max"
              stroke="transparent"
              fill="#fca5a5"
              fillOpacity={0.3}
              name="Zona Epidemia"
            />
            <Area
              type="monotone"
              dataKey="p75"
              stroke="transparent"
              fill="#fdba74"
              fillOpacity={0.3}
              name="Zona Alarma"
            />
            <Area
              type="monotone"
              dataKey="p50"
              stroke="transparent"
              fill="#86efac"
              fillOpacity={0.3}
              name="Zona Seguridad"
            />
            <Area
              type="monotone"
              dataKey="p25"
              stroke="transparent"
              fill="#93c5fd"
              fillOpacity={0.3}
              name="Zona Éxito"
            />

            <Area
              type="monotone"
              dataKey="casos"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#colorCasos)"
              name="Casos Actuales"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-blue-400" />
          <span className="text-xs text-muted-foreground">Éxito (&lt; P25)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-green-400" />
          <span className="text-xs text-muted-foreground">Seguridad (P25-P50)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-orange-400" />
          <span className="text-xs text-muted-foreground">Alarma (P50-P75)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-red-400" />
          <span className="text-xs text-muted-foreground">Epidemia (&gt; P75)</span>
        </div>
      </div>
    </div>
  )
}

interface CanalEndemicoDataGeneratorOptions {
  anio: number
  enfermedad?: string
}

export function generateMockCanalEndemicoData({
  anio,
}: CanalEndemicoDataGeneratorOptions): DatoCanalEndemico[] {
  const data: DatoCanalEndemico[] = []
  const casosBase = 50 + Math.random() * 100
  const estacionalidad = (semana: number) => {
    return Math.sin((semana / 52) * 2 * Math.PI) * 30
  }

  for (let semana = 1; semana <= 52; semana++) {
    const casos = Math.max(0, Math.round(casosBase + estacionalidad(semana) + (Math.random() - 0.5) * 40))
    const variacion = Math.random() * 0.3 + 0.85

    data.push({
      semana,
      anio,
      casos,
      min: Math.round(casos * 0.3 * variacion),
      p25: Math.round(casos * 0.5 * variacion),
      p50: Math.round(casos * variacion),
      p75: Math.round(casos * 1.5 * variacion),
      max: Math.round(casos * 2 * variacion),
    })
  }

  return data
}
