import { OrderType } from "@/types";

export interface UpdateOrderResponseType {
  message: string;
}

export interface UpdateOrderArgumentType {
    order: OrderType;
  }
