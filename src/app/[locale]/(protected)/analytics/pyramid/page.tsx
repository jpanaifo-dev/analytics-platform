"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"

function PyramidChartContent() {
    const searchParams = useSearchParams()
    const year = searchParams.get("year") || "2023"
    const location = searchParams.get("location") || "Loreto"
    const measure = (searchParams.get("measure") || "DALYs").toUpperCase()

    const ageGroups = ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75+"]

    // Mock data for Male/Female
    const maleData = [120, 110, 105, 95, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30].map(v => -v)
    const femaleData = [118, 108, 103, 93, 83, 78, 73, 68, 63, 58, 53, 48, 43, 38, 33, 28]

    const chartOption = {
        title: {
            text: `Population Pyramid - ${location} (${year})`,
            left: 'center',
            textStyle: { fontSize: 14 }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params: any) => {
                let res = params[0].name + '<br/>';
                params.forEach((item: any) => {
                    res += item.marker + item.seriesName + ': ' + Math.abs(item.value) + '<br/>';
                });
                return res;
            }
        },
        legend: {
            data: ['Male', 'Female'],
            bottom: 10
        },
        grid: {
            left: '10%',
            right: '10%',
            top: '15%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: (v: number) => Math.abs(v)
                }
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: ageGroups
            }
        ],
        series: [
            {
                name: 'Male',
                type: 'bar',
                stack: 'Total',
                label: { show: false },
                itemStyle: { color: '#3b82f6' },
                data: maleData
            },
            {
                name: 'Female',
                type: 'bar',
                stack: 'Total',
                label: { show: false },
                itemStyle: { color: '#ec4899' },
                data: femaleData
            }
        ]
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-2 border-b bg-slate-50/50">
                <div className="text-[13px] font-medium text-slate-600">
                    {location}, Population Pyramid, {year}
                </div>
            </div>
            <div className="flex-1 p-6">
                <BaseChart option={chartOption} className="h-full" />
            </div>
        </div>
    )
}

export default function PyramidPage() {
    return (
        <React.Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <PyramidChartContent />
        </React.Suspense>
    )
}

