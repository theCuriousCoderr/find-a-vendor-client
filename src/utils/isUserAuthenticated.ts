"use client";

export default function isUserAuthenticated() {
  if (typeof window !== "undefined") {
    const customer_id = localStorage.getItem("customer_id");
    const vendor_id = localStorage.getItem("vendor_id");

    if (customer_id) {
      return { customer_id: customer_id };
    }
    if (vendor_id) {
      return { vendor_id: vendor_id };
    }
    return null;
  }
  return null;
}
