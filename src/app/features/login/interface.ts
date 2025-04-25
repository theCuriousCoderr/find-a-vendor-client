export interface LoginCustomerResponseType {
  message: string;
  token: string;
  refresh_token: string;
  customer_id: string;
}

export interface LoginVendorResponseType {
  message: string;
  token: string;
  refresh_token: string;
  role: string;
  vendor_id: string;
  isVendorProfileComplete?: boolean;
}
