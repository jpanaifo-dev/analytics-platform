"use client"

import * as React from "react"
import ReactECharts from "echarts-for-react"
import { useTheme } from "next-themes"

interface BaseChartProps {
    option: any
    style?: React.CSSProperties
    className?: string
    loading?: boolean
}

export function BaseChart({ option, style, className, loading }: BaseChartProps) {
    const { theme } = useTheme()
    const chartRef = React.useRef<any>(null)

    const ecommerceTheme = {
        color: [
            "#3b82f6",
            "#10b981",
            "#f59e0b",
            "#ef4444",
            "#8b5cf6",
            "#ec4899",
            "#06b6d4"
        ],
        backgroundColor: "transparent",
        textStyle: {
            fontFamily: "Inter, sans-serif"
        }
    }

    return (
        <div className={`w-full h-full min-h-[400px] ${className}`}>
            <ReactECharts
                ref={chartRef}
                option={option}
                style={{ height: "100%", width: "100%", ...style }}
                theme={theme === "dark" ? "dark" : ecommerceTheme}
                showLoading={loading}
                notMerge={true}
                lazyUpdate={true}
            />
        </div>
    )
}
