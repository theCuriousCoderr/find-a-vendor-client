import { PixabyImageApiResponse } from "@/types";
import axios from "axios";

interface ImageData {
  url: string;
  tags: string[];
  _id: number;
  likes: number;
}

async function pixabyGetPhotosByCategory(
  category: string
): Promise<ImageData[] | []> {
  const url = `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABY_API_KEY}&q=${category}&image_type=photo`;
  try {
    const response = await axios.get(url);
    const data = response.data as PixabyImageApiResponse;
    const images = data.hits.slice(0, 10).map((img) => ({
      url: img.largeImageURL,
      tags: img.tags?.split(" "),
      _id: img.id,
      likes: img.likes,
    }));
    console.log(images);
    return images;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default pixabyGetPhotosByCategory;
