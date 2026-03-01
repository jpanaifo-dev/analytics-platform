"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"
import { Info, MapPin } from "lucide-react"
import * as echarts from "echarts"
import loretoGeoJSON from "@/lib/maps/loreto.json"

export default function MapPage() {
    const searchParams = useSearchParams()
    const year = searchParams.get("year") || "2024"
    const location = searchParams.get("location") || "Loreto"
    const measure = (searchParams.get("measure") || "DALYs").toUpperCase()

    // Register map if not already registered
    React.useEffect(() => {
        if (!echarts.getMap("Loreto")) {
            echarts.registerMap("Loreto", loretoGeoJSON as any)
        }
    }, [])

    // Loreto Provinces data - normalized names to match GeoJSON (UPPERCASE)
    const provinceData = [
        { name: "MAYNAS", displayName: "Maynas", value: 85 },
        { name: "ALTO AMAZONAS", displayName: "Alto Amazonas", value: 65 },
        { name: "DATEM DEL MARAÑON", displayName: "Datem del Marañón", value: 45 },
        { name: "LORETO", displayName: "Loreto", value: 72 },
        { name: "MARISCAL RAMON CASTILLA", displayName: "Mariscal Ramón Castilla", value: 38 },
        { name: "PUTUMAYO", displayName: "Putumayo", value: 20 },
        { name: "REQUENA", displayName: "Requena", value: 54 },
        { name: "UCAYALI", displayName: "Ucayali", value: 41 }
    ]

    const chartOption = {
        tooltip: {
            trigger: 'item',
            formatter: (params: any) => {
                const data = provinceData.find(p => p.name === params.name);
                const name = data ? data.displayName : params.name;
                return `${name}: ${params.value}%`;
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            left: 'left',
            top: 'bottom',
            text: ['Alto', 'Bajo'],
            calculable: true,
            inRange: {
                color: ['#DBEAFE', '#3B82F6', '#1E40AF']
            }
        },
        series: [
            {
                name: 'Geresa Loreto',
                type: 'map',
                map: 'Loreto',
                roam: true,
                emphasis: {
                    label: { show: true }
                },
                data: provinceData.map(p => ({
                    name: p.name,
                    value: p.value
                }))
            }
        ]
    }

    return (
        <div className="flex flex-col h-full overflow-hidden relative">
            {/* Top Bar Status */}
            <div className="flex items-center justify-between px-6 py-2 border-b">
                <div className="text-[13px] font-medium text-slate-600 dark:text-slate-200 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-teal-700 dark:text-teal-200" />
                    <span>Loreto, {location === 'Loreto' ? 'All Provinces' : location}, {year}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Map View</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold">Geographic Distribution</h2>
                        <p className="text-sm text-muted-foreground">Analysis of {measure} across Geresa Loreto provinces</p>
                    </div>
                    <div className="flex gap-2">
                        {provinceData.slice(0, 3).map(p => (
                            <div key={p.name} className="px-3 py-1 bg-teal-50 rounded-full border border-teal-100 flex items-center gap-2">
                                <span className="text-[10px] font-bold text-teal-800">{p.displayName}</span>
                                <span className="text-[10px] font-bold text-[#003d33]">{p.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 bg-slate-50/30 rounded-xl border border-dashed border-slate-200 relative overflow-hidden">
                    <BaseChart option={chartOption} className="h-full" />

                    {/* Overlay Info */}
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur p-4 rounded-lg border shadow-sm max-w-[200px]">
                        <h4 className="text-xs font-bold mb-2 uppercase">Quick Info</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px]">
                                <span className="text-slate-500">Total {measure}</span>
                                <span className="font-bold">2.4M</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                                <span className="text-slate-500">Highest Region</span>
                                <span className="font-bold text-red-600">Maynas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
