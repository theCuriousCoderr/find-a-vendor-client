import { BroadcastEventType } from "@/types";

export default function websocketOnMessageHandler(
  data: BroadcastEventType,
  isAuthenticated: boolean
) {
  if (data) {
    // const payload = JSON.parse(event.data);
    // console.log(isAuthenticated)
    if (data.type === "Auth" && isAuthenticated) {
      return { type: "updateNotif", value: "1" };
    }
    if (data.type === "No_Auth") {
      return {
        type: "toast",
        value: `${new Date().toLocaleTimeString()}, A Customer just made an order`,
      };
    }
    if (data.type === "UpdateVendorDetails") {
      return {
        type: "updateVendorDetails",
        value: ``,
      };
    }
    if (data.type === "Order Made") {
      return {
        type: "orderMade",
        value: JSON.parse(data.data),
      };
    }
    if (data.type === "Order Updated") {
      return {
        type: "orderUpdated",
        value: JSON.parse(data.data),
      };
    }
    if (data.type === "Notification") {
      return {
        type: "notification",
        value: JSON.parse(data.data),
      };
    }
  }
  return { type: "", value: "" };
}
