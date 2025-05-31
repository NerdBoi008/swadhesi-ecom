"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { resetPassword, confirmResetPassword } from "aws-amplify/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react"; // Assuming you have lucide-react for icons
import { useRouter, useSearchParams } from "next/navigation";

// --- Schemas (remain the same as they already handle the matching logic) ---
export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    code: z.string().min(1, "Verification code is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(), // No default value, user will type
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ForgotPasswordForm() {
const searchParams = useSearchParams();


  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [email, setEmail] = useState("");

  // State for password visibility toggles
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requestForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
      newPassword: "",
      confirmPassword: "", // Explicitly empty, user will fill
    },
  });

  // Request password reset
  const onRequestReset = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      await resetPassword({ username: values.email });
      setEmail(values.email);
      setCodeSent(true);
      toast.success("Code Sent!", {
        description: "Please check your email for the verification code.",
      });

      // --- REMOVED: Auto-population logic for confirmPassword ---
      // const newP = resetForm.getValues("newPassword");
      // if (newP) {
      //   resetForm.setValue("confirmPassword", newP, { shouldValidate: true });
      // }
    } catch (error: any) {
      console.error("Password reset request error:", error);
      toast.error("Request Failed", {
        description: error.message || "Failed to send reset code",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Confirm password reset
  const onConfirmReset = async (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      if (!values.code) {
        throw new Error(
          "Please enter the verification code sent to your email"
        );
      }

      await confirmResetPassword({
        username: email,
        confirmationCode: values.code.trim(), // Trim any whitespace
        newPassword: values.newPassword,
      });

      toast.success("Password Reset!", {
        description: "You can now login with your new password.",
      });

      // Reset forms and state
      requestForm.reset();
      resetForm.reset();
      setCodeSent(false);
      setEmail("");
      setShowNewPassword(false);
      setShowConfirmPassword(false);

      // Redirect to login page
      router.push("/login");
    } catch (error: any) {
      console.error("Password reset confirmation error:", error);

      // More specific error messages
      if (error.message.includes("Invalid verification code")) {
        toast.error("Invalid Code", {
          description:
            "The verification code you entered is incorrect. Please try again.",
        });
      } else {
        toast.error("Reset Failed", {
          description: error.message || "Failed to reset password",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!codeSent) {
    return (
      <Form {...requestForm}>
        <form
          onSubmit={requestForm.handleSubmit(onRequestReset)}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">
            Forgot Your Password?
          </h2>
          <p className="text-center text-sm text-muted-foreground">
            No worries! Just enter your email address below, and we&apos;ll send
            you a verification code to reset your password.
          </p>
          <FormField
            control={requestForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Sending...
              </>
            ) : (
              "Send Reset Code"
            )}
          </Button>
        </form>
      </Form>
    );
  }

  {console.log("Current code field value:", resetForm.getValues())}
  
  // --- Password Reset Form (when codeSent is true) ---
  return (
      <Form {...resetForm}>
      <form
        onSubmit={resetForm.handleSubmit(onConfirmReset)}
        className="space-y-4"
        >
        <h2 className="text-2xl font-bold text-center">Reset Your Password</h2>
        <p className="text-center text-sm text-muted-foreground">
          Enter the verification code sent to{" "}
          <span className="font-semibold text-primary">{email}</span>.
        </p>

        <FormField
  control={resetForm.control}
  name="code" // <--- This looks correct, it's bound to 'code'
  render={({ field }) => (
    <FormItem>
      <FormLabel>Verification Code</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter code from email"
          {...field} // <--- This correctly spreads field.value, field.onChange, etc.
          disabled={isLoading}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
        />

        <FormField
          control={resetForm.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    {...field}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    disabled={isLoading}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showNewPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={resetForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    {...field}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setCodeSent(false); // Go back to first step
              setEmail(""); // Clear email
              requestForm.reset(); // Reset the first form
              resetForm.reset(); // Reset the second form (clearing values, including passwords)
              setShowNewPassword(false);
              setShowConfirmPassword(false);
            }}
            disabled={isLoading}
          >
            Back to Email Entry
          </Button>
        </div>
      </form>
    </Form>
  );
}