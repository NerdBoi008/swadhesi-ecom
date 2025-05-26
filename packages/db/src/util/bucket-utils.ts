/**
 * Generates a structured S3 bucket key (path) based on the type of image folder and the entity name.
 * 
 * @param folderType - The type of folder the image belongs to.
 *                     Can be either "productImage" or "categoryImage".
 * @param entityName - The unique name of the product or category.
 * @returns A string representing the S3 key/path where the image should be stored.
 * 
 * @example
 * generateBucketKey("productImage", "123");
 * // returns "product-images/123"
 * 
 * generateBucketKey("categoryImage", "abc");
 * // returns "category-images/abc"
 */
export function generateBucketKey(
  folderType: "productImage" | "categoryImage",
  entityName: string,
): string {
  // Define the mapping between folder types and their corresponding folder names
  const folderMap: Record<typeof folderType, string> = {
    categoryImage: "category-images",
    productImage: "product-images",
  };

  // Construct the S3 key using the mapped folder name and the entity ID
  return `${folderMap[folderType]}/${entityName}`;
}

/***
 *  Helper function exract key from object public url
 * @param url - public url of object
 * @returns A string value of objey's key or null
 */
export function extractKeyFromUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    // Example: if URL is https://your-bucket.s3.region.amazonaws.com/categoryImages/image.png
    // The key would be 'categoryImages/image.png' (path after bucket, without leading slash)
    let key = parsedUrl.pathname;
    if (key.startsWith("/")) {
      key = key.substring(1);
    }
    // If your bucket name is part of the pathname in some URL styles:
    // const S3_BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
    // if (S3_BUCKET_NAME && key.startsWith(`${S3_BUCKET_NAME}/`)) {
    //   key = key.substring(`${S3_BUCKET_NAME}/`.length);
    // }
    return key && key.length > 0 ? key : null;
  } catch (e) {
    console.error("Failed to parse URL to extract S3 key:", url, e);
    return null;
  }
}