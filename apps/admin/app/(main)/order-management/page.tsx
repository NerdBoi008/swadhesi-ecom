'use client'

import { useState } from 'react'
import { 
  SearchIcon, 
  FilterIcon, 
  DownloadIcon,
  MoreVerticalIcon,
  CheckIcon,
  TruckIcon,
  PackageIcon,
  XIcon,
  RefreshCwIcon,
  PrinterIcon,
  MailIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { mockOrders } from '../../../../../packages/mock-data/data' // Your mock orders data

export default function OrderManagementPage() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all')

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    )
  }

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(prev => prev === orderId ? null : orderId)
  }

  const filteredOrders = mockOrders.filter(order => {
    if (activeTab === 'all') return true
    return order.status.toLowerCase() === activeTab
  })

  const statusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', text: string }> = {
      'Pending': { variant: 'secondary', text: 'Pending' },
      'Processing': { variant: 'outline', text: 'Processing' },
      'Shipped': { variant: 'outline', text: 'Shipped' },
      'Delivered': { variant: 'default', text: 'Delivered' },
      'Cancelled': { variant: 'destructive', text: 'Cancelled' },
      'Refunded': { variant: 'secondary', text: 'Refunded' }
    }
    
    const config = statusMap[status] || { variant: 'outline', text: status }
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  const paymentBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', text: string }> = {
      'Pending': { variant: 'secondary', text: 'Pending' },
      'Paid': { variant: 'default', text: 'Paid' },
      'Refunded': { variant: 'outline', text: 'Refunded' },
      'Partially_Refunded': { variant: 'outline', text: 'Partial Refund' },
      'Failed': { variant: 'destructive', text: 'Failed' }
    }
    
    const config = statusMap[status] || { variant: 'outline', text: status }
    return <Badge variant={config.variant}>{config.text.replace('_', ' ')}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Order Status Tabs */}
      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search orders..." 
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px]">
              <FilterIcon className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="paid">Paid Orders</SelectItem>
              <SelectItem value="unpaid">Unpaid Orders</SelectItem>
              <SelectItem value="refunded">Refunded Orders</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="flex items-center gap-4 rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">
            {selectedOrders.length} selected
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CheckIcon className="mr-2 h-4 w-4" />
              Mark as Fulfilled
            </Button>
            <Button variant="outline" size="sm">
              <TruckIcon className="mr-2 h-4 w-4" />
              Mark as Shipped
            </Button>
            <Button variant="outline" size="sm">
              <PrinterIcon className="mr-2 h-4 w-4" />
              Print Invoices
            </Button>
            <Button variant="outline" size="sm" className="text-red-500">
              <XIcon className="mr-2 h-4 w-4" />
              Cancel Orders
            </Button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <>
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      #{order.id}
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {order.customer_id ? `Customer ${order.customer_id}` : 'Guest'}
                    </TableCell>
                    <TableCell>
                      {statusBadge(order.status)}
                    </TableCell>
                    <TableCell>
                      {paymentBadge(order.payment_status)}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{order.total_amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => toggleOrderExpansion(order.id)}
                        >
                          {expandedOrder === order.id ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <CheckIcon className="mr-2 h-4 w-4" />
                              Fulfill Order
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <TruckIcon className="mr-2 h-4 w-4" />
                              Add Tracking
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <PrinterIcon className="mr-2 h-4 w-4" />
                              Print Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCwIcon className="mr-2 h-4 w-4" />
                              Process Refund
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              <XIcon className="mr-2 h-4 w-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedOrder === order.id && (
                    <TableRow className="bg-muted/10">
                      <TableCell colSpan={7}>
                        <div className="p-4">
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {/* Customer Info */}
                            <div className="space-y-4">
                              <h3 className="font-medium">Customer Information</h3>
                              <div className="space-y-2 text-sm">
                                <p>{order.customer_id ? `Customer ID: ${order.customer_id}` : 'Guest Order'}</p>
                                {typeof order.shipping_address === 'object' && (
                                  <>
                                    <p>{order.shipping_address.recipient_name}</p>
                                    <p>{order.shipping_address.street}</p>
                                    <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
                                    <p>{order.shipping_address.country}</p>
                                    <p className="text-muted-foreground">
                                      {order.shipping_address.contact_number}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            {/* Order Items */}
                            <div className="space-y-4">
                              <h3 className="font-medium">Order Items ({order.items.length})</h3>
                              <div className="space-y-3">
                                {order.items.map((item) => (
                                  <div key={item.id || item.product_id} className="flex gap-3">
                                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
                                      {/* Product image placeholder */}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between">
                                        <span className="font-medium">
                                          {item.variant_sku}
                                        </span>
                                        <span>₹{item.price_at_purchase.toFixed(2)}</span>
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Qty: {item.quantity}
                                        {item.refunded_quantity ? (
                                          <span className="ml-2 text-red-500">
                                            (Refunded: {item.refunded_quantity})
                                          </span>
                                        ) : null}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {Object.entries(item.variant_attributes).map(([key, value]) => (
                                          <span key={key} className="mr-2">{key}: {value}</span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Order Summary */}
                            <div className="space-y-4">
                              <h3 className="font-medium">Order Summary</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Subtotal:</span>
                                  <span>₹{(order.total_amount - order.shipping_cost - (order.tax_amount || 0)).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Shipping:</span>
                                  <span>₹{order.shipping_cost.toFixed(2)}</span>
                                </div>
                                {order.tax_amount && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax:</span>
                                    <span>₹{order.tax_amount.toFixed(2)}</span>
                                  </div>
                                )}
                                {order.discount_amount && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Discount:</span>
                                    <span className="text-green-500">-₹{order.discount_amount.toFixed(2)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between pt-2 font-medium">
                                  <span>Total:</span>
                                  <span>₹{order.total_amount.toFixed(2)}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-2 pt-4 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Payment Method:</span>
                                  <span>{order.payment_method.replace('_', ' ')}</span>
                                </div>
                                {order.tracking_number && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tracking:</span>
                                    <span>{order.carrier} #{order.tracking_number}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Order Notes */}
                          {order.notes && (
                            <div className="mt-6 rounded-lg border p-4">
                              <h3 className="font-medium">Order Notes</h3>
                              <p className="text-sm text-muted-foreground">{order.notes}</p>
                            </div>
                          )}
                          
                          {/* Order Actions */}
                          <div className="mt-6 flex flex-wrap gap-2">
                            <Button variant="outline">
                              <PrinterIcon className="mr-2 h-4 w-4" />
                              Print Invoice
                            </Button>
                            <Button variant="outline">
                              <MailIcon className="mr-2 h-4 w-4" />
                              Resend Confirmation
                            </Button>
                            <Button variant="outline">
                              <TruckIcon className="mr-2 h-4 w-4" />
                              Add Tracking
                            </Button>
                            <Button variant="outline">
                              <RefreshCwIcon className="mr-2 h-4 w-4" />
                              Process Refund
                            </Button>
                            <Button variant="outline" className="text-red-500">
                              <XIcon className="mr-2 h-4 w-4" />
                              Cancel Order
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">{filteredOrders.length}</span> orders
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  )
}