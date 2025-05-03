"use client";

import Link from "next/link";
import React, { useState } from "react";
import Back from "./Back";
import LogoName from "./LogoName";
import {
  Bell,
  CircleCheck,
  Copy,
  PackageSearch,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { signOut } from "@/app/features/auth/thunk";
import Spinner from "./Spinner";
import { updateStatusSuccess } from "@/app/features/status/statusSlice";
import { motion } from "motion/react";

const navItems = [
  {
    label: "Products",
    icon: <PackageSearch className="fill-slate-300 stroke-black" />,
    url: "/dashboard/vendor/products",
  },
  {
    label: "Orders",
    icon: <ShoppingCart className="fill-slate-300 stroke-black" />,
    url: "/dashboard/vendor/orders",
  },
  {
    label: "Notifications",
    icon: <Bell className="fill-slate-300 stroke-black" />,
    url: "/dashboard/vendor/notifications",
  },
  {
    label: "Settings",
    icon: <Settings className="fill-slate-300 stroke-black" />,
    url: "/dashboard/vendor/settings/profile",
  },
];

function VendorDashboardAsideNav({
  openNav,
}: {
  openNav?: (value: React.SetStateAction<boolean>) => void;
}) {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { authenticatedVendor: vendor, isVendorProfileComplete } = useSelector(
    (state: RootState) => state.vendors
  );
  // const { vendor } = useSelector((state: RootState) => state.vendors);
  const { loggingOut } = useSelector((state: RootState) => state.auth);
  const [profileLink, setProfileLink] = useState(false);
  const copyIconOffset = 10;

  function _signOut() {
    openNav && openNav(false);
    dispatch(signOut());
  }

  function copyProfileLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/vendors/${vendor?.vendor_id}`
    );
    setProfileLink(true);
    setTimeout(() => {
      setProfileLink(false);
    }, 1000);
    dispatch(updateStatusSuccess({ success: "Profile Link Copied!" }));
  }
  return (
    <>
      {/* FOR DESKTOP */}
      <div
        className={`hidden 700:block sticky ${
          isVendorProfileComplete ? "top-0" : "top-10"
        } h-[calc(95vh_-_5rem)] max-h-[400px] bg-lame tiny-scrollbar overflow-auto w-full space-y-2 rounded-md p-1`}
      >
        <div className="sticky z-10 -top-1">
          <Back />
        </div>

        <aside className="p-5 bg-white rounded-md">
          <LogoName clx="text-lg font-medium" />
          <p className="text-slate-600 text-sm">
            Your Vendor ID:{" "}
            {vendor ? (
              vendor.vendor_id
            ) : (
              <span className="shimmer text-transparent">_id</span>
            )}{" "}
          </p>
          {vendor && (
            <div
              className={`mt-1 flex gap-2 items-center text-sm ${
                profileLink
                  ? "text-green-700"
                  : "text-blue-500 hover:text-blue-700 hover:underline"
              } `}
            >
              <button onClick={copyProfileLink}>
                {" "}
                {profileLink ? "Profile Link Copied" : "Copy Profile Link"}
              </button>

              {profileLink && (
                <motion.div
                  animate={{ y: [-copyIconOffset, 0] }}
                  className="relative"
                >
                  <CircleCheck size={15} />
                </motion.div>
              )}

              {!profileLink && (
                <motion.div
                  animate={{ y: [-copyIconOffset, 0] }}
                  className="relative"
                >
                  <Copy size={15} />
                </motion.div>
              )}
            </div>
          )}

          <ul className="space-y-2 mt-5">
            {navItems.map((item) => {
              return (
                <li
                  key={item.url}
                  className="group hover:bg-slate-100 rounded-r-md"
                >
                  <Link
                    href={item.url as string}
                    className="flex items-center gap-2 "
                  >
                    <div
                      className={`${
                        !pathname.includes(item.label.toLowerCase()) &&
                        "opacity-30"
                      } size-8 bg-gradient-to- from-[#24C6DC] to-[#514A9D] text-white flex items-center justify-center rounded-md`}
                    >
                      {item.icon}
                    </div>
                    <p
                      className={`${
                        pathname.includes(item.label.toLowerCase())
                          ? "font-medium text-black"
                          : "font-light text-slate-400"
                      }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                </li>
              );
            })}

            <li className="group ">
              <button
                onClick={_signOut}
                className="bg-red-500 hover:bg-red-700 rounded-md size-full text-white h-10 mt-2"
              >
                {loggingOut ? <Spinner color="border-t-white" /> : "Sign Out"}
              </button>
            </li>
          </ul>
        </aside>
      </div>

      {/* FOR MOBILE */}
      <div className="md:hidden space-y-5 ">
        <div className="space-y-1">
          <p className="text-slate-600 text-sm px-2">
            Your Vendor ID:{" "}
            {vendor ? (
              vendor.vendor_id
            ) : (
              <span className="shimmer text-transparent">_id</span>
            )}{" "}
          </p>
          {vendor && (
            <div
              className={`mt-1 flex gap-2 items-center text-sm px-2 ${
                profileLink
                  ? "text-green-700"
                  : "text-blue-500 hover:text-blue-700 hover:underline"
              } `}
            >
              <button onClick={copyProfileLink}>
                {" "}
                {profileLink ? "Profile Link Copied" : "Copy Profile Link"}
              </button>

              {profileLink && (
                <motion.div
                  animate={{ y: [-copyIconOffset, 0] }}
                  className="relative"
                >
                  <CircleCheck size={15} />
                </motion.div>
              )}

              {!profileLink && (
                <motion.div
                  animate={{ y: [-copyIconOffset, 0] }}
                  className="relative"
                >
                  <Copy size={15} />
                </motion.div>
              )}
            </div>
          )}
        </div>

        <aside className="px-2 py bg-white rounded-md">
          <ul className="space-y-2">
            {navItems.map((item) => {
              return (
                <li
                  key={item.url}
                  onClick={() => openNav && openNav(false)}
                  className="group hover:bg-slate-100 rounded-r-md"
                >
                  <Link href={item.url} className="flex items-center gap-2 ">
                    <div
                      className={`${
                        !pathname.includes(item.label.toLowerCase()) &&
                        "opacity-30"
                      } size-8 bg-gradient-to- from-[#24C6DC] to-[#514A9D] text-white flex items-center justify-center rounded-md`}
                    >
                      {item.icon}
                    </div>
                    <p
                      className={`${
                        pathname.includes(item.label.toLowerCase())
                          ? "font-medium text-black"
                          : "font-light text-slate-400"
                      }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                </li>
              );
            })}
            <li className="group ">
              <button
                onClick={_signOut}
                className="bg-red-500 hover:bg-red-700 rounded-md size-full text-white h-10 mt-2"
              >
                {loggingOut ? <Spinner color="border-t-white" /> : "Sign Out"}
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}

export default VendorDashboardAsideNav;
