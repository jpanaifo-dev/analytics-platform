export interface DistritoCoord {
  nombre: string
  lat: number
  lng: number
  casos: number
}

export const DISTRITOS_LORETO_COORD: DistritoCoord[] = [
  { nombre: "IQUITOS", lat: -3.7437, lng: -73.2516, casos: 3 },
  { nombre: "BELEN", lat: -3.7623, lng: -73.2264, casos: 1 },
  { nombre: "PUNCHANA", lat: -3.7235, lng: -73.2801, casos: 1 },
  { nombre: "NANAY", lat: -3.8167, lng: -73.3333, casos: 1 },
  { nombre: "RAMON CASTILLA", lat: -4.2667, lng: -73.9667, casos: 1 },
  { nombre: "YURIMAGUAS", lat: -5.9018, lng: -76.1023, casos: 1 },
  { nombre: "REQUENA", lat: -5.0667, lng: -73.8333, casos: 1 },
  { nombre: "CONTAMANA", lat: -7.3333, lng: -75.0167, casos: 1 },
  { nombre: "SAN JUAN", lat: -3.5500, lng: -73.3000, casos: 0 },
  { nombre: "LORETO", lat: -4.5000, lng: -73.5000, casos: 0 },
  { nombre: "MARISCAL RAMON CASTILLA", lat: -4.9167, lng: -74.2833, casos: 0 },
  { nombre: "ALTO AMAZONAS", lat: -5.6000, lng: -75.8000, casos: 0 },
  { nombre: "DAMTEM", lat: -4.4500, lng: -74.9500, casos: 0 },
]

export const getDistritoCoord = (nombre: string): DistritoCoord | undefined => {
  return DISTRITOS_LORETO_COORD.find(d => d.nombre === nombre)
}
