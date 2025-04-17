import Cookies from "js-cookie";

export default function isUserAuthenticated() {
  const customer_id = Cookies.get("customer_id");
  const vendor_id = Cookies.get("vendor_id");

  if (customer_id) {
    return { customer_id: customer_id };
  }
  if (vendor_id) {
    return { vendor_id: vendor_id };
  }
  return null;
}
