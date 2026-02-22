"use client"

import { useMemo } from "react"

interface HistoricoSemana {
  semana: number
  casos: number
}

interface CanalEndemicoData {
  semana: number
  exito: number
  seguridad: number
  alarma: number
  epidemia: number
  casosActuales: number
  zona: "exito" | "seguridad" | "alarma" | "epidemia"
}

function calculateQuartile(sortedData: number[], percentile: number): number {
  if (sortedData.length === 0) return 0
  const index = (percentile / 100) * (sortedData.length - 1)
  const lower = Math.floor(index)
  const upper = Math.ceil(index)
  const weight = index - lower
  
  if (lower === upper) return sortedData[lower]
  return Math.round(sortedData[lower] * (1 - weight) + sortedData[upper] * weight)
}

function calculateQuartiles(data: number[]): { q1: number; q2: number; q3: number } {
  const sorted = [...data].sort((a, b) => a - b)
  return {
    q1: calculateQuartile(sorted, 25),
    q2: calculateQuartile(sorted, 50),
    q3: calculateQuartile(sorted, 75),
  }
}

export function useCanalEndemico(
  historico: HistoricoSemana[][],
  casosActuales: { semana: number; casos: number }[]
): CanalEndemicoData[] {
  return useMemo(() => {
    const result: CanalEndemicoData[] = []
    
    for (let semana = 1; semana <= 52; semana++) {
      const datosSemana = historico
        .map(anio => anio.find(d => d.semana === semana)?.casos || 0)
        .filter(casos => casos > 0)
      
      const { q1, q2, q3 } = calculateQuartiles(datosSemana)
      
      const casoActual = casosActuales.find(d => d.semana === semana)?.casos || 0
      
      let zona: CanalEndemicoData["zona"] = "exito"
      if (casoActual > q3) {
        zona = "epidemia"
      } else if (casoActual > q2) {
        zona = "alarma"
      } else if (casoActual > q1) {
        zona = "seguridad"
      }
      
      result.push({
        semana,
        exito: q1,
        seguridad: q2,
        alarma: q3,
        epidemia: q3 * 1.5,
        casosActuales: casoActual,
        zona,
      })
    }
    
    return result
  }, [historico, casosActuales])
}

export function getZonaColor(zona: CanalEndemicoData["zona"]): {
  bg: string
  text: string
  label: string
} {
  switch (zona) {
    case "epidemia":
      return { bg: "bg-red-500", text: "text-red-700 dark:text-red-400", label: "EPIDEMIA" }
    case "alarma":
      return { bg: "bg-orange-500", text: "text-orange-700 dark:text-orange-400", label: "ALERTA" }
    case "seguridad":
      return { bg: "bg-yellow-500", text: "text-yellow-700 dark:text-yellow-400", label: "ESTABLE" }
    default:
      return { bg: "bg-green-500", text: "text-green-700 dark:text-green-400", label: "ÉXITO" }
  }
}

export function getResumenZona(data: CanalEndemicoData[]): {
  zonaActual: CanalEndemicoData["zona"]
  semanasEnEpidemia: number
  semanasEnAlarma: number
  semanasEnSeguridad: number
  semanasEnExito: number
  totalCasos: number
  semanaPeak: number
  casosPeak: number
} {
  const zonasCount = { epidemia: 0, alarma: 0, seguridad: 0, exito: 0 }
  let totalCasos = 0
  let semanaPeak = 1
  let casosPeak = 0
  
  data.forEach(d => {
    zonasCount[d.zona]++
    totalCasos += d.casosActuales
    if (d.casosActuales > casosPeak) {
      casosPeak = d.casosActuales
      semanaPeak = d.semana
    }
  })
  
  const zonaActual = data.find(d => d.casosActuales > 0)?.zona || "exito"
  
  return {
    zonaActual,
    semanasEnEpidemia: zonasCount.epidemia,
    semanasEnAlarma: zonasCount.alarma,
    semanasEnSeguridad: zonasCount.seguridad,
    semanasEnExito: zonasCount.exito,
    totalCasos,
    semanaPeak,
    casosPeak,
  }
}
