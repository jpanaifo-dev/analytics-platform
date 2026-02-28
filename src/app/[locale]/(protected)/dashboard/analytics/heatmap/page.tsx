"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"
import { Calendar, Search } from "lucide-react"

export default function AnalyticsHeatmapPage() {
    const searchParams = useSearchParams()
    const year = searchParams.get("year") || "2024"

    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    const regions = ["Amazonas", "Ancash", "Apurimac", "Arequipa", "Ayacucho", "Cajamarca", "Lima", "Loreto", "Piura", "Tumbes"]

    // Generate mock data for heatmap [month, region, value]
    const data: [number, number, number][] = []
    for (let m = 0; m < months.length; m++) {
        for (let r = 0; r < regions.length; r++) {
            data.push([m, r, Math.floor(Math.random() * 100)])
        }
    }

    const chartOption = {
        tooltip: {
            position: 'top'
        },
        grid: {
            height: '70%',
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: months,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: regions,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%',
            inRange: {
                color: ['#EFF6FF', '#60A5FA', '#1E40AF']
            }
        },
        series: [{
            name: 'Casos',
            type: 'heatmap',
            data: data,
            label: {
                show: false
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    }

    return (
        <div className="flex flex-col gap-6 h-full overflow-y-auto">
            <Card className="flex flex-col flex-1 shadow-sm border-none bg-white/50 dark:bg-slate-900 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-0">
                    <div>
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <Calendar className="h-6 w-6 text-primary" />
                            Mapa de Calor Temporal ({year})
                        </CardTitle>
                        <CardDescription className="text-sm">Distribución mensual de casos por departamento</CardDescription>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg text-primary text-xs font-semibold">
                        Actualización diaria
                    </div>
                </CardHeader>
                <CardContent className="flex-1 min-h-[500px] mt-4">
                    <BaseChart option={chartOption} className="h-full" />
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-none shadow-sm dark:bg-slate-900">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Región en alerta</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 bg-red-100 p-4 rounded-lg">
                            <div className="text-2xl font-black text-red-700">Loreto</div>
                            <div className="text-xs text-red-600 font-medium">Concentración máxima en marzo-abril por Dengue.</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
