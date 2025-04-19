"use client";
import React, { useEffect, useState } from "react";
import LogoName from "./LogoName";
import { motion } from "motion/react";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { Bell } from "lucide-react";
import Image from "next/image";
import Spinner from "./Spinner";
import { signOut } from "@/app/features/auth/thunk";
import isUserAuthenticated from "@/utils/isUserAuthenticated";
// import isUserAuthenticated from "@/utils/isUserAuthenticated";

function DesktopHeaderNav() {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, loggingOut } = useSelector(
    (state: RootState) => state.auth
  );

  const { authenticatedVendor: vendor, authenticatedVendorNotifications } =
    useSelector((state: RootState) => state.vendors);

  const {
    authenticatedCustomer: customer,
    authenticatedCustomerNotifications,
  } = useSelector((state: RootState) => state.customers);

  const isProtectedRoute = pathname.includes("dashboard");

  const [isOpen, setIsOpen] = useState({
    notification: false,
    avatar: false,
  });

  const [loading, setLoading] = useState({
    vendor: false,
    customer: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading({
      vendor: false,
      customer: false,
    });
    setIsOpen({
      notification: false,
      avatar: false,
    });
  }, [pathname]);

  const isCustomer = isUserAuthenticated()?.customer_id ?? false;
  const account = isCustomer
    ? {
        route: "/dashboard/customer/orders",
        image: customer?.photo || "https://picsum.photos/id/433/4752/3168",
        notifications: "/dashboard/customer/notifications",
        unread_notif:
          mounted && authenticatedCustomerNotifications.length > 0
            ? authenticatedCustomerNotifications.filter(
                (notif) => !notif.opened
              )
            : [],
        dashboard: "Go to Customer Dashboard",
      }
    : {
        route: "/dashboard/vendor/products",
        image: vendor?.logo || "https://picsum.photos/id/400/4752/3168",
        notifications: "/dashboard/vendor/notifications",
        unread_notif:
          mounted && authenticatedVendorNotifications.length > 0
            ? authenticatedVendorNotifications.filter((notif) => !notif.opened)
            : [],
        dashboard: "Go to Vendor Dashboard",
      };

  const ringValue = 10;

  function toggleIsOpen(key: "notification" | "avatar") {
    const isKeyOpen = isOpen[key];
    setIsOpen({ ...isOpen, [key]: !isKeyOpen });
  }

  function _signOut() {
    dispatch(signOut());
  }

  function show() {
    // true means hide
    return pathname !== "/signup" && pathname !== "/login";
  }

  if (!mounted) {
    return <div></div>;
  }

  return (
    <header className="xs:max-md:hidden bg-white/20 backdrop-blur-md w-full h-20 px-5 flex items-center justify-between ">
      <LogoName clx="text-2xl font-medium" />

      {show() && !isAuthenticated && (
        <div className={`flex gap-5`}>
          <Link href="/login?role=vendor">
            <Button
              text="Continue as a vendor"
              bgColor="bg-black"
              color="text-white"
              onClick={() => setLoading({ ...loading, vendor: true })}
              loading={loading.vendor}
            />
          </Link>
          <Link href="/login?role=customer">
            <Button
              text="Continue as a customer"
              bgColor="bg-black"
              color="text-white"
              onClick={() => setLoading({ ...loading, customer: true })}
              loading={loading.customer}
            />
          </Link>
        </div>
      )}

      {isAuthenticated && (
        <div className="flex items-center gap-5">
          {/* Go To Dashboard */}
          {!isProtectedRoute && (
            <Link href={account.route} className="font-medium hover:underline">
              {account.dashboard}
            </Link>
          )}
          {/* notification */}
          <motion.div
            whileHover={{
              rotate: [0, ringValue, -ringValue, ringValue, -ringValue, 0],
            }}
            className="relative rotate-0"
          >
            <Link
              href={account.notifications}
              className="relative size-full rounded-ful"
            >
              {Boolean(account.unread_notif?.length || 0) && (
                <div className="absolute -top-2 -right-1 bg-green-500 rounded-full border-2 border-white text-xs flex items-center justify-center min-w-3 px-1 aspect-square">
                  {account.unread_notif.length}
                </div>
              )}

              <Bell className="hover:scale-105 transition-all" />
            </Link>
          </motion.div>
          {/* dashboard */}
          <figure className="size-14 rounded-full ">
            <div
              onClick={() => toggleIsOpen("avatar")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleIsOpen("avatar");
              }}
              tabIndex={0} // Allows tab navigation
              role="button" // Indicates interactivity
              className="relative outline-offset-4 size-full shimmer rounded-full border border-slate-300"
            >
              {/* handles the closing of the avatar dropdown when the user clicks anywhere on the screen */}
              {isOpen.avatar && (
                <div
                  onClick={() => toggleIsOpen("avatar")}
                  className="fixed z-20 h-screen w-full top-0 left-0"
                ></div>
              )}

              {/* the avatar drop down */}
              {isOpen.avatar && (
                <ul className="absolute z-20 top-full mt-2 bg-white right-0 p-5 shadow space-y-2 text-left">
                  <li>
                    <Link
                      href={account.route}
                      className="font-medium hover:text-black/70 text-nowrap hover:underline"
                    >
                      {isCustomer ? "Customer Dashboard" : "Vendor Dashboard"}
                    </Link>
                  </li>
                  <li>
                    {loggingOut ? (
                      <Spinner color="border-t-red-500" />
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          _signOut();
                        }}
                        className="text-red-500 hover:text-red-500/70 text-nowrap hover:underline"
                      >
                        Sign Out
                      </button>
                    )}
                  </li>
                </ul>
              )}
              <div className="absolute z-10 bottom-0 right-0 size-4 bg-green-500 rounded-full border-2 border-white"></div>
              <Image
                fill={true}
                alt="Vendor Logo"
                src={account.image as string}
                sizes="56px"
                className="object-contain object-center rounded-full bg-slate-100 hover:scale-105 transition-all"
              />
            </div>
          </figure>
        </div>
      )}
    </header>
  );
}

export default DesktopHeaderNav;
