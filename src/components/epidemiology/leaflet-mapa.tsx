"use client"
import { useMemo } from "react"
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface MapaContentProps {
  datos: { distrito: string; lat: number; lng: number; casos: number; enfermedad?: string }[]
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

export function LeafletMapa({ datos, onDistritoClick }: MapaContentProps) {
  const center: [number, number] = useMemo(() => {
    if (datos.length === 0) return [-4.5, -74.5]
    const lat = datos.reduce((sum, d) => sum + d.lat, 0) / datos.length
    const lng = datos.reduce((sum, d) => sum + d.lng, 0) / datos.length
    return [lat, lng]
  }, [datos])

  return (
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
  )
}
