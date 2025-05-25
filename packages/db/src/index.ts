require("dotenv").config();

// Export the prisma client instance
export { prismaClient } from "./prismaClient";

// Export your database action functions
export {
  addProduct,
  fetchAllProducts,
  updateProduct,
  fetchProductById,
  fetchProductsByCategory,
  deleteProduct,

  addProductVariant,
  updateProductVariant,
  deleteProductVariant,

  addProductAttribute,

  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,

  addAttribute,
  addAttributeValue,
  getAllAttributesWithValues,
  updateAttribute, 
  updateAttributeValue, 
  deleteAttributeValue,
  deleteAttribute,
} from "./product.actions";

export {
  getPresignedUploadUrl,
  uploadImageToS3,
  deleteImageFromS3,
} from "./aws/bucket.actions";

export { generateBucketKey, extractKeyFromUrl } from "./util/bucket-utils";
