import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  try {
    if (!imageFile) {
      throw new Error("No image selected.");
    }

    // Validate file type
    if (!imageFile.type.startsWith("image/")) {
      throw new Error("Invalid file type. Please upload an image.");
    }

    // Optional: Validate file size (limit ~5MB)
    const maxSizeMB = 5;
    if (imageFile.size > maxSizeMB * 1024 * 1024) {
      throw new Error(`Image size must be less than ${maxSizeMB}MB.`);
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    // IMPORTANT:
    // Do NOT manually set "Content-Type"
    // Browser/Capacitor will correctly set multipart boundaries
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData
    );

    return response.data || { imageUrl: null };
  } catch (error) {
    console.error("Error uploading image:", error);

    // Better error reporting
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to upload image.";

    throw new Error(errorMessage);
  }
};

export default uploadImage;
