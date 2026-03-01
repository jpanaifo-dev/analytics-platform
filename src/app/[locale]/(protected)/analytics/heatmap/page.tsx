"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"

export default function AnalyticsHeatmapPage() {
    const searchParams = useSearchParams()
    const year = searchParams.get("year") || "2024"
    const location = searchParams.get("location") || "Loreto"

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const provinces = ["Maynas", "Alto Amazonas", "Datem del Marañón", "Loreto", "Mariscal Ramón Castilla", "Putumayo", "Requena", "Ucayali"]

    // Generate mock data for heatmap [month, province, value]
    const data: [number, number, number][] = []
    for (let m = 0; m < months.length; m++) {
        for (let p = 0; p < provinces.length; p++) {
            data.push([m, p, Math.floor(Math.random() * 100)])
        }
    }

    const chartOption = {
        title: {
            text: `Temporal Heatmap - ${location} (${year})`,
            left: 'center',
            textStyle: { fontSize: 14 }
        },
        tooltip: {
            position: 'top',
            formatter: (params: any) => {
                return `${months[params.data[0]]}, ${provinces[params.data[1]]}: ${params.data[2]} cases`
            }
        },
        grid: {
            height: '70%',
            top: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: months,
            splitArea: { show: true }
        },
        yAxis: {
            type: 'category',
            data: provinces,
            splitArea: { show: true }
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%',
            inRange: {
                color: ['#EFF6FF', '#3B82F6', '#1E40AF']
            }
        },
        series: [{
            name: 'Cases',
            type: 'heatmap',
            data: data,
            label: { show: false },
            emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
        }]
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-2 border-b bg-slate-50/50">
                <div className="text-[13px] font-medium text-slate-600">
                    {location}, Temporal Heatmap Analysis, {year}
                </div>
            </div>
            <div className="flex-1 p-6">
                <BaseChart option={chartOption} className="h-full" />
            </div>
        </div>
    )
}
