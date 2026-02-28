"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"
import { Info, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export default function RiskByCausePage() {
    const searchParams = useSearchParams()
    const measure = (searchParams.get("measure") || "DALYs").toUpperCase()
    const year = searchParams.get("year") || "2023"
    const sex = searchParams.get("sex") || "Both"
    const location = searchParams.get("location") || "Loreto"
    const metric = searchParams.get("metric") || "rate"

    // Mock data based on the screenshot (Stacked Bar Chart for Risks)
    const riskCategories = ["Behavioral", "Metabolic", "Environmental"]

    // Detailed risks (simplified for mock)
    const risks = {
        Behavioral: [
            { name: "Smoking", value: 1200, color: "#e11d48" },
            { name: "Dietary Risks", value: 1500, color: "#fb7185" },
            { name: "Alcohol Use", value: 800, color: "#fda4af" },
            { name: "Low Physical Activity", value: 600, color: "#fff1f2" }
        ],
        Metabolic: [
            { name: "High Systolic Blood Pressure", value: 3500, color: "#2563eb" },
            { name: "High Body-Mass Index", value: 2000, color: "#60a5fa" },
            { name: "High Fasting Plasma Glucose", value: 1800, color: "#93c5fd" },
            { name: "High LDL Cholesterol", value: 1200, color: "#dbeafe" }
        ],
        Environmental: [
            { name: "Air Pollution", value: 900, color: "#059669" },
            { name: "Non-optimal Temperature", value: 700, color: "#34d399" },
            { name: "Wash (Water/Sanitation)", value: 1100, color: "#a7f3d0" }
        ]
    }

    const chartOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        legend: {
            show: false // Custom legend on the right in the layout
        },
        grid: {
            left: '15%',
            right: '5%',
            bottom: '10%',
            top: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            name: `${measure} per 100,000`,
            nameLocation: 'middle',
            nameGap: 30,
            axisLabel: {
                formatter: (value: number) => `${value / 1000}k`
            },
            splitLine: { lineStyle: { type: 'dashed' } }
        },
        yAxis: {
            type: 'category',
            data: riskCategories,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                fontWeight: 'bold',
                color: '#003d33'
            }
        },
        series: [
            // Simplified stacking to mimic the screenshot
            ...Object.keys(risks).flatMap((cat, catIdx) =>
                (risks as any)[cat].map((item: any, itemIdx: number) => ({
                    name: item.name,
                    type: 'bar',
                    stack: cat,
                    data: riskCategories.map(c => c === cat ? item.value : 0),
                    itemStyle: { color: item.color },
                    barWidth: '60%'
                }))
            )
        ]
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden relative">
            {/* Top Bar Status */}
            <div className="flex items-center justify-between px-6 py-2 border-b bg-slate-50/50">
                <div className="text-[13px] font-medium text-slate-600">
                    {location}, {sex === 'both' ? 'Both sexes' : sex}, All ages, {year}
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border border-red-200 bg-red-50 flex items-center justify-center text-red-700 text-[10px] font-bold">i</div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Chart Area */}
                <div className="flex-1 p-6 flex flex-col min-w-0">
                    <div className="flex-1 bg-white relative">
                        <BaseChart option={chartOption} className="h-full" />
                    </div>
                </div>

                {/* Right Side Legend/Quick List */}
                <div className="w-[200px] border-l bg-slate-50/30 p-4 space-y-4 overflow-y-auto no-scrollbar">
                    <div className="flex flex-col gap-2">
                        <Select defaultValue="all">
                            <SelectTrigger className="h-8 text-[11px] shadow-none">
                                <SelectValue placeholder="Switch cause group" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Causes</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-3 w-3 text-slate-400" />
                            <input
                                className="w-full h-8 pl-7 pr-2 rounded-md border border-slate-200 text-[11px] outline-none focus:ring-1 focus:ring-teal-500"
                                placeholder="Add cause"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        {[
                            { label: "Self-harm & violence", color: "bg-red-700" },
                            { label: "Unintentional injury", color: "bg-red-500" },
                            { label: "Transport injuries", color: "bg-orange-500" },
                            { label: "Other non-communicable", color: "bg-teal-700" },
                            { label: "Musculoskeletal disorders", color: "bg-teal-600" },
                            { label: "Sense organ diseases", color: "bg-teal-500" },
                            { label: "Diabetes & CKD", color: "bg-teal-400" },
                            { label: "Digestive diseases", color: "bg-blue-800" },
                            { label: "Chronic respiratory", color: "bg-blue-600" },
                            { label: "Cardiovascular diseases", color: "bg-blue-400" },
                            { label: "Neoplasms", color: "bg-indigo-600" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between group cursor-pointer hover:bg-slate-100 p-1 rounded transition-colors">
                                <span className="text-[10px] text-blue-800 font-medium underline flex-1 truncate">{item.label}</span>
                                <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100">
                                    <div className={cn("w-1 h-3", item.color)}></div>
                                    <span className="text-[10px]">×</span>
                                </div>
                            </div>
                        ))}
                        <div className="text-[10px] text-slate-400 text-center py-2 cursor-pointer hover:text-slate-600">Clear selection</div>
                    </div>
                </div>
            </div>

            {/* Bottom Scale Label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#003d33]">
                {measure} per 100,000
            </div>
        </div>
    )
}
