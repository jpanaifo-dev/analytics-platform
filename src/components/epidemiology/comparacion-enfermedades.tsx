"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart3
} from "lucide-react"

interface ComparacionEnfermedadesProps {
  enfermedades: string[]
  onCerrar: () => void
}

interface IndicadoresEnfermedad {
  enfermedad: string
  casosTotales: number
  casosSemana: number
  distritosAfectados: number
  tasaIncidencia: number
  tendencia: "ascendente" | "estable" | "descendente"
  riesgo: "bajo" | "medio" | "alto"
  comparacionSemanaAnterior: number
}

const DATOS_COMPARACION: IndicadoresEnfermedad[] = [
  { enfermedad: "Dengue", casosTotales: 144, casosSemana: 45, distritosAfectados: 8, tasaIncidencia: 12.5, tendencia: "ascendente", riesgo: "alto", comparacionSemanaAnterior: 23 },
  { enfermedad: "COVID-19", casosTotales: 35, casosSemana: 12, distritosAfectados: 7, tasaIncidencia: 2.8, tendencia: "estable", riesgo: "medio", comparacionSemanaAnterior: -5 },
  { enfermedad: "Influenza", casosTotales: 61, casosSemana: 18, distritosAfectados: 7, tasaIncidencia: 5.2, tendencia: "ascendente", riesgo: "medio", comparacionSemanaAnterior: 15 },
  { enfermedad: "Sarampión", casosTotales: 0, casosSemana: 0, distritosAfectados: 0, tasaIncidencia: 0.0, tendencia: "estable", riesgo: "bajo", comparacionSemanaAnterior: 0 },
  { enfermedad: "Mpox", casosTotales: 4, casosSemana: 2, distritosAfectados: 3, tasaIncidencia: 0.3, tendencia: "estable", riesgo: "bajo", comparacionSemanaAnterior: 0 },
  { enfermedad: "VIH/SIDA", casosTotales: 22, casosSemana: 3, distritosAfectados: 8, tasaIncidencia: 1.8, tendencia: "estable", riesgo: "medio", comparacionSemanaAnterior: 0 },
  { enfermedad: "EDA", casosTotales: 161, casosSemana: 35, distritosAfectados: 13, tasaIncidencia: 14.2, tendencia: "ascendente", riesgo: "alto", comparacionSemanaAnterior: 18 },
]

const getColorRiesgo = (riesgo: string) => {
  switch(riesgo) {
    case "alto": return "bg-red-500/20 text-red-700 dark:text-red-400"
    case "medio": return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
    default: return "bg-green-500/20 text-green-700 dark:text-green-400"
  }
}

const getIconTendencia = (tendencia: string) => {
  switch(tendencia) {
    case "ascendente": return <TrendingUp className="h-3 w-3 text-red-500" />
    case "descendente": return <TrendingDown className="h-3 w-3 text-green-500" />
    default: return <Minus className="h-3 w-3 text-muted-foreground" />
  }
}

export function ComparacionEnfermedades({ enfermedades, onCerrar }: ComparacionEnfermedadesProps) {
  const datosFiltrados = DATOS_COMPARACION.filter(d => enfermedades.includes(d.enfermedad))
  
  if (enfermedades.length < 2) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Comparación de Enfermedades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-sm">Seleccione al menos 2 enfermedades para comparar</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Comparación de Indicadores
          </CardTitle>
          <Badge variant="outline">{enfermedades.length} enfermedades</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-2 font-semibold text-xs">Enfermedad</th>
                <th className="text-center p-2 font-semibold text-xs">Casos Semana</th>
                <th className="text-center p-2 font-semibold text-xs">Total Casos</th>
                <th className="text-center p-2 font-semibold text-xs">Distritos</th>
                <th className="text-center p-2 font-semibold text-xs">Tasa %</th>
                <th className="text-center p-2 font-semibold text-xs">vs Semana Ant.</th>
                <th className="text-center p-2 font-semibold text-xs">Tendencia</th>
                <th className="text-center p-2 font-semibold text-xs">Riesgo</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((enf) => (
                <tr key={enf.enfermedad} className="border-b hover:bg-muted/30">
                  <td className="p-2 font-medium">{enf.enfermedad}</td>
                  <td className="p-2 text-center font-bold">{enf.casosSemana}</td>
                  <td className="p-2 text-center">{enf.casosTotales}</td>
                  <td className="p-2 text-center">{enf.distritosAfectados}</td>
                  <td className="p-2 text-center">{enf.tasaIncidencia}%</td>
                  <td className="p-2 text-center">
                    <span className={enf.comparacionSemanaAnterior > 0 ? 'text-red-500' : enf.comparacionSemanaAnterior < 0 ? 'text-green-500' : 'text-muted-foreground'}>
                      {enf.comparacionSemanaAnterior > 0 ? '+' : ''}{enf.comparacionSemanaAnterior}%
                    </span>
                  </td>
                  <td className="p-2 text-center">{getIconTendencia(enf.tendencia)}</td>
                  <td className="p-2 text-center">
                    <Badge className={getColorRiesgo(enf.riesgo)}>
                      {enf.riesgo.toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
