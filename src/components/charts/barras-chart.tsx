"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"

interface BarrasChartProps {
  data: { name: string; value: number; color?: string }[]
  title?: string
  horizontal?: boolean
}

export function BarrasChart({ data, title, horizontal = false }: BarrasChartProps) {
  const defaultColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"]

  return (
    <div className="w-full min-h-[200px]">
      {title && <h3 className="text-sm font-semibold mb-2 text-card-foreground">{title}</h3>}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout={horizontal ? "vertical" : "horizontal"}>
          {horizontal ? (
            <>
              <XAxis type="number" tick={{ fontSize: 10 }} stroke="#888" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} stroke="#888" />
            </>
          ) : (
            <>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#888" />
              <YAxis tick={{ fontSize: 10 }} stroke="#888" />
            </>
          )}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--background)', 
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontSize: '12px'
            }}
            labelStyle={{ color: 'var(--foreground)' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || defaultColors[index % defaultColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
