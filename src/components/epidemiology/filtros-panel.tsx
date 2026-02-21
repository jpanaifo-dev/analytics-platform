"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { 
  Filter, 
  X, 
  RotateCcw,
  Check,
  AlertCircle,
  MapPin,
  Users,
  Home,
  Activity
} from "lucide-react"

export interface FiltrosSalaSituacional {
  enfermedades: string[]
  distritos: string[]
  semanas: number[]
  genero: string
  edadMin: number
  edadMax: number
  tipoNotificacion: string
  nivelAlerta: string[]
}

interface FiltrosPanelProps {
  filtros: FiltrosSalaSituacional
  onFiltrosChange: (filtros: FiltrosSalaSituacional) => void
  comparacionEnfermedades: string[]
  onComparacionChange: (enfermedades: string[]) => void
}

const ENFERMEDADES_DISPONIBLES = [
  "Dengue",
  "COVID-19", 
  "Influenza",
  "Sarampión",
  "Rubéola",
  "Mpox",
  "VIH/SIDA",
  "EDA",
  "IRA",
  "Parálisis Flácida Aguda",
  "Fiebre Amarilla",
  "Tétanos",
  "Hepatitis",
  "Tuberculosis",
  "Malaria",
  "Leishmaniasis"
]

const DISTRITOS_LORETO = [
  "IQUITOS",
  "BELEN", 
  "PUNCHANA",
  "NANAY",
  "SAN JUAN",
  "LORETO",
  "RAMON CASTILLA",
  "REQUENA",
  "YURIMAGUAS",
  "ALTO AMAZONAS",
  "CONTAMANA",
  "MARISCAL RAMON CASTILLA",
  "DAMTEM"
]

const ZONAS_IQUITOS = [
  "Centro",
  "Pueblo Joven",
  "Bellavista",
  "San Juan",
  "Masusa",
  "2 de Octubre",
  "Aeropuerto",
  "Laguna",
  "Callao",
  "Carretera Iquitos-Nauta"
]

const NIVELES_ALERTA = [
  { id: "rojo", label: "Rojo - Crítico", color: "bg-red-500" },
  { id: "naranja", label: "Naranja - Alto", color: "bg-orange-500" },
  { id: "amarillo", label: "Amarillo - Medio", color: "bg-yellow-500" },
  { id: "verde", label: "Verde - Bajo", color: "bg-green-500" }
]

export function FiltrosPanel({ 
  filtros, 
  onFiltrosChange, 
  comparacionEnfermedades, 
  onComparacionChange 
}: FiltrosPanelProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"filtros" | "comparar">("filtros")

  const toggleEnfermedad = (enf: string) => {
    const nuevas = filtros.enfermedades.includes(enf)
      ? filtros.enfermedades.filter(e => e !== enf)
      : [...filtros.enfermedades, enf]
    onFiltrosChange({ ...filtros, enfermedades: nuevas })
  }

  const toggleDistrito = (dist: string) => {
    const nuevos = filtros.distritos.includes(dist)
      ? filtros.distritos.filter(d => d !== dist)
      : [...filtros.distritos, dist]
    onFiltrosChange({ ...filtros, distritos: nuevos })
  }

  const toggleAlerta = (alerta: string) => {
    const nuevas = filtros.nivelAlerta.includes(alerta)
      ? filtros.nivelAlerta.filter(a => a !== alerta)
      : [...filtros.nivelAlerta, alerta]
    onFiltrosChange({ ...filtros, nivelAlerta: nuevas })
  }

  const toggleComparacion = (enf: string) => {
    const nuevas = comparacionEnfermedades.includes(enf)
      ? comparacionEnfermedades.filter(e => e !== enf)
      : [...comparacionEnfermedades, enf]
    onComparacionChange(nuevas)
  }

  const limpiarFiltros = () => {
    onFiltrosChange({
      enfermedades: [],
      distritos: [],
      semanas: [1, 8],
      genero: "todos",
      edadMin: 0,
      edadMax: 100,
      tipoNotificacion: "todos",
      nivelAlerta: []
    })
  }

  const filtrosActivos = 
    filtros.enfermedades.length + 
    filtros.distritos.length + 
    (filtros.genero !== "todos" ? 1 : 0) +
    (filtros.tipoNotificacion !== "todos" ? 1 : 0) +
    filtros.nivelAlerta.length

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtrar
          {filtrosActivos > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filtrosActivos}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-[450px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Opciones de Filtrado
          </SheetTitle>
          <SheetDescription>
            Configure los filtros para la búsqueda de casos epidemiológicos
          </SheetDescription>
        </SheetHeader>

        <div className="flex gap-2 mt-4 border-b pb-2">
          <Button
            variant={activeTab === "filtros" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("filtros")}
            className="flex-1"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button
            variant={activeTab === "comparar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("comparar")}
            className="flex-1"
          >
            <Activity className="h-4 w-4 mr-2" />
            Comparar
          </Button>
        </div>

        {activeTab === "filtros" && (
          <div className="space-y-6 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm">Enfermedades</h3>
              <Button variant="ghost" size="sm" onClick={limpiarFiltros} className="h-6 text-xs">
                <RotateCcw className="h-3 w-3 mr-1" />
                Limpiar
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-[150px] overflow-y-auto border rounded p-2">
              {ENFERMEDADES_DISPONIBLES.map(enf => (
                <div key={enf} className="flex items-center gap-2">
                  <Checkbox 
                    id={`enf-${enf}`}
                    checked={filtros.enfermedades.includes(enf)}
                    onCheckedChange={() => toggleEnfermedad(enf)}
                  />
                  <Label htmlFor={`enf-${enf}`} className="text-sm cursor-pointer">
                    {enf}
                  </Label>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Distritos</h3>
              <div className="grid grid-cols-2 gap-2 max-h-[150px] overflow-y-auto border rounded p-2">
                {DISTRITOS_LORETO.map(dist => (
                  <div key={dist} className="flex items-center gap-2">
                    <Checkbox 
                      id={`dist-${dist}`}
                      checked={filtros.distritos.includes(dist)}
                      onCheckedChange={() => toggleDistrito(dist)}
                    />
                    <Label htmlFor={`dist-${dist}`} className="text-sm cursor-pointer">
                      {dist}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Género</h3>
              <Select 
                value={filtros.genero} 
                onValueChange={(v) => onFiltrosChange({ ...filtros, genero: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Rango de Edad: {filtros.edadMin} - {filtros.edadMax} años</h3>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label className="text-xs">Edad Mínima</Label>
                  <Slider 
                    value={[filtros.edadMin]} 
                    onValueChange={([v]: number[]) => onFiltrosChange({ ...filtros, edadMin: v })}
                    max={100} 
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs">Edad Máxima</Label>
                  <Slider 
                    value={[filtros.edadMax]} 
                    onValueChange={([v]: number[]) => onFiltrosChange({ ...filtros, edadMax: v })}
                    max={100} 
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Tipo de Notificación</h3>
              <Select 
                value={filtros.tipoNotificacion} 
                onValueChange={(v) => onFiltrosChange({ ...filtros, tipoNotificacion: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="conglomerado">Conglomerado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Nivel de Alerta</h3>
              <div className="flex flex-wrap gap-2">
                {NIVELES_ALERTA.map(alerta => (
                  <Button
                    key={alerta.id}
                    variant={filtros.nivelAlerta.includes(alerta.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAlerta(alerta.id)}
                    className="gap-1"
                  >
                    <span className={`w-2 h-2 rounded-full ${alerta.color}`}></span>
                    {alerta.label.split(" - ")[0]}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "comparar" && (
          <div className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Comparar Enfermedades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Seleccione 2 o más enfermedades para comparar sus indicadores
                </p>
                <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto border rounded p-2">
                  {ENFERMEDADES_DISPONIBLES.map(enf => (
                    <div key={enf} className="flex items-center gap-2">
                      <Checkbox 
                        id={`comp-${enf}`}
                        checked={comparacionEnfermedades.includes(enf)}
                        onCheckedChange={() => toggleComparacion(enf)}
                      />
                      <Label htmlFor={`comp-${enf}`} className="text-sm cursor-pointer">
                        {enf}
                      </Label>
                    </div>
                  ))}
                </div>
                {comparacionEnfermedades.length > 0 && (
                  <div className="mt-3 p-2 bg-slate-100 rounded">
                    <p className="text-xs font-medium">
                      {comparacionEnfermedades.length} seleccionada(s)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex gap-2 mt-6 pt-4 border-t">
          <Button onClick={() => setOpen(false)} className="flex-1">
            <Check className="h-4 w-4 mr-2" />
            Aplicar
          </Button>
          <Button variant="outline" onClick={limpiarFiltros}>
            <X className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
