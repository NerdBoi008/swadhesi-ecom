"use client";

import React, { useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import { Loader2 } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { PasswordInput } from "../common/password-input";
import { GoogleIcon } from "@/public/icons/google-logo-color";
import { customerSignUpAction } from "@repo/db";
import { useRouter } from "next/navigation";
import { signOut, signUp } from "aws-amplify/auth";

enum AddressType {
  Shipping = "Shipping",
  Billing = "Billing",
  Both = "Both",
}

// Define the Zod schema for the sign-up form
const signUpFormSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters")
      .max(20)
      .trim(),
    lastName: z
      .string()
      .min(3, "Last name must be at least 3 characters")
      .max(20)
      .trim(),
    email: z.string().email("Please enter a valid email").trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string(),
    phone: z
      .string()
      .min(10, "Phone number seems too short")
      .regex(/^\+?[0-9\s-]{10,15}$/, "Invalid phone number format entered"),
    recipientName: z
      .string()
      .min(3, "Recipient name must be at least 3 characters")
      .max(50)
      .trim(),
    street: z
      .string()
      .min(5, "Street address must be at least 5 characters")
      .max(100)
      .trim(),
    city: z
      .string()
      .min(2, "City must be at least 2 characters")
      .max(50)
      .trim(),
    state: z
      .string()
      .min(2, "State must be at least 2 characters")
      .max(50)
      .trim(),
    postalCode: z
      .string()
      .min(3, "Postal code must be at least 3 characters")
      .max(10)
      .trim(),
    country: z
      .string()
      .min(2, "Country must be at least 2 characters")
      .max(50)
      .trim(),
    isDefaultAddress: z.boolean().default(true),
    addressType: z.nativeEnum(AddressType).default(AddressType.Shipping),
    receiveUpdates: z.boolean().default(false),
    rememberMe: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// Infer the type from the schema
type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      recipientName: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      isDefaultAddress: true,
      addressType: AddressType.Shipping,
      receiveUpdates: false,
      rememberMe: false,
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    startTransition(async () => {
      try {
        // Step 1: Sign up with Cognito
        const { nextStep, userId } = await signUp({
          username: values.email,
          password: values.password,
          options: {
            userAttributes: {
              email: values.email,
              given_name: values.firstName,
              family_name: values.lastName,
            },
          },
        });

        // Step 2: Handle different signup steps
        switch (nextStep.signUpStep) {
          case "CONFIRM_SIGN_UP":
            if (!userId) {
              throw new Error("User ID is required but was not provided");
            }

            // Store ALL necessary data for after confirmation
            sessionStorage.setItem("tempSignUpPassword", values.password);
            sessionStorage.setItem("tempSignUpUserId", userId);
            sessionStorage.setItem(
              "tempSignUpData",
              JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                recipientName: values.recipientName,
                street: values.street,
                city: values.city,
                state: values.state,
                postalCode: values.postalCode,
                country: values.country,
                isDefaultAddress: values.isDefaultAddress,
                addressType: values.addressType,
                cognitoUserId: userId,
              })
            );

            toast.info("Verification Required", {
              description: "Please check your email for the confirmation code.",
            });
            router.push(
              `/confirm-signup?email=${encodeURIComponent(values.email)}`
            );
            break;

          case "DONE": {
            // This case is rare for first-time signups
            if (!userId) {
              throw new Error("User ID is required but was not provided");
            }

            const result = await customerSignUpAction({
              ...values,
              cognitoUserId: userId,
            });

            if (result.success) {
              toast.success("Account Created!", {
                description: result.message,
              });
              form.reset();
              router.push("/login");
            } else {
              // If database creation fails, we should clean up the Cognito user
              await signOut();
              handleSignUpError(result);
            }
            break;
          }

          default:
            toast.error("Signup Failed", {
              description: `Unexpected signup step: ${nextStep.signUpStep}`,
            });
        }
      } catch (error: any) {
        console.error("Client-side Sign Up Error:", error);
        toast.error("Sign Up Failed", {
          description: error.message || "An unexpected error occurred",
        });
        form.setError("root.serverError", {
          type: "manual",
          message: error.message,
        });
      }
    });
  }

  // Helper function to handle signup errors
  function handleSignUpError(result: any) {
    if (result.errors) {
      // Handle specific field errors
      Object.entries(result.errors).forEach(([field, message]) => {
        form.setError(field as any, {
          type: "manual",
          message: message as string,
        });
      });
    }
    toast.error("Sign Up Failed", {
      description: result.message,
    });
    form.setError("root.serverError", {
      type: "manual",
      message: result.message,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        <Button type="button" variant={"outline"} className="w-full">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="••••••••" field={field} />
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
                  <PasswordInput placeholder="••••••••" field={field} />
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
            <FormItem className="w-full ">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput
                  country={"in"}
                  placeholder="Enter phone number"
                  value={field.value}
                  onChange={(phone, countryData, event, formattedValue) =>
                    field.onChange(formattedValue)
                  }
                  containerClass="w-full"
                  inputClass="!w-full !py-2 !px-11 !border !border-input !bg-background !text-sm !text-foreground !rounded-md focus:!border-ring focus:!shadow-none disabled:!cursor-not-allowed disabled:!opacity-50"
                  buttonClass="!bg-background !border !border-input hover:!bg-accent"
                  dropdownClass="!bg-popover !text-popover-foreground !border !border-border"
                  searchClass="!bg-background !text-foreground !border-border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Fields */}
        <h3 className="text-lg font-semibold mt-8 mb-4">Shipping Address</h3>
        <FormField
          control={form.control}
          name="recipientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Vadodara" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Mumbai" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="564823" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Optional: Checkbox for default address, although we're defaulting to true for initial signup */}
        <FormField
          control={form.control}
          name="isDefaultAddress"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  Set as Default Address
                </FormLabel>
                <FormDescription>
                  This will be your primary shipping address.
                </FormDescription>
              </div>
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
                <FormLabel className="cursor-pointer">
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
                <FormLabel className="font-normal cursor-pointer">
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
        <Button type="submit" className="w-full" disabled={isPending}>
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
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Log in
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
