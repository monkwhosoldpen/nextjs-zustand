"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/mycomponents/Card"
import { Badge } from "@/components/mycomponents/Badge"
import { Button } from "@/components/mycomponents/Button"
import { LayoutGrid, Plus } from "lucide-react"
import { Asset, Layout } from "@/lib/types"
import { AssetDetailsModal } from "@/components/modals/asset-details-modal"
import { CreateLayoutModal } from "@/components/modal-content/create-layout-content"
import { useDashboard, useLayouts as useLayoutAssets, useSetActiveTab, mockLayouts } from "@/lib"

// Extended layout type that combines both Asset and Layout properties
interface LayoutData extends Asset {
  amountOfPages: number;
  kpisUsed: string[];
  previewImage: string;
  chartPreviews: {
    chartType: string;
    title: string;
    insight: string;
    chartData: Array<{ name: string; value: number }>;
    size?: string;
    position?: number;
  }[];
}

export default function LayoutsPage() {
  const setActiveTab = useSetActiveTab()
  const { assets } = useDashboard()
  const layoutAssets = useLayoutAssets()
  
  // Create layout data state
  const [layoutsData, setLayoutsData] = useState<LayoutData[]>([])
  
  // Load layout data on component mount
  useEffect(() => {
    // In a real app, you would fetch this data properly
    // For now, we're using mockLayouts which contains the full layout data
    setLayoutsData(mockLayouts as LayoutData[]);
  }, [])
  
  // Update active tab when the page loads
  useEffect(() => {
    setActiveTab('layouts')
  }, [setActiveTab])
  
  // State for asset details modal
  const [detailsAsset, setDetailsAsset] = useState<Asset | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // State for create layout modal
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Handle asset click - for showing asset details
  const handleAssetClick = (asset: Asset) => {
    setDetailsAsset(asset);
    setShowDetailsModal(true);
  };
  
  // Handle close of details modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setDetailsAsset(null);
  };
  
  // Handle open create layout modal
  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };
  
  // Handle close create layout modal
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };
  
  // Handle layout created
  const handleLayoutCreated = (layout: any) => {
    // In a real app, we would update the layouts list
    // For now, we'll just close the modal
    setShowCreateModal(false);
  };

  // Find the corresponding layout data for an asset
  const getLayoutData = (assetId: string): LayoutData | undefined => {
    return layoutsData.find(layout => layout.id === assetId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Layouts</h1>
          <p className="text-muted-foreground">Browse and create custom dashboard layouts</p>
        </div>
        <Button onClick={handleOpenCreateModal} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Layout
        </Button>
      </div>

      {/* Layouts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {layoutAssets.map((layoutAsset) => {
          // Format date
          const date = new Date(layoutAsset.createdAt);
          const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          });
          
          // Get the full layout data for this asset
          const layoutData = getLayoutData(layoutAsset.id);
          
          return (
            <Card 
              key={layoutAsset.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 text-primary" />
                  {layoutAsset.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground mb-4">
                  {layoutAsset.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {layoutData?.amountOfPages || 1} pages
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {layoutData?.chartPreviews?.length || 0} charts
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1">KPIs used:</p>
                    <div className="flex flex-wrap gap-1">
                      {layoutData?.kpisUsed && layoutData.kpisUsed.length > 0 ? (
                        layoutData.kpisUsed.map((kpi, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {kpi}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          No KPIs
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Created: {formattedDate}
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs ml-auto"
                  onClick={() => handleAssetClick(layoutAsset)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Asset details modal */}
      <AssetDetailsModal 
        asset={detailsAsset}
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
      />
      
      {/* Create layout modal */}
      <CreateLayoutModal
        isOpen={showCreateModal}
        onClose={handleCloseCreateModal}
        onLayoutCreated={handleLayoutCreated}
      />
    </div>
  );
} 