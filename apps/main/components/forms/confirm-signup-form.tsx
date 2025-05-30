"use client";

import React, { useTransition } from "react";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmSignUp, resendSignUpCode, signIn } from "aws-amplify/auth";
import { customerSignUpAction } from "@repo/db";

// Zod schema for the confirmation form
const confirmSignUpFormSchema = z.object({
  email: z.string().email("Please enter a valid email").trim(),
  code: z
    .string()
    .min(6, "Code must be 6 digits")
    .max(6, "Code must be 6 digits"),
});

type ConfirmSignUpFormValues = z.infer<typeof confirmSignUpFormSchema>;

interface ConfirmSignUpFormProps {
  initialEmail?: string; // Optional prop to pre-fill email
}

const ConfirmSignUpForm: React.FC<ConfirmSignUpFormProps> = ({
  initialEmail,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams(); // Get URL search params

  // Get email from URL params if available, otherwise use initialEmail prop
  const emailFromUrl = searchParams.get("email");
  const defaultEmail = emailFromUrl || initialEmail || "";

  const form = useForm<ConfirmSignUpFormValues>({
    resolver: zodResolver(confirmSignUpFormSchema),
    defaultValues: {
      email: defaultEmail,
      code: "",
    },
  });

  async function onConfirmSubmit(values: ConfirmSignUpFormValues) {
    startTransition(async () => {
      try {
        // Step 1: Confirm signup with Cognito
        await confirmSignUp({
          username: values.email,
          confirmationCode: values.code,
        });

        // Step 2: Get stored signup data
        const storedData = sessionStorage.getItem("tempSignUpData");
        const userId = sessionStorage.getItem("tempSignUpUserId");
        const password = sessionStorage.getItem("tempSignUpPassword");

        if (!storedData || !userId || !password) {
          throw new Error("Required signup data not found");
        }

        // Step 3: Create database record
        const signUpData = JSON.parse(storedData);
        const result = await customerSignUpAction(signUpData);

        if (!result.success) {
          throw new Error(result.message || "Failed to create user record");
        }

        // Step 4: Auto sign in
        const { nextStep } = await signIn({
          username: values.email,
          password: password,
        });

        if (nextStep.signInStep === "DONE") {
          toast.success("Account Created Successfully!", {
            description: "Welcome to our platform!",
          });
          router.push("/");
        } else {
          toast.success("Account Confirmed!", {
            description: "Please sign in to continue.",
          });
          router.push("/login");
        }

        // Step 5: Clean up stored data
        sessionStorage.removeItem("tempSignUpData");
        sessionStorage.removeItem("tempSignUpUserId");
        sessionStorage.removeItem("tempSignUpPassword");
      } catch (error: any) {
        console.error("Confirmation Error:", error);
        toast.error("Confirmation Failed", {
          description: error.message || "Please try again",
        });
      }
    });
  }

  // For resend code
  async function onResendCode(email: string) {
    try {
      await resendSignUpCode({ username: email });
      toast("Code Resent!", {
        description: "Please check your email for the new code.",
      });
    } catch (error: any) {
      console.error("Client-side Resend Code Error:", error);
      toast.error("Resend Failed", { description: error.message });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onConfirmSubmit)}
        noValidate
        className="space-y-6"
      >
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
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                  disabled={!!emailFromUrl}
                />
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
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  {...field}
                  maxLength={6}
                />
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
          onClick={() => onResendCode(form.getValues("email"))}
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
        <Button type="submit" className="w-full" disabled={isPending}>
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
};

export default ConfirmSignUpForm;
