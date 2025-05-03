"use client"

import React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { useRouter, usePathname } from "next/navigation"

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Navigation tabs
  const handleTabClick = (tab: string) => {
    router.push(`/${tab}`);
  };
  
  // Determine active tab based on pathname
  const getActiveTab = () => {
    if (pathname.includes('/featured')) return 'featured';
    if (pathname.includes('/kpis')) return 'kpis';
    if (pathname.includes('/layouts')) return 'layouts';
    if (pathname.includes('/storyboards')) return 'storyboards';
    return 'featured'; // Default
  };
  
  const activeTab = getActiveTab();

  return (
    <div className="flex h-screen">
      {/* Use the DashboardSidebar component */}
      <DashboardSidebar />
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-4 md:p-8">
          {/* Tabs Navigation */}
          <div className="w-full border-b border-gray-200 mb-4">
            <div className="flex space-x-8">
              <button 
                onClick={() => handleTabClick('featured')}
                className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'featured' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Featured
              </button>
              <button 
                onClick={() => handleTabClick('kpis')}
                className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'kpis' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                KPIs
              </button>
              <button 
                onClick={() => handleTabClick('layouts')}
                className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'layouts' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Layouts
              </button>
              <button 
                onClick={() => handleTabClick('storyboards')}
                className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'storyboards' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Storyboards
              </button>
            </div>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  )
} 