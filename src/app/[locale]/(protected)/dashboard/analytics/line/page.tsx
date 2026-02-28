"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"

export default function LinePage() {
    const searchParams = useSearchParams()
    const location = searchParams.get("location") || "Loreto"
    const measure = (searchParams.get("measure") || "DALYs").toUpperCase()

    const years = Array.from({ length: 35 }, (_, i) => (1990 + i).toString())

    // Mock time series data
    const generateData = (start: number, vol: number) => {
        let val = start
        return years.map(() => {
            val = val + (Math.random() - 0.5) * vol
            return Math.max(0, parseFloat(val.toFixed(2)))
        })
    }

    const chartOption = {
        title: {
            text: `Trend Analysis - ${location} (1990-2024)`,
            left: 'center'
        },
        tooltip: { trigger: 'axis' },
        legend: {
            data: ['Communicable', 'Non-communicable', 'Injuries'],
            bottom: 10
        },
        grid: {
            left: '5%',
            right: '5%',
            top: '15%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: years
        },
        yAxis: {
            type: 'value',
            name: measure
        },
        series: [
            {
                name: 'Communicable',
                type: 'line',
                smooth: true,
                data: generateData(120, 10),
                itemStyle: { color: '#ef4444' }
            },
            {
                name: 'Non-communicable',
                type: 'line',
                smooth: true,
                data: generateData(80, 8),
                itemStyle: { color: '#3b82f6' }
            },
            {
                name: 'Injuries',
                type: 'line',
                smooth: true,
                data: generateData(40, 5),
                itemStyle: { color: '#10b981' }
            }
        ]
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-2 border-b bg-slate-50/50">
                <div className="text-[13px] font-medium text-slate-600">
                    {location}, Time Series Trends
                </div>
            </div>
            <div className="flex-1 p-6">
                <BaseChart option={chartOption} className="h-full" />
            </div>
        </div>
    )
}
