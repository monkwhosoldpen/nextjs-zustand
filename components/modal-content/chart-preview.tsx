"use client"

import { BarChart } from "@/components/charts/bar-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { type Layout } from "@/lib/types"

interface ChartPreviewProps {
  layout: Layout
  previewIndex?: number
}

export function ChartPreview({ layout, previewIndex = 0 }: ChartPreviewProps) {
  // If no chart previews are available
  if (!layout.chartPreviews || layout.chartPreviews.length === 0) {
    return null
  }

  // Get the preview at the specified index or default to the first one
  const preview = layout.chartPreviews[previewIndex] || layout.chartPreviews[0]
  
  return (
    <div className="space-y-2">
      <div className="flex flex-col space-y-1">
        <h4 className="text-sm font-medium">{preview.title}</h4>
        <p className="text-xs text-muted-foreground">{preview.insight}</p>
      </div>
      
      <div className="h-40 w-full">
        {preview.chartType === "bar" ? (
          <BarChart data={preview.chartData} />
        ) : preview.chartType === "pie" ? (
          <PieChart data={preview.chartData} />
        ) : (
          <div className="flex items-center justify-center h-full bg-muted rounded-md">
            <p className="text-muted-foreground text-xs">Chart preview not available</p>
          </div>
        )}
      </div>
    </div>
  )
} 