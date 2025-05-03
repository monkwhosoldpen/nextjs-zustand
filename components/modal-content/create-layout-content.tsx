"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/mycomponents/Button"
import { toast } from "@/lib"
// @ts-ignore - Using ts-ignore to temporarily resolve the missing module error
import { BarChart, PieChart, Plus, Trash2, LayoutGrid, Move, Maximize2, Minimize2, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/mycomponents/Select"
import { Label } from "@/components/mycomponents/Label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/mycomponents/Card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/mycomponents/Badge"
// @ts-ignore
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { mockAssets, mockKPIs, mockLayouts } from "@/lib"
import { Asset, KPI } from "@/lib/types"
import { Input } from "@/components/mycomponents/Input"
import { Textarea } from "@/components/mycomponents/Textarea"
import { Dialog, DialogContent } from "@/components/mycomponents/Dialog"

interface CreateLayoutModalProps {
  isOpen: boolean
  onClose: () => void
  onLayoutCreated?: (layout: any) => void
  onLayoutUpdated?: (layout: any) => void
  preselectedKPIs?: string[]
  preselectedDataViz?: string[]
  editMode?: boolean
  layoutToEdit?: any
  renderInline?: boolean // New prop to determine if rendered inline
}

interface ChartPreview {
  id: string
  chartType: "bar" | "pie" | "line" | "area"
  title: string
  insight: string
  size: "small" | "medium" | "large"
  position: number
  chartData: Array<{
    name: string
    value: number
  }>
}

// Main component for the layout creation/editing content
export function LayoutEditorContent({
  onClose,
  onLayoutCreated,
  onLayoutUpdated,
  preselectedKPIs = [],
  preselectedDataViz = [],
  editMode = false,
  layoutToEdit = null
}: Omit<CreateLayoutModalProps, 'isOpen' | 'renderInline'>) {
  // Get data from mockData instead of DBProvider
  const assets = mockAssets;
  const kpis = mockKPIs;
  
  // Functions to add and update layouts (would connect to actual API in real app)
  const addLayout = (layout: any) => {
    // Mock layout addition
    return layout;
  };
  
  const updateLayout = (layout: any) => {
    // Mock layout update
    return layout;
  };
  
  // Editor init with props check
  
  // Extract KPI assets from the mockKPIs array with proper typing
  const kpiAssets = mockKPIs.map(kpi => ({
    id: kpi.id,
    title: `KPI #${kpi.id.split('-')[1] || ''}`,
    description: kpi.businessQuestions[0] || 'No description'
  }));
  
  // Initialize all state with static values instead of using useEffect
  const initialChart: ChartPreview = {
    id: "chart-1",
      chartType: "bar",
      title: "Main Metric",
      insight: "Key insight about this data",
    size: "medium",
    position: 0,
      chartData: [
        { name: "Category A", value: 40 },
        { name: "Category B", value: 30 },
        { name: "Category C", value: 20 },
        { name: "Category D", value: 10 }
      ]
  };
  
  // State initialization
  const [title, setTitle] = useState(editMode && layoutToEdit ? layoutToEdit.title : "")
  const [description, setDescription] = useState(editMode && layoutToEdit ? layoutToEdit.description : "")
  const [selectedKPIs, setSelectedKPIs] = useState(editMode && layoutToEdit ? layoutToEdit.kpisUsed : preselectedKPIs)
  const [chartPreviews, setChartPreviews] = useState<ChartPreview[]>(
    editMode && layoutToEdit && layoutToEdit.chartPreviews ? 
      layoutToEdit.chartPreviews : 
      [initialChart]
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use a fixed width for the grid
  const containerWidth = 1200;
  
  // Generate grid items from the chart previews
  const gridItems = chartPreviews.map((chart, i) => {
    const width = chart.size === "small" ? 1 : chart.size === "medium" ? 2 : 3;
    return {
      i: chart.id,
      x: 0,
      y: i,
      w: width,
      h: 3,
      minW: 1,
      maxW: 3
    };
  });

  // Effect to update state when layoutToEdit changes
  useEffect(() => {
    if (editMode && layoutToEdit) {
      // Load data from existing layout
      
      setTitle(layoutToEdit.title || "");
      setDescription(layoutToEdit.description || "");
      setSelectedKPIs(layoutToEdit.kpisUsed || []);
      
      if (layoutToEdit.chartPreviews && layoutToEdit.chartPreviews.length > 0) {
        setChartPreviews(layoutToEdit.chartPreviews);
      }
    }
  }, [editMode, layoutToEdit]);

  const handleLayoutChange = (newLayout: any[]) => {
    // Track layout changes
    
    // Update chart sizes based on new layout
    const updatedCharts = [...chartPreviews];
    
    newLayout.forEach((item) => {
      const chartIndex = updatedCharts.findIndex(chart => chart.id === item.i);
      if (chartIndex !== -1) {
        // Update size based on width
        let newSize: "small" | "medium" | "large" = "small";
        if (item.w === 2) newSize = "medium";
        if (item.w === 3) newSize = "large";
        
        updatedCharts[chartIndex] = {
          ...updatedCharts[chartIndex],
          size: newSize,
          position: item.y
        };
      }
    });
    
    // Sort by vertical position
    updatedCharts.sort((a, b) => a.position - b.position);
    
    setChartPreviews(updatedCharts);
  };

  const handleAddChart = useCallback(() => {
    // Use a simple counter for IDs
    const newChartId = `chart-${chartPreviews.length + 1}`;
    
    const newChart: ChartPreview = {
      id: newChartId,
      chartType: "pie",
      title: "New Chart",
      insight: "Add insight about this data",
      size: "medium",
      position: chartPreviews.length,
      chartData: [
        { name: "Segment 1", value: 50 },
        { name: "Segment 2", value: 30 },
        { name: "Segment 3", value: 20 }
      ]
    };
    
    setChartPreviews(prev => [...prev, newChart]);
  }, [chartPreviews.length]);

  const handleRemoveChart = useCallback((id: string) => {
    setChartPreviews(prev => {
      const newChartPreviews = prev.filter(chart => chart.id !== id);
      // Update positions
      newChartPreviews.forEach((chart, idx) => {
        chart.position = idx;
      });
      return newChartPreviews;
    });
  }, []);

  const updateChartPreview = useCallback((id: string, field: keyof ChartPreview, value: any) => {
    setChartPreviews(prev => {
      const updatedPreviews = [...prev];
      const index = updatedPreviews.findIndex(chart => chart.id === id);
      if (index === -1) return prev;
      
    updatedPreviews[index] = {
      ...updatedPreviews[index],
      [field]: value
      };
      return updatedPreviews;
    });
  }, []);

  const handleSelectKPI = useCallback((kpiTitle: string) => {
    setSelectedKPIs((prev: string[]) => {
      if (prev.includes(kpiTitle)) {
        return prev.filter((k: string) => k !== kpiTitle);
      } else {
        return [...prev, kpiTitle];
      }
    });
  }, []);
  
  const getChartPreview = (chart: ChartPreview) => {
    switch (chart.chartType) {
      case "bar":
        return (
          <div className="bg-muted/30 rounded-md p-3 h-full flex flex-col justify-end">
            <div className="flex items-end h-full gap-2">
              {chart.chartData.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-primary/80 rounded-t w-full relative group"
                  style={{ height: `${(item.value / Math.max(...chart.chartData.map(d => d.value))) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background shadow-sm border rounded px-1.5 py-0.5 text-xs">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex text-xs mt-2 justify-between text-muted-foreground">
              {chart.chartData.map((item, idx) => (
                <div key={idx} className="truncate max-w-[50px] text-center">{item.name.substring(0, 3)}</div>
              ))}
            </div>
          </div>
        );
      case "pie":
        return (
          <div className="bg-muted/30 rounded-md p-3 h-full flex items-center justify-center">
            <div className="relative w-28 h-28">
              {chart.chartData.map((item, idx) => {
                const total = chart.chartData.reduce((sum: number, i) => sum + i.value, 0);
                const startAngle = chart.chartData.slice(0, idx).reduce((sum: number, i) => sum + i.value, 0) / total * 360;
                const endAngle = startAngle + (item.value / total * 360);
                
                return (
                  <div 
                    key={idx}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(
                        transparent ${startAngle}deg, 
                        hsl(var(--primary)) ${startAngle}deg, 
                        hsl(var(--primary)) ${endAngle}deg, 
                        transparent ${endAngle}deg
                      )`
                    }}
                  >
                    <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-background shadow-sm border rounded px-2 py-1 text-xs">
                        {item.name}: {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="absolute inset-8 rounded-full bg-muted/50"></div>
            </div>
          </div>
        );
      default:
        return <div className="bg-muted/30 rounded-md p-3 h-full flex items-center justify-center">Chart Preview</div>;
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please provide a title for your layout.",
        variant: "destructive",
      })
      return
    }

    if (chartPreviews.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one chart to your layout.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    // Start layout save

    // If in edit mode, update existing layout
    if (editMode && layoutToEdit) {
      const updatedLayout = {
        ...layoutToEdit,
        title,
        description,
        type: "Layout" as const,
        updatedAt: new Date().toISOString(),
        amountOfPages: Math.ceil(chartPreviews.length / 4),
        kpisUsed: selectedKPIs,
        chartPreviews: chartPreviews.map(chart => ({
          ...chart,
          // Save layout information
          layoutInfo: {
            size: chart.size,
            position: chart.position
          }
        }))
      };

      // Save updates
      
      // Update layout in store via DBProvider
      updateLayout(updatedLayout);
      
      // Call callback if provided
      if (onLayoutUpdated) {
        onLayoutUpdated(updatedLayout);
      }
      
      toast({
        title: "Layout updated",
        description: "Your layout has been updated successfully.",
      });
      
      setIsSubmitting(false);
      onClose();
      return;
    }

    // Create new layout object with layout information
    const newLayout = {
      id: `layout-${Math.floor(Math.random() * 10000)}`,
      title,
      description,
      type: "Layout" as const,
      createdAt: new Date().toISOString(),
      isFavorite: false,
      amountOfPages: Math.ceil(chartPreviews.length / 4),
      kpisUsed: selectedKPIs,
      chartPreviews: chartPreviews.map(chart => ({
        ...chart,
        // Save layout information
        layoutInfo: {
          size: chart.size,
          position: chart.position
        }
      })),
      previewImage: "https://cdn.pixabay.com/photo/2018/05/04/06/35/board-3373682_1280.jpg"
    }

    // Saving new layout
    
    // Add new layout to store via DBProvider
    addLayout(newLayout);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      if (onLayoutCreated) {
        onLayoutCreated(newLayout);
      }
      toast({
        title: "Layout created",
        description: "Your layout has been created successfully.",
      })
      // Reset form
      setTitle("");
      setDescription("");
      setSelectedKPIs([]);
      setChartPreviews([{
        id: "chart-1",
        chartType: "bar" as const,
        title: "Main Metric",
        insight: "Key insight about this data",
        size: "medium" as const,
        position: 0,
        chartData: [
          { name: "Category A", value: 40 },
          { name: "Category B", value: 30 },
          { name: "Category C", value: 20 },
          { name: "Category D", value: 10 }
        ]
      }]);
      onClose();
    }, 500);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-20 bg-background pb-4 pt-6 border-b border-border/40 backdrop-blur-none bg-opacity-100 shadow-sm px-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-semibold">{editMode ? 'Edit Layout' : 'Create New Layout'}</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {editMode ? 'Modify your custom layout with charts and insights' : 'Create a custom layout with multiple charts and insights'}
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        <div className="py-6 space-y-8 px-4">
          {/* Basic information - Made into a 2-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/10 p-6 rounded-lg border">
            <div>
              <Label htmlFor="title" className="block mb-2 font-medium">Layout Title</Label>
              <Input 
                id="title"
                placeholder="Enter layout title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background"
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="block mb-2 font-medium">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose of this layout"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px] bg-background"
              />
            </div>
          </div>

          {/* KPI selection */}
          <div className="bg-muted/10 p-6 rounded-lg border">
            <Label className="block mb-3 text-base font-medium">Select KPIs</Label>
            <div className="border rounded-md p-4 bg-background max-h-[150px] overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {kpiAssets.map((kpi: { id: string, title: string, description: string }) => (
                  <Badge 
                    key={kpi.id}
                    variant={selectedKPIs.includes(kpi.title) ? "default" : "outline"}
                    className="cursor-pointer text-sm py-1.5 transition-all hover:shadow-sm"
                    onClick={() => handleSelectKPI(kpi.title)}
                  >
                    {kpi.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Chart builders */}
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/10 p-4 rounded-lg border">
              <Label className="text-lg font-medium">Chart Layout</Label>
              <Button size="sm" variant="default" onClick={handleAddChart} className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="h-4 w-4 mr-1" />
                Add Chart
              </Button>
            </div>
            
            <div className="border rounded-md p-6 bg-gradient-to-b from-muted/5 to-muted/20 shadow-sm">
              <div className="text-xs text-muted-foreground mb-4 p-2 bg-background/80 rounded border inline-block">
                <p className="flex items-center">
                  <Move className="h-3 w-3 inline mr-1" /> 
                  Drag to reorder &nbsp;•&nbsp; 
                  <Maximize2 className="h-3 w-3 inline mx-1" /> 
                  Resize by dragging the handles on edges
                </p>
              </div>
              
              {chartPreviews.length > 0 ? (
                <div className="w-full h-full">
                  <GridLayout
                    className="layout"
                    layout={gridItems}
                    cols={3}
                    rowHeight={130}
                    width={containerWidth}
                    isResizable={true}
                    isDraggable={true}
                    compactType="vertical"
                    onLayoutChange={handleLayoutChange}
                    margin={[16, 16]}
                    containerPadding={[0, 0]}
                  >
                    {chartPreviews.map((chart) => (
                      <div key={chart.id} className={cn(
                        "border rounded-md bg-background transition-shadow",
                        "hover:shadow-md hover:border-primary/30"
                      )}>
                        <div className="p-4 pb-5 relative">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-3 right-3 h-8 w-8 rounded-full hover:bg-destructive/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveChart(chart.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                  
                          <CardHeader className="pb-2 pt-1 px-1">
                            <CardTitle className="text-sm font-medium">
                              <Input 
                                placeholder="Chart Title" 
                                value={chart.title}
                                onChange={(e) => updateChartPreview(chart.id, 'title', e.target.value)}
                                className="h-9 text-base"
                              />
                            </CardTitle>
                          </CardHeader>
                  
                          <CardContent className="space-y-5 pt-2 px-1">
                            <div className="h-[140px]">
                              {getChartPreview(chart)}
                            </div>
                              
                            <div className="bg-muted/10 p-3 rounded-md">
                              <Label className="text-sm mb-2 block">Chart Type</Label>
                              <div className="flex space-x-3">
                                <Button 
                                  size="sm" 
                                  variant={chart.chartType === "bar" ? "default" : "outline"}
                                  className={cn("flex gap-2 px-4 py-2", 
                                    chart.chartType === "bar" ? "text-primary-foreground" : "text-muted-foreground"
                                  )}
                                  onClick={() => updateChartPreview(chart.id, 'chartType', "bar")}
                                >
                                  <BarChart className="h-4 w-4" />
                                  <span>Bar</span>
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant={chart.chartType === "pie" ? "default" : "outline"}
                                  className={cn("flex gap-2 px-4 py-2", 
                                    chart.chartType === "pie" ? "text-primary-foreground" : "text-muted-foreground"
                                  )}
                                  onClick={() => updateChartPreview(chart.id, 'chartType', "pie")}
                                >
                                  <PieChart className="h-4 w-4" />
                                  <span>Pie</span>
                                </Button>
                              </div>
                            </div>
                    
                            <div>
                              <Label className="text-sm mb-2 block">Key Insight</Label>
                              <Textarea
                                placeholder="What insight does this chart provide?"
                                value={chart.insight}
                                onChange={(e) => updateChartPreview(chart.id, 'insight', e.target.value)}
                                className="min-h-[80px] text-sm"
                              />
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    ))}
                  </GridLayout>
                </div>
              ) : (
                <div className="text-center py-12 bg-background/70 rounded-lg border border-dashed">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4">No charts added yet.</p>
                  <Button variant="default" onClick={handleAddChart} className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Your First Chart
                  </Button>
                </div>
              )}
            </div>
              
            <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6 border border-blue-200/50 dark:border-blue-800/30 shadow-sm">
              <h3 className="text-base font-medium mb-3 text-blue-800 dark:text-blue-300">Layout Preview</h3>
              <p className="text-sm text-muted-foreground mb-4">This preview shows how charts will be laid out on the dashboard.</p>
              <div className="grid grid-cols-3 gap-3 bg-white dark:bg-slate-800/60 p-4 rounded-md min-h-[250px] shadow-inner">
                {chartPreviews.map((chart) => (
                  <div 
                    key={chart.id}
                    className={cn(
                      "bg-background rounded-md border p-4 flex items-center justify-center transition-all shadow-sm",
                      chart.size === "small" ? "col-span-1" : 
                      chart.size === "medium" ? "col-span-2" : 
                      "col-span-3",
                      "h-24"
                    )}
                  >
                    <div className="text-sm text-center">
                      <div className="font-medium">{chart.title || `Chart`}</div>
                      <div className="text-muted-foreground text-xs mt-1">
                        {chart.chartType === "bar" ? <BarChart className="h-4 w-4 inline mr-1" /> : <PieChart className="h-4 w-4 inline mr-1" />}
                        {chart.chartType} chart • Size: {chart.size}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Add padding at bottom to prevent content from being hidden behind footer */}
        <div className="h-20"></div>
      </div>

      <div className="flex-shrink-0 sticky bottom-0 bg-background pt-4 pb-4 border-t z-10 flex justify-end gap-2 bg-gradient-to-t from-background/95 to-background/80 backdrop-blur-sm px-4">
        <Button variant="outline" onClick={onClose} disabled={isSubmitting} className="shadow-sm">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          className="gap-2 shadow-sm bg-green-600 hover:bg-green-700 text-white"
        >
          {isSubmitting ? "Saving..." : (
            <>
              <Save className="h-4 w-4" />
              {editMode ? 'Save Changes' : 'Create Layout'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// Client-side only wrapper - used for standalone modal
export function CreateLayoutModal(props: CreateLayoutModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, [props]);
  
  if (!isMounted) return null;
  
  // If renderInline is true, render just the content without the Dialog
  if (props.renderInline) {
    return <LayoutEditorContent {...props} />;
  }

  // Render with Dialog
  return (
    <Dialog open={props.isOpen} onOpenChange={(open) => !open && props.onClose()}>
      <DialogContent className="sm:max-w-[90%] w-[95%] max-h-[90vh] overflow-hidden p-0" hideCloseButton>
        <LayoutEditorContent {...props} />
      </DialogContent>
    </Dialog>
  );
} 