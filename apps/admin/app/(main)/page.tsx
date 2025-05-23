'use client'

import { OrdersTable } from "@/components/common/orders-table";
import { SalesChartAreaInteractive } from "@/components/common/sales-chart-area";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  PlusIcon,
  Package,
  ShoppingCart,
  Clock,
  CheckCircle,
  Users,
  RefreshCw,
  IndianRupeeIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import { mockOrders } from "../../../../packages/mock-data/data";
import { useRouter } from "next/navigation";
import { addProduct } from "@repo/db";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Mock data that would normally come from API
  const [metrics, setMetrics] = useState({
    totalRevenue: 1250.00,
    newOrders: 42,
    pendingOrders: 8,
    conversionRate: 4.5,
    totalProducts: 30,
    newCustomers: 12,
    avgOrderValue: 89.97,
    refunds: 2
  });

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would fetch data here based on timeRange
    }, 800);

    return () => clearTimeout(timer);
  }, [timeRange]);

  const handleAddProduct = async () => {
    // Redirect to the add product page
    // router.push('/add-product');
    const req = await addProduct({
      name: "Blue Toddler Shirt",
      description: "Soft cotton blue shirt for toddlers.",
      category_id: '2342',
      thumbnail_image_url: "https://example.com/images/products/blue-shirt-thumb.jpg",
      images_url: [
        "https://example.com/images/products/blue-shirt-1.jpg",
        "https://example.com/images/products/blue-shirt-2.jpg",
      ],
      variants: {
        create: [
          {
            sku: "SKU-BLUE-4T",
            price: 29.99,
            sale_price: 24.99,
            stock: 10,
            size: JSON.stringify({
              label: "4T",
              system: "US",
              equivalent: { eu: "104", uk: "3-4Y" },
              description: "Fits 4-5 year olds",
            }),
            image_url: "https://example.com/images/products/blue-shirt-4t.jpg",
            barcode: "1234567890123",
          }
        ]
      },
      brand_id: "brand-001",
      meta_title: "Blue Toddler Shirt",
      meta_description: "Shop soft blue shirts for toddlers!",
      slug: "blue-toddler-shirt",
      related_products: ["prod-002", "prod-003"],
    });
  }

  return (
    <main className="space-y-6 p-4">
      {/* Header Section */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex flex-col xl:flex-row gap-2">
          <div className="flex gap-2 items-center">
            <Button 
              variant={timeRange === '7d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setTimeRange('7d')}
            >
              Last 7 days
            </Button>
            <Button 
              variant={timeRange === '30d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setTimeRange('30d')}
            >
              Last 30 days
            </Button>
            <Button 
              variant={timeRange === '90d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setTimeRange('90d')}
            >
              Last 90 days
            </Button>
          </div>
          
          <div className="flex gap-2 items-center">
            <Button size="sm" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button
              size="sm"
              onClick={handleAddProduct}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <MetricCard
          icon={<IndianRupeeIcon className="h-5 w-5" />}
          title="Total Revenue"
          value={`₹${metrics.totalRevenue.toLocaleString('en-IN')}`}
          change={12.5}
          description="Compared to last period"
          loading={isLoading}
        />
        
        <MetricCard
          icon={<ShoppingCart className="h-5 w-5" />}
          title="New Orders"
          value={metrics.newOrders}
          change={-20}
          description={`${timeRange === '7d' ? 'Today' : 'This month'}`}
          loading={isLoading}
        />
        
        <MetricCard
          icon={<Clock className="h-5 w-5" />}
          title="Pending Orders"
          value={metrics.pendingOrders}
          change={5}
          description="Needs attention"
          loading={isLoading}
        />
        
        <MetricCard
          icon={<CheckCircle className="h-5 w-5" />}
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          change={4.5}
          description="From visits to orders"
          loading={isLoading}
        />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                Revenue and orders over time
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <SalesChartAreaInteractive/>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Product availability</CardDescription>
            </CardHeader>
            <CardContent >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{metrics.totalProducts}</p>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>New customer acquisition</CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{metrics.newCustomers}</p>
                  <p className="text-sm text-muted-foreground">New Customers</p>
                </div>
                <div className="rounded-full bg-green-500/10 p-3">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Orders Section */}
      <section>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  {mockOrders.length} orders found
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All Orders
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <OrdersTable data={mockOrders.slice(0, 5)} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

// Reusable Metric Card Component
function MetricCard({
  icon,
  title,
  value,
  change,
  description,
  loading = false
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: number;
  description: string;
  loading?: boolean;
}) {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-5 w-5 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-16 w-full animate-pulse rounded bg-muted" />
        ) : (
          <>
            <div className="text-4xl font-bold">{value}</div>
            <div className="flex items-center pt-1 text-sm text-muted-foreground">
              <span className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? (
                  <TrendingUpIcon className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDownIcon className="mr-1 h-3 w-3" />
                )}
                {Math.abs(change)}%
              </span>
              <span className="ml-1">{description}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}