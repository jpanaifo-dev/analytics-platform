"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"

function OverlapChartContent() {
    const searchParams = useSearchParams()
    const location = searchParams.get("location") || "Loreto"
    const year = searchParams.get("year") || "2023"

    // Mock overlap data: [Metric A, Metric B, Population Size, Province Name]
    const data = [
        [45, 85, 1200000, "Maynas"],
        [65, 55, 800000, "Alto Amazonas"],
        [30, 95, 500000, "Requena"],
        [40, 75, 300000, "Loreto"],
        [55, 65, 400000, "Ucayali"],
        [20, 110, 100000, "Putumayo"],
    ]

    const chartOption = {
        title: {
            text: `Overlap Analysis: DALYs vs Mortality - ${location}`,
            left: 'center'
        },
        legend: { right: '10%', top: '15%', orient: 'vertical' },
        grid: { left: '8%', top: '15%' },
        xAxis: { name: 'DALYs Index' },
        yAxis: { name: 'Mortality Index' },
        series: data.map(item => ({
            name: item[3],
            type: 'scatter',
            data: [[item[0], item[1], item[2]]],
            symbolSize: (val: any) => Math.sqrt(val[2]) / 20,
            emphasis: {
                label: {
                    show: true,
                    formatter: (param: any) => param.seriesName,
                    position: 'top'
                }
            }
        }))
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-2 border-b bg-slate-50/50">
                <div className="text-[13px] font-medium text-slate-600">
                    {location}, Overlap Analysis (Bubble Chart), {year}
                </div>
            </div>
            <div className="flex-1 p-6">
                <BaseChart option={chartOption} className="h-full" />
            </div>
        </div>
    )
}

export default function OverlapPage() {
    return (
        <React.Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <OverlapChartContent />
        </React.Suspense>
    )
}

