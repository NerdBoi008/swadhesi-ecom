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
import { addProduct } from "@repo/db";
import useCategoryDataStore from "@/lib/store/network-category-data-store";
import Image from "next/image";
import { generateSkuFromName } from "@/lib/utils";

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
  attributes: z.array(
    z.object({
      attributeId: z.string().min(1, "Attribute is required"),
      values: z.array(z.string()).min(1, "At least one value is required"),
    })
  ),
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

const attributes = [
  {
    id: "attr1",
    name: "Color",
    values: [
      { id: "color-red", value: "Red" },
      { id: "color-blue", value: "Blue" },
      { id: "color-green", value: "Green" },
    ],
  },
  {
    id: "attr2",
    name: "Size",
    values: [
      { id: "size-s", value: "S" },
      { id: "size-m", value: "M" },
      { id: "size-l", value: "L" },
    ],
  },
];

export default function AddProductPage() {
  const categories = useCategoryDataStore((state) => state.categories);
  const fetchCategories = useCategoryDataStore(
    (state) => state.fetchCategories
  );
  const isCategoriesFetching = useCategoryDataStore((state) => state.loading);

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
      attributes: [],
      relatedProducts: [],
    },
  });

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories(false).catch((error) => {
      console.error("Failed to fetch categories:", error);
    });
  }, [fetchCategories]);

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
    form.setValue('name', newName);

    // Get the current variants. For simplicity, we'll update the first variant's SKU.
    // If you have multiple variants and want to update all, you'd loop through them.
    const currentVariants = form.getValues('variants');
    if (currentVariants && currentVariants.length > 0) {
      const generatedSku = generateSkuFromName(newName);
      // Ensure that setting the value for nested arrays is type-safe
      form.setValue(`variants.0.sku`, generatedSku, { shouldValidate: true }); // Optionally validate on change
    }
  }

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

  // Upload file to S3
  const uploadToS3 = async (file: File): Promise<string> => {
    // Get presigned URL from your backend
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
      }),
    });

    const { url, fields } = await response.json();

    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("file", file);

    const uploadResponse = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Upload failed");
    }

    return `${url}/${fields.key}`;
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsUploading(true);

      // Upload thumbnail image
      let thumbnailUrl = "";
      if (data.thumbnailImage) {
        thumbnailUrl = await uploadToS3(data.thumbnailImage);
      }

      // Upload additional images
      const imageUrls = await Promise.all(
        data.images.map((file) => uploadToS3(file))
      );

      // Upload variant images if they exist
      const variantsWithImageUrls = await Promise.all(
        data.variants.map(async (variant) => {
          let imageUrl = "";
          if (variant.image) {
            imageUrl = await uploadToS3(variant.image);
          }
          return {
            ...variant,
            imageUrl,
          };
        })
      );

      // Prepare the data for your API
      const productData = {
        name: data.name,
        description: data.description,
        slug: data.slug || null,
        category_id: data.categoryId,
        brand_id: null,
        thumbnail_image_url: thumbnailUrl,
        images_url: imageUrls,
        meta_title: data.metaTitle || null,
        meta_description: data.metaDescription || null,
        related_products: data.relatedProducts || [],
      };

      // Submit to your API
      await addProduct(productData)
        .then(() => {
          toast.success(`Product ${data.name} added.`);
        })
        .catch((error) => {
          console.log("Error adding category:", error);
          toast.error("Error creating product", {
            description: `Error: ${error}`,
          });
        });

      toast.success("Product created successfully", {
        description: "Your product has been saved to the database.",
      });

      // Reset form after successful submission
      form.reset();
      setThumbnailPreview(null);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create product", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Variant management
  const addVariant = () => {
    form.setValue("variants", [
      ...form.getValues("variants"),
      {
        sku: "",
        price: 0,
        salePrice: undefined,
        stock: 0,
        size: "",
        image: undefined,
        barcode: "",
        attributeValues: [],
      },
    ]);
  };

  const removeVariant = (index: number) => {
    const variants = [...form.getValues("variants")];
    variants.splice(index, 1);
    form.setValue("variants", variants);
  };

  // Attribute management
  const addAttribute = () => {
    form.setValue("attributes", [
      ...form.getValues("attributes"),
      {
        attributeId: "",
        values: [],
      },
    ]);
  };

  const removeAttribute = (index: number) => {
    const attrs = [...form.getValues("attributes")];
    attrs.splice(index, 1);
    form.setValue("attributes", attrs);
  };

  // const onSubmit = async (data: ProductFormValues) => {
  //   const req = await addProduct({
  //     name: '',
  //     description: '',
  //     slug: null,
  //     category_id: '',
  //     thumbnail_image_url: '',
  //     images_url: [],
  //     brand_id: null,
  //     meta_title: null,
  //     meta_description: null,
  //     related_products: []
  //   });
  //   if (req.error) {
  //     toast.error("Failed to create product", {
  //       description: req.error.message,
  //     })
  //     return
  //   }
  //   toast("Product created successfully", {
  //     description: "Your product has been saved to the database.",
  //   })
  //   // Here you would typically send the data to your API
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isUploading}>
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

          {/* Variants Section */}
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
                    </div>

                    <div className="flex gap-5">
                      <FormField
                        control={form.control}
                        name={`variants.${index}.size`}
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                              <Input placeholder="M" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="mt-4">
                        <h4 className="mb-2 text-sm font-medium">Attributes</h4>
                        <FormField
                          control={form.control}
                          name={`variants.${index}.attributeValues`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-wrap gap-2">
                                  {attributes.map((attr) => (
                                    <div key={attr.id} className="space-y-2">
                                      <Label className="block">
                                        {attr.name}
                                      </Label>
                                      <Select
                                        onValueChange={(value) => {
                                          const currentValues = [
                                            ...field.value,
                                          ];
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
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addVariant}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Variant
                </Button>
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
                    form.formState.errors.attributes ? "destructive" : "outline"
                  }
                >
                  {form.formState.errors.attributes ? "Incomplete" : "Complete"}
                </Badge>
              </div>
            </CardHeader>
            {expandedSections.attributes && (
              <CardContent className="space-y-6">
                {form.watch("attributes").map((attr, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Attribute #{index + 1}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => removeAttribute(index)}
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`attributes.${index}.attributeId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attribute</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an attribute" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {attributes.map((attr) => (
                                  <SelectItem key={attr.id} value={attr.id}>
                                    {attr.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name={`attributes.${index}.values`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Values</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                  {attributes
                                    .find((a) => a.id === attr.attributeId)
                                    ?.values.map((value) => (
                                      <Button
                                        key={value.id}
                                        type="button"
                                        variant={
                                          field.value.includes(value.id)
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() => {
                                          const newValues =
                                            field.value.includes(value.id)
                                              ? field.value.filter(
                                                  (v) => v !== value.id
                                                )
                                              : [...field.value, value.id];
                                          field.onChange(newValues);
                                        }}
                                      >
                                        {value.value}
                                      </Button>
                                    ))}
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addAttribute}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Attribute
                </Button>
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
