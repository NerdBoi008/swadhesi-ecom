require('dotenv').config();

// Export the prisma client instance
export { prismaClient } from './prismaClient';

// Export your database action functions
export { addProduct, addCategory, getAllCategories, updateCategory, deleteCategory } from './product.actions';

export { getPresignedUploadUrl, uploadImageToS3, deleteImageFromS3 } from './aws/bucket.actions';

export { generateBucketKey, extractKeyFromUrl } from "./util/bucket-utils";

