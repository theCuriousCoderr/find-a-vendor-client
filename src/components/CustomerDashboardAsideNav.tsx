"use client";

import Link from "next/link";
import React from "react";
import Back from "./Back";
import LogoName from "./LogoName";
import { Bell, Settings, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { signOut } from "@/app/features/auth/thunk";
import Spinner from "./Spinner";

const navItems = [
  //   {
  //     label: "Products",
  //     icon: <PackageSearch className="fill-slate-300 stroke-black" />,
  //     url: "/dashboard/customer/products",
  //   },
  {
    label: "Orders",
    icon: <ShoppingCart className="fill-slate-300 stroke-black" />,
    url: "/dashboard/customer/orders",
  },
  {
    label: "Notifications",
    icon: <Bell className="fill-slate-300 stroke-black" />,
    url: "/dashboard/customer/notifications",
  },
  {
    label: "Settings",
    icon: <Settings className="fill-slate-300 stroke-black" />,
    url: "/dashboard/customer/settings",
  },
];

function CustomerDashboardAsideNav({
  openNav,
}: {
  openNav?: (value: React.SetStateAction<boolean>) => void;
}) {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { authenticatedCustomer: customer, isCustomerProfileComplete } =
    useSelector((state: RootState) => state.customers);
  // const { vendor } = useSelector((state: RootState) => state.vendors);
  const { loggingOut } = useSelector((state: RootState) => state.auth);

  function _signOut() {
    openNav && openNav(false);
    dispatch(signOut());
  }
  return (
    <>
      {/* FOR DESKTOP */}
      <div
        className={`hidden 700:block sticky ${
          isCustomerProfileComplete ? "top-0" : "top-10"
        } h-[calc(95vh_-_5rem)] max-h-96 bg-black/10 tiny-scrollbar overflow-auto w-full  space-y-2 rounded-md border border-slate-300 p-1`}
      >
        <div className="sticky z-10 -top-1 bg-slate-50">
          <Back />
        </div>

        <aside className="p-5 bg-white rounded-md">
          <LogoName clx="text-lg font-medium" />
          <p className="text-slate-600 text-sm">
            Your Customer ID:{" "}
            {customer ? (
              customer.customer_id
            ) : (
              <span className="shimmer text-transparent">_id</span>
            )}{" "}
          </p>

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
      <div className="md:hidden space-y-2 ">
        <p className="text-slate-600 text-sm px-2">
          Your Customer ID:{" "}
          {customer ? (
            customer.customer_id
          ) : (
            <span className="shimmer text-transparent">_id</span>
          )}{" "}
        </p>
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

export default CustomerDashboardAsideNav;
