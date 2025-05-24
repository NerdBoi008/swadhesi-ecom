'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

// Import your centralized Zustand store
import useAttributeDataStore from '@/lib/store/network-attributes-data-store'

// // Form validation schema
// const attributeFormSchema = z.object({
//   id: z.string().optional(), // ID is present for existing attributes
//   name: z.string().min(1, "Attribute name is required"),
//   displayOrder: z.preprocess( // Handles empty string for number input
//     (val) => (val === '' ? undefined : Number(val)),
//     z.number().int().optional()
//   ),
//   values: z.array(
//     z.object({
//       id: z.string().optional(), // ID is present for existing values
//       value: z.string().min(1, "Value is required"),
//       displayOrder: z.preprocess( // Handles empty string for number input
//         (val) => (val === '' ? undefined : Number(val)),
//         z.number().int().optional()
//       )
//     })
//   ).min(1, "At least one value is required")
// })

// Form validation schema
const attributeFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Attribute name is required"),
  displayOrder: z.number().int().optional(),
  values: z.array(
    z.object({
      id: z.string().optional(),
      value: z.string().min(1, "Value is required"),
      displayOrder: z.number().int().optional()
    })
  ).min(1, "At least one value is required")
})

type AttributeFormValues = z.infer<typeof attributeFormSchema>

export default function EditAttributePage() {
  const router = useRouter()
  const params = useParams()
  // Ensure attributeId is always a string or undefined for type safety
  const attributeId = typeof params.id === 'string' ? params.id : undefined;

  // Destructure state and actions from your Zustand store
  const { attributes, loading, error, fetchAttributes, updateAttributeAndValues } = useAttributeDataStore();

  const form = useForm<AttributeFormValues>({
    resolver: zodResolver(attributeFormSchema),
    defaultValues: {
      name: '',
      displayOrder: undefined,
      values: [{ id: undefined, value: '', displayOrder: undefined }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "values"
  })

  // --- Data Loading and Form Pre-population ---
  useEffect(() => {
    // If we have an attributeId but no attributes are loaded yet, trigger a fetch.
    // This handles cases where the page is directly accessed or the store is empty.
    if (attributeId && !attributes.length && !loading && !error) {
      fetchAttributes();
    }

    // Once attributes are available and we have an ID, find the attribute and populate the form.
    if (attributeId && attributes.length > 0) {
      const attributeToEdit = attributes.find(attr => attr.id === attributeId);
      if (attributeToEdit) {
        // Reset the form with the fetched attribute's data
        form.reset({
          id: attributeToEdit.id,
          name: attributeToEdit.name,
          displayOrder: attributeToEdit.display_order ?? undefined, // Convert null to undefined for form
          values: attributeToEdit.values.map(val => ({
            id: val.id,
            value: val.value,
            displayOrder: val.display_order ?? undefined, // Convert null to undefined for form
          })),
        });
      } else if (!loading && !error) {
        // If the ID exists but the attribute isn't found after loading, it means it doesn't exist.
        toast.error("Error", { description: "Attribute not found." });
        router.push('/product-management'); // Redirect the user
      }
    }
  }, [attributeId, attributes, loading, error, fetchAttributes, form, router]);

  // --- UI for Loading/Error States ---
  if (!attributeId) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader><CardTitle>Error</CardTitle></CardHeader>
          <CardContent><p>Attribute ID not provided. Please navigate from the attributes list.</p></CardContent>
        </Card>
      </div>
    );
  }

  if (loading && !attributes.find(attr => attr.id === attributeId)) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader><CardTitle>Loading Attribute...</CardTitle></CardHeader>
          <CardContent><p>Please wait while we load the attribute details.</p></CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader><CardTitle>Error</CardTitle></CardHeader>
          <CardContent><p>Failed to load attribute: {error}</p></CardContent>
        </Card>
      </div>
    );
  }

  async function onSubmit(data: AttributeFormValues) {
    if (!attributeId) {
      toast.error("Error", { description: "Cannot update: Attribute ID is missing." });
      return;
    }

    console.log("data edti attribute: ", data);
    

    try {
      // Call the centralized store action to handle the update
      // The store action will manage all the CRUD operations for attribute and its values
      await updateAttributeAndValues(
        attributeId,
        { name: data.name, displayOrder: data.displayOrder ?? null }, // Main attribute data
        data.values // Array of attribute values (with or without IDs)
      );

      toast.success("Success", {
        description: "Attribute and its values updated successfully!",
      });

      fetchAttributes(true);

      router.push('/product-management'); // Navigate back to the attributes list on success
    } catch (error) {
      console.error("Failed to update attribute:", error);
      toast.error("Error", {
        description: "Failed to update attribute. Please try again.",
      });
    }
  }

  return (
    <div className="container mx-auto">

      <p className='text-2xl mb-3 font-bold'>Edit Attribute</p>

      <Card>
        <CardHeader>
          <CardTitle>Edit Attribute</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Attribute Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attribute Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Color, Size" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Attribute Display Order Field */}
              <FormField
                control={form.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attribute Display Order (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 1"
                        {...field}
                        value={field.value ?? ''} // Display empty string for undefined/null
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Attribute Values Section */}
              <div className="space-y-4 border p-4 rounded-md">
                <h2 className="font-medium text-lg">Attribute Values</h2>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col sm:flex-row items-start gap-4 p-2 border rounded-md bg-secondary/50">
                    {/* Value Field */}
                    <FormField
                      control={form.control}
                      name={`values.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1 w-full sm:w-auto">
                          <FormLabel className="sr-only">Value</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Red, Small" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Value Display Order Field */}
                    <FormField
                      control={form.control}
                      name={`values.${index}.displayOrder`}
                      render={({ field }) => (
                        <FormItem className="w-full sm:w-24">
                           <FormLabel className="sr-only">Value Display Order</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Order"
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Remove Value Button */}
                    {fields.length > 1 && (
                      <div className="self-end sm:self-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Value Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ value: '', displayOrder: undefined })}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Value
                </Button>
              </div>

              {/* Submit Button */}
              <Button type="submit" className='w-full sm:w-auto'>Update Attribute</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}