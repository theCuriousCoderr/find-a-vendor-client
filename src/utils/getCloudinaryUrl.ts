import { ImageUploadResponse } from "@/types";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

let failedUploads: File[] = [];
let imageUrls: ImageUploadResponse[] = [];

export default async function getCloudinaryUrl(files: File[] | FileList) {
  for (const file of files) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET as string);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = (await response.json()) as ImageUploadResponse;
      console.log("data: ", data);
      if (data.secure_url) {
        const {
          original_filename,
          public_id,
          resource_type,
          secure_url,
          signature,
        } = data;
        imageUrls.push({
          original_filename,
          public_id,
          resource_type,
          secure_url,
          signature,
        });
      }
    } catch (error) {
      console.error(`File Upload for -${file.name}- failed`);
      console.error(error);
      failedUploads.push(file);
    }
  }

  if (failedUploads.length !== 0) {
    getCloudinaryUrl([...failedUploads] as File[]);
  }

  const ImageUrlsCopy = [...imageUrls];
  imageUrls = [];
  failedUploads = [];
  return ImageUrlsCopy;
}
