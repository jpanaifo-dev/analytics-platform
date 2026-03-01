"use client"

import { EpidemiologySidebar } from "@/components/epidemiology/epidemiology-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { JerarquiaSelector } from "@/components/epidemiology/jerarquia-selector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/epidemiology/status-badge"
import { Brain, TrendingUp, AlertTriangle, Calendar, Target, Activity } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"

const prediccionesMock = [
  {
    id: "1",
    enfermedad: "Dengue",
    probabilidad: 78,
    casosEstimados: 156,
    rango: [120, 198],
    semanasPronostico: 4,
    tendencia: "SUBE"
  },
  {
    id: "2",
    enfermedad: "Influenza",
    probabilidad: 45,
    casosEstimados: 89,
    rango: [65, 112],
    semanasPronostico: 4,
    tendencia: "ESTABLE"
  },
  {
    id: "3",
    enfermedad: "Neumonías",
    probabilidad: 62,
    casosEstimados: 234,
    rango: [180, 289],
    semanasPronostico: 4,
    tendencia: "BAJA"
  }
]

const dataGrafico = [
  { semana: "SE-08", real: null, predicho: 120 },
  { semana: "SE-09", real: null, predicho: 145 },
  { semana: "SE-10", real: null, predicho: 156 },
  { semana: "SE-11", real: null, predicho: 178 },
]

export default function Page() {
  return (
    <SidebarProvider defaultOpen={false}>
      <EpidemiologySidebar />
      <SidebarInset>
        <SiteHeader sectionTitle="Predicción - Modelos IA" />
        <div className="p-4 md:p-6 flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-[300px]">
              <JerarquiaSelector onChange={(v) => console.log(v)} />
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Modelo: LSTM v2.3</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Predicciones Activas</p>
                    <p className="text-xl font-bold">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-red-500/10 p-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Brotes Previstos</p>
                    <p className="text-xl font-bold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-500/10 p-2">
                    <Target className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Precisión Modelo</p>
                    <p className="text-xl font-bold">87%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-500/10 p-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Horizonte</p>
                    <p className="text-xl font-bold">4 sem.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">Pronósticos de Brotes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {prediccionesMock.map((pred) => (
                  <div key={pred.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">{pred.enfermedad}</span>
                      </div>
                      <Badge variant={pred.tendencia === 'SUBE' ? 'danger' : pred.tendencia === 'BAJA' ? 'success' : 'info'}>
                        <TrendingUp className={`h-3 w-3 mr-1 ${pred.tendencia === 'BAJA' ? 'rotate-180' : ''}`} />
                        {pred.tendencia}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Probabilidad</p>
                        <p className="text-lg font-bold">{pred.probabilidad}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Casos Est.</p>
                        <p className="text-lg font-bold">{pred.casosEstimados}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">IC 95%</p>
                        <p className="text-xs font-medium">{pred.rango[0]} - {pred.rango[1]}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Pronóstico a {pred.semanasPronostico} semanas
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">Proyección - Dengue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dataGrafico}>
                      <defs>
                        <linearGradient id="colorPrediccion" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="predicho"
                        stroke="#8b5cf6"
                        fill="url(#colorPrediccion)"
                        name="Predicción"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Proyección de casos de Dengue para las próximas 4 semanas
                </p>
              </CardContent>
            </Card>
          </div>

          <footer className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Plataforma de Vigilancia Epidemiológica - MINSA
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
