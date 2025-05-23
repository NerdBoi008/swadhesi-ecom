"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ImageIcon,
  FolderIcon,
  FolderOpenIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SaveIcon,
  XIcon,
  Loader2,
  ChevronsDownUpIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { addCategory, generateBucketKey, uploadImageToS3 } from "@repo/db";
import { Category } from "@repo/types";
import Image from "next/image";
import useCategoryDataStore from "@/lib/store/network-category-data-store";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  parentId: z.string().nullable().optional(),
  description: z.string().optional(),
  imageUrl: z
    .union([
      z.string().url("Invalid URL").optional(),
      z.literal(""),
      z.null(),
      z.undefined(),
    ])
    .transform((e) => (e === "" ? undefined : e)),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export type CategoryNode = Category & { children?: CategoryNode[] };

export function buildCategoryTree(
  categories: ReadonlyArray<Category>
): CategoryNode[] {
  const categoryMap: Record<string, CategoryNode> = {};
  const rootCategories: CategoryNode[] = [];

  categories.forEach((category) => {
    categoryMap[category.id] = { ...category, children: [] };
  });

  categories.forEach((category) => {
    const node = categoryMap[category.id];
    if (!node) return;

    if (category.parent_id === null || category.parent_id === undefined) {
      rootCategories.push(node);
    } else {
      const parent = categoryMap[category.parent_id];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(node);
      }
    }
  });
  return rootCategories;
}

const CategoryTreeItem = ({
  category,
  onSelect,
  selectedId,
  level = 0,
  closePopover,
}: {
  category: CategoryNode;
  onSelect: (id: string | null) => void;
  selectedId: string | null;
  level?: number;
  closePopover: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = (category.children ?? []).length > 0;

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelectClick = () => {
    onSelect(category.id);
    closePopover();
  };

  return (
    <div className="space-y-1">
      <div
        className={`flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer ${selectedId === category.id ? "bg-accent text-accent-foreground font-medium" : ""}`}
        style={{ paddingLeft: `${level * 16 + (hasChildren ? 0 : 28)}px` }}
        onClick={handleSelectClick}
      >
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 mr-1 flex-shrink-0"
            onClick={handleToggleClick}
          >
            {isOpen ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </Button>
        )}
        <span className="flex items-center flex-grow min-w-0">
          {hasChildren ? (
            isOpen ? (
              <FolderOpenIcon className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
            ) : (
              <FolderIcon className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
            )
          ) : (
            <FolderIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
          )}
          <span className="truncate">{category.name}</span>
        </span>
      </div>

      {isOpen && hasChildren && (
        <div className="space-y-1">
          {category.children?.map((child) => (
            <CategoryTreeItem
              key={child.id}
              category={child}
              onSelect={onSelect}
              selectedId={selectedId}
              level={level + 1}
              closePopover={closePopover}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Add Category Page Component ---
export default function AddCategoryPage() {
  // State for controlling the Popover open state
  const [isParentPopoverOpen, setIsParentPopoverOpen] = useState(false);
  const [isLoadingInitially, setIsLoadingInitially] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const storeCategories = useCategoryDataStore((state) => state.categories);
  const fetchCategories = useCategoryDataStore((state) => state.fetchCategories);
  const storeLoading = useCategoryDataStore((state) => state.loading);

  // Ref for the hidden file input
  const imageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      parentId: undefined,
      description: "",
      imageUrl: undefined,
    },
  });

  // Effect to clean up image preview URL when selectedFile changes or component unmounts
  useEffect(() => {
    if (!selectedFile && imagePreviewUrl) {
      // If selectedFile becomes null and there's a preview, clean it up
      setImagePreviewUrl(null);
    }
    // Cleanup function to revoke the data URL when the component unmounts or selectedFile changes
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [selectedFile, imagePreviewUrl]);

  // Fetch categories on mount
  useEffect(() => {
    setIsLoadingInitially(true);
    setFetchError(null);
    fetchCategories(false)
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
        setFetchError(error?.message || "Failed to load categories.");
      })
      .finally(() => {
        setIsLoadingInitially(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCategories]);

  const categoryTree = useMemo(
    () =>
      buildCategoryTree(
        storeCategories.map((category) => ({
          ...category,
          image_url: category.image_url ?? undefined, // Convert null to undefined
          description: category.description ?? undefined, // Convert null to undefined
        }))
      ),
    [storeCategories]
  );

  const categoryNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    const traverse = (nodes: CategoryNode[]) => {
      nodes.forEach((node) => {
        map[node.id] = node.name;
        if (node.children) traverse(node.children);
      });
    };
    traverse(categoryTree);
    return map;
  }, [categoryTree]);

  const getCategoryName = useCallback(
    (id: string | null | undefined): string | undefined => {
      if (!id) return undefined;
      return categoryNameMap[id];
    },
    [categoryNameMap]
  );

  // Handles file selection and preview (No upload here)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Clear previous file and preview if no file is selected
    if (!file) {
      setSelectedFile(null);
      setImagePreviewUrl(null);
      return;
    }

    // Client-side validation
    if (file.size > 500 * 1024) {
      form.setError("imageUrl", {
        type: "manual",
        message: "File size exceeds 500kb.",
      });
      toast.error("File size exceeds 500kb.");
      setSelectedFile(null);
      setImagePreviewUrl(null);
      // Clear the file input value so the same file can be selected again
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      return;
    }
    if (!file.type.startsWith("image/")) {
      form.setError("imageUrl", {
        type: "manual",
        message: "Only images are allowed.",
      });
      toast.error("Only images are allowed.");
      setSelectedFile(null);
      setImagePreviewUrl(null);
      // Clear the file input value
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      return;
    }

    // If validation passes, set the selected file and generate preview
    form.clearErrors("imageUrl"); // Clear any previous image errors
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      // Revoke previous preview URL if it exists to free up memory
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    form.setValue("imageUrl", undefined, { shouldValidate: true }); // Clear form value until upload
  };

  const onSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true);
    let finalImageUrl: string | null = null; // Initialize image URL to null

    // If a file is selected, attempt to upload it before creating the category
    if (selectedFile) {
      const categoryName = form.getValues("name"); // Name is required for bucket key

      // Ensure category name is present (Zod also validates this, but good for explicit check before upload)
      if (!categoryName) {
        form.setError("name", {
          type: "manual",
          message: "Category name is required to upload an image.",
        });
        toast.error("Category name is required before uploading an image.");
        setIsSubmitting(false);
        return;
      }

      toast.info("Uploading image...", { id: "upload-toast" });
      try {
        const uploadedUrl = await uploadImageToS3(
          selectedFile,
          generateBucketKey("categoryImage", categoryName)
        );

        if (!uploadedUrl) {
          throw new Error("Upload failed: No URL returned from S3.");
        }
        z.string().url().parse(uploadedUrl); // Validate the URL format

        finalImageUrl = uploadedUrl;
        toast.success("Image uploaded successfully!", { id: "upload-toast" });
      } catch (error) {
        console.error("Image upload failed during submission:", error);
        const message =
          error instanceof Error ? error.message : "Failed to upload image.";
        form.setError("imageUrl", { type: "manual", message });
        toast.error(`Image Upload Failed: ${message}`, { id: "upload-toast" });
        setIsSubmitting(false);
        return; // Stop submission if image upload fails
      }
    }

    // Prepare category data with the final image URL (either null or the S3 URL)
    const categoryData = {
      name: data.name,
      parent_id: data.parentId ?? null,
      description: data.description || null,
      image_url: finalImageUrl, // Use the uploaded URL or null
    };

    try {
      toast.loading("Creating category...", { id: "category-toast" });
      const newCategory = await addCategory(categoryData);

      if (newCategory) {
        toast.success("Category created successfully", {
          id: "category-toast",
          description: `"${newCategory.name}" has been added.`,
        });
        form.reset(); // This will also clear form.imageUrl
        setImagePreviewUrl(null);
        setSelectedFile(null);
        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
        fetchCategories(true); // Refresh category list
      } else {
        // This case might indicate the category was added but the server response was unexpected.
        toast.warning(
          "Category might have been added, but no confirmation was received.",
          { id: "category-toast" }
        );
      }
    } catch (error) {
      console.error("Failed to add category:", error);
      const message =
        error instanceof Error ? error.message : "Unknown error occurred.";

      // If image was uploaded but category creation failed, inform the user.
      if (finalImageUrl) {
        toast.error(
          `Failed to create category: ${message}. The image was uploaded, but category creation failed. You might need to manually remove the image from storage if this issue persists. Image path: ${finalImageUrl}`,
          { id: "category-toast", duration: 10000 }
        );
      } else {
        toast.error(`Failed to add category: ${message}`, {
          id: "category-toast",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if the 'Choose Image' button should be disabled
  const isChooseImageDisabled = isSubmitting;

  return (
    <div className="space-y-6">
      {/* ... (header) ... */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., T-Shirts, Sneakers"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* === Parent Category Popover Selector === */}{" "}
              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <FormLabel>Parent Category (optional)</FormLabel>
                      {storeLoading && !isLoadingInitially && (
                        <span className="text-sm text-muted-foreground">
                          <Loader2 className="mr-1 h-3 w-3 animate-spin inline" />
                          Updating...
                        </span>
                      )}
                    </div>
                    <Popover
                      open={isParentPopoverOpen}
                      onOpenChange={setIsParentPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={isParentPopoverOpen}
                            className={`w-full justify-between ${!field.value ? "text-muted-foreground" : ""}`}
                            disabled={
                              isSubmitting ||
                              isLoadingInitially ||
                              storeLoading
                            }
                          >
                            {field.value
                              ? getCategoryName(field.value)
                              : "Select a parent category"}
                            <ChevronsDownUpIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        {/* Button to select "No Parent" */}
                        <Button
                          variant={!field.value ? "secondary" : "ghost"}
                          className="w-full justify-start rounded-none border-b px-3 py-2"
                          onClick={() => {
                            field.onChange(null);
                            setIsParentPopoverOpen(false);
                          }}
                        >
                          No Parent (Root Category)
                        </Button>
                        {/* Scrollable area for the tree */}
                        <ScrollArea className="max-h-64">
                          <div className="p-2">
                            {!categoryTree.length && !storeLoading && (
                              <div className="p-4 text-center text-sm text-muted-foreground">
                                No categories found.
                              </div>
                            )}
                            {/* Render Tree Items */}
                            {categoryTree.map((category) => (
                              <CategoryTreeItem
                                key={category.id}
                                category={category}
                                onSelect={(id) => {
                                  field.onChange(id);
                                }}
                                selectedId={field.value ?? null}
                                closePopover={() =>
                                  setIsParentPopoverOpen(false)
                                }
                              />
                            ))}
                          </div>
                        </ScrollArea>
                      </PopoverContent>
                    </Popover>

                    {/* Display selected parent clearly (optional) */}
                    {field.value && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <span>Selected Parent:</span>
                        <Badge variant="secondary">
                          {getCategoryName(field.value) ?? "Unknown Category"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={() => field.onChange(null)}
                          disabled={isSubmitting}
                          aria-label="Clear parent category"
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief description of this category"
                        {...field}
                        value={field.value ?? ""}
                        disabled={isSubmitting} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl" // This field in the form will hold the S3 URL *after* successful submission
                render={(
                  { field } // field.value here would be an existing URL if editing, or after submission
                ) => (
                  <FormItem>
                    <FormLabel>Category Image (optional)</FormLabel>
                    <FormControl>
                      <div>
                        <input
                          type="file"
                          id="imageUpload"
                          ref={imageInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange} 
                          disabled={isChooseImageDisabled}
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => imageInputRef.current?.click()}
                            disabled={isChooseImageDisabled} 
                          >
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Choose Image
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    {/* Display selected file name before submission */}
                    {selectedFile && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Selected: {selectedFile.name} (
                        {(selectedFile.size / 1024).toFixed(2)} KB)
                      </div>
                    )}
                    {/* Display image preview */}
                    {imagePreviewUrl && (
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Preview:
                        </p>
                        <div className="relative w-48 h-48">
                          <Image
                            src={imagePreviewUrl}
                            alt="Preview"
                            fill
                            sizes="12rem"
                            className="object-contain rounded-md border"
                          />
                        </div>
                      </div>
                    )}
                    {/* Display the uploaded URL from form state (e.g., if editing or after successful save if form not reset) */}
                    {field.value && ( // field.value is the actual S3 URL stored in the form
                      <div className="mt-2 text-xs text-muted-foreground break-all">
                        Uploaded URL: {field.value}
                      </div>
                    )}
                    <FormMessage />
                    {/* For errors related to image (e.g. S3 upload failure) */}
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  form.reset();
                  setImagePreviewUrl(null);
                  setSelectedFile(null);
                  if (imageInputRef.current) {
                    imageInputRef.current.value = "";
                  }
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || storeLoading}>
                {isSubmitting ? ( // Combined loading state for upload + save
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <SaveIcon className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Saving..." : "Create Category"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
