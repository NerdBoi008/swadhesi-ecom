"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useForm } from "react-hook-form";
import { PasswordInput } from "../common/password-input";
import { Checkbox } from "../ui/checkbox";
import { GoogleIcon } from "@/public/icons/google-logo-color";
import { useTransition } from "react";
import { toast } from "sonner";
import { fetchUserProfile } from "@repo/db";
import { useRouter } from "next/navigation";
import useUserProfileStore from "@/lib/store/user-profile-store";
import {
  fetchAuthSession,
  signIn,
  signOut,
} from "aws-amplify/auth";

const logInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof logInFormSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const setUser = useUserProfileStore((state) => state.setUser);
  const setAuthStatus = useUserProfileStore((state) => state.setAuthStatus);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    startTransition(async () => {
      try {
        const { nextStep } = await signIn({
          username: values.email,
          password: values.password,
        });

        if (nextStep.signInStep === "DONE") {
          toast("Sign In Successful!", { description: "Welcome back!" });
          form.reset();

          const idToken = (
            await fetchAuthSession()
          ).tokens?.idToken?.toString();

          if (!idToken) {
            throw new Error("Could not retrieve ID token after sign in.");
          }

          const profileResult = await fetchUserProfile(idToken); // Pass headers to server action

          if (profileResult.success && profileResult.user) {
            const transformedUser = {
              ...profileResult.user,
              phone:
                profileResult.user.phone === null
                  ? undefined
                  : profileResult.user.phone,
              notes:
                profileResult.user.notes === null
                  ? undefined
                  : profileResult.user.notes,
              last_login:
                profileResult.user.last_login === null
                  ? undefined
                  : profileResult.user.last_login,
              status: profileResult.user.status,
              total_spent:
                profileResult.user.total_spent === null
                  ? undefined
                  : typeof profileResult.user.total_spent === "object" &&
                      "toNumber" in profileResult.user.total_spent
                    ? profileResult.user.total_spent
                    : Number(profileResult.user.total_spent),
              order_count:
                profileResult.user.order_count === null
                  ? undefined
                  : profileResult.user.order_count,
              notification_preferences: profileResult.notificationPreferences || {
                id: "",
                customer_id: "",
                email: false,
                sms: false,
                marketing: false,
                order_updates: false,
                promotions: false,
                newsletters: false,
                feedback_requests: false,
                account_notifications: false,
              },
              
            };
            setUser(transformedUser);
            setAuthStatus(true);
            router.push("/");
          } else {
            // Handle failure to fetch profile after sign-in
            toast.error("Failed to load profile", {
              description: profileResult.message,
            });
            // You might want to sign out here if profile fetch fails
            await signOut();
          }
        } else if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
          toast.warning("Account not confirmed.", {
            description: "Please confirm your account to sign in.",
          });
          router.push(
            `confirm-signup?email=${encodeURIComponent(values.email)}`
          );
        } else {
          toast.error("Sign In Failed", {
            description: `Additional steps required: ${nextStep.signInStep}`,
          });
        }
      } catch (error: any) {
        console.error("Client-side Sign In Error:", error);
        toast.error("Sign In Failed", {
          description:
            error.message || "An unexpected error occurred during sign in.",
        });
        form.setError("root.serverError", {
          type: "manual",
          message: error.message,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-8 ${className}`}
        {...props}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          {/* Use <p> tag for paragraph text */}
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  autoComplete="email"
                  {...field}
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
                <Link
                  href="/forgot-password" // Use a real path
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput
                  placeholder="••••••••"
                  field={field}
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Remember Me Checkbox */}
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="grid gap-1.5 leading-none">
                <FormLabel className="font-normal cursor-pointer">
                  Remember me
                </FormLabel>
                <FormDescription className="text-xs text-muted-foreground">
                  Saves your login info into cookies for using next time.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isPending} // Disable button while loading
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>

        {/* Separator */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* Social Login Button (Google) */}
        <Button
          type="button" // Important: Prevents submitting the form
          variant={"outline"}
          className="w-full"
        >
          <span className="mr-2">
            <GoogleIcon height={18} width={18} />
          </span>
          Login with Google
        </Button>

        {/* Sign Up Link */}
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
