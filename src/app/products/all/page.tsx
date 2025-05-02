"use client";

import {
  getAvailableProducts,
  getAvailableVendors,
  getFilteredProducts,
} from "@/app/features/public/thunk";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/Button";
import GoToTop from "@/components/GoToTop";
import ImageFallback from "@/components/ImageFallback";
import ListCount from "@/components/ListCount";
import LoadMore from "@/components/LoadMore";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { Star } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProductCardSkeleton({ length }: { length: number }) {
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
              <p className="shimmer text-transparent">Vendor Name</p>

              <div className="flex items-center gap-1">
                <Star fill="#FACC15" stroke="#EAB308" size="20" />{" "}
                <span className="w-full shimmer h-5 rounded-sm"></span>
              </div>
              <p className="shimmer h-5 rounded-sm"></p>
              <p className="shimmer h-5 rounded-sm"></p>
              <div className="flex items-center gap-2 text-slate-500">
                <ul className="flex items-center gap-1">
                  <span className="shimmer text-transparent p-1 bg-[#ff7070] rounded-md text-xs">
                    Shimmer
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

function AllProductsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loadingProducts,
    productsList,
    vendorsList,
    productsRound: round,
    slice,
  } = useSelector((state: RootState) => state.public);
  const { productFilters, productSearch } = useSelector(
    (state: RootState) => state.dropdownFilter
  );
  const [activeDropdown, setActiveDropdown] = useState("");
  const [goToAvailableVendors, setGoToAvailableVendors] = useState(false);

  const isProductsListFilterActive =
    productFilters.length > 0 || productSearch.length > 0;

  useEffect(() => {
    !productsList && dispatch(getAvailableProducts({ round, slice }));
    !vendorsList && dispatch(getAvailableVendors({ round: 1, slice }));
  }, []);

  // fetches more products everytime 'round' changes
  // the function to call for fetch depends on if the filter is active or not
  useEffect(() => {
    if (isProductsListFilterActive) {
      dispatch(getFilteredProducts({ round, slice }));
    } else {
      productsList && dispatch(getAvailableProducts({ round, slice }));
    }
  }, [round]);

  // apply filter to products anytime the filter is active
  useEffect(() => {
    isProductsListFilterActive &&
      dispatch(getFilteredProducts({ round, slice }));
  }, [productFilters, productSearch]);

  if (!productsList) {
    return <ProductCardSkeleton length={10} />;
  }

  return (
    <main id="productsPage" className="">
      <ProductFilter
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />

      <section>
        <div className="sticky  xs:max-md:static top-20 z-10 bg-white/50 backdrop-blur-sm pb-5">
          <h1
            className={`${
              loadingProducts ? "text-slate-400" : "text-black"
            } px-5 xs:max-md:p-2 text-3xl xs:max-md:text-2xl font-medium py-2`}
          >
            {loadingProducts
              ? "Applying Filters ..."
              : "Available Products List"}
          </h1>
          <div className="inline-flex px-5 xs:max-md:px-2 opacity-">
            <Link href="/vendors">
              <Button
                loading={goToAvailableVendors}
                onClick={() => setGoToAvailableVendors(true)}
                text="Go to Available Vendors  >"
                bgColor="bg-black"
                color="text-white"
              />
            </Link>
          </div>
        </div>

        <ul className="grid auto-rows-fr grid-cols-5 gap-5 xs:max-500:grid-cols-1 500:max-700:grid-cols-2 700:max-lg:grid-cols-3 lg:max-xl:grid-cols-4 xl:max-2xl:grid-cols-5 md:gap-x-5 p-5 xs:max-md:px-3">
          {/* <ProductCardSkeleton length={1} /> */}
          {loadingProducts && !productsList && (
            <ProductCardSkeleton length={10} />
          )}
          {productsList &&
            productsList.map((product, index) => (
              <ProductCard
                key={product._id}
                index={index}
                product={product}
                productsLength={productsList.length}
              />
            ))}
        </ul>
      </section>

      {loadingProducts && <LoadMore />}
      <div className="fixed right-2 bottom-2 z-10 space-y-2">
        <ListCount length={productsList.length} />
        <GoToTop elementId="productsPage" />
      </div>
    </main>
  );
}

export default AllProductsPage;
