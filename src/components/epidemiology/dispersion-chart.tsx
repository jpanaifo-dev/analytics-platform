"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface DataPoint {
  semana: number
  casos: number
  distrito: string
}

interface DispersionChartProps {
  data: DataPoint[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#ff7300"]

export function DispersionChart({ data }: DispersionChartProps) {
  const maxCasos = Math.max(...data.map(d => d.casos), 5)

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            type="number" 
            dataKey="semana" 
            name="Semana" 
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
            label={{ value: 'Semana Epidemiologica', position: 'bottom', offset: 0 }}
          />
          <YAxis 
            type="number" 
            dataKey="casos" 
            name="Casos" 
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
            domain={[0, maxCasos]}
            label={{ value: 'N° Casos', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-background border rounded-lg p-3 shadow-lg">
                    <p className="font-medium">{data.distrito}</p>
                    <p className="text-sm text-muted-foreground">Semana: {data.semana}</p>
                    <p className="text-sm text-muted-foreground">Casos: {data.casos}</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Scatter data={data} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
