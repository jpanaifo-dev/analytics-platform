"use client"

import { EpidemiologySidebar } from "@/components/epidemiology/epidemiology-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { JerarquiaSelector } from "@/components/epidemiology/jerarquia-selector"
import { BadgeClasificacion, BadgeCondicion } from "@/components/epidemiology/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Caso } from "@/types/epidemiology"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter, Download, FileText } from "lucide-react"

const casosMock: Caso[] = [
  {
    id: "1",
    numeroNotificacion: "NOTI-2026-00001",
    fechaNotificacion: new Date("2026-02-18"),
    semanaEpidemiologica: { anio: 2026, se: 7, fechaInicio: new Date("2026-02-10"), fechaFin: new Date("2026-02-16"), fechaSemana: new Date() },
    paciente: {
      tipoDocumento: "DNI",
      numeroDocumento: "12345678",
      nombres: "Maria",
      apellidoPaterno: "Garcia",
      apellidoMaterno: "Lopez",
      fechaNacimiento: new Date("1990-05-15"),
      edad: 35,
      unidadEdad: "AÑOS",
      sexo: "F",
      telefono: "999888777"
    },
    ubicacion: {
      region: { id: "15", codigo: "LIM", nombre: "Lima", pais: "Perú" },
      red: { id: "1501", codigo: "DIRSA-LIMA", nombre: "DIRSA Lima Centro", regionId: "15" },
      microrred: { id: "150101", codigo: "MR-01", nombre: "Lima Centro", redId: "1501" },
      establecimiento: { id: "1", codigo: "I-4-001", nombre: "Hospital Central", microrredId: "150101", nivel: "I-4", tipo: "MINSA" }
    },
    diagnostico: {
      diagnosticoPrincipal: { codigo: "A90", categoria: "A", descripcion: "Dengue [fiebre hemorrhágica del dengue]", grupo: "Enfermedades transmitidas por vectores" }
    },
    clasificacion: "CONFIRMADO",
    condicion: "VIVO",
    fechaInicioSintomas: new Date("2026-02-14"),
    fechaTomaMuestra: new Date("2026-02-15"),
    tipoNotificacion: "INMEDIATA",
    notificadoPor: "Dr. Juan Perez",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    numeroNotificacion: "NOTI-2026-00002",
    fechaNotificacion: new Date("2026-02-19"),
    semanaEpidemiologica: { anio: 2026, se: 7, fechaInicio: new Date("2026-02-10"), fechaFin: new Date("2026-02-16"), fechaSemana: new Date() },
    paciente: {
      tipoDocumento: "DNI",
      numeroDocumento: "87654321",
      nombres: "Carlos",
      apellidoPaterno: "Rodriguez",
      apellidoMaterno: "Santos",
      fechaNacimiento: new Date("1985-08-22"),
      edad: 40,
      unidadEdad: "AÑOS",
      sexo: "M",
      telefono: "977766655"
    },
    ubicacion: {
      region: { id: "15", codigo: "LIM", nombre: "Lima", pais: "Perú" },
      red: { id: "1502", codigo: "DIRSA-LIMA-ESTE", nombre: "DIRSA Lima Este", regionId: "15" },
      microrred: { id: "150201", codigo: "MR-04", nombre: "Ate", redId: "1502" }
    },
    diagnostico: {
      diagnosticoPrincipal: { codigo: "J11", categoria: "J", descripcion: "Influenza con neumonía", grupo: "Enfermedades respiratorias" }
    },
    clasificacion: "PROBABLE",
    condicion: "VIVO",
    fechaInicioSintomas: new Date("2026-02-16"),
    fechaHospitalizacion: new Date("2026-02-18"),
    tipoNotificacion: "INMEDIATA",
    notificadoPor: "Dra. Ana Lopez",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function Page() {
  return (
    <SidebarProvider defaultOpen={false}>
      <EpidemiologySidebar />
      <SidebarInset>
        <SiteHeader sectionTitle="Vigilancia - Lista de Casos" />
        <div className="p-4 md:p-6 flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-[300px]">
              <JerarquiaSelector onChange={(v) => console.log(v)} />
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

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Casos Notificados</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Notificación
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">NOTI</th>
                      <th className="text-left py-3 px-2 font-medium">Paciente</th>
                      <th className="text-left py-3 px-2 font-medium">Diagnóstico</th>
                      <th className="text-left py-3 px-2 font-medium">Clasificación</th>
                      <th className="text-left py-3 px-2 font-medium">Condición</th>
                      <th className="text-left py-3 px-2 font-medium">Establecimiento</th>
                      <th className="text-left py-3 px-2 font-medium">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {casosMock.map((caso) => (
                      <tr key={caso.id} className="border-b hover:bg-accent/50">
                        <td className="py-3 px-2">
                          <a href={`/dashboard/vigilancia/${caso.id}`} className="text-primary hover:underline flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {caso.numeroNotificacion}
                          </a>
                        </td>
                        <td className="py-3 px-2">
                          <div>
                            <p className="font-medium">{caso.paciente.apellidoPaterno} {caso.paciente.apellidoMaterno}, {caso.paciente.nombres}</p>
                            <p className="text-xs text-muted-foreground">{caso.paciente.tipoDocumento}: {caso.paciente.numeroDocumento}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <p className="font-mono text-xs">{caso.diagnostico.diagnosticoPrincipal.codigo}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[150px]">{caso.diagnostico.diagnosticoPrincipal.descripcion}</p>
                        </td>
                        <td className="py-3 px-2">
                          <BadgeClasificacion clasificacion={caso.clasificacion} />
                        </td>
                        <td className="py-3 px-2">
                          <BadgeCondicion condicion={caso.condicion} />
                        </td>
                        <td className="py-3 px-2 text-xs">
                          {caso.ubicacion.establecimiento?.nombre || caso.ubicacion.microrred?.nombre || "-"}
                        </td>
                        <td className="py-3 px-2 text-xs">
                          {caso.fechaNotificacion.toLocaleDateString("es-PE")}
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
