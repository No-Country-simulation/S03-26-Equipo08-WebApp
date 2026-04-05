import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn("⚠️ Cloudinary configuration missing from environment variables.");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Uploads a file to Cloudinary with optional specific organization config
 */
export async function uploadImage(
  file: string, 
  folder: string = "testimonials",
  config?: { cloud_name: string; api_key: string; api_secret: string }
) {
  try {
    const uploadOptions = {
      folder,
      resource_type: "auto" as const,
    };

    // Si hay config específica (multi-tenant), la usamos para esta subida
    if (config && config.cloud_name && config.api_key && config.api_secret) {
      const result = await cloudinary.uploader.upload(file, {
        ...uploadOptions,
        cloud_name: config.cloud_name,
        api_key: config.api_key,
        api_secret: config.api_secret,
      });
      return result.secure_url;
    }

    // Si no, usamos la config global por defecto de cloudinary.config()
    const result = await cloudinary.uploader.upload(file, uploadOptions);
    return result.secure_url;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Cloudinary Upload Error:", error.message);
    }
    throw new Error("Failed to upload image to Cloudinary");
  }
}
