import { Asset } from "../types";
import { mockAssets } from "./mock-data";

// Helper type for asset types
export type AssetType = "KPI" | "DataViz" | "Layout" | "Storyboard";

// Helper function to determine asset type from ID
export function getAssetType(assetId: string): AssetType | undefined {
  const id = assetId.toLowerCase();
  if (id.includes('kpi')) {
    return "KPI";
  } else if (id.includes('dataviz')) {
    return "DataViz";
  } else if (id.includes('layout')) {
    return "Layout";
  } else if (id.includes('storyboard')) {
    return "Storyboard";
  }
  return undefined;
}

// Get featured assets (all favorited assets)
export function getFeaturedAssets(): Asset[] {
  return mockAssets.filter(asset => asset.isFavorite);
}

// Get assets by type
export function getAssetsByType(type: AssetType): Asset[] {
  return mockAssets.filter(asset => getAssetType(asset.id) === type);
} 