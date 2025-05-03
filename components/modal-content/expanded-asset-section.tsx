"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { Asset } from "@/lib/types"
import { Button } from "@/components/mycomponents/Button"
// @ts-ignore - Using ts-ignore to temporarily resolve the missing module error
import { X, BarChart, PieChart, LayoutGrid, Presentation, Search, Lock } from "lucide-react"
import { Separator } from "@/components/mycomponents/Separator"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/mycomponents/Badge"
import { Card, CardContent } from "@/components/mycomponents/Card"
import { useRouter } from "next/navigation"

interface ExpandedAssetSectionProps {
  mainAsset: Asset | null
  relatedAssets: Asset[]
  onAssetClick: (asset: Asset) => void
  onClose: () => void
  isOpen: boolean
}

export function ExpandedAssetSection({ 
  mainAsset, 
  relatedAssets, 
  onAssetClick,
  onClose,
  isOpen
}: ExpandedAssetSectionProps) {
  const router = useRouter()
  const [showAll, setShowAll] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const previousOpenState = useRef(isOpen);
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>(
    isOpen ? 'entered' : 'exited'
  )
  
  // Helper to truncate text
  const truncateText = (text: string, maxLength: number = 55) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Handle close with direct function call to parent
  const handleClose = useCallback(() => {
    setAnimationState('exiting');
    
    // Call the parent's onClose function
    setTimeout(() => {
      onClose();
    }, 300); // Match the CSS transition duration
  }, [onClose]);

  // Handle animation states for the component
  useEffect(() => {
    // Track when open state changes
    if (isOpen !== previousOpenState.current) {
      previousOpenState.current = isOpen;
      
      if (isOpen) {
        // Opening sequence
        setAnimationState('entering');
        const timer = setTimeout(() => setAnimationState('entered'), 300);
        return () => clearTimeout(timer);
      } else if (animationState !== 'exited') {
        // Only start exiting animation if not already exited
        setAnimationState('exiting');
        const timer = setTimeout(() => setAnimationState('exited'), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, animationState]);

  // Control body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling when panel is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when panel is closed
      document.body.style.overflow = '';
    }
    
    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset state when a new asset is shown
  useEffect(() => {
    if (isOpen && mainAsset) {
      setShowAll(false);
      setIsTransitioning(false);
    }
  }, [isOpen, mainAsset?.id]);

  // If no main asset is provided or the panel is fully exited, don't render anything
  if (!mainAsset || animationState === 'exited') return null;

  const displayedAssets = showAll ? relatedAssets : relatedAssets.slice(0, 4)

  // Smooth transition when opening a new expanded section
  const handleAssetShowMore = (asset: Asset) => {
    setIsTransitioning(true)
    // Close the current panel
    handleClose()
    // Then open a new one for the selected asset with a delay for smooth transition
    setTimeout(() => {
      onAssetClick(asset)
      setIsTransitioning(false)
    }, 350)
  }

  // Get icon based on asset ID pattern
  const getAssetIcon = () => {
    const id = mainAsset.id.toLowerCase();
    
    if (id.includes('kpi')) {
      return <BarChart className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
    } else if (id.includes('dataviz')) {
      return <PieChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    } else if (id.includes('layout')) {
      return <LayoutGrid className="h-5 w-5 text-green-600 dark:text-green-400" />;
    } else if (id.includes('storyboard')) {
      return <Presentation className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
    } else {
      return <BarChart className="h-5 w-5 text-primary" />;
    }
  };

  // Get type-specific color class
  const getTypeColorClass = () => {
    const id = mainAsset.id.toLowerCase();
    if (id.includes('kpi')) {
      return "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700/50 text-yellow-800 dark:text-yellow-300";
    } else if (id.includes('dataviz')) {
      return "bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700/50 text-blue-800 dark:text-blue-300";
    } else if (id.includes('layout')) {
      return "bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700/50 text-green-800 dark:text-green-300";
    } else if (id.includes('storyboard')) {
      return "bg-purple-100 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700/50 text-purple-800 dark:text-purple-300";
    } else {
      return "bg-muted/30 border-border/60";
    }
  };

  // Get a one-line summary based on asset ID pattern
  const getOneSummary = () => {
    const id = mainAsset.id.toLowerCase();
    
    if (id.includes('kpi')) {
      return `Business metric with visualization options and performance tracking.`;
    } else if (id.includes('dataviz')) {
      return `Interactive chart visualization for performance analysis.`;
    } else if (id.includes('layout')) {
      return `Dashboard layout with multiple visualizations and KPIs.`;
    } else if (id.includes('storyboard')) {
      return `Comprehensive storyboard for presentation and analysis.`;
    } else {
      return "Detailed analytics asset with interactive components.";
    }
  };

  // Get asset type from ID
  const getAssetType = () => {
    const id = mainAsset.id.toLowerCase();
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

  return (
    <>
      {/* Semi-transparent overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-opacity duration-300",
          animationState === 'entering' || animationState === 'entered' 
            ? 'opacity-100' 
            : 'opacity-0 pointer-events-none'
        )}
        onClick={handleClose}
      />
      
      {/* Sidebar panel */}
      <div 
        className={cn(
          "fixed right-0 top-0 z-40 h-full shadow-xl bg-background border-l flex flex-col",
          "w-full max-w-full sm:max-w-[85%] md:max-w-[550px]",
          "sm:rounded-l-xl",
          animationState === 'entering' || animationState === 'entered' 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0',
          'transition-all duration-300 ease-in-out'
        )}
      >
        {/* Header without close button - sticky at top */}
        <div className="flex-shrink-0 bg-background p-4 sm:p-6 border-b">
          <div className={cn("px-3 py-1.5 rounded-full flex items-center gap-2 border", getTypeColorClass())}>
            <div className="h-5 w-5 rounded-full bg-white/70 dark:bg-background/70 flex items-center justify-center">
              {getAssetIcon()}
            </div>
            <span className="text-sm font-medium">{getAssetType()}</span>
          </div>
        </div>
        
        {/* Scrollable content area with improved padding to prevent overlap with footer */}
        <div className="flex-grow overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6 
                        scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/30 hover:scrollbar-thumb-muted-foreground/50"
             style={{ paddingBottom: "80px" }}>
          
          {/* Main asset title and description */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">{mainAsset.title}</h2>
            <p className="text-sm text-muted-foreground">{mainAsset.description}</p>
            
            {/* One-line summary */}
            <div className={cn("p-4 rounded-lg border text-sm", getTypeColorClass())}>
              {getOneSummary()}
            </div>

            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => onAssetClick(mainAsset)}
              className="w-full sm:w-auto"
            >
              View full details
            </Button>
          </div>
          
          <Separator className="bg-border/60 my-6" />
          
          {/* Related assets section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                {getAssetIcon()}
                <span>Related {getAssetType()} Assets</span>
              </h3>
            </div>

            {/* Card with currently viewing asset info */}
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 
                           rounded-lg p-4 shadow-sm transform transition-all duration-300 hover:shadow-md">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-yellow-100 dark:bg-yellow-800/20 p-2 mt-1">
                  {getAssetIcon()}
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Currently viewing</h4>
                  <p className="text-sm text-muted-foreground">{mainAsset.title}</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {getAssetType()}
                    </Badge>
                    {mainAsset.isFavorite && (
                      <Badge variant="secondary" className="text-xs">Favorite</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional assets section - grid layout for better responsive design */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Related assets you might like</h4>
              
              {relatedAssets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {displayedAssets.map((asset) => (
                    <Card 
                      key={asset.id}
                      className={cn(
                        "cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col h-full",
                        "border-2",
                        !asset.hasAccess ? "border-red-400/80" : "border-green-400/80"
                      )}
                      onClick={() => handleAssetShowMore(asset)}
                    >
                      <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between relative">
                        {!asset.hasAccess && (
                          <div className="absolute top-2 right-2 bg-red-100 dark:bg-red-900/20 rounded-full p-1">
                            <Lock className="h-3 w-3 text-red-500" />
                          </div>
                        )}
                        
                        <div>
                          <h5 className="text-sm font-medium mb-1 line-clamp-1">{asset.title}</h5>
                          <p className="text-xs text-muted-foreground line-clamp-2">{asset.description}</p>
                        </div>
                        
                        <div className="mt-3 pt-2 border-t border-border/40">
                          <Button 
                            variant={asset.hasAccess ? "ghost" : "outline"} 
                            size="sm" 
                            className={cn(
                              "text-xs w-full rounded-sm justify-center",
                              !asset.hasAccess && "text-red-500 hover:text-red-600 border-red-400"
                            )}
                          >
                            {asset.hasAccess ? "Explore Asset" : "Request Access"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">No related assets available</p>
                </div>
              )}

              {/* Show more button */}
              {relatedAssets.length > 4 && !showAll && (
                <div className="flex justify-center mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowAll(true)}
                    className="text-xs"
                  >
                    Show all {relatedAssets.length} related assets
                  </Button>
                </div>
              )}
            </div>

            {/* Search prompt section */}
            <div 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 
                          border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 
                          cursor-pointer hover:shadow-md transition-all duration-200 
                          flex items-center gap-4 mt-6 mb-4 group"
              onClick={() => router.push('/search')}
            >
              <div className="bg-white dark:bg-background w-10 h-10 rounded-full flex items-center justify-center 
                              shadow-sm group-hover:shadow group-hover:scale-105 transition-all duration-200">
                <Search className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Not finding what you need?</h4>
                <p className="text-xs text-muted-foreground">Try our advanced search to discover more assets</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer with close button - sticky at bottom */}
        <div className="flex-shrink-0 sticky bottom-0 bg-background pb-2 pt-4 border-t shadow-md z-10 px-4 sm:px-6 flex flex-col sm:flex-row sm:justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={handleClose} className="w-full sm:w-auto">
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </div>
    </>
  )
}
