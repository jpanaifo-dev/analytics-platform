"use client"

import { useEffect, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface MapaInteractivoProps {
  datos: { distrito: string; lat: number; lng: number; casos: number; enfermedad?: string }[]
  enfermedadActiva?: string
  onDistritoClick?: (distrito: string, casos: number) => void
}

const getColor = (casos: number): string => {
  if (casos === 0) return "#22c55e"
  if (casos <= 2) return "#eab308"
  if (casos <= 5) return "#f97316"
  return "#ef4444"
}

const getRadio = (casos: number): number => {
  if (casos === 0) return 8
  return Math.min(8 + casos * 3, 30)
}

export function MapaInteractivo({ datos, enfermedadActiva, onDistritoClick }: MapaInteractivoProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'distrito-click' && onDistritoClick) {
        onDistritoClick(event.data.distrito, event.data.casos)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-[500px] bg-slate-100 rounded-lg flex items-center justify-center">
        <span className="text-slate-500">Cargando mapa...</span>
      </div>
    )
  }

  const totalCasos = datos.reduce((a, b) => a + b.casos, 0)
  const distritosConCasos = datos.filter(d => d.casos > 0).length

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

      <div className="relative w-full h-[500px] rounded-lg overflow-hidden border">
        <iframe
        srcDoc={`
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    #map { height: 100vh; width: 100%; }
    .custom-popup .leaflet-popup-content-wrapper { border-radius: 8px; }
    .custom-popup .leaflet-popup-content { margin: 12px; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const map = L.map('map', {
      center: [-4.5, -74.5],
      zoom: 6,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    const datos = ${JSON.stringify(datos)};

    datos.forEach(d => {
      const color = (() => {
        if (d.casos === 0) return '#22c55e';
        if (d.casos <= 2) return '#eab308';
        if (d.casos <= 5) return '#f97316';
        return '#ef4444';
      })();

      const radius = d.casos === 0 ? 8 : Math.min(8 + d.casos * 3, 30);

      const circle = L.circleMarker([d.lat, d.lng], {
        radius: radius,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);

      circle.bindPopup(\`
        <div style="min-width: 150px;">
          <strong style="font-size: 14px; color: #1e293b;">\${d.distrito}</strong>
          <hr style="margin: 6px 0; border: none; border-top: 1px solid #e2e8f0;"/>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="color: #64748b;">Casos:</span>
            <strong style="color: \${color}; font-size: 16px;">\${d.casos}</strong>
          </div>
          \${d.enfermedad ? \`<div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">Enfermedad:</span>
            <span style="color: #0f172a; font-weight: 500;">\${d.enfermedad}</span>
          </div>\` : ''}
        </div>
      \`, { className: 'custom-popup' });

      circle.on('mouseover', function() {
        this.setStyle({ fillOpacity: 1, weight: 3 });
      });

      circle.on('mouseout', function() {
        this.setStyle({ fillOpacity: 0.8, weight: 2 });
      });

      circle.on('click', function() {
        if (window.parent !== window && window.onDistritoClick) {
          window.onDistritoClick(d.distrito, d.casos);
        }
      });
    });

    window.onDistritoClick = ${onDistritoClick ? `function(distrito, casos) {
      window.parent.postMessage({ type: 'distrito-click', distrito: distrito, casos: casos }, '*');
    }` : 'null'};

    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'distrito-click' && window.onDistritoClick) {
        window.onDistritoClick(e.data.distrito, e.data.casos);
      }
    });

    const bounds = L.latLngBounds(datos.map(d => [d.lat, d.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
  </script>
</body>
</html>`}
        className="w-full h-full border-0"
        title="Mapa de Loreto"
      />
      </div>

      <div className="mt-3 p-3 bg-card rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th colSpan={4} className="text-left p-2 font-bold text-card-foreground">
                LEYENDA - Dengue
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
              <td className="p-2 text-center">31+</td>
              <td className="p-2 text-center"><span className="inline-block w-4 h-4 rounded bg-red-500"></span></td>
              <td className="p-2">Epidemia</td>
              <td></td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><span className="text-orange-500 text-lg">●</span> Naranja</td>
              <td className="p-2 text-center">16-30</td>
              <td className="p-2 text-center"><span className="inline-block w-4 h-4 rounded bg-orange-500"></span></td>
              <td className="p-2">Alarma</td>
              <td></td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><span className="text-yellow-500 text-lg">●</span> Amarillo</td>
              <td className="p-2 text-center">6-15</td>
              <td className="p-2 text-center"><span className="inline-block w-4 h-4 rounded bg-yellow-500"></span></td>
              <td className="p-2">Seguridad</td>
              <td></td>
            </tr>
            <tr>
              <td className="p-2"><span className="text-green-500 text-lg">●</span> Verde</td>
              <td className="p-2 text-center">0-5</td>
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
