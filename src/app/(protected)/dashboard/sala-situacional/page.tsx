"use client"
import { useState, useMemo } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { EpidemiologySidebar } from "@/components/epidemiology/epidemiology-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Activity,
  Heart,
  BarChart3,
  X,
  Eye
} from "lucide-react"
import { MapaInteractivo } from "@/components/epidemiology/mapa-loreto-interactive"
import { CardTableContainer } from "@/components/epidemiology/card-table-container"
import { FiltrosPanel, FiltrosSalaSituacional } from "@/components/epidemiology/filtros-panel"
import { DetalleDistrito } from "@/components/epidemiology/detalle-distrito"
import { ComparacionEnfermedades } from "@/components/epidemiology/comparacion-enfermedades"
import { AlertasTempTempranas } from "@/components/epidemiology/alertas-tempranas"
import { BoletinEpidemiologico } from "@/components/epidemiology/boletin-epidemiologico"
import { BarrasChart, HistogramaChart, ParetoChart, MosaicoChart } from "@/components/charts"
import { 
  CanalEndemico,
  TendenciaEnfermedad,
  DistribucionEdadGenero,
  DistribucionCasos,
} from "@/components/epidemiology/dashboard-epidemiologico"
import { 
  DISTRITOS_FRONTERIZOS,
  getDatosMockEnfermedad,
  getResumenEnfermedades
} from "@/lib/sala-situacional-data"

const getColorRiesgo = (riesgo: string) => {
  switch(riesgo) {
    case "alto": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    case "medio": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    default: return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
  }
}

const getIconTendencia = (tendencia: string) => {
  switch(tendencia) {
    case "ascendente": return <TrendingUp className="h-4 w-4 text-red-600" />
    case "descendente": return <TrendingDown className="h-4 w-4 text-green-600" />
    default: return <span className="text-muted-foreground">-</span>
  }
}

export default function SalaSituacionalPage() {
  const [enfermedadActiva, setEnfermedadActiva] = useState("Dengue")
  const [categoriaActiva, setCategoriaActiva] = useState("transmisibles")
  const [distritoSeleccionado, setDistritoSeleccionado] = useState<{distrito: string; casos: number} | null>(null)
  const [comparacionEnfermedades, setComparacionEnfermedades] = useState<string[]>([])
  const [mostrarComparacion, setMostrarComparacion] = useState(false)
  const [semanaSeleccionada, setSemanaSeleccionada] = useState("8")
  
  const [filtros, setFiltros] = useState<FiltrosSalaSituacional>({
    enfermedades: [],
    distritos: [],
    semanas: [1, 8],
    genero: "todos",
    edadMin: 0,
    edadMax: 100,
    tipoNotificacion: "todos",
    nivelAlerta: []
  })

  const datosMapa = useMemo(() => {
    return getDatosMockEnfermedad(enfermedadActiva)
  }, [enfermedadActiva])
  
  const resumenEnfermedades = useMemo(() => {
    return getResumenEnfermedades()
  }, [])

  const handleRemoveFiltro = (key: keyof FiltrosSalaSituacional, value?: string) => {
    const nuevosFiltros = { ...filtros }
    if (value && Array.isArray(nuevosFiltros[key])) {
      (nuevosFiltros[key] as string[]) = (nuevosFiltros[key] as string[]).filter((v: string) => v !== value)
    } else if (key === 'genero' || key === 'tipoNotificacion') {
      nuevosFiltros[key] = 'todos'
    } else if (Array.isArray(nuevosFiltros[key])) {
      (nuevosFiltros[key] as string[]) = []
    }
    setFiltros(nuevosFiltros)
  }

  const handleDistritoClick = (distrito: string, casos: number) => {
    setDistritoSeleccionado({ distrito, casos })
  }

  const filtrosActivos = 
    filtros.enfermedades.length + 
    filtros.distritos.length + 
    (filtros.genero !== "todos" ? 1 : 0) +
    (filtros.tipoNotificacion !== "todos" ? 1 : 0) +
    filtros.nivelAlerta.length

  return (
    <SidebarProvider>
      <EpidemiologySidebar />
      <SidebarInset>
        <SiteHeader sectionTitle="Sala Situacional - Loreto" />
        <div className="p-4 md:p-6 flex flex-col gap-5 bg-muted/30 min-h-screen">
          
          {/* Cabecera Principal */}
          <div className="bg-card rounded-lg border">
            <div className="p-4 border-b">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-card-foreground">Sala Situacional de Vigilancia Epidemiológica</h1>
                  <p className="text-base text-muted-foreground">Región Loreto - Semana Epidemiológica {semanaSeleccionada}</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <Select value={semanaSeleccionada} onValueChange={setSemanaSeleccionada}>
                    <SelectTrigger className="w-35">
                      <SelectValue placeholder="Semana" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(s => (
                        <SelectItem key={s} value={s.toString()}>SE {s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={enfermedadActiva} onValueChange={setEnfermedadActiva}>
                    <SelectTrigger className="w-50">
                      <SelectValue placeholder="Enfermedad" />
                    </SelectTrigger>
                    <SelectContent>
                      {resumenEnfermedades.map(e => (
                        <SelectItem key={e.enfermedad} value={e.enfermedad}>
                          {e.enfermedad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant={categoriaActiva === "transmisibles" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoriaActiva("transmisibles")}
                  >
                    Transmisibles
                  </Button>
                  <Button 
                    variant={categoriaActiva === "no-transmisibles" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoriaActiva("no-transmisibles")}
                  >
                    No Transmisibles
                  </Button>
                  <Button 
                    variant={mostrarComparacion ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMostrarComparacion(!mostrarComparacion)}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Comparar
                  </Button>
                  <FiltrosPanel 
                    filtros={filtros}
                    onFiltrosChange={setFiltros}
                    comparacionEnfermedades={comparacionEnfermedades}
                    onComparacionChange={setComparacionEnfermedades}
                  />
                </div>
              </div>
              
              {/* Filtros Activos como Chips */}
              {(filtrosActivos > 0) && (
                <div className="mt-3 pt-3 border-t flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filtros activos:</span>
                  {filtros.enfermedades.map(enf => (
                    <Badge key={enf} variant="secondary" className="gap-1 px-3 py-1 text-sm">
                      {enf}
                      <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => handleRemoveFiltro("enfermedades", enf)} />
                    </Badge>
                  ))}
                  {filtros.distritos.map(dist => (
                    <Badge key={dist} variant="outline" className="gap-1 px-3 py-1 text-sm">
                      {dist}
                      <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => handleRemoveFiltro("distritos", dist)} />
                    </Badge>
                  ))}
                  {filtros.genero !== "todos" && (
                    <Badge variant="outline" className="gap-1 px-3 py-1 text-sm">
                      {filtros.genero === "masculino" ? "Masculino" : "Femenino"}
                      <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => handleRemoveFiltro("genero")} />
                    </Badge>
                  )}
                  {filtros.nivelAlerta.map(alerta => (
                    <Badge key={alerta} variant="destructive" className="gap-1 px-3 py-1 text-sm">
                      {alerta}
                      <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => handleRemoveFiltro("nivelAlerta", alerta)} />
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => setFiltros({
                    enfermedades: [],
                    distritos: [],
                    semanas: [1, 8],
                    genero: "todos",
                    edadMin: 0,
                    edadMax: 100,
                    tipoNotificacion: "todos",
                    nivelAlerta: []
                  })} className="text-sm">
                    Limpiar todo
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Comparación de Enfermedades */}
          {mostrarComparacion && (
            <ComparacionEnfermedades 
              enfermedades={comparacionEnfermedades.length > 0 ? comparacionEnfermedades : ["Dengue", "COVID-19"]}
              onCerrar={() => setMostrarComparacion(false)}
            />
          )}

          {/* Alertas Tempranas de Brotes */}
          <AlertasTempTempranas enfermedad={enfermedadActiva} />

          {/* Boletín Epidemiológico */}
          <BoletinEpidemiologico />

          {/* Tablas de Resumen y Distritos */}
          <div className="flex flex-col gap-4 lg:gap-6 lg:grid lg:grid-cols-2">
            <CardTableContainer title="Resumen de Enfermedades" icon={Activity}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-semibold text-xs">Enfermedad</th>
                      <th className="text-center p-2 font-semibold text-xs">Casos Totales</th>
                      <th className="text-center p-2 font-semibold text-xs">Semana Actual</th>
                      <th className="text-center p-2 font-semibold text-xs">Distritos</th>
                      <th className="text-center p-2 font-semibold text-xs">Tendencia</th>
                      <th className="text-center p-2 font-semibold text-xs">Riesgo</th>
                      <th className="text-center p-2 font-semibold text-xs">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumenEnfermedades.map(e => (
                      <tr 
                        key={e.enfermedad} 
                        className={`border-b hover:bg-muted/50 cursor-pointer text-sm ${enfermedadActiva === e.enfermedad ? 'bg-primary/10' : ''}`}
                        onClick={() => setEnfermedadActiva(e.enfermedad)}
                      >
                        <td className="p-2 font-medium">{e.enfermedad}</td>
                        <td className="p-2 text-center font-bold">{e.casosTotales}</td>
                        <td className="p-2 text-center">{e.casosTotales > 0 ? Math.round(e.casosTotales * 0.3) : 0}</td>
                        <td className="p-2 text-center">{e.distritosAfectados}</td>
                        <td className="p-2 text-center">{getIconTendencia(e.tendencia)}</td>
                        <td className="p-2 text-center">
                          <Badge className={getColorRiesgo(e.riesgo)}>
                            {e.riesgo.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-2 text-center">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardTableContainer>

            <CardTableContainer title={`Casos por Distrito - ${enfermedadActiva}`} icon={MapPin}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-semibold text-xs">Distrito</th>
                      <th className="text-center p-2 font-semibold text-xs">Casos</th>
                      <th className="text-center p-2 font-semibold text-xs">% Total</th>
                      <th className="text-center p-2 font-semibold text-xs">Nivel Alerta</th>
                      <th className="text-center p-2 font-semibold text-xs">Frontera</th>
                      <th className="text-center p-2 font-semibold text-xs">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosMapa
                      .filter(d => d.casos > 0)
                      .sort((a, b) => b.casos - a.casos)
                      .map(d => {
                        const total = datosMapa.reduce((acc, x) => acc + x.casos, 0)
                        const esFrontera = DISTRITOS_FRONTERIZOS.includes(d.distrito)
                        return (
                          <tr 
                            key={d.distrito} 
                            className="border-b hover:bg-muted/50 cursor-pointer text-sm"
                            onClick={() => handleDistritoClick(d.distrito, d.casos)}
                          >
                            <td className="p-2 font-medium">{d.distrito}</td>
                            <td className="p-2 text-center font-bold">{d.casos}</td>
                            <td className="p-2 text-center">{total > 0 ? Math.round((d.casos / total) * 100) : 0}%</td>
                            <td className="p-2 text-center">
                              <Badge className={d.casos > 30 ? 'bg-red-500/20 text-red-700 dark:text-red-400' : d.casos > 15 ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' : 'bg-green-500/20 text-green-700 dark:text-green-400'}>
                                {d.casos > 30 ? 'ALTO' : d.casos > 15 ? 'MEDIO' : 'BAJO'}
                              </Badge>
                            </td>
                            <td className="p-2 text-center">
                              {esFrontera && <Badge variant="outline">Frontera</Badge>}
                            </td>
                            <td className="p-2 text-center">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </CardTableContainer>
          </div>

          {/* Mapa y Canal Endémico */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
              <Card>
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Mapa Geográfico - {enfermedadActiva}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MapaInteractivo 
                    datos={datosMapa} 
                    enfermedadActiva={enfermedadActiva}
                    onDistritoClick={handleDistritoClick}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4 h-fit">
              <CanalEndemico enfermedad={enfermedadActiva} />
            <DistribucionCasos enfermedad={enfermedadActiva} />
            </div>
          </div>

          {/* Detalle del Distrito */}
          {distritoSeleccionado && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <DetalleDistrito 
                  distrito={distritoSeleccionado.distrito}
                  enfermedad={enfermedadActiva}
                  casos={distritoSeleccionado.casos}
                  onClose={() => setDistritoSeleccionado(null)}
                />
              </div>
            </div>
          )}

          {/* Gráficos de Tendencia */}
          <div className="grid grid-cols-1 gap-4">
            <TendenciaEnfermedad enfermedad={enfermedadActiva} />
          </div>

          {/* Gráficos de Análisis */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm font-semibold">Casos por Distrito</CardTitle>
              </CardHeader>
              <CardContent>
                <BarrasChart 
                  data={datosMapa
                    .filter(d => d.casos > 0)
                    .sort((a, b) => b.casos - a.casos)
                    .slice(0, 8)
                    .map(d => ({ name: d.distrito, value: d.casos }))} 
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm font-semibold">Histograma por Rango</CardTitle>
              </CardHeader>
              <CardContent>
                <HistogramaChart 
                  data={[
                    { range: "0-5", frecuencia: 45 },
                    { range: "6-10", frecuencia: 28 },
                    { range: "11-15", frecuencia: 18 },
                    { range: "16-20", frecuencia: 12 },
                    { range: "21-25", frecuencia: 8 },
                    { range: "26-30", frecuencia: 4 },
                  ]} 
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm font-semibold">Diagrama de Pareto</CardTitle>
              </CardHeader>
              <CardContent>
                <ParetoChart 
                  data={datosMapa
                    .filter(d => d.casos > 0)
                    .sort((a, b) => b.casos - a.casos)
                    .slice(0, 6)
                    .map((d, _, arr) => {
                      const total = arr.reduce((sum, x) => sum + x.casos, 0)
                      const prevSum = arr.slice(0, arr.indexOf(d)).reduce((sum, x) => sum + x.casos, 0)
                      return { 
                        name: d.distrito, 
                        value: d.casos,
                        acumulado: Math.round(((prevSum + d.casos) / total) * 100)
                      }
                    })} 
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm font-semibold">Análisis por Edad</CardTitle>
              </CardHeader>
              <CardContent>
                <MosaicoChart 
                  data={[
                    { category: "Niños", subcategory: "0-4", value: 12, percentage: 8.3 },
                    { category: "Niños", subcategory: "5-9", value: 18, percentage: 12.5 },
                    { category: "Niños", subcategory: "10-14", value: 8, percentage: 5.6 },
                    { category: "Adultos", subcategory: "15-29", value: 35, percentage: 24.3 },
                    { category: "Adultos", subcategory: "30-44", value: 28, percentage: 19.4 },
                    { category: "Adultos", subcategory: "45-59", value: 22, percentage: 15.3 },
                    { category: "Mayores", subcategory: "60-74", value: 15, percentage: 10.4 },
                    { category: "Mayores", subcategory: "75+", value: 6, percentage: 4.2 },
                  ]} 
                />
              </CardContent>
            </Card>
          </div>

          {/* Distribución y Acciones */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DistribucionEdadGenero enfermedad={enfermedadActiva} />
            
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Acciones Recomendadas - {enfermedadActiva}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <span className="font-semibold text-red-800 dark:text-red-400">Prioridad Alta</span>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Activar brigadas de fumigación en Iquitos y Belén
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <span className="font-semibold text-yellow-800 dark:text-yellow-400">Monitoreo</span>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Intensificar vigilancia en distritos de frontera
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-blue-800 dark:text-blue-400">Preventivo</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Campaña de educación sobre criaderos de mosquitos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <footer className="text-sm text-muted-foreground text-center pt-4 border-t">
            © 2026 Plataforma de Vigilancia Epidemiológica - Dirección Regional de Salud Loreto - MINSA
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
