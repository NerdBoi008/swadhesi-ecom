"use server";

import { z } from "zod";
import { prismaClient } from "./prismaClient";
import { Address, Customer, AddressType as PrismaAddressType } from "../generated/prisma/client";
import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  tokenUse: "id",
  clientId: process.env.USER_POOL_CLIENT_ID!,
})

async function validateCognitoToken(token: string): Promise<string> {
  try {
    // Verify token and get payload
    const payload = await verifier.verify(token);

    // Return the Cognito user ID (sub claim)
    return payload.sub;
  } catch (error) {
    // Handle specific JWT verification errors
    if (error instanceof Error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token has expired');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid token');
      }
      if (error.name === 'NotBeforeError') {
        throw new Error('Token not yet valid');
      }
    }
    
    // Generic error fallback
    throw new Error('Token validation failed');
  }
}

/* -----------  Sign Up Actions --------------------- */

const serverSignUpSchema = z
    .object({
        firstName: z.string().min(3, "First name must be at least 3 characters").max(20).trim(),
        lastName: z.string().min(3, "Last name must be at least 3 characters").max(20).trim(),
        email: z.string().email("Please enter a valid email").trim(),
        phone: z.string().min(10, "Phone number seems too short").regex(/^\+?[0-9\s-]{10,15}$/, "Invalid phone number format entered"),
        recipientName: z.string().min(3, "Recipient name must be at least 3 characters").max(50).trim(),
        street: z.string().min(5, "Street address must be at least 5 characters").max(100).trim(),
        city: z.string().min(2, "City must be at least 2 characters").max(50).trim(),
        state: z.string().min(2, "State must be at least 2 characters").max(50).trim(),
        postalCode: z.string().min(3, "Postal code must be at least 3 characters").max(10).trim(),
        country: z.string().min(2, "Country must be at least 2 characters").max(50).trim(),
        isDefaultAddress: z.boolean().default(true),
        addressType: z.nativeEnum(PrismaAddressType).default(PrismaAddressType.Shipping),
        cognitoUserId: z.string(),
        // No receiveUpdates or rememberMe here as they are client-side only preferences
    });

type ServerSignUpInput = z.infer<typeof serverSignUpSchema>;

export async function customerSignUpAction(values: ServerSignUpInput & { cognitoUserId: string }) { // Add cognitoUserId
    try {
        const validatedData = serverSignUpSchema.safeParse(values);
        if (!validatedData.success) {
            return {
                success: false,
                errors: validatedData.error.flatten().fieldErrors,
                message: "Validation failed."
            };
        }

        const {
            firstName,
            lastName,
            email,
            phone,
            recipientName,
            street,
            city,
            state,
            postalCode,
            country,
            isDefaultAddress,
            addressType,
            cognitoUserId, // Received from client after successful Cognito signUp
        } = validatedData.data;

        // Step 1: Skip Cognito signUp here. It's done client-side.
        // We receive the cognitoUserId from the client.

        // Step 2: Create customer record in your database (using Prisma on the server)
        const newCustomer = await prismaClient.customer.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                name: `${firstName} ${lastName}`,
                email: email,
                cognito_id: cognitoUserId, // Use the ID passed from the client
                phone: phone,
                is_guest: false,
                status: "Active", // Set status to pending as email confirmation is client-side
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
                type: addressType,
            },
        });

        return {
            success: true,
            message: "Account created successfully! Please check your email to confirm your account.",
        };
    } catch (error: any) {
        console.error("Server Action Sign Up Error:", error);
        // ... (existing error handling for Prisma) ...
        return {
            success: false,
            message: error.message || "An unexpected error occurred during sign up.",
        };
    } finally {
        await prismaClient.$disconnect();
    }
}

/* ----------- Sign In Actions (Removed from server actions) --------------------- */
// The `customerSignInAction` will be removed. Client-side `signIn` will handle this.
// `confirmCustomerSignUpAction` and `resendSignUpCodeAction` will also be removed.

/* ------------- Customer Actions ------------------- */

// Helper to get authenticated user's Cognito ID and Customer ID
// This now requires the ID token to be passed from the client in the request headers
async function getAuthenticatedCustomerId(idToken: string): Promise<{ cognitoId: string, customerId: string }> {
    if (!idToken) {
        throw new Error("Authentication token not provided.");
    }

    const cognitoId = await validateCognitoToken(idToken); // Validate the token and get sub (Cognito ID)

    const customer = await prismaClient.customer.findUnique({
        where: { cognito_id: cognitoId },
        select: { id: true, cognito_id: true }
    });

    if (!customer) {
        throw new Error("User profile not found in database.");
    }
    return { cognitoId: customer.cognito_id, customerId: customer.id };
}

// --- Fetch User Profile ---
// This function will now receive headers from the client
export async function fetchUserProfile(idToken: string): Promise<{ success: boolean; user?: Customer; addresses?: Address[]; message?: string }> {
    try {
        if (!idToken) {
            throw new Error("Authentication token not provided.");
        }

        const { customerId } = await getAuthenticatedCustomerId(idToken); // Pass headers to helper

        const user = await prismaClient.customer.findUnique({
            where: { id: customerId },
            include: { addresses: true, orders: true }, // Include addresses and orders if needed
        });

        if (!user) {
            return { success: false, message: "User profile not found." };
        }

        const { created_at, updated_at, ...restUser } = user;

        return {
            success: true,
            user: restUser as unknown as Customer,
            addresses: user.addresses as Address[],
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
    // email: z.string().email().optional(), // Email updates are tricky with Cognito. Best handled separately via Amplify
});

// This function will now receive headers from the client
export async function updateUserProfile(idToken: string, data: z.infer<typeof updateUserProfileSchema>): Promise<{ success: boolean; user?: Customer; message?: string; errors?: any }> {
    try {
        const { customerId, cognitoId } = await getAuthenticatedCustomerId(idToken); // Pass headers
        const validatedData = updateUserProfileSchema.safeParse(data);

        if (!validatedData.success) {
            return { success: false, errors: validatedData.error.flatten().fieldErrors, message: "Validation failed." };
        }

        // You might also need to update user attributes in Cognito if first_name, last_name, phone change.
        // This would involve another Amplify server-side call using the cognitoId.
        // For simplicity, I'm omitting that here, but it's a real-world consideration.
        // E.g., await adminUpdateUserAttributes({ UserId: cognitoId, UserPoolId: COGNITO_USER_POOL_ID, UserAttributes: [...] });

        const updatedUser = await prismaClient.customer.update({
            where: { id: customerId },
            data: {
                ...validatedData.data,
                name: (validatedData.data.first_name && validatedData.data.last_name) ? `${validatedData.data.first_name} ${validatedData.data.last_name}` : undefined,
            },
        });

        const { created_at, updated_at, ...restUser } = updatedUser;
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

// This function will now receive headers from the client
export async function addAddress(idToken: string, data: z.infer<typeof addAddressSchema>): Promise<{ success: boolean; address?: Address; message?: string; errors?: any }> {
    try {
        const { customerId } = await getAuthenticatedCustomerId(idToken); // Pass headers
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

// This function will now receive headers from the client
export async function updateAddress(idToken: string, id: string, data: z.infer<typeof updateAddressSchema>): Promise<{ success: boolean; address?: Address; message?: string; errors?: any }> {
    try {
        const { customerId } = await getAuthenticatedCustomerId(idToken); // Pass headers
        const validatedData = updateAddressSchema.safeParse(data);

        if (!validatedData.success) {
            return { success: false, errors: validatedData.error.flatten().fieldErrors, message: "Validation failed." };
        }

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
// This function will now receive headers from the client
export async function deleteAddress(idToken: string, id: string): Promise<{ success: boolean; message?: string }> {
    try {
        const { customerId } = await getAuthenticatedCustomerId(idToken); // Pass headers

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