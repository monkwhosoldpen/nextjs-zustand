"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
// @ts-ignore - Using ts-ignore to temporarily resolve the missing module error
import { ChevronLeft, Search, X, Filter, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/mycomponents/Button"
import { Input } from "@/components/mycomponents/Input"
import { Card, CardContent } from "@/components/mycomponents/Card"
import { Badge } from "@/components/mycomponents/Badge"
import { Asset } from "@/lib/types"
import { AssetDetailsModal } from "@/components/modals/asset-details-modal"
import { useDashboard } from "@/lib"

type AssetType = 'KPI' | 'DataViz' | 'Layout' | 'Storyboard' | 'Favorites';

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const { assets, activeTab } = useDashboard()
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([])
  const [displayAssets, setDisplayAssets] = useState<Asset[]>([])
  const [isFiltered, setIsFiltered] = useState(false)
  const [activeFilters, setActiveFilters] = useState<AssetType[]>([])
  
  // State for asset details modal
  const [detailsAsset, setDetailsAsset] = useState<Asset | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  
  // Debounce timer for saving recent searches
  const searchDebounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Load recent searches from localStorage on mount and set initial assets
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches')
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
    
    // Initial search if query parameter exists
    if (initialQuery) {
      performSearch(initialQuery)
      addToRecentSearches(initialQuery)
    } else {
      // If no search query, don't display any assets by default
      setFilteredAssets([])
      setDisplayAssets([])
    }
  }, [initialQuery, assets])

  // Save recent searches to localStorage when they change
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
  }, [recentSearches])

  // Apply filters when filtered state or active filters change
  useEffect(() => {
    if (!isFiltered || activeFilters.length === 0) {
      setDisplayAssets(filteredAssets)
      return
    }
    
    let filteredResults = [...filteredAssets]
    
    if (activeFilters.includes('Favorites')) {
      filteredResults = filteredResults.filter(asset => asset.isFavorite)
    }
    
    if (activeFilters.some(filter => ['KPI', 'DataViz', 'Layout', 'Storyboard'].includes(filter))) {
      filteredResults = filteredResults.filter(asset => {
        const assetType = getAssetType(asset.id)
        return activeFilters.includes(assetType as AssetType)
      })
    }
    
    setDisplayAssets(filteredResults)
  }, [isFiltered, activeFilters, filteredAssets])

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

  // Handle asset click to open details modal
  const handleAssetClick = (asset: Asset) => {
    setDetailsAsset(asset)
    setShowDetailsModal(true)
  }
  
  // Handle close of details modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
    setDetailsAsset(null)
  }

  // Add a search term to recent searches
  const addToRecentSearches = (term: string) => {
    if (!term.trim()) return
    
    // Add to beginning, remove duplicates, limit to 5
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== term.toLowerCase())
      return [term, ...filtered].slice(0, 5)
    })
  }

  // Debounced add to recent searches - only save if search is significant
  const debouncedAddToRecentSearches = (term: string) => {
    // Cancel any existing timer
    if (searchDebounceTimer.current) {
      clearTimeout(searchDebounceTimer.current)
    }
    
    // Only save significant searches (with results and at least 3 characters)
    if (term.trim().length >= 3) {
      searchDebounceTimer.current = setTimeout(() => {
        const results = assets.filter(asset => 
          asset.title.toLowerCase().includes(term.toLowerCase()) || 
          asset.description.toLowerCase().includes(term.toLowerCase())
        )
        
        // Only add to recent searches if there are results or it's a significant search
        if (results.length > 0) {
          addToRecentSearches(term)
        }
      }, 1000) // Wait 1 second after typing stops
    }
  }

  // Perform search
  const performSearch = (query: string) => {
    if (!query.trim()) {
      // If search is cleared, show all assets
      setFilteredAssets(assets)
      setDisplayAssets(assets)
      return
    }
    
    const results = assets.filter(asset => 
      asset.title.toLowerCase().includes(query.toLowerCase()) || 
      asset.description.toLowerCase().includes(query.toLowerCase())
    )
    
    setFilteredAssets(results)
    setDisplayAssets(results)
  }

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission is no longer the primary search method, but we'll keep it for accessibility
    if (searchQuery.trim()) {
      addToRecentSearches(searchQuery)
    }
  }

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    performSearch(value)
    
    // Debounce adding to recent searches
    if (value.trim()) {
      debouncedAddToRecentSearches(value)
    }
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('')
    setFilteredAssets([])
    setDisplayAssets([])
    setActiveFilters([])
    setIsFiltered(false)
  }

  // Handle using a recent search
  const handleUseRecentSearch = (term: string) => {
    setSearchQuery(term)
    performSearch(term)
    // No need to add to recent searches since it's already there
  }

  // Handle back button
  const handleBack = () => {
    router.push('/' + (activeTab || 'featured'))
  }

  // Toggle filtered view
  const toggleFilteredView = () => {
    const newFilteredState = !isFiltered
    setIsFiltered(newFilteredState)
    
    if (!newFilteredState) {
      // If turning off filtered view, reset active filters
      setActiveFilters([])
      setDisplayAssets(filteredAssets)
    }
  }
  
  // Toggle a specific filter
  const toggleFilter = (filter: AssetType) => {
    setIsFiltered(true)
    
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        // Remove filter if already active
        return prev.filter(f => f !== filter)
      } else {
        // Add filter
        return [...prev, filter]
      }
    })
  }
  
  // Handle explore asset
  const handleExploreAsset = () => {
    // This would typically navigate to an asset discovery page
    router.push('/(tabs)/featured')
  }

  // Empty state rendering
  const renderEmptyState = () => {
    if (searchQuery) {
      // No results for a search query
      return (
        <div className="text-center py-12 bg-muted/5 rounded-md border border-border/40">
          <p className="text-muted-foreground">
            {`No results found for "${searchQuery}"${isFiltered ? ' with current filters' : ''}`}
          </p>
        </div>
      )
    } else {
      // Default state when no search has been performed
      return (
        <div className="text-center py-12 space-y-4 bg-muted/5 rounded-md border border-border/40">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Search for assets</h3>
            <p className="text-muted-foreground max-w-md mx-auto mt-1">
              Search for assets by title, description, or keywords to find what you need.
            </p>
          </div>
          <div className="pt-4">
            <Button 
              onClick={handleExploreAsset}
              variant="outline"
              className="w-full max-w-xs"
            >
              <span>Explore All Assets</span>
            </Button>
          </div>
        </div>
      )
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  // Get badge color based on type
  const getTypeBadgeColor = (assetType: string) => {
    switch (assetType) {
      case 'KPI':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'DataViz':
        return "bg-purple-100 text-purple-800 border-purple-200";
      case 'Layout':
        return "bg-green-100 text-green-800 border-green-200";
      case 'Storyboard':
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  const typeCounts = {
    KPI: filteredAssets.filter(a => getAssetType(a.id) === 'KPI').length,
    DataViz: filteredAssets.filter(a => getAssetType(a.id) === 'DataViz').length,
    Layout: filteredAssets.filter(a => getAssetType(a.id) === 'Layout').length,
    Storyboard: filteredAssets.filter(a => getAssetType(a.id) === 'Storyboard').length,
    Favorites: filteredAssets.filter(a => a.isFavorite).length
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-4">
      <div className="space-y-6">
        {/* Header bar with search and back button */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleBack}
            className="w-10 h-10 shrink-0"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight hidden md:block mb-2">Search Assets</h1>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search for assets..."
                className="pl-10 h-11 w-full"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </form>
          </div>
          
          <Button
            variant={isFiltered ? "secondary" : "outline"}
            size="sm"
            onClick={toggleFilteredView}
            className="shrink-0 md:hidden flex gap-2 items-center"
          >
            <Filter className="h-4 w-4" />
            <span>{isFiltered ? "Filtering On" : "Filter"}</span>
          </Button>
          
          <div className="hidden md:flex gap-2 flex-wrap justify-end">
            {(['KPI', 'DataViz', 'Layout', 'Storyboard', 'Favorites'] as AssetType[]).map(type => (
              <Button
                key={type}
                variant={activeFilters.includes(type) ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleFilter(type)}
                className="gap-1"
                disabled={typeCounts[type] === 0}
              >
                {type}
                <Badge 
                  variant="secondary" 
                  className="ml-1 bg-muted text-xs"
                >
                  {typeCounts[type]}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
        
        {/* Recent searches */}
        {recentSearches.length > 0 && !searchQuery && (
          <div className="space-y-2 bg-muted/5 p-4 rounded-md border border-border/40">
            <h3 className="text-sm font-medium">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleUseRecentSearch(term)}
                  className="text-sm"
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Filter pills for mobile */}
        {isFiltered && (
          <div className="md:hidden bg-muted/5 p-4 rounded-md border border-border/40">
            <h3 className="text-sm font-medium mb-2">Filters</h3>
            <div className="flex overflow-x-auto gap-2 pb-2">
              {(['KPI', 'DataViz', 'Layout', 'Storyboard', 'Favorites'] as AssetType[]).map(type => (
                <Button
                  key={type}
                  variant={activeFilters.includes(type) ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(type)}
                  className="gap-1 whitespace-nowrap"
                  disabled={typeCounts[type] === 0}
                >
                  {type}
                  <Badge 
                    variant="secondary" 
                    className="ml-1 bg-muted text-xs"
                  >
                    {typeCounts[type]}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Search results */}
        {displayAssets.length > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-muted/5 px-4 py-2 rounded-md border border-border/40">
              <p className="text-sm text-muted-foreground">
                {displayAssets.length} {displayAssets.length === 1 ? 'result' : 'results'} found
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {displayAssets.map((asset) => (
                <Card 
                  key={asset.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{asset.title}</h3>
                        <Badge 
                          className={`text-xs ${getTypeBadgeColor(getAssetType(asset.id))}`}
                        >
                          {getAssetType(asset.id)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {asset.description.length > 160 
                          ? `${asset.description.slice(0, 160)}...` 
                          : asset.description
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created: {formatDate(asset.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {asset.isFavorite && (
                        <Badge variant="secondary" className="text-xs">
                          Favorite
                        </Badge>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleAssetClick(asset)}
                        className="text-xs whitespace-nowrap"
                      >
                        View Details
                      </Button>
                      {!asset.hasAccess && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAssetClick(asset)}
                          className="text-xs whitespace-nowrap text-amber-600 border-amber-300"
                        >
                          <Info className="mr-1 h-3 w-3" />
                          <span>Request Access</span>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          renderEmptyState()
        )}
        
        {/* Asset details modal */}
        <AssetDetailsModal 
          asset={detailsAsset}
          isOpen={showDetailsModal}
          onClose={handleCloseDetailsModal}
        />
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  )
} 