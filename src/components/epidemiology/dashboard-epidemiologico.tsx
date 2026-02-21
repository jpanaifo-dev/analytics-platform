"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  Legend
} from "recharts"
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Gauge,
  Target,
  Users,
  MapPin,
  Shield,
  Zap,
  Thermometer,
  Heart,
  Siren
} from "lucide-react"

interface CanalEndemicoProps {
  enfermedad: string
  datosSemanas?: number[]
}

const DATOS_CANAL_ENDEMICO: Record<string, { semanas: number[]; casos: number[]; limites: { exito: number; seguridad: number; alarma: number } }> = {
  "Dengue": {
    semanas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    casos: [12, 15, 18, 22, 28, 35, 42, 45, 52, 48, 55, 60],
    limites: { exito: 15, seguridad: 30, alarma: 50 }
  },
  "COVID-19": {
    semanas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    casos: [8, 10, 12, 15, 14, 12, 10, 12, 11, 9, 8, 7],
    limites: { exito: 10, seguridad: 20, alarma: 35 }
  },
  "Influenza": {
    semanas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    casos: [5, 8, 12, 18, 25, 32, 28, 18, 12, 8, 6, 5],
    limites: { exito: 10, seguridad: 25, alarma: 40 }
  },
  "EDA": {
    semanas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    casos: [25, 28, 32, 38, 45, 52, 48, 35, 28, 22, 20, 18],
    limites: { exito: 20, seguridad: 40, alarma: 60 }
  }
}

const COLORS_PIE = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#94a3b8"]

export function CanalEndemico({ enfermedad }: CanalEndemicoProps) {
  const data = DATOS_CANAL_ENDEMICO[enfermedad] || DATOS_CANAL_ENDEMICO["Dengue"]
  
  const chartData = data.semanas.map((semana, idx) => ({
    semana: `SE ${semana}`,
    casos: data.casos[idx],
    limiteExito: data.limites.exito,
    limiteSeguridad: data.limites.seguridad,
    limiteAlarma: data.limites.alarma
  }))

  const ultimaSemana = data.casos[data.casos.length - 1]
  const semanaAnterior = data.casos[data.casos.length - 2]
  const cambio = ((ultimaSemana - semanaAnterior) / semanaAnterior * 100).toFixed(1)
  
  const zonaActual = ultimaSemana <= data.limites.exito 
    ? "exito" 
    : ultimaSemana <= data.limites.seguridad 
      ? "seguridad" 
      : ultimaSemana <= data.limites.alarma 
        ? "alarma" 
        : "epidemia"

  const getZonaInfo = (zona: string) => {
    switch(zona) {
      case "exito": return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Zona de Éxito", desc: "Casos bajo control" }
      case "seguridad": return { icon: Shield, color: "text-yellow-600", bg: "bg-yellow-100", label: "Zona de Seguridad", desc: "Situación normal" }
      case "alarma": return { icon: Siren, color: "text-orange-600", bg: "bg-orange-100", label: "Zona de Alarma", desc: "Casos elevados" }
      default: return { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100", label: "Zona de Epidemia", desc: "Emergencia sanitaria" }
    }
  }

  const zonaInfo = getZonaInfo(zonaActual)

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Canal Endémico - {enfermedad}
          </CardTitle>
          <Badge className={`${zonaInfo.bg} ${zonaInfo.color}`}>
            {zonaInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-1 mb-3">
          <div className="p-1.5 rounded bg-green-50 border border-green-200 text-center">
            <p className="text-[10px] text-green-800">0-{data.limites.exito}</p>
            <p className="text-[9px] text-green-600">Éxito</p>
          </div>
          <div className="p-1.5 rounded bg-yellow-50 border border-yellow-200 text-center">
            <p className="text-[10px] text-yellow-800">{data.limites.exito+1}-{data.limites.seguridad}</p>
            <p className="text-[9px] text-yellow-600">Seguridad</p>
          </div>
          <div className="p-1.5 rounded bg-orange-50 border border-orange-200 text-center">
            <p className="text-[10px] text-orange-800">{data.limites.seguridad+1}-{data.limites.alarma}</p>
            <p className="text-[9px] text-orange-600">Alarma</p>
          </div>
          <div className="p-1.5 rounded bg-red-50 border border-red-200 text-center">
            <p className="text-[10px] text-red-800">{data.limites.alarma+1}+</p>
            <p className="text-[9px] text-red-600">Epidemia</p>
          </div>
        </div>

        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCasos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="semana" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip formatter={(value) => [`${value} casos`, '']} contentStyle={{ borderRadius: 6, fontSize: 11 }} />
              <ReferenceLine y={data.limites.exito} stroke="#22c55e" strokeDasharray="3 3" />
              <ReferenceLine y={data.limites.seguridad} stroke="#eab308" strokeDasharray="3 3" />
              <ReferenceLine y={data.limites.alarma} stroke="#f97316" strokeDasharray="3 3" />
              <Area type="monotone" dataKey="casos" stroke="#3b82f6" fill="url(#colorCasos)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={`mt-2 p-2 rounded-lg ${zonaInfo.bg} flex items-center justify-between`}>
          <div className="flex items-center gap-1.5">
            <zonaInfo.icon className={`h-4 w-4 ${zonaInfo.color}`} />
            <div>
              <p className={`text-xs font-semibold ${zonaInfo.color}`}>{zonaInfo.label}</p>
              <p className="text-[10px] text-slate-500">{zonaInfo.desc}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">{ultimaSemana}</p>
            <p className={`text-[10px] ${parseFloat(cambio) > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {parseFloat(cambio) > 0 ? '+' : ''}{cambio}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TendenciaEnfermedad({ enfermedad }: { enfermedad: string }) {
  const data = DATOS_CANAL_ENDEMICO[enfermedad] || DATOS_CANAL_ENDEMICO["Dengue"]
  
  const chartData = data.semanas.map((semana, idx) => ({
    semana: `SE ${semana}`,
    casos: data.casos[idx],
    esperado: Math.round(data.casos[idx] * 0.8)
  }))

  const tendencia = data.casos[data.casos.length - 1] > data.casos[data.casos.length - 2] ? "subiendo" : "bajando"

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Tendencia - {enfermedad}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="semana" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip contentStyle={{ borderRadius: 6, fontSize: 11 }} />
              <Line type="monotone" dataKey="casos" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="esperado" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth={1} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            {tendencia === "subiendo" ? (
              <TrendingUp className="h-3 w-3 text-red-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-green-600" />
            )}
            <span className="text-xs">{tendencia === "subiendo" ? "Ascendente" : "Descendente"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DistribucionEdadGenero({ enfermedad }: { enfermedad: string }) {
  const datos = [
    { grupo: "0-4", masculino: 12, femenino: 10 },
    { grupo: "5-9", masculino: 15, femenino: 14 },
    { grupo: "10-14", masculino: 8, femenino: 6 },
    { grupo: "15-19", masculino: 5, femenino: 8 },
    { grupo: "20-29", masculino: 18, femenino: 22 },
    { grupo: "30-39", masculino: 25, femenino: 28 },
    { grupo: "40-49", masculino: 20, femenino: 18 },
    { grupo: "50-59", masculino: 15, femenino: 12 },
    { grupo: "60+", masculino: 10, femenino: 15 }
  ]

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Users className="h-4 w-4" />
          Edad y Género
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datos} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 9 }} />
              <YAxis dataKey="grupo" type="category" tick={{ fontSize: 9 }} width={35} />
              <Tooltip contentStyle={{ borderRadius: 6, fontSize: 11 }} />
              <Legend />
              <Bar dataKey="masculino" name="Mas" fill="#3b82f6" stackId="a" />
              <Bar dataKey="femenino" name="Fem" fill="#ec4899" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function DistribucionCasos({ enfermedad }: { enfermedad: string }) {
  const datos = [
    { name: "IQUITOS", value: 45 },
    { name: "BELEN", value: 28 },
    { name: "YURIMAGUAS", value: 22 },
    { name: "PUNCHANA", value: 15 },
    { name: "NANAY", value: 12 },
    { name: "Otros", value: 22 }
  ]

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Por Distrito
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={datos}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {datos.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function IndicadoresCockpit({ enfermedad }: { enfermedad: string }) {
  const indicadores = [
    { label: "Casos", valor: "45", cambio: "+23%", tendencia: "up", icono: Activity, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Incidencia", valor: "12.5%", cambio: "+5%", tendencia: "up", icono: Gauge, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Letalidad", valor: "0.1%", cambio: "-0.1%", tendencia: "down", icono: Heart, color: "text-green-600", bg: "bg-green-50" },
    { label: "Distritos", valor: "8/13", cambio: "+2", tendencia: "up", icono: MapPin, color: "text-red-600", bg: "bg-red-50" },
    { label: "Hospitaliz.", valor: "12", cambio: "+4", tendencia: "up", icono: Thermometer, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Recuperados", valor: "156", cambio: "+35", tendencia: "up", icono: CheckCircle, color: "text-green-600", bg: "bg-green-50" }
  ]

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          Panel de Control
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {indicadores.map((ind, idx) => (
            <div key={idx} className={`p-2 rounded-lg ${ind.bg} border`}>
              <div className="flex items-center justify-between mb-1">
                <ind.icono className={`h-3.5 w-3.5 ${ind.color}`} />
                {ind.tendencia === "up" ? (
                  <TrendingUp className="h-3 w-3 text-red-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-green-500" />
                )}
              </div>
              <p className="text-lg font-bold text-slate-800">{ind.valor}</p>
              <p className="text-[10px] text-slate-500">{ind.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
