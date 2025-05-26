"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  PlusIcon,
  TrashIcon,
  ImageIcon,
  XIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SaveIcon,
  Loader2Icon,
  AlertTriangleIcon,
  WandIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { addProduct, addProductAttribute, addProductVariant, generateBucketKey, uploadImageToS3, fetchAllProducts } from '@repo/db';
import useCategoryDataStore from "@/lib/store/network-category-data-store";
import Image from "next/image";
import { generateSkuFromName } from "@/lib/utils";
import useAttributeDataStore from "@/lib/store/network-attributes-data-store";
import { Attribute } from "@repo/db/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import useProductStore from "@/lib/store/network-product-data-store";

// Schema validation
const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
  thumbnailImage: z
    .instanceof(File)
    .optional()
    .refine((file) => file, "Thumbnail image is required"),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  slug: z
    .union([
      z.string().min(5, "Slug must be at least 5 characters"),
      z.undefined(),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  variants: z
    .array(
      z.object({
        sku: z.string().min(1, "SKU is required"),
        price: z.number().min(0, "Price must be positive"),
        salePrice: z.number().optional(),
        stock: z.number().min(0, "Stock must be positive"),
        size: z
          .string()
          .min(1, "Must be atlest 1 character. e.g. S, M, L, ...")
          .max(4, "Must not be greated than 4 characters"),
        image: z.instanceof(File).optional(),
        barcode: z.string().optional(),
        attributeValues: z
          .array(z.string())
          .min(1, "At least one attribute is required"),
      })
    )
    .min(1, "At least one variant is required"),
  selectedAttributes: z
    .array(z.string())
    .min(1, "At least one attribute must be selected"),
  relatedProducts: z.array(z.string()).optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const MAX_FILE_SIZE = 500 * 1024; // 500kb
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export default function AddProductPage() {

  const router = useRouter();

  const categories = useCategoryDataStore((state) => state.categories);
  const fetchCategories = useCategoryDataStore(
    (state) => state.fetchCategories
  );
  const isCategoriesFetching = useCategoryDataStore((state) => state.loading);
  const attributes = useAttributeDataStore((state) => state.attributes);
  const fetchAttributes = useAttributeDataStore(
    (state) => state.fetchAttributes
  );

  const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basicInfo: true,
    media: true,
    variants: true,
    attributes: true,
    seo: true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      thumbnailImage: undefined,
      images: [],
      metaTitle: "",
      metaDescription: "",
      slug: undefined,
      variants: [],
      selectedAttributes: [],
      relatedProducts: [],
    },
  });

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories(false).catch((error) => {
      console.error("Failed to fetch categories:", error);
    });
  }, [fetchCategories]);

  // Fetch attributes on mount
  useEffect(() => {
    fetchAttributes(false).catch((error) => {
      console.error("Failed to fetch categories:", error);
    });
  }, [fetchAttributes]);

  // Handle thumbnail image change
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a JPEG, JPG, PNG, or WEBP image.",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large", {
        description: "Maximum file size is 500kb.",
      });
      return;
    }

    form.setValue("thumbnailImage", file, { shouldValidate: true });

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    form.setValue("name", newName);

    // Get the current variants. For simplicity, we'll update the first variant's SKU.
    // If you have multiple variants and want to update all, you'd loop through them.
    const currentVariants = form.getValues("variants");
    if (currentVariants && currentVariants.length > 0) {
      const generatedSku = generateSkuFromName(newName);
      // Ensure that setting the value for nested arrays is type-safe
      form.setValue(`variants.0.sku`, generatedSku, { shouldValidate: true }); // Optionally validate on change
    }
  };

  // Handle additional images change
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate files
    const validFiles = files.filter((file) => {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}`, {
          description: "Please upload JPEG, JPG, PNG, or WEBP images.",
        });
        return false;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File too large: ${file.name}`, {
          description: "Maximum file size is 500kb.",
        });
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    const currentImages = form.getValues("images") || [];
    const newImages = [...currentImages, ...validFiles];
    form.setValue("images", newImages, { shouldValidate: true });

    // Create previews
    const newPreviews = [...imagePreviews];
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result as string);
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove additional image
  const removeImage = (index: number) => {
    const currentImages = [...form.getValues("images")];
    currentImages.splice(index, 1);
    form.setValue("images", currentImages, { shouldValidate: true });

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const onSubmit = async (data: ProductFormValues) => {
    const uploadedImageUrls: string[] = []; // Track uploaded images for cleanup on error
    setIsUploading(true);
    
    try {
      const {
        name,
        description,
        slug,
        categoryId,
        thumbnailImage,
        images,
        variants,
        selectedAttributes,
        metaTitle,
        metaDescription,
        relatedProducts,
      } = data;

      // --- Validation ---
      if (!selectedAttributes || selectedAttributes.length === 0) {
        throw new Error("Please select at least one product attribute.");
      }

      if (selectedAttributes.length === 0) {
        throw new Error("Please select at least one product attribute");
      }
  
      // Validate variants have proper attribute combinations
      for (const [index, variant] of variants.entries()) {
        if (!variant.attributeValues || variant.attributeValues.length === 0) {
          throw new Error(`Variant #${index + 1} must have attribute values selected`);
        }
        
        // Ensure each selected attribute has a value in the variant
        const variantAttributeIds = new Set(
          variant.attributeValues.map(valueId => {
            const attr = attributes.find(a => 
              a.values.some(v => v.id === valueId)
            );
            return attr?.id;
          }).filter(Boolean)
        );
        
        const missingAttributes = selectedAttributes.filter(attrId => 
          !variantAttributeIds.has(attrId)
        );
        
        if (missingAttributes.length > 0) {
          const missingNames = missingAttributes.map(id => 
            attributes.find(a => a.id === id)?.name
          ).join(", ");
          throw new Error(`Variant #${index + 1} is missing values for: ${missingNames}`);
        }
      }
  
      // Create progress tracking
      const totalOperations = (thumbnailImage ? 1 : 0) + images.length + variants.filter(v => v.image).length;
      let completedOperations = 0;
      
      const updateProgress = () => {
        completedOperations++;
        // You can add progress bar updates here if needed
        console.log(`Upload progress: ${completedOperations}/${totalOperations}`);
      };

      const uploadFile = async (file: File, keyPrefix: string, index?: number) => {
        const keyName = index !== undefined ? `${name.replaceAll(" ", "-")}-${keyPrefix}-${index + 1}` : `${name.replaceAll(" ", "-")}-${keyPrefix}`;
        const url = await uploadImageToS3(file, generateBucketKey("productImage", keyName));
        uploadedImageUrls.push(url);
        updateProgress();
        return url;
      };
  
      // Upload thumbnail
      const thumbnailUrlPromise = thumbnailImage
      ? uploadFile(thumbnailImage, "thumbnail")
      : Promise.resolve("");

      // Upload additional images in parallel
      const imageUrlsPromises = images.map((file, index) =>
        uploadFile(file, "image", index)
      );
  
      const processedVariantsPromises = variants.map(async (variant, index) => {
        let variantImageUrl = "";
        if (variant.image) {
          variantImageUrl = await uploadFile(variant.image, "variant", index);
        }
  
        return {
          sku: variant.sku,
          price: variant.price,
          sale_price: variant.salePrice ? variant.salePrice : null,
          stock: Number(variant.stock),
          size: variant.size || null,
          image_url: variantImageUrl || null,
          barcode: variant.barcode || null,
          attribute_values: variant.attributeValues || [],
        };
      });

      // Wait for all image uploads and variant processing to complete
      const [thumbnailUrl, imageUrls, processedVariants] = await Promise.all([
        thumbnailUrlPromise,
        Promise.all(imageUrlsPromises),
        Promise.all(processedVariantsPromises),
      ]);
  
      // Prepare attributes data for API
      const attributesData = selectedAttributes.map(attributeId => {
        const attribute = attributes.find(attr => attr.id === attributeId);
        if (!attribute) {
          throw new Error(`Selected attribute with ID ${attributeId} not found`);
        }
        
        return {
          attribute_id: attributeId,
          values: attribute.values.map(value => value.id) // All available values for this attribute
        };
      });
  
      // Prepare the complete product data for API
      const productData = {
        name: name.trim(),
        description: description.trim(),
        slug: slug?.trim() || null,
        category_id: categoryId,
        brand_id: null, // Update when brand functionality is added
        thumbnail_image_url: thumbnailUrl ?? "",
        images_url: imageUrls,
        meta_title: metaTitle?.trim() || null,
        meta_description: metaDescription?.trim() || null,
        related_products: relatedProducts || [],
      };
  

      // --- API Submission ---
      // Submit product, variants, and attributes in parallel after product creation
      const product = await addProduct(productData);
      updateProgress(); // Mark product creation as a completed operation

      await Promise.all([
        ...processedVariants.map((variant) =>
          addProductVariant({
            ...variant,
            price: variant.price,
            sale_price: variant.sale_price,
            product_id: product.id,
          })
        ),
        ...attributesData.map((attribute) =>
          addProductAttribute({
            attribute_id: attribute.attribute_id,
            product_id: product.id,
          })
        ),
      ]);

      toast.success(`Product "${name}" created successfully`, {
        description: `Added ${processedVariants.length} variant(s) with ${attributesData.length} attribute(s).`,
      });

      form.reset();
      setThumbnailPreview(null);
      setImagePreviews([]);
      fetchAllProducts(true);
      router.push('/product-management');
  
    } catch (error) {
      console.error("Product creation error:", error);
      
      // Cleanup uploaded images on error (optional - depends on your S3 setup)
      if (uploadedImageUrls.length > 0) {
        console.log("Cleaning up uploaded images due to error...");
        // You might want to implement cleanup logic here
        // cleanupS3Images(uploadedImageUrls).catch(console.error);
      }
      
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      
      toast.error("Failed to create product", {
        description: errorMessage,
      });
      
      if (error instanceof Error) {
        console.error("Error details:", {
          message: error.message,
          stack: error.stack,
        });
      }
      
    } finally {
      setIsUploading(false);
    }
  };
  
  // Helper function for cleanup (optional)
  const cleanupS3Images = async (imageUrls: string[]) => {
    try {
      // Implement S3 deletion logic here if needed
      console.log("Would cleanup images:", imageUrls);
      // await deleteImagesFromS3(imageUrls);
    } catch (cleanupError) {
      console.error("Failed to cleanup images:", cleanupError);
    }
  };
  
  // Enhanced validation helper
  const validateProductData = (data: ProductFormValues) => {
    const errors: string[] = [];
    
    // Basic validation
    if (!data.name?.trim()) errors.push("Product name is required");
    if (!data.description?.trim()) errors.push("Product description is required");
    if (!data.categoryId) errors.push("Product category is required");
    if (!data.selectedAttributes || data.selectedAttributes.length === 0) {
      errors.push("At least one attribute must be selected");
    }
    
    // Variants validation
    if (!data.variants || data.variants.length === 0) {
      errors.push("At least one variant is required");
    } else {
      data.variants.forEach((variant, index) => {
        if (!variant.sku?.trim()) errors.push(`Variant #${index + 1}: SKU is required`);
        if (!variant.price || variant.price <= 0) errors.push(`Variant #${index + 1}: Valid price is required`);
        if (!variant.size?.trim()) errors.push(`Variant #${index + 1}: Size is required`);
        if (variant.stock < 0) errors.push(`Variant #${index + 1}: Stock cannot be negative`);
      });
    }
    
    return errors;
  };
  
  // Usage with pre-validation
  const onSubmitWithValidation = async (data: ProductFormValues) => {
    const validationErrors = validateProductData(data);
    
    if (validationErrors.length > 0) {
      toast.error("Please fix the following errors:", {
        description: validationErrors.join(", ")
      });
      return;
    }
    
    await onSubmit(data);
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const removeVariant = (index: number) => {
    const variants = [...form.getValues("variants")];
    variants.splice(index, 1);
    form.setValue("variants", variants);
  };

  const generateVariantCombinations = () => {
    const selectedAttributes = form.watch("selectedAttributes") || [];
    const availableSelectedAttributes = attributes.filter(attr => 
      selectedAttributes.includes(attr.id)
    );
    
    if (availableSelectedAttributes.length === 0) return;
    
    // Generate all possible combinations
    const combinations = generateCombinations(availableSelectedAttributes.map(attr => attr.values));
    
    const newVariants = combinations.map((combination, index) => ({
      sku: `PROD-${String(index + 1).padStart(3, '0')}`,
      price: 0,
      salePrice: undefined,
      stock: 0,
      size: "",
      image: undefined,
      barcode: "",
      attributeValues: combination.map(val => val.id)
    }));
    
    form.setValue("variants", newVariants);
  };
  
  // Helper function to generate all combinations
  const generateCombinations = (arrays: any[][]): any[][] => {
    if (arrays.length === 0) return [[]];
    if (arrays.length === 1 && arrays[0]) return arrays[0].map(item => [item]);
    
    const result = [];
    const restCombinations = generateCombinations(arrays.slice(1));
    
    for (const item of arrays[0] ?? []) {
      for (const restCombination of restCombinations) {
        result.push([item, ...restCombination]);
      }
    }
    
    return result;
  };
  
  // Enhanced addVariant function
  const addVariant = () => {
    const currentVariants = form.watch("variants") || [];
    
    const newVariant = {
      sku: `PROD-${String(currentVariants.length + 1).padStart(3, '0')}`,
      price: 0,
      salePrice: undefined,
      stock: 0,
      size: "",
      image: undefined,
      barcode: "",
      attributeValues: [] // Will be filled by user selection
    };
    
    form.setValue("variants", [...currentVariants, newVariant]);
  };

  const getSelectedAttributesData = (
    selectedAttributeIds: string[],
    availableAttributes: Attribute[]
  ) => {
    return selectedAttributeIds
      .map((id) => {
        const attribute = attributes.find((attr) => attr.id === id);
        return attribute
          ? {
              attributeId: attribute.id,
              values: attribute.values.map((val) => val.id), // or val.value depending on your needs
            }
          : null;
      })
      .filter(Boolean);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <Button onClick={form.handleSubmit(onSubmitWithValidation)} disabled={isUploading}>
          {isUploading ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <SaveIcon className="mr-2 h-4 w-4" />
          )}
          {isUploading ? "Saving..." : "Save Product"}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information Section */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("basicInfo")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {expandedSections.basicInfo ? (
                    <ChevronDownIcon className="mr-2 h-5 w-5" />
                  ) : (
                    <ChevronRightIcon className="mr-2 h-5 w-5" />
                  )}
                  Basic Information
                </CardTitle>
                <Badge
                  variant={
                    form.formState.errors.name ? "destructive" : "outline"
                  }
                >
                  {form.formState.errors.name ? "Incomplete" : "Complete"}
                </Badge>
              </div>
            </CardHeader>
            {expandedSections.basicInfo && (
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product name"
                          {...field}
                          onChange={handleProductNameChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-3">
                        <FormLabel>Category</FormLabel>
                        {isCategoriesFetching && (
                          <p className="text-sm">
                            <Loader2Icon className="inline animate-spin mr-2 size-5" />
                            Categories fetching...
                          </p>
                        )}
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <div key={category.id}>
                              <SelectItem value={category.id}>
                                {category.name}
                              </SelectItem>
                              {/* {category.children?.map(child => (
                                <SelectItem key={child.id} value={child.id}>
                                  &nbsp;&nbsp;&nbsp;{child.name}
                                </SelectItem>
                              ))} */}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (URL)</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            swadhesi.com/products/
                          </span>
                          <Input placeholder="product-name" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            )}
          </Card>

          {/* Media Section */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("media")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {expandedSections.media ? (
                    <ChevronDownIcon className="mr-2 h-5 w-5" />
                  ) : (
                    <ChevronRightIcon className="mr-2 h-5 w-5" />
                  )}
                  Media
                </CardTitle>
                <Badge
                  variant={
                    form.formState.errors.thumbnailImage ||
                    form.formState.errors.images
                      ? "destructive"
                      : "outline"
                  }
                >
                  {form.formState.errors.thumbnailImage ||
                  form.formState.errors.images
                    ? "Incomplete"
                    : "Complete"}
                </Badge>
              </div>
            </CardHeader>
            {expandedSections.media && (
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="thumbnailImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail Image</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-4">
                          {thumbnailPreview ? (
                            <div className="relative">
                              <Image
                                src={thumbnailPreview}
                                alt="Thumbnail preview"
                                className="h-32 w-32 rounded-md object-cover"
                                height={120}
                                width={120}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute -right-2 -top-2 rounded-full"
                                type="button"
                                onClick={() => {
                                  setThumbnailPreview(null);
                                  form.setValue("thumbnailImage", undefined, {
                                    shouldValidate: true,
                                  });
                                }}
                              >
                                <XIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Input
                                id="thumbnail-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleThumbnailChange}
                              />
                              <Label
                                htmlFor="thumbnail-upload"
                                className="flex cursor-pointer items-center gap-2 rounded-md border p-2 hover:bg-accent"
                              >
                                <ImageIcon className="h-4 w-4" />
                                Upload Thumbnail
                              </Label>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Images</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-4">
                            {imagePreviews.map((preview, index) => (
                              <div key={index} className="relative">
                                <Image
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  className="h-32 w-32 rounded-md object-cover"
                                  width={120}
                                  height={120}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute -right-2 -top-2 rounded-full"
                                  type="button"
                                  onClick={() => removeImage(index)}
                                >
                                  <XIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          <div>
                            <Input
                              id="images-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleImagesChange}
                            />
                            <Label
                              htmlFor="images-upload"
                              className="flex cursor-pointer items-center gap-2 rounded-md border p-2 hover:bg-accent"
                            >
                              <PlusIcon className="h-4 w-4" />
                              Add Images
                            </Label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            )}
          </Card>

          {/* Attributes Section */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("attributes")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {expandedSections.attributes ? (
                    <ChevronDownIcon className="mr-2 h-5 w-5" />
                  ) : (
                    <ChevronRightIcon className="mr-2 h-5 w-5" />
                  )}
                  Product Attributes
                </CardTitle>
                <Badge
                  variant={
                    form.formState.errors.selectedAttributes
                      ? "destructive"
                      : "outline"
                  }
                >
                  {form.formState.errors.selectedAttributes
                    ? "Incomplete"
                    : "Complete"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Select attributes that apply to this product
              </p>
            </CardHeader>
            {expandedSections.attributes && (
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    {form.watch("selectedAttributes")?.length || 0} attribute(s)
                    selected
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Select all attributes
                        const allAttributeIds = attributes.map(
                          (attr) => attr.id
                        );
                        form.setValue("selectedAttributes", allAttributeIds);
                      }}
                    >
                      Select All
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Clear all selections
                        form.setValue("selectedAttributes", []);
                      }}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>

                <Table>
                  <TableCaption>
                    Select attributes for this product.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Select</TableHead>
                      <TableHead>Attribute</TableHead>
                      <TableHead>Available Values</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attributes.map((attribute) => {
                      const isSelected =
                        form
                          .watch("selectedAttributes")
                          ?.includes(attribute.id) || false;

                      return (
                        <TableRow
                          key={attribute.id}
                          className={isSelected ? "bg-muted/50" : ""}
                        >
                          <TableCell>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                const currentSelected =
                                  form.watch("selectedAttributes") || [];

                                if (checked) {
                                  // Add attribute ID to selection
                                  const newSelected = [
                                    ...currentSelected,
                                    attribute.id,
                                  ];
                                  form.setValue(
                                    "selectedAttributes",
                                    newSelected
                                  );
                                } else {
                                  // Remove attribute ID from selection
                                  const newSelected = currentSelected.filter(
                                    (id) => id !== attribute.id
                                  );
                                  form.setValue(
                                    "selectedAttributes",
                                    newSelected
                                  );
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {attribute.name}
                              </span>
                              {isSelected && (
                                <Badge variant="secondary">Selected</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-md">
                              {attribute.values
                                .slice(0, 5)
                                .map((attributeValue) => (
                                  <Badge
                                    key={attributeValue.id}
                                    variant="outline"
                                  >
                                    {attributeValue.value}
                                  </Badge>
                                ))}
                              {attribute.values.length > 5 && (
                                <Badge variant="outline">
                                  +{attribute.values.length - 5} more
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                // Toggle selection
                                const currentSelected =
                                  form.watch("selectedAttributes") || [];

                                if (isSelected) {
                                  const newSelected = currentSelected.filter(
                                    (id) => id !== attribute.id
                                  );
                                  form.setValue(
                                    "selectedAttributes",
                                    newSelected
                                  );
                                } else {
                                  const newSelected = [
                                    ...currentSelected,
                                    attribute.id,
                                  ];
                                  form.setValue(
                                    "selectedAttributes",
                                    newSelected
                                  );
                                }
                              }}
                            >
                              {isSelected ? "Remove" : "Add"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                {/* Display selected attributes summary */}
                {form.watch("selectedAttributes")?.length > 0 && (
                  <div className="mt-6 p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-medium mb-2">
                      Selected Attributes Summary:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {form.watch("selectedAttributes").map((attributeId) => {
                        const attribute = attributes.find(
                          (attr) => attr.id === attributeId
                        );
                        return attribute ? (
                          <Badge key={attributeId} variant="default">
                            {attribute.name}
                            <button
                              type="button"
                              className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
                              onClick={() => {
                                const currentSelected =
                                  form.watch("selectedAttributes") || [];
                                const newSelected = currentSelected.filter(
                                  (id) => id !== attributeId
                                );
                                form.setValue(
                                  "selectedAttributes",
                                  newSelected
                                );
                              }}
                            >
                              ×
                            </button>
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Validation error display */}
                {form.formState.errors.selectedAttributes && (
                  <div className="text-destructive text-sm mt-2">
                    {form.formState.errors.selectedAttributes.message}
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Variants Section */}
          {/* <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("variants")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {expandedSections.variants ? (
                    <ChevronDownIcon className="mr-2 h-5 w-5" />
                  ) : (
                    <ChevronRightIcon className="mr-2 h-5 w-5" />
                  )}
                  Variants
                </CardTitle>
                <Badge
                  variant={
                    form.formState.errors.variants ? "destructive" : "outline"
                  }
                >
                  {form.formState.errors.variants ? "Incomplete" : "Complete"}
                </Badge>
              </div>
            </CardHeader>
            {expandedSections.variants && (
              <CardContent className="space-y-6">
                {form.watch("variants").map((variant, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Variant #{index + 1}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => removeVariant(index)}
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`variants.${index}.sku`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SKU</FormLabel>
                            <FormControl>
                              <Input placeholder="PROD-001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variants.${index}.barcode`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Barcode (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variants.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="99.99"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variants.${index}.salePrice`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sale Price (optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="79.99"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? parseFloat(e.target.value)
                                      : undefined
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variants.${index}.stock`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                placeholder="100"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variants.${index}.image`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Variant Image (optional)</FormLabel>
                            <FormControl>
                              <div className="flex flex-col gap-2">
                                {field.value ? (
                                  <div className="relative">
                                    <Image
                                      src={URL.createObjectURL(field.value)}
                                      alt="Variant preview"
                                      className="h-32 w-32 rounded-md object-cover"
                                      height={120}
                                      width={120}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="absolute -right-2 -top-2 rounded-full"
                                      type="button"
                                      onClick={() => {
                                        form.setValue(
                                          `variants.${index}.image`,
                                          undefined
                                        );
                                      }}
                                    >
                                      <XIcon className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <div>
                                    <Input
                                      id={`variant-image-${index}`}
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          form.setValue(
                                            `variants.${index}.image`,
                                            file
                                          );
                                        }
                                      }}
                                    />
                                    <Label
                                      htmlFor={`variant-image-${index}`}
                                      className="flex cursor-pointer items-center gap-2 rounded-md border p-2 hover:bg-accent"
                                    >
                                      <ImageIcon className="h-4 w-4" />
                                      Upload Image
                                    </Label>
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`variants.${index}.attributeValues`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attributes</FormLabel>
                            <FormControl>
                              <div className="flex flex-wrap gap-2">
                                {attributes.map((attr) => (
                                  <div key={attr.id} className="space-y-2">
                                    <Label className="block">{attr.name}</Label>
                                    <Select
                                      onValueChange={(value) => {
                                        const currentValues = [...field.value];
                                        // Remove any existing values for this attribute
                                        const filteredValues =
                                          currentValues.filter(
                                            (valId) =>
                                              !attr.values.some(
                                                (av) => av.id === valId
                                              )
                                          );
                                        field.onChange([
                                          ...filteredValues,
                                          value,
                                        ]);
                                      }}
                                    >
                                      <SelectTrigger className="w-[180px]">
                                        <SelectValue
                                          placeholder={`Select ${attr.name}`}
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {attr.values.map((value) => (
                                          <SelectItem
                                            key={value.id}
                                            value={value.id}
                                          >
                                            {value.value}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addVariant}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Variant
                </Button>
              </CardContent>
            )}
          </Card> */}

<Card>
  <CardHeader
    className="cursor-pointer"
    onClick={() => toggleSection("variants")}
  >
    <div className="flex items-center justify-between">
      <CardTitle className="flex items-center">
        {expandedSections.variants ? (
          <ChevronDownIcon className="mr-2 h-5 w-5" />
        ) : (
          <ChevronRightIcon className="mr-2 h-5 w-5" />
        )}
        Product Variants
      </CardTitle>
      <div className="flex items-center gap-2">
        <Badge variant="secondary">
          {form.watch("variants")?.length || 0} variant(s)
        </Badge>
        <Badge
          variant={
            form.formState.errors.variants ? "destructive" : "outline"
          }
        >
          {form.formState.errors.variants ? "Incomplete" : "Complete"}
        </Badge>
      </div>
    </div>
    <p className="text-sm text-muted-foreground mt-2">
      Create different variants of your product with unique combinations of attributes
    </p>
  </CardHeader>
  
  {expandedSections.variants && (
    <CardContent className="space-y-6">
      {/* Helper message when no attributes selected */}
      {(!form.watch("selectedAttributes") || form.watch("selectedAttributes").length === 0) && (
        <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              Please select product attributes first to create variants with different attribute combinations.
            </p>
          </div>
        </div>
      )}

      {/* Bulk actions */}
      {form.watch("variants")?.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Manage all variants
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                // Generate variants for all combinations
                generateVariantCombinations();
              }}
            >
              <WandIcon className="mr-2 h-4 w-4" />
              Auto Generate
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                form.setValue("variants", []);
              }}
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>
      )}

      {/* Variants List */}
      {form.watch("variants")?.map((variant, index) => {
        const selectedAttributes = form.watch("selectedAttributes") || [];
        const availableSelectedAttributes = attributes.filter(attr => 
          selectedAttributes.includes(attr.id)
        );

        return (
          <div key={index} className="rounded-lg border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-medium">Variant #{index + 1}</h3>
                {/* Show current attribute combination */}
                <div className="flex gap-1">
                  {variant.attributeValues?.map((valueId) => {
                    const attributeValue = availableSelectedAttributes
                      .flatMap(attr => attr.values)
                      .find(val => val.id === valueId);
                    return attributeValue ? (
                      <Badge key={valueId} variant="secondary">
                        {attributeValue.value}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => removeVariant(index)}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* SKU Field */}
              <FormField
                control={form.control}
                name={`variants.${index}.sku`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="PROD-001-RED-L" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price Field */}
              <FormField
                control={form.control}
                name={`variants.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="99.99"
                          className="pl-7"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sale Price Field */}
              <FormField
                control={form.control}
                name={`variants.${index}.salePrice`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sale Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="79.99"
                          className="pl-7"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value ? parseFloat(e.target.value) : undefined
                            )
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stock Field */}
              <FormField
                control={form.control}
                name={`variants.${index}.stock`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="100"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Size Field */}
              <FormField
                control={form.control}
                name={`variants.${index}.size`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="M, L, XL"
                        maxLength={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Barcode Field */}
              <FormField
                control={form.control}
                name={`variants.${index}.barcode`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barcode</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Attribute Selection Section */}
            {availableSelectedAttributes.length > 0 && (
              <div className="space-y-4 pt-4 border-t">
                <FormField
                  control={form.control}
                  name={`variants.${index}.attributeValues`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attribute Combination *</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {availableSelectedAttributes.map((attr) => {
                            const currentValue = field.value?.find(valueId => 
                              attr.values.some(av => av.id === valueId)
                            );
                            
                            return (
                              <div key={attr.id} className="space-y-2">
                                <Label className="text-sm font-medium">
                                  {attr.name} *
                                </Label>
                                <Select
                                  value={currentValue || ""}
                                  onValueChange={(value) => {
                                    const currentValues = field.value || [];
                                    // Remove any existing values for this attribute
                                    const filteredValues = currentValues.filter(
                                      (valId) =>
                                        !attr.values.some((av) => av.id === valId)
                                    );
                                    // Add the new value
                                    field.onChange([...filteredValues, value]);
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={`Select ${attr.name}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {attr.values.map((value) => (
                                      <SelectItem key={value.id} value={value.id}>
                                        <div className="flex items-center gap-2">
                                          <span>{value.value}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Variant Image Section */}
            <div className="pt-4 border-t">
              <FormField
                control={form.control}
                name={`variants.${index}.image`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variant Image</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-3">
                        {field.value ? (
                          <div className="relative inline-block">
                            <Image
                              src={URL.createObjectURL(field.value)}
                              alt={`Variant ${index + 1} preview`}
                              className="h-32 w-32 rounded-lg object-cover border"
                              height={128}
                              width={128}
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                              type="button"
                              onClick={() => {
                                form.setValue(`variants.${index}.image`, undefined);
                              }}
                            >
                              <XIcon className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Input
                              id={`variant-image-${index}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  form.setValue(`variants.${index}.image`, file);
                                }
                              }}
                            />
                            <Label
                              htmlFor={`variant-image-${index}`}
                              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 hover:bg-muted/50 transition-colors"
                            >
                              <ImageIcon className="h-5 w-5 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Upload variant image
                              </span>
                            </Label>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      })}

      {/* Add Variant Button */}
      <div className="flex items-center justify-center">
        <Button 
          type="button" 
          variant="outline" 
          onClick={addVariant}
          disabled={!form.watch("selectedAttributes") || form.watch("selectedAttributes").length === 0}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Variant
        </Button>
      </div>
    </CardContent>
  )}
</Card>

          {/* SEO Section */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("seo")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {expandedSections.seo ? (
                    <ChevronDownIcon className="mr-2 h-5 w-5" />
                  ) : (
                    <ChevronRightIcon className="mr-2 h-5 w-5" />
                  )}
                  SEO Settings
                </CardTitle>
                <Badge variant="outline">Optional</Badge>
              </div>
            </CardHeader>
            {expandedSections.seo && (
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter meta title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter meta description"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            )}
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isUploading}>
              {isUploading ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SaveIcon className="mr-2 h-4 w-4" />
              )}
              {isUploading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
