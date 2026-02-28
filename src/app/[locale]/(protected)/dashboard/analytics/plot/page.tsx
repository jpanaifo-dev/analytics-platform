"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"

export default function PlotPage() {
    const searchParams = useSearchParams()
    const location = searchParams.get("location") || "Loreto"
    const year = searchParams.get("year") || "2023"

    // Mock scatter data: [Expenditure/GDP index, DALYs/Metric]
    const regionsData = [
        ["Loreto", 45, 85, 1200000],
        ["Maynas", 65, 55, 800000],
        ["Alto Amazonas", 30, 95, 500000],
        ["Requena", 40, 75, 300000],
        ["Ucayali", 55, 65, 400000],
        ["Putumayo", 20, 110, 100000],
        ["Mariscal", 35, 80, 200000],
    ]

    const chartOption = {
        title: {
            text: `Health Metric vs Expenditure Index - ${location} (${year})`,
            left: 'center'
        },
        tooltip: {
            formatter: (obj: any) => {
                const value = obj.value;
                return `<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 14px;padding-bottom: 7px;margin-bottom: 7px">${value[0]}</div>
                Expenditure: ${value[1]}<br>
                Metric: ${value[2]}<br>
                Population: ${value[3]}`;
            }
        },
        xAxis: {
            name: 'Expenditure Index',
            splitLine: { lineStyle: { type: 'dashed' } }
        },
        yAxis: {
            name: 'Metric Value',
            splitLine: { lineStyle: { type: 'dashed' } }
        },
        series: [{
            name: 'Provinces',
            type: 'scatter',
            symbolSize: (data: any) => Math.sqrt(data[3]) / 20,
            itemStyle: {
                color: '#34d399',
                opacity: 0.8,
                borderColor: '#065f46',
                borderWidth: 1
            },
            data: regionsData
        }]
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-2 border-b bg-slate-50/50">
                <div className="text-[13px] font-medium text-slate-600">
                    {location}, Correlation Plot (Scatter), {year}
                </div>
            </div>
            <div className="flex-1 p-6">
                <BaseChart option={chartOption} className="h-full" />
            </div>
        </div>
    )
}
