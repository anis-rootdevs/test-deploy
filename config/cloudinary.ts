import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  file: File,
  options?: {
    folder?: string;
    transformation?: Record<string, string>;
    resourceType?: "image" | "video" | "auto" | "raw";
  }
): Promise<{ secure_url: string; public_id: string }> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: options?.resourceType || "image",
          folder: options?.folder || process.env.CLOUDINARY_FOLDER || "uploads",
          transformation: options?.transformation || [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          } else {
            reject(new Error("Upload failed"));
          }
        }
      )
      .end(buffer);
  });
};

export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<{ result: string }> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw new Error(`Failed to delete asset: ${publicId}`);
  }
};

export const deleteMultipleFromCloudinary = async (
  publicIds: string[],
  resourceType: "image" | "video" | "raw" = "image"
): Promise<{ deleted: Record<string, string> }> => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error("Cloudinary bulk deletion error:", error);
    throw new Error("Failed to delete multiple assets");
  }
};

export const deleteFolderFromCloudinary = async (
  folderPath: string
): Promise<{ deleted: Record<string, string> }> => {
  try {
    // Delete all resources in the folder
    const result = await cloudinary.api.delete_resources_by_prefix(folderPath);

    // Then delete the folder itself
    await cloudinary.api.delete_folder(folderPath);

    return result;
  } catch (error) {
    console.error("Cloudinary folder deletion error:", error);
    throw new Error(`Failed to delete folder: ${folderPath}`);
  }
};
