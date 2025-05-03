/**
 * Main export file for the lib directory
 * This file re-exports everything from the subdirectories
 * to maintain backward compatibility with existing imports
 */

// Re-export types
export * from './types';

// Re-export utils
export * from './utils';

// Re-export data
export { mockAssets, mockKPIs, mockLayouts } from './data/mock-data';

// Re-export providers
export { DashboardProvider, useDashboard } from './providers/dashboard-provider';

// Re-export Zustand store hooks
export {
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
  useToggleSidebar,
  useInitialize
} from './store/dashboard-store';

// Re-export toast utilities
export { toast, useToast } from './utils/toast'; 