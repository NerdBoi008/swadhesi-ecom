'use server';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Attribute, AttributeValue, Category, Prisma, Product } from '../generated/prisma';
import { prismaClient } from './prismaClient';
import { deleteImageFromS3 } from './aws/bucket.actions';
import { extractKeyFromUrl } from './util/bucket-utils';

/**
 * Adds a new product to the database.
 * @param productData - The data for the new product (excluding auto-generated fields)
 * @returns Promise resolving with the newly created Product
 * @throws {PrismaClientKnownRequestError} For Prisma-specific errors
 */
export async function addProduct(
  productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>
): Promise<Product> {
  return await prismaClient.product.create({
    data: {
      ...productData,
      brand_id: productData.brand_id ?? null,       // Ensure null instead of undefined
      meta_title: productData.meta_title ?? null,   // Ensure null instead of undefined
      meta_description: productData.meta_description ?? null, // Ensure null instead of undefined
      slug: productData.slug ?? null                // Ensure null instead of undefined
    },
  });
}

/*--------------------- Attribute functions --------------------------------------*/

export async function getAllAttributesWithValues() {
  return prismaClient.attribute.findMany({
    include: {
      values: true, // Include the related AttributeValue records
    },
    orderBy: {
      display_order: 'asc', // Optional: order attributes
    }
  });
}

export async function deleteAttribute(id: string) {
  try {
    // If onDelete: Cascade is set in your Prisma schema for AttributeValue,
    // this single delete operation will automatically delete all related attribute values.
    const deletedAttribute = await prismaClient.attribute.delete({
      where: { id },
    });
    return deletedAttribute;
  } catch (error) {
    console.error(`Error deleting attribute with ID ${id}:`, error);
    throw error;
  }
}

export async function updateAttribute(
  id: string,
  data: Partial<Omit<Attribute, 'id' | 'created_at' | 'updated_at' | 'values' | 'products'>>
): Promise<Attribute> {
  return prismaClient.attribute.update({
    where: { id },
    data: {
      name: data.name,
      display_order: data.display_order,
    },
  });
}

export async function updateAttributeValue(
  id: string,
  data: Partial<Omit<AttributeValue, 'id' | 'created_at' | 'updated_at' | 'attribute' | 'variants' | 'productAttributes'>>
): Promise<AttributeValue> {
  return prismaClient.attributeValue.update({
    where: { id },
    data: {
      value: data.value,
      display_order: data.display_order,
    },
  });
}

export async function deleteAttributeValue(id: string): Promise<AttributeValue> {
  return prismaClient.attributeValue.delete({
    where: { id },
  });
}

/**
 * Adds a new attribute to the database.
 * @param attributeData - The data for the new attribute. `display_order` is optional.
 * @returns Promise resolving with the newly created Attribute.
 * @throws {Error} For network/database connection errors or unexpected issues.
 * @throws {PrismaClientKnownRequestError} For Prisma-specific errors (e.g., unique constraint violation).
 */
export async function addAttribute(
  attributeData: Omit<Attribute, 'id' | 'created_at' | 'updated_at' | 'values' | 'products'>
): Promise<Attribute> {
  try {
    return await prismaClient.attribute.create({
      data: {
        name: attributeData.name,
        display_order: attributeData.display_order ?? null,
      },
    });
  } catch (error) {
    handlePrismaError(error, 'adding attribute');
    throw error; // Re-throw after handling
  }
}

/**
 * Adds a new attribute value to the database.
 * @param attributeValueData - The data for the new attribute value.
 * Requires `attribute_id` and `value`. `display_order` is optional.
 * @returns Promise resolving with the newly created AttributeValue.
 * @throws {Error} For network/database connection errors or unexpected issues.
 * @throws {PrismaClientKnownRequestError} For Prisma-specific errors (e.g., unique constraint violation,
 * foreign key constraint violation if attribute_id is invalid).
 */
export async function addAttributeValue(
  attributeValueData: Omit<AttributeValue, 'id' | 'created_at' | 'updated_at' | 'attribute' | 'variants' | 'productAttributes'>
): Promise<AttributeValue> {
  try {
    return await prismaClient.attributeValue.create({
      data: {
        attribute_id: attributeValueData.attribute_id,
        value: attributeValueData.value,
        display_order: attributeValueData.display_order ?? null,
      },
    });
  } catch (error) {
    handlePrismaError(error, 'adding attribute value');
    throw error; // Re-throw after handling
  }
}

/*--------------------- Category functions --------------------------------------*/

/**
 * Function to get all the categories
 * @returns array of categories
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const categories = await prismaClient.category.findMany({
          orderBy: {
            name: 'asc',
          },
    })

    return categories;
  } catch (error) {
    console.error("An error occurred while fetching categories:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

/**
 * Adds a new category to the database with optimized error handling.
 * @param categoryData - The data for the new category
 * @returns Promise resolving with the newly created Category
 * @throws {Error} For network/database connection errors
 * @throws {PrismaClientKnownRequestError} For Prisma-specific errors
 */
export async function addCategory(
  categoryData: Omit<Category, 'id' | 'created_at' | 'updated_at'>
): Promise<Category> {
  try {
    return await prismaClient.category.create({
      data: {
        name: categoryData.name,
        parent_id: categoryData.parent_id ?? null,
        description: categoryData.description ?? null,
        image_url: categoryData.image_url ?? null,
      },
    });
  } catch (error) {
    handlePrismaError(error, 'adding category');
    throw error; // Re-throw after handling
  }
}

/**
 * Updates an existing category in the database.
 * @param id - ID of the category to update
 * @param updateData - Fields to update
 * @returns Promise resolving with the updated Category
 * @throws {Error} For various error cases
 */
export async function updateCategory(
  id: string,
  updateData: Partial<Omit<Category, 'id' | 'created_at'>>
): Promise<Category> {
  try {
    const updated = await prismaClient.category.update({
      where: { id },
      data: {
        name: updateData.name,
        parent_id: updateData.parent_id,
        description: updateData.description,
        image_url: updateData.image_url,
        updated_at: new Date() // Always update the timestamp
      }
    });
    console.log(`Category "${updated.name}" updated successfully.`);
    return updated;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      console.error(`Category not found for update (ID: ${id})`);
      throw new Error('Category not found');
    }
    handlePrismaError(error, 'updating category');
    throw error;
  }
}

/**
 * Deletes an existing category from the database and its associated image from S3.
 * @param id - ID of the category to delete
 * @returns Promise resolving with the deleted Category
 * @throws {Error} If the category is not found or for other database/S3 errors
 */
export async function deleteCategory(id: string): Promise<Category> {
  // Validate input
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid category ID provided');
  }

  // 1. Fetch the category with minimal fields
  const categoryToDelete = await prismaClient.category.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      image_url: true,
    }
  });

  if (!categoryToDelete) {
    const errorMsg = `Category not found for deletion (ID: ${id})`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const { image_url: imageUrl, name } = categoryToDelete;

  // 2. Handle S3 deletion if image exists
  if (imageUrl) {
    try {
      const key = extractKeyFromUrl(imageUrl);
      console.log("key from extractedfrom url:",key);
      
      if (key) {
        await deleteImageFromS3(key).catch(s3Error => {
          console.warn(`S3 deletion warning for category ${id} (${name}):`, s3Error);
          // Continue with DB deletion even if S3 fails
        });
      }
    } catch (s3Error) {
      console.error(`S3 deletion failed for category ${id} (${name}):`, s3Error);
      // Continue with DB deletion even if S3 fails
    }
  }

  // 3. Delete from database
  try {
    const deleted = await prismaClient.category.delete({
      where: { id },
    });
    console.log(`Successfully deleted category "${name}" (ID: ${id})`);
    return deleted;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        const errorMsg = `Category not found during final deletion (ID: ${id})`;
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
      handlePrismaError(error, 'deleting category');
    }
    throw error; 
  }
}

// Helper function for error handling
function handlePrismaError(error: unknown, context: string): void {
  const networkErrorCodes = [
    'P1000', 'P1001', 'P1002', 'P1003', 'P1008', 
    'P1009', 'P1010', 'P1011', 'P1012', 'P1013', 
    'P1014', 'P1015', 'P1017'
  ];

  if (error instanceof PrismaClientKnownRequestError) {
    if (networkErrorCodes.includes(error.code)) {
      console.error(`Database connection error (${error.code}) while ${context}:`, error.message);
      throw new Error(`Database connection failed while ${context}`);
    }
    console.error(`Prisma error (${error.code}) while ${context}:`, error.message);
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    console.error(`Prisma engine panic while ${context}:`, error.message);
    throw new Error('Database engine error');
  } else {
    console.error(`Unexpected error while ${context}:`, error);
    throw new Error(`Failed to complete ${context} operation`);
  }
}

