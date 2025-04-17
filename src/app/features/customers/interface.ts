import { Customer, NotificationType, OrderType } from "@/types";

export interface CustomersSliceState {
  authenticatedCustomer: Customer | null;
  authenticatedCustomerOrders: OrderType[] | [];
  authenticatedCustomerNotifications: NotificationType[] | [],
  loadingAuthenticatedCustomer: boolean;
  loadingAuthenticatedCustomerOrders: boolean;
  loadingAuthenticatedCustomerNotifications: boolean;
  isCustomerProfileComplete: boolean;
}

export interface FetchAuthenticatedCustomerResponseType {
  message: string;
  isCustomerProfileComplete: boolean;
  customer: Customer;
}

export interface FetchAuthenticatedCustomerOrdersResponseType {
  message: string;
  customerOrders: OrderType[] | [];
}

export interface FetchAuthenticatedCustomerNotificationsResponseType {
  message: string;
  customerNotifications: NotificationType[] | [];
}