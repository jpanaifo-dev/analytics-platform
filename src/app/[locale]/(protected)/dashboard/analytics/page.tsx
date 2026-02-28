"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"
import { Progress } from "@/components/ui/progress"
import { MapPin, TrendingUp, Info } from "lucide-react"

export default function AnalyticsMapPage() {
    const searchParams = useSearchParams()
    const measure = searchParams.get("measure") || "dalys"
    const year = searchParams.get("year") || "2024"
    const cause = searchParams.get("cause") || "all"

    // Mock data for regions (e.g., Peru regions since there were Loreto files)
    const regions = [
        { name: "Loreto", value: 85, trend: "+2.4%" },
        { name: "Lima", value: 42, trend: "-1.1%" },
        { name: "Cusco", value: 56, trend: "+0.8%" },
        { name: "Arequipa", value: 38, trend: "+0.2%" },
        { name: "Piura", value: 72, trend: "+4.5%" }
    ]

    const chartOption = {
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c}"
        },
        visualMap: {
            min: 0,
            max: 100,
            left: "left",
            top: "bottom",
            text: ["Alto", "Bajo"],
            calculable: true,
            inRange: {
                color: ["#DBEAFE", "#3B82F6", "#1E40AF"]
            }
        },
        series: [
            {
                name: "Indicador Epidemiológico",
                type: "map",
                map: "world", // Using world for general purposes or we could load custom geojson
                roam: true,
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    { name: "Peru", value: 65 },
                    { name: "Brazil", value: 45 },
                    { name: "Argentina", value: 32 },
                    { name: "Colombia", value: 58 },
                    { name: "Chile", value: 25 },
                    { name: "United States", value: 15 },
                    { name: "China", value: 88 }
                ]
            }
        ]
    }

    return (
        <div className="flex flex-col gap-6 h-full overflow-y-auto">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {regions.slice(0, 4).map((region) => (
                    <Card key={region.name} className="border-none bg-white/50 dark:bg-slate-900 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{region.name}</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{region.value}</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <TrendingUp className={`h-3 w-3 ${region.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`} />
                                {region.trend} vs {parseInt(year) - 1}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3 flex-1 overflow-hidden">
                <Card className="lg:col-span-2 flex flex-col min-h-[500px]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle className="text-lg font-semibold capitalize">Distribución Geográfica</CardTitle>
                            <CardDescription>
                                Visualización de {measure} para {year} en {cause}
                            </CardDescription>
                        </div>
                        <div className="p-2 bg-primary/10 rounded-full">
                            <Info className="h-5 w-5 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0">
                        {/* Note: Map needs geoJson registration, skipping actual map load for simplicity in this demo */}
                        {/* Using a placeholder for the actual map if geojson is not available */}
                        <BaseChart
                            option={chartOption}
                            className="h-full"
                        />
                    </CardContent>
                </Card>

                <div className="space-y-6 overflow-hidden">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Regiones más afectadas</CardTitle>
                            <CardDescription>Basado en los filtros actuales</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8 flex-1">
                            {regions.map((region) => (
                                <div key={region.name} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{region.name}</span>
                                        <span className="font-bold text-primary">{region.value}k</span>
                                    </div>
                                    <Progress value={region.value} className="h-2" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
