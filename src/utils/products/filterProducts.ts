import { Product } from "@/types";
import statesOfNigeria from "@/static-data/statesOfNigeria";

type PriceMappingKey = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export default function filterProducts(
  products: Product[],
  filters: string[] | string
) {
  if (filters.length === 0) return products;

  const priceMapping = {
    A: (price: number) => price < 10000,
    B: (price: number) => price >= 10000 && price < 20000,
    C: (price: number) => price >= 20000 && price < 30000,
    D: (price: number) => price >= 30000 && price < 40000,
    E: (price: number) => price >= 40000 && price < 50000,
    F: (price: number) => price >= 50000,
    G: (price: number) => Boolean(price),
  };

  let filteredProducts;

  if (!Array.isArray(filters)) {
    const search = filters;
    if (parseInt(search)) {
      filteredProducts = products.filter((product) => {
        return product.details.price >= parseInt(search);
      });
    } else {
      filteredProducts = products.filter((product) => {
        return (
          product.details.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()) ||
          ["Ibadan", "Lagos"].some((range) =>
            range.toLowerCase().includes(search.toLowerCase())
          )
        );
      });
    }
  } else {
    const lowercasedFilters = filters.map((filter) => filter.toLowerCase());
    const lowercasedStatesOfNigeria = statesOfNigeria.map((state) =>
      state.toLowerCase()
    );
    const appliedPriceFilter = filters.find((filter) => filter.includes("₦"));
    const wasLocationFilterApplied = filters.some((filter) =>
      new Set(lowercasedStatesOfNigeria).has(filter.toLowerCase())
    );
    const wasProductFilterApplied = Boolean(
      filters.filter(
        (filter) =>
          !filter.includes("₦") &&
          !new Set(lowercasedStatesOfNigeria).has(filter.toLowerCase())
      ).length
    );

    let priceKey: PriceMappingKey = "G";
    if (appliedPriceFilter) {
      priceKey = appliedPriceFilter.split(":")[0] as PriceMappingKey;
    }

    filteredProducts = products.filter((product) => {
      return (
        (wasProductFilterApplied
          ? new Set(lowercasedFilters).has(product.category.toLowerCase())
          : true) &&
        (wasLocationFilterApplied
          ? ["Ibadan", "Lagos"].some((range) =>
              new Set(lowercasedFilters).has(range.toLowerCase())
            )
          : true) &&
        priceMapping[priceKey](product.details.price)
      );
    });
  }
  return filteredProducts;
}
