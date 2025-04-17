"use client";

import { clearLoginRedirect } from "@/app/features/login/loginSlice";
import { getAuthenticatedVendor } from "@/app/features/vendors/thunk";
import { AppDispatch, RootState } from "@/app/store";
import VendorDashboardAsideNav from "@/components/VendorDashboardAsideNav";
import VendorProfileCompleteDisclaimer from "@/components/VendorProfileCompleteDisclaimer";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
// import Spinner from "@/components/Spinner";

function VendorAccountLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  let pathName = usePathname();
  pathName = pathName.replace("/dashboard/vendor/", "");

  const [openDisclaimer, setOpenDisclaimer] = useState(true);
  const { authenticatedVendor: vendor, isVendorProfileComplete } = useSelector(
    (state: RootState) => state.vendors
  );
  // isVendorProfileComplete = false
  const renderCountRef = useRef(0);

  useEffect(() => {
    renderCountRef.current++;
    !vendor && dispatch(getAuthenticatedVendor());
    dispatch(clearLoginRedirect());
  }, []);

  // if (!vendor) {
  //   return <div className="h-screen w-full bg-white flex items-center justify-center"><Spinner color="border-t-blue-500" /> </div>
  // }

  return (
    <div>
      {!isVendorProfileComplete && (
        <Link href="/dashboard/vendor/settings/profile">
          <p className="bg-pink-100 text-red-500 text-center text-sm rounded-md p-2 my-2 sticky xs:max-md:static top-0 mx-2 z-50">
            Complete Your profile to ensure your store is visible to customers.
          </p>
        </Link>
      )}
      <div className="w-full flex bg-slate-50 gap-2 p-2">
        {/* The disclamier for vendors to complete their profile setup */}
        {vendor &&
          openDisclaimer &&
          renderCountRef.current === 0 &&
          !isVendorProfileComplete && (
            <VendorProfileCompleteDisclaimer
              setOpenDisclaimer={setOpenDisclaimer}
            />
          )}

        {/* The sidebar nav component  */}
        <div className="xs:max-md:hidden w-[20%] max-w-[300px] min-w-[200px]">
          <VendorDashboardAsideNav />
        </div>

        {/* The main view of the sidebar nav */}
        <main className="relative w-full bg-red-40">
          <div
            className={`sticky xs:max-md:static z-10 ${
              isVendorProfileComplete ? "top-0" : "top-10"
            } w-full bg-green-40 h-80 xs:max-md:h-60 rounded-t-lg overflow-hidden shimmer`}
          >
            <figure className="relative size-full">
              <Image
                fill={true}
                src={vendor ? (vendor.banner as string) : "/banner.jpg"}
                alt="Vendor banner"
                className="object-cover object-top"
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

export default VendorAccountLayout;
