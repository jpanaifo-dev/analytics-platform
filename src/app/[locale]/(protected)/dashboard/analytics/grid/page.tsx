"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BaseChart } from "@/components/analytics/charts/base-chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react"

export default function AnalyticsGridPage() {
    const searchParams = useSearchParams()
    const measure = searchParams.get("measure") || "dalys"
    const year = searchParams.get("year") || "2024"

    const diseases = [
        { name: "Dengue", cases: 24500, prev: 18200, trend: "+34.6%" },
        { name: "Malaria", cases: 12100, prev: 15400, trend: "-21.4%" },
        { name: "COVID-19", cases: 8900, prev: 45000, trend: "-80.2%" },
        { name: "Influenza", cases: 35000, prev: 32000, trend: "+9.3%" },
        { name: "EDA", cases: 45600, prev: 42100, trend: "+8.3%" },
        { name: "IRA", cases: 67200, prev: 61500, trend: "+9.2%" }
    ]

    const chartOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: [year, (parseInt(year) - 1).toString()]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: diseases.map(d => d.name)
        },
        series: [
            {
                name: (parseInt(year) - 1).toString(),
                type: 'bar',
                data: diseases.map(d => d.prev),
                itemStyle: { color: "#94A3B8" }
            },
            {
                name: year,
                type: 'bar',
                data: diseases.map(d => d.cases),
                itemStyle: { color: "#3B82F6" }
            }
        ]
    }

    return (
        <div className="flex flex-col gap-6 h-full overflow-y-auto">
            <Card className="flex flex-col shadow-sm border-none bg-white/50 dark:bg-slate-900">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">Comparación Interanual</CardTitle>
                            <CardDescription>Análisis de {measure} por tipo de enfermedad</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <BaseChart option={chartOption} />
                </CardContent>
            </Card>

            <Card className="shadow-sm border-none bg-white/50 dark:bg-slate-900">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Resumen Detallado</CardTitle>
                    <CardDescription>Datos comparativos por {measure}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Enfermedad</TableHead>
                                <TableHead className="text-right">Casos {year}</TableHead>
                                <TableHead className="text-right">Casos {parseInt(year) - 1}</TableHead>
                                <TableHead className="text-right">Variación</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {diseases.map((disease) => (
                                <TableRow key={disease.name}>
                                    <TableCell className="font-medium">{disease.name}</TableCell>
                                    <TableCell className="text-right font-bold">{disease.cases.toLocaleString()}</TableCell>
                                    <TableCell className="text-right font-medium text-muted-foreground">{disease.prev.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold gap-1 ${disease.trend.startsWith('+') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                            {disease.trend.startsWith('+') ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                            {disease.trend}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
