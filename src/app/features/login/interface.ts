export interface LoginCustomerResponseType {
  message: string;
  customer_id?: number | string;
}

export interface LoginVendorResponseType {
  message: string;
  vendor_id?: number | string;
  isVendorProfileComplete?: boolean;
}


