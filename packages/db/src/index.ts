// require("dotenv").config();

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
  countAllProducts,
  countProductsInCategory,

  addProductVariant,
  updateProductVariant,
  deleteProductVariant,

  addProductAttribute,
  updateProductAttribute,
  deleteProductAttribute,

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

export {
  customerSignUpAction,
  fetchUserProfile,
  updateUserProfile,
  addAddress,
  updateAddress,
  deleteAddress,
} from "./customer.actions";
