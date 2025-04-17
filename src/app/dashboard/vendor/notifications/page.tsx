"use client";

// import { getAuthenticatedCustomerOrders } from "@/app/features/customers/thunk";
import { AppDispatch, RootState } from "@/app/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BellDot, BellMinus } from "lucide-react";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import {
  getAuthenticatedVendorNotifications,
  getAuthenticatedVendorOrders,
} from "@/app/features/vendors/thunk";
import formattedOrderCardDate from "@/utils/formattedOrderCardDate";
import notificationMessage from "@/utils/notificationMessage";
import { StatusVariants } from "@/types";
import { readNotification } from "@/app/features/notification/thunk";

// const notifs = [
//   {
//     order_id: "1",
//     link: "/dashboard/vendor/orders?selectedOrder=1",
//     text: "You declined an order",
//     time: "Apr 16, 2025 - 2:52:51 PM",
//     opened: false,
//   },
//   {
//     order_id: "2",
//     link: "/dashboard/vendor/orders?selectedOrder=2",
//     text: "A customer cancelled an order.",
//     time: "Apr 16, 2025 - 2:52:51 PM",
//     opened: false,
//   },
//   {
//     order_id: "3",
//     link: "/dashboard/vendor/orders?selectedOrder=3",
//     text: "An order was completed",
//     time: "Apr 16, 2025 - 2:52:51 PM",
//     opened: true,
//   },
//   {
//     order_id: "4",
//     link: "/dashboard/vendor/orders?selectedOrder=4",
//     text: "An order was completed",
//     time: "Apr 16, 2025 - 2:52:51 PM",
//     opened: false,
//   },
//   {
//     order_id: "5",
//     link: "/dashboard/vendor/orders?selectedOrder=5",
//     text: "You declined an order",
//     time: "Apr 16, 2025 - 2:52:51 PM",
//     opened: true,
//   },
//   {
//     order_id: "6",
//     link: "/dashboard/vendor/orders?selectedOrder=6",
//     text: "An order was completed",
//     time: "Apr 16, 2025 - 2:52:51 PM",
//     opened: true,
//   },
// ];

function VendorNotificationsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    authenticatedVendorNotifications: notifications,
    loadingAuthenticatedVendorNotifications,
    authenticatedVendorOrders: orders,
  } = useSelector((state: RootState) => state.vendors);

  useEffect(() => {
    if (notifications.length === 0)
      dispatch(getAuthenticatedVendorNotifications());

    if (orders.length === 0) dispatch(getAuthenticatedVendorOrders());
  }, []);

  async function _readNotification(notification_id: string) {
    const { message } = await dispatch(
      readNotification({ notification_id })
    ).unwrap();
    if (message) dispatch(getAuthenticatedVendorNotifications());
  }

  if (loadingAuthenticatedVendorNotifications) {
    return (
      <div className="my-10 w-full flex flex-col items-center justify-center">
        <Spinner color="border-t-blue-500" />
        <p>Fetching notifications ... </p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="my-10 w-full flex flex-col items-center justify-center">
        <p>No notifications </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="gap-2 grid grid-cols-3 500:max-md:grid-cols-2 md:max-lg:grid-cols-2 xs:max-md:grid-cols-1">
        {notifications.map((notif) => {
          return (
            <li key={notif.order_id}>
              <Link
                href={`/dashboard/vendor/orders${notif.link}`}
                onClick={() => !notif.opened &&  _readNotification(notif.notification_id)}
              >
                <article className="bg-slate-50 border p-2 rounded-md space-y-2">
                  <div className="relative flex gap-2 items-start">
                    <div
                      className={`${
                        notif.opened ? "bg-transparent" : "bg-lime-400/50"
                      } size-6 rounded-full  flex items-center justify-center mt-1`}
                    >
                      {notif.opened ? (
                        <BellMinus size={20} color="#94a3b8" strokeWidth={1} />
                      ) : (
                        <BellDot size={20} strokeWidth={1} />
                      )}
                    </div>
                    <div
                      className={`${notif.opened && "text-slate-400"} text-sm`}
                    >
                      <p>
                        {notificationMessage(
                          notif.status as StatusVariants,
                          "vendor"
                        )}
                      </p>

                      <p
                        className={`${
                          notif.opened ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {formattedOrderCardDate(notif.createdAt)}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default VendorNotificationsPage;
