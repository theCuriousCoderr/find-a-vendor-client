"use client";

import { Bell, CircleX, LayoutDashboard, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LogoName from "./LogoName";
import Link from "next/link";
import Button from "./Button";
import { usePathname } from "next/navigation";
import VendorDashboardAsideNav from "./VendorDashboardAsideNav";
import Image from "next/image";
import Spinner from "./Spinner";
import { signOut } from "@/app/features/auth/thunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import CustomerDashboardAsideNav from "./CustomerDashboardAsideNav";
import isUserAuthenticated from "@/utils/isUserAuthenticated";
import { HeaderAccountType } from "@/types";

function MobileSideNav() {
  const pathname = usePathname();

  function show() {
    // true means hide
    return pathname !== "/signup" && pathname !== "/login";
  }
  const [openSideBar, setOpenSideBar] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loggingOut } = useSelector(
    (state: RootState) => state.auth
  );

  const { authenticatedVendor: vendor, authenticatedVendorNotifications } =
    useSelector((state: RootState) => state.vendors);

  const {
    authenticatedCustomer: customer,
    authenticatedCustomerNotifications,
  } = useSelector((state: RootState) => state.customers);

  const [isOpen, setIsOpen] = useState({
    notification: false,
    avatar: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCustomer = isUserAuthenticated()?.customer_id ?? false;
  let account: HeaderAccountType = {
    route: "/",
    image: "",
    notifications: "/",
    unread_notif: [],
    dashboard: "Go to Customer Dashboard",
  };

  if (mounted) {
    account = isCustomer
      ? {
          route: "/dashboard/customer/orders",
          image: customer?.photo || "https://picsum.photos/id/433/4752/3168",
          notifications: "/dashboard/customer/notifications",
          unread_notif:
            mounted && (authenticatedCustomerNotifications?.length || 0) > 0
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
            mounted && (authenticatedVendorNotifications?.length || 0) > 0
              ? authenticatedVendorNotifications.filter(
                  (notif) => !notif.opened
                )
              : [],
          dashboard: "Go to Vendor Dashboard",
        };
  }

  function toggleIsOpen(key: "notification" | "avatar") {
    const isKeyOpen = isOpen[key];
    setIsOpen({ ...isOpen, [key]: !isKeyOpen });
  }

  function _signOut() {
    dispatch(signOut());
  }

  if (!mounted) {
    return (
      <div className="md:hidden bg-white/20 backdrop-blur-md h-20 flex items-center justify-between pl-5 pr-2 xs:max-md:pl-2">
        <div className="flex items-center gap-4 xs:max-md:gap-2">
          <button className="">
            <Menu />
          </button>
          <LogoName clx="text-xl font-medium" />
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden bg-white/20 backdrop-blur-md h-20 flex items-center justify-between pl-5 pr-2 xs:max-md:pl-2">
      <div className="flex items-center gap-4 xs:max-md:gap-2">
        <button onClick={() => setOpenSideBar(true)} className="">
          <Menu />
        </button>
        <LogoName clx="text-xl font-medium" />
      </div>

      {!openSideBar && isAuthenticated && (
        <div className="flex items-center gap-2">
          {/* Notification */}
          <div className="relative">
            <Link
              onClick={() => setOpenSideBar(false)}
              href={account.notifications}
              className="relative size-full rounded-ful"
            >
              {Boolean(account.unread_notif?.length || 0) && (
                <div className="absolute -top-2 -right-1 bg-green-500 rounded-full border-2 border-white text-xs flex items-center justify-center min-w-3 px-1 aspect-square">
                  {account.unread_notif.length}
                </div>
              )}

              <Bell />
            </Link>
          </div>
          {/* Profile */}
          <figure className="size-12 rounded-full">
            <div
              onClick={() => toggleIsOpen("avatar")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleIsOpen("avatar");
              }}
              tabIndex={0} // Allows tab navigation
              role="button" // Indicates interactivity
              className="relative outline-offset-4 size-full shimmer rounded-full"
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
                      Go To Dashboard
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
                alt="Profile Image"
                src={account.image}
                className="object-cover object-center rounded-full"
              />
            </div>
          </figure>
        </div>
      )}

      <AnimatePresence>
        {openSideBar && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="absolute border top-0 left-0 h-screen w-full bg-white"
          >
            <div className="h-20 flex items-center px-2">
              <button
                onClick={() => setOpenSideBar(false)}
                className="size-full"
              >
                <CircleX />
              </button>

              {isAuthenticated && (
                <div className="flex items-center gap-2">
                  {/* Notification */}
                  <div className="relative">
                    <Link
                      onClick={() => setOpenSideBar(false)}
                      href={account.notifications}
                      className="relative size-full rounded-ful"
                    >
                      {Boolean(account.unread_notif?.length || 0) && (
                        <div className="absolute -top-2 -right-1 bg-green-500 rounded-full border-2 border-white text-xs flex items-center justify-center min-w-3 px-1 aspect-square">
                          {account.unread_notif.length}
                        </div>
                      )}

                      <Bell />
                    </Link>
                  </div>
                  {/* Profile */}
                  <figure className="size-12 rounded-full">
                    <div
                      onClick={() => toggleIsOpen("avatar")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          toggleIsOpen("avatar");
                      }}
                      tabIndex={0} // Allows tab navigation
                      role="button" // Indicates interactivity
                      className="relative outline-offset-4 size-full shimmer rounded-full"
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
                              {customer ? "Customer Account" : "Vendor Account"}
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
                        alt="Profile Image"
                        src={account.image}
                        className="object-cover object-center rounded-full"
                      />
                    </div>
                  </figure>
                </div>
              )}
            </div>

            <div>
              {show() && (
                <div
                  className={`${isAuthenticated && "hidden"} px-2 space-y-2`}
                >
                  <div>
                    <Link href="/login?role=vendor" className="">
                      <Button
                        text="Continue as a vendor"
                        bgColor="bg-black"
                        color="text-white"
                        onClick={() => setOpenSideBar(false)}
                      />
                    </Link>
                  </div>
                  <div>
                    <Link href="/login?role=customer">
                      <Button
                        text="Continue as a customer"
                        bgColor="bg-black"
                        color="text-white"
                        onClick={() => setOpenSideBar(false)}
                      />
                    </Link>
                  </div>
                </div>
              )}
              {pathname.includes("/dashboard/vendor") && (
                <VendorDashboardAsideNav openNav={setOpenSideBar} />
              )}
              {pathname.includes("/dashboard/customer") && (
                <CustomerDashboardAsideNav openNav={setOpenSideBar} />
              )}
              {!pathname.includes("/dashboard/vendor") &&
                !pathname.includes("/dashboard/customer") &&
                isAuthenticated && (
                  <ul className="px-2">
                    <li
                      onClick={() => setOpenSideBar && setOpenSideBar(false)}
                      className="group hover:bg-slate-100 rounded-r-md"
                    >
                      <Link
                        href={account.route}
                        className="flex items-center gap-2 "
                      >
                        <div
                          className={`${
                            pathname.includes(account.route) && "opacity-30"
                          } size-8 bg-gradient-to- from-[#24C6DC] to-[#514A9D] text-white flex items-center justify-center rounded-md`}
                        >
                          <LayoutDashboard className="fill-slate-300 stroke-black" />
                        </div>
                        <p
                          className={`${
                            pathname.includes(account.route)
                              ? "font-light text-slate-400"
                              : "font-medium text-black"
                          }`}
                        >
                          {account.dashboard}
                        </p>
                      </Link>
                    </li>
                  </ul>
                  // <p className="px-2">
                  //   <Link
                  //     href={account.route}
                  //     className="font-medium hover:text-black/70 text-nowrap hover:underline"
                  //   >
                  //     {account.dashboard}
                  //   </Link>
                  // </p>
                )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileSideNav;
