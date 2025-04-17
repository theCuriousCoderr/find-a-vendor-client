const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

let failedUploads: File[] = [];
let imageUrls: string[] = [];

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
      const data = await response.json();
      if (data.secure_url) {
        imageUrls.push(data.secure_url);
      }
    } catch (error) {
      console.error(`File Upload for -${file.name}- failed`)
      console.error(error);
      failedUploads.push(file);
    }
  }

  if (failedUploads.length !== 0) {
    console.log(`Retrying failed uploads`)
    getCloudinaryUrl([...failedUploads] as File[]);
  }

  const ImageUrlsCopy = [...imageUrls];
  imageUrls = [];
  failedUploads = [];
  return ImageUrlsCopy;
}
