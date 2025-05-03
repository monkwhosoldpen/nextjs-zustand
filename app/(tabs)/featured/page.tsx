"use client"

import { useState, useEffect } from "react"
import { Asset } from "@/lib/types"
import { Card, CardContent, CardTitle } from "@/components/mycomponents/Card"
import { Badge } from "@/components/mycomponents/Badge"
import { Button } from "@/components/mycomponents/Button"
// @ts-ignore - Using ts-ignore to temporarily resolve the missing module error
import { ChevronRight, ExternalLink, Lock, Search } from "lucide-react"
import { useDashboard, useSetActiveTab } from "@/lib"
import { ExpandedAssetSection } from "@/components/modal-content/expanded-asset-section"
import { useRouter } from "next/navigation"
import { AssetDetailsModal } from "@/components/modals/asset-details-modal"
import TailwindTest from "@/app/tailwind-test"

export default function FeaturedPage() {
  const router = useRouter()
  const setActiveTab = useSetActiveTab()
  const { featuredAssets, toggleFavorite } = useDashboard()
  
  // Update active tab when the page loads
  useEffect(() => {
    setActiveTab('featured')
  }, [setActiveTab])
  
  // State for expanded asset section
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // State for asset details modal
  const [detailsAsset, setDetailsAsset] = useState<Asset | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Helper to truncate text
  const truncateText = (text: string, maxLength: number = 55) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
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

  // Handle asset click - for showing asset details
  const handleAssetClick = (asset: Asset) => {
    // Open the asset details modal for all assets (it will handle access control internally)
    setDetailsAsset(asset);
    setShowDetailsModal(true);
  };

  // Handle "Show More" click - opens expanded asset section
  const handleShowMore = (asset: Asset) => {
    // If user doesn't have access, show details modal instead
    if (!asset.hasAccess) {
      setDetailsAsset(asset);
      setShowDetailsModal(true);
      return;
    }
    
    // Otherwise, show expanded section
    setSelectedAsset(asset);
    setIsExpanded(true);
  };

  // Handle close of expanded asset section
  const handleCloseExpanded = () => {
    setIsExpanded(false);
    // Optional: clear selected asset after animation completes
    setTimeout(() => {
      setSelectedAsset(null);
    }, 350);
  };
  
  // Handle close of details modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setDetailsAsset(null);
  };

  // Navigate to search page
  const handleSearchClick = () => {
    router.push('/search')
  }

  // Get related assets for the selected asset
  const getRelatedAssets = (asset: Asset | null): Asset[] => {
    if (!asset) return [];
    
    // For demo purposes, we'll just return other featured assets
    // You could implement more sophisticated logic here
    return featuredAssets.filter(a => a.id !== asset.id).slice(0, 6);
  };

  // Handle favorite toggle
  const handleToggleFavorite = (assetId: string, e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation(); // Prevent card click
    toggleFavorite(assetId);
  };

  return (
    <div className="space-y-6">
      {/* Tailwind Test Component */}
      <TailwindTest />
      
      {/* Header with search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Featured Assets</h1>
          <p className="text-muted-foreground">Browse and discover featured assets</p>
        </div>
        
        {/* Search button */}
        <Button 
          onClick={handleSearchClick}
          className="w-full md:w-auto flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          <span>Search Assets</span>
        </Button>
      </div>

      {/* Featured assets grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredAssets.map((asset) => (
          <Card 
            key={asset.id}
            className={`hover:shadow-md transition-shadow h-full flex flex-col border-2 ${!asset.hasAccess ? "opacity-90 border-red-400" : "border-green-400"}`}
          >
            <CardContent className="p-6 flex-1 flex flex-col justify-between relative">
              {!asset.hasAccess && (
                <div className="absolute top-4 right-4">
                  <Lock className="h-4 w-4 text-red-500" />
                </div>
              )}
              
              <div>
                <CardTitle className="text-lg font-medium mb-2">
                  {asset.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-4">
                  {truncateText(asset.description, 120)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Created: {formatDate(asset.createdAt)}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge 
                    variant={asset.isFavorite ? "secondary" : "outline"} 
                    className="text-xs cursor-pointer"
                    onClick={(e) => handleToggleFavorite(asset.id, e)}
                  >
                    {asset.isFavorite ? "Favorite" : "Regular"}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleAssetClick(asset)}
                    className="text-xs rounded-sm"
                  >
                    View Details
                  </Button>
                  <Button 
                    variant={asset.hasAccess ? "ghost" : "outline"} 
                    size="sm" 
                    onClick={() => {
                      asset.hasAccess ? handleShowMore(asset) : handleAssetClick(asset);
                    }}
                    className={`text-xs rounded-sm transition-all flex items-center gap-1 group ${!asset.hasAccess ? "text-red-500 hover:text-red-600 border-red-500 hover:bg-red-50" : "hover:bg-muted/70"}`}
                  >
                    {asset.hasAccess ? (
                      <>
                        <span>Explore Asset</span>
                        <ExternalLink className="h-3 w-3" />
                      </>
                    ) : (
                      <>
                        <span>Request Access</span>
                        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expanded asset section */}
      <ExpandedAssetSection 
        mainAsset={selectedAsset}
        relatedAssets={getRelatedAssets(selectedAsset)}
        onAssetClick={handleAssetClick}
        onClose={handleCloseExpanded}
        isOpen={isExpanded}
      />
      
      {/* Asset details modal - handles both viewing details and requesting access */}
      <AssetDetailsModal 
        asset={detailsAsset}
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
      />
    </div>
  );
} 