import { SemanaEpidemiologica } from '@/types/epidemiology'

export function getPrimerJuevesEnero(anio: number): Date {
  const primeroEnero = new Date(anio, 0, 1)
  const diaSemana = primeroEnero.getDay()
  const diasHastaJueves = (4 - diaSemana + 7) % 7
  return new Date(anio, 0, 1 + diasHastaJueves)
}

export function getSemanaEpidemiologica(fecha: Date): SemanaEpidemiologica {
  const anio = fecha.getFullYear()
  const fechaActual = new Date(fecha)
  
  const primerJueves = getPrimerJuevesEnero(anio)
  
  let anioSemana = anio
  
  if (fechaActual < primerJueves) {
    const semanaAnteriorAnio = getSemanaEpidemiologica(
      new Date(anio - 1, 11, 31)
    )
    return semanaAnteriorAnio
  }
  
  const inicioPrimeraSE = new Date(primerJueves)
  inicioPrimeraSE.setDate(inicioPrimeraSE.getDate() - 6)
  
  const diffTiempo = fechaActual.getTime() - inicioPrimeraSE.getTime()
  const diffDias = Math.floor(diffTiempo / (1000 * 60 * 60 * 24))
  const semana = Math.floor(diffDias / 7) + 1
  
  if (semana > 53) {
    const primeraSemanaSigAnio = getPrimerJuevesEnero(anio + 1)
    if (fechaActual >= primeraSemanaSigAnio) {
      anioSemana = anio + 1
    }
  }
  
  const fechaInicioSemana = new Date(inicioPrimeraSE)
  fechaInicioSemana.setDate(inicioPrimeraSE.getDate() + (semana - 1) * 7)
  
  const fechaFinSemana = new Date(fechaInicioSemana)
  fechaFinSemana.setDate(fechaInicioSemana.getDate() + 6)
  
  return {
    anio: anioSemana,
    se: semana,
    fechaInicio: fechaInicioSemana,
    fechaFin: fechaFinSemana,
    fechaSemana: fechaActual
  }
}

export function getSemanasDelAnio(anio: number): SemanaEpidemiologica[] {
  const semanas: SemanaEpidemiologica[] = []
  const primerJueves = getPrimerJuevesEnero(anio)
  
  const fechaActual = new Date(primerJueves)
  fechaActual.setDate(fechaActual.getDate() - 6)
  
  while (semanaPerteneceAnio(fechaActual, anio)) {
    semanas.push(getSemanaEpidemiologica(fechaActual))
    fechaActual.setDate(fechaActual.getDate() + 7)
  }
  
  return semanas
}

function semanaPerteneceAnio(fecha: Date, anio: number): boolean {
  const se = getSemanaEpidemiologica(fecha)
  return se.anio === anio
}

export function formatearSE(se: SemanaEpidemiologica): string {
  return `SE ${se.se.toString().padStart(2, '0')}-${se.anio}`
}

export function formatearRangoSE(se: SemanaEpidemiologica): string {
  const opciones: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
  const inicio = se.fechaInicio.toLocaleDateString('es-PE', opciones)
  const fin = se.fechaFin.toLocaleDateString('es-PE', opciones)
  return `${inicio} - ${fin}`
}

export function getSEAnterior(se: SemanaEpidemiologica, semanasAtras: number = 1): SemanaEpidemiologica {
  const fechaAnterior = new Date(se.fechaInicio)
  fechaAnterior.setDate(fechaAnterior.getDate() - (semanasAtras * 7))
  return getSemanaEpidemiologica(fechaAnterior)
}

export function getSERango(anio: number, seInicio: number, seFin: number): SemanaEpidemiologica[] {
  const semanas: SemanaEpidemiologica[] = []
  const fechaInicio = getFechaDesdeSE(anio, seInicio)
  
  let seActual = seInicio
  const fechaActual = new Date(fechaInicio)
  
  while (seActual <= seFin) {
    semanas.push(getSemanaEpidemiologica(fechaActual))
    fechaActual.setDate(fechaActual.getDate() + 7)
    seActual++
  }
  
  return semanas
}

function getFechaDesdeSE(anio: number, se: number): Date {
  const primerJueves = getPrimerJuevesEnero(anio)
  const inicioPrimeraSE = new Date(primerJueves)
  inicioPrimeraSE.setDate(inicioPrimeraSE.getDate() - 6)
  
  inicioPrimeraSE.setDate(inicioPrimeraSE.getDate() + (se - 1) * 7)
  return inicioPrimeraSE
}
