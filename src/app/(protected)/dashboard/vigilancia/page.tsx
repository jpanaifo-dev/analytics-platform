"use client"

<<<<<<< HEAD
=======
import { useMemo } from "react"
>>>>>>> 0d24ce3 (fixed  firts commmit)
import { EpidemiologySidebar } from "@/components/epidemiology/epidemiology-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { JerarquiaSelector } from "@/components/epidemiology/jerarquia-selector"
<<<<<<< HEAD
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
=======
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter, Download, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { DispersionChart } from "@/components/epidemiology/dispersion-chart"
import { MapaLoreto } from "@/components/epidemiology/mapa-loreto"

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
>>>>>>> 0d24ce3 (fixed  firts commmit)
  }
]

export default function Page() {
<<<<<<< HEAD
=======
  const datosGrafico = useMemo(() => {
    return notificacionesMock.map(n => ({
      semana: n.semana,
      casos: 1,
      distrito: n.distrito
    }))
  }, [])

  const datosMapa = useMemo(() => {
    const counts = new Map<string, number>()
    notificacionesMock.forEach(n => {
      counts.set(n.distrito, (counts.get(n.distrito) || 0) + 1)
    })
    return Array.from(counts.entries()).map(([distrito, casos]) => ({ distrito, casos }))
  }, [])
>>>>>>> 0d24ce3 (fixed  firts commmit)
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

<<<<<<< HEAD
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Casos Notificados</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Notificación
=======
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Diagrama de Dispersión - Casos por Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <DispersionChart data={datosGrafico} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Mapa de Loreto - Distribución Geográfica</CardTitle>
              </CardHeader>
              <CardContent>
                <MapaLoreto datos={datosMapa} />
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
>>>>>>> 0d24ce3 (fixed  firts commmit)
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
<<<<<<< HEAD
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
=======
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
                      <tr key={notif.id} className="border-b hover:bg-accent/50">
                        <td className="py-2 px-2 text-xs">{notif.anio}</td>
                        <td className="py-2 px-2 text-xs">{notif.semana}</td>
                        <td className="py-2 px-2 text-xs font-mono">{notif.numeroDocumento}</td>
                        <td className="py-2 px-2 text-xs">{notif.diagnostico}</td>
                        <td className="py-2 px-2 text-xs">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                            notif.tipoDx === 'CONFIRMADO' ? 'bg-green-100 text-green-800' :
                            notif.tipoDx === 'PROBABLE' ? 'bg-yellow-100 text-yellow-800' :
                            notif.tipoDx === 'SOSPECHOSO' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
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
>>>>>>> 0d24ce3 (fixed  firts commmit)
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
