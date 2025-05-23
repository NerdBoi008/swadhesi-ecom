'use client'

import { useState } from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts'
import {
  CalendarIcon,
  FilterIcon,
  DownloadIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  UsersIcon,
  ShoppingBagIcon,
  PackageIcon,
  RepeatIcon,
  TrendingUpIcon,
  FileTextIcon,
  IndianRupeeIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Badge } from '@/components/ui/badge'

// Mock data
const salesData = [
  { date: '2023-06-01', revenue: 12500, orders: 42, avgOrder: 297.62 },
  { date: '2023-06-02', revenue: 11800, orders: 38, avgOrder: 310.53 },
  { date: '2023-06-03', revenue: 15200, orders: 45, avgOrder: 337.78 },
  { date: '2023-06-04', revenue: 9800, orders: 32, avgOrder: 306.25 },
  { date: '2023-06-05', revenue: 14300, orders: 47, avgOrder: 304.26 },
  { date: '2023-06-06', revenue: 16700, orders: 52, avgOrder: 321.15 },
  { date: '2023-06-07', revenue: 13800, orders: 44, avgOrder: 313.64 }
]

const productPerformance = [
  { name: 'Dinosaur T-Shirt', revenue: 12500, units: 420, category: 'Tops' },
  { name: 'Puffer Jacket', revenue: 9800, units: 150, category: 'Outerwear' },
  { name: 'Party Dress', revenue: 8700, units: 120, category: 'Dresses' },
  { name: 'Denim Jeans', revenue: 6500, units: 180, category: 'Bottoms' },
  { name: 'Cotton Socks', revenue: 3200, units: 450, category: 'Accessories' }
]

const categoryPerformance = [
  { name: 'Tops', value: 35, fill: '#8884d8' },
  { name: 'Outerwear', value: 25, fill: '#83a6ed' },
  { name: 'Dresses', value: 20, fill: '#8dd1e1' },
  { name: 'Bottoms', value: 15, fill: '#82ca9d' },
  { name: 'Accessories', value: 5, fill: '#a4de6c' }
]

const customerMetrics = [
  { name: 'New Customers', value: 125, change: 12 },
  { name: 'Returning Customers', value: 85, change: -5 },
  { name: 'Avg. Order Value', value: 312.5, change: 8 },
  { name: 'Conversion Rate', value: 3.2, change: 0.4 }
]

const inventoryAlerts = [
  { product: 'Dinosaur T-Shirt (2T)', sku: 'TSHIRT-BLUE-2T', stock: 3, status: 'critical' },
  { product: 'Winter Puffer Jacket (3T)', sku: 'JACKET-RED-3T', stock: 5, status: 'low' },
  { product: 'Party Dress (5T)', sku: 'DRESS-PINK-5T', stock: 8, status: 'low' }
]

export default function ReportingAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'sales' | 'customers' | 'inventory'>('sales')
  const [dateRange, setDateRange] = useState({ start: new Date('2023-06-01'), end: new Date('2023-06-07') })
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('day')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reporting & Analytics</h1>
        <div className="flex gap-2">
          <DatePickerWithRange 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹98,100</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUpIcon className="h-3 w-3 text-green-500 mr-1" />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Orders
            </CardTitle>
            <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">298</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUpIcon className="h-3 w-3 text-green-500 mr-1" />
              +8.2% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            < IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹329.19</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUpIcon className="h-3 w-3 text-green-500 mr-1" />
              +4.1% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <RepeatIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUpIcon className="h-3 w-3 text-green-500 mr-1" />
              +0.4% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Sales Performance</h2>
            <Select value={timeframe} onValueChange={(value: any) => setTimeframe(value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Daily</SelectItem>
                <SelectItem value="week">Weekly</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Orders</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue (₹)" />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryPerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue (₹)" fill="#8884d8" />
                    <Bar dataKey="units" name="Units Sold" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {customerMetrics.map((metric) => (
              <Card key={metric.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.name}
                  </CardTitle>
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {typeof metric.value === 'number' && metric.name !== 'Conversion Rate' 
                      ? metric.value.toLocaleString()
                      : `${metric.value}%`}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    {metric.change >= 0 ? (
                      <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    {Math.abs(metric.change)}{typeof metric.change === 'number' && metric.name !== 'Conversion Rate' ? '' : '%'} from last period
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>New vs Returning Customers</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Current', new: 125, returning: 85 },
                    { name: 'Previous', new: 112, returning: 90 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="new" name="New Customers" fill="#8884d8" />
                    <Bar dataKey="returning" name="Returning Customers" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: 'Jan', value: 1250 },
                    { month: 'Feb', value: 1320 },
                    { month: 'Mar', value: 1410 },
                    { month: 'Apr', value: 1580 },
                    { month: 'May', value: 1620 },
                    { month: 'Jun', value: 1750 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" name="CLV (₹)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryAlerts.map((item) => (
                    <div key={item.sku} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.product}</div>
                        <div className="text-sm text-muted-foreground">{item.sku}</div>
                      </div>
                      <Badge variant={item.status === 'critical' ? 'destructive' : 'outline'}>
                        {item.stock} in stock
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Value by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Tops', value: 125000 },
                    { name: 'Outerwear', value: 98000 },
                    { name: 'Dresses', value: 87000 },
                    { name: 'Bottoms', value: 65000 },
                    { name: 'Accessories', value: 32000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Inventory Value']} />
                    <Bar dataKey="value" name="Inventory Value (₹)" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Movement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: 'Jan', sales: 420, returns: 25 },
                    { month: 'Feb', sales: 380, returns: 32 },
                    { month: 'Mar', sales: 450, returns: 28 },
                    { month: 'Apr', sales: 520, returns: 35 },
                    { month: 'May', sales: 480, returns: 30 },
                    { month: 'Jun', sales: 550, returns: 40 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#8884d8" name="Units Sold" />
                    <Line yAxisId="right" type="monotone" dataKey="returns" stroke="#82ca9d" name="Units Returned" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Google Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Sessions
                    </CardTitle>
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12,542</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                      +8.2% from last period
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Bounce Rate
                    </CardTitle>
                    <RepeatIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42.5%</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <ArrowDownIcon className="h-3 w-3 text-green-500 mr-1" />
                      -3.1% from last period
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg. Session Duration
                    </CardTitle>
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2:45</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                      +0:12 from last period
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pages/Session
                    </CardTitle>
                    <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                      +0.3 from last period
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Organic Search', value: 45 },
                            { name: 'Direct', value: 25 },
                            { name: 'Social', value: 15 },
                            { name: 'Referral', value: 10 },
                            { name: 'Email', value: 5 }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#8884d8" />
                          <Cell fill="#83a6ed" />
                          <Cell fill="#8dd1e1" />
                          <Cell fill="#82ca9d" />
                          <Cell fill="#a4de6c" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Device Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Desktop', value: 45 },
                        { name: 'Mobile', value: 50 },
                        { name: 'Tablet', value: 5 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        <Bar dataKey="value" name="Percentage" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}