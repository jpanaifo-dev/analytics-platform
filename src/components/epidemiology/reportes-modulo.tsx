"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Download, 
  BarChart3,
  PieChart,
  Table,
  Calendar,
  Filter,
  Printer,
  Eye,
  FileSpreadsheet,
  Presentation,
  MapPin
} from "lucide-react"

interface Reporte {
  id: string
  nombre: string
  tipo: "estadistico" | "grafico" | "mapa" | "tabla" | "piechart"
  formato: "pdf" | "excel" | "csv" | "pptx"
  frecuencia: "diario" | "semanal" | "mensual" | "on_demand" | "anual"
  ultimoGenerado: string | null
  estado: "activo" | "inactivo"
}

interface ReporteGenerado {
  id: string
  reporteId: string
  nombre: string
  fechaGeneracion: string
  formato: string
  tamaño: string
  url: string
}

const reportesDisponibles: Reporte[] = [
  { id: "RPT-001", nombre: "Resumen Semanal de Casos", tipo: "estadistico", formato: "pdf", frecuencia: "semanal", ultimoGenerado: "2026-02-21", estado: "activo" },
  { id: "RPT-002", nombre: "Casos por Distrito y Provincia", tipo: "tabla", formato: "excel", frecuencia: "semanal", ultimoGenerado: "2026-02-21", estado: "activo" },
  { id: "RPT-003", nombre: "Análisis de Tendencias", tipo: "grafico", formato: "pptx", frecuencia: "mensual", ultimoGenerado: "2026-02-01", estado: "activo" },
  { id: "RPT-004", nombre: "Mapa de Calor - Dengue", tipo: "mapa", formato: "pdf", frecuencia: "semanal", ultimoGenerado: "2026-02-21", estado: "activo" },
  { id: "RPT-005", nombre: "Alertas Activas", tipo: "estadistico", formato: "pdf", frecuencia: "diario", ultimoGenerado: "2026-02-21", estado: "activo" },
  { id: "RPT-006", nombre: "Casos por Grupo Etario", tipo: "grafico", formato: "excel", frecuencia: "mensual", ultimoGenerado: "2026-02-01", estado: "activo" },
  { id: "RPT-007", nombre: "Boletín Epidemiológico", tipo: "estadistico", formato: "pdf", frecuencia: "semanal", ultimoGenerado: "2026-02-21", estado: "activo" },
  { id: "RPT-008", nombre: "Comparación Interanual", tipo: "grafico", formato: "pptx", frecuencia: "anual", ultimoGenerado: "2026-01-01", estado: "activo" },
  { id: "RPT-009", nombre: "Distribución por Sexo", tipo: "piechart", formato: "excel", frecuencia: "mensual", ultimoGenerado: "2026-02-01", estado: "activo" },
  { id: "RPT-010", nombre: "Casos Graves y Defunciones", tipo: "estadistico", formato: "pdf", frecuencia: "semanal", ultimoGenerado: "2026-02-21", estado: "activo" },
]

const reportesGenerados: ReporteGenerado[] = [
  { id: "GEN-001", reporteId: "RPT-001", nombre: "Resumen Semanal SE08", fechaGeneracion: "2026-02-21 14:30", formato: "PDF", tamaño: "2.4 MB", url: "#" },
  { id: "GEN-002", reporteId: "RPT-002", nombre: "Casos por Distrito SE08", fechaGeneracion: "2026-02-21 14:25", formato: "XLSX", tamaño: "156 KB", url: "#" },
  { id: "GEN-003", reporteId: "RPT-004", nombre: "Mapa Dengue SE08", fechaGeneracion: "2026-02-21 14:20", formato: "PDF", tamaño: "5.1 MB", url: "#" },
  { id: "GEN-004", reporteId: "RPT-005", nombre: "Alertas Activas", fechaGeneracion: "2026-02-21 08:00", formato: "PDF", tamaño: "890 KB", url: "#" },
  { id: "GEN-005", reporteId: "RPT-001", nombre: "Resumen Semanal SE07", fechaGeneracion: "2026-02-14 14:30", formato: "PDF", tamaño: "2.2 MB", url: "#" },
]

function getIconTipo(tipo: Reporte["tipo"]) {
  switch (tipo) {
    case "estadistico": return <FileText className="h-4 w-4" />
    case "grafico": return <BarChart3 className="h-4 w-4" />
    case "mapa": return <MapPin className="h-4 w-4" />
    case "tabla": return <Table className="h-4 w-4" />
    default: return <FileText className="h-4 w-4" />
  }
}

function getColorFormato(formato: string) {
  switch (formato) {
    case "pdf": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    case "excel": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    case "pptx": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
    case "csv": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    default: return "bg-gray-100 text-gray-800"
  }
}

export function ReportesModulo({ className }: { className?: string }) {
  const [reporteSeleccionado, setReporteSeleccionado] = useState<string>("todos")
  const [formatoSeleccionado, setFormatoSeleccionado] = useState<string>("todos")

  const reportesFiltrados = useMemo(() => {
    return reportesDisponibles.filter(r => {
      if (reporteSeleccionado !== "todos" && r.tipo !== reporteSeleccionado) return false
      if (formatoSeleccionado !== "todos" && r.formato !== formatoSeleccionado) return false
      return true
    })
  }, [reporteSeleccionado, formatoSeleccionado])

  const stats = useMemo(() => ({
    total: reportesDisponibles.length,
    activos: reportesDisponibles.filter(r => r.estado === "activo").length,
    generadosHoy: reportesGenerados.filter(r => r.fechaGeneracion.startsWith("2026-02-21")).length,
    ultimaSemana: reportesGenerados.filter(r => r.fechaGeneracion.includes("2026-02")).length
  }), [])

  return (
    <div className={className}>
      <Tabs defaultValue="generar" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="generar">Generar Reportes</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
          <TabsTrigger value="programados">Programados</TabsTrigger>
        </TabsList>

        <TabsContent value="generar">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <Card>
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Reportes Disponibles</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{stats.activos}</p>
                  <p className="text-xs text-muted-foreground">Activos</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{stats.generadosHoy}</p>
                  <p className="text-xs text-muted-foreground">Generados Hoy</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{stats.ultimaSemana}</p>
                  <p className="text-xs text-muted-foreground">Última Semana</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <div className="flex gap-3 mb-4">
            <Select value={reporteSeleccionado} onValueChange={setReporteSeleccionado}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de Reporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los Tipos</SelectItem>
                <SelectItem value="estadistico">Estadístico</SelectItem>
                <SelectItem value="grafico">Gráfico</SelectItem>
                <SelectItem value="mapa">Mapa</SelectItem>
                <SelectItem value="tabla">Tabla</SelectItem>
              </SelectContent>
            </Select>
            <Select value={formatoSeleccionado} onValueChange={setFormatoSeleccionado}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="pptx">PowerPoint</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Listado de Reportes */}
          <div className="grid gap-2">
            {reportesFiltrados.map(reporte => (
              <Card key={reporte.id}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getIconTipo(reporte.tipo)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{reporte.nombre}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${getColorFormato(reporte.formato)} text-[10px]`}>
                            {reporte.formato.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground capitalize">{reporte.frecuencia}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {reporte.ultimoGenerado && (
                        <span className="text-xs text-muted-foreground">
                          Último: {reporte.ultimoGenerado}
                        </span>
                      )}
                      <Button size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Generar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="historial">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Reportes Generados Recientemente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {reportesGenerados.map(reporte => (
                  <div key={reporte.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{reporte.nombre}</p>
                        <p className="text-xs text-muted-foreground">{reporte.fechaGeneracion} • {reporte.tamaño}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Printer className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programados">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Reportes Programados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hay reportes programados</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Programar Reporte
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
