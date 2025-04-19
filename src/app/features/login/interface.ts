export interface LoginCustomerResponseType {
  message: string;
  role: string;
  customer_id: string;
}

export interface LoginVendorResponseType {
  message: string;
  role: string;
  vendor_id: string;
  isVendorProfileComplete?: boolean;
}


