"use client"

import { useEffect, useState } from "react"

interface MosaicoData {
  category: string
  subcategory: string
  value: number
  percentage: number
}

interface MosaicoChartProps {
  data: MosaicoData[]
  title?: string
}

export function MosaicoChart({ data, title }: MosaicoChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-[200px]" />

  const categories = [...new Set(data.map(d => d.category))]
  const categoryTotals = categories.map(cat => ({
    name: cat,
    total: data.filter(d => d.category === cat).reduce((sum, d) => sum + d.value, 0)
  }))
  const grandTotal = categoryTotals.reduce((sum, c) => sum + c.total, 0)

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]
  const subColors = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa", "#f472b6"]

  let currentX = 0

  return (
    <div className="w-full">
      {title && <h3 className="text-sm font-semibold mb-2 text-card-foreground">{title}</h3>}
      <div className="relative w-full h-[200px] border rounded-lg overflow-hidden bg-muted/30">
        <div className="absolute inset-2 flex">
          {categoryTotals.map((cat, catIdx) => {
            const catWidth = (cat.total / grandTotal) * 100
            const catData = data.filter(d => d.category === cat.name)
            let catHeight = 0

            return (
              <div 
                key={cat.name}
                className="relative h-full border-r border-background last:border-r-0"
                style={{ width: `${catWidth}%` }}
              >
                {catData.map((item, idx) => {
                  const itemHeight = (item.value / cat.total) * 100
                  const colorIdx = catIdx * 10 + idx
                  const top = catHeight
                  catHeight += itemHeight

                  return (
                    <div
                      key={item.subcategory}
                      className="absolute w-full border-b border-r border-background last:border-b-0 transition-opacity hover:opacity-80"
                      style={{
                        top: `${top}%`,
                        height: `${itemHeight}%`,
                        backgroundColor: subColors[colorIdx % subColors.length]
                      }}
                      title={`${item.subcategory}: ${item.value} (${item.percentage.toFixed(1)}%)`}
                    >
                      {itemHeight > 10 && (
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white drop-shadow-md">
                          {item.subcategory.substring(0, 8)}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: subColors[idx % subColors.length] }}
            />
            <span className="text-xs text-muted-foreground">{item.subcategory}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
