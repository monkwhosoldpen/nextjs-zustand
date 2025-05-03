"use client"

import { LineChart as RechartsChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/mycomponents/Chart"

interface LineChartProps {
  data: Array<{
    name: string
    value: number
  }>
  color?: string
}

export function LineChart({ data, color = "#8884d8" }: LineChartProps) {
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
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            activeDot={{ r: 8 }} 
            name="Value"
            strokeWidth={2}
          />
        </RechartsChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
} 