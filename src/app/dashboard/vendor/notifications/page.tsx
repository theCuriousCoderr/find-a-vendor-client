"use client";

import { AppDispatch, RootState } from "@/app/store";
import React, { useEffect, useState } from "react";
import { Bell, BellDot, BellMinus, FilterX } from "lucide-react";
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
import notificationColorCode from "@/utils/notificationColorCode";
import { useDispatch, useSelector } from "react-redux";

const FILTERS = [
  {
    icon: <Bell size={20} />,
    text: "all",
  },
  {
    icon: <BellDot size={20} />,
    text: "unread",
  },
  {
    icon: <BellMinus size={20} />,
    text: "read",
  },
];

function VendorNotificationsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    authenticatedVendorNotifications: notifications,
    loadingAuthenticatedVendorNotifications,
    authenticatedVendorOrders: orders,
  } = useSelector((state: RootState) => state.vendors);

  const [notificationFilter, setNotificationFilter] = useState<
    "read" | "unread" | "all"
  >("all");

  useEffect(() => {
    if ((notifications?.length || 0) === 0)
      dispatch(getAuthenticatedVendorNotifications());

    if ((orders?.length || 0) === 0) dispatch(getAuthenticatedVendorOrders());
  }, []);

  async function _readNotification(notification_id: string) {
    const { message } = await dispatch(
      readNotification({ notification_id })
    ).unwrap();
    if (message) dispatch(getAuthenticatedVendorNotifications());
  }

  function filterNotificationList() {
    if (notificationFilter === "read")
      return notifications.filter((notification) => notification.opened);
    if (notificationFilter === "unread")
      return notifications.filter((notification) => !notification.opened);
    return notifications;
  }

  function getTextColor(text: "read" | "unread" | "all") {
    return notificationColorCode(text).textColor;
  }

  if (loadingAuthenticatedVendorNotifications) {
    return (
      <div className="my-10 w-full flex flex-col items-center justify-center">
        <Spinner color="border-t-blue-500" />
        <p>Fetching notifications ... </p>
      </div>
    );
  }

  if ((notifications?.length || 0) === 0) {
    return (
      <div className="my-10 w-full flex flex-col items-center justify-center">
        <p>No notifications </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <nav>
        <p className="capitalize text-nowrap mb-2 ml-2 hidden xs:max-md:block">
          {notificationFilter} notifications
        </p>
        <ul className="flex xs:max-md:justify-normal w-full overflow-auto no-scrollbar gap-5">
          {FILTERS.map((filter) => {
            return (
              <li key={filter.text}>
                <button
                  onClick={() =>
                    setNotificationFilter(
                      filter.text as "read" | "unread" | "all"
                    )
                  }
                  className={`${
                    notificationFilter === filter.text
                      ? `border-slate-500 ${getTextColor(
                          filter.text
                        )} bg-[#1e1e1e]`
                      : "text-slate-400"
                  } flex items-center text-sm gap-1 px-2 py-1 xs:max-md:p-2 rounded-full border hover:bg-[#1e1e1e] `}
                >
                  {filter.icon}
                  <p className="capitalize text-nowrap xs:max-md:hidden">
                    {filter.text} notifications
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="text-sm text-slate-400 my-2 text-center">
        A notification card is clickable 😉
      </p>

      {filterNotificationList().length > 0 && (
        <ul className="gap-2 grid auto-rows-fr grid-cols-3 500:max-md:grid-cols-2 md:max-lg:grid-cols-2 xs:max-md:grid-cols-1">
          {filterNotificationList().map((notif) => {
            return (
              <li key={notif.notification_id} className="h-full">
                {notif.type === "orders" && (
                  <Link
                    href={`/dashboard/vendor/orders${notif.link}`}
                    onClick={() =>
                      !notif.opened && _readNotification(notif.notification_id)
                    }
                    className="h-full"
                  >
                    <article className="bg-slate-50 border p-2 rounded-md space-y-2 h-full">
                      <div className="relative flex gap-2 items-start">
                        <div
                          className={`${
                            notif.opened ? "bg-transparent" : "bg-lime-400/50"
                          } size-6 rounded-full  flex items-center justify-center mt-1`}
                        >
                          {notif.opened ? (
                            <BellMinus
                              size={20}
                              color="#94a3b8"
                              strokeWidth={1}
                            />
                          ) : (
                            <BellDot size={20} strokeWidth={1} />
                          )}
                        </div>
                        <div
                          className={`${
                            notif.opened && "text-slate-400"
                          } text-sm`}
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
                )}

                {notif.type === "reviews" && (
                  <Link
                    href={`/products${notif.link}`}
                    onClick={() =>
                      !notif.opened && _readNotification(notif.notification_id)
                    }
                    className="h-full"
                  >
                    <article className="bg-slate-50 border p-2 rounded-md space-y-2 h-full">
                      <div className="relative flex gap-2 items-start">
                        <div
                          className={`${
                            notif.opened ? "bg-transparent" : "bg-lime-400/50"
                          } size-6 rounded-full  flex items-center justify-center mt-1`}
                        >
                          {notif.opened ? (
                            <BellMinus
                              size={20}
                              color="#94a3b8"
                              strokeWidth={1}
                            />
                          ) : (
                            <BellDot size={20} strokeWidth={1} />
                          )}
                        </div>
                        <div
                          className={`${
                            notif.opened && "text-slate-400"
                          } text-sm`}
                        >
                          <p>You received a new product review.</p>
                          <p className="text-slate-500">{notif.status}</p>
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
                )}
              </li>
            );
          })}
        </ul>
      )}

      {filterNotificationList().length === 0 && (
        <div className="h-[30vh] w-full flex flex-col items-center justify-center">
          <div className="size-20 bg-slate-500/20 rounded-full flex items-center justify-center">
            <FilterX />
          </div>
          <p className="py-5 text-slate-500">
            No notification matches this filter
          </p>
        </div>
      )}
    </div>
  );
}

export default VendorNotificationsPage;
