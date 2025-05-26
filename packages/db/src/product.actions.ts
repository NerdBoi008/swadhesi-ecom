'use server';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Attribute, AttributeValue, Category, Prisma, Product, ProductAttribute, ProductVariant } from '../generated/prisma';
import { prismaClient } from './prismaClient';
import { deleteImageFromS3 } from './aws/bucket.actions';
import { extractKeyFromUrl } from './util/bucket-utils';

/*--------------------- Product functions --------------------------------------*/

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
      brand_id: productData.brand_id ?? null,
      meta_title: productData.meta_title ?? null,
      meta_description: productData.meta_description ?? null,
      slug: productData.slug ?? null,
    },
  });
}

/**
 * Fetches no of products in the category.
 * @param categoryId - Optional: Filter products by category ID.
 * @returns Promise resolving with the count of Products
 */
export async function countProductsInCategory(categoryId?: string): Promise<number> {
  const whereClause: any = {};
  if (categoryId) {
    whereClause.category_id = categoryId;
  }
  return await prismaClient.product.count({
    where: whereClause,
  });
}

/**
 * Fetches no of products in the database.
 * @returns Promise resolving with the count of all Products
 */
export async function countAllProducts(): Promise<number> {
  return await prismaClient.product.count();
}


/**
 * Fetches products from the database, with optional pagination and relations.
 * If page or limit are not specified (or are 0), it retrieves all products.
 * @param page - The page number for pagination (defaults to 1). Set to 0 or omit to retrieve all.
 * @param limit - The number of products per page (defaults to 10). Set to 0 or omit to retrieve all.
 * @param categoryId - Optional: Filter products by category ID.
 * @param includeRelations - Optional: Whether to include related data like category, variants, attributes. Defaults to false.
 * @returns Promise resolving with an array of Products
 */
export async function fetchAllProducts(
  page: number = 1,
  limit: number = 10,
  categoryId?: string,
  includeRelations: boolean = false
): Promise<Product[]> {
  const queryOptions: any = {
    where: {
      category_id: categoryId,
    },
    include: includeRelations
      ? {
          category: true,
          variants: {
            include: {
              attribute_values: {
                include: {
                  attribute: true,
                },
              },
            },
          },
          attributes: {
            include: {
              attribute: true,
              values: {
                include: {
                  attribute: true,
                },
              },
            },
          },
        }
      : undefined,
  };

  // Only apply skip and take if both page and limit are greater than 0
  if (page > 0 && limit > 0) {
    const skip = (page - 1) * limit;
    queryOptions.skip = skip;
    queryOptions.take = limit;
  }

  const response = await prismaClient.product.findMany(queryOptions);

  return JSON.parse(JSON.stringify(response)) as Product[];
}

/**
 * Fetches a single product by its ID.
 * @param productId - The ID of the product to fetch
 * @param includeRelations - Optional: Whether to include related data like category, variants, attributes. Defaults to false.
 * @returns Promise resolving with the Product or null if not found
 */
export async function fetchProductById(
  productId: string,
  includeRelations: boolean = false
): Promise<Product | null> {
  return await prismaClient.product.findUnique({
    where: { id: productId },
    include: includeRelations ? {
      category: true,
      variants: {
        include: {
          attribute_values: {
            include: {
              attribute: true
            }
          }
        }
      },
      attributes: {
        include: {
          attribute: true,
          values: {
            include: {
              attribute: true
            }
          }
        }
      }
    } : undefined,
  });
}

/**
 * Fetches products belonging to a specific category.
 * @param categoryId - The ID of the category
 * @param page - The page number for pagination (defaults to 1)
 * @param limit - The number of products per page (defaults to 10)
 * @param includeRelations - Optional: Whether to include related data like category, variants, attributes. Defaults to false.
 * @returns Promise resolving with an array of Products
 */
export async function fetchProductsByCategory(
  categoryId: string,
  page: number = 1,
  limit: number = 10,
  includeRelations: boolean = false
): Promise<Product[]> {
  const skip = (page - 1) * limit;
  return await prismaClient.product.findMany({
    where: { category_id: categoryId },
    skip: skip,
    take: limit,
    include: includeRelations ? {
      category: true,
      variants: {
        include: {
          attribute_values: {
            include: {
              attribute: true
            }
          }
        }
      },
      attributes: {
        include: {
          attribute: true,
          values: {
            include: {
              attribute: true
            }
          }
        }
      }
    } : undefined,
  });
}

/**
 * Updates an existing product in the database.
 * @param productId - The ID of the product to update
 * @param productData - The data to update the product with
 * @returns Promise resolving with the updated Product
 * @throws {PrismaClientKnownRequestError} For Prisma-specific errors (e.g., product not found)
 */
export async function updateProduct(
  productId: string,
  productData: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
): Promise<Product> {
  return await prismaClient.product.update({
    where: { id: productId },
    data: {
      ...productData,
      brand_id: productData.brand_id === undefined ? undefined : productData.brand_id ?? null,
      meta_title: productData.meta_title === undefined ? undefined : productData.meta_title ?? null,
      meta_description: productData.meta_description === undefined ? undefined : productData.meta_description ?? null,
      slug: productData.slug === undefined ? undefined : productData.slug ?? null,
    },
  });
}

/**
 * Deletes a product from the database.
 * @param productId - The ID of the product to delete
 * @returns Promise resolving with the deleted Product
 * @throws {PrismaClientKnownRequestError} For Prisma-specific errors (e.g., product not found)
 */
export async function deleteProduct(productId: string): Promise<Product> {
  return await prismaClient.product.delete({
    where: { id: productId },
  });
}

/**
 * Adds a new product variant to the database.
 * @param variantData - The data for the new product variant.
 * @returns Promise resolving with the newly created ProductVariant.
 */
export async function addProductVariant(
  variantData: Omit<ProductVariant, 'id' | 'created_at' | 'updated_at'>  & { attribute_values: string[] }
): Promise<ProductVariant> {
  const { attribute_values, ...restVariantData } = variantData;
  
  return await prismaClient.productVariant.create({
    data: {
      ...restVariantData, // Spread the rest of the variant data
      price: new Prisma.Decimal(restVariantData.price), // Ensure price is Prisma.Decimal
      sale_price: restVariantData.sale_price ?? null,
      image_url: restVariantData.image_url ?? null,
      barcode: restVariantData.barcode ?? null,
      size: restVariantData.size ?? Prisma.JsonNull,
      // Connect existing attribute values
      attribute_values: {
        connect: attribute_values.map(id => ({ id })), // Map string IDs to { id: string } objects
      },
      // You also need to ensure product_id is correctly handled if it's a relation
      // If product_id is a direct field, it's fine. If it's a relation, it might need `connect: { id: product_id }`
      // based on your Prisma schema. Assuming it's a direct field for now based on your error.
    },
  });
}

/**
 * Updates an existing product variant.
 * @param variantId - The ID of the variant to update.
 * @param variantData - The partial data to update the variant with.
 * @returns Promise resolving with the updated ProductVariant.
 */
export async function updateProductVariant(
  variantId: string,
  variantData: Partial<Omit<ProductVariant, 'id' | 'created_at' | 'updated_at'>>
): Promise<ProductVariant> {
  if (!variantData.product_id) {
    throw new Error('Product must not be null')
  }
  return await prismaClient.productVariant.update({
    where: { id: variantId },
    data: {
      ...variantData,
      sale_price: variantData.sale_price === undefined ? undefined : variantData.sale_price ?? null,
      image_url: variantData.image_url === undefined ? undefined : variantData.image_url ?? null,
      barcode: variantData.barcode === undefined ? undefined : variantData.barcode ?? null,
      product_id: variantData.product_id,
      size: variantData.size === undefined ? undefined : variantData.size ?? Prisma.JsonNull,
    },
  });
}

/**
 * Deletes a product variant.
 * @param variantId - The ID of the variant to delete.
 * @returns Promise resolving with the deleted ProductVariant.
 */
export async function deleteProductVariant(variantId: string): Promise<ProductVariant> {
  return await prismaClient.productVariant.delete({
    where: { id: variantId },
  });
}

// 1. Add Product Attribute (Create)
// -----------------------------------------------------------------------------
// This assumes ProductAttribute table directly stores attribute_id and product_id,
// and optionally an array of attribute_value_ids if it's a many-to-many link there.
// If you want to connect it to AttributeValue entries during creation, you'd use 'connect'.
export async function addProductAttribute(
  productAttributeData: Omit<ProductAttribute, 'id' | 'created_at' | 'updated_at'>
): Promise<ProductAttribute> {
  // Destructure to handle 'attribute_value_ids' separately if it's for connect/set
  const { product_id, attribute_id, ...rest } = productAttributeData;

  return await prismaClient.productAttribute.create({
    data: {
      product: {
        connect: { id: product_id }
      },
      attribute: {
        connect: { id: attribute_id }
      },
      ...rest,
    },
    include: {
      attribute: true,
      values: true,
    }
  });
}

// 2. Update Product Attribute (Update)
// -----------------------------------------------------------------------------
export async function updateProductAttribute(
  productAttributeId: string,
  productAttributeData: Partial<Omit<ProductAttribute, 'id' | 'created_at' | 'updated_at' | 'product_id' | 'attribute_id'>>
): Promise<ProductAttribute> {

  return await prismaClient.productAttribute.update({
    where: { id: productAttributeId },
    data: {
      ...productAttributeData,
    },
    include: {
      attribute: true,
      values: true,
    }
  });
}

// 3. Delete Product Attribute (Delete)
// -----------------------------------------------------------------------------
export async function deleteProductAttribute(productAttributeId: string): Promise<ProductAttribute> {
  return await prismaClient.productAttribute.delete({
    where: { id: productAttributeId },
  });
}

// 4. Get Product Attribute by ID (Read - useful for internal validation or specific fetching)
// -----------------------------------------------------------------------------
export async function getProductAttributeById(
  productAttributeId: string,
  includeRelations: boolean = false
): Promise<ProductAttribute | null> {
  return await prismaClient.productAttribute.findUnique({
    where: { id: productAttributeId },
    include: includeRelations ? {
      product: true,
      attribute: true,
      values: true,
    } : undefined,
  });
}

// 5. Get Product Attributes by Product ID (Read - for getting all attributes of a product)
// -----------------------------------------------------------------------------
export async function getProductAttributesByProductId(
  productId: string,
  includeRelations: boolean = false
): Promise<ProductAttribute[]> {
  return await prismaClient.productAttribute.findMany({
    where: { product_id: productId },
    include: includeRelations ? {
      attribute: true,
      values: true,
    } : undefined,
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

