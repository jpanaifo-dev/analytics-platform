"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, YAxis as YAxisRight, Tooltip, Cell, Legend } from "recharts"

interface ParetoChartProps {
  data: { name: string; value: number; acumulado: number }[]
  title?: string
}

export function ParetoChart({ data, title }: ParetoChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="w-full">
      {title && <h3 className="text-sm font-semibold mb-2 text-card-foreground">{title}</h3>}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#888" />
          <YAxis tick={{ fontSize: 10 }} stroke="#888" yAxisId="left" />
          <YAxisRight 
            orientation="right" 
            tick={{ fontSize: 10 }} 
            stroke="#888" 
            yAxisId="right" 
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--background)', 
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontSize: '12px'
            }}
            labelStyle={{ color: 'var(--foreground)' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar yAxisId="left" dataKey="value" name="Casos" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.value >= maxValue * 0.8 ? "#ef4444" : "#3b82f6"} />
            ))}
          </Bar>
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="acumulado" 
            name="% Acumulado" 
            stroke="#f59e0b" 
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
