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

// Import your centralized Zustand store
import useAttributeDataStore from '@/lib/store/network-attributes-data-store'
import { useRouter } from 'next/navigation'

// // Form validation schema
// const attributeFormSchema = z.object({
//   name: z.string().min(1, "Attribute name is required"),
//   displayOrder: z.preprocess( // Handles empty string for number input
//     (val) => (val === '' ? undefined : Number(val)),
//     z.number().int().optional()
//   ),
//   values: z.array(
//     z.object({
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
  name: z.string().min(1, "Attribute name is required"),
  displayOrder: z.number().int().optional(),
  values: z.array(
    z.object({
      value: z.string().min(1, "Value is required"),
      displayOrder: z.number().int().optional()
    })
  ).min(1, "At least one value is required")
})

type AttributeFormValues = z.infer<typeof attributeFormSchema>

export default function CreateAttributePage() {
  const form = useForm<AttributeFormValues>({
    resolver: zodResolver(attributeFormSchema),
    defaultValues: {
      name: '',
      displayOrder: undefined,
      values: [{ value: '', displayOrder: undefined }]
    }
  })

  const router = useRouter();

  // Destructure the createAttribute action from your store
  const createAttribute = useAttributeDataStore(state => state.createAttribute);
  const fetchAttributes = useAttributeDataStore(state => state.fetchAttributes);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "values"
  })

  async function onSubmit(data: AttributeFormValues) {
    try {
      // Call the centralized store action to create the attribute and its values
      // The store action handles the sequential creation and the final refetch.
      await createAttribute({
        name: data.name,
        displayOrder: data.displayOrder ?? null, // Ensure null for optional fields for database
        values: data.values.map(val => ({
          value: val.value,
          displayOrder: val.displayOrder ?? null, // Ensure null for optional fields
        }))
      });

      toast.success("Success", {
        description: "Attribute and its values created successfully!",
      });
      
      form.reset(); // Reset the form after successful submission

      fetchAttributes(true); // Refresh store state to reflect new data
      router.push('/product-management');
    } catch (error) {
      console.error("Failed to create attribute:", error); // Log the actual error for debugging
      toast.error("Error", { // Changed to toast.error for consistency with negative outcome
        description: "Failed to create attribute. Please try again.",
      });
    }
  }

  return (
    <div className="container mx-auto"> {/* Added py-8 for consistent padding */}

      <p className='text-2xl mb-3 font-bold'>Add New Attribute</p>
      <Card>
        <CardHeader>
          <CardTitle>Create New Attribute</CardTitle>
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
                    <FormLabel>Display Order (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 1"
                        {...field}
                        value={field.value ?? ''} // Ensure input displays empty string for undefined/null
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          
              {/* Attribute Values Section */}
              <div className="space-y-4 border p-4 rounded-md"> {/* Added styling for grouping */}
                <h2 className="font-medium text-lg">Attribute Values</h2> {/* Increased font size for title */}
            
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col sm:flex-row items-start gap-4 p-2 border rounded-md bg-secondary/50"> {/* Added responsive styling and bg */}
                    {/* Value Field */}
                    <FormField
                      control={form.control}
                      name={`values.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1 w-full sm:w-auto"> {/* Added flex and width */}
                          <FormLabel className="sr-only">Value</FormLabel> {/* Added sr-only label */}
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
                        <FormItem className="w-full sm:w-24"> {/* Added width for consistency */}
                           <FormLabel className="sr-only">Value Display Order</FormLabel> {/* Added sr-only label */}
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Order"
                              {...field}
                              value={field.value ?? ''} // Ensure input displays empty string for undefined/null
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                
                    {/* Remove Value Button */}
                    {fields.length > 1 && (
                      <div className="self-end sm:self-center"> {/* Aligned button */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="text-destructive hover:bg-destructive/10" // Added hover style
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
              <Button type="submit" className='w-full sm:w-auto'>Create Attribute</Button> {/* Adjusted width */}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}