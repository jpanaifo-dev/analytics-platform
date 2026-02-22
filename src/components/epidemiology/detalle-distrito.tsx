"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  X, 
  MapPin, 
  Home, 
  Users, 
  AlertTriangle, 
  TrendingUp,
  Activity,
  ChevronRight,
  Building
} from "lucide-react"

interface DetalleDistritoProps {
  distrito: string
  enfermedad: string
  casos: number
  onClose: () => void
}

interface ZonaData {
  nombre: string
  casos: number
  familiasAfectadas: number
  nivelAlerta: "rojo" | "naranja" | "amarillo" | "verde"
  tendencia: "subiendo" | "estable" | "bajando"
}

interface FamiliaData {
  id: string
  direccion: string
  casos: number
  miembros: number
  edadPromedio: number
  ultimoCaso: string
}

const DATOS_ZONAS: Record<string, ZonaData[]> = {
  "IQUITOS": [
    { nombre: "Centro", casos: 15, familiasAfectadas: 8, nivelAlerta: "rojo", tendencia: "subiendo" },
    { nombre: "Pueblo Joven", casos: 12, familiasAfectadas: 6, nivelAlerta: "naranja", tendencia: "subiendo" },
    { nombre: "Bellavista", casos: 8, familiasAfectadas: 4, nivelAlerta: "naranja", tendencia: "estable" },
    { nombre: "San Juan", casos: 6, familiasAfectadas: 3, nivelAlerta: "amarillo", tendencia: "bajando" },
    { nombre: "Masusa", casos: 5, familiasAfectadas: 2, nivelAlerta: "amarillo", tendencia: "estable" },
    { nombre: "2 de Octubre", casos: 4, familiasAfectadas: 2, nivelAlerta: "verde", tendencia: "bajando" },
    { nombre: "Aeropuerto", casos: 3, familiasAfectadas: 1, nivelAlerta: "verde", tendencia: "estable" },
    { nombre: "Laguna", casos: 2, familiasAfectadas: 1, nivelAlerta: "verde", tendencia: "bajando" },
  ],
  "BELEN": [
    { nombre: "Centro", casos: 8, familiasAfectadas: 4, nivelAlerta: "naranja", tendencia: "subiendo" },
    { nombre: "Miraflores", casos: 5, familiasAfectadas: 3, nivelAlerta: "amarillo", tendencia: "estable" },
    { nombre: "Floating", casos: 4, familiasAfectadas: 2, nivelAlerta: "amarillo", tendencia: "bajando" },
  ],
  "PUNCHANA": [
    { nombre: "Centro", casos: 6, familiasAfectadas: 3, nivelAlerta: "amarillo", tendencia: "subiendo" },
    { nombre: "Lago", casos: 4, familiasAfectadas: 2, nivelAlerta: "verde", tendencia: "estable" },
  ],
  "YURIMAGUAS": [
    { nombre: "Centro", casos: 10, familiasAfectadas: 5, nivelAlerta: "naranja", tendencia: "subiendo" },
    { nombre: "Barrio Alto", casos: 7, familiasAfectadas: 4, nivelAlerta: "naranja", tendencia: "estable" },
    { nombre: "Suchiche", casos: 5, familiasAfectadas: 2, nivelAlerta: "amarillo", tendencia: "bajando" },
  ],
}

const DATOS_FAMILIAS: Record<string, FamiliaData[]> = {
  "IQUITOS": [
    { id: "F001", direccion: "Jr. Prospero #123", casos: 3, miembros: 5, edadPromedio: 28, ultimoCaso: "2026-02-18" },
    { id: "F002", direccion: "Av. Brazil #456", casos: 2, miembros: 4, edadPromedio: 35, ultimoCaso: "2026-02-17" },
    { id: "F003", direccion: "Calle Nauta #789", casos: 2, miembros: 6, edadPromedio: 22, ultimoCaso: "2026-02-16" },
    { id: "F004", direccion: "Mz. A Lt. 15 - PJ", casos: 1, miembros: 3, edadPromedio: 45, ultimoCaso: "2026-02-15" },
    { id: "F005", direccion: "Jr. Putumayo #234", casos: 1, miembros: 4, edadPromedio: 31, ultimoCaso: "2026-02-14" },
  ],
  "BELEN": [
    { id: "F101", direccion: "Campo #56", casos: 2, miembros: 4, edadPromedio: 29, ultimoCaso: "2026-02-17" },
    { id: "F102", direccion: "Ribereña #12", casos: 1, miembros: 3, edadPromedio: 42, ultimoCaso: "2026-02-16" },
  ],
}

const getColorAlerta = (nivel: string) => {
  switch(nivel) {
    case "rojo": return "bg-red-500"
    case "naranja": return "bg-orange-500"
    case "amarillo": return "bg-yellow-500"
    default: return "bg-green-500"
  }
}

const getColorTextoAlerta = (nivel: string) => {
  switch(nivel) {
    case "rojo": return "text-red-700 bg-red-50"
    case "naranja": return "text-orange-700 bg-orange-50"
    case "amarillo": return "text-yellow-700 bg-yellow-50"
    default: return "text-green-700 bg-green-50"
  }
}

const getIconTendencia = (tendencia: string) => {
  switch(tendencia) {
    case "subiendo": return <TrendingUp className="h-4 w-4 text-red-600" />
    case "bajando": return <TrendingUp className="h-4 w-4 text-green-600 rotate-180" />
    default: return <Activity className="h-4 w-4 text-gray-500" />
  }
}

export function DetalleDistrito({ distrito, enfermedad, casos, onClose }: DetalleDistritoProps) {
  const [vistaActual, setVistaActual] = useState<"zonas" | "familias" | "resumen">("zonas")
  const [zonaSeleccionada, setZonaSeleccionada] = useState<string | null>(null)

  const zonas = DATOS_ZONAS[distrito] || []
  const familias = DATOS_FAMILIAS[distrito] || []
  
  const totalFamilias = zonas.reduce((a, z) => a + z.familiasAfectadas, 0)
  const zonasAltaAlerta = zonas.filter(z => z.nivelAlerta === "rojo" || z.nivelAlerta === "naranja").length

  return (
    <Card className="w-full h-full overflow-hidden">
      <CardHeader className="pb-2 bg-slate-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">{distrito}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline">{enfermedad}</Badge>
          <Badge className="bg-blue-100 text-blue-800">{casos} casos</Badge>
        </div>
      </CardHeader>

        <Tabs value={vistaActual} onValueChange={(v: string) => setVistaActual(v as any)} className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="resumen" className="text-xs">
            <Activity className="h-3 w-3 mr-1" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="zonas" className="text-xs">
            <Building className="h-3 w-3 mr-1" />
            Zonas ({zonas.length})
          </TabsTrigger>
          <TabsTrigger value="familias" className="text-xs">
            <Home className="h-3 w-3 mr-1" />
            Familias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="m-0 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-50 border">
              <div className="flex items-center gap-2 mb-1">
                <Building className="h-4 w-4 text-slate-500" />
                <span className="text-xs text-slate-500">Zonas Afectadas</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{zonas.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border">
              <div className="flex items-center gap-2 mb-1">
                <Home className="h-4 w-4 text-slate-500" />
                <span className="text-xs text-slate-500">Familias Afectadas</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{totalFamilias}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-xs text-slate-500">Alta Prioridad</span>
              </div>
              <p className="text-2xl font-bold text-red-600">{zonasAltaAlerta}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-slate-500" />
                <span className="text-xs text-slate-500">Tasa Attack</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">2.4%</p>
            </div>
          </div>

          {zonas.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Distribución por Zonas</h4>
              <div className="space-y-2">
                {zonas.slice(0, 5).map(zona => (
                  <div key={zona.nombre} className="flex items-center justify-between p-2 rounded bg-slate-50">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getColorAlerta(zona.nivelAlerta)}`}></span>
                      <span className="text-sm">{zona.nombre}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{zona.casos}</span>
                      {getIconTendencia(zona.tendencia)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="zonas" className="m-0 p-4 max-h-[400px] overflow-y-auto">
          {zonaSeleccionada ? (
            <div className="space-y-3">
              <Button variant="ghost" size="sm" onClick={() => setZonaSeleccionada(null)}>
                <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                Volver
              </Button>
              <div className="p-3 rounded-lg border bg-muted/50">
                <h4 className="font-semibold text-card-foreground">{zonaSeleccionada}</h4>
                <p className="text-sm text-muted-foreground">Detalle de zona seleccionada</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {familias.slice(0, 4).map(fam => (
                  <div key={fam.id} className="p-2 rounded border bg-card">
                    <p className="text-xs font-medium text-card-foreground">{fam.direccion}</p>
                    <p className="text-xs text-muted-foreground">{fam.casos} caso(s)</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {zonas.map(zona => (
                <div 
                  key={zona.nombre}
                  className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => setZonaSeleccionada(zona.nombre)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${getColorAlerta(zona.nivelAlerta)}`}></span>
                      <span className="font-medium text-card-foreground">{zona.nombre}</span>
                    </div>
                    {getIconTendencia(zona.tendencia)}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{zona.casos} casos</span>
                    <span>{zona.familiasAfectadas} familias</span>
                    <Badge className={`${getColorTextoAlerta(zona.nivelAlerta)} text-[10px]`}>
                      {zona.nivelAlerta.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="familias" className="m-0 p-4 max-h-[400px] overflow-y-auto">
          <div className="space-y-2">
            {familias.length > 0 ? familias.map(fam => (
              <div key={fam.id} className="p-3 rounded-lg border hover:bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-card-foreground">{fam.direccion}</p>
                    <p className="text-xs text-muted-foreground">ID: {fam.id}</p>
                  </div>
                  <Badge variant={fam.casos > 1 ? "destructive" : "outline"}>
                    {fam.casos} {fam.casos === 1 ? "caso" : "casos"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>{fam.miembros} miembros</span>
                  <span>Edad prom: {fam.edadPromedio}</span>
                  <span>Último: {fam.ultimoCaso}</span>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-slate-500">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hay datos de familias</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
