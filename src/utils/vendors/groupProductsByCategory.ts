import { Product } from "@/types";

export default function groupProductsByCategory(products: Product[]) {
  const groupedProducts: Record<string, Product[]> = {};

  products.forEach((product) => {
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = [];
    }
    groupedProducts[product.category] = [
      ...groupedProducts[product.category],
      product,
    ];
  });

  return groupedProducts;
}
