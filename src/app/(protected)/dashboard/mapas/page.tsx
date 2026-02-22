"use client"

import { useState, useMemo } from "react"
import { EpidemiologySidebar } from "@/components/epidemiology/epidemiology-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapaInteractivo } from "@/components/epidemiology/mapa-loreto-interactive"
import { BarrasChart } from "@/components/charts"
import { 
  MapPin, 
  Layers,
  BarChart3,
  List,
  ZoomIn,
  ZoomOut,
  Maximize2
} from "lucide-react"

interface DistritoData {
  nombre: string
  provincia: string
  casos: number
  tasa: number
  tendencia: "ascendente" | "estable" | "descendente"
  nivelAlerta: "epidemia" | "alarma" | "seguridad" | "exito"
}

interface ProvinciaData {
  nombre: string
  casos: number
  distritos: number
  casosPromedio: number
}

const datosDistritos: DistritoData[] = [
  { nombre: "IQUITOS", provincia: "MAYNAS", casos: 45, tasa: 125.5, tendencia: "ascendente", nivelAlerta: "epidemia" },
  { nombre: "BELEN", provincia: "MAYNAS", casos: 28, tasa: 98.2, tendencia: "ascendente", nivelAlerta: "alarma" },
  { nombre: "PUNCHANA", provincia: "MAYNAS", casos: 22, tasa: 75.3, tendencia: "estable", nivelAlerta: "alarma" },
  { nombre: "NANAY", provincia: "MAYNAS", casos: 15, tasa: 52.1, tendencia: "descendente", nivelAlerta: "seguridad" },
  { nombre: "SAN JUAN", provincia: "MAYNAS", casos: 8, tasa: 35.8, tendencia: "estable", nivelAlerta: "seguridad" },
  { nombre: "YURIMAGUAS", provincia: "ALTO AMAZONAS", casos: 18, tasa: 62.4, tendencia: "ascendente", nivelAlerta: "alarma" },
  { nombre: "LAGUNAS", provincia: "ALTO AMAZONAS", casos: 12, tasa: 45.2, tendencia: "estable", nivelAlerta: "seguridad" },
  { nombre: "SANTA CRUZ", provincia: "ALTO AMAZONAS", casos: 5, tasa: 22.1, tendencia: "descendente", nivelAlerta: "exito" },
  { nombre: "REQUENA", provincia: "LORETO", casos: 14, tasa: 48.9, tendencia: "ascendente", nivelAlerta: "seguridad" },
  { nombre: "CAPANA", provincia: "LORETO", casos: 8, tasa: 32.5, tendencia: "estable", nivelAlerta: "seguridad" },
  { nombre: "CONTAMANA", provincia: "UCAYALI", casos: 20, tasa: 55.8, tendencia: "ascendente", nivelAlerta: "alarma" },
  { nombre: "VARGAS GUERRA", provincia: "UCAYALI", casos: 10, tasa: 38.2, tendencia: "descendente", nivelAlerta: "seguridad" },
  { nombre: "RAMON CASTILLA", provincia: "MARISCAL RAMON CASTILLA", casos: 16, tasa: 58.3, tendencia: "ascendente", nivelAlerta: "alarma" },
  { nombre: "YAVARI", provincia: "MARISCAL RAMON CASTILLA", casos: 7, tasa: 28.4, tendencia: "estable", nivelAlerta: "exito" },
]

const datosProvincias: ProvinciaData[] = [
  { nombre: "MAYNAS", casos: 123, distritos: 5, casosPromedio: 24.6 },
  { nombre: "ALTO AMAZONAS", casos: 35, distritos: 3, casosPromedio: 11.7 },
  { nombre: "LORETO", casos: 22, distritos: 2, casosPromedio: 11.0 },
  { nombre: "UCAYALI", casos: 30, distritos: 2, casosPromedio: 15.0 },
  { nombre: "MARISCAL RAMON CASTILLA", casos: 23, distritos: 2, casosPromedio: 11.5 },
]

function getColorAlerta(nivel: DistritoData["nivelAlerta"]) {
  switch (nivel) {
    case "epidemia": return "bg-red-500 text-white"
    case "alarma": return "bg-orange-500 text-white"
    case "seguridad": return "bg-yellow-500 text-white"
    case "exito": return "bg-green-500 text-white"
  }
}



export default function MapasEpidemiologicosPage() {
  const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState("Dengue")
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("todos")

  const datosMapa = useMemo(() => {
    return datosDistritos.map(d => ({
      distrito: d.nombre,
      lat: getLatLng(d.nombre).lat,
      lng: getLatLng(d.nombre).lng,
      casos: d.casos
    }))
  }, [])

  const datosFiltrados = useMemo(() => {
    if (provinciaSeleccionada === "todos") return datosDistritos
    return datosDistritos.filter(d => d.provincia === provinciaSeleccionada)
  }, [provinciaSeleccionada])

  const stats = useMemo(() => ({
    totalCasos: datosDistritos.reduce((sum, d) => sum + d.casos, 0),
    distritosAfectados: datosDistritos.filter(d => d.casos > 0).length,
    nivelMax: datosDistritos.reduce((max, d) => d.casos > max.casos ? d : max).nombre,
    tasaPromedio: Math.round(datosDistritos.reduce((sum, d) => sum + d.tasa, 0) / datosDistritos.length)
  }), [])

  return (
    <SidebarProvider defaultOpen={true}>
      <EpidemiologySidebar />
      <SidebarInset>
        <SiteHeader sectionTitle="Mapas Epidemiológicos - Loreto" />
        <div className="p-4 md:p-6 flex flex-col gap-4">
          
          {/* Filtros */}
          <Card>
            <CardContent className="p-3">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Select value={enfermedadSeleccionada} onValueChange={setEnfermedadSeleccionada}>
                    <SelectTrigger className="w-45">
                      <SelectValue placeholder="Enfermedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dengue">Dengue</SelectItem>
                      <SelectItem value="COVID-19">COVID-19</SelectItem>
                      <SelectItem value="Influenza">Influenza</SelectItem>
                      <SelectItem value="EDA">Enfermedades Diarreicas</SelectItem>
                      <SelectItem value="IRA">Infecciones Respiratorias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <Select value={provinciaSeleccionada} onValueChange={setProvinciaSeleccionada}>
                    <SelectTrigger className="w-50">
                      <SelectValue placeholder="Provincia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas las Provincias</SelectItem>
                      {datosProvincias.map(p => (
                        <SelectItem key={p.nombre} value={p.nombre}>{p.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm">
                    <ZoomIn className="h-3 w-3 mr-1" />
                    Zoom In
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomOut className="h-3 w-3 mr-1" />
                    Zoom Out
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize2 className="h-3 w-3 mr-1" />
                    Pantalla Completa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold">{stats.totalCasos}</p>
                <p className="text-xs text-muted-foreground">Total Casos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold">{stats.distritosAfectados}</p>
                <p className="text-xs text-muted-foreground">Distritos Afectados</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-red-600">{stats.nivelMax}</p>
                <p className="text-xs text-muted-foreground">Mayor Casos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold">{stats.tasaPromedio}</p>
                <p className="text-xs text-muted-foreground">Tasa x 100,000</p>
              </CardContent>
            </Card>
          </div>

          {/* Mapa y Detalles */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Mapa */}
            <div className="xl:col-span-2">
              <MapaInteractivo 
                datos={datosMapa} 
                enfermedadActiva={enfermedadSeleccionada}
              />
            </div>

            {/* Panel Lateral */}
            <div className="space-y-4">
              {/* Provincias */}
              <Card>
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Provincias
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="space-y-1">
                    {datosProvincias.map(provincia => (
                      <div key={provincia.nombre} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                        <span className="text-sm font-medium">{provincia.nombre}</span>
                        <div className="text-right">
                          <span className="text-sm font-bold">{provincia.casos}</span>
                          <span className="text-xs text-muted-foreground ml-2">({provincia.distritos} dist)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico de Provincias */}
              <Card>
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Casos por Provincia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BarrasChart 
                    data={datosProvincias.map(p => ({ name: p.nombre.substring(0, 8), value: p.casos }))}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabla de Distritos */}
          <Card>
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-sm flex items-center gap-2">
                <List className="h-4 w-4" />
                Detalle por Distrito {provinciaSeleccionada !== "todos" ? `- ${provinciaSeleccionada}` : ""}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-semibold text-xs">Distrito</th>
                      <th className="text-left p-2 font-semibold text-xs">Provincia</th>
                      <th className="text-center p-2 font-semibold text-xs">Casos</th>
                      <th className="text-center p-2 font-semibold text-xs">Tasa x 100K</th>
                      <th className="text-center p-2 font-semibold text-xs">Tendencia</th>
                      <th className="text-center p-2 font-semibold text-xs">Nivel Alerta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosFiltrados.sort((a, b) => b.casos - a.casos).map(distrito => (
                      <tr key={distrito.nombre} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{distrito.nombre}</td>
                        <td className="p-2 text-muted-foreground">{distrito.provincia}</td>
                        <td className="p-2 text-center font-bold">{distrito.casos}</td>
                        <td className="p-2 text-center">{distrito.tasa.toFixed(1)}</td>
                        <td className="p-2 text-center">
                          <span className={`text-xs ${
                            distrito.tendencia === "ascendente" ? "text-red-500" :
                            distrito.tendencia === "descendente" ? "text-green-500" :
                            "text-muted-foreground"
                          }`}>
                            {distrito.tendencia === "ascendente" ? "↑" : 
                             distrito.tendencia === "descendente" ? "↓" : "→"} {distrito.tendencia}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <Badge className={`${getColorAlerta(distrito.nivelAlerta)} text-[10px]`}>
                            {distrito.nivelAlerta.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function getLatLng(distrito: string): { lat: number; lng: number } {
  const coords: Record<string, { lat: number; lng: number }> = {
    "IQUITOS": { lat: -3.7437, lng: -73.2516 },
    "BELEN": { lat: -3.7623, lng: -73.2264 },
    "PUNCHANA": { lat: -3.7235, lng: -73.2801 },
    "NANAY": { lat: -3.8167, lng: -73.3333 },
    "SAN JUAN": { lat: -3.5500, lng: -73.3000 },
    "YURIMAGUAS": { lat: -5.9018, lng: -76.1023 },
    "LAGUNAS": { lat: -5.6000, lng: -75.8000 },
    "SANTA CRUZ": { lat: -5.3000, lng: -75.5000 },
    "REQUENA": { lat: -5.0667, lng: -73.8333 },
    "CAPANA": { lat: -5.2000, lng: -73.6000 },
    "CONTAMANA": { lat: -7.3333, lng: -75.0167 },
    "VARGAS GUERRA": { lat: -7.5000, lng: -75.2000 },
    "RAMON CASTILLA": { lat: -4.9167, lng: -74.2833 },
    "YAVARI": { lat: -4.7000, lng: -74.1000 },
  }
  return coords[distrito] || { lat: -4.5, lng: -74.5 }
}
