'use client'

import React, { useTransition } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation'; 

import { confirmCustomerSignUpAction, resendSignUpCodeAction } from '@repo/db'; // Import new actions

// Zod schema for the confirmation form
const confirmSignUpFormSchema = z.object({
    email: z.string().email('Please enter a valid email').trim(),
    code: z.string().min(6, 'Code must be 6 digits').max(6, 'Code must be 6 digits'),
});

type ConfirmSignUpFormValues = z.infer<typeof confirmSignUpFormSchema>;

interface ConfirmSignUpFormProps {
    initialEmail?: string; // Optional prop to pre-fill email
}

const ConfirmSignUpForm: React.FC<ConfirmSignUpFormProps> = ({ initialEmail }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const searchParams = useSearchParams(); // Get URL search params

    // Get email from URL params if available, otherwise use initialEmail prop
    const emailFromUrl = searchParams.get('email');
    const defaultEmail = emailFromUrl || initialEmail || '';

    const form = useForm<ConfirmSignUpFormValues>({
        resolver: zodResolver(confirmSignUpFormSchema),
        defaultValues: {
            email: defaultEmail,
            code: "",
        },
    });

    // Handle form submission
    async function onSubmit(values: ConfirmSignUpFormValues) {
        startTransition(async () => {
            const result = await confirmCustomerSignUpAction(values);

            if (result.success) {
                toast.success("Account Confirmed!", {
                    description: result.message,
                });
                form.reset();
                router.push('/'); // Redirect to home page
            } else {
                toast.error("Confirmation Failed", {
                    description: result.message,
                });
                form.setError("root.serverError", {
                    type: "manual",
                    message: result.message,
                });
            }
        });
    }

    // Handle resending confirmation code
    async function onResendCode() {
        const email = form.getValues('email'); // Get current email from form
        if (!email) {
            toast.error("Error", { description: "Please enter your email to resend the code." });
            return;
        }

        startTransition(async () => {
            const result = await resendSignUpCodeAction(email);
            if (result.success) {
                toast.success("Code Resent!", {
                    description: result.message,
                });
            } else {
                toast.error("Failed to Resend Code", {
                    description: result.message,
                });
            }
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Confirm Your Account</h2>
                <p className="text-center text-sm text-muted-foreground">
                    A 6-digit confirmation code has been sent to your email address.
                </p>

                {/* Email Field (pre-filled and maybe disabled) */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="email@example.com" {...field} disabled={!!emailFromUrl} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Confirmation Code Field */}
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmation Code</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter 6-digit code" {...field} maxLength={6} />
                            </FormControl>
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

                {/* Resend Code Button */}
                <Button
                    type="button"
                    variant="link"
                    onClick={onResendCode}
                    disabled={isPending}
                    className="text-sm self-start p-0"
                >
                    {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Resend Code"
                    )}
                </Button>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className='w-full'
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Confirming...
                        </>
                    ) : (
                        "Confirm Account"
                    )}
                </Button>
            </form>
        </Form>
    );
}

export default ConfirmSignUpForm;