"use client"

import { EpidemiologySidebar } from "@/components/epidemiology/epidemiology-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { JerarquiaSelector } from "@/components/epidemiology/jerarquia-selector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map, Layers, RefreshCw, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"

export default function Page() {
  return (
    <SidebarProvider defaultOpen={false}>
      <EpidemiologySidebar />
      <SidebarInset>
        <SiteHeader sectionTitle="Análisis Espacial" />
        <div className="p-4 md:p-6 flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-[300px]">
              <JerarquiaSelector onChange={(v) => console.log(v)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Layers className="h-4 w-4 mr-2" />
                Capas
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            <Card className="lg:col-span-3">
              <CardContent className="p-0">
                <div className="relative h-[500px] bg-muted/20 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Mapa de Calor - Dengue
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Semana Epidemiológica 07-2026
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="absolute top-4 left-4 bg-background/90 p-3 rounded-md text-xs space-y-1">
                    <p className="font-semibold">Leyenda</p>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-red-600" />
                      <span>Alta densidad (&gt;50 casos)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-orange-500" />
                      <span>Media (20-50 casos)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-yellow-500" />
                      <span>Baja (5-20 casos)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-green-500" />
                      <span>Mínima (&lt;5 casos)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Total casos</span>
                    <span className="text-sm font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">EESS afectadas</span>
                    <span className="text-sm font-semibold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Tasa ataque</span>
                    <span className="text-sm font-semibold">12.5 x 100,000</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Zonas Críticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-2 rounded bg-red-50 dark:bg-red-950/30">
                    <p className="text-xs font-semibold">Lima Sur</p>
                    <p className="text-xs text-muted-foreground">245 casos - Alta densidad</p>
                  </div>
                  <div className="p-2 rounded bg-orange-50 dark:bg-orange-950/30">
                    <p className="text-xs font-semibold">Callao</p>
                    <p className="text-xs text-muted-foreground">89 casos - Media</p>
                  </div>
                  <div className="p-2 rounded bg-yellow-50 dark:bg-yellow-950/30">
                    <p className="text-xs font-semibold">Lima Este</p>
                    <p className="text-xs text-muted-foreground">45 casos - Baja</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <footer className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Plataforma de Vigilancia Epidemiológica - MINSA
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
