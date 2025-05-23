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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "values"
  })

  async function onSubmit(data: AttributeFormValues) {
    try {
      // await createAttribute({
      //   name: data.name,
      //   display_order: data.displayOrder || null,
      //   values: data.values.map(v => ({
      //     value: v.value,
      //     display_order: v.displayOrder || null
      //   }))
      // })
      
      toast("Success", {
        description: "Attribute created successfully",
      })
      
      form.reset()
    } catch (error) {
      toast.warning("Error", {
        description: "Failed to create attribute",
      })
    }
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Attribute</CardTitle>
        </CardHeader>
        <CardContent>
    
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          
              <div className="space-y-4">
                <h2 className="font-medium">Attribute Values</h2>
            
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-4">
                    <FormField
                      control={form.control}
                      name={`values.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="e.g. Red, Small" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                
                    <FormField
                      control={form.control}
                      name={`values.${index}.displayOrder`}
                      render={({ field }) => (
                        <FormItem className="w-24">
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Order"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <TrashIcon className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
            
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ value: '', displayOrder: undefined })}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Value
                </Button>
              </div>
          
              <Button type="submit" className='ml-auto'>Create Attribute</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}