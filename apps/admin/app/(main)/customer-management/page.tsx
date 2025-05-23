'use client'

import { useState } from 'react'
import {
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  MoreVerticalIcon,
  UserIcon,
  MailIcon,
  ShoppingBagIcon,
  CalendarIcon,
  EditIcon,
  TrashIcon,
  BanIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  IndianRupeeIcon
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
import { mockCustomers } from '../../../../../packages/mock-data/data' // Your mock orders data


export default function CustomerManagementPage() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    )
  }

  const toggleCustomerExpansion = (customerId: string) => {
    setExpandedCustomer(prev => prev === customerId ? null : customerId)
  }

  const filteredCustomers = mockCustomers.filter(customer => {
    // Filter by tab
    if (activeTab === 'active' && customer.status !== 'active') return false
    if (activeTab === 'inactive' && customer.status !== 'inactive') return false
    
    // Filter by search
    if (searchQuery && !customer.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !customer.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    return true
  })

  const statusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', text: string }> = {
      'active': { variant: 'default', text: 'Active' },
      'inactive': { variant: 'destructive', text: 'Inactive' },
      'new': { variant: 'outline', text: 'New' }
    }
    
    const config = statusMap[status] || { variant: 'outline', text: status }
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserIcon className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer Status Tabs */}
      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="high-value">High Value</SelectItem>
              <SelectItem value="repeat">Repeat Customers</SelectItem>
              <SelectItem value="new">New Customers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCustomers.length > 0 && (
        <div className="flex items-center gap-4 rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">
            {selectedCustomers.length} selected
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MailIcon className="mr-2 h-4 w-4" />
              Send Email
            </Button>
            <Button variant="outline" size="sm">
              <BanIcon className="mr-2 h-4 w-4" />
              Disable Accounts
            </Button>
            <Button variant="outline" size="sm" className="text-red-500">
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete Customers
            </Button>
          </div>
        </div>
      )}

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <>
                  <TableRow key={customer.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <UserIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <span>{customer.first_name} {customer.last_name}</span>
                          <div className="text-xs text-muted-foreground">
                            ID: {customer.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.created_at ? customer.created_at.toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
                        {customer.order_count}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
                        {(customer.total_spent ?? 0).toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {statusBadge(customer.status || 'unknown')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleCustomerExpansion(customer.id)}
                        >
                          {expandedCustomer === customer.id ? (
                            <ChevronDownIcon className="h-4 w-4" />
                          ) : (
                            <ChevronRightIcon className="h-4 w-4" />
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
                              <EditIcon className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MailIcon className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            {customer.status === 'active' ? (
                              <DropdownMenuItem className="text-red-500">
                                <BanIcon className="mr-2 h-4 w-4" />
                                Disable Account
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <UserIcon className="mr-2 h-4 w-4" />
                                Activate Account
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedCustomer === customer.id && (
                    <TableRow className="bg-muted/10">
                      <TableCell colSpan={7}>
                        <div className="p-4">
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {/* Customer Info */}
                            <div className="space-y-4">
                              <h3 className="font-medium">Customer Information</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                                  <span>{customer.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MailIcon className="h-4 w-4 text-muted-foreground" />
                                  <span>{customer.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                  <span>
                                    Joined {customer.created_at ? customer.created_at.toLocaleDateString() : 'N/A'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
                                  <span>{customer.order_count} orders</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
                                  <span>{(customer.total_spent ?? 0).toFixed(2)} total spent</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Saved Addresses */}
                            <div className="space-y-4">
                              <h3 className="font-medium">Saved Addresses</h3>
                              <div className="space-y-3">
                                {customer.addresses?.map((address) => (
                                  <div key={address.id} className="rounded border p-3 text-sm">
                                    <div className="font-medium">{address.recipient_name}</div>
                                    <div>{address.street}</div>
                                    <div>{address.city}, {address.state} {address.postal_code}</div>
                                    <div>{address.country}</div>
                                    <div className="text-muted-foreground">
                                      {address.contact_number}
                                    </div>
                                    {address.is_default && (
                                      <Badge variant="outline" className="mt-1">
                                        Default
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Recent Orders */}
                            <div className="space-y-4">
                              <h3 className="font-medium">Recent Orders</h3>
                              <div className="space-y-2 text-sm">
                                {customer.orders?.map((order) => (
                                  <div key={order.id} className="flex items-center justify-between rounded border p-3">
                                    <div>
                                      <div className="font-medium">Order #{order.id}</div>
                                      <div className="text-muted-foreground">
                                        {new Date(order.created_at).toLocaleDateString()}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div>₹{order.total_amount.toFixed(2)}</div>
                                      <Badge variant="outline">
                                        {order.status}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* Customer Actions */}
                          <div className="mt-6 flex flex-wrap gap-2">
                            <Button>
                              <EditIcon className="mr-2 h-4 w-4" />
                              Edit Customer
                            </Button>
                            <Button variant="outline">
                              <MailIcon className="mr-2 h-4 w-4" />
                              Send Message
                            </Button>
                            {customer.status === 'active' ? (
                              <Button variant="outline" className="text-red-500">
                                <BanIcon className="mr-2 h-4 w-4" />
                                Disable Account
                              </Button>
                            ) : (
                              <Button variant="outline">
                                <UserIcon className="mr-2 h-4 w-4" />
                                Activate Account
                              </Button>
                            )}
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">{filteredCustomers.length}</span> customers
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