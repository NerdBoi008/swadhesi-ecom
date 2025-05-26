'use client'

import React, { useTransition } from 'react' 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { Loader2 } from 'lucide-react';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { Checkbox } from '@/components/ui/checkbox' 
import { toast } from 'sonner'
import { PasswordInput } from '../common/password-input'
import { GoogleIcon } from '@/public/icons/google-logo-color'

const signUpFormSchema = z.object({
    firstName: z.string().min(3, 'First name must be at least 3 characters').max(20).trim(),
    lastName: z.string().min(3, 'Last name must be at least 3 characters').max(20).trim(),
    email: z.string().email('Please enter a valid email').trim(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character.' }),
    confirmPassword: z.string(),
    phone: z
        .string()
        .min(10, "Phone number seems too short")
        .regex(/^\+?[0-9\s-]{10,15}$/, "Invalid phone number format entered"),
    receiveUpdates: z.boolean().default(false),
    rememberMe: z.boolean().default(false),
    address: z.string().min(5, 'Address must be at least 5 characters').max(150).trim(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
});

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const SignUpForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpFormSchema),
        // Provide defaults for all fields
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            address: "",
            receiveUpdates: false,
            rememberMe: false,
        },
    });

    function onSubmit(values: SignUpFormValues) {
        startTransition(async () => {
            try {
                console.log("Form Values:", values);
                // --- TODO: Replace with your actual API call ---
                // Example:
                // const response = await fetch('/api/auth/signup', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify(values),
                // });
                // if (!response.ok) {
                //   const errorData = await response.json();
                //   throw new Error(errorData.message || 'Sign up failed');
                // }
                // const successData = await response.json();
                // console.log('Sign up successful:', successData);

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                // --- End API call ---

                toast("Account Created!", {
                    description: "You have successfully signed up.",
                });
                form.reset(); // Reset form on success
                // TODO: Redirect user or update UI state

            } catch (error) {
                console.error("Sign up error:", error);
                let errorMessage = "An unexpected error occurred.";
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                // Show error toast
                toast.error("Sign Up Failed", {
                    description: errorMessage,
                });
                // Optionally set form error for specific fields if API provides details
                // form.setError('root.serverError', { type: 'manual', message: errorMessage });
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
                
                <Button
                    type='button'
                    variant={'outline'}
                    className="w-full"
                >
                    <span>
                        <GoogleIcon />
                    </span>
                    Sign Up with Google
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>

                {/* Name Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder='••••••••' field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder='••••••••' field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Phone */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className='w-full '>
                            <FormLabel>Phone</FormLabel>
                            <FormControl >
                                <PhoneInput
                                    country={'in'}
                                    placeholder='Enter phone number'
                                    value={field.value}
                                    onChange={(phone, countryData, event, formattedValue) => field.onChange(formattedValue)}
                                    // Style using classes for better theme integration
                                    containerClass="w-full"
                                    inputClass="!w-full !py-2 !px-11 !border !border-input !bg-background !text-sm !text-foreground !rounded-md focus:!border-ring focus:!shadow-none disabled:!cursor-not-allowed disabled:!opacity-50" // Use Tailwind classes via inputClass prop
                                    buttonClass="!bg-background !border !border-input hover:!bg-accent" // Style dropdown button
                                    dropdownClass="!bg-popover !text-popover-foreground !border !border-border" // Style dropdown menu
                                    searchClass="!bg-background !text-foreground !border-border" // Style search input in dropdown
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Address */}
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder='123 Street, Example City' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Checkboxes */}
                <FormField
                    control={form.control}
                    name="receiveUpdates"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className='cursor-pointer'>
                                    Receive Updates
                                </FormLabel>
                                <FormDescription>
                                    Receive emails about new products, offers, etc.
                                </FormDescription>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div>
                                <FormLabel className='font-normal cursor-pointer'>
                                    Remember me
                                </FormLabel>
                                <FormDescription>
                                    Saves your login into cookies for using next time.
                                </FormDescription>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Display Root/Server Errors */}
                {form.formState.errors.root?.serverError && (
                    <FormMessage className="text-destructive font-semibold">
                        {form.formState.errors.root.serverError.message}
                    </FormMessage>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    className='w-full'
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </Button>

                {/* Link to Login */}
                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                        Log in
                    </Link>
                </div>
            </form>
        </Form>
    )
}

export default SignUpForm;