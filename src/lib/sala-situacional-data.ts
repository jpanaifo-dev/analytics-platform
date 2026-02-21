export interface DatoEpidemiologico {
  distrito: string
  lat: number
  lng: number
  casos: number
  enfermedad: string
  semana: number
  anno: number
}

export interface ResumenEnfermedad {
  enfermedad: string
  casosTotales: number
  distritosAfectados: number
  tendencia: "ascendente" | "estable" | "descendente"
  riesgo: "bajo" | "medio" | "alto"
}

export const ENFERMEDADES_TRANSMISIBLES = {
  epv: {
    nombre: "Enfermedades Prevenibles por Vacunas",
    subcategorias: ["Sarampión-Rubéola", "Parálisis Flácida Aguda", "Fiebre Amarilla", "Mpox", "Otras Inmunoprevenibles"]
  },
  metaxenicas: {
    nombre: "Enfermedades Metaxénicas",
    subcategorias: ["Dengue", "Otras Metaxénicas"]
  },
  zoonoticas: {
    nombre: "Enfermedades Zoonóticas",
    subcategorias: ["Zoonosis", "Influenza Aviar"]
  },
  respiratorias: {
    nombre: "Infecciones Respiratorias",
    subcategorias: ["COVID-19", "Influenza y OVR", "IRA", "Temporada de Bajas Temperaturas"]
  },
  otras: {
    nombre: "Otras Infecciosas",
    subcategorias: ["VIH/SIDA", "EDA", "SGB"]
  }
}

export const ENFERMEDADES_NO_TRANSMISIBLES = {
  cronicas: {
    nombre: "Enfermedades Crónicas",
    subcategorias: ["Cáncer", "Diabetes"]
  },
  lesiones: {
    nombre: "Lesiones y Violencia",
    subcategorias: ["Lesiones por Accidente de Tránsito", "Violencia Familiar", "Salud Mental"]
  },
  maternas: {
    nombre: "Salud Materna e Infantil",
    subcategorias: ["Muerte Fetal y Neonatal", "Morbilidad Materna Extrema", "Muerte Materna"]
  },
  ambientales: {
    nombre: "Riesgos Ambientales",
    subcategorias: ["Vigilancia de Metales Pesados", "Clima y Salud"]
  }
}

export const DISTRITOS_FRONTERIZOS = [
  "RAMON CASTILLA",
  "MARISCAL RAMON CASTILLA", 
  "CONTAMANA",
  "YURIMAGUAS",
  "ALTO AMAZONAS",
  "DAMTEM"
]

export const getDatosMockEnfermedad = (enfermedad: string): DatoEpidemiologico[] => {
  const datosPorEnfermedad: Record<string, DatoEpidemiologico[]> = {
    "Dengue": [
      { distrito: "IQUITOS", lat: -3.7437, lng: -73.2516, casos: 45, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "BELEN", lat: -3.7623, lng: -73.2264, casos: 28, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "PUNCHANA", lat: -3.7235, lng: -73.2801, casos: 15, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "NANAY", lat: -3.8167, lng: -73.3333, casos: 12, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "SAN JUAN", lat: -3.5500, lng: -73.3000, casos: 8, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "YURIMAGUAS", lat: -5.9018, lng: -76.1023, casos: 22, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "REQUENA", lat: -5.0667, lng: -73.8333, casos: 6, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "CONTAMANA", lat: -7.3333, lng: -75.0167, casos: 3, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "RAMON CASTILLA", lat: -4.2667, lng: -73.9667, casos: 5, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "LORETO", lat: -4.5000, lng: -73.5000, casos: 0, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "ALTO AMAZONAS", lat: -5.6000, lng: -75.8000, casos: 0, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "MARISCAL RAMON CASTILLA", lat: -4.9167, lng: -74.2833, casos: 0, enfermedad: "Dengue", semana: 8, anno: 2026 },
      { distrito: "DAMTEM", lat: -4.4500, lng: -74.9500, casos: 0, enfermedad: "Dengue", semana: 8, anno: 2026 },
    ],
    "COVID-19": [
      { distrito: "IQUITOS", lat: -3.7437, lng: -73.2516, casos: 12, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "BELEN", lat: -3.7623, lng: -73.2264, casos: 5, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "PUNCHANA", lat: -3.7235, lng: -73.2801, casos: 3, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "NANAY", lat: -3.8167, lng: -73.3333, casos: 0, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "YURIMAGUAS", lat: -5.9018, lng: -76.1023, casos: 8, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "REQUENA", lat: -5.0667, lng: -73.8333, casos: 2, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "CONTAMANA", lat: -7.3333, lng: -75.0167, casos: 0, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "RAMON CASTILLA", lat: -4.2667, lng: -73.9667, casos: 1, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "SAN JUAN", lat: -3.5500, lng: -73.3000, casos: 4, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "LORETO", lat: -4.5000, lng: -73.5000, casos: 0, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "ALTO AMAZONAS", lat: -5.6000, lng: -75.8000, casos: 0, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "MARISCAL RAMON CASTILLA", lat: -4.9167, lng: -74.2833, casos: 0, enfermedad: "COVID-19", semana: 8, anno: 2026 },
      { distrito: "DAMTEM", lat: -4.4500, lng: -74.9500, casos: 0, enfermedad: "COVID-19", semana: 8, anno: 2026 },
    ],
    "Influenza": [
      { distrito: "IQUITOS", lat: -3.7437, lng: -73.2516, casos: 18, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "BELEN", lat: -3.7623, lng: -73.2264, casos: 10, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "PUNCHANA", lat: -3.7235, lng: -73.2801, casos: 6, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "NANAY", lat: -3.8167, lng: -73.3333, casos: 4, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "YURIMAGUAS", lat: -5.9018, lng: -76.1023, casos: 12, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "REQUENA", lat: -5.0667, lng: -73.8333, casos: 3, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "CONTAMANA", lat: -7.3333, lng: -75.0167, casos: 2, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "RAMON CASTILLA", lat: -4.2667, lng: -73.9667, casos: 1, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "SAN JUAN", lat: -3.5500, lng: -73.3000, casos: 5, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "LORETO", lat: -4.5000, lng: -73.5000, casos: 0, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "ALTO AMAZONAS", lat: -5.6000, lng: -75.8000, casos: 0, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "MARISCAL RAMON CASTILLA", lat: -4.9167, lng: -74.2833, casos: 0, enfermedad: "Influenza", semana: 8, anno: 2026 },
      { distrito: "DAMTEM", lat: -4.4500, lng: -74.9500, casos: 0, enfermedad: "Influenza", semana: 8, anno: 2026 },
    ],
    "Sarampión": [
      { distrito: "IQUITOS", lat: -3.7437, lng: -73.2516, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "BELEN", lat: -3.7623, lng: -73.2264, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "PUNCHANA", lat: -3.7235, lng: -73.2801, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "NANAY", lat: -3.8167, lng: -73.3333, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "YURIMAGUAS", lat: -5.9018, lng: -76.1023, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "REQUENA", lat: -5.0667, lng: -73.8333, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "CONTAMANA", lat: -7.3333, lng: -75.0167, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "RAMON CASTILLA", lat: -4.2667, lng: -73.9667, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "SAN JUAN", lat: -3.5500, lng: -73.3000, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "LORETO", lat: -4.5000, lng: -73.5000, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "ALTO AMAZONAS", lat: -5.6000, lng: -75.8000, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "MARISCAL RAMON CASTILLA", lat: -4.9167, lng: -74.2833, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
      { distrito: "DAMTEM", lat: -4.4500, lng: -74.9500, casos: 0, enfermedad: "Sarampión", semana: 8, anno: 2026 },
    ],
    "Mpox": [
      { distrito: "IQUITOS", lat: -3.7437, lng: -73.2516, casos: 2, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "BELEN", lat: -3.7623, lng: -73.2264, casos: 1, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "PUNCHANA", lat: -3.7235, lng: -73.2801, casos: 0, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "NANAY", lat: -3.8167, lng: -73.3333, casos: 0, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "YURIMAGUAS", lat: -5.9018, lng: -76.1023, casos: 1, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "REQUENA", lat: -5.0667, lng: -73.8333, casos: 0, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "CONTAMANA", lat: -7.3333, lng: -75.0167, casos: 0, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "RAMON CASTILLA", lat: -4.2667, lng: -73.9667, casos: 0, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "SAN JUAN", lat: -3.5500, lng: -73.3000, casos: 0, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "LORETO", lat: -4.5000, lng: -73.5000, casos: 0, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "ALTO AMAZONAS", lat: -5.6000, lng: -75.8000, casos: 0, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "MARISCAL RAMON CASTILLA", lat: -4.9167, lng: -74.2833, casos: 0, enfermedad: "Mpox", semana: 8, anno: 2026 },
      { distrito: "DAMTEM", lat: -4.4500, lng: -74.9500, casos: 0, enfermedad: "Mpox", semana: 8, anno: 2026 },
    ],
    "VIH/SIDA": [
      { distrito: "IQUITOS", lat: -3.7437, lng: -73.2516, casos: 8, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "BELEN", lat: -3.7623, lng: -73.2264, casos: 3, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "PUNCHANA", lat: -3.7235, lng: -73.2801, casos: 2, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "NANAY", lat: -3.8167, lng: -73.3333, casos: 1, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "YURIMAGUAS", lat: -5.9018, lng: -76.1023, casos: 4, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "REQUENA", lat: -5.0667, lng: -73.8333, casos: 1, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "CONTAMANA", lat: -7.3333, lng: -75.0167, casos: 0, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "RAMON CASTILLA", lat: -4.2667, lng: -73.9667, casos: 1, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "SAN JUAN", lat: -3.5500, lng: -73.3000, casos: 2, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "LORETO", lat: -4.5000, lng: -73.5000, casos: 0, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "ALTO AMAZONAS", lat: -5.6000, lng: -75.8000, casos: 0, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "MARISCAL RAMON CASTILLA", lat: -4.9167, lng: -74.2833, casos: 0, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
      { distrito: "DAMTEM", lat: -4.4500, lng: -74.9500, casos: 0, enfermedad: "VIH/SIDA", semana: 8, anno: 2026 },
    ],
    "EDA": [
      { distrito: "IQUITOS", lat: -3.7437, lng: -73.2516, casos: 35, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "BELEN", lat: -3.7623, lng: -73.2264, casos: 22, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "PUNCHANA", lat: -3.7235, lng: -73.2801, casos: 18, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "NANAY", lat: -3.8167, lng: -73.3333, casos: 14, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "YURIMAGUAS", lat: -5.9018, lng: -76.1023, casos: 28, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "REQUENA", lat: -5.0667, lng: -73.8333, casos: 12, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "CONTAMANA", lat: -7.3333, lng: -75.0167, casos: 8, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "RAMON CASTILLA", lat: -4.2667, lng: -73.9667, casos: 6, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "SAN JUAN", lat: -3.5500, lng: -73.3000, casos: 10, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "LORETO", lat: -4.5000, lng: -73.5000, casos: 4, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "ALTO AMAZONAS", lat: -5.6000, lng: -75.8000, casos: 5, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "MARISCAL RAMON CASTILLA", lat: -4.9167, lng: -74.2833, casos: 2, enfermedad: "EDA", semana: 8, anno: 2026 },
      { distrito: "DAMTEM", lat: -4.4500, lng: -74.9500, casos: 1, enfermedad: "EDA", semana: 8, anno: 2026 },
    ],
  }

  return datosPorEnfermedad[enfermedad] || datosPorEnfermedad["Dengue"]
}

export const getResumenEnfermedades = (): ResumenEnfermedad[] => {
  return [
    { enfermedad: "Dengue", casosTotales: 144, distritosAfectados: 8, tendencia: "ascendente", riesgo: "alto" },
    { enfermedad: "COVID-19", casosTotales: 35, distritosAfectados: 7, tendencia: "estable", riesgo: "medio" },
    { enfermedad: "Influenza", casosTotales: 61, distritosAfectados: 7, tendencia: "ascendente", riesgo: "medio" },
    { enfermedad: "Sarampión", casosTotales: 0, distritosAfectados: 0, tendencia: "estable", riesgo: "bajo" },
    { enfermedad: "Mpox", casosTotales: 4, distritosAfectados: 3, tendencia: "estable", riesgo: "bajo" },
    { enfermedad: "VIH/SIDA", casosTotales: 22, distritosAfectados: 8, tendencia: "estable", riesgo: "medio" },
    { enfermedad: "EDA", casosTotales: 161, distritosAfectados: 13, tendencia: "ascendente", riesgo: "alto" },
  ]
}
