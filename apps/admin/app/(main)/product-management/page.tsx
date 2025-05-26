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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCategory, deleteProduct } from "@repo/db";
import { toast } from "sonner";
import useAttributeDataStore from "@/lib/store/network-attributes-data-store";
import useProductStore from "@/lib/store/network-product-data-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductViewDialog } from "@/components/common/product-view-dialog";
import { Product } from "@repo/types";
import React from "react";

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
  const fetchCategories = useCategoryDataStore(
    (state) => state.fetchCategories
  );

  const handleCategoryDelete = async (id: string) => {
    await deleteCategory(id)
      .then(() => {
        toast.success("Deleted.", {
          description: `Category - ${id} deleted successfully`,
        });
        fetchCategories(true);
      })
      .catch((error) => {
        toast.error("Error deleting category: ", error);
      });
  };

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
              <div className="h-6 w-6" />
            )}
            <div className="flex gap-3 justify-center items-center">
              {category.image_url && (
                <Image
                  src={category.image_url}
                  alt={category.name}
                  height={80}
                  width={80}
                  className="size-10 rounded-md"
                />
              )}
              <span className="font-medium">{category.name}</span>
            </div>
            <div className="ml-auto flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  router.push(
                    `/product-management/category/edit-category?id=${category.id}`
                  );
                }}
              >
                <EditIcon className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete &quot;{category.name}&quot;?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div>
                    <p className="font-medium">This action cannot be undone.</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>All subcategories will be orphaned</li>
                      <li>
                        Associated products won&apos;t be deleted but will lose
                        this category
                      </li>
                      {category.image_url && (
                        <li>The category image will be permanently deleted</li>
                      )}
                    </ul>
                  </div>
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
  );
};

export default function ProductManagementPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("products");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategoryDataStore();
  const {
    attributes,
    loading: attributLoading,
    error: attributeError,
    fetchAttributes,
    deleteAttribute,
  } = useAttributeDataStore();
  const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);
  const products = useProductStore((state) => state.products);
  const productsLoading = useProductStore((state) => state.loading);

  const [openDropdowns, setOpenDropdowns] = useState(new Set());
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [showProductView, setShowProductView] = useState(false);
  const [selectedProductToView, setSelectedProductToView] =
    useState<Product | null>(null);

  const toggleDropdown = (productId: string, isOpen: boolean) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (isOpen) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
  };

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId);
    toggleDropdown(productId, false);
    setShowDeleteDialog(true);
  };

  const handleProductViewClick = (product: Product) => {
    setSelectedProductToView(product);
    toggleDropdown(product.id, false);
    setShowProductView(true);
  };

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Delete attribute handler
  const handleDeleteAttribute = async (id: string) => {
    try {
      await deleteAttribute(id);

      toast("Success", {
        description: "Attribute deleted successfully",
      });

      // Refresh the list after deletion
      fetchAttributes(true);
    } catch (err) {
      toast.error("Error", {
        description:
          err instanceof Error ? err.message : "Failed to delete attribute",
      });
    }
  };

  // Filter attributes based on search query
  const filteredAttributes = attributes.filter(
    (attr) =>
      attr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attr.values.some((val) =>
        val.value.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Fetch attributes on component mount
  useEffect(() => {
    fetchAttributes();
  }, [fetchAttributes]);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleActualDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);

      toast.success("Success", {
        description: `Product ${productId} deleted successfully`,
      });

      fetchAllProducts(true);
    } catch (err) {
      toast.error("Error", {
        description:
          err instanceof Error ? err.message : "Failed to delete product",
      });
    }
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fetchAllProducts(true)}
                  disabled={productsLoading}
                >
                  <RefreshCwIcon
                    className={`h-4 w-4 mr-2 ${productsLoading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <div className="h-20 flex items-center">
                  <p className="m-auto w-full font-semibold">
                    Products loading...
                  </p>
                </div>
              ) : (
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
                      <TableHead>Thumbnail</TableHead>
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
                      <React.Fragment key={product.id}>
                        <TableRow>
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() =>
                                toggleProductSelection(product.id)
                              }
                            />
                          </TableCell>
                          <TableCell className="font-medium w-[70px]">
                            <Image
                              src={
                                product.thumbnail_image_url ||
                                "/cdn/not-available.png"
                              }
                              alt={product.name}
                              height={50}
                              width={50}
                              className="rounded-sm"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                            <div className="text-xs text-muted-foreground">
                              {product.variants?.length} variants
                            </div>
                          </TableCell>
                          <TableCell>
                            {product.variants?.[0]?.sku ?? "N/A"}
                          </TableCell>
                          <TableCell>
                            {product.variants?.[0]?.sale_price ? (
                              <>
                                <span className="line-through text-muted-foreground">
                                  ₹{product.variants?.[0]?.price}
                                </span>
                                <span className="ml-2 text-red-500">
                                  ₹{product.variants?.[0]?.sale_price}
                                </span>
                              </>
                            ) : (
                              `₹${product.variants?.[0]?.price}`
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                (product.variants?.[0]?.stock ?? 0) > 10
                                  ? "outline"
                                  : "destructive"
                              }
                            >
                              {product.variants?.[0]?.stock} in stock
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                product.variants?.[0]?.status == "ACTIVE"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {product.variants?.[0]?.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.category?.name}</TableCell>
                          <TableCell>{product.brand_id}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu
                              open={openDropdowns.has(product.id)}
                              onOpenChange={(isOpen) =>
                                toggleDropdown(product.id, isOpen)
                              }
                            >
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVerticalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() => {
                                    router.push(
                                      `/product-management/product/edit/${product.id}`
                                    );
                                  }}
                                >
                                  <EditIcon className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => {
                                    handleProductViewClick(product);
                                  }}
                                >
                                  <EyeIcon className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-500"
                                  onSelect={() => {
                                    handleDeleteClick(product.id);
                                  }}
                                >
                                  <TrashIcon className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>

                        {/* Accordion for variants, nested within a TableRow with colSpan */}
                        <TableRow>
                          <TableCell colSpan={10} className="p-0">
                            <Accordion type="single" collapsible>
                              <AccordionItem value="variants">
                                <AccordionTrigger className="px-4 py-2">
                                  View all variants and attributes
                                </AccordionTrigger>
                                <AccordionContent className="p-4">
                                  <div className="space-y-6">
                                    {/* Product attributes section */}
                                    {(product.attributes?.length ?? 0) > 0 && ( // Changed from 0 > 0 to (0) > 0 for clarity, ensures check for actual length
                                      <div>
                                        <h4 className="font-medium mb-2">
                                          Product Attributes
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                          {product.attributes?.map((attr) => (
                                            <div
                                              key={attr.attribute_id}
                                              className="border rounded p-3"
                                            >
                                              <div className="font-medium">
                                                {attr.attribute.name}
                                              </div>
                                              <div className="text-sm text-muted-foreground">
                                                {attr.values
                                                  .map((v) => v.value)
                                                  .join(", ")}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Variants section */}
                                    <div>
                                      <h4 className="font-medium mb-2">
                                        All Variants
                                      </h4>
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Variant Image</TableHead>
                                            <TableHead>SKU</TableHead>
                                            <TableHead>Attributes</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Status</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {product.variants?.map((variant) => (
                                            <TableRow key={variant.id}>
                                              <TableCell>
                                                <Image
                                                  src={
                                                    variant.image_url ||
                                                    "/cdn/not-available.png"
                                                  }
                                                  alt={variant.sku}
                                                  height={50}
                                                  width={50}
                                                />
                                              </TableCell>
                                              <TableCell>
                                                {variant.sku}
                                              </TableCell>
                                              <TableCell>
                                                {(variant.attribute_values
                                                  ?.length ?? 0) > 0 ? (
                                                  <div className="flex flex-wrap gap-1">
                                                    {variant.attribute_values?.map(
                                                      (attr) => (
                                                        <Badge
                                                          key={attr.id}
                                                          variant="outline"
                                                        >
                                                          {attr.attribute
                                                            ? `${attr.attribute.name}: ${attr.value}`
                                                            : "N/A"}
                                                        </Badge>
                                                      )
                                                    )}
                                                  </div>
                                                ) : (
                                                  <span className="text-muted-foreground">
                                                    No attributes
                                                  </span>
                                                )}
                                              </TableCell>
                                              <TableCell>
                                                {variant.sale_price ? (
                                                  <>
                                                    <span className="line-through text-muted-foreground">
                                                      ₹{variant.price}
                                                    </span>
                                                    <span className="ml-2 text-red-500">
                                                      ₹{variant.sale_price}
                                                    </span>
                                                  </>
                                                ) : (
                                                  `₹${variant.price}`
                                                )}
                                              </TableCell>
                                              <TableCell>
                                                <Badge
                                                  variant={
                                                    variant.stock > 10
                                                      ? "outline"
                                                      : "destructive"
                                                  }
                                                >
                                                  {variant.stock} in stock
                                                </Badge>
                                              </TableCell>
                                              <TableCell>
                                                <Badge
                                                  variant={
                                                    variant.status === "ACTIVE"
                                                      ? "default"
                                                      : "secondary"
                                                  }
                                                >
                                                  {variant.status}
                                                </Badge>
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">{products.length}</span> products
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
                  disabled={categoriesLoading}
                >
                  <RefreshCwIcon
                    className={`h-4 w-4 mr-2 ${categoriesLoading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Loading state */}
              {categoriesLoading && (
                <div className="flex justify-center items-center p-4">
                  <Loader2Icon className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading categories...</span>
                </div>
              )}

              {/* Error state */}
              {categoriesError && (
                <div className="flex justify-center items-center p-4 text-red-500">
                  <AlertCircleIcon className="h-6 w-6 mr-2" />
                  <span>{categoriesError}</span>
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
              {!categoriesLoading && !categoriesError && (
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
                  disabled={attributLoading}
                >
                  <RefreshCwIcon
                    className={`h-4 w-4 mr-2 ${attributLoading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Loading state */}
              {attributLoading && (
                <div className="flex justify-center items-center p-4">
                  <Loader2Icon className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading attributes...</span>
                </div>
              )}

              {/* Error state */}
              {attributeError && (
                <div className="flex justify-center items-center p-4 text-red-500">
                  <AlertCircleIcon className="h-6 w-6 mr-2" />
                  <span>{attributeError}</span>
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
              {!attributLoading && !attributeError && (
                <div className="space-y-4">
                  {filteredAttributes.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground">
                      {searchQuery
                        ? "No matching attributes found"
                        : "No attributes found. Add one to get started."}
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
                              {attribute.display_order || "-"}
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
                                    onClick={() =>
                                      router.push(
                                        `/product-management/attributes/edit/${attribute.id}`
                                      )
                                    }
                                  >
                                    <EditIcon className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                  // onClick={() => router.push(`/product-management/attributes/values/${attribute.id}`)}
                                  >
                                    <ListIcon className="mr-2 h-4 w-4" />
                                    Manage Values
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-500"
                                    onClick={() =>
                                      handleDeleteAttribute(attribute.id)
                                    }
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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <div>
              Are you sure you want to delete this product? This action cannot
              be undone.
              <div className="ml-5 text-sm text-red-500">
                <ul className="list-disc">
                  <li>
                    This action will also delete products all variants and
                    attributes
                  </li>
                </ul>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleActualDelete(selectedProductId!);
                setShowDeleteDialog(false);
                setSelectedProductId("");
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ProductViewDialog
        isOpen={showProductView}
        onOpenChange={setShowProductView}
        product={selectedProductToView}
      />
    </div>
  );
}
