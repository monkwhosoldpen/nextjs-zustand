"use client"

import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/mycomponents/Chart"

interface PieChartProps {
  data: Array<{
    name: string
    value: number
  }>
  colors?: string[]
}

export function PieChart({ data, colors }: PieChartProps) {
  // Default colors if none provided
  const defaultColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]
  const chartColors = colors || defaultColors

  // Null check
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted rounded-md">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <ChartContainer
      config={{
        data: {
          label: "Data",
        },
      }}
      className="h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
        </RechartsChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
