"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/mycomponents/Badge"
import { Button } from "@/components/mycomponents/Button"
import { ChevronRight, BarChart, PieChart, LineChart, ChevronDown } from "lucide-react"
import { Asset, KPI } from "@/lib/types"
import { AssetDetailsModal } from "@/components/modals/asset-details-modal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/mycomponents/Table"
import React from "react"
import { useDashboard, useKPIs as useKPIAssets, useSetActiveTab } from "@/lib"
import { mockKPIs } from "@/lib/data/mock-data"

export default function KPIsPage() {
  const setActiveTab = useSetActiveTab()
  const { assets } = useDashboard()
  const kpiAssets = useKPIAssets()
  
  // Use the extended KPI data for KPI-specific properties
  const [kpis, setKpis] = useState<KPI[]>([])
  
  // Load KPI data on component mount
  useEffect(() => {
    // In a real app, you would fetch this data
    setKpis(mockKPIs)
  }, [])
  
  // Update active tab when the page loads
  useEffect(() => {
    setActiveTab('kpis')
  }, [setActiveTab])

  // State for asset details modal
  const [detailsAsset, setDetailsAsset] = useState<Asset | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // State for expanded KPI rows
  const [expandedKpis, setExpandedKpis] = useState<number[]>([]);

  // Get KPI-related assets
  const getKpiAssets = (kpiIndex: number): Asset[] => {
    // Get the metric IDs for this KPI
    const metricIds = kpis[kpiIndex]?.metricIds || [];
    
    // For demo purposes, find assets that might relate to this KPI
    // In a real app, you'd have a more sophisticated relationship model
    return assets.filter(asset => 
      asset.id.includes("kpi") || 
      asset.title.toLowerCase().includes("performance") ||
      asset.description.toLowerCase().includes("metrics")
    ).slice(0, 4);
  };
  
  // Find or create a KPI asset for the modal
  const getKpiAssetForModal = (kpiIndex: number): Asset => {
    // First try to find an existing KPI asset
    const existingKpiAsset = assets.find(a => a.id === `kpi-${kpiIndex + 1}`);
    
    if (existingKpiAsset) {
      // Ensure hasAccess is always true for KPIs
      return {
        ...existingKpiAsset,
        hasAccess: true
      };
    }
    
    // If not found, create a temporary KPI asset
    const kpi = kpis[kpiIndex];
    return {
      id: `kpi-${kpiIndex + 1}`,
      title: `KPI #${kpiIndex + 1}`,
      description: `Analysis of key performance metrics for business decision making. ${kpi?.businessQuestions?.[0] || ''}`,
      createdAt: new Date().toISOString(),
      isFavorite: false,
      hasAccess: true
    };
  };

  // Find or create a DataViz asset with all charts for the KPI
  const getDataVizForKpi = (kpiIndex: number): Asset => {
    const kpi = kpis[kpiIndex];
    
    // Create a title that reflects all available visualizations
    const title = `All Visualizations for ${kpi.id}`;
    
    // Create a description that shows this asset has multiple charts
    const description = `Interactive dashboard with all available visualizations for ${kpi.id}. Includes ${kpi.visualsAvailable.join(', ')} charts for exploring ${kpi.calculation} across different dimensions.`;
    
    // Create a full DataViz asset with multiple visualizations
    return {
      id: `dataviz-all-${kpiIndex + 1}`,
      title: title,
      description: description,
      createdAt: new Date().toISOString(),
      isFavorite: true,
      hasAccess: true
    };
  };

  // Toggle row expansion
  const toggleRowExpansion = (index: number) => {
    if (expandedKpis.includes(index)) {
      setExpandedKpis(expandedKpis.filter(i => i !== index));
    } else {
      setExpandedKpis([...expandedKpis, index]);
    }
  };

  // Handle asset click - for showing asset details
  const handleAssetClick = (asset: Asset) => {
    // Ensure the asset is always accessible in KPIs page
    const accessibleAsset = {
      ...asset,
      hasAccess: true
    };
    setDetailsAsset(accessibleAsset);
    setShowDetailsModal(true);
  };
  
  // Handle view KPI details button click
  const handleViewKpiDetails = (kpiIndex: number) => {
    const kpiAsset = getKpiAssetForModal(kpiIndex);
    handleAssetClick(kpiAsset);
  };
  
  // Handle view DataViz button click - show all charts
  const handleViewDataViz = (kpiIndex: number) => {
    const dataVizAsset = getDataVizForKpi(kpiIndex);
    handleAssetClick(dataVizAsset);
  };
  
  // Handle close of details modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setDetailsAsset(null);
  };

  // Truncate text helper
  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Key Performance Indicators</h1>
          <p className="text-muted-foreground">Browse available KPIs for your dashboards</p>
        </div>
      </div>

      {/* KPIs table */}
      <div className="border rounded-md overflow-hidden">
        {/* Desktop and tablet view (md and above) */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[250px]">KPI</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[180px]">Metrics</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpis.map((kpi, index) => (
                <React.Fragment key={`kpi-row-${index}`}>
                  <TableRow 
                    className={expandedKpis.includes(index) ? "bg-muted/30" : ""}
                  >
                    <TableCell className="p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleRowExpansion(index)}
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedKpis.includes(index) ? 'rotate-180' : ''}`} />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      KPI #{index + 1}
                      <div className="text-xs text-muted-foreground mt-1">
                        {kpi.calculation}
                      </div>
                    </TableCell>
                    <TableCell>
                      {truncateText(assets.find(a => a.id === `kpi-${index + 1}`)?.description || 
                        "Analysis of key performance metrics for business decision making.", 70)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {kpi.metricIds.slice(0, 2).map((metricId: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {metricId}
                          </Badge>
                        ))}
                        {kpi.metricIds.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{kpi.metricIds.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleViewKpiDetails(index)}
                        >
                          <span className="mr-1">View Details</span>
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleViewDataViz(index)}
                        >
                          <span className="mr-1">All Charts</span>
                          <BarChart className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded content row */}
                  {expandedKpis.includes(index) && (
                    <TableRow className="bg-muted/30 border-t-0">
                      <TableCell colSpan={5} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Business Questions */}
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium text-primary">Business Questions</h3>
                            <ul className="text-sm space-y-1 pl-5 list-disc">
                              {kpi.businessQuestions.slice(0, 3).map((q: string, i: number) => (
                                <li key={i}>{q}</li>
                              ))}
                              {kpi.businessQuestions.length > 3 && (
                                <li className="text-muted-foreground">
                                  +{kpi.businessQuestions.length - 3} more questions
                                </li>
                              )}
                            </ul>
                          </div>
                          
                          {/* Available Visualizations */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-primary">Available Visualizations</h3>
                              <Button 
                                variant="secondary" 
                                size="sm" 
                                className="text-xs h-7"
                                onClick={() => handleViewDataViz(index)}
                              >
                                View All Charts
                              </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                              {kpi.visualsAvailable.slice(0, 3).map((chartType, i) => (
                                <div key={i} className="h-8 w-auto px-2 bg-muted flex items-center justify-center rounded text-xs font-medium">
                                  {chartType === 'Bar Chart' && <BarChart className="h-3 w-3 mr-1" />}
                                  {chartType === 'Line Chart' && <LineChart className="h-3 w-3 mr-1" />}
                                  {chartType === 'Pie Chart' && <PieChart className="h-3 w-3 mr-1" />}
                                  {chartType}
                                </div>
                              ))}
                              {kpi.visualsAvailable.length > 3 && (
                                <div className="h-8 w-auto px-2 bg-muted flex items-center justify-center rounded text-xs font-medium">
                                  +{kpi.visualsAvailable.length - 3} more
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Mobile view (only visible on small screens) */}
        <div className="md:hidden">
          <div className="py-4 px-4 border-b">
            <h2 className="font-semibold">KPIs ({kpis.length})</h2>
          </div>
          
          {kpis.map((kpi, index) => (
            <div key={index} className="py-4 px-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">KPI #{index + 1}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {truncateText(kpi.calculation, 60)}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleViewKpiDetails(index)}
                >
                  <span className="mr-1">Details</span>
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="mt-2">
                <div className="flex flex-wrap gap-1 mb-2">
                  {kpi.metricIds.slice(0, 3).map((metricId: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {metricId}
                    </Badge>
                  ))}
                  {kpi.metricIds.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{kpi.metricIds.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs w-full mt-1"
                  onClick={() => handleViewDataViz(index)}
                >
                  <span className="mr-1">View All Charts</span>
                  <BarChart className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
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