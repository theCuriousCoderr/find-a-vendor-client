import statesOfNigeria from "@/static-data/statesOfNigeria";
import { Vendor } from "@/types";

type PriceMappingKey = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export default function filterVendors(
  vendors: Vendor[],
  filters: string[] | string
) {
  if (filters.length === 0) return vendors;
  
  const priceMapping = {
    A: (price: number) => price < 10000,
    B: (price: number) => price >= 10000 && price < 20000,
    C: (price: number) => price >= 20000 && price < 30000,
    D: (price: number) => price >= 30000 && price < 40000,
    E: (price: number) => price >= 40000 && price < 50000,
    F: (price: number) => price >= 50000,
    G: (price: number) => Boolean(price),
  };

  let filteredVendors;

  // filter by search word
  if (!Array.isArray(filters)) {
    const search = filters;
    if (parseInt(search)) {
      filteredVendors = vendors.filter((vendor) => {
        return vendor.minPrice >= parseInt(search);
      });
    } else {
      filteredVendors = vendors.filter((vendor) => {
        return (
          vendor.categories.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          ) ||
          vendor.deliveryRange.some((range) =>
            range.toLowerCase().includes(search.toLowerCase())
          )
        );
      });
    }
  } 
  // filter by options
  else {
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

    filteredVendors = vendors.filter((vendor) => {
      return (
        (wasProductFilterApplied
          ? vendor.categories.some((tag) =>
              new Set(lowercasedFilters).has(tag.toLowerCase())
            )
          : true) &&
        (wasLocationFilterApplied
          ? vendor.deliveryRange.some((range) =>
              new Set(lowercasedFilters).has(range.toLowerCase())
            )
          : true) &&
        priceMapping[priceKey](vendor.minPrice)
      );
    });
  }

  return filteredVendors;
}
