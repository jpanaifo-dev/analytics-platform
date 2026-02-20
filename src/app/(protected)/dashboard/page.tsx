"use client"

import { EpidemiologySidebar } from "@/components/epidemiology/epidemiology-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { KpiGrid } from "@/components/epidemiology/kpi-card"
import { CanalEndemicoChart, generateMockCanalEndemicoData } from "@/components/epidemiology/canal-endemico"
import { AlertaPanel, AlertaCard } from "@/components/epidemiology/alerta-panel"
import { JerarquiaSelector } from "@/components/epidemiology/jerarquia-selector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KpiEpidemiologico, Alerta } from "@/types/epidemiology"
import { getSemanaEpidemiologica, formatearSE, formatearRangoSE } from "@/lib/epidemiology-utils"
import { Calendar } from "lucide-react"

const kpisMock: KpiEpidemiologico[] = [
  {
    indicador: "Casos Notificados",
    valor: 1247,
    valorAnterior: 1156,
    unidad: "casos",
    tendencia: "SUBE",
    icono: "activity"
  },
  {
    indicador: "Casos Confirmados",
    valor: 342,
    valorAnterior: 389,
    unidad: "casos",
    tendencia: "BAJA",
    icono: "users"
  },
  {
    indicador: "Alertas Activas",
    valor: 7,
    valorAnterior: 4,
    unidad: "alertas",
    tendencia: "SUBE",
    icono: "alert"
  },
  {
    indicador: "Establecimientos",
    valor: 89,
    valorAnterior: 85,
    unidad: "EESS",
    tendencia: "ESTABLE",
    icono: "shield"
  }
]

const alertasMock: Alerta[] = [
  {
    id: "1",
    titulo: "Brote de Dengue en Lima Sur",
    mensaje: "Se han reportado 45 casos confirmados en los últimos 7 días, superando el umbral epidémico",
    nivel: "ALERTA",
    tipo: "BROTE",
    regionId: "15",
    casosRegistrados: 45,
    umbral: 30,
    estado: "ACTIVA",
    fechaDeteccion: new Date("2026-02-15"),
    fechaActualizacion: new Date("2026-02-20"),
    acciones: ["Activar protocolo de control vectorial", "Notificar a DIRIS Lima Sur"]
  },
  {
    id: "2",
    titulo: "Incremento de IRAG",
    mensaje: "Tendencia ascendente de IRAs en menores de 5 años en la región Cusco",
    nivel: "ADVERTENCIA",
    tipo: "TENDENCIA",
    regionId: "08",
    casosRegistrados: 156,
    umbral: 200,
    estado: "ACTIVA",
    fechaDeteccion: new Date("2026-02-18"),
    fechaActualizacion: new Date("2026-02-20"),
    acciones: ["Reforzar vigilancia epidemiológica"]
  },
  {
    id: "3",
    titulo: "Sarampión - Caso Importado",
    mensaje: "Se确认了一例输入性麻疹病例 in Lima",
    nivel: "EMERGENCIA",
    tipo: "ESPECIAL",
    regionId: "15",
    casosRegistrados: 1,
    estado: "ACTIVA",
    fechaDeteccion: new Date("2026-02-19"),
    fechaActualizacion: new Date("2026-02-20"),
    acciones: ["Investigación de contactos", "Verificación de vacunación"]
  }
]

export default function Page() {
  const semanaActual = getSemanaEpidemiologica(new Date())
  const canalData = generateMockCanalEndemicoData({ anio: semanaActual.anio })

  return (
    <SidebarProvider defaultOpen={false}>
      <EpidemiologySidebar />
      <SidebarInset>
        <SiteHeader sectionTitle="Sala Situacional" />
        <div className="p-4 md:p-6 flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">
                  {formatearSE(semanaActual)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatearRangoSE(semanaActual)}
              </span>
            </div>
            
            <div className="w-full sm:w-[300px]">
              <JerarquiaSelector
                onChange={(value) => console.log("Selected:", value)}
              />
            </div>
          </div>

          <KpiGrid kpis={kpisMock} />

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Canal Endémico - IRAG</CardTitle>
              </CardHeader>
              <CardContent>
                <CanalEndemicoChart
                  data={canalData}
                  semanaActual={semanaActual.se}
                  titulo=""
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <AlertaCard alertas={alertasMock} />
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Alertas Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <AlertaPanel alertas={alertasMock} />
                </CardContent>
              </Card>
            </div>
          </div>

          <footer className="text-xs text-muted-foreground text-center py-4">
            © {new Date().getFullYear()} Plataforma de Vigilancia Epidemiológica - MINSA
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
