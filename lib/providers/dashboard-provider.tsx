"use client"

import { createContext, useContext, ReactNode, useEffect } from "react"
import { 
  useInitialize,
  useAssets,
  useFeaturedAssets,
  useKPIs,
  useLayouts,
  useDataVizs,
  useStoryboards,
  useToggleFavorite,
  useSetActiveAssetId,
  useActiveAssetId,
  useIsLoading,
  useGetAssetById,
  useActiveTab,
  useSetActiveTab,
  useSidebarOpen,
  useToggleSidebar
} from "../store/dashboard-store"
import { Asset } from "../types"

// Define the shape of our context
interface DashboardContextType {
  // Asset data
  assets: Asset[]
  featuredAssets: Asset[]
  kpis: Asset[]
  layouts: Asset[]
  dataVizs: Asset[]
  storyboards: Asset[]
  
  // Asset operations
  toggleFavorite: (id: string) => void
  getAssetById: (id: string) => Asset | undefined
  
  // UI state
  activeAssetId: string | null
  setActiveAssetId: (id: string | null) => void
  activeTab: 'featured' | 'kpis' | 'layouts' | 'dataviz' | 'storyboards'
  setActiveTab: (tab: 'featured' | 'kpis' | 'layouts' | 'dataviz' | 'storyboards') => void
  sidebarOpen: boolean
  toggleSidebar: () => void
  
  // Loading state
  isLoading: boolean
}

// Create the context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

// Provider component
export function DashboardProvider({ children }: { children: ReactNode }) {
  // Get state and actions from Zustand store
  const assets = useAssets()
  const featuredAssets = useFeaturedAssets()
  const kpis = useKPIs()
  const layouts = useLayouts()
  const dataVizs = useDataVizs()
  const storyboards = useStoryboards()
  const toggleFavorite = useToggleFavorite()
  const getAssetById = useGetAssetById()
  const activeAssetId = useActiveAssetId()
  const setActiveAssetId = useSetActiveAssetId()
  const isLoading = useIsLoading()
  const activeTab = useActiveTab()
  const setActiveTab = useSetActiveTab()
  const sidebarOpen = useSidebarOpen()
  const toggleSidebar = useToggleSidebar()
  const initialize = useInitialize()
  
  // Initialize the store
  useEffect(() => {
    initialize()
  }, [initialize])
  
  // Create context value
  const value: DashboardContextType = {
    assets,
    featuredAssets,
    kpis,
    layouts,
    dataVizs,
    storyboards,
    toggleFavorite,
    getAssetById,
    activeAssetId,
    setActiveAssetId,
    activeTab,
    setActiveTab,
    sidebarOpen,
    toggleSidebar,
    isLoading
  }
  
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

// Custom hook to use the context
export function useDashboard() {
  const context = useContext(DashboardContext)
  
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  
  return context
} 