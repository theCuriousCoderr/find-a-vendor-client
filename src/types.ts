import { LucideIcon } from "lucide-react";
import { ChangeEvent } from "react";

export interface Vendor {
  _id?: string;
  vendor_id: string;
  storeName: string;
  storeTag: string;
  categories: string[];
  logo: string;
  banner: string;
  location: {
    state: string;
    city: string;
    country: string;
  };
  joined: string;
  socials: {
    instagram: string;
    twitter: string;
    whatsapp: string;
  };
  phone: string;
  acct: {
    number: string;
    bank: string;
    name: string;
  };
  deliveryRange: string[];
  minPrice: number;
  email: string;
}

export interface Customer {
  customer_id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  isEmailVerified: boolean;
  photo: string;
  phone: string;
}

export interface LogoSize {
  clx?: string;
}

export interface ButtonPropsType {
  animate?: boolean;
  text: string;
  bgColor?: string;
  color?: "text-white" | "text-black" | "text-red-500";
  onClick?: () => void;
  loading?: boolean;
}

export interface InputPropsType {
  name: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTextEffect?: string;
  iconClickEffect?: boolean;
  onIconClick?: () => void;
  placeholder?: string;
  Icon1?: LucideIcon;
  Icon2?: LucideIcon;
  labelStyle?: string;
  labelGap?: string;
  readOnly?: boolean;
}

export interface VendorFilterPropsType {
  activeDropdown: string;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string>>;
}

export interface CustomDropdownPropsType extends VendorFilterPropsType {
  name: string;
  multiple: boolean;
}

export interface Product {
  _id: number;
  category: string;
  vendor_id: number;
  product_id: string;
  images: string[];
  details: {
    name: string;
    description: string;
    price: number;
    qty: number;
    status: "In stock" | "Out of stock" | "Pre-order"; // Assuming possible statuses
  };
}

export interface ProductFilter {
  vendor_id: string;
  category: string;
  product_id: string;
}

export type RolesType = "vendor" | "customer" | "";

export interface DropDownFilterState {
  vendorFilters: string[];
  vendorSearch: string;
  productFilters: string[];
  productSearch: string;
}

export interface CustomerInfo {
  firstName?: string;
  lastName?: string;
  password: string;
  email: string;
  isEmailVerified?: boolean;
  photo?: string;
  phone?: string;
}

export interface VendorInfo {
  email: string;
  storeName?: string;
  storeTag?: string;
  password: string;
}

export interface SignUpType {
  activeRole: RolesType;
  oppositeRole: RolesType;
  customer: CustomerInfo;
  vendor: VendorInfo;
  loading: boolean;
  error: string;
  success: string;
  redirect: boolean;
}

export interface LogInStateType {
  activeRole: RolesType;
  oppositeRole: RolesType;
  customer: CustomerInfo;
  vendor: VendorInfo;
  loading: boolean;
  error: string;
  success: string;
  redirect: boolean;
  isVendorProfileComplete: boolean;
}

export interface ProductsTopPick {
  src: {
    src: string;
    vendor_id: number;
  };
  id: string;
  top: string;
  rotation: string;
  zIndex: string;
}

export interface ProductsSliceType {
  products: Product[] | null;
  filteredProducts: Product[] | null;
  loadingProducts: boolean;
  loadingTopPicks: boolean;
  topPicks: ProductsTopPick[] | null;
  product: Product | null;
  loadingProduct: boolean;
  slice: number;
  round: number;
}

export interface VendorCardType {
  index: number;
  vendor: Vendor;
  vendorsLength: number;
}

export type StatusVariants =
  | "pending"
  | "ongoing"
  | "rejected"
  | "cancelled"
  | "completed"
  | "delivered"
  | "received";

export type RecipientVariants = "customer" | "vendor";

export interface OrderType {
  _id: string;
  order_id: string;
  type: string;
  status: StatusVariants;
  customer_id: string;
  vendor_id: string;
  category: string;
  product_id: string;
  vendor_completed_flag?: boolean;
  customer_completed_flag?: boolean;
  createdAt: Date;
}

export interface NotificationType {
  _id: string;
  notification_id: string;
  customer_id: string;
  vendor_id: string;
  order_id: string;
  link: string;
  text: string;
  opened: boolean;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

export interface GoogleAuthResponseType {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface BroadcastEventType {
  _id: string;
  data: string;
  status: string;
  type: string;
}

export interface GeminiAnalyseProductImageResponseType {
  "Product Name": string;
  "Item Description": string;
  "Item Specifications": string[];
  "About the Item": string;
}

export interface AddProductStateType {
  images: string[];
  name: string;
  description: string;
  price: string;
  specifications: string;
}
