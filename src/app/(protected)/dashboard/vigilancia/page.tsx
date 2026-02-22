"use client"

import { useMemo, useState } from "react"
import { EpidemiologySidebar } from "@/components/epidemiology/epidemiology-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, CheckCircle, XCircle, MapPin } from "lucide-react"
import Link from "next/link"
import { MapaInteractivo } from "@/components/epidemiology/mapa-loreto-interactive"
import { BarrasChart, HistogramaChart, ParetoChart, MosaicoChart } from "@/components/charts"
import { getDistritoCoord } from "@/lib/loreto-coords"

interface NotificacionItem {
  id: string
  anio: number
  semana: number
  numeroDocumento: string
  diagnostico: string
  tipoDx: string
  diresa: string
  notificante: string
  distrito: string
  paterno: string
  materno: string
  nombres: string
  verificado: boolean
}

const notificacionesMock: NotificacionItem[] = [
  {
    id: "1",
    anio: 2026,
    semana: 8,
    numeroDocumento: "45678912",
    diagnostico: "A90 - Dengue",
    tipoDx: "CONFIRMADO",
    diresa: "LORETO",
    notificante: "Hospital Regional Loreto",
    distrito: "IQUITOS",
    paterno: "RUIZ",
    materno: "GARCIA",
    nombres: "JUAN CARLOS",
    verificado: true
  },
  {
    id: "2",
    anio: 2026,
    semana: 8,
    numeroDocumento: "12345678",
    diagnostico: "J11 - Influenza",
    tipoDx: "PROBABLE",
    diresa: "LORETO",
    notificante: "Centro de Salud Belen",
    distrito: "BELEN",
    paterno: "LOPEZ",
    materno: "DIAZ",
    nombres: "MARIA ELENA",
    verificado: true
  },
  {
    id: "3",
    anio: 2026,
    semana: 8,
    numeroDocumento: "98765432",
    diagnostico: "A00 - Cólera",
    tipoDx: "SOSPECHOSO",
    diresa: "LORETO",
    notificante: "Centro de Salud Punchana",
    distrito: "PUNCHANA",
    paterno: "PEREZ",
    materno: "SANTOS",
    nombres: "LUIS ALBERTO",
    verificado: false
  },
  {
    id: "4",
    anio: 2026,
    semana: 7,
    numeroDocumento: "23456789",
    diagnostico: "B05 - Sarampión",
    tipoDx: "CONFIRMADO",
    diresa: "LORETO",
    notificante: "Hospital Regional Loreto",
    distrito: "IQUITOS",
    paterno: "CASTILLO",
    materno: "MORALES",
    nombres: "ANA LUCIA",
    verificado: true
  },
  {
    id: "5",
    anio: 2026,
    semana: 7,
    numeroDocumento: "34567890",
    diagnostico: "A20 - Peste",
    tipoDx: "PROBABLE",
    diresa: "LORETO",
    notificante: "Centro de Salud Nanay",
    distrito: "NANAY",
    paterno: "TORRES",
    materno: "RAMOS",
    nombres: "JOSE MANUEL",
    verificado: false
  },
  {
    id: "6",
    anio: 2026,
    semana: 7,
    numeroDocumento: "56789012",
    diagnostico: "A01 - Fiebre Tifoidea",
    tipoDx: "DEFINITIVO",
    diresa: "LORETO",
    notificante: "Centro de Salud Ramon Castilla",
    distrito: "RAMON CASTILLA",
    paterno: "GOMEZ",
    materno: "FERNANDEZ",
    nombres: "CARLOS EDUARDO",
    verificado: true
  },
  {
    id: "7",
    anio: 2026,
    semana: 6,
    numeroDocumento: "67890123",
    diagnostico: "J06 - IRDA",
    tipoDx: "PRESUNTIVO",
    diresa: "LORETO",
    notificante: "Centro de Salud Iurmaguas",
    distrito: "YURIMAGUAS",
    paterno: "MENDOZA",
    materno: "CHAVEZ",
    nombres: "ROCIO DEL PILAR",
    verificado: true
  },
  {
    id: "8",
    anio: 2026,
    semana: 6,
    numeroDocumento: "78901234",
    diagnostico: "A15 - Tuberculosis",
    tipoDx: "CONFIRMADO",
    diresa: "LORETO",
    notificante: "Hospital Regional Loreto",
    distrito: "IQUITOS",
    paterno: "VASQUEZ",
    materno: "LEIVA",
    nombres: "MIGUEL ANGEL",
    verificado: true
  },
  {
    id: "9",
    anio: 2026,
    semana: 5,
    numeroDocumento: "89012345",
    diagnostico: "B06 - Rubéola",
    tipoDx: "SOSPECHOSO",
    diresa: "LORETO",
    notificante: "Centro de Salud Requena",
    distrito: "REQUENA",
    paterno: "HUAMAN",
    materno: "QUISPE",
    nombres: "VERONICA SOLEDAD",
    verificado: false
  },
  {
    id: "10",
    anio: 2026,
    semana: 5,
    numeroDocumento: "90123456",
    diagnostico: "A02 - Inf. Intestinal",
    tipoDx: "DEFINITIVO",
    diresa: "LORETO",
    notificante: "Centro de Salud Contamana",
    distrito: "CONTAMANA",
    paterno: "ROJAS",
    materno: "MORALES",
    nombres: "FERNANDO JOSE",
    verificado: true
  }
]

export default function Page() {
  const [geresaSeleccionada, setGeresaSeleccionada] = useState("LORETO")
  const [, setDistritoSeleccionado] = useState<{distrito: string; casos: number} | null>(null)

  const datosMapa = useMemo(() => {
    const counts = new Map<string, number>()
    notificacionesMock.forEach(n => {
      counts.set(n.distrito, (counts.get(n.distrito) || 0) + 1)
    })
    return Array.from(counts.entries()).map(([distrito, casos]) => {
      const coord = getDistritoCoord(distrito)
      return {
        distrito,
        casos,
        lat: coord?.lat || -4.5,
        lng: coord?.lng || -74.5
      }
    })
  }, [])

  const datosEnfermedades = useMemo(() => {
    const counts = new Map<string, number>()
    notificacionesMock.forEach(n => {
      const dx = n.diagnostico.split(' - ')[0]
      counts.set(dx, (counts.get(dx) || 0) + 1)
    })
    return Array.from(counts.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [])

  const datosSemanas = useMemo(() => {
    const counts = new Map<number, number>()
    notificacionesMock.forEach(n => {
      counts.set(n.semana, (counts.get(n.semana) || 0) + 1)
    })
    return Array.from(counts.entries())
      .map(([semana, casos]) => ({ semana, casos }))
      .sort((a, b) => a.semana - b.semana)
  }, [])

  const handleDistritoClick = (distrito: string, casos: number) => {
    setDistritoSeleccionado({ distrito, casos })
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <EpidemiologySidebar />
      <SidebarInset>
        <SiteHeader sectionTitle="Vigilancia - Lista de Casos" />
        <div className="p-4 md:p-6 flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-62.5">
              <Select value={geresaSeleccionada} onValueChange={setGeresaSeleccionada}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar GERESA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LORETO">LORETO</SelectItem>
                  <SelectItem value="AMAZONAS">AMAZONAS</SelectItem>
                  <SelectItem value="UCAYALI">UCAYALI</SelectItem>
                  <SelectItem value="SAN MARTIN">SAN MARTÍN</SelectItem>
                  <SelectItem value="MADRE DE DIOS">MADRE DE DIOS</SelectItem>
                  <SelectItem value="LIMA">LIMA</SelectItem>
                  <SelectItem value="CALLAO">CALLAO</SelectItem>
                  <SelectItem value="PIURA">PIURA</SelectItem>
                  <SelectItem value="LAMBAYEQUE">LAMBAYEQUE</SelectItem>
                  <SelectItem value="LA LIBERTAD">LA LIBERTAD</SelectItem>
                  <SelectItem value="ANCASH">ANCASH</SelectItem>
                  <SelectItem value="HUANUCO">HUÁNUCO</SelectItem>
                  <SelectItem value="PASCO">PASCO</SelectItem>
                  <SelectItem value="JUNIN">JUNÍN</SelectItem>
                  <SelectItem value="HUANCAVELICA">HUANCAVELICA</SelectItem>
                  <SelectItem value="AYACUCHO">AYACUCHO</SelectItem>
                  <SelectItem value="APURIMAC">APURÍMAC</SelectItem>
                  <SelectItem value="CUSCO">CUSCO</SelectItem>
                  <SelectItem value="PUNO">PUNO</SelectItem>
                  <SelectItem value="MOQUEGUA">MOQUEGUA</SelectItem>
                  <SelectItem value="TACNA">TACNA</SelectItem>
                  <SelectItem value="AREQUIPA">AREQUIPA</SelectItem>
                  <SelectItem value="AYACUCHO">AYACUCHO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

            {/* <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Diagrama de Dispersión - Casos por Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <DispersionChart data={datosGrafico} />
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Mapa de Loreto - Distribución Geográfica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MapaInteractivo 
                  datos={datosMapa} 
                  enfermedadActiva="Vigilancia"
                  onDistritoClick={handleDistritoClick}
                />
              </CardContent>
            </Card>

          {/* Gráficos de Análisis */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm font-semibold">Casos por Distrito</CardTitle>
              </CardHeader>
              <CardContent>
                <BarrasChart data={datosMapa.map(d => ({ name: d.distrito, value: d.casos }))} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm font-semibold">Histograma por Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <HistogramaChart 
                  data={datosSemanas.map(d => ({ range: `SE ${d.semana}`, frecuencia: d.casos }))} 
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm font-semibold">Diagrama de Pareto</CardTitle>
              </CardHeader>
              <CardContent>
                <ParetoChart 
                  data={datosEnfermedades.slice(0, 6).map((d, _, arr) => {
                    const total = arr.reduce((sum, x) => sum + x.value, 0)
                    const prevSum = arr.slice(0, arr.indexOf(d)).reduce((sum, x) => sum + x.value, 0)
                    return { 
                      name: d.name, 
                      value: d.value,
                      acumulado: Math.round(((prevSum + d.value) / total) * 100)
                    }
                  })} 
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm font-semibold">Análisis por TipoDx</CardTitle>
              </CardHeader>
              <CardContent>
                <MosaicoChart 
                  data={[
                    { category: "Confirmado", subcategory: "Dengue", value: 3, percentage: 30 },
                    { category: "Confirmado", subcategory: "Sarampión", value: 1, percentage: 10 },
                    { category: "Confirmado", subcategory: "Tuberculosis", value: 1, percentage: 10 },
                    { category: "Probable", subcategory: "Influenza", value: 1, percentage: 10 },
                    { category: "Probable", subcategory: "Peste", value: 1, percentage: 10 },
                    { category: "Probable", subcategory: "Fiebre Tifoidea", value: 1, percentage: 10 },
                    { category: "Sospechoso", subcategory: "Cólera", value: 1, percentage: 10 },
                    { category: "Sospechoso", subcategory: "Rubéola", value: 1, percentage: 10 },
                  ]} 
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Lista de Notificaciones Individuales</CardTitle>
                <Button size="sm" asChild>
                  <Link href="/dashboard/vigilancia/notificar">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Notificación
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-2 px-2 font-medium text-xs">AÑO</th>
                      <th className="text-left py-2 px-2 font-medium text-xs">SEMANA</th>
                      <th className="text-left py-2 px-2 font-medium text-xs">N° DOCUMENTO</th>
                      <th className="text-left py-2 px-2 font-medium text-xs">DIAGNOSTICO</th>
                      <th className="text-left py-2 px-2 font-medium text-xs">TIPODX</th>
                      <th className="text-left py-2 px-2 font-medium text-xs">DIRESA</th>
                      <th className="text-left py-2 px-2 font-medium text-xs">NOTIFICANTE</th>
                      <th className="text-left py-2 px-2 font-medium text-xs">DISTRITO</th>
                      <th className="text-left py-2 px-2 font-medium text-xs">PATERNO</th>
                      <th className="text-left py-2 px-2 font-medium text-xs">MATERNO</th>
                      <th className="text-left py-2 px-2 font-medium text-xs">NOMBRES</th>
                      <th className="text-left py-2 px-2 font-medium text-xs">VERIFICA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notificacionesMock.map((notif) => (
                      <tr key={notif.id} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-2 text-xs">{notif.anio}</td>
                        <td className="py-2 px-2 text-xs">{notif.semana}</td>
                        <td className="py-2 px-2 text-xs font-mono">{notif.numeroDocumento}</td>
                        <td className="py-2 px-2 text-xs">{notif.diagnostico}</td>
                        <td className="py-2 px-2 text-xs">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                            notif.tipoDx === 'CONFIRMADO' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            notif.tipoDx === 'PROBABLE' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            notif.tipoDx === 'SOSPECHOSO' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}>
                            {notif.tipoDx}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-xs">{notif.diresa}</td>
                        <td className="py-2 px-2 text-xs">{notif.notificante}</td>
                        <td className="py-2 px-2 text-xs">{notif.distrito}</td>
                        <td className="py-2 px-2 text-xs">{notif.paterno}</td>
                        <td className="py-2 px-2 text-xs">{notif.materno}</td>
                        <td className="py-2 px-2 text-xs">{notif.nombres}</td>
                        <td className="py-2 px-2 text-xs">
                          {notif.verificado ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <footer className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Plataforma de Vigilancia Epidemiológica - MINSA
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
