"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Image as ImageIcon, X } from "lucide-react";
import useCategoryDataStore from "@/lib/store/network-category-data-store";
import { Category } from "@repo/db/types";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteImageFromS3, extractKeyFromUrl, generateBucketKey, updateCategory, uploadImageToS3, } from "@repo/db";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

// Define the validation schema using Zod
const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const categorySchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  description: z.string().optional(),
  parentId: z.string().nullable().optional(),
  imageFile: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Image size must be less than ${MAX_FILE_SIZE / 1024}KB.`,
    })
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function EditCategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const categories = useCategoryDataStore(state => state.categories);
  const fetchCategories = useCategoryDataStore(state => state.fetchCategories);

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageMarkedForRemoval, setImageMarkedForRemovel] = useState(false);

  // Initialize the form with react-hook-form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      parentId: null,
      imageFile: null,
    },
  });

  // Load category data
  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        // Refresh categories if store is empty
        if (categories.length === 0) {
          await fetchCategories();
        }

        // Find the category in the store
        const foundCategory = categories.find((c) => c.id === id);

        if (!foundCategory) {
          throw new Error("Category not found");
        }

        setCategory(foundCategory);
        form.reset({
          name: foundCategory.name,
          description: foundCategory.description || "",
          parentId: foundCategory.parent_id || null,
          imageFile: null, // Reset file input
        });

        setImagePreview(foundCategory.image_url || null);
        setImageMarkedForRemovel(false);
      } catch (err) {
        console.error("Load category error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load category"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCategory();
    } else {
      setError("No category ID provided.");
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, fetchCategories]);

  // Handle image change using form state
  const handleImageChange = (file: File | null) => {
    form.setValue("imageFile", file, { shouldValidate: true });
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // Clean up old blob URL if one existed from a previous selection in this session
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      // If file is cleared, and there was an original category image, show that.
      // Otherwise, show null.
      setImagePreview(category?.image_url || null);
    }
    setImageMarkedForRemovel(false); // Selecting a file means we are not "removing" the old one in the "remove-only" sense
  };

  const removeImage = () => {
    form.setValue("imageFile", null); // Clear any NEWLY selected file
    setImagePreview(null); // Clear UI preview
    setImageMarkedForRemovel(true);
  };

  // Handle form submission
  const onSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true);
    const toastPrefix = `category-edit-${Date.now()}`;

    try {
      if (!category) {
        throw new Error("Category data not available. Cannot update.");
      }

      let finalImageUrl: string | null = category.image_url; //Start with current image
      let oldImageS3KeyToDelete: string | null = null;

      // --- Image Handling Logic ---
      // 1. User selected a new image file to upload
      if (data.imageFile) {
        const uploadToastId = `${toastPrefix}-upload`;
        toast.loading("Uploading new image...", { id: uploadToastId });

        try {
          // If there was an old image, its S3 key should be marked for deletion
          if (category.image_url) {
            oldImageS3KeyToDelete = extractKeyFromUrl(category.image_url);
          }
          // Upload the new image; use the (potentially updated) category name for the S3 key
          const newUploadedUrl = await uploadImageToS3(
            data.imageFile,
            generateBucketKey("categoryImage", data.name.trim())
          );
          finalImageUrl = newUploadedUrl; // Update to the new image URL
          toast.success("New image uploaded successfully!", { id: uploadToastId });
        } catch (uploadError) {
          console.log("New image upload failed: ", uploadError);
          toast.error("New image upload failed. Category not updated.", {
            description: uploadError instanceof Error ? uploadError.message : "Please try again.",
            id: uploadToastId,
          });

          setIsSubmitting(false);
          return; // Stop submission if new image upload fails
        }
      }
      // 2. No new file, but user explicitly marked the existing image for removal
      else if (imageMarkedForRemoval && category.image_url) {
        oldImageS3KeyToDelete = extractKeyFromUrl(category.image_url);
        finalImageUrl = null;
        toast.info("Existing image will be removed. ", { id: `${toastPrefix}-removemark` });
      }

      // --- Update Category Details in Database ---
      const updateToastId = `${toastPrefix}-update`;
      toast.loading("Updating category details...", { id: updateToastId });
      
      const updateData = {
        name: data.name.trim(),
        description: data.description?.trim() || null,
        parent_id: data.parentId === "none" ? null : data.parentId,
        image_url: finalImageUrl,
      };

      const updatedCategory = await updateCategory(category.id, updateData);

      toast.success("Category updated successfully!", {
        description: `"${updatedCategory.name}" has been updated.`,
        id: updateToastId,
      });

      // --- S3 Cleanup for Old Image (if any) ---
      if (oldImageS3KeyToDelete) {
        try {
          await deleteImageFromS3(oldImageS3KeyToDelete);
        } catch (s3DeleteError) {
          console.error("Failed to detele old image from S3: ", s3DeleteError);
          toast.warning("Category updated, but failed to remove the old image from storage.", {
            description: "you may need to remove it manually from s3",
          })
        }
      }

      // Optional: Refresh data in parent component
      if (fetchCategories) {
        await fetchCategories(true); // Force refresh
      }

      router.back();

    } catch (err) {
      console.error("Category update process failed:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      toast.error("Update Failed", { description: errorMessage, id: `${toastPrefix}-finalerror` });
    } finally {
      setIsSubmitting(false);
      // imageMarkedForRemoval will reset if component re-initializes or user navigates away
    }
  };

  console.log("updated category data: ", form.getValues('imageFile'));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-red-500">{error}</div>
        <Button onClick={() => router.back()}>Back to Categories</Button>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div>Category not found</div>
        <Button onClick={() => router.back()}>Back to Categories</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Category: {category.name}</h1>
        <Button variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image Upload Section (Column 1) */}
        <div className="md:col-span-1 space-y-4">
          <Label htmlFor="imageFile">Category Image</Label>
          <div className="border-2 border-dashed rounded-lg p-4 min-h-[200px] flex flex-col items-center justify-center text-center">
            {imagePreview ? (
              <div className="relative group w-full max-w-xs mx-auto">
                <Image
                  src={imagePreview} // Can be blob URL or S3 URL
                  alt="Category preview"
                  className="max-h-64 w-full rounded-md object-contain"
                  width={250}
                  height={250}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 bg-white/80 hover:bg-white rounded-full p-1 h-7 w-7 text-black hover:border hover:border-orange-500"
                  onClick={removeImage}
                  disabled={isSubmitting}
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center p-4">
                <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500 mb-3">
                  No image selected.
                  <br />
                  Max 500KB. JPG, PNG, WEBP.
                </p>
                <Label
                  htmlFor="imageFile-input" // Changed from 'image' to avoid potential conflict if you have an id='image' elsewhere
                  className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm inline-block"
                >
                  Select Image
                </Label>
              </div>
            )}
          </div>
           {/* Hidden file input is now part of the FormField */}
          <FormField
            control={form.control}
            name="imageFile"
            render={({ field }) => ( // field value is managed by react-hook-form
              <FormItem className="mt-2">
                 <Input
                    id="imageFile-input" // Connect to the custom styled Label
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                    className="hidden" // Hidden, triggered by the custom label
                    onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                    disabled={isSubmitting}
                  />
                {form.formState.errors.imageFile && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.imageFile.message}
                  </p>
                )}
              </FormItem>
            )}
          />
        </div>

        {/* Form Fields Section (Column 2 & 3) */}
        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Category Name</Label>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Enter category name"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Enter category description"
                        rows={4}
                        {...field}
                        value={field.value ?? ""} // Ensure controlled component
                        disabled={isSubmitting}
                      />
                    </FormControl>
                     {form.formState.errors.description && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <Label>Parent Category (Optional)</Label>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? "none"} // Use "none" for null/undefined
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a parent category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">
                          No parent category (Root)
                        </SelectItem>
                        {categories
                          .filter((c) => c.id !== category.id) // Prevent self as parent
                          .map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                     {form.formState.errors.parentId && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.parentId.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !form.formState.isDirty && !form.getValues("imageFile") && !imageMarkedForRemoval}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}