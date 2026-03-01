"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"

function TreemapChartContent() {
    const searchParams = useSearchParams()
    const measure = (searchParams.get("measure") || "DALYs").toUpperCase()
    const year = searchParams.get("year") || "2023"
    const location = searchParams.get("location") || "Loreto"

    // Mock Treemap Data (Causes of DALYs in Loreto)
    const data = [
        {
            name: 'Communicable, maternal, neonatal, and nutritional diseases',
            value: 4500,
            itemStyle: { color: '#dc2626' },
            children: [
                { name: 'Dengue', value: 1200, itemStyle: { color: '#ef4444' } },
                { name: 'Malaria', value: 900, itemStyle: { color: '#f87171' } },
                { name: 'HIV/AIDS', value: 600, itemStyle: { color: '#fca5a5' } },
                { name: 'Diarrheal diseases', value: 800, itemStyle: { color: '#fee2e2' } },
            ]
        },
        {
            name: 'Non-communicable diseases',
            value: 3800,
            itemStyle: { color: '#2563eb' },
            children: [
                { name: 'Cardiovascular diseases', value: 1500, itemStyle: { color: '#3b82f6' } },
                { name: 'Neoplasms', value: 1200, itemStyle: { color: '#60a5fa' } },
                { name: 'Diabetes and kidney diseases', value: 600, itemStyle: { color: '#93c5fd' } },
                { name: 'Digestive diseases', value: 500, itemStyle: { color: '#dbeafe' } },
            ]
        },
        {
            name: 'Injuries',
            value: 1700,
            itemStyle: { color: '#059669' },
            children: [
                { name: 'Transport injuries', value: 800, itemStyle: { color: '#10b981' } },
                { name: 'Self-harm & violence', value: 600, itemStyle: { color: '#34d399' } },
                { name: 'Unintentional injury', value: 300, itemStyle: { color: '#a7f3d0' } },
            ]
        }
    ]

    const chartOption = {
        tooltip: {
            formatter: (info: any) => {
                const value = info.value;
                const name = info.name;
                return [
                    '<div class="tooltip-title">' + name + '</div>',
                    measure + ': ' + value.toLocaleString(),
                ].join('');
            }
        },
        series: [
            {
                name: 'Causes',
                type: 'treemap',
                visibleMin: 300,
                label: {
                    show: true,
                    formatter: '{b}'
                },
                upperLabel: {
                    show: true,
                    height: 25,
                    color: '#fff',
                    backgroundColor: '#333'
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    gapWidth: 1
                },
                levels: [
                    {
                        itemStyle: {
                            borderColor: '#777',
                            borderWidth: 0,
                            gapWidth: 1
                        },
                        upperLabel: {
                            show: false
                        }
                    },
                    {
                        itemStyle: {
                            borderColor: '#555',
                            borderWidth: 5,
                            gapWidth: 1
                        },
                        emphasis: {
                            itemStyle: {
                                borderColor: '#ddd'
                            }
                        }
                    },
                    {
                        colorSaturation: [0.35, 0.5],
                        itemStyle: {
                            borderWidth: 5,
                            gapWidth: 1,
                            borderColorSaturation: 0.6
                        }
                    }
                ],
                data: data
            }
        ]
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-2 border-b bg-slate-50/50">
                <div className="text-[13px] font-medium text-slate-600">
                    {location}, Treemap View, All ages, {year}
                </div>
            </div>
            <div className="flex-1 p-6">
                <Card className="h-full border-none shadow-none">
                    <CardContent className="h-full p-0">
                        <BaseChart option={chartOption} className="h-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function TreemapPage() {
    return (
        <React.Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <TreemapChartContent />
        </React.Suspense>
    )
}

