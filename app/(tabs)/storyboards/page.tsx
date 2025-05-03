"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/mycomponents/Card"
import { Badge } from "@/components/mycomponents/Badge"
import { Button } from "@/components/mycomponents/Button"
import { BookOpen, Plus, Lock } from "lucide-react"
import { Asset, Storyboard } from "@/lib/types"
import { AssetDetailsModal } from "@/components/modals/asset-details-modal"
import { useDashboard, useStoryboards as useStoryboardAssets, useSetActiveTab } from "@/lib"

// Extended storyboard type that combines both Asset and Storyboard properties
interface StoryboardData extends Asset {
  coupledKpisFilters: string[];
  applicableAffiliates: string[];
  requiresAccess: boolean;
}

export default function StoryboardsPage() {
  const setActiveTab = useSetActiveTab()
  const { assets } = useDashboard()
  const storyboardAssets = useStoryboardAssets()
  
  // Create storyboard data state
  const [storyboardsData, setStoryboardsData] = useState<StoryboardData[]>([])
  
  // Load storyboard data on component mount
  useEffect(() => {
    // In a real app, you would fetch this data properly
    // For now, we're creating mock data based on the assets
    const mockStoryboardsData: StoryboardData[] = storyboardAssets.map(asset => {
      return {
        ...asset,
        coupledKpisFilters: ['Revenue', 'Growth', 'Performance'].slice(0, Math.floor(Math.random() * 3) + 1),
        applicableAffiliates: ['North America', 'Europe', 'Asia Pacific', 'Latin America'].slice(0, Math.floor(Math.random() * 4) + 1),
        requiresAccess: !asset.hasAccess
      };
    });
    
    setStoryboardsData(mockStoryboardsData);
  }, [storyboardAssets])
  
  // Update active tab when the page loads
  useEffect(() => {
    setActiveTab('storyboards')
  }, [setActiveTab])
  
  // State for asset details modal
  const [detailsAsset, setDetailsAsset] = useState<Asset | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // State for create storyboard modal
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
  
  // Handle open create storyboard modal
  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
    // In a real implementation, this would open a modal for creating a storyboard
  };
  
  // Find the corresponding storyboard data for an asset
  const getStoryboardData = (assetId: string): StoryboardData | undefined => {
    return storyboardsData.find(storyboard => storyboard.id === assetId);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Storyboards</h1>
          <p className="text-muted-foreground">Browse and create interactive story presentations</p>
        </div>
        <Button onClick={handleOpenCreateModal} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Storyboard
        </Button>
      </div>

      {/* Storyboards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {storyboardAssets.map((storyboardAsset) => {
          // Format date
          const formattedDate = formatDate(storyboardAsset.createdAt);
          
          // Get the full storyboard data for this asset
          const storyboardData = getStoryboardData(storyboardAsset.id);
          
          return (
            <Card 
              key={storyboardAsset.id}
              className={`hover:shadow-md transition-shadow h-full flex flex-col ${!storyboardAsset.hasAccess ? "border-amber-200" : ""}`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-amber-600" />
                  {storyboardAsset.title}
                  {!storyboardAsset.hasAccess && (
                    <Lock className="h-4 w-4 text-amber-500 ml-auto" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3 flex-1">
                <p className="text-sm text-muted-foreground mb-4">
                  {storyboardAsset.description}
                </p>
                <div className="space-y-3">
                  {storyboardData?.coupledKpisFilters && storyboardData.coupledKpisFilters.length > 0 && (
                    <div>
                      <p className="text-xs font-medium mb-1">Coupled KPIs/Filters:</p>
                      <div className="flex flex-wrap gap-1">
                        {storyboardData.coupledKpisFilters.map((kpi, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            {kpi}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {storyboardData?.applicableAffiliates && storyboardData.applicableAffiliates.length > 0 && (
                    <div>
                      <p className="text-xs font-medium mb-1">Applicable Affiliates:</p>
                      <div className="flex flex-wrap gap-1">
                        {storyboardData.applicableAffiliates.map((affiliate, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {affiliate}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t flex items-center justify-between mt-auto">
                <p className="text-xs text-muted-foreground">
                  Created: {formattedDate}
                </p>
                {!storyboardAsset.hasAccess ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    onClick={() => handleAssetClick(storyboardAsset)}
                  >
                    Request Access
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleAssetClick(storyboardAsset)}
                  >
                    View Details
                  </Button>
                )}
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
    </div>
  );
} 