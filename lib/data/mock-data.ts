import { Asset, KPI, Layout, Storyboard, DataViz } from "./types"

// Mock data for Assets
export const mockAssets: Asset[] = [
  // KPIs
  {
    id: "kpi-1",
    title: "Revenue Breakdown",
    description: "KPI analysis of revenue streams",
    createdAt: "2023-01-15T00:00:00Z",
    isFavorite: true,
    hasAccess: false
  },
  {
    id: "kpi-2",
    title: "Customer Retention",
    description: "Analysis of customer retention rates",
    createdAt: "2023-02-10T00:00:00Z",
    isFavorite: false,
    hasAccess: true
  },
  {
    id: "kpi-3",
    title: "Monthly Sales Growth",
    description: "Month-over-month sales performance tracking",
    createdAt: "2023-03-12T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "kpi-4",
    title: "Conversion Rate",
    description: "Tracking visitor to customer conversion metrics",
    createdAt: "2023-03-15T00:00:00Z",
    isFavorite: false,
    hasAccess: false
  },
  {
    id: "kpi-5",
    title: "Customer Acquisition Cost",
    description: "Analysis of costs to acquire new customers",
    createdAt: "2023-04-05T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "kpi-6",
    title: "Customer Lifetime Value",
    description: "Projected revenue from customer relationships",
    createdAt: "2023-05-10T00:00:00Z",
    isFavorite: true,
    hasAccess: false
  },
  {
    id: "kpi-7",
    title: "Net Promoter Score",
    description: "Customer satisfaction and loyalty metric",
    createdAt: "2023-06-15T00:00:00Z",
    isFavorite: false,
    hasAccess: true
  },
  
  // DataViz
  {
    id: "dataviz-1",
    title: "Market Share",
    description: "Visual representation of market segments",
    createdAt: "2023-03-05T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "dataviz-2",
    title: "Sales Funnel",
    description: "Visualization of the sales process",
    createdAt: "2023-03-20T00:00:00Z",
    isFavorite: false,
    hasAccess: false
  },
  {
    id: "dataviz-3",
    title: "Regional Performance",
    description: "Geographic breakdown of business metrics",
    createdAt: "2023-04-10T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "dataviz-4",
    title: "Customer Segments",
    description: "Visualization of customer demographics",
    createdAt: "2023-05-05T00:00:00Z",
    isFavorite: false,
    hasAccess: false
  },
  {
    id: "dataviz-5",
    title: "Product Comparison",
    description: "Side-by-side metrics of product performance",
    createdAt: "2023-05-22T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "dataviz-6",
    title: "Revenue by Quarter",
    description: "Quarterly revenue performance tracking",
    createdAt: "2023-06-15T00:00:00Z",
    isFavorite: true,
    hasAccess: false
  },
  {
    id: "dataviz-7",
    title: "Monthly Active Users",
    description: "User engagement metrics by month",
    createdAt: "2023-07-01T00:00:00Z",
    isFavorite: false,
    hasAccess: true
  },
  
  // Layouts
  {
    id: "layout-1",
    title: "Executive Dashboard",
    description: "Complete layout for executive review",
    createdAt: "2023-04-12T00:00:00Z",
    isFavorite: false,
    hasAccess: true
  },
  {
    id: "layout-2",
    title: "Marketing Dashboard",
    description: "Layout for marketing performance",
    createdAt: "2023-05-08T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "layout-3",
    title: "Sales Team Overview",
    description: "Dashboard layout for sales managers",
    createdAt: "2023-05-20T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "layout-4",
    title: "Product Performance",
    description: "Product-focused metrics dashboard",
    createdAt: "2023-06-10T00:00:00Z",
    isFavorite: false,
    hasAccess: true
  },
  {
    id: "layout-5",
    title: "Customer Insights",
    description: "Customer-focused analytics layout",
    createdAt: "2023-06-25T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "layout-6",
    title: "Financial Performance",
    description: "Finance and accounting dashboard layout",
    createdAt: "2023-07-15T00:00:00Z",
    isFavorite: false,
    hasAccess: true
  },
  {
    id: "layout-7",
    title: "HR Analytics Dashboard",
    description: "Human resources metrics and analytics overview",
    createdAt: "2023-08-05T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "layout-8",
    title: "Supply Chain Visibility",
    description: "End-to-end supply chain performance dashboard",
    createdAt: "2023-08-18T00:00:00Z",
    isFavorite: false,
    hasAccess: true
  },
  {
    id: "layout-9",
    title: "Social Media Analytics",
    description: "Comprehensive social media performance tracker",
    createdAt: "2023-09-01T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "layout-10",
    title: "Project Management",
    description: "Project KPIs and milestone tracking dashboard",
    createdAt: "2023-09-15T00:00:00Z",
    isFavorite: false,
    hasAccess: true
  },
  
  // Storyboards
  {
    id: "storyboard-1",
    title: "Q2 Performance Review",
    description: "Comprehensive quarterly performance storyboard for executive team",
    createdAt: "2023-06-15T00:00:00Z",
    isFavorite: false,
    hasAccess: true
  },
  {
    id: "storyboard-2",
    title: "Annual Business Review",
    description: "Year-end performance review for board presentation",
    createdAt: "2023-07-01T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "storyboard-3",
    title: "Market Expansion Strategy",
    description: "Detailed plan for entering new markets with projections",
    createdAt: "2023-07-15T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "storyboard-4",
    title: "Product Development Roadmap",
    description: "Future product development timeline and strategy",
    createdAt: "2023-08-05T00:00:00Z",
    isFavorite: false,
    hasAccess: true
  },
  {
    id: "storyboard-5",
    title: "Customer Journey Analysis",
    description: "End-to-end customer experience storyboard with touchpoint metrics",
    createdAt: "2023-08-20T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "storyboard-6",
    title: "Marketing Campaign Effectiveness",
    description: "Analysis of multi-channel marketing campaign results",
    createdAt: "2023-09-10T00:00:00Z",
    isFavorite: true,
    hasAccess: true
  },
  {
    id: "storyboard-7",
    title: "Supply Chain Optimization",
    description: "Analysis and strategy for improving supply chain efficiency",
    createdAt: "2023-10-05T00:00:00Z",
    isFavorite: false,
    hasAccess: true
  },
]

// Extended mock data for specific asset types
export const mockKPIs: KPI[] = [
  {
    id: "kpi-1",
    businessQuestions: [
      "How are our revenue streams performing compared to last quarter?",
      "Which product line is generating the most revenue?",
      "Are there seasonal patterns in our revenue generation?",
      "What is the percentage split between recurring and non-recurring revenue?",
      "How do our different sales channels contribute to overall revenue?"
    ],
    metricIds: ["REV-001", "REV-002", "REV-003", "REV-004", "REV-005"],
    calculation: "SUM(Sales) - SUM(Returns) - SUM(Discounts)",
    visualsAvailable: ["Bar Chart", "Line Chart", "Pie Chart", "Area Chart", "Stacked Bar"],
    affiliateApplicability: ["North America", "Europe", "Asia Pacific"]
  },
  {
    id: "kpi-2",
    businessQuestions: [
      "What is our monthly customer churn rate?",
      "How does retention vary by customer segment?",
      "What are the key drivers of customer churn?",
      "Which regions have the highest customer loyalty?",
      "How effective are our retention campaigns?"
    ],
    metricIds: ["RET-001", "RET-002", "RET-003"],
    calculation: "(Customers at End of Period / Customers at Start of Period) * 100",
    visualsAvailable: ["Line Chart", "Heat Map", "Cohort Analysis"],
    affiliateApplicability: ["Global", "North America", "Europe"]
  },
  {
    id: "kpi-3",
    businessQuestions: [
      "What is our month-over-month sales growth rate?",
      "How does growth vary by product category?",
      "Are there seasonal patterns in our growth rate?",
      "Which sales territories are showing the strongest growth?",
      "How do sales promotions impact our growth rate?"
    ],
    metricIds: ["SALES-001", "SALES-002", "SALES-003", "SALES-004"],
    calculation: "((Current Month Sales - Previous Month Sales) / Previous Month Sales) * 100",
    visualsAvailable: ["Line Chart", "Bar Chart", "Heat Map"],
    affiliateApplicability: ["North America", "Europe", "Asia Pacific", "Latin America"]
  },
  {
    id: "kpi-4",
    businessQuestions: [
      "What percentage of visitors convert to customers?",
      "How do conversion rates vary by traffic source?",
      "Which landing pages have the highest conversion rates?",
      "How do conversion rates vary by device type?",
      "What impact do promotions have on conversion rates?"
    ],
    metricIds: ["CONV-001", "CONV-002", "CONV-003"],
    calculation: "(Number of Conversions / Number of Visitors) * 100",
    visualsAvailable: ["Funnel Chart", "Line Chart", "Heat Map"],
    affiliateApplicability: ["Global", "North America", "Europe"]
  },
  {
    id: "kpi-5",
    businessQuestions: [
      "What is our average cost to acquire a new customer?",
      "How does CAC vary by marketing channel?",
      "Is our CAC increasing or decreasing over time?",
      "How does our CAC compare to customer lifetime value?",
      "Which customer segments have the lowest acquisition costs?"
    ],
    metricIds: ["CAC-001", "CAC-002", "CAC-003", "CAC-004"],
    calculation: "Total Marketing & Sales Costs / Number of New Customers",
    visualsAvailable: ["Bar Chart", "Line Chart", "Scatter Plot"],
    affiliateApplicability: ["North America", "Europe", "Asia Pacific"]
  },
  {
    id: "kpi-5",
    businessQuestions: [
      "What is the average lifetime value of our customers?",
      "How does LTV vary by customer segment?",
      "Which products contribute most to customer LTV?",
      "What is our LTV to CAC ratio across segments?",
      "How do retention initiatives impact LTV?",
      "Which customer acquisition channels yield the highest LTV?"
    ],
    metricIds: ["LTV-001", "LTV-002", "LTV-003", "CAC-001", "RET-001"],
    calculation: "AVG(Customer Value) * AVG(Customer Lifespan)",
    visualsAvailable: ["Bar Chart", "Scatter Plot", "Segment Analysis", "Trend Analysis", "Predictive Model"],
    affiliateApplicability: ["North America", "Europe", "Asia Pacific"]
  },
  {
    id: "kpi-7",
    businessQuestions: [
      "How likely are customers to recommend our products?",
      "How does our NPS compare to industry benchmarks?",
      "Which customer segments show the highest NPS?",
      "How does NPS correlate with customer retention?",
      "What factors most influence our NPS?",
      "How has our NPS changed over time?"
    ],
    metricIds: ["NPS-001", "NPS-002", "NPS-003", "CUS-001"],
    calculation: "((COUNT(Promoters) - COUNT(Detractors)) / COUNT(Total Respondents)) * 100",
    visualsAvailable: ["Gauge Chart", "Trend Line", "Comparative Analysis", "Segment Breakdown"],
    affiliateApplicability: ["All Regions"]
  },
]

// Mock layouts with detailed information
export const mockLayouts = [
  {
    id: "layout-1",
    title: "Executive Dashboard",
    description: "Complete layout for executive review",
    createdAt: "2023-04-12T00:00:00Z",
    isFavorite: false,
    hasAccess: true,
    amountOfPages: 3,
    kpisUsed: ["Revenue Breakdown", "Customer Retention", "Monthly Sales Growth"],
    previewImage: "https://example.com/layout1.jpg",
    chartPreviews: [
      {
        chartType: "bar",
        title: "Revenue by Region",
        insight: "North America leads in revenue generation, followed by Europe and Asia Pacific.",
        chartData: [
          { name: "North America", value: 45 },
          { name: "Europe", value: 30 },
          { name: "Asia Pacific", value: 15 },
          { name: "Latin America", value: 10 },
        ],
        size: "medium",
        position: 0
      },
      {
        chartType: "pie",
        title: "Customer Segments",
        insight: "Enterprise customers contribute to more than half of our revenue.",
        chartData: [
          { name: "Enterprise", value: 55 },
          { name: "Mid-Market", value: 30 },
          { name: "Small Business", value: 15 },
        ],
        size: "large",
        position: 1
      }
    ]
  },
  {
    id: "layout-2",
    title: "Marketing Dashboard",
    description: "Layout for marketing performance",
    createdAt: "2023-05-08T00:00:00Z",
    isFavorite: true,
    hasAccess: true,
    amountOfPages: 2,
    kpisUsed: ["Conversion Rate", "Customer Acquisition Cost", "Customer Lifetime Value"],
    previewImage: "https://example.com/layout2.jpg",
    chartPreviews: [
      {
        chartType: "bar",
        title: "Campaign Performance",
        insight: "Email campaigns show the highest ROI among all channels.",
        chartData: [
          { name: "Email", value: 68 },
          { name: "Social", value: 42 },
          { name: "PPC", value: 35 },
          { name: "Direct", value: 20 },
        ],
        size: "medium",
        position: 0
      },
      {
        chartType: "pie",
        title: "Traffic Sources",
        insight: "Organic search drives most of our qualified traffic.",
        chartData: [
          { name: "Organic", value: 45 },
          { name: "Paid", value: 25 },
          { name: "Social", value: 20 },
          { name: "Referral", value: 10 },
        ],
        size: "medium",
        position: 1
      }
    ]
  },
  {
    id: "layout-3",
    title: "Sales Team Overview",
    description: "Dashboard layout for sales managers",
    createdAt: "2023-05-20T00:00:00Z",
    isFavorite: true,
    hasAccess: true,
    amountOfPages: 4,
    kpisUsed: ["Revenue Breakdown", "Monthly Sales Growth", "Conversion Rate"],
    previewImage: "https://example.com/layout3.jpg",
    chartPreviews: [
      {
        chartType: "bar",
        title: "Sales by Representative",
        insight: "Top performers consistently exceed targets by 25% or more.",
        chartData: [
          { name: "Alex", value: 78 },
          { name: "Nadia", value: 65 },
          { name: "Carlos", value: 58 },
          { name: "Lisa", value: 42 },
        ],
        size: "large",
        position: 0
      },
      {
        chartType: "pie",
        title: "Deal Stages",
        insight: "Most deals are currently in the negotiation stage.",
        chartData: [
          { name: "Qualified", value: 30 },
          { name: "Proposal", value: 15 },
          { name: "Negotiation", value: 40 },
          { name: "Closed", value: 15 },
        ],
        size: "small",
        position: 1
      }
    ]
  }
];