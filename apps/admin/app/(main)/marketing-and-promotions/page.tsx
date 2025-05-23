'use client'

import { useState } from 'react'
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  PercentIcon,
  TagIcon,
  ImageIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  MoreVerticalIcon
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

// Mock data
const discountCodes = [
  {
    id: 'disc_1',
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    minOrder: 1000,
    appliesTo: 'entire_order',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-08-31'),
    uses: 42,
    maxUses: 100,
    status: 'active'
  },
  {
    id: 'disc_2',
    code: 'FREESHIP',
    type: 'free_shipping',
    minOrder: 500,
    appliesTo: 'entire_order',
    startDate: new Date('2023-07-01'),
    endDate: new Date('2023-07-31'),
    uses: 15,
    maxUses: null,
    status: 'active'
  },
  {
    id: 'disc_3',
    code: 'KIDS50',
    type: 'fixed',
    value: 50,
    minOrder: null,
    appliesTo: 'category',
    appliesToId: 'cat_4', // Outerwear category
    startDate: new Date('2023-06-15'),
    endDate: new Date('2023-06-30'),
    uses: 8,
    maxUses: 50,
    status: 'expired'
  }
]

const promotions = [
  {
    id: 'promo_1',
    name: 'Back to School Sale',
    type: 'sitewide',
    discount: '20% off',
    startDate: new Date('2023-07-15'),
    endDate: new Date('2023-07-30'),
    status: 'scheduled'
  },
  {
    id: 'promo_2',
    name: 'Summer Collection Launch',
    type: 'collection',
    collection: 'Summer Collection',
    discount: '15% off',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-06-30'),
    status: 'active'
  },
  {
    id: 'promo_3',
    name: 'Clearance Event',
    type: 'category',
    category: 'Outerwear',
    discount: '30% off',
    startDate: new Date('2023-05-01'),
    endDate: new Date('2023-05-31'),
    status: 'ended'
  }
]

const banners = [
  {
    id: 'banner_1',
    name: 'Summer Sale Hero',
    image: '/banners/summer-sale.jpg',
    link: '/collections/summer',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-06-30'),
    status: 'active',
    position: 'home_hero'
  },
  {
    id: 'banner_2',
    name: 'New Arrivals',
    image: '/banners/new-arrivals.jpg',
    link: '/collections/new',
    startDate: new Date('2023-07-01'),
    endDate: new Date('2023-07-15'),
    status: 'scheduled',
    position: 'home_middle'
  },
  {
    id: 'banner_3',
    name: 'Back to School',
    image: '/banners/school-banner.jpg',
    link: '/collections/school',
    startDate: new Date('2023-05-01'),
    endDate: new Date('2023-05-31'),
    status: 'ended',
    position: 'home_hero'
  }
]

export default function MarketingPromotionsPage() {
  const [activeTab, setActiveTab] = useState<'discounts' | 'promotions' | 'banners'>('discounts')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    )
  }

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItem(prev => prev === itemId ? null : itemId)
  }

  const statusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', text: string }> = {
      'active': { variant: 'default', text: 'Active' },
      'scheduled': { variant: 'outline', text: 'Scheduled' },
      'expired': { variant: 'secondary', text: 'Expired' },
      'ended': { variant: 'secondary', text: 'Ended' }
    }
    
    const config = statusMap[status] || { variant: 'outline', text: status }
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  const formatDiscountValue = (discount: any) => {
    if (discount.type === 'percentage') {
      return `${discount.value}% off`
    } else if (discount.type === 'fixed') {
      return `₹${discount.value} off`
    } else {
      return 'Free shipping'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Marketing & Promotions</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            {activeTab === 'discounts' ? 'Create Discount' :
              activeTab === 'promotions' ? 'Create Promotion' : 'Add Banner'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="discounts">
            <PercentIcon className="mr-2 h-4 w-4" />
            Discount Codes
          </TabsTrigger>
          <TabsTrigger value="promotions">
            <TagIcon className="mr-2 h-4 w-4" />
            Promotions
          </TabsTrigger>
          <TabsTrigger value="banners">
            <ImageIcon className="mr-2 h-4 w-4" />
            Banners
          </TabsTrigger>
        </TabsList>
        {/* Filters and Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab}...`}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[150px]">
                <FilterIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="expired">Expired/Ended</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All dates</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="flex items-center gap-4 rounded-lg border p-3">
            <div className="text-sm text-muted-foreground">
              {selectedItems.length} selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <CopyIcon className="mr-2 h-4 w-4" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm" className="text-red-500">
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Discounts Tab */}
        <TabsContent value="discounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Discount Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Applies To</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {discountCodes.map((discount) => (
                    <>
                      <TableRow key={discount.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {discount.code}
                        </TableCell>
                        <TableCell>
                          {formatDiscountValue(discount)}
                          {discount.minOrder && (
                            <div className="text-xs text-muted-foreground">
                              Min. order ₹{discount.minOrder}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {discount.appliesTo === 'entire_order' ? 'Entire order' :
                            discount.appliesTo === 'category' ? 'Outerwear category' :
                              'Specific products'}
                        </TableCell>
                        <TableCell>
                          {discount.startDate.toLocaleDateString()} - {discount.endDate.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {discount.uses}{discount.maxUses ? `/${discount.maxUses}` : ''} uses
                        </TableCell>
                        <TableCell>
                          {statusBadge(discount.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleItemExpansion(discount.id)}
                            >
                              {expandedItem === discount.id ? (
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
                                  <CopyIcon className="mr-2 h-4 w-4" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">
                                  <TrashIcon className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedItem === discount.id && (
                        <TableRow className="bg-muted/10">
                          <TableCell colSpan={7}>
                            <div className="p-4">
                              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                  <h3 className="font-medium">Discount Details</h3>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Code:</span>
                                      <span className="font-medium">{discount.code}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Type:</span>
                                      <span>{discount.type === 'percentage' ? 'Percentage discount' :
                                        discount.type === 'fixed' ? 'Fixed amount discount' : 'Free shipping'}</span>
                                    </div>
                                    {discount.value && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Value:</span>
                                        <span>{formatDiscountValue(discount)}</span>
                                      </div>
                                    )}
                                    {discount.minOrder && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Minimum order:</span>
                                        <span>₹{discount.minOrder}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Applies to:</span>
                                      <span>{discount.appliesTo === 'entire_order' ? 'Entire order' :
                                        discount.appliesTo === 'category' ? 'Specific category' : 'Specific products'}</span>
                                    </div>
                                  </div>
                                </div>
                              
                                <div className="space-y-4">
                                  <h3 className="font-medium">Usage & Dates</h3>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Start date:</span>
                                      <span>{discount.startDate.toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">End date:</span>
                                      <span>{discount.endDate.toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Times used:</span>
                                      <span>{discount.uses}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Usage limit:</span>
                                      <span>{discount.maxUses || 'No limit'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            
                              <div className="mt-6 flex flex-wrap gap-2">
                                <Button>
                                  <EditIcon className="mr-2 h-4 w-4" />
                                  Edit Discount
                                </Button>
                                <Button variant="outline">
                                  <CopyIcon className="mr-2 h-4 w-4" />
                                  Duplicate
                                </Button>
                                <Button variant="outline" className="text-red-500">
                                  <TrashIcon className="mr-2 h-4 w-4" />
                                  Delete
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> discount codes
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
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Promotions Tab */}
        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Promotions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map((promo) => (
                    <TableRow key={promo.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {promo.name}
                      </TableCell>
                      <TableCell>
                        {promo.type === 'sitewide' ? 'Sitewide' :
                          promo.type === 'collection' ? 'Collection' : 'Category'}
                      </TableCell>
                      <TableCell>
                        {promo.discount}
                      </TableCell>
                      <TableCell>
                        {promo.startDate.toLocaleDateString()} - {promo.endDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {statusBadge(promo.status)}
                      </TableCell>
                      <TableCell className="text-right">
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
                              <CopyIcon className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              <TrashIcon className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> promotions
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
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Banners Tab */}
        <TabsContent value="banners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Promotional Banners</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {banners.map((banner) => (
                    <TableRow key={banner.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {banner.name}
                      </TableCell>
                      <TableCell>
                        {banner.position === 'home_hero' ? 'Homepage Hero' : 'Homepage Middle'}
                      </TableCell>
                      <TableCell>
                        {banner.link}
                      </TableCell>
                      <TableCell>
                        {banner.startDate.toLocaleDateString()} - {banner.endDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {statusBadge(banner.status)}
                      </TableCell>
                      <TableCell className="text-right">
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
                              <CopyIcon className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              <TrashIcon className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> banners
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
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}