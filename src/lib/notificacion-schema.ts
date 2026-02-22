export interface NotificacionFormData {
  tipoVigilancia: string;
  
  diresa: string;
  red: string;
  microred: string;
  establecimiento: string;
  
  tipoDocumento: string;
  numeroDocumento: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  sexo: string;
  nacionalidad: string;
  etnia: string;
  puebloEtnico: string;
  numeroHistoriaClinica: string;
  fechaHospitalizacion: string;
  edad: string;
  tipoEdad: string;
  
  paisPaciente: string;
  departamentoPaciente: string;
  provinciaPaciente: string;
  distritoPaciente: string;
  procedencia: string;
  tipoVia: string;
  numeroPuerta: string;
  nombreVia: string;
  agrupamientoRuralUrbano: string;
  nombreAgrupamiento: string;
  manzana: string;
  block: string;
  interior: string;
  kilometro: string;
  lote: string;
  referencia: string;
  latitud: string;
  longitud: string;
  
  paisInfección: string;
  departamentoInfección: string;
  provinciaInfección: string;
  distritoInfección: string;
  localidad: string;
  
  diagnostico: string;
  tipoDiagnostico: string;
  protegido: string;
  tomaMuestra: string;
  
  inicioSintomas: string;
  anioSemana: string;
  semana: string;
  defuncion: string;
  investigacion: string;
  notificacion: string;
  anioNotificacion: string;
  semanaNotificacion: string;
}

export const validateNotificacion = (data: NotificacionFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!data.tipoVigilancia) errors.tipoVigilancia = 'Requerido';
  
  if (!data.red) errors.red = 'Requerido';
  if (!data.microred) errors.microred = 'Requerido';
  if (!data.establecimiento) errors.establecimiento = 'Requerido';
  
  if (!data.tipoDocumento) errors.tipoDocumento = 'Requerido';
  if (!data.numeroDocumento) errors.numeroDocumento = 'Requerido';
  if (!data.apellidoPaterno) errors.apellidoPaterno = 'Requerido';
  if (!data.apellidoMaterno) errors.apellidoMaterno = 'Requerido';
  if (!data.nombres) errors.nombres = 'Requerido';
  if (!data.sexo) errors.sexo = 'Requerido';
  if (!data.edad) errors.edad = 'Requerido';
  if (!data.tipoEdad) errors.tipoEdad = 'Requerido';
  
  if (!data.distritoPaciente) errors.distritoPaciente = 'Requerido';
  
  if (!data.distritoInfección) errors.distritoInfección = 'Requerido';
  
  if (!data.diagnostico) errors.diagnostico = 'Requerido';
  if (!data.tipoDiagnostico) errors.tipoDiagnostico = 'Requerido';
  
  if (!data.inicioSintomas) errors.inicioSintomas = 'Requerido';
  if (!data.anioSemana) errors.anioSemana = 'Requerido';
  if (!data.semana) errors.semana = 'Requerido';
  if (!data.notificacion) errors.notificacion = 'Requerido';
  if (!data.anioNotificacion) errors.anioNotificacion = 'Requerido';
  if (!data.semanaNotificacion) errors.semanaNotificacion = 'Requerido';
  
  return errors;
};

export const TIPOS_DOCUMENTO = [
  { value: 'DNI', label: 'DNI' },
  { value: 'CE', label: 'Carné de Extranjería' },
  { value: 'PASAPORTE', label: 'Pasaporte' },
  { value: 'OTRO', label: 'Otro' },
];

export const TIPOS_SEXO = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
];

export const NACIONALIDADES = [
  { value: 'PERU', label: 'PERÚ' },
  { value: 'EXTRANJERO', label: 'Extranjero' },
];

export const ETNIAS = [
  { value: 'NINGUNA', label: 'Ninguna' },
  { value: 'QUECHUA', label: 'Quechua' },
  { value: 'AYMARA', label: 'Aymara' },
  { value: 'ASHANINKA', label: 'Asháninka' },
  { value: 'AMAZIG', label: 'Amazig' },
  { value: 'OTRO', label: 'Otro' },
];

export const TIPOS_EDAD = [
  { value: 'AÑOS', label: 'Años' },
  { value: 'MESES', label: 'Meses' },
  { value: 'DIAS', label: 'Días' },
];

export const PROCEDENCIAS = [
  { value: 'URBANA', label: 'Urbana' },
  { value: 'RURAL', label: 'Rural' },
];

export const TIPOS_VIA = [
  { value: 'AVENIDA', label: 'Avenida' },
  { value: 'CALLE', label: 'Calle' },
  { value: 'JIRÓN', label: 'Jirón' },
  { value: 'PASAJE', label: 'Pasaje' },
  { value: 'CARRETERA', label: 'Carretera' },
  { value: 'CAMINO', label: 'Camino' },
  { value: 'OTRO', label: 'Otro' },
];

export const AGRUPAMIENTOS = [
  { value: 'URBANO', label: 'Urbano' },
  { value: 'RURAL', label: 'Rural' },
];

export const TIPOS_DIAGNOSTICO = [
  { value: 'PRESUNTIVO', label: 'Presuntivo' },
  { value: 'DEFINITIVO', label: 'Definitivo' },
  { value: 'REFRACTARIO', label: 'Refractario' },
];

export const OPCIONES_SI_NO = [
  { value: 'SI', label: 'Sí' },
  { value: 'NO', label: 'No' },
];
