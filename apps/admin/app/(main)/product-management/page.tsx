"use client";

import { useEffect, useState } from "react";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  MoreVerticalIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  CopyIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  RefreshCwIcon,
  Loader2Icon,
  AlertCircleIcon,
  ListIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import useCategoryDataStore from "@/lib/store/network-category-data-store";
import { buildCategoryTree, CategoryNode } from "./category/add-category/page";
import Image from "next/image";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteCategory } from "@repo/db";
import { toast } from "sonner";
import { Attribute } from "@repo/db/types";

// Mock data
const products = [
  {
    id: "prod_1",
    name: "Dinosaur Graphic T-Shirt",
    sku: "TSHIRT-BLUE-4T",
    price: 24.99,
    salePrice: 19.99,
    stock: 42,
    status: "active",
    category: "Tops/T-Shirts",
    brand: "Little Explorers",
    variants: [
      { size: "2T", color: "Blue", stock: 15 },
      { size: "3T", color: "Blue", stock: 12 },
      { size: "4T", color: "Blue", stock: 15 },
    ],
  },
  {
    id: "prod_2",
    name: "Winter Puffer Jacket",
    sku: "JACKET-RED-3T",
    price: 39.99,
    stock: 8,
    status: "active",
    category: "Outerwear",
    brand: "Cozy Kids",
    variants: [
      { size: "2T", color: "Red", stock: 3 },
      { size: "3T", color: "Red", stock: 5 },
    ],
  },
  {
    id: "prod_3",
    name: "Party Dress",
    sku: "DRESS-PINK-5T",
    price: 29.99,
    stock: 0,
    status: "draft",
    category: "Dresses",
    brand: "Pretty Princess",
    variants: [
      { size: "4T", color: "Pink", stock: 0 },
      { size: "5T", color: "Pink", stock: 0 },
    ],
  },
];

const categories = [
  {
    id: "cat_1",
    name: "Tops",
    children: [
      { id: "cat_1_1", name: "T-Shirts" },
      { id: "cat_1_2", name: "Shirts" },
    ],
  },
  {
    id: "cat_2",
    name: "Bottoms",
    children: [
      { id: "cat_2_1", name: "Pants" },
      { id: "cat_2_2", name: "Shorts" },
    ],
  },
  { id: "cat_3", name: "Dresses" },
  { id: "cat_4", name: "Outerwear" },
];

const collections = [
  { id: "col_1", name: "Summer Collection", type: "manual", products: 12 },
  { id: "col_2", name: "School Uniforms", type: "auto", products: 8 },
  { id: "col_3", name: "Party Wear", type: "manual", products: 15 },
];

const attributes = [
  {
    id: "attr_1",
    name: "Size",
    values: ["2T", "3T", "4T", "5T", "S", "M", "L"],
  },
  {
    id: "attr_2",
    name: "Color",
    values: ["Red", "Blue", "Green", "Yellow", "Pink", "Black", "White"],
  },
  {
    id: "attr_3",
    name: "Material",
    values: ["Cotton", "Polyester", "Wool", "Denim"],
  },
];

// Separate component for recursive rendering
const CategoryTree = ({
  categories,
  expandedCategories,
  onToggleExpand,
}: {
  categories: CategoryNode[];
  expandedCategories: string[];
  onToggleExpand: (id: string) => void;
  }) => {
  const router = useRouter();
  const fetchCategories = useCategoryDataStore(state => state.fetchCategories)

  const handleCategoryDelete = async (id: string) => {
    await deleteCategory(id)
      .then(() => {
        toast.success("Deleted.", {
          description: `Category - ${id} deleted successfully`
        })
        fetchCategories(true);
      })
      .catch((error) => {
      toast.error("Error deleting category: ", error)
    })
  }

  return (
    <>
      {categories.map((category) => (
        <div key={category.id} className="space-y-1">
          <div className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded">
            {category.children?.length ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onToggleExpand(category.id)}
              >
                {expandedCategories.includes(category.id) ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </Button>
            ) : (
              <div className="h-6 w-6" /> // Spacer for alignment
            )}
            <div className="flex gap-3 justify-center items-center">
              {category.image_url &&
                <Image
                  src={category.image_url}
                  alt={category.name}
                  height={80}
                  width={80}
                  className="size-10 rounded-md"
                />
              }
              <span className="font-medium">{category.name}</span>
            </div>
            <div className="ml-auto flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  router.push(`/product-management/category/edit-category?id=${category.id}`)
                }}
              >
                <EditIcon className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete &quot;{category.name}&quot;?</AlertDialogTitle>
                    <AlertDialogDescription>
                      <p className="font-medium">This action cannot be undone.</p>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>All subcategories will be orphaned</li>
                        <li>Associated products won&apos;t be deleted but will lose this category</li>
                        {category.image_url && (
                          <li>The category image will be permanently deleted</li>
                        )}
                      </ul>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        handleCategoryDelete(category.id);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {category.children && expandedCategories.includes(category.id) && (
            <div className="ml-8 space-y-1">
              <CategoryTree
                categories={category.children}
                expandedCategories={expandedCategories}
                onToggleExpand={onToggleExpand}
              />
            </div>
          )}
        </div>
      ))}
    </>
  )
};

export default function ProductManagementPage() {
  const [selectedTab, setSelectedTab] = useState("products");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('')
  const [attributesLoading, setAttributesLoading] = useState(false)
  const [errorAttributes, setErrorAttributes] = useState<string | null>(null)
  const [attributes, setAttributes] = useState<Attribute[]>([])

  // Fetch attributes from API
  const fetchAttributes = async (force = false) => {
    try {
      setAttributesLoading(true)
      setErrorAttributes(null)
      
      // Simulate API call - replace with your actual API call
      const response = await fetch('/api/attributes' + (force ? '?refresh=true' : ''))
      if (!response.ok) throw new Error('Failed to fetch attributes')
      
      const data = await response.json()
      setAttributes(data)
    } catch (err) {
      setErrorAttributes(err instanceof Error ? err.message : 'Failed to fetch attributes')
    } finally {
      setAttributesLoading(false)
    }
  }

  // Delete attribute handler
  const handleDeleteAttribute = async (id: string) => {
    try {
      const response = await fetch(`/api/attributes/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete attribute')
      
      toast('Success',{
        description: 'Attribute deleted successfully',
      })
      
      // Refresh the list after deletion
      fetchAttributes()
    } catch (err) {
      toast.error('Error',{
        description: err instanceof Error ? err.message : 'Failed to delete attribute',
      })
    }
  }

  // Filter attributes based on search query
  const filteredAttributes = attributes.filter(attr => 
    attr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attr.values.some(val => 
      val.value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  // Fetch attributes on component mount
  useEffect(() => {
    fetchAttributes()
  }, [])

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const { categories, loading, error, fetchCategories } = useCategoryDataStore();

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={() => {
              router.push("/product-management/product/add-product");
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <FilterIcon className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <FilterIcon className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Products</CardTitle>
                {selectedProducts.length > 0 && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Set as Active
                    </Button>
                    <Button variant="outline" size="sm">
                      Set as Draft
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500"
                    >
                      Delete Selected
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={selectedProducts.length === products.length}
                        onCheckedChange={() => {
                          setSelectedProducts(
                            selectedProducts.length === products.length
                              ? []
                              : products.map((p) => p.id)
                          );
                        }}
                      />
                    </TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() =>
                            toggleProductSelection(product.id)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                        <div className="text-xs text-muted-foreground">
                          {product.variants.length} variants
                        </div>
                      </TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>
                        {product.salePrice ? (
                          <>
                            <span className="line-through text-muted-foreground">
                              ₹{product.price}
                            </span>
                            <span className="ml-2 text-red-500">
                              ₹{product.salePrice}
                            </span>
                          </>
                        ) : (
                          `₹${product.price}`
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.stock > 10 ? "outline" : "destructive"
                          }
                        >
                          {product.stock} in stock
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.brand}</TableCell>
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
                              <EyeIcon className="mr-2 h-4 w-4" />
                              View
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
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">32</span> products
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
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search categories..." className="pl-9" />
            </div>
            <Button
              onClick={() => {
                router.push("/product-management/category/add-category");
              }}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Categories</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fetchCategories(true)}
                  disabled={loading}
                >
                  <RefreshCwIcon
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Loading state */}
              {loading && (
                <div className="flex justify-center items-center p-4">
                  <Loader2Icon className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading categories...</span>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="flex justify-center items-center p-4 text-red-500">
                  <AlertCircleIcon className="h-6 w-6 mr-2" />
                  <span>{error}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fetchCategories(true)}
                    className="ml-4"
                  >
                    Retry
                  </Button>
                </div>
              )}

              {/* Success state */}
              {!loading && !error && (
                <div className="space-y-2">
                  {categories.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground">
                      No categories found. Add one to get started.
                    </div>
                  ) : (
                    <CategoryTree
                      categories={buildCategoryTree(
                        categories.map((category) => ({
                          ...category,
                          image_url: category.image_url ?? undefined,
                          description: category.description ?? undefined,
                        }))
                      )}
                      expandedCategories={expandedCategories}
                      onToggleExpand={toggleCategoryExpansion}
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-4">
          {/* Similar structure as categories */}
        </TabsContent>

        {/* Attributes Tab */}
        <TabsContent value="attributes" className="space-y-4">
          <div className="flex justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search attributes..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                router.push("/product-management/attributes/add");
              }}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Attribute
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Attributes</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fetchAttributes(true)}
                  disabled={loading}
                >
                  <RefreshCwIcon
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Loading state */}
              {loading && (
                <div className="flex justify-center items-center p-4">
                  <Loader2Icon className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading attributes...</span>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="flex justify-center items-center p-4 text-red-500">
                  <AlertCircleIcon className="h-6 w-6 mr-2" />
                  <span>{error}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fetchAttributes(true)}
                    className="ml-4"
                  >
                    Retry
                  </Button>
                </div>
              )}

              {/* Success state */}
              {!loading && !error && (
                <div className="space-y-4">
                  {filteredAttributes.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground">
                      {searchQuery ? 'No matching attributes found' : 'No attributes found. Add one to get started.'}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Values</TableHead>
                          <TableHead>Display Order</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAttributes.map((attribute) => (
                          <TableRow key={attribute.id}>
                            <TableCell className="font-medium">
                              {attribute.name}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1 max-w-[200px]">
                                {attribute.values.slice(0, 3).map((value) => (
                                  <Badge key={value.id} variant="outline">
                                    {value.value}
                                  </Badge>
                                ))}
                                {attribute.values.length > 3 && (
                                  <Badge variant="outline">
                                    +{attribute.values.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {attribute.display_order || '-'}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVerticalIcon className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => router.push(`/product-management/attributes/${attribute.id}/edit`)}
                                  >
                                    <EditIcon className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => router.push(`/product-management/attributes/${attribute.id}/values`)}
                                  >
                                    <ListIcon className="mr-2 h-4 w-4" />
                                    Manage Values
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-500"
                                    onClick={() => handleDeleteAttribute(attribute.id)}
                                  >
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
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          {/* Similar structure as products */}
        </TabsContent>
      </Tabs>

      {/* Add/Edit Product Modal (would be implemented separately) */}
    </div>
  )
}
