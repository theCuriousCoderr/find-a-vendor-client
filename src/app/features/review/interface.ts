import { ReviewType } from "@/types";

export interface FetchAProductReviewsArgumentsType {
  vendor_id: string;
  category: string;
  product_id: string;
}

export interface FetchAProductReviewsResponseType {
  message: string;
  productReviews: ReviewType[] | [];
}
