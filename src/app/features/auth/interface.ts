import { Vendor } from "@/types";

export interface AuthType {
  isAuthenticated: boolean;
  customer: Customer | null;
  vendor: Vendor | null;
  loggingOut: boolean;
}

export interface Customer {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
}


export interface SignOutResponseType {
  message: string;
}
