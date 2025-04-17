import { Product, Vendor } from "@/types";

export interface PublicSliceState {
  mostOrderedProducts: Product[] | null;
  loadingMostOrderedProducts: boolean;
  availableVendors: Vendor[] | null;
  availableProducts: Product[] | null;
  filteredVendors: Vendor[] | null;
  filteredProducts: Product[] | null;
  isVendorsListFilterActive: boolean;
  isProductsListFilterActive: boolean;
  vendorsList: Vendor[] | null;
  productsList: Product[] | null;
  selectedVendor: Vendor | null;
  selectedVendorProducts: Record<string, Product[]> | null;
  selectedVendorCompletedOrders: number;
  selectedProduct: Product | null;
  loadingVendors: boolean;
  loadingProducts: boolean;
  loadingVendor: boolean;
  loadingProduct: boolean;
  vendorsRound: number;
  productsRound: number;
  slice: number;
}

export interface FetchVendorsResponseType {
  message: string;
  vendorsList: Vendor[];
}

export interface FetchVendorsArgumentsType {
  round: number;
  slice: number;
}

export interface FetchAVendorResponseType {
  message: string;
  isVendorProfileComplete: boolean;
  vendor: Vendor;
  vendorProducts: Record<string, Product[]> | null;
  vendorCompletedOrders: number;
}

export interface FetchAVendorArgumentsType {
  vendor_id: string;
}

export interface VendorDetailsResponseType {
  message: string;
  isVendorProfileComplete: boolean;
  vendor: Vendor;
  vendorProducts: Record<string, Product[]> | null;
}

export interface FetchProductsResponseType {
  productsList: Product[];
}

export interface FetchProductsArgumentsType {
  round: number;
  slice: number;
}

export interface FetchAProductResponseType {
  message: string;
  product: Product;
}

export interface FetchAProductArgumentsType {
  vendor_id: string;
  category: string;
  product_id: string;
}
