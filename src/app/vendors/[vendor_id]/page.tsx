"use client";

import { updateLoadingVendor } from "@/app/features/public/publicSlice";
import { getPublicVendor } from "@/app/features/public/thunk";
import { AppDispatch, RootState } from "@/app/store";
import Back from "@/components/Back";
import Button from "@/components/Button";
import ImageFallback from "@/components/ImageFallback";
import { CalendarDays, Instagram, MapPin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function VendorPageSkeleton() {
  return (
    <section className="relative bg-slate-100/50 w-full p-4 flex xs:max-md:flex-col items-start gap-5">
      <aside className="w-[40%] xs:max-md:w-full xs:max-md:max-w-full max-w-[400px] bg-white shadow-sm rounded-lg sticky xs:max-md:static top-24 border overflow-hidden">
        {/* Vendor Banner */}
        <figure className="relative h-40 bg-slate-100 flex items-center justify-center">
          <ImageFallback size="size-20" />
        </figure>
        <div className="relative -top-20 -mb-16 px-5">
          {/* Vendor Logo */}
          <figure className="relative size-40 rounded-full border-4 border-slate-300 bg-slate-100">
            <div className="size-full flex items-center justify-center">
              <ImageFallback size="size-10" />
            </div>
          </figure>

          {/* Vendor Info */}
          <div className="mt-5 space-y-1">
            {/* vendor name, vendor tag */}
            <div>
              <p className="font-bold text-2xl ">
                <span className="shimmer text-transparent">shimmer</span>
              </p>
              <p className="text-slate-400">
                @ <span className="shimmer text-transparent">shimmer</span>
              </p>
            </div>

            {/* location, date joined */}
            <div className="flex items-center text-sm gap-3">
              <div className="flex items-center gap-1">
                <MapPin size={20} color="#64748b" />
                <span className="shimmer text-transparent">shimmer</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays size={20} color="#64748b" />
                <span>
                  Joined{" "}
                  <span className="shimmer text-transparent">shimmer</span>
                </span>
              </div>
            </div>

            <p className="text-slate-400">
              <span className="shimmer text-transparent">10</span> completed
              orders
            </p>

            {/* instagram, twitter */}
            <div className="flex gap-4">
              <div className="">
                <Instagram size={30} color="#cbd5e1" />
              </div>
              <div className="">
                <Twitter size={30} color="#cbd5e1" />
              </div>
            </div>

            {/* Chat on whatsapp */}
            <div>
              <p className="font-bold text-slate-300">Chat on WhatsApp</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="w-full space-y-5">
        {[1, 2].map((item) => {
          return (
            <section key={item} className="bg-white">
              <h2 className=" shimmer text-transparent text-white h-10 flex items-center px-5 text-xl">
                <span className="shimmer text-transparent">shimmer</span>
              </h2>
              <ul className="grid grid-cols-4 xs:max-600:grid-cols-2 600:max-md:grid-cols-3 gap-4 p-4">
                {[1, 2, 3, 4].map((item) => (
                  <li
                    key={item}
                    className="h-60 hover:relative hover:z-10 hover:border hover:shadow-sm hover:scale-105 rounded-md transition-all"
                  >
                    <div>
                      <div className="h-52 shimmer bg-slate-200 flex items-center justify-center">
                        {" "}
                        <ImageFallback size="size-20" />
                      </div>
                      <p className="text-center pt-1 text-transparent ">
                        <span className="shimmer text-transparent">
                          shimmer
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
    </section>
  );
}

function VendorPage({ params }: { params: Promise<{ vendor_id: string }> }) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loadingVendor,
    selectedVendor: vendor,
    selectedVendorProducts: vendorProducts,
    selectedVendorCompletedOrders: vendorCompletedOrders
  } = useSelector((state: RootState) => state.public);

  const valid_vendor_id = vendor && vendor._id !== "-1";
  const categories =
    valid_vendor_id &&
    vendor.categories.toSorted((a, b) => a.length - b.length);

  // fetch the vendor details by vendor_id
  async function resolveSearchParams() {
    const { vendor_id } = await params;
    // if the selected vendor is same as the one in state, don't fetch again
    if (vendor_id === vendor?.vendor_id.toString()) {
      dispatch(updateLoadingVendor({ status: false }));
      return;
    }
    dispatch(getPublicVendor({ vendor_id }));
  }

  function constructProductUrl(
    vendor_id: string,
    category: string,
    product_id: string
  ) {
    return `/products?vendor_id=${vendor_id}&category=${category}&product_id=${product_id}`;
  }

  // on first page load, fetch vendor
  useEffect(() => {
    // display the vendor loading UI
    dispatch(updateLoadingVendor({ status: true }));
    resolveSearchParams();
    // window.scrollY = 0
  }, []);

  if (!vendor || loadingVendor) {
    return <VendorPageSkeleton />;
  }

  if (!valid_vendor_id) {
    return (
      <section className=" bg-slate-100/50 w-full p-4 flex xs:max-md:flex-col items-start gap-5 ">
        <main className="w-full space-y-5">
          <p className="font-medium text-slate-800 text-xl mb-5">
            No vendor of vendor_id,{" "}
            <q className="font-medium text-xl text-slate-500">
              {vendor.vendor_id}
            </q>
            , exists.
          </p>
          <Link href={`/vendors`}>
            <Button
              text="View Available Vendors"
              bgColor="bg-blue-500"
              color="text-white"
            />
          </Link>
        </main>
        <aside className="w-[40%] xs:max-md:w-full xs:max-md:max-w-full max-w-[400px] bg-white shadow-sm rounded-lg sticky xs:max-md:static top-24 border overflow-hidden">
          {/* Vendor Banner */}
          <figure className="relative h-40 bg-slate-100 flex items-center justify-center">
            <ImageFallback size="size-20" />
          </figure>
          <div className="relative -top-20 -mb-16 px-5">
            {/* Vendor Logo */}
            <figure className="relative size-40 rounded-full border-4 border-slate-300 bg-slate-100">
              <div className="size-full flex items-center justify-center">
                <ImageFallback size="size-10" />
              </div>
            </figure>

            {/* Vendor Info */}
            <div className="mt-5 space-y-1">
              {/* vendor name, vendor tag */}
              <div>
                <p className="font-bold text-2xl ">
                  <span className="shimmer text-transparent">shimmer</span>
                </p>
                <p className="text-slate-400">
                  @ <span className="shimmer text-transparent">shimmer</span>
                </p>
              </div>

              {/* location, date joined */}
              <div className="flex items-center text-sm gap-3">
                <div className="flex items-center gap-1">
                  <MapPin size={20} color="#64748b" />
                  <span className="shimmer text-transparent">shimmer</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays size={20} color="#64748b" />
                  <span>
                    Joined{" "}
                    <span className="shimmer text-transparent">shimmer</span>
                  </span>
                </div>
              </div>

              <p className="text-slate-400">
                <span className="shimmer text-transparent">10</span> completed
                orders
              </p>

              {/* instagram, twitter */}
              <div className="flex gap-4">
                <div className="">
                  <Instagram size={30} color="#cbd5e1" />
                </div>
                <div className="">
                  <Twitter size={30} color="#cbd5e1" />
                </div>
              </div>

              {/* Chat on whatsapp */}
              <div>
                <p className="font-bold text-slate-300">Chat on WhatsApp</p>
              </div>
            </div>
          </div>
        </aside>
        
      </section>
    );
  }

  return (
    <section className="relative bg-slate-100/50 w-full p-4 xs:max-md:p-2 flex xs:max-md:flex-col items-start gap-5">
      {/* aside: to show details, inormation about the vendor */}
      <aside className="w-[40%] xs:max-md:w-full xs:max-md:max-w-full max-w-[400px] sticky xs:max-md:static top-24 ">
        {/* Back */}
        <div className="mb-2 xs:max-md:hidden">
          <Back />
        </div>

        {/* content */}
        <div className=" bg-white shadow-sm rounded-lg sticky xs:max-md:static top-24 border overflow-hidden">
          {/* Vendor Banner */}
          <figure className="relative h-40 xs:max-md:h-60 bg-slate-100">
            <Image
              src={vendor.banner || "/image-load-error.png"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              fill={true}
              alt="Vendor Banner"
              className={`object-cover  object-center`}
              // onError={() => setImageError(true)}
            />
          </figure>

          <div className="relative -top-20 -mb-16 px-5 xs:max-md:px-3">
            {/* Vendor Logo */}
            <figure className="relative size-40 rounded-full border-4 border-slate-300 bg-slate-100">
              <Image
                src={vendor.logo || "/image-load-error.png"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                fill={true}
                alt="Vendor Banner"
                className={`object-cover object-center rounded-full`}
                // onError={() => setImageError(true)}
              />
            </figure>

            {/* Vendor Info */}
            <div className="mt-5 space-y-1">
              {/* vendor name, vendor tag */}
              <div>
                <p className="font-bold text-2xl ">
                  {vendor?.storeName}
                  <span className="text-lg text-slate-600">
                    /{vendor.vendor_id}
                  </span>{" "}
                </p>
                <p className="text-slate-400">@{vendor?.storeTag}</p>
              </div>

              {/* location, date joined */}
              <div className="flex flex-wrap items-center text-sm gap-3">
                <div className="flex items-center gap-1">
                  <MapPin size={20} color="#64748b" />
                  <span>
                    {vendor?.location.state}, {vendor?.location.country}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays size={20} color="#64748b" />
                  <span>Joined {vendor?.joined}</span>
                </div>
              </div>

              <p className="text-slate-400">
                {/* {vendor?.completedOrders || 10} completed orders */}
                {vendorCompletedOrders} completed {vendorCompletedOrders === 1 ? "order" : "orders" }
              </p>
              <ul className="flex flex-wrap items-center gap-1">
                {categories &&
                  categories.map((tag) => (
                    <span
                      key={tag}
                      className="p-1 text-nowrap bg-[#ff7070]/30 backdrop-blur-sm text-peach rounded-md text-xs text-whit"
                    >
                      {tag}
                    </span>
                  ))}
              </ul>

              {/* instagram, twitter */}
              <div className="flex gap-4">
                <Link
                  href={vendor?.socials.instagram || ""}
                  target="_blank"
                  className="hover:text-red-500"
                >
                  <Instagram size={30} />
                </Link>
                <Link
                  href={vendor?.socials.twitter || ""}
                  target="_blank"
                  className="hover:text-blue-500"
                >
                  <Twitter size={30} />
                </Link>
              </div>

              {/* Chat on whatsapp */}
              <div>
                <Link
                  href={vendor?.socials.whatsapp || ""}
                  target="_blank"
                  className="font-bold text-[#00A884] hover:underline"
                >
                  Chat on WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* main; to show the vendor's products; sorted by categories */}
      <main className="w-full space-y-5">
        {categories &&
          categories.map((tag) => {
            return (
              <section key={tag} className="bg-white">
                <h2 className="bg-lavender text-white h-10 flex items-center px-5 text-xl capitalize ">
                  {tag}
                </h2>
                <ul className="grid grid-cols-4 xs:max-400:grid-cols-1 400:max-600:grid-cols-2 600:max-md:grid-cols-3 gap-4 p-4">
                  {vendorProducts &&
                    vendorProducts[tag.toLowerCase()].map((item) => (
                      <li
                        key={item._id}
                        className="shadow-sm border border- shadow-transparent hover:relative hover:z-10 hover:border-slate-300 hover:shadow-slate-300 rounded-md transition-all"
                      >
                        <Link
                          href={constructProductUrl(
                            vendor.vendor_id.toString(),
                            tag.toLowerCase(),
                            item?.product_id || "none"
                          )}
                        >
                          <div className="relative h-52 flex items-center justify-center">
                            <Image
                              src={item.images[0] || "/image-load-error.png"}
                              fill={true}
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              alt={item.details.name}
                              className="object-contain object-botto "
                              // onError={() => setImageError(true)}
                            />{" "}
                            {/* <ImageFallback size="size-20" /> */}
                          </div>
                          <p className="text-center text-sm p-1">
                            {" "}
                            {item.details.name}
                          </p>
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            );
          })}
      </main>

      {/* <div className="fixed size-10 bg-red-500 bottom-5 right-5"></div> */}
    </section>
  );
}

export default VendorPage;
