"use client"

import { useState } from "react"
// @ts-ignore - Using ts-ignore to temporarily resolve the missing module error
import { Heart, Copy, X, BarChart as BarChartIcon, Pencil } from "lucide-react"
import type { Asset } from "@/lib"
import { Button } from "@/components/mycomponents/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/mycomponents/Dialog"
import { toast } from "@/lib"
import { Badge } from "@/components/mycomponents/Badge"
import { Separator } from "@/components/mycomponents/Separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/mycomponents/Tabs"
import { PieChart } from "@/components/charts/pie-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { mockKPIs, mockAssets, mockLayouts } from "@/lib"
import { LayoutPreview } from "@/components/modal-content/layout-preview"
import { CreateLayoutModal, LayoutEditorContent } from "@/components/modal-content/create-layout-content"
import { RequestAccessContent } from "@/components/modal-content/request-access-content"

interface AssetDetailsModalProps {
  asset: Asset | null
  isOpen: boolean
  onClose: () => void
}

export function AssetDetailsModal({ asset, isOpen, onClose }: AssetDetailsModalProps) {
  const [isFavorite, setIsFavorite] = useState(asset?.isFavorite || false)
  const [activeTab, setActiveTab] = useState<string>("chart")
  // State for edit layout modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [layoutToEdit, setLayoutToEdit] = useState<any>(null);
  // State for managing access request
  const [showRequestAccess, setShowRequestAccess] = useState(false);
  
  // State for insights capture (moved from renderDataVizContent)
  const [insightText, setInsightText] = useState<string>("");
  const [capturedInsights, setCapturedInsights] = useState<Array<{text: string, timestamp: string}>>([]);
  const [showExportOptions, setShowExportOptions] = useState<boolean>(false);

  if (!asset) return null

  // Initialize the access request view if the asset doesn't have access
  if (asset && !asset.hasAccess && !showRequestAccess) {
    setShowRequestAccess(true);
  }

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${asset.title} has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
    })
  }

  const handleCopyLink = () => {
    // In a real app, this would generate a shareable link
    const dummyLink = `https://analytics-hub.example/asset/${asset.id}`
    navigator.clipboard.writeText(dummyLink)
    toast({
      title: "Link copied",
      description: "Asset link has been copied to clipboard.",
    })
  }
  
  // Handle capturing an insight
  const handleCaptureInsight = () => {
    if (insightText.trim()) {
      const newInsight = {
        text: insightText,
        timestamp: new Date().toLocaleString()
      };
      setCapturedInsights([...capturedInsights, newInsight]);
      setInsightText("");
      toast({
        title: "Insight captured",
        description: "Your insight has been saved and can be included in exports.",
      });
    }
  };
  
  // Handle exporting data and insights
  const handleExportData = (format: 'pdf' | 'excel' | 'powerpoint') => {
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: `Your visualization and ${capturedInsights.length} insights are being prepared for export.`,
    });
    
    // In a real app, this would trigger the actual export
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: `Your ${format.toUpperCase()} file has been downloaded.`,
      });
      setShowExportOptions(false);
    }, 1500);
  };

  // Get asset type from ID
  const getAssetType = (assetId: string): string => {
    const id = assetId.toLowerCase();
    if (id.includes('kpi')) {
      return "KPI";
    } else if (id.includes('dataviz')) {
      return "DataViz";
    } else if (id.includes('layout')) {
      return "Layout";
    } else if (id.includes('storyboard')) {
      return "Storyboard";
    } else {
      return "Asset";
    }
  };

  // Render content based on asset ID pattern
  const renderAssetContent = () => {
    // If user needs to request access, show that view instead
    if (!asset.hasAccess && showRequestAccess) {
      return <RequestAccessContent asset={asset} onClose={onClose} />;
    }
    
    const assetType = getAssetType(asset.id);
    
    switch (assetType) {
      case "KPI":
        return renderKPIContent();
      case "DataViz":
        return renderDataVizContent();
      case "Layout":
        return renderLayoutContent();
      case "Storyboard":
        return renderStoryboardContent();
      default:
        return null;
    }
  }

  // KPI content renderer - uses mockKPIs data for the first KPI
  const renderKPIContent = () => {
    // Extract KPI index from the asset ID (e.g., kpi-3 => 2)
    const kpiIdMatch = asset.id.match(/kpi-(\d+)/);
    const kpiIndex = kpiIdMatch ? parseInt(kpiIdMatch[1], 10) - 1 : 0;
    
    // Use the corresponding KPI from mockKPIs if available, or fall back to the first one
    const mockKpi = kpiIndex >= 0 && kpiIndex < mockKPIs.length ? mockKPIs[kpiIndex] : mockKPIs[0];
    const businessQuestions = mockKpi.businessQuestions;
    const metricIds = mockKpi.metricIds;
    const visualsAvailable = mockKpi.visualsAvailable;
    const affiliateApplicability = mockKpi.affiliateApplicability;
    const calculation = mockKpi.calculation;

    // Function to find and open a related DataViz asset
    const handleViewDataViz = () => {
      // Try to find a DataViz asset that matches this KPI index
      const relatedIndex = kpiIdMatch ? parseInt(kpiIdMatch[1], 10) : 1;
      const dataVizAsset = mockAssets.find((a: Asset) => 
        a.id.includes('dataviz') && 
        (a.id.includes(`${relatedIndex}`) || a.isFavorite)
      );
      
      if (dataVizAsset) {
        // Open the DataViz asset in a new modal
        window.open(`/asset/dataviz/${dataVizAsset.id}`, '_blank');
      }
    };

    return (
      <div className="space-y-4">
        {/* Business Questions */}
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700/50">
          <h3 className="text-sm font-medium mb-2">Business Questions</h3>
          {businessQuestions.length > 0 ? (
            <ul className="space-y-2">
              {businessQuestions.map((question: string, index: number) => (
                <li key={index} className="text-sm bg-white/80 dark:bg-slate-800/60 p-2 rounded-md">
                  {question}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No business questions available.</p>
          )}
        </div>

        {/* Metric IDs */}
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700/50">
          <h3 className="text-sm font-medium mb-2">Metric IDs</h3>
          {metricIds.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {metricIds.map((metric: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-white/80 dark:bg-slate-800/60">
                  {metric}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No metric IDs available.</p>
          )}
        </div>

        {/* Description */}
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700/50">
          <h3 className="text-sm font-medium mb-2">Description</h3>
          <p className="text-sm text-muted-foreground bg-white/80 dark:bg-slate-800/60 p-2 rounded-md">
            {asset.description || "No description available."}
          </p>
        </div>

        {/* Calculation */}
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700/50">
          <h3 className="text-sm font-medium mb-2">Calculation</h3>
          <div className="bg-white/80 dark:bg-slate-800/60 p-3 rounded-md font-mono text-sm">
            {calculation || "No calculation formula available."}
          </div>
        </div>

        {/* Visuals Available */}
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700/50">
          <h3 className="text-sm font-medium mb-2">Visuals Available</h3>
          {visualsAvailable.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {visualsAvailable.map((visual: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-white/80 dark:bg-slate-800/60">
                  {visual}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No visuals available.</p>
          )}
        </div>

        {/* Affiliate Applicability */}
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700/50">
          <h3 className="text-sm font-medium mb-2">Affiliate Applicability</h3>
          {affiliateApplicability.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {affiliateApplicability.map((affiliate: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-white/80 dark:bg-slate-800/60">
                  {affiliate}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No affiliate applicability information.</p>
          )}
        </div>

      </div>
    )
  }

  // DataViz content renderer - uses mock data
  const renderDataVizContent = () => {
    // Generate mock data
    const applicableKpiFavorites = ["Revenue", "Customer Retention", "Sales Growth"];
    const chartData = [
      { name: "Category A", value: 35 },
      { name: "Category B", value: 25 },
      { name: "Category C", value: 20 },
      { name: "Category D", value: 15 },
      { name: "Category E", value: 5 },
    ];

    return (
      <div className="space-y-6 pb-2">
        {/* Chart Tabs */}
        <div className="bg-white dark:bg-slate-800/50 rounded-lg border p-4">
          <Tabs defaultValue="bar">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="pie">Pie Chart</TabsTrigger>
              <TabsTrigger value="line">Line Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="bar" className="p-4 bg-muted/30 rounded-md border">
              <BarChart data={chartData} />
            </TabsContent>
            <TabsContent value="pie" className="p-4 bg-muted/30 rounded-md border">
              <PieChart data={chartData} />
            </TabsContent>
            <TabsContent value="line" className="p-4 bg-muted/30 rounded-md border">
              <LineChart data={chartData} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Professional Export Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <h3 className="text-base font-semibold text-blue-800 dark:text-blue-300">Data Insight Capture</h3>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs bg-white dark:bg-slate-800"
                onClick={() => setShowExportOptions(!showExportOptions)}
              >
                Export Options
              </Button>
            </div>
          </div>
          
          {/* Export Options Dropdown */}
          {showExportOptions && (
            <div className="bg-white dark:bg-slate-800 p-3 rounded-md mb-3 shadow-md">
              <p className="text-xs text-muted-foreground mb-2">Export data with annotations and insights:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs"
                  onClick={() => handleExportData('pdf')}
                >
                  PDF Report
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs"
                  onClick={() => handleExportData('excel')}
                >
                  Excel Data
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs"
                  onClick={() => handleExportData('powerpoint')}
                >
                  PowerPoint
                </Button>
              </div>
            </div>
          )}
          
          {/* Insight Capture Input */}
          <div className="flex flex-col sm:flex-row gap-2 items-start">
            <textarea
              className="flex-1 h-20 p-2 rounded-md border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 text-sm resize-none"
              placeholder="Enter your insights about this data... (What do you notice? What does this suggest about the business?)"
              value={insightText}
              onChange={(e) => setInsightText(e.target.value)}
            />
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 h-auto py-2 whitespace-nowrap"
              onClick={handleCaptureInsight}
            >
              Capture
            </Button>
          </div>
          
          {/* Captured Insights List */}
          {capturedInsights.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">Captured Insights:</h4>
              <div className="max-h-32 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
                {capturedInsights.map((insight, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800 p-2 rounded-md border-l-4 border-blue-500 text-sm">
                    <p>{insight.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{insight.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Applicable KPI Favorites */}
        <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-300 dark:border-blue-700/50">
          <h3 className="text-sm font-medium mb-2">Applicable KPI Favorites</h3>
          {applicableKpiFavorites.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {applicableKpiFavorites.map((kpi, index) => (
                <Badge key={index} variant="secondary" className="bg-white/80 dark:bg-slate-800/60">
                  {kpi}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No applicable KPI favorites.</p>
          )}
        </div>

        {/* Description */}
        <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-300 dark:border-blue-700/50">
          <h3 className="text-sm font-medium mb-2">Description</h3>
          <p className="text-sm text-muted-foreground bg-white/80 dark:bg-slate-800/60 p-2 rounded-md">
            {asset.description || "No description available."}
          </p>
        </div>
      </div>
    )
  }

  // Handle layout updated
  const handleLayoutUpdated = (updatedLayout: any) => {
    // Layout was saved
    setShowEditModal(false);
  };

  // Handle open edit layout modal
  const handleOpenEditModal = (layout: any) => {
    setLayoutToEdit(layout);
    setShowEditModal(true);
  };

  // Handle close edit layout modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setLayoutToEdit(null);
  };

  // Layout content renderer - uses mock data
  const renderLayoutContent = () => {
    // Extract layout ID from asset ID
    const layoutIdMatch = asset.id.match(/layout-(\d+)/);
    const layoutIndex = layoutIdMatch ? parseInt(layoutIdMatch[1], 10) - 1 : 0;
    
    // Find the layout in mockLayouts
    const layout = mockLayouts.find(l => l.id === asset.id) || mockLayouts[0];
    
    // Transform the chart previews to ensure correct types for size
    const typedChartPreviews = layout.chartPreviews.map(chart => ({
      ...chart,
      size: chart.size as "small" | "medium" | "large"
    }));
    
    // Show editor if editing, otherwise show preview
    if (showEditModal && layoutToEdit) {
      return (
        <div className="overflow-y-auto -mx-6 px-6 h-full min-h-0">
          <LayoutEditorContent
            onClose={handleCloseEditModal}
            onLayoutUpdated={handleLayoutUpdated}
            editMode={true}
            layoutToEdit={layoutToEdit}
          />
        </div>
      );
    }
    
    // Use actual data from the layout
    return (
      <div className="space-y-4">
        <LayoutPreview 
          amountOfPages={layout.amountOfPages}
          kpisUsed={layout.kpisUsed}
          chartPreviews={typedChartPreviews}
        />
      </div>
    )
  }

  // Storyboard content renderer - uses mock data
  const renderStoryboardContent = () => {
    // Generate mock data
    const coupledKpisFilters = ["Revenue by Quarter", "Customer Retention Rate", "Monthly Active Users"];
    const applicableAffiliates = ["North America", "Europe", "Asia Pacific"];
    const requiresAccess = asset.hasAccess === false;

    return (
      <div className="space-y-4">
        {/* Coupled KPIs/Filters */}
        <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-300 dark:border-purple-700/50">
          <h3 className="text-sm font-medium mb-2">Coupled KPIs/Filters</h3>
          {coupledKpisFilters.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {coupledKpisFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="bg-white/80 dark:bg-slate-800/60">
                  {filter}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No coupled KPIs or filters.</p>
          )}
        </div>

        {/* Applicable Affiliates */}
        <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-300 dark:border-purple-700/50">
          <h3 className="text-sm font-medium mb-2">Applicable Affiliates</h3>
          {applicableAffiliates.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {applicableAffiliates.map((affiliate, index) => (
                <Badge key={index} variant="secondary" className="bg-white/80 dark:bg-slate-800/60">
                  {affiliate}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No applicable affiliates.</p>
          )}
        </div>

        {/* Request Access */}
        <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-300 dark:border-purple-700/50">
          <h3 className="text-sm font-medium mb-2">Request Access</h3>
          <div className="bg-white/80 dark:bg-slate-800/60 p-3 rounded-md">
            <p className="text-sm text-muted-foreground mb-3">
              {requiresAccess 
                ? "This storyboard requires special access. Request access to view or use it." 
                : "This storyboard is available to all users. No special access required."}
            </p>
            {requiresAccess && (
              <Button variant="secondary" size="sm" onClick={() => setShowRequestAccess(true)}>
                Request Access
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const assetType = getAssetType(asset.id);

  return (
    <Dialog open={isOpen === true} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-[80%] w-[95%] max-h-[90vh] overflow-hidden flex flex-col p-0 asset-details-modal" 
        hideCloseButton={true}
      >
        <DialogHeader className="bg-background sticky top-0 z-20 p-6 pb-4 backdrop-blur-sm flex-shrink-0 border-b">
          <DialogTitle>{asset.title}</DialogTitle>
          <DialogDescription>{assetType}</DialogDescription>
        </DialogHeader>

        {/* When request access is needed, show that content */}
        {!asset.hasAccess && showRequestAccess ? (
          <div className="flex-1 min-h-0">
            <RequestAccessContent asset={asset} onClose={onClose} />
          </div>
        ) : (
          <>
            <div className="flex-1 min-h-0 overflow-y-auto px-6 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 asset-details-content">
              <div className="py-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{asset.description}</p>
                </div>

                {/* Render asset-specific content */}
                {renderAssetContent()}
                
                {/* Add padding at the bottom to ensure content isn't hidden behind footer */}
                <div className="h-20"></div>
              </div>
              
              {/* Fade indicator for scrollable area */}
              <div className="absolute left-0 right-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sticky bottom-0 bg-background p-6 pt-4 border-t shadow-md z-20 gap-2 flex-shrink-0 mt-auto">
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant={isFavorite ? "default" : "outline"} size="sm" onClick={handleFavoriteToggle} className="flex-1 sm:flex-none">
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Favorited" : "Favorite"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyLink} className="flex-1 sm:flex-none">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy link
                </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="w-full sm:w-auto">
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>

      <style jsx global>{`
        .asset-details-modal {
          display: flex !important;
          flex-direction: column !important;
          max-height: 90vh !important;
        }
        
        .asset-details-content {
          overflow-y: auto !important;
          flex: 1 1 auto !important;
          min-height: 0 !important;
        }
        
        /* Ensure the scrollbars are visible */
        .asset-details-content::-webkit-scrollbar {
          width: 8px !important;
          height: 8px !important;
          background-color: transparent !important;
        }
        
        .asset-details-content::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5) !important;
          border-radius: 20px !important;
        }
        
        .asset-details-content::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.8) !important;
        }
      `}</style>
    </Dialog>
  )
} 