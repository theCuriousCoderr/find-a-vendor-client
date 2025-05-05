"use client";

import { clearLoginRedirect } from "@/app/features/login/loginSlice";
import { AppDispatch, RootState } from "@/app/store";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerDashboardAsideNav from "@/components/CustomerDashboardAsideNav";
import Image from "next/image";
import { getAuthenticatedCustomer } from "@/app/features/customers/thunk";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Spinner from "@/components/Spinner";

function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  let pathName = usePathname();
  pathName = pathName.replace("/dashboard/customer/", "");

  const { authenticatedCustomer: customer, isCustomerProfileComplete } =
    useSelector((state: RootState) => state.customers);
  const renderCountRef = useRef(0);

  useEffect(() => {
    renderCountRef.current++;
    !customer && dispatch(getAuthenticatedCustomer());
    dispatch(clearLoginRedirect());
  }, []);

  if (!customer) {
    return <Spinner color="border-t-blue-500" />;
  }

  return (
    <div className="max-w-[1300px] mx-auto">
      {!isCustomerProfileComplete && (
        <Link href="/dashboard/vendor/settings/profile">
          <p className="bg-pink-100 text-red-500 text-center text-sm rounded-md p-2 my-2 sticky xs:max-md:static top-0 mx-2 z-20">
            Complete your profile to ensure you are able to place orders.
          </p>
        </Link>
      )}
      <div className="w-full flex bg-lame gap-2 p-2">
        {/* The sidebar nav component  */}
        <div className="xs:max-md:hidden w-[200px] bg-lame">
          <CustomerDashboardAsideNav />
        </div>

        {/* The main view of the sidebar nav */}
        <main className="relative w-[calc(100%_-_200px)] xs:max-md:w-full">
          <div
            className={`sticky xs:max-md:static z-10 ${
              isCustomerProfileComplete ? "top-0" : "top-10"
            } w-full bg-green-40 h-80 xs:max-md:h-60 rounded-t-lg overflow-hidden shimmer`}
          >
            <figure className="relative size-full">
              <Image
                fill={true}
                priority={true}
                src="/banner-2.jpg"
                alt="Customer banner"
                className="object-cover object-center "
              />
            </figure>
          </div>

          <div className=" relative z-10 -mt-32 space-y-2 ">
            <ul className="inline-flex bg-white text-slate-500 font-medium px-2 items-center mx-2 rounded-sm">
              {pathName.split("/").map((frag) => (
                <li key={frag} className="capitalize group flex items-center">
                  {frag}{" "}
                  <div className="group-last:hidden">
                    <ChevronRight size={20} />{" "}
                  </div>{" "}
                </li>
              ))}
            </ul>
            <div className="bg-white rounded-md  p-5 xs:max-md:p-2 xs:max-md:mx-1">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CustomerDashboardLayout;
