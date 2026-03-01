"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"

function ArrowChartContent() {
    const searchParams = useSearchParams()
    const measure = (searchParams.get("measure") || "DALYs").toUpperCase()
    const year = searchParams.get("year") || "2023"
    const location = searchParams.get("location") || "Loreto"

    // Mock Arrow Diagram Data (Change in Rankings)
    const causes1990 = ["Dengue", "Malaria", "Diarrhea", "Violence", "Road Injury", "Neoplasms"]
    const causes2023 = ["Neoplasms", "Diabetes", "Violence", "Dengue", "Malaria", "Road Injury"]

    const links = causes1990.map((c, i) => {
        const targetIdx = causes2023.indexOf(c)
        return {
            source: i,
            target: targetIdx,
            value: 1
        }
    })

    const data = [
        ...causes1990.map(c => ({ name: `1990: ${c}` })),
        ...causes2023.map(c => ({ name: `2023: ${c}` }))
    ]

    const chartOption = {
        title: {
            text: 'Ranking Change (1990 vs 2023)',
            left: 'center',
            textStyle: { fontSize: 14, color: '#003d33' }
        },
        tooltip: { trigger: 'item', triggerOn: 'mousemove' },
        series: [
            {
                type: 'sankey',
                layout: 'none',
                emphasis: { focus: 'adjacency' },
                data: [
                    { name: 'Dengue (1990)', itemStyle: { color: '#ef4444' } },
                    { name: 'Malaria (1990)', itemStyle: { color: '#ef4444' } },
                    { name: 'Diarrhea (1990)', itemStyle: { color: '#ef4444' } },
                    { name: 'Violence (1990)', itemStyle: { color: '#10b981' } },
                    { name: 'Neoplasms (1990)', itemStyle: { color: '#3b82f6' } },

                    { name: 'Neoplasms (2023)', itemStyle: { color: '#3b82f6' } },
                    { name: 'Diabetes (2023)', itemStyle: { color: '#3b82f6' } },
                    { name: 'Violence (2023)', itemStyle: { color: '#10b981' } },
                    { name: 'Dengue (2023)', itemStyle: { color: '#ef4444' } },
                    { name: 'Malaria (2023)', itemStyle: { color: '#ef4444' } },
                ],
                links: [
                    { source: 'Dengue (1990)', target: 'Dengue (2023)', value: 1 },
                    { source: 'Malaria (1990)', target: 'Malaria (2023)', value: 1 },
                    { source: 'Violence (1990)', target: 'Violence (2023)', value: 1 },
                    { source: 'Neoplasms (1990)', target: 'Neoplasms (2023)', value: 1 },
                ],
                lineStyle: {
                    color: 'gradient',
                    curveness: 0.5
                },
                label: {
                    fontSize: 10,
                    fontWeight: 'bold'
                }
            }
        ]
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-2 border-b bg-slate-50/50">
                <div className="text-[13px] font-medium text-slate-600">
                    {location}, Arrow Diagram (Rankings), {year}
                </div>
            </div>
            <div className="flex-1 p-6">
                <BaseChart option={chartOption} className="h-full" />
            </div>
        </div>
    )
}

export default function ArrowPage() {
    return (
        <React.Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <ArrowChartContent />
        </React.Suspense>
    )
}

