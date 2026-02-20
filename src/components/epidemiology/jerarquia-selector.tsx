"use client"

import * as React from "react"
import { ChevronDown, MapPin, Building2 } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { UbicacionGeografica, Region, Red, Microrred, Establecimiento } from "@/types/epidemiology"

interface JerarquiaSelectorProps {
  value?: UbicacionGeografica
  onChange: (value: UbicacionGeografica | undefined) => void
  className?: string
}

interface Opcion {
  id: string
  label: string
  nivel: 'region' | 'red' | 'microrred' | 'establecimiento'
  children?: Opcion[]
}

const mockRegiones: Region[] = [
  { id: '01', codigo: 'AMZ', nombre: 'Amazonas', pais: 'Perú' },
  { id: '02', codigo: 'ANC', nombre: 'Ancash', pais: 'Perú' },
  { id: '03', codigo: 'APU', nombre: 'Apurímac', pais: 'Perú' },
  { id: '04', codigo: 'ARE', nombre: 'Arequipa', pais: 'Perú' },
  { id: '05', codigo: 'AYA', nombre: 'Ayacucho', pais: 'Perú' },
  { id: '06', codigo: 'CAJ', nombre: 'Cajamarca', pais: 'Perú' },
  { id: '07', codigo: 'CAL', nombre: 'Callao', pais: 'Perú' },
  { id: '08', codigo: 'CUS', nombre: 'Cusco', pais: 'Perú' },
  { id: '09', codigo: 'HUV', nombre: 'Huancavelica', pais: 'Perú' },
  { id: '10', codigo: 'HUA', nombre: 'Huánuco', pais: 'Perú' },
  { id: '11', codigo: 'ICA', nombre: 'Ica', pais: 'Perú' },
  { id: '12', codigo: 'JUN', nombre: 'Junín', pais: 'Perú' },
  { id: '13', codigo: 'LAL', nombre: 'La Libertad', pais: 'Perú' },
  { id: '14', codigo: 'LAM', nombre: 'Lambayeque', pais: 'Perú' },
  { id: '15', codigo: 'LIM', nombre: 'Lima', pais: 'Perú' },
  { id: '16', codigo: 'LOR', nombre: 'Loreto', pais: 'Perú' },
  { id: '17', codigo: 'MDD', nombre: 'Madre de Dios', pais: 'Perú' },
  { id: '18', codigo: 'MOQ', nombre: 'Moquegua', pais: 'Perú' },
  { id: '19', codigo: 'PAS', nombre: 'Pasco', pais: 'Perú' },
  { id: '20', codigo: 'PIU', nombre: 'Piura', pais: 'Perú' },
  { id: '21', codigo: 'PUN', nombre: 'Puno', pais: 'Perú' },
  { id: '22', codigo: 'SAM', nombre: 'San Martín', pais: 'Perú' },
  { id: '23', codigo: 'TAC', nombre: 'Tacna', pais: 'Perú' },
  { id: '24', codigo: 'TUM', nombre: 'Tumbes', pais: 'Perú' },
  { id: '25', codigo: 'UCA', nombre: 'Ucayali', pais: 'Perú' },
]

const mockRedes: Record<string, Red[]> = {
  '01': [
    { id: '0101', codigo: 'RED-01', nombre: 'Chachapoyas', regionId: '01' },
    { id: '0102', codigo: 'RED-02', nombre: 'Bagua', regionId: '01' },
    { id: '0103', codigo: 'RED-03', nombre: 'Condorcanqui', regionId: '01' },
  ],
  '15': [
    { id: '1501', codigo: 'DIRSA-LIMA', nombre: 'DIRSA Lima Centro', regionId: '15' },
    { id: '1502', codigo: 'DIRSA-LIMA-ESTE', nombre: 'DIRSA Lima Este', regionId: '15' },
    { id: '1503', codigo: 'DIRSA-LIMA-SUR', nombre: 'DIRSA Lima Sur', regionId: '15' },
    { id: '1504', codigo: 'DIRSA-LIMA-NORTE', nombre: 'DIRSA Lima Norte', regionId: '15' },
    { id: '1505', codigo: 'DIRSA-CALLAO', nombre: 'DIRSA Callao', regionId: '15' },
  ],
}

const mockMicrorredes: Record<string, Microrred[]> = {
  '1501': [
    { id: '150101', codigo: 'MR-01', nombre: 'Lima Centro', redId: '1501' },
    { id: '150102', codigo: 'MR-02', nombre: 'Breña', redId: '1501' },
    { id: '150103', codigo: 'MR-03', nombre: 'San Juan de Lurigancho', redId: '1501' },
  ],
  '1502': [
    { id: '150201', codigo: 'MR-04', nombre: 'Ate', redId: '1502' },
    { id: '150202', codigo: 'MR-05', nombre: 'Santa Anita', redId: '1502' },
    { id: '150203', codigo: 'MR-06', nombre: 'El Agustino', redId: '1502' },
  ],
}

const mockEstablecimientos: Record<string, Establecimiento[]> = {
  '150101': [
    { id: '15010101', codigo: 'I-4-001', nombre: 'Hospital Nacional Edgardo Rebagliati Martins', microrredId: '150101', nivel: 'I-4', tipo: 'ESSALUD' },
    { id: '15010102', codigo: 'I-3-001', nombre: 'Centro de Salud San Juan de Lurigancho', microrredId: '150101', nivel: 'I-3', tipo: 'MINSA' },
    { id: '15010103', codigo: 'I-2-001', nombre: 'Centro de Salud La Victoria', microrredId: '150101', nivel: 'I-2', tipo: 'MINSA' },
  ],
  '150102': [
    { id: '15010201', codigo: 'I-3-002', nombre: 'Centro de Salud Breña', microrredId: '150102', nivel: 'I-3', tipo: 'MINSA' },
    { id: '15010202', codigo: 'I-1-001', nombre: 'Posta de Salud Villa Los Reyes', microrredId: '150102', nivel: 'I-1', tipo: 'MINSA' },
  ],
}

export function JerarquiaSelector({ value, onChange, className }: JerarquiaSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [nivelActual, setNivelActual] = React.useState<number>(0)
  
  const getLabel = () => {
    if (value?.establecimiento) {
      return `${value.establecimiento.codigo} - ${value.establecimiento.nombre}`
    }
    if (value?.microrred) {
      return `${value.microrred.codigo} - ${value.microrred.nombre}`
    }
    if (value?.red) {
      return `${value.red.codigo} - ${value.red.nombre}`
    }
    if (value?.region) {
      return `${value.region.codigo} - ${value.region.nombre}`
    }
    return "Seleccionar jurisdicción..."
  }

  const opcionesRegion: Opcion[] = mockRegiones.map(r => ({
    id: r.id,
    label: `${r.codigo} - ${r.nombre}`,
    nivel: 'region' as const,
  }))

  const getOpcionesRed = (regionId: string): Opcion[] => {
    const redes = mockRedes[regionId] || []
    return redes.map(r => ({
      id: r.id,
      label: `${r.codigo} - ${r.nombre}`,
      nivel: 'red' as const,
    }))
  }

  const getOpcionesMicrorred = (redId: string): Opcion[] => {
    const microrredes = mockMicrorredes[redId] || []
    return microrredes.map(m => ({
      id: m.id,
      label: `${m.codigo} - ${m.nombre}`,
      nivel: 'microrred' as const,
    }))
  }

  const getOpcionesEstablecimiento = (microrredId: string): Opcion[] => {
    const establecimientos = mockEstablecimientos[microrredId] || []
    return establecimientos.map(e => ({
      id: e.id,
      label: `${e.codigo} - ${e.nombre} (${e.nivel})`,
      nivel: 'establecimiento' as const,
    }))
  }

  const getOpciones = (): Opcion[] => {
    if (!value?.region) return opcionesRegion
    if (!value?.red) return getOpcionesRed(value.region.id)
    if (!value?.microrred) return getOpcionesMicrorred(value.red.id)
    return getOpcionesEstablecimiento(value.microrred.id)
  }

  const getPlaceholder = (): string => {
    if (!value?.region) return "Buscar región..."
    if (!value?.red) return "Buscar red..."
    if (!value?.microrred) return "Buscar microrred..."
    return "Buscar establecimiento..."
  }

  const handleSelect = (opcion: Opcion) => {
    const nuevosDatos: UbicacionGeografica = { ...value } as UbicacionGeografica
    
    if (opcion.nivel === 'region') {
      const region = mockRegiones.find(r => r.id === opcion.id)
      nuevosDatos.region = region
      nuevosDatos.red = undefined
      nuevosDatos.microrred = undefined
      nuevosDatos.establecimiento = undefined
      setNivelActual(1)
    } else if (opcion.nivel === 'red') {
      const redes = mockRedes[value?.region?.id || ''] || []
      nuevosDatos.red = redes.find(r => r.id === opcion.id)
      nuevosDatos.microrred = undefined
      nuevosDatos.establecimiento = undefined
      setNivelActual(2)
    } else if (opcion.nivel === 'microrred') {
      const microrredes = mockMicrorredes[value?.red?.id || ''] || []
      nuevosDatos.microrred = microrredes.find(m => m.id === opcion.id)
      nuevosDatos.establecimiento = undefined
      setNivelActual(3)
    } else if (opcion.nivel === 'establecimiento') {
      const establecimientos = mockEstablecimientos[value?.microrred?.id || ''] || []
      nuevosDatos.establecimiento = establecimientos.find(e => e.id === opcion.id)
      setOpen(false)
    }
    
    onChange(nuevosDatos)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={`w-full justify-between ${className}`}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 opacity-50" />
            <span className="truncate">{getLabel()}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder={getPlaceholder()} />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup heading={value?.region ? value.red ? value.microrred ? "Establecimientos" : "Microrredes" : "Redes" : "Regiones"}>
              {getOpciones().map((opcion) => (
                <CommandItem
                  key={opcion.id}
                  value={opcion.label}
                  onSelect={() => handleSelect(opcion)}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  {opcion.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
