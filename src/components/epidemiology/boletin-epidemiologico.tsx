"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FileText, 
  Download, 
  Eye, 
  Send,
  Calendar,
  Activity,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
  Edit,
  Printer
} from "lucide-react"

interface Boletin {
  id: string
  numero: number
  anio: number
  semanaInicio: number
  semanaFin: number
  fechaGeneracion: string
  fechaPublicacion: string | null
  estado: "borrador" | "revisando" | "publicado"
  totalCasos: number
  enfermedades: string[]
  distritosAfectados: number
  alertasActivas: number
  generadoPor: string
}

interface ResumenSemanal {
  semana: number
  anio: number
  totalCasos: number
  casosDengue: number
  casosInfluenza: number
  casosEDA: number
  casosIRA: number
  defunciones: number
  distritosAfectados: number
  alertasActivas: number
}

function generateMockBoletines(): Boletin[] {
  return [
    {
      id: "BOL-2026-08",
      numero: 8,
      anio: 2026,
      semanaInicio: 8,
      semanaFin: 8,
      fechaGeneracion: "2026-02-21",
      fechaPublicacion: null,
      estado: "borrador",
      totalCasos: 156,
      enfermedades: ["Dengue", "Influenza", "EDA", "IRA"],
      distritosAfectados: 12,
      alertasActivas: 3,
      generadoPor: "Sistema Automático"
    },
    {
      id: "BOL-2026-07",
      numero: 7,
      anio: 2026,
      semanaInicio: 7,
      semanaFin: 7,
      fechaGeneracion: "2026-02-14",
      fechaPublicacion: "2026-02-15",
      estado: "publicado",
      totalCasos: 142,
      enfermedades: ["Dengue", "COVID-19", "Influenza"],
      distritosAfectados: 10,
      alertasActivas: 2,
      generadoPor: "Sistema Automático"
    },
    {
      id: "BOL-2026-06",
      numero: 6,
      anio: 2026,
      semanaInicio: 6,
      semanaFin: 6,
      fechaGeneracion: "2026-02-07",
      fechaPublicacion: "2026-02-08",
      estado: "publicado",
      totalCasos: 128,
      enfermedades: ["Dengue", "Influenza", "EDA"],
      distritosAfectados: 9,
      alertasActivas: 1,
      generadoPor: "Dr. Juan Pérez"
    },
    {
      id: "BOL-2026-05",
      numero: 5,
      anio: 2026,
      semanaInicio: 5,
      semanaFin: 5,
      fechaGeneracion: "2026-01-31",
      fechaPublicacion: "2026-02-01",
      estado: "publicado",
      totalCasos: 115,
      enfermedades: ["Dengue", "COVID-19"],
      distritosAfectados: 8,
      alertasActivas: 1,
      generadoPor: "Sistema Automático"
    }
  ]
}

function generateResumenActual(): ResumenSemanal {
  return {
    semana: 8,
    anio: 2026,
    totalCasos: 156,
    casosDengue: 85,
    casosInfluenza: 28,
    casosEDA: 32,
    casosIRA: 11,
    defunciones: 2,
    distritosAfectados: 12,
    alertasActivas: 3
  }
}

function getColorEstado(estado: Boletin["estado"]) {
  switch (estado) {
    case "borrador": return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    case "revisando": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "publicado": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
  }
}

export function BoletinEpidemiologico({ className }: { className?: string }) {
  const [boletinSeleccionado, setBoletinSeleccionado] = useState<Boletin | null>(null)
  const [verPreview, setVerPreview] = useState(false)
  
  const boletines = useMemo(() => generateMockBoletines(), [])
  const resumen = useMemo(() => generateResumenActual(), [])

  const boletinActual = boletines[0]
  const boletinesPublicados = boletines.filter(b => b.estado === "publicado")
  const boletinesBorrador = boletines.filter(b => b.estado === "borrador")

  const PreviewBoletin = ({ boletin }: { boletin: Boletin }) => (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center border-b pb-4">
        <h2 className="text-lg font-bold">BOLETÍN EPIDEMIOLÓGICO</h2>
        <p className="text-sm text-muted-foreground">Semana Epidemiológica {boletin.semanaInicio} - {boletin.anio}</p>
        <p className="text-xs text-muted-foreground">Región Loreto - Perú</p>
      </div>

      {/* Resumen Ejecutivo */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">Total Casos</p>
          <p className="text-xl font-bold">{boletin.totalCasos}</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">Distritos Afectados</p>
          <p className="text-xl font-bold">{boletin.distritosAfectados}</p>
        </div>
      </div>

      {/* Enfermedades */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Enfermedades en Vigilancia</h3>
        <div className="flex flex-wrap gap-1">
          {boletin.enfermedades.map((enf, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {enf}
            </Badge>
          ))}
        </div>
      </div>

      {/* Alertas */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Alertas Activas</h3>
        <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400">
            {boletin.alertasActivas} alerta(s) activa(s) requiriendo atención
          </p>
        </div>
      </div>

      {/* Recomendaciones */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Recomendaciones</h3>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li>• Continuar vigilancia epidemiológica activa</li>
          <li>• Intensificar control vectorial en zonas endémicas</li>
          <li>• Verificar disponibilidad de insumos para atención</li>
          <li>• Coordinar con establecimientos de salud</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground pt-4 border-t">
        <p>Generado automáticamente el {boletin.fechaGeneracion}</p>
        <p>Dirección Regional de Salud Loreto - MINSA</p>
      </div>
    </div>
  )

  return (
    <div className={className}>
      <Card>
        <CardHeader className="pb-2 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Boletín Epidemiológico Semanal
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setVerPreview(true)}>
                <Eye className="h-3 w-3 mr-1" />
                Vista Previa
              </Button>
              <Button size="sm">
                <Send className="h-3 w-3 mr-1" />
                Publicar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          {/* Resumen de la Semana Actual */}
          <div className="mb-4 p-3 bg-primary/5 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">SE {resumen.semana} - {resumen.anio}</span>
              <Badge variant="outline" className="text-xs ml-auto">Borrador</Badge>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-lg font-bold">{resumen.totalCasos}</p>
                <p className="text-[10px] text-muted-foreground">Total Casos</p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-600">{resumen.casosDengue}</p>
                <p className="text-[10px] text-muted-foreground">Dengue</p>
              </div>
              <div>
                <p className="text-lg font-bold">{resumen.distritosAfectados}</p>
                <p className="text-[10px] text-muted-foreground">Distritos</p>
              </div>
              <div>
                <p className="text-lg font-bold text-orange-600">{resumen.alertasActivas}</p>
                <p className="text-[10px] text-muted-foreground">Alertas</p>
              </div>
            </div>
          </div>

          {/* Listado de Boletines */}
          <div>
            <h3 className="text-xs font-semibold mb-2 text-muted-foreground">BOLETINES ANTERIORES</h3>
            <div className="space-y-2">
              {boletines.slice(1).map(boletin => (
                <div 
                  key={boletin.id}
                  className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => setBoletinSeleccionado(boletin)}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Boletín N° {boletin.numero}</p>
                      <p className="text-xs text-muted-foreground">SE {boletin.semanaInicio} - {boletin.anio}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getColorEstado(boletin.estado)} text-[10px]`}>
                      {boletin.estado}
                    </Badge>
                    {boletin.estado === "publicado" && (
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                {boletinesPublicados.length} publicados
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-yellow-500" />
                {boletinesBorrador.length} pendientes
              </span>
            </div>
            <span>Generado: {boletinActual.fechaGeneracion}</span>
          </div>
        </CardContent>
      </Card>

      {/* Modal Preview */}
      {verPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Vista Previa - Boletín N° {boletinActual.numero}</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                <Button size="sm" variant="outline">
                  <Printer className="h-3 w-3 mr-1" />
                  Imprimir
                </Button>
                <Button size="sm" variant="outline" onClick={() => setVerPreview(false)}>
                  <Download className="h-3 w-3 mr-1" />
                  Descargar PDF
                </Button>
                <Button size="sm" onClick={() => setVerPreview(false)}>
                  <Send className="h-3 w-3 mr-1" />
                  Publicar
                </Button>
              </div>
            </div>
            <div className="p-6">
              <PreviewBoletin boletin={boletinActual} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
