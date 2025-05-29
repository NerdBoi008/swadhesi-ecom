"use server";

import { z } from "zod";
import { confirmSignUp, getCurrentUser, resendSignUpCode, signIn, signUp } from "aws-amplify/auth";
import { prismaClient } from "./prismaClient";
import { Address, Customer, AddressType as PrismaAddressType } from "../generated/prisma/client";
import "./aws/auth.config";

/* -----------  Sign Up Actions --------------------- */

const serverSignUpSchema = z
  .object({
    firstName: z.string().min(3, "First name must be at least 3 characters").max(20).trim(),
    lastName: z.string().min(3, "Last name must be at least 3 characters").max(20).trim(),
    email: z.string().email("Please enter a valid email").trim(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string(), // This will be refined out later or handled separately if password validation is client-only
    phone: z.string().min(10, "Phone number seems too short").regex(/^\+?[0-9\s-]{10,15}$/, "Invalid phone number format entered"),
    recipientName: z.string().min(3, "Recipient name must be at least 3 characters").max(50).trim(),
    street: z.string().min(5, "Street address must be at least 5 characters").max(100).trim(),
    city: z.string().min(2, "City must be at least 2 characters").max(50).trim(),
    state: z.string().min(2, "State must be at least 2 characters").max(50).trim(),
    postalCode: z.string().min(3, "Postal code must be at least 3 characters").max(10).trim(),
    country: z.string().min(2, "Country must be at least 2 characters").max(50).trim(),
    isDefaultAddress: z.boolean().default(true),
    addressType: z.nativeEnum(PrismaAddressType).default(PrismaAddressType.Shipping),
    receiveUpdates: z.boolean().default(false),
    rememberMe: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ServerSignUpInput = z.infer<typeof serverSignUpSchema>;

export async function customerSignUpAction(values: ServerSignUpInput) {
  // No need for try-catch here if you want to handle errors in the calling component
  // but useful for logging server-side errors
  try {
    // Server-side Zod validation
    const validatedData = serverSignUpSchema.safeParse(values);
    if (!validatedData.success) {
      // Return validation errors to the client
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors, // Only send field errors
        message: "Validation failed.",
      };
    }

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      recipientName,
      street,
      city,
      state,
      postalCode,
      country,
      isDefaultAddress,
      addressType,
    } = validatedData.data;

    console.log("userpoolId:", process.env.COGNITO_USER_POOL_ID);
    

    // Step 1: Sign up with AWS Amplify (still runs on server)
    // const { nextStep, userId } = await signUp({
    //   username: email,
    //   password,
    // });
    const { nextStep, userId } = await signUp({
        username: email,
        password,
        options: {
            userAttributes: {
                email: email,
                given_name: firstName,
                family_name: lastName,
                phone_number: phone,
            }
        }
    });

    let cognitoUserId: string | undefined;

    if (
      nextStep.signUpStep === "CONFIRM_SIGN_UP" ||
      nextStep.signUpStep === "DONE"
    ) {
      cognitoUserId = userId;
    } else {
      // This might happen if user needs to confirm email before further actions
      return {
        success: false,
        message:
          "Sign up not completed. Please check your email for confirmation code or contact support.",
      };
    }

    if (!cognitoUserId) {
      return {
        success: false,
        message: "Failed to retrieve Cognito User ID after sign up.",
      };
    }

    // Step 2: Create customer record in your database (using Prisma on the server)
    const newCustomer = await prismaClient.customer.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        name: `${firstName} ${lastName}`,
        email: email,
        cognito_id: cognitoUserId,
        phone: phone,
        is_guest: false,
        status: "Active",
        total_spent: 0,
        order_count: 0,
      },
    });

    // Step 3: Create address record in your database (using Prisma on the server)
    await prismaClient.address.create({
      data: {
        customer_id: newCustomer.id,
        recipient_name: recipientName,
        street: street,
        city: city,
        state: state,
        postal_code: postalCode,
        country: country,
        contact_number: phone,
        is_default: isDefaultAddress,
        type: addressType, // Pass the enum value directly to Prisma
      },
    });

    return {
      success: true,
      message:
        "Account created successfully! Please check your email to confirm your account.",
    };
  } catch (error: any) {
    console.error("Server Action Sign Up Error:", error);
    // Handle Prisma unique constraint errors, etc.
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return {
        success: false,
        message: "A customer with this email already exists.",
      };
    }
    if (error.code === "P2002" && error.meta?.target?.includes("cognito_id")) {
      return {
        success: false,
        message: "A customer with this Cognito ID already exists.",
      };
    }
    // Generic error message for other unexpected errors
    return {
      success: false,
      message: error.message || "An unexpected error occurred during sign up.",
    };
  } finally {
    await prismaClient.$disconnect();
  }
}

/* -----------  Sign In Actions --------------------- */

const serverSignInSchema = z.object({
    email: z.string().email('Please enter a valid email').trim(),
    password: z.string().min(1, 'Password is required'), // Basic validation
});

type ServerSignInInput = z.infer<typeof serverSignInSchema>;

export async function customerSignInAction(values: ServerSignInInput): Promise<{
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    codeRequired?: boolean; // Add this flag
    email?: string; // Optionally return email for confirmation flow
}> {
    try {
        const validatedData = serverSignInSchema.safeParse(values);
        if (!validatedData.success) {
            return {
                success: false,
                errors: validatedData.error.flatten().fieldErrors,
                message: "Validation failed."
            };
        }

        const { email, password } = validatedData.data;

        const { nextStep } = await signIn({
            username: email,
            password: password,
        });

        if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
            // User needs to confirm their account before signing in
            return {
                success: false,
                codeRequired: true, // Indicate that a code is required
                email: email, // Pass the email back for the confirmation form
                message: "Your account is not confirmed. Please enter the verification code sent to your email."
            };
        } else if (nextStep.signInStep === 'DONE') {
            // Sign-in successful
            return { success: true, message: "Sign in successful!" };
        } else {
            console.warn("Unhandled sign-in step:", nextStep.signInStep);
            return { success: false, message: `Sign in requires further action: ${nextStep.signInStep}` };
        }

    } catch (error: any) {
        console.error("Server Action Sign In Error:", error);
        let errorMessage = "An unexpected error occurred during sign in.";

        if (error.name === 'UserNotFoundException') {
            errorMessage = 'Incorrect username or password.';
        } else if (error.name === 'NotAuthorizedException') {
            errorMessage = 'Incorrect username or password.';
        } else if (error.name === 'UserNotConfirmedException') {
            // This specific error should ideally be caught by nextStep.signInStep === 'CONFIRM_SIGN_UP'
            // but as a fallback, return the same flow.
            return {
                success: false,
                codeRequired: true,
                email: values.email, // Return email even if caught by catch block
                message: "Your account is not confirmed. Please enter the verification code sent to your email."
            };
        } else if (error.name === 'LimitExceededException') {
            errorMessage = 'Attempt limit exceeded, please try again later.';
        } else {
            errorMessage = error.message || errorMessage;
        }

        return { success: false, message: errorMessage };
    } finally {
        // await prisma.$disconnect();
    }
}


// --- NEW: Zod Schema for Confirm Sign Up ---
const serverConfirmSignUpSchema = z.object({
    email: z.string().email('Please enter a valid email').trim(),
    code: z.string().min(6, 'Confirmation code must be 6 digits').max(6, 'Confirmation code must be 6 digits'),
});

type ServerConfirmSignUpInput = z.infer<typeof serverConfirmSignUpSchema>;

// --- NEW: Server Action for Confirm Sign Up ---
export async function confirmCustomerSignUpAction(values: ServerConfirmSignUpInput): Promise<{
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
}> {
    try {
        const validatedData = serverConfirmSignUpSchema.safeParse(values);
        if (!validatedData.success) {
            return {
                success: false,
                errors: validatedData.error.flatten().fieldErrors,
                message: "Validation failed."
            };
        }

        const { email, code } = validatedData.data;

        await confirmSignUp({
            username: email,
            confirmationCode: code,
        });

        // After successful confirmation, the user can now sign in.
        // You might want to automatically sign them in here, or redirect to sign-in page.
        // For simplicity, we'll just indicate success and let the client redirect.
        return { success: true, message: "Account confirmed successfully! You can now sign in." };

    } catch (error: any) {
        console.error("Server Action Confirm Sign Up Error:", error);
        let errorMessage = "An unexpected error occurred during confirmation.";

        if (error.name === 'CodeMismatchException') {
            errorMessage = 'Invalid confirmation code.';
        } else if (error.name === 'ExpiredCodeException') {
            errorMessage = 'Confirmation code has expired. Please request a new one.';
        } else if (error.name === 'LimitExceededException') {
            errorMessage = 'Attempt limit exceeded for confirmation. Please try again later.';
        } else if (error.name === 'UserNotFoundException') {
            errorMessage = 'User not found. Please check your email.';
        } else {
            errorMessage = error.message || errorMessage;
        }

        return { success: false, message: errorMessage };
    }
}

// --- NEW: Server Action to Resend Confirmation Code ---
export async function resendSignUpCodeAction(email: string): Promise<{
    success: boolean;
    message?: string;
}> {
    try {
        await resendSignUpCode({ 
            username: email
        });
        
        return { 
            success: true, 
            message: "New confirmation code sent to your email." 
        };
    } catch (error: any) {
        console.error("Server Action Resend Code Error:", error);
        let errorMessage = "Failed to resend code.";
        
        if (error.name === 'UserNotFoundException') {
            errorMessage = 'User not found.';
        } else if (error.name === 'LimitExceededException') {
            errorMessage = 'Too many attempts. Please try again later.';
        } else if (error.name === 'InvalidParameterException') {
            errorMessage = 'Invalid email address.';
        } else {
            errorMessage = error.message || errorMessage;
        }
        
        return { 
            success: false, 
            message: errorMessage 
        };
    }
}

/* ------------- Customer Actions ------------------- */

// Helper to get authenticated user's Cognito ID and Customer ID
async function getAuthenticatedCustomerId(): Promise<{ cognitoId: string, customerId: string }> {
  const authUser = await getCurrentUser();
  if (!authUser || !authUser.userId) {
    throw new Error("Authentication required.");
  }

  const customer = await prismaClient.customer.findUnique({
    where: { cognito_id: authUser.userId },
    select: { id: true, cognito_id: true }
  });

  if (!customer) {
    throw new Error("User profile not found in database.");
  }
  return { cognitoId: customer.cognito_id, customerId: customer.id };
}

// --- Fetch User Profile ---
export async function fetchUserProfile(): Promise<{ success: boolean; user?: Customer; addresses?: Address[]; message?: string }> {
  try {
    const { customerId } = await getAuthenticatedCustomerId(); // Ensures user is authenticated

    const user = await prismaClient.customer.findUnique({
      where: { id: customerId },
      include: { addresses: true }, // Include addresses with the user
    });

    if (!user) {
      return { success: false, message: "User profile not found." };
    }

    // IMPORTANT: Omit sensitive fields before returning to client
    const { created_at, updated_at, ...restUser } = user;

    return {
      success: true,
      user: restUser as unknown as Customer, // Cast to your client-side Customer type
      addresses: user.addresses as Address[], // Cast to your client-side Address type
    };
  } catch (error: any) {
    console.error("Error in fetchUserProfile server action:", error);
    return { success: false, message: error.message || "Failed to fetch user profile." };
  } finally {
    await prismaClient.$disconnect();
  }
}

// --- Update User Profile ---
const updateUserProfileSchema = z.object({
    first_name: z.string().min(1).optional(),
    last_name: z.string().min(1).optional(),
    phone: z.string().optional().nullable(),
    email: z.string().email().optional(), // Be careful with email updates and Cognito
});

export async function updateUserProfile(data: z.infer<typeof updateUserProfileSchema>): Promise<{ success: boolean; user?: Customer; message?: string; errors?: any }> {
    try {
        const { customerId } = await getAuthenticatedCustomerId();
        const validatedData = updateUserProfileSchema.safeParse(data);

        if (!validatedData.success) {
            return { success: false, errors: validatedData.error.flatten().fieldErrors, message: "Validation failed." };
        }

        const updatedUser = await prismaClient.customer.update({
            where: { id: customerId },
            data: {
                ...validatedData.data,
                name: (validatedData.data.first_name && validatedData.data.last_name) ? `${validatedData.data.first_name} ${validatedData.data.last_name}` : undefined,
            },
        });

        const { created_at, updated_at, ...restUser } = updatedUser; // Omit sensitive fields
        return { success: true, user: restUser as Customer, message: "Profile updated successfully." };
    } catch (error: any) {
        console.error("Error in updateUserProfile server action:", error);
        return { success: false, message: error.message || "Failed to update profile." };
    } finally {
        await prismaClient.$disconnect();
    }
}

// --- Add Address ---
const addAddressSchema = z.object({
  recipient_name: z.string().min(3),
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  postal_code: z.string().min(3),
  country: z.string().min(2),
  contact_number: z.string().min(10),
  is_default: z.boolean().optional(),
  type: z.nativeEnum(PrismaAddressType).optional(),
});

export async function addAddress(data: z.infer<typeof addAddressSchema>): Promise<{ success: boolean; address?: Address; message?: string; errors?: any }> {
  try {
    const { customerId } = await getAuthenticatedCustomerId();
    const validatedData = addAddressSchema.safeParse(data);

    if (!validatedData.success) {
        return { success: false, errors: validatedData.error.flatten().fieldErrors, message: "Validation failed." };
    }

    const newAddress = await prismaClient.address.create({
      data: {
        ...validatedData.data,
        customer_id: customerId,
      },
    });
    return { success: true, address: newAddress as Address, message: "Address added successfully." };
  } catch (error: any) {
    console.error("Error in addAddress server action:", error);
    return { success: false, message: error.message || "Failed to add address." };
  } finally {
    await prismaClient.$disconnect();
  }
}

// --- Update Address ---
const updateAddressSchema = addAddressSchema.partial(); // Allow partial updates

export async function updateAddress(id: string, data: z.infer<typeof updateAddressSchema>): Promise<{ success: boolean; address?: Address; message?: string; errors?: any }> {
  try {
    const { customerId } = await getAuthenticatedCustomerId();
    const validatedData = updateAddressSchema.safeParse(data);

    if (!validatedData.success) {
        return { success: false, errors: validatedData.error.flatten().fieldErrors, message: "Validation failed." };
    }

    // Important: Ensure the address belongs to the authenticated customer
    const existingAddress = await prismaClient.address.findFirst({
      where: { id: id, customer_id: customerId },
    });

    if (!existingAddress) {
      return { success: false, message: "Address not found or does not belong to user." };
    }

    const updatedAddress = await prismaClient.address.update({
      where: { id: id },
      data: validatedData.data,
    });
    return { success: true, address: updatedAddress as Address, message: "Address updated successfully." };
  } catch (error: any) {
    console.error("Error in updateAddress server action:", error);
    return { success: false, message: error.message || "Failed to update address." };
  } finally {
    await prismaClient.$disconnect();
  }
}

// --- Delete Address ---
export async function deleteAddress(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    const { customerId } = await getAuthenticatedCustomerId();

    // Important: Ensure the address belongs to the authenticated customer
    const existingAddress = await prismaClient.address.findFirst({
      where: { id: id, customer_id: customerId },
    });

    if (!existingAddress) {
      return { success: false, message: "Address not found or does not belong to user." };
    }

    await prismaClient.address.delete({
      where: { id: id },
    });
    return { success: true, message: "Address deleted successfully." };
  } catch (error: any) {
    console.error("Error in deleteAddress server action:", error);
    return { success: false, message: error.message || "Failed to delete address." };
  } finally {
    await prismaClient.$disconnect();
  }
}