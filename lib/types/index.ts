// Base Asset type with common properties
export interface Asset {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  isFavorite: boolean;
  hasAccess: boolean;
}

// KPI specific properties
export interface KPI {
  id: string;
  businessQuestions: string[];
  metricIds: string[];
  calculation: string;
  visualsAvailable: string[];
  affiliateApplicability: string[];
}

// DataViz specific properties
export interface DataViz {
  chartType: string;
  applicableKpiFavorites: string[];
}

// Layout specific properties
export interface Layout {
  amountOfPages: number;
  kpisUsed: string[];
  previewImage: string;
  kpiIds: string[];
  chartPreviews: {
    chartType: string;
    title: string;
    insight: string;
    chartData: Array<{ name: string; value: number }>;
  }[];
}

// Storyboard specific properties
export interface Storyboard {
  coupledKpisFilters: string[];
  applicableAffiliates: string[];
  requiresAccess: boolean;
}
