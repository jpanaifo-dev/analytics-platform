"use client"

import { useMemo } from "react"
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface MapaInteractivoProps {
  datos: { distrito: string; lat: number; lng: number; casos: number; enfermedad?: string }[]
  enfermedadActiva?: string
  onDistritoClick?: (distrito: string, casos: number) => void
}

const getColor = (casos: number): string => {
  if (casos === 0) return "#22c55e"
  if (casos <= 5) return "#eab308"
  if (casos <= 15) return "#f97316"
  return "#ef4444"
}

const getRadio = (casos: number): number => {
  if (casos === 0) return 8
  return Math.min(8 + casos * 2, 30)
}

export function MapaInteractivo({ datos, enfermedadActiva, onDistritoClick }: MapaInteractivoProps) {
  const totalCasos = useMemo(() => datos.reduce((a, b) => a + b.casos, 0), [datos])
  const distritosConCasos = useMemo(() => datos.filter(d => d.casos > 0).length, [datos])

  const center: [number, number] = useMemo(() => {
    if (datos.length === 0) return [-4.5, -74.5]
    const lat = datos.reduce((sum, d) => sum + d.lat, 0) / datos.length
    const lng = datos.reduce((sum, d) => sum + d.lng, 0) / datos.length
    return [lat, lng]
  }, [datos])

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
        <MapContainer
          center={center}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {datos.map((d) => (
            <CircleMarker
              key={d.distrito}
              center={[d.lat, d.lng]}
              radius={getRadio(d.casos)}
              pathOptions={{
                fillColor: getColor(d.casos),
                fillOpacity: 0.8,
                color: "#fff",
                weight: 2,
              }}
              eventHandlers={{
                click: () => {
                  if (onDistritoClick) {
                    onDistritoClick(d.distrito, d.casos)
                  }
                },
              }}
            >
              <Popup>
                <div className="min-w-37.5">
                  <strong className="text-sm text-slate-800">{d.distrito}</strong>
                  <hr className="my-2 border-slate-200" />
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-xs">Casos:</span>
                    <strong className="text-base" style={{ color: getColor(d.casos) }}>{d.casos}</strong>
                  </div>
                  {d.enfermedad && (
                    <div className="flex justify-between mt-1">
                      <span className="text-slate-500 text-xs">Enfermedad:</span>
                      <span className="text-slate-700 font-medium text-xs">{d.enfermedad}</span>
                    </div>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
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
