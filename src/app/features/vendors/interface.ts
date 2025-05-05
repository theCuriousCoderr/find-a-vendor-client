import {
  Customer,
  ImageUploadResponse,
  NotificationType,
  OrderType,
  Product,
  Vendor,
} from "@/types";

export interface VendorsSliceState {
  authenticatedVendor: Vendor | null;
  authenticatedVendorProducts: Record<string, Product[] | []> | null;
  authenticatedVendorOrders: OrderType[] | [];
  authenticatedVendorNotifications: NotificationType[] | [];
  loadingAuthenticatedVendor: boolean;
  loadingAuthenticatedVendorOrders: boolean;
  loadingAuthenticatedVendorNotifications: boolean;
  isVendorProfileComplete: boolean;
}

export interface GetVendorsResponseType {
  vendors: Vendor[];
  filteredVendors: Vendor[];
}

export interface FetchAuthenticatedVendorResponseType {
  message: string;
  isVendorProfileComplete: boolean;
  vendor: Vendor;
  vendorProducts: Record<string, Product[]> | null;
}

export interface FetchAuthenticatedVendorOrdersResponseType {
  message: string;
  vendorOrders: OrderType[] | [];
}

export interface FetchAuthenticatedVendorNotificationsResponseType {
  message: string;
  vendorNotifications: NotificationType[] | [];
}

export interface AddAuthenticatedVendorProductArgumentsType {
  vendor_id: string;
  category: string;
  product_id: string;
  images: ImageUploadResponse[];
  details: {
    name: string;
    description: string;
    specifications: string;
    price: number;
    status: string;
  };
}

export interface FetchCustomerInfoResponseType {
  message: string;
  customer: Customer;
}

export interface FetchCustomerInfoArgumentType {
  customer_id: string;
}

export interface GetVendorsArgumentsType {
  round: number;
  slice: number;
}
