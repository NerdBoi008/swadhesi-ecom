'use server';

// utils/s3-upload.ts
import { S3Client, PutObjectCommand, S3ServiceException, DeleteObjectCommand, } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Resource } from "sst";

// Configure the S3 client - make sure these match your SST config
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.BUCKET_NAME;
// const BUCKET_NAME = Resource[""].name;

/**
 * Uploads an image file to S3 and returns its public URL
 * @param imageFile - The File object to upload (from a file input)
 * @param key - The path/key where the file should be stored in S3
 * @returns Promise<string> - The public URL of the uploaded image
 */
export async function uploadImageToS3(imageFile: File, key: string): Promise<string> {

  if (imageFile.size > (500 * 1024)) {
    throw new Error('File size greater than 500kb.');
  }

  // Ensure the key doesn't start with a slash
  const normalizedKey = key.startsWith("/") ? key.slice(1) : key;
  
  // Create the upload command
  const putCommand = new PutObjectCommand({
    // Bucket: Resource["swadhesi-category-products-images"].name,
    Bucket: BUCKET_NAME,
    Key: normalizedKey,
    Body: Buffer.from(await imageFile.arrayBuffer()), // Convert the file to an ArrayBuffer
    ContentType: imageFile.type,
  });

  try {
    // Upload the file
    await s3Client.send(putCommand);

    
    // Return the public URL
    return `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${normalizedKey}`;
  } catch (caught) {
    console.error("Error uploading image to S3:", caught);
    if (caught instanceof S3ServiceException) {
      console.error(
        `Error from S3 while uploading object to ${BUCKET_NAME}.  ${caught.name}: ${caught.message}`,
      );
    } else {
      throw caught;
    }
  }
  return "";
}

/**
 * Deletes an image file from S3.
 * @param key - The path/key of the file to be deleted in S3.
 * @returns Promise<void> - Resolves if deletion is successful, rejects on error.
 */
export async function deleteImageFromS3(key: string): Promise<void> {
  if (!key || key.trim() === "") {
    console.warn("S3 Deletion skipped: No key provided or key is empty.");
    return; // Or throw new Error('Key is required for deletion.');
  }

  // Ensure the key doesn't start with a slash, consistent with upload logic
  const normalizedKey = key.startsWith("/") ? key.slice(1) : key;

  // Create the delete command
  const deleteCommand = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: normalizedKey,
  });

  try {
    // Attempt to delete the file
    const output = await s3Client.send(deleteCommand);

    // You can check output.DeleteMarker or output.$metadata.httpStatusCode for more details if needed
    // For example, a 204 No Content status code usually indicates successful deletion.
    if (output.$metadata.httpStatusCode === 204) {
      console.log(`Successfully deleted '${normalizedKey}' from S3 bucket '${BUCKET_NAME}'.`);
    } else {
      // This case might not always be hit if S3 returns 204 or errors out.
      // It's more for unexpected successful responses that aren't 204.
      console.warn(`S3 deletion of '${normalizedKey}' completed with status: ${output.$metadata.httpStatusCode}.`);
    }

  } catch (caught) {
    console.error(`Error deleting image '${normalizedKey}' from S3:`, caught);
    if (caught instanceof S3ServiceException) {
      // More specific S3 error handling
      console.error(
        `Error from S3 while deleting object '${normalizedKey}' from bucket '${BUCKET_NAME}'. ${caught.name}: ${caught.message}`
      );
      // Rethrow as a more generic error or a custom error if you want to handle it specifically upstream
      throw new Error(`S3 Deletion Failed: ${caught.message}`);
    } else if (caught instanceof Error) {
      // General JavaScript error
      throw caught;
    } else {
      // Unknown error type
      throw new Error("An unknown error occurred during S3 deletion.");
    }
  }
}

/**
 * Alternative version that uses presigned URLs for more secure uploads
 * (Recommended for production use)
 */
export async function getPresignedUploadUrl(key: string, contentType: string): Promise<{
  uploadUrl: string;
  publicUrl: string;
  requiredHeaders: {
    'Content-Type': string;
  };
}> {
  const normalizedKey = key.startsWith("/") ? key.slice(1) : key;

  const putCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: normalizedKey,
    ContentType: contentType,
    ACL: "public-read",
  });

  const uploadUrl = await getSignedUrl(s3Client, putCommand, {
    expiresIn: 3600,
  });

  const publicUrl = `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${normalizedKey}`;

  return {
    uploadUrl,
    publicUrl,
    requiredHeaders: {
      'Content-Type': contentType,
    }
  };
}