"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"

export default function DecompositionPage() {
    const searchParams = useSearchParams()
    const location = searchParams.get("location") || "Loreto"
    const year = searchParams.get("year") || "2023"

    const categories = ["Non-communicable", "Communicable", "Injuries"]

    // Decomposition factors: [Population Growth, Aging, Rate Change]
    const factors = ["Population Growth", "Aging", "Epidemiological Change"]

    const chartOption = {
        title: {
            text: `Decomposition of Change in DALYs - ${location}`,
            left: 'center'
        },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { data: factors, bottom: 0 },
        grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
        xAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
        yAxis: { type: 'category', data: categories },
        series: [
            {
                name: factors[0],
                type: 'bar',
                stack: 'total',
                itemStyle: { color: '#93c5fd' },
                data: [12, 10, 8]
            },
            {
                name: factors[1],
                type: 'bar',
                stack: 'total',
                itemStyle: { color: '#3b82f6' },
                data: [15, 5, 3]
            },
            {
                name: factors[2],
                type: 'bar',
                stack: 'total',
                itemStyle: { color: '#dc2626' }, // Negative or positive change
                data: [-18, -25, -5]
            }
        ]
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-2 border-b bg-slate-50/50">
                <div className="text-[13px] font-medium text-slate-600">
                    {location}, Decomposition of Change
                </div>
            </div>
            <div className="flex-1 p-6">
                <BaseChart option={chartOption} className="h-full" />
            </div>
        </div>
    )
}
