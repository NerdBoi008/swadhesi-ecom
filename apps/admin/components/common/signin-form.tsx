"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignInSubmit = async ({
    email,
    password,
  }: z.infer<typeof formSchema>) => {
    try {
      const result = await signIn({ username: email, password: password });

      console.log("Sign in result:", result); // Keep for debugging if needed

      if (result.isSignedIn) {
        toast.success("Login successful", {
          // Use toast.success for success
          description: "You have been logged in successfully.",
        });
        router.push("/"); // Redirect to the home page or dashboard
      } else if (result.nextStep) {
        // Handle next steps required for sign-in
        switch (result.nextStep.signInStep) {
          case "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED":
            console.log("Redirecting to set new password for:", email);
            toast.info("New Password Required", {
              description: "Please set a new password to complete sign-in.",
            });
            router.push(
              `/sign-in/confirm-new-password?email=${encodeURIComponent(email)}`
            );
            break;

          case "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE":
            // Handle custom challenge
            toast.info("Custom Challenge Required", {
              description: "Please complete the custom challenge.",
            });
            // Redirect or update UI for custom challenge
            // router.push(`/custom-challenge?email=${encodeURIComponent(email)}`);
            break;
          
          case "CONFIRM_SIGN_IN_WITH_EMAIL_CODE":
            // Handle sign in with email code
            toast.info("Email confirmation required", {
              description: "Please provide code from your provided email.",
            });
            // Redirect or update UI for custom challenge
            // router.push(`/custom-challenge?email=${encodeURIComponent(email)}`);
            break;

          case "RESET_PASSWORD":
            // This step usually follows a forgotPassword request,
            // might be less common directly after signIn but handle defensively.
            toast.info("Password Reset Required", {
              description: "Please reset your password.",
            });
            router.push(`/reset-password?email=${encodeURIComponent(email)}`);
            break;

          case "CONFIRM_SIGN_UP":
            // User might exist but isn't confirmed.
            toast.info("Account Confirmation Required", {
              description: "Please confirm your account first.",
            });
            router.push(`/confirm-signup?email=${encodeURIComponent(email)}`);
            break;

          // Indicates sign-in process is complete (should have been caught by isSignedIn=true)
          // Or if there are unexpected scenarios.
          case "DONE":
            // This case should ideally not be reached if isSignedIn was false.
            // Log it if it happens.
            console.warn(
              "Sign in returned DONE step but isSignedIn was false."
            );
            toast.error("Sign In Status Unclear", {
              description: "Received an unexpected status. Please try again.",
            });
            break;

          default:
            console.error("Unhandled next step:", result.nextStep.signInStep);
            toast.error("Login requires an unexpected step", {
              description: `Next step: ${result.nextStep.signInStep}. Please contact support.`,
            });
        }
      } else {
        // This case (no error, not signed in, no next step) should be rare with Amplify v6+
        console.error(
          "Sign in attempt did not complete and provided no next step."
        );
        toast.error("Login Incomplete", {
          description:
            "The login process could not be completed. Please try again.",
        });
      }
    } catch (error: any) {
      // Type error explicitly
      console.error("Login error caught:", error);

      // Provide more specific error messages if possible
      let description = "An unexpected error occurred during login.";
      if (error.name === "UserNotFoundException") {
        description = "Incorrect username or password."; // More user-friendly
      } else if (error.name === "NotAuthorizedException") {
        description = "Incorrect username or password.";
      } else if (error.name === "UserNotConfirmedException") {
        description =
          "Account is not confirmed. Please check your email or sign up again.";
        // Optionally redirect to confirmation page
        // router.push(`/confirm-signup?email=${encodeURIComponent(form.getValues('email'))}`);
      } else if (error.message) {
        description = error.message; // Use Amplify's message if available
      }

      toast.error("Login Error", { description });
    } finally {
      // Ensure isLoading is always reset, regardless of success, error, or next step
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {/* --- Modified form onSubmit --- */}
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                setIsLoading(true); // Set loading state IMMEDIATELY
                // Use handleSubmit which validates and then calls our refined function
                form.handleSubmit(handleSignInSubmit)();
              }}
              className="space-y-6"
            >
              <div className="flex flex-col gap-6">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          {...field}
                          type="email"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        {/* TODO: Implement Forgot Password Link */}
                        <a
                          href="/forgot-password" // Link to your forgot password page
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            disabled={isLoading}
                            className="pr-10" // Keep padding for the icon
                          />
                        </FormControl>
                        <button
                          type="button"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          } // Accessibility
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary disabled:opacity-50" // Style disabled state
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading} // Disable button when loading
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && ( // Conditional rendering is slightly cleaner
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>

                {/* Google Login Button (Placeholder - implement functionality separately) */}
                {/* TODO: Implement Google Sign In */}
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    // Add your federated sign-in logic here
                    // e.g., signInWithRedirect({ provider: 'Google' });
                    toast.info("Google Login not implemented yet.");
                  }}
                >
                  {isLoading ? ( // Show loader if main form is loading, maybe disable?
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                {/* TODO: Link to your Sign Up page */}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
