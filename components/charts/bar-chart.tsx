"use client"

import { BarChart as RechartsChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/mycomponents/Chart"

interface BarChartProps {
  data: Array<{
    name: string
    value: number
  }>
  color?: string
}

export function BarChart({ data, color = "#8884d8" }: BarChartProps) {
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
          label: "Value",
        },
      }}
      className="h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="value" fill={color} name="Value" />
        </RechartsChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
