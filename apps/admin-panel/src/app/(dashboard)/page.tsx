import React from "react";
import { 
  Card, 
  StatCard, 
  Button,
  PremiumStatCard,
  ProgressCard,
  SummaryCard,
  AuditTimeline
} from "@commercex/ui";
import { 
  ShoppingCartIcon, 
  PackageIcon, 
  UsersIcon, 
  DollarSignIcon,
  PlusIcon,
  TagIcon,
  PercentIcon,
  RefreshCcwIcon,
  MousePointerClickIcon,
  TrendingUpIcon,
  SettingsIcon
} from "lucide-react";
import { StoreService } from "@commercex/services";
import { OrdersTable } from "../../components/orders-table";
import { DashboardCharts } from "../../components/dashboard-charts";

export default async function TenantAdminDashboard() {
  const metrics = await StoreService.getMetrics();
  const recentOrders = await StoreService.getRecentOrders();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num: number) => num.toLocaleString();

  // Mock Recent Activity for Phase 1
  const mockActivity = [
    { id: 1, action: "Product Updated", actorEmail: "admin@store.com", resourceType: "Product", createdAt: new Date(Date.now() - 1000 * 60 * 30), details: { name: "Wireless Headphones" } },
    { id: 2, action: "Order Refunded", actorEmail: "support@store.com", resourceType: "Order", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), details: { orderId: "ORD-9382" } },
    { id: 3, action: "Settings Changed", actorEmail: "admin@store.com", resourceType: "Settings", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), details: { section: "General" } }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Store Overview</h1>
          <p className="text-muted-foreground mt-1">
            Real-time insights and comprehensive store metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Customize Dashboard
          </Button>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      {/* TIER 1: CORE METRICS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PremiumStatCard
          title="Total Revenue"
          value={formatCurrency(metrics.revenue)}
          description="+20.1% from last month"
          icon={<DollarSignIcon className="h-5 w-5" />}
          trend={{ value: "up", isPositive: true }}
        />
        <PremiumStatCard
          title="Orders"
          value={formatNumber(metrics.orders)}
          description="+12% from last month"
          icon={<ShoppingCartIcon className="h-5 w-5" />}
          trend={{ value: "up", isPositive: true }}
        />
        <PremiumStatCard
          title="Total Customers"
          value={formatNumber(metrics.customers)}
          description="+19% from last month"
          icon={<UsersIcon className="h-5 w-5" />}
          trend={{ value: "up", isPositive: true }}
        />
        <PremiumStatCard
          title="Conversion Rate"
          value={`${metrics.conversion}%`}
          description="+0.4% from last month"
          icon={<MousePointerClickIcon className="h-5 w-5" />}
          trend={{ value: "up", isPositive: true }}
        />
      </div>

      {/* TIER 2: COMMAND CENTER */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* LEFT/CENTER COLUMN (Primary Data & Charts) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          {/* Main Chart */}
          <div className="bg-card border rounded-xl p-1">
             <DashboardCharts />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Orders (Table) */}
            <Card className="p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg tracking-tight">Recent Orders</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:text-primary">View all orders</Button>
              </div>
              <div className="flex-1 -mx-6 -mb-6 mt-2 overflow-hidden">
                <div className="px-6 pb-6">
                  <OrdersTable orders={recentOrders} />
                </div>
              </div>
            </Card>

            {/* Additional Secondary Metric Cards */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="Total Visitors"
                value={formatNumber(metrics.visitors)}
                description="Unique sessions"
              />
              <StatCard
                title="Active Products"
                value={formatNumber(metrics.products)}
                description="Currently live"
              />
              <StatCard
                title="Inventory Value"
                value={formatCurrency(metrics.inventoryValue)}
                description="Based on retail price"
              />
              <StatCard
                title="Marketing ROI"
                value={`${metrics.marketingROI}%`}
                description="Avg across campaigns"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Live & Actionable) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Live Visitors */}
          <Card className="p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 flex items-center justify-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Live Visitors</p>
            <h4 className="text-4xl font-bold tracking-tight">{metrics.liveVisitors}</h4>
            <p className="text-xs text-muted-foreground mt-2">Active sessions on storefront right now</p>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors bg-card">
              <PackageIcon className="h-5 w-5" />
              <span className="text-xs font-medium">Add Product</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors bg-card">
              <TagIcon className="h-5 w-5" />
              <span className="text-xs font-medium">New Category</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors bg-card">
              <PercentIcon className="h-5 w-5" />
              <span className="text-xs font-medium">Create Discount</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors bg-card">
              <TrendingUpIcon className="h-5 w-5" />
              <span className="text-xs font-medium">Marketing</span>
            </Button>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg tracking-tight">Recent Activity</h3>
            </div>
            <AuditTimeline logs={mockActivity as any} />
            <Button variant="ghost" className="w-full mt-6 text-xs h-8 text-primary hover:text-primary">View Full Audit Log</Button>
          </Card>

          {/* System Tasks & Goals */}
          <SummaryCard 
            title="Setup Tasks"
            data={[
              { label: "Connect Custom Domain", value: "Pending" },
              { label: "Setup Payment Gateway", value: "Pending" },
              { label: "Add Shipping Zones", value: "Complete" }
            ]}
          />
        </div>
      </div>

      {/* TIER 3: INSIGHTS & PERFORMANCE */}
      <div>
        <h3 className="text-xl font-bold tracking-tight mb-4">Insights & Infrastructure</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ProgressCard 
            title="Storage Usage" 
            progress={(metrics.storageUsedGB / metrics.storageLimitGB) * 100} 
            label={`${metrics.storageUsedGB}GB / ${metrics.storageLimitGB}GB`}
          />
          <ProgressCard 
            title="SEO Health Score" 
            progress={metrics.seoScore} 
            label="Excellent"
            className="border-emerald-500/20"
          />
          <ProgressCard 
            title="Security Score" 
            progress={metrics.securityScore} 
            label="Optimal"
          />
          <ProgressCard 
            title="Performance Score" 
            progress={metrics.performanceScore} 
            label="Good"
          />
        </div>
      </div>
      
    </div>
  );
}
