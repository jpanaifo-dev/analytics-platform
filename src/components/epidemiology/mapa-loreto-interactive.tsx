"use client"
import { useMemo } from "react"
import dynamic from "next/dynamic"

const LeafletMapa = dynamic(async () => {
  const mapaModule = await import("./leaflet-mapa")
  return mapaModule.LeafletMapa
}, {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center">
      <span className="text-slate-500">Cargando mapa...</span>
    </div>
  ),
})

interface MapaInteractivoProps {
  datos: { distrito: string; lat: number; lng: number; casos: number; enfermedad?: string }[]
  enfermedadActiva?: string
  onDistritoClick?: (distrito: string, casos: number) => void
}

export function MapaInteractivo({ datos, enfermedadActiva, onDistritoClick }: MapaInteractivoProps) {
  const totalCasos = useMemo(() => datos.reduce((a, b) => a + b.casos, 0), [datos])
  const distritosConCasos = useMemo(() => datos.filter(d => d.casos > 0).length, [datos])

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 p-3 bg-card rounded-lg border">
        <div>
          <h3 className="text-sm font-bold text-card-foreground">Mapa Interactivo - Loreto</h3>
          <p className="text-xs text-muted-foreground">Región de Salud Loreto</p>
          {enfermedadActiva && (
            <p className="text-xs font-medium text-amber-600 mt-1">{enfermedadActiva}</p>
          )}
        </div>
        <div className="flex gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-card-foreground">{totalCasos}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Total Casos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{distritosConCasos}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Distritos Afectados</p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-100 rounded-lg overflow-hidden border">
        <LeafletMapa datos={datos} onDistritoClick={onDistritoClick} />
      </div>

      <div className="mt-3 p-3 bg-card rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th colSpan={4} className="text-left p-2 font-bold text-card-foreground">
                LEYENDA - {enfermedadActiva || "Dengue"}
              </th>
              <th className="text-right p-2 font-bold text-card-foreground">
                Total: {totalCasos} casos
              </th>
            </tr>
          </thead>
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-2 font-semibold text-xs">Indicador</th>
              <th className="text-center p-2 font-semibold text-xs">Casos</th>
              <th className="text-center p-2 font-semibold text-xs">Color</th>
              <th className="text-center p-2 font-semibold text-xs">Descripción</th>
              <th className="text-right p-2 font-semibold text-xs">
                Distritos Afectados: {distritosConCasos}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2"><span className="text-red-500 text-lg">●</span> Rojo</td>
              <td className="p-2 text-center">16+</td>
              <td className="p-2 text-center"><span className="inline-block w-4 h-4 rounded bg-red-500"></span></td>
              <td className="p-2">Epidemia</td>
              <td></td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><span className="text-orange-500 text-lg">●</span> Naranja</td>
              <td className="p-2 text-center">6-15</td>
              <td className="p-2 text-center"><span className="inline-block w-4 h-4 rounded bg-orange-500"></span></td>
              <td className="p-2">Alarma</td>
              <td></td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><span className="text-yellow-500 text-lg">●</span> Amarillo</td>
              <td className="p-2 text-center">1-5</td>
              <td className="p-2 text-center"><span className="inline-block w-4 h-4 rounded bg-yellow-500"></span></td>
              <td className="p-2">Seguridad</td>
              <td></td>
            </tr>
            <tr>
              <td className="p-2"><span className="text-green-500 text-lg">●</span> Verde</td>
              <td className="p-2 text-center">0</td>
              <td className="p-2 text-center"><span className="inline-block w-4 h-4 rounded bg-green-500"></span></td>
              <td className="p-2">Éxito</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
