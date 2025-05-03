import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Asset } from '../types'
import { mockAssets } from '../data/mock-data'
import { getAssetType, getFeaturedAssets } from '../data/assets'

// Define the dashboard state
interface DashboardState {
  // Asset data
  assets: Asset[]
  featuredAssets: Asset[]
  kpis: Asset[]
  layouts: Asset[]
  dataVizs: Asset[]
  storyboards: Asset[]
  
  // UI state
  activeAssetId: string | null
  isLoading: boolean
  activeTab: 'featured' | 'kpis' | 'layouts' | 'dataviz' | 'storyboards'
  sidebarOpen: boolean
  
  // Actions
  initialize: () => void
  toggleFavorite: (id: string) => void
  setActiveAssetId: (id: string | null) => void
  setActiveTab: (tab: DashboardState['activeTab']) => void
  toggleSidebar: () => void
}

// Create the store
export const useDashboardStore = create<DashboardState>()(
  immer((set, get) => ({
    // Initial state
    assets: [],
    featuredAssets: [],
    kpis: [],
    layouts: [],
    dataVizs: [],
    storyboards: [],
    activeAssetId: null,
    isLoading: true,
    activeTab: 'featured',
    sidebarOpen: true,
    
    // Actions
    initialize: () => {
      set(state => {
        state.isLoading = true
      })
      
      // Simulate API call
      setTimeout(() => {
        set(state => {
          // Load assets
          state.assets = mockAssets
          state.featuredAssets = getFeaturedAssets()
          
          // Calculate filtered assets - do this here once instead of in selectors
          state.kpis = mockAssets.filter(asset => getAssetType(asset.id) === "KPI")
          state.layouts = mockAssets.filter(asset => getAssetType(asset.id) === "Layout")
          state.dataVizs = mockAssets.filter(asset => getAssetType(asset.id) === "DataViz")
          state.storyboards = mockAssets.filter(asset => getAssetType(asset.id) === "Storyboard")
          
          state.isLoading = false
        })
      }, 800)
    },
    
    toggleFavorite: (id: string) => {
      set(state => {
        // Update in assets array
        const assetIndex = state.assets.findIndex(asset => asset.id === id)
        if (assetIndex !== -1) {
          state.assets[assetIndex].isFavorite = !state.assets[assetIndex].isFavorite
        }
        
        // Update featured assets
        const isFavorite = state.assets[assetIndex]?.isFavorite
        if (isFavorite) {
          // Add to featured if not already there
          if (!state.featuredAssets.some(asset => asset.id === id)) {
            state.featuredAssets.push(state.assets[assetIndex])
          }
        } else {
          // Remove from featured
          state.featuredAssets = state.featuredAssets.filter(asset => asset.id !== id)
        }
        
        // Update filtered lists
        const assetType = getAssetType(id)
        if (assetType === "KPI") {
          state.kpis = state.assets.filter(asset => getAssetType(asset.id) === "KPI")
        } else if (assetType === "Layout") {
          state.layouts = state.assets.filter(asset => getAssetType(asset.id) === "Layout")
        } else if (assetType === "DataViz") {
          state.dataVizs = state.assets.filter(asset => getAssetType(asset.id) === "DataViz")
        } else if (assetType === "Storyboard") {
          state.storyboards = state.assets.filter(asset => getAssetType(asset.id) === "Storyboard")
        }
      })
    },
    
    setActiveAssetId: (id: string | null) => {
      set(state => {
        state.activeAssetId = id
      })
    },
    
    setActiveTab: (tab) => {
      set(state => {
        state.activeTab = tab
      })
    },
    
    toggleSidebar: () => {
      set(state => {
        state.sidebarOpen = !state.sidebarOpen
      })
    }
  }))
)

// Simple selectors that don't create new functions on each render
export const useAssets = () => useDashboardStore(state => state.assets)
export const useFeaturedAssets = () => useDashboardStore(state => state.featuredAssets)
export const useKPIs = () => useDashboardStore(state => state.kpis)
export const useLayouts = () => useDashboardStore(state => state.layouts)
export const useDataVizs = () => useDashboardStore(state => state.dataVizs)
export const useStoryboards = () => useDashboardStore(state => state.storyboards)
export const useActiveAssetId = () => useDashboardStore(state => state.activeAssetId)
export const useIsLoading = () => useDashboardStore(state => state.isLoading)
export const useActiveTab = () => useDashboardStore(state => state.activeTab)
export const useSidebarOpen = () => useDashboardStore(state => state.sidebarOpen)

// Utility methods
export const useGetAssetById = () => {
  const assets = useAssets()
  return (id: string) => assets.find(asset => asset.id === id)
}

// Action hooks
export const useToggleFavorite = () => useDashboardStore(state => state.toggleFavorite)
export const useSetActiveAssetId = () => useDashboardStore(state => state.setActiveAssetId)
export const useSetActiveTab = () => useDashboardStore(state => state.setActiveTab)
export const useToggleSidebar = () => useDashboardStore(state => state.toggleSidebar)
export const useInitialize = () => useDashboardStore(state => state.initialize) 