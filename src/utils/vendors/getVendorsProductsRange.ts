import { Vendor } from "@/types";


function getVendorsProductsRange(vendors: Vendor[]) {
  const productsRange = vendors?.map((vendor) => vendor.categories).flat(2);
  const uniqueProducstRange = new Set(productsRange);
  const sortedRange = [...uniqueProducstRange]
    .map((range) => range.toLowerCase())
    .sort();
  return sortedRange;
}

export default getVendorsProductsRange;
