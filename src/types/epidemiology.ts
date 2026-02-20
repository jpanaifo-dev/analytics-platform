export interface SemanaEpidemiologica {
  anio: number
  se: number
  fechaInicio: Date
  fechaFin: Date
  fechaSemana: Date
}

export interface Region {
  id: string
  codigo: string
  nombre: string
  pais: string
}

export interface Red {
  id: string
  codigo: string
  nombre: string
  regionId: string
}

export interface Microrred {
  id: string
  codigo: string
  nombre: string
  redId: string
}

export interface Establecimiento {
  id: string
  codigo: string
  nombre: string
  microrredId: string
  nivel: 'I-1' | 'I-2' | 'I-3' | 'I-4'
  tipo: 'MINSA' | 'ESSALUD' | 'PRIVADO' | 'OTRO'
  latitud?: number
  longitud?: number
}

export interface UbicacionGeografica {
  region?: Region
  red?: Red
  microrred?: Microrred
  establecimiento?: Establecimiento
}

export interface DiagnosticoCIE10 {
  codigo: string
  categoria: string
  descripcion: string
  grupo: string
  esBrotes?: boolean
}

export type TipoNotificacion = 'INMEDIATA' | 'SEMANAL' | 'ESPECIAL'
export type ClasificacionCaso = 'SOSPECHOSO' | 'PROBABLE' | 'CONFIRMADO' | 'DESCARTADO'
export type CondicionPaciente = 'VIVO' | 'FALLECIDO' | 'TRASLADADO' | 'DESCONOCIDO'

export interface Caso {
  id: string
  numeroNotificacion: string
  fechaNotificacion: Date
  semanaEpidemiologica: SemanaEpidemiologica
  
  paciente: {
    tipoDocumento: 'DNI' | 'CE' | 'PASAPORTE' | 'OTRO'
    numeroDocumento: string
    nombres: string
    apellidoPaterno: string
    apellidoMaterno: string
    fechaNacimiento: Date
    edad: number
    unidadEdad: 'AÑOS' | 'MESES' | 'DIAS'
    sexo: 'M' | 'F'
    telefono?: string
    email?: string
  }
  
  ubicacion: UbicacionGeografica
  
  diagnostico: {
    diagnosticoPrincipal: DiagnosticoCIE10
    diagnosticosSecundarios?: DiagnosticoCIE10[]
  }
  
  clasificacion: ClasificacionCaso
  condicion: CondicionPaciente
  fechaInicioSintomas: Date
  fechaTomaMuestra?: Date
  fechaHospitalizacion?: Date
  fechaDefuncion?: Date
  
  tipoNotificacion: TipoNotificacion
  notificadoPor: string
  observaciones?: string
  
  createdAt: Date
  updatedAt: Date
}

export type NivelAlerta = 'INFO' | 'ADVERTENCIA' | 'ALERTA' | 'EMERGENCIA'

export interface Alerta {
  id: string
  titulo: string
  mensaje: string
  nivel: NivelAlerta
  tipo: 'BROTE' | 'UMBRAL' | 'TENDENCIA' | 'ESPECIAL'
  
  regionId?: string
  redId?: string
  diagnosticoCodigo?: string
  
  casosRegistrados: number
  casosEsperados?: number
  umbral?: number
  
  estado: 'ACTIVA' | 'EN_SEGUIMIENTO' | 'RESUELTA'
  
  fechaDeteccion: Date
  fechaActualizacion: Date
  fechaResolucion?: Date
  
  acciones?: string[]
}

export interface DatoCanalEndemico {
  semana: number
  anio: number
  casos: number
  min: number
  p25: number
  p50: number
  p75: number
  max: number
}

export interface KpiEpidemiologico {
  indicador: string
  valor: number
  valorAnterior?: number
  unidad: string
  tendencia: 'SUBE' | 'BAJA' | 'ESTABLE'
  icono: string
}

export interface DatoMapaCalor {
  establecimientoId: string
  establecimientoNombre: string
  microrredId: string
  microrredNombre: string
  latitud: number
  longitud: number
  casos: number
  tasa: number
}

export interface PrediccionBrotes {
  diagnostico: DiagnosticoCIE10
  probabilidadBrote: number
  semanasPronostico: number
  casosEstimados: number
  intervaloConfianza: {
    inferior: number
    superior: number
  }
  factoresRiesgo?: string[]
}

export interface DashboardResumen {
  semanaActual: SemanaEpidemiologica
  casosRegistrados: number
  casosSemanaAnterior: number
  alertasActivas: number
  establecimientosNotificadores: number
  listaKpi: KpiEpidemiologico[]
}
