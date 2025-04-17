import { Product } from "@/types";

export interface GetProductsResponseType {
    products: Product[],
    filteredProducts: Product[],
}

export interface GetProductsArgumentsType {
    round: number;
    slice: number;
}