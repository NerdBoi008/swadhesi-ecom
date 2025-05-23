'use client'

import { useState } from 'react'
import {
  PlusIcon,
  SearchIcon,
  FileTextIcon,
  RulerIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ImageIcon,
  ListOrderedIcon,
  LayoutTemplateIcon,
  DownloadIcon,
  FilterIcon,
  MoreVerticalIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'

// Mock data
const staticPages = [
  {
    id: 'page_1',
    title: 'About Us',
    slug: 'about-us',
    status: 'published',
    lastUpdated: new Date('2023-05-15'),
    seoTitle: 'About Our Kids Clothing Brand | LittleFashion',
    seoDescription: 'Learn about our mission to provide high-quality, comfortable clothing for children of all ages.'
  },
  {
    id: 'page_2',
    title: 'Contact Us',
    slug: 'contact',
    status: 'published',
    lastUpdated: new Date('2023-06-01'),
    seoTitle: 'Contact LittleFashion - Customer Support',
    seoDescription: 'Get in touch with our customer support team for any questions about our kids clothing.'
  },
  {
    id: 'page_3',
    title: 'Size Guide',
    slug: 'size-guide',
    status: 'draft',
    lastUpdated: new Date('2023-06-10'),
    seoTitle: 'Kids Clothing Size Guide | LittleFashion',
    seoDescription: 'Comprehensive size guide to help you find the perfect fit for your child.'
  }
]

const sizeGuides = [
  {
    id: 'guide_1',
    title: 'Tops Size Guide',
    applicableTo: ['cat_1', 'cat_1_1', 'cat_1_2'], // Tops categories
    lastUpdated: new Date('2023-06-05'),
    status: 'published'
  },
  {
    id: 'guide_2',
    title: 'Bottoms Size Guide',
    applicableTo: ['cat_2', 'cat_2_1', 'cat_2_2'], // Bottoms categories
    lastUpdated: new Date('2023-06-08'),
    status: 'published'
  },
  {
    id: 'guide_3',
    title: 'Dresses Size Guide',
    applicableTo: ['cat_3'], // Dresses category
    lastUpdated: new Date('2023-06-12'),
    status: 'draft'
  }
]

const blogPosts = [
  {
    id: 'post_1',
    title: '10 Tips for Dressing Active Kids',
    slug: 'dressing-active-kids',
    category: 'Parenting Tips',
    status: 'published',
    date: new Date('2023-05-20'),
    author: 'Priya Sharma'
  },
  {
    id: 'post_2',
    title: 'Summer Fabric Guide for Kids',
    slug: 'summer-fabric-guide',
    category: 'Fabric Care',
    status: 'published',
    date: new Date('2023-06-05'),
    author: 'Rahul Patel'
  },
  {
    id: 'post_3',
    title: 'New Collection Preview',
    slug: 'new-collection-preview',
    category: 'Collections',
    status: 'draft',
    date: new Date('2023-06-15'),
    author: 'Ananya Gupta'
  }
]

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState<'pages' | 'size-guides' | 'blog'>('pages')
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
      'published': { variant: 'default', text: 'Published' },
      'draft': { variant: 'outline', text: 'Draft' },
      'archived': { variant: 'secondary', text: 'Archived' }
    }
    
    const config = statusMap[status] || { variant: 'outline', text: status }
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            {activeTab === 'pages' ? 'Create Page' : 
             activeTab === 'size-guides' ? 'Create Size Guide' : 'Create Post'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="pages">
            <FileTextIcon className="mr-2 h-4 w-4" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="size-guides">
            <RulerIcon className="mr-2 h-4 w-4" />
            Size Guides
          </TabsTrigger>
          <TabsTrigger value="blog">
            <LayoutTemplateIcon className="mr-2 h-4 w-4" />
            Blog
          </TabsTrigger>
        </TabsList>
      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={`Search ${activeTab === 'pages' ? 'pages' : activeTab === 'size-guides' ? 'size guides' : 'blog posts'}...`} 
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
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          {activeTab === 'blog' && (
            <Select>
              <SelectTrigger className="w-[150px]">
                <FilterIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="parenting">Parenting Tips</SelectItem>
                <SelectItem value="fabric">Fabric Care</SelectItem>
                <SelectItem value="collections">Collections</SelectItem>
              </SelectContent>
            </Select>
          )}
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
              Publish
            </Button>
            <Button variant="outline" size="sm">
              Move to Draft
            </Button>
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

      {/* Pages Tab */}
      <TabsContent value="pages" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Static Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staticPages.map((page) => (
                  <>
                    <TableRow key={page.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {page.title}
                      </TableCell>
                      <TableCell>
                        /{page.slug}
                      </TableCell>
                      <TableCell>
                        {page.lastUpdated.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {statusBadge(page.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => toggleItemExpansion(page.id)}
                          >
                            {expandedItem === page.id ? (
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
                    {expandedItem === page.id && (
                      <TableRow className="bg-muted/10">
                        <TableCell colSpan={5}>
                          <div className="p-4">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                              <div className="space-y-4">
                                <h3 className="font-medium">Page Details</h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Title:</span>
                                    <span className="font-medium">{page.title}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">URL:</span>
                                    <span>/{page.slug}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status:</span>
                                    <span>{statusBadge(page.status)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Last Updated:</span>
                                    <span>{page.lastUpdated.toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <h3 className="font-medium">SEO Settings</h3>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <div className="text-muted-foreground">Meta Title:</div>
                                    <div className="mt-1">{page.seoTitle}</div>
                                  </div>
                                  <div>
                                    <div className="text-muted-foreground">Meta Description:</div>
                                    <div className="mt-1">{page.seoDescription}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex flex-wrap gap-2">
                              <Button>
                                <EditIcon className="mr-2 h-4 w-4" />
                                Edit Page
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> pages
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

      {/* Size Guides Tab */}
      <TabsContent value="size-guides" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Size Guides</CardTitle>
            <CardDescription>
              Create detailed sizing charts for different product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Applicable To</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sizeGuides.map((guide) => (
                  <TableRow key={guide.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {guide.title}
                    </TableCell>
                    <TableCell>
                      {guide.applicableTo.length} categories
                    </TableCell>
                    <TableCell>
                      {guide.lastUpdated.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {statusBadge(guide.status)}
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> size guides
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

      {/* Blog Tab */}
      <TabsContent value="blog" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.map((post) => (
                  <TableRow key={post.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {post.title}
                    </TableCell>
                    <TableCell>
                      {post.category}
                    </TableCell>
                    <TableCell>
                      {post.author}
                    </TableCell>
                    <TableCell>
                      {post.date.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {statusBadge(post.status)}
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> posts
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