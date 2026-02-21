"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"

interface HistogramaProps {
  data: { range: string; frecuencia: number; color?: string }[]
  title?: string
}

export function HistogramaChart({ data, title }: HistogramaProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-sm font-semibold mb-2 text-card-foreground">{title}</h3>}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="range" tick={{ fontSize: 10 }} stroke="#888" />
          <YAxis tick={{ fontSize: 10 }} stroke="#888" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--background)', 
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontSize: '12px'
            }}
            labelStyle={{ color: 'var(--foreground)' }}
          />
          <Bar dataKey="frecuencia" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || "#3b82f6"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
