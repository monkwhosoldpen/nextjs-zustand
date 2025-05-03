"use client"

// @ts-ignore - Using ts-ignore to temporarily resolve the missing module error
import { Home, BarChart, LayoutGrid, Presentation, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDashboard } from "@/lib"
import { Button } from "@/components/mycomponents/Button"
import { useEffect, useState } from "react"

// Helper function to combine class names
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { activeTab, setActiveTab, sidebarOpen, toggleSidebar } = useDashboard()
  const [isMobile, setIsMobile] = useState(false)

  // Listen for window resize to determine mobile view
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Set initial value
    checkIsMobile()
    
    // Add event listener
    window.addEventListener('resize', checkIsMobile)
    
    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Force mini sidebar on mobile
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      toggleSidebar()
    }
  }, [isMobile, sidebarOpen, toggleSidebar])

  const navigationItems = [
    {
      title: "Featured",
      url: "/featured",
      icon: Home,
      description: "Featured assets",
      tabValue: "featured"
    },
    {
      title: "KPIs",
      url: "/kpis",
      icon: BarChart,
      description: "Key performance indicators",
      tabValue: "kpis"
    },
    {
      title: "Layouts",
      url: "/layouts",
      icon: LayoutGrid,
      description: "Dashboard layouts",
      tabValue: "layouts"
    },
    {
      title: "Storyboards",
      url: "/storyboards",
      icon: Presentation,
      description: "Presentation storyboards",
      tabValue: "storyboards"
    },
  ]

  // Handle navigation - Set active tab and don't rely only on URL
  const handleNavigation = (tabValue: string) => {
    setActiveTab(tabValue as any);
  };

  return (
    <div className={cn(
      "h-screen border-r bg-muted/10 shrink-0 transition-all duration-300 relative",
      sidebarOpen && !isMobile ? "w-64" : "w-16"
    )}>
      <div className="flex items-center gap-2 px-4 py-6 border-b">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-semibold">A</span>
        </div>
        {sidebarOpen && !isMobile && <div className="font-semibold text-lg">Analytics Hub</div>}
      </div>
      
      <div className="py-4">
        <div className="px-3 py-2">
          {sidebarOpen && !isMobile && <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase">Navigation</h3>}
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = activeTab === item.tabValue
              const Icon = item.icon
              
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={cn(
                    "flex items-center gap-3 rounded-md text-sm transition-colors",
                    "px-2 py-2 md:px-3 md:py-2",
                    sidebarOpen && !isMobile ? "justify-start" : "justify-center",
                    isActive 
                      ? "bg-muted font-medium text-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  title={item.title}
                  onClick={() => handleNavigation(item.tabValue)}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && !isMobile && <span>{item.title}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Toggle sidebar button - hide on mobile */}
      {!isMobile && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center shadow-md bg-background border"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      )}
      
      <div className={cn("absolute bottom-0 border-t", sidebarOpen && !isMobile ? "w-64" : "w-16")}>
        <div className={cn("p-3 text-xs text-muted-foreground", sidebarOpen && !isMobile ? "p-4" : "text-center")}>
          {sidebarOpen && !isMobile ? <p>Analytics Hub v1.0</p> : <p>v1.0</p>}
        </div>
      </div>
    </div>
  )
}
