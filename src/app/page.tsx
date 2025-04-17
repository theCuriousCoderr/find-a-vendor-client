"use client";

import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import productsTopPicksCardsInfo from "@/static-data/products-top-picks-cards";
import { getMostOrderedProducts } from "./features/public/thunk";
import ImageFallback from "@/components/ImageFallback";
import { Pointer } from "lucide-react";
import { motion } from "motion/react";
import Spinner from "@/components/Spinner";

// skeleton loader for most ordered products on desktop view
function DesktopMostOrderedProductsSkeleton() {
  return (
    <ul className="xs:max-md:hidden flex justify-center mt-10">
      {productsTopPicksCardsInfo.slice(0, 5).map((pick) => (
        <li
          key={pick.id}
          className={`${pick.top} ${pick.rotation} border-2 border-slate-100 hover:z-10 hover:scale-110 hover:rotate-0 transition-all relative -mx-5 h-[10%] min-h-60 aspect-square rounded-xl overflow-hidden`}
        >
          <figure
            className={` relative size-full bg-slate-300 animate-pulse flex items-center justify-center`}
          >
            <ImageFallback size="size-20" />
          </figure>
        </li>
      ))}
    </ul>
  );
}

// skeleton loader for most ordered products on mobile view
function MobileMostOrderedProductsSkeleton() {
  return (
    <section className="md:hidden flex w-full relative justify-center mt-10 overflow-hidden">
      <div className="absolute z-20 bg-slate-50 w-[110%] h-10 -top-5 rounded-[50%]"></div>
      <div className="absolute z-20 bg-slate-50 w-[110%] h-10 -bottom-5 rounded-[50%]"></div>
      <div className="flex gap-5 w-full overflow-y-hidden overflow-auto no-scrollbar shimmer">
        {new Array(10).fill(0).map((product, index) => (
          <figure
            key={product + index}
            className={`hover:z-10 hover:scale-110 border-x border-slate-400 bg-white hover:rotate-0 transition-all relative size-60 min-w-60 rounded-xl overflow-hidden flex items-center justify-center`}
          >
            <ImageFallback size="size-20" />
          </figure>
        ))}
      </div>
    </section>
  );
}

// most ordered products on desktop view
function DesktopMostOrderedProducts() {
  const [imageError, setImageError] = useState(false);
  const { mostOrderedProducts } = useSelector(
    (state: RootState) => state.public
  );
  return (
    <div>
      <ul className="xs:max-md:hidden flex justify-center mt-10">
        {mostOrderedProducts &&
          mostOrderedProducts.slice(0, 5).map((product, index) => (
            <li
              key={product._id}
              className={`${productsTopPicksCardsInfo[index].top} ${productsTopPicksCardsInfo[index].rotation} border-2 border-slate-100 hover:z-10 hover:scale-110 transition-all relative -mx-5 hover:border-slate-500 h-[10%] min-h-60 aspect-square rounded-xl overflow-hidden`}
            >
              <Link href={`/vendors/${product.vendor_id}`}>
                <figure className={` relative size-full bg-white`}>
                  <div className="absolute z-10 top-2 left-2 bg-black/30 backdrop-blur-sm text-white p-1 rounded-md">
                    @{product.vendor_id}
                  </div>
                  <Image
                    src={
                      imageError ? "/image-load-error.png" : product.images[0]
                    }
                    fill={true}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={product.details.name}
                    className={`${
                      imageError ? "object-contain" : "object-contain"
                    }`}
                    onError={() => setImageError(true)}
                  />
                </figure>
              </Link>
            </li>
          ))}
      </ul>

      <ul className="xs:max-md:hidden flex justify-center mt-10">
        {mostOrderedProducts &&
          mostOrderedProducts.slice(5).map((product, index) => (
            <li
              key={product._id}
              className={`${productsTopPicksCardsInfo[index].top} ${productsTopPicksCardsInfo[index].rotation} border-2 border-slate-100 hover:z-10 hover:scale-110 transition-all relative -mx-5 hover:border-slate-500 h-[10%] min-h-60 aspect-square rounded-xl overflow-hidden`}
            >
              <Link href={`/vendors/${product.vendor_id}`}>
                <figure className={` relative size-full bg-white`}>
                  <div className="absolute z-10 top-2 left-2 bg-black/30 backdrop-blur-sm text-white p-1 rounded-md">
                    @{product.vendor_id}
                  </div>
                  <Image
                    src={
                      imageError ? "/image-load-error.png" : product.images[0]
                    }
                    fill={true}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={product.details.name}
                    className={`${
                      imageError ? "object-contain" : "object-contain"
                    }`}
                    onError={() => setImageError(true)}
                  />
                </figure>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

// most ordered products on movile view
function MobileMostOrderedProducts() {
  const [imageError, setImageError] = useState(false);
  const { mostOrderedProducts } = useSelector(
    (state: RootState) => state.public
  );
  const [selectedProduct, setSelectedProduct] = useState("");
  return (
    <section className="md:hidden flex w-full relative justify-center mt-10 overflow-">
      <div className="absolute z-20 bg-slate-50 w-[110%] h-12 -top-7 rounded-[50%] border-b-2 border-slate-200"></div>
      <div className="absolute z-20 bg-slate-50 w-[110%] h-12 -bottom-7 rounded-[50%] border-t-2 border-slate-200"></div>
      <ul className="flex gap-5 w-full overflow-y-hidden overflow-auto no-scrollbar shimmer">
        {mostOrderedProducts &&
          mostOrderedProducts.map((product) => (
            <li
              key={product._id}
              className={`hover:z-10 border-x border-slate-400 hover:rotate-0 transition-all relative size-60 min-w-60 rounded-xl overflow-hidden`}
            >
              {selectedProduct !== product._id.toString() ? (
                <Link
                  href={`/vendors/${product.vendor_id}`}
                  onClick={() => setSelectedProduct(product._id.toString())}
                  className="size-full"
                >
                  <figure className="relative size-full flex items-center justify-center">
                    <motion.div
                      animate={{ y: [-2, 2] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut",
                      }}
                      className="absolute z-10 size-5 rounded-full flex items-center justify-center"
                    >
                      <Pointer
                        color="#FFFFFF"
                        className="fill-white stroke-black"
                      />
                    </motion.div>
                    <div className="absolute z-10 top-10 left-2 bg-black/30 backdrop-blur-sm text-white p-1 rounded-md">
                      @{product.vendor_id}
                    </div>
                    <Image
                      src={
                        imageError ? "/image-load-error.png" : product.images[0]
                      }
                      fill={true}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt={product.details.name}
                      className={`${
                        imageError ? "object-contain" : "object-cover"
                      } bg-white`}
                      onError={() => setImageError(true)}
                    />
                  </figure>
                </Link>
              ) : (
                <div className="size-full bg-black flex items-center justify-center">
                  <Spinner />
                </div>
              )}
            </li>
          ))}
      </ul>
    </section>
  );
}

// app entry point, defaults to "/"
export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  // redux state to handle all public data that can be viewed by visiting users
  const { loadingMostOrderedProducts, mostOrderedProducts } = useSelector(
    (state: RootState) => state.public
  );

  // sets the laoding state for the "See available vendors" button
  const [seeAvailableVendors, setSeeAvailableVendors] = useState(false);
  // sets the laoding state for the "Continue" button
  const [continueTo, setContinueTo] = useState(false);

  useEffect(() => {
    // fetch mostOrderedProducts on page load if it hasn't already been fetched before
    if (!mostOrderedProducts && loadingMostOrderedProducts) {
      dispatch(getMostOrderedProducts());
    }
  }, []);

  return (
    <main className="overflow-hidden">
      <div className="text-center w-[60%] xs:max-md:w-[90%] mx-auto space-y-5 pt-10 xs:max-md:pt-0">
        <h1 className="xs:max-md:hidden text-5xl xs:max-md:text-4xl font-bold">
          Find Products and Connect <br />
          With Online Vendors
          <br /> From The Comfort Of Your Home
          <br />
          With Minimal Efforts.
        </h1>
        <h1 className="md:hidden text-3xl font-bold">
          Find Products and Connect With Online Vendors From The Comfort Of Your
          Home With Minimal Efforts.
        </h1>
        <h2>Explore | Discover | Connect</h2>

        {/* display on mobile view, hide on desktop */}
        {/* button redirects to page to see all available vendors */}
        <div className="md:hidden flex flex-col gap-2 justify-center">
          <Link href="/vendors">
            <Button
              loading={seeAvailableVendors}
              onClick={() => setSeeAvailableVendors(true)}
              text="See available vendors"
              bgColor="bg-black"
              color="text-white"
            />
          </Link>
        </div>
      </div>

      {loadingMostOrderedProducts ? (
        <>
          {/* Desktop View: most ordered products Skeleton loader */}
          <DesktopMostOrderedProductsSkeleton />
          {/* Mobile View: most ordered products Skeleton loader */}
          <MobileMostOrderedProductsSkeleton />
        </>
      ) : (
        <>
          {/* Desktop View: most ordered products */}
          <DesktopMostOrderedProducts />
          {/* Mobile View: most ordered products */}
          <MobileMostOrderedProducts />
        </>
      )}

      <div className="space-y-5 xs:max-md:pb-5 xs:max-md:mt-10">
        <p className="text-center mt-10 xs:max-md:mt-0 text-xl xs:max-md:text-lg xs:max-md:w-[90%] mx-auto">
          <span className="underline">Vendors</span> can showcase and market
          their products.
          <br /> <span className="underline">Customers</span> can search for
          items and find products from vendors they like.
        </p>

        {/* display on desktop view, hide on mobile */}
        {/* button redirects to page to see all available vendors */}
        <div className="xs:max-md:hidden flex justify-center pb-20">
          <Link href="/vendors">
            <Button
              loading={seeAvailableVendors}
              onClick={() => setSeeAvailableVendors(true)}
              text="See available vendors"
              bgColor="bg-black"
              color="text-white"
            />
          </Link>
        </div>

        {/* display on mobile view, hide on desktop */}
        {/* button redirects to login page for a vendor */}
        <div className="md:hidden flex flex-col gap-2 justify-center px-5">
          <Link href="/login?role=vendor">
            <Button
              loading={continueTo}
              onClick={() => setContinueTo(true)}
              text="Continue"
              bgColor="bg-black"
              color="text-white"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
