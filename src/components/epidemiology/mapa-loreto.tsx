"use client"

interface MapaLoretoProps {
  datos: { distrito: string; casos: number }[]
}

export function MapaLoreto({ datos }: MapaLoretoProps) {
  const maxCasos = Math.max(...datos.map(d => d.casos), 1)
  
  const getColor = (casos: number) => {
    if (casos === 0) return "#e5e7eb"
    if (casos === 1) return "#86efac"
    if (casos === 2) return "#fde047"
    if (casos >= 3) return "#f87171"
    return "#e5e7eb"
  }

  const districtMap = new Map(datos.map(d => [d.distrito.toUpperCase(), d.casos]))

  const regions = [
    { id: "iquitos", name: "IQUITOS", path: "M 180 120 L 220 100 L 260 110 L 280 140 L 270 180 L 240 200 L 200 210 L 160 190 L 150 150 Z", casos: districtMap.get("IQUITOS") || 0 },
    { id: "belen", name: "BELEN", path: "M 150 150 L 180 120 L 200 140 L 210 180 L 190 210 L 160 200 L 140 180 Z", casos: districtMap.get("BELEN") || 0 },
    { id: "punchana", name: "PUNCHANA", path: "M 220 100 L 260 80 L 290 100 L 280 140 L 260 110 Z", casos: districtMap.get("PUNCHANA") || 0 },
    { id: "nanay", name: "NANAY", path: "M 100 140 L 150 100 L 180 120 L 160 190 L 120 200 L 90 170 Z", casos: districtMap.get("NANAY") || 0 },
    { id: "san_juan", name: "SAN JUAN", path: "M 200 210 L 240 200 L 270 220 L 260 250 L 220 260 L 190 240 Z", casos: 0 },
    { id: "loreto", name: "LORETO", path: "M 90 200 L 120 180 L 160 190 L 120 260 L 80 280 L 60 240 Z", casos: 0 },
    { id: "ramon_castilla", name: "RAMON CASTILLA", path: "M 60 240 L 90 200 L 120 260 L 100 320 L 50 340 L 30 300 Z", casos: districtMap.get("RAMON CASTILLA") || 0 },
    { id: "requena", name: "REQUENA", path: "M 100 320 L 160 300 L 180 340 L 140 380 L 80 370 L 100 320 Z", casos: districtMap.get("REQUENA") || 0 },
    { id: "yurimaguas", name: "YURIMAGUAS", path: "M 180 340 L 240 320 L 280 350 L 260 390 L 200 400 L 160 380 L 140 380 Z", casos: districtMap.get("YURIMAGUAS") || 0 },
    { id: "alto_amazonas", name: "ALTO AMAZONAS", path: "M 240 320 L 300 300 L 340 330 L 320 370 L 280 350 Z", casos: 0 },
    { id: "contamana", name: "CONTAMANA", path: "M 200 400 L 260 390 L 280 430 L 240 450 L 180 440 L 200 400 Z", casos: districtMap.get("CONTAMANA") || 0 },
    { id: "mcal_ramón", name: "MARISCAL RAMÓN", path: "M 30 300 L 60 280 L 100 320 L 80 370 L 40 380 L 20 340 Z", casos: 0 },
    { id: "damtem", name: "DAMTEM", path: "M 320 370 L 360 360 L 380 390 L 360 420 L 320 400 Z", casos: 0 },
  ]

  return (
    <div className="relative w-full h-[450px] bg-gradient-to-br from-slate-50 to-green-50 rounded-lg overflow-hidden border">
      <div className="absolute top-3 left-3 z-10">
        <h3 className="text-sm font-semibold text-slate-700">Mapa de Loreto - Distribución de Casos</h3>
        <p className="text-xs text-muted-foreground">Semana Epidemiológica 2026</p>
      </div>
      
      <svg viewBox="0 0 400 480" className="w-full h-full">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#dbeafe" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        <rect width="400" height="480" fill="url(#bgGradient)" />
        
        <text x="200" y="35" textAnchor="middle" className="text-lg font-bold fill-slate-700">
          REGIÓN LORETO
        </text>
        <text x="200" y="52" textAnchor="middle" className="text-xs fill-slate-500">
          Dirección Regional de Salud
        </text>
        
        {regions.map((region) => (
          <g key={region.id}>
            <path
              d={region.path}
              fill={getColor(region.casos)}
              stroke="#475569"
              strokeWidth="1.5"
              fillOpacity="0.8"
              filter="url(#shadow)"
              className="transition-all duration-300 hover:fill-opacity-100 cursor-pointer"
            >
              <title>{region.name}: {region.casos} casos</title>
            </path>
            <text
              x={region.casos > 0 ? 
                (region.path.match(/M\s*(\d+)/)?.[1] ? parseInt(region.path.match(/M\s*(\d+)/)?.[1] || "0") + 30 : 200) : 
                200}
              y={region.casos > 0 ?
                (region.path.match(/L\s*(\d+)\s*(\d+)/)?.[2] ? parseInt(region.path.match(/L\s*(\d+)\s*(\d+)/)?.[2] || "0") + 15 : 200) :
                200}
              textAnchor="middle"
              className="text-[7px] fill-slate-700 font-medium pointer-events-none"
            >
              {region.name}
              {region.casos > 0 && ` (${region.casos})`}
            </text>
          </g>
        ))}
        
        <line x1="20" y1="440" x2="380" y2="440" stroke="#94a3b8" strokeWidth="1" />
        <text x="30" y="455" className="text-[9px] fill-slate-500">Frontera con Ecuador</text>
        <text x="320" y="455" className="text-[9px] fill-slate-500">Frontera con Brasil</text>
      </svg>
      
      <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg p-3 shadow-md border">
        <p className="text-xs font-medium mb-2">Leyenda</p>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 rounded bg-green-300 border border-slate-400"></div>
          <span className="text-xs">1 caso</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 rounded bg-yellow-300 border border-slate-400"></div>
          <span className="text-xs">2 casos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-300 border border-slate-400"></div>
          <span className="text-xs">3+ casos</span>
        </div>
      </div>

      <div className="absolute top-3 right-3 bg-white/95 rounded-lg p-3 shadow-md border">
        <p className="text-xs font-medium mb-1">Total Casos</p>
        <p className="text-2xl font-bold text-slate-700">{datos.reduce((a, b) => a + b.casos, 0)}</p>
        <p className="text-xs text-muted-foreground">Notificaciones</p>
      </div>
    </div>
  )
}
