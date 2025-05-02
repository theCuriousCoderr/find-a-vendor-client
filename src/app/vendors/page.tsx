"use client";
import React, { useEffect, useState } from "react";
import VendorCard from "@/components/VendorCard";
import VendorFilter from "@/components/VendorFilter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Star } from "lucide-react";
import ImageFallback from "@/components/ImageFallback";
import Button from "@/components/Button";
import Link from "next/link";
import LoadMore from "@/components/LoadMore";
import { clearLoginRedirect } from "../features/login/loginSlice";
import {
  getAvailableProducts,
  getAvailableVendors,
  getFilteredVendors,
} from "../features/public/thunk";
import ListCount from "@/components/ListCount";
import GoToTop from "@/components/GoToTop";

function VendorCardSkeleton({ length }: { length: number }) {
  return (
    <>
      {new Array(length).fill(0).map((item, index) => {
        return (
          <div
            key={item + index}
            className="bg-black/15 relative rounded-md overflow-hidden shadow-sm"
          >
            <figure className="shimmer w-full aspect-square max-h-80 relative flex items-center justify-center">
              <ImageFallback size="size-20" />
            </figure>
            <div className="p-2 space-y-1">
              <div className="flex items-center gap-2">
                <figure className="size-10 shimmer bg-slate-200 rounded-md flex items-center justify-center">
                  <ImageFallback size="size-5" />
                </figure>
                <p className="shimmer text-transparent">Vendor Name</p>
              </div>

              <div className="flex items-center gap-1">
                <Star fill="#FACC15" stroke="#EAB308" size="20" />{" "}
                <span className="w-full shimmer h-5 rounded-sm"></span>
              </div>
              <p className="shimmer h-5 rounded-sm"></p>
              <p className="shimmer h-5 rounded-sm"></p>
              <div className="flex items-center gap-2 text-slate-500">
                <p>Tags:</p>
                <ul className="flex items-center gap-1">
                  <span className="shimmer text-transparent p-1 bg-[#ff7070] rounded-md text-xs">
                    Bags
                  </span>
                  <span className="shimmer text-transparent p-1 bg-[#ff7070] rounded-md text-xs">
                    Bags
                  </span>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function Vendors() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loadingVendors,
    vendorsList,
    productsList,
    vendorsRound: round,
    slice,
  } = useSelector((state: RootState) => state.public);

  const { vendorFilters, vendorSearch } = useSelector(
    (state: RootState) => state.dropdownFilter
  );
  const [activeDropdown, setActiveDropdown] = useState("");
  const [goToAvailableProducts, setGoToAvailableProducts] = useState(false);
  const isVendorsListFilterActive =
    vendorFilters.length > 0 || vendorSearch.length > 0;

  useEffect(() => {
    dispatch(clearLoginRedirect()); //removes the redirect loading spinner screen
    !vendorsList && dispatch(getAvailableVendors({ round, slice }));
    !productsList && dispatch(getAvailableProducts({ round: 1, slice }));
  }, []);

  // fetches more vendors everytime 'round' changes
  // the function to call for fetch depends on if the filter is active or not
  useEffect(() => {
    if (isVendorsListFilterActive) {
      dispatch(getFilteredVendors({ round, slice }));
    } else {
      vendorsList && dispatch(getAvailableVendors({ round, slice }));
    }
  }, [round]);

  // apply filter to vendors anytime the filter is active
  useEffect(() => {
    vendorsList && dispatch(getFilteredVendors({ round, slice }));
  }, [vendorFilters, vendorSearch]);

  if (!vendorsList) {
    return <VendorCardSkeleton length={7} />;
  }

  return (
    <main id="vendorsPage" className="max-w-[1300px] mx-auto">
      {/* filter section */}
      <VendorFilter
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
      <section>
        {/* <div className="size-[600px] bg-red-500"></div> */}

        <div className="sticky xs:max-md:static top-0 z-10 bg-white/50 backdrop-blur-sm pb-5">
          <h1
            className={`${
              loadingVendors ? "text-slate-400" : "text-black"
            } px-5 xs:max-md:p-2 text-3xl xs:max-md:text-2xl font-medium py-2`}
          >
            {loadingVendors ? "Applying Filters ..." : "Available Vendors List"}
          </h1>
          <div className="inline-flex px-5 xs:max-md:px-2">
            <Link href="/products/all">
              <Button
                loading={goToAvailableProducts}
                onClick={() => setGoToAvailableProducts(true)}
                text="Go to Available Products >"
                bgColor="bg-black"
                color="text-white"
              />
            </Link>
          </div>
        </div>

        {/* Vendors Card */}
        <ul className="grid auto-rows-fr xs:max-md:auto-rows-auto grid-cols-5 gap-5 xs:max-500:grid-cols-1 500:max-700:grid-cols-2 700:max-lg:grid-cols-3 lg:max-xl:grid-cols-4 xl:max-2xl:grid-cols-5 md:gap-x-5 p-5 xs:max-md:px-3">
          {!vendorsList && loadingVendors ? (
            <VendorCardSkeleton length={7} />
          ) : (
            <>
              {vendorsList &&
                vendorsList.map((_vendor, index) => {
                  return (
                    <li key={_vendor.vendor_id} className="">
                      <VendorCard
                        index={index}
                        vendor={_vendor}
                        vendorsLength={vendorsList.length}
                      />
                    </li>
                  );
                })}
            </>
          )}
        </ul>
      </section>

      {loadingVendors && <LoadMore />}
      <div className="fixed right-2 bottom-2 z-10 space-y-2">
        <ListCount length={vendorsList.length} />
        <GoToTop elementId="vendorsPage" />
      </div>
    </main>
  );
}

export default Vendors;
