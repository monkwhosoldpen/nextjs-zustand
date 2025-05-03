"use client"

import { Badge } from "@/components/mycomponents/Badge"
import { BarChart, PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface LayoutPreviewProps {
  amountOfPages: number;
  kpisUsed: string[];
  chartPreviews?: Array<{
    chartType: string;
    title: string;
    insight: string;
    chartData: Array<{ name: string; value: number }>;
    size?: "small" | "medium" | "large";
    position?: number;
  }>;
}

export function LayoutPreview({ amountOfPages, kpisUsed, chartPreviews = [] }: LayoutPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Amount of Pages */}
      <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700/50">
        <h3 className="text-sm font-medium mb-2">Amount of Pages</h3>
        <div className="bg-white/80 dark:bg-slate-800/60 p-3 rounded-md">
          <span className="text-lg font-bold">{amountOfPages}</span> {amountOfPages === 1 ? 'page' : 'pages'}
        </div>
      </div>

      {/* KPIs Used */}
      <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700/50">
        <h3 className="text-sm font-medium mb-2">KPI's Being Used</h3>
        {kpisUsed.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {kpisUsed.map((kpi, index) => (
              <Badge key={index} variant="secondary" className="bg-white/80 dark:bg-slate-800/60">
                {kpi}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No KPIs used in this layout.</p>
        )}
      </div>

      {/* Layout Preview */}
      <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700/50">
        <h3 className="text-sm font-medium mb-2">Preview Layout</h3>
        <div className="bg-white/80 dark:bg-slate-800/60 rounded-md p-4">
          <div className="grid grid-cols-3 gap-3 bg-muted/30 p-4 rounded-md min-h-[200px]">
            {chartPreviews.length > 0 ? (
              chartPreviews.map((chart, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-background rounded-md border p-3 flex items-center justify-center shadow-sm",
                    chart.size === "small" ? "col-span-1" : 
                    chart.size === "medium" ? "col-span-2" : 
                    "col-span-3",
                    "h-20"
                  )}
                >
                  <div className="text-sm text-center">
                    <div className="font-medium">{chart.title || `Chart ${index + 1}`}</div>
                    <div className="text-muted-foreground text-xs mt-1">
                      {chart.chartType.includes("bar") ? 
                        <BarChart className="h-3 w-3 inline mr-1" /> : 
                        <PieChart className="h-3 w-3 inline mr-1" />
                      }
                      {chart.chartType} chart
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 flex items-center justify-center h-full text-muted-foreground">
                <p>No preview available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 