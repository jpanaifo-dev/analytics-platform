"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"

function PatternsChartContent() {
    const searchParams = useSearchParams()
    const location = searchParams.get("location") || "Loreto"
    const year = searchParams.get("year") || "2023"

    const causes = ["Cardiovascular", "Neoplasms", "Chronic Respiratory", "Diabetes", "Digestive", "Neurological"]
    const risks = ["High BMI", "Smoking", "Air Pollution", "Dietary Risks", "High Glucose", "Alcohol Use"]

    // Mock data for patterns (Risk vs Cause match)
    const data: [number, number, number][] = []
    for (let i = 0; i < causes.length; i++) {
        for (let j = 0; j < risks.length; j++) {
            data.push([i, j, Math.floor(Math.random() * 100)])
        }
    }

    const chartOption = {
        title: {
            text: `Patterns: Risks vs Causes - ${location} (${year})`,
            left: 'center'
        },
        tooltip: { position: 'top' },
        grid: { height: '60%', top: '10%' },
        xAxis: { type: 'category', data: causes, axisLabel: { rotate: 45 } },
        yAxis: { type: 'category', data: risks },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%',
            inRange: { color: ['#fff7ed', '#fb923c', '#ea580c'] }
        },
        series: [{
            name: 'Match Score',
            type: 'heatmap',
            data: data,
            label: { show: true },
            emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
        }]
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-2 border-b bg-slate-50/50">
                <div className="text-[13px] font-medium text-slate-600">
                    {location}, Risks vs Causes Patterns, {year}
                </div>
            </div>
            <div className="flex-1 p-6">
                <BaseChart option={chartOption} className="h-full" />
            </div>
        </div>
    )
}

export default function PatternsPage() {
    return (
        <React.Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <PatternsChartContent />
        </React.Suspense>
    )
}

