"use client"

import * as React from "react"
import { cn } from "@/lib"

interface ChartConfig {
  data: {
    label?: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <Chart />")
  }

  return context
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

function ChartContainer({
  children,
  config,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("flex flex-col gap-4", className)} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

// Simple tooltip component for charts
const ChartTooltip = ({ content }: { content: React.ReactNode }) => {
  return content
}

// Tooltip content component
interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{ value: number; name: string; dataKey: string }>
  label?: string
}

function ChartTooltipContent({
  active,
  payload,
  label,
}: ChartTooltipContentProps) {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            {label ?? config.data.label}
          </span>
          <span className="font-bold">
            {payload[0]?.value}
          </span>
        </div>
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent } 