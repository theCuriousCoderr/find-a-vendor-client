import { Customer, Vendor } from "@/types";

export interface SettingsSliceInitialState {
  currentEdit: string;
  vendorInfo: Vendor | null;
  customerInfo: Customer | null;
  loading: boolean;
}

export interface UpdateVendorDetailsArgumentType {
  vendorInfo: Vendor | null;
}

export interface UpdateVendorDetailsResponseType {
  message: string;
}

export interface UpdateCustomerDetailsArgumentType {
    customerInfo: Customer | null;
  }

  export interface UpdateCustomerDetailsResponseType {
    message: string;
  }
  
