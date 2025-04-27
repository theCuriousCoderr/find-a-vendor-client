"use client";

import { v4 as uuidv4 } from "uuid";
import Button from "@/components/Button";
import { ProductFilter, StatusVariants } from "@/types";
import React, { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Back from "@/components/Back";
import ImageFallback from "@/components/ImageFallback";
import { useRouter, useSearchParams } from "next/navigation";
import {
  cachePageBeforeRedirect,
  clearRedirectCache,
} from "@/utils/cachePageBeforeRedirect";
import { makeOrder } from "../features/order/thunk";
import { connectWebSocket } from "../features/notification/notificationSlice";
import { toast, ToastContainer } from "react-toastify";
import { getPublicProduct, getPublicVendor } from "../features/public/thunk";
import isUserAuthenticated from "@/utils/isUserAuthenticated";
// import { updateStatusSuccess } from "../features/status/statusSlice";

const statusColorCode = {
  "In stock": "text-green-500",
  "Out of stock": "text-red-500",
  "Pre-order": "text-yellow-500",
};

function ProductDetailsPageSkeleton() {
  return (
    <div className="bg-slate-100 xs:max-md:pb-20">
      <div className="py-10 xs:max-md:py-3 w-[80%] xs:max-md:w-[95%] mx-auto flex items-start gap-5">
        <main className="w-full space-y-5 ">
          {/* Product Preview  */}
          <section className="p-5 rounded-md bg-white space-y-5">
            <h2 className="text-xl">Product Info</h2>
            <div className="flex xs:max-md:flex-col gap-3">
              {/* Desktop Images */}
              <div className="xs:max-md:hidden w-80 xs:max-md:w-full space-y-2">
                <figure className="w-full aspect-square max-h-80 xs:max-md:w-full bg-slate-300 shimmer"></figure>

                <Swiper
                  modules={[Navigation]}
                  slidesPerView={4}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                >
                  {[1, 2, 3, 4].map((item) => (
                    <SwiperSlide key={item}>
                      <div className="size-16 min-w-16 bg-slate-200 shimmer text-transparent">
                        {item}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Mobile Images */}
              <div className="hidden xs:max-md:flex gap-5 w-full overflow-auto no-scrollbar">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <figure
                    key={item}
                    className="min-w-[80%]  aspect-square bg-slate-300 shimmer text-transparent"
                  >
                    {item}
                  </figure>
                ))}
              </div>

              {/* Info */}
              <div className="space-y-2">
                <h1 className="text-2xl shimmer text-transparent">Gucci Bag</h1>

                <p>
                  Category:{" "}
                  <span className="shimmer text-transparent">shimmer</span>
                </p>
                <p>
                  Vendor:{" "}
                  <span className="shimmer text-transparent">shimmer</span>
                </p>
                <div>
                  <data
                    value="0.00"
                    className="text-3xl font-medium shimmer text-transparent"
                  >
                    ₦1000
                  </data>
                </div>

                <p className="shimmer text-transparent">In stock</p>
                <div className="xs:max-md:hidden">
                  <div className="h-10 shimmer"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Product details */}
          <section className="rounded-md bg-white">
            <h2 className="p-5 border-b text-xl">Product description</h2>
            <div className="p-5 shimmer text-transparent">Details</div>
          </section>

          {/* Product Specifications */}
          <section className="rounded-md bg-white">
            <h2 className="p-5 border-b text-xl">Product Specifications</h2>
            <div className="p-5 shimmer text-transparent">Specifications</div>
          </section>

          {/* Product Reviews */}
          <section className="rounded-md bg-white">
            <h2 className="p-5 border-b text-xl">Product Reviews</h2>
            <div className="p-5 shimmer text-transparent">Reviews</div>
          </section>
        </main>

        <aside className="xs:max-md:hidden p-5 rounded-md sticky top-24 w-80 bg-white space-y-2">
          <div className="h-10 shimmer"></div>
          <div className="h-10 shimmer"></div>
        </aside>

        <div className="hidden xs:max-md:flex fixed bg-slate-100 shimmer bottom-0 left-0 right-0 py-2 items-center justify-center">
          <div className="h-10 shimmer"></div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    loadingProduct,
    selectedProduct: product,
    selectedVendor: vendor,
  } = useSelector((state: RootState) => state.public);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { isWebSocketConnected } = useSelector(
    (state: RootState) => state.notification
  );

  const [productFilter, setProductFilter] = useState<ProductFilter | null>(
    null
  );

  // check to see if user is an authenticated customer by cookie
  const customer_id = (isUserAuthenticated()?.customer_id as string) || null;
  const vendor_id = (isUserAuthenticated()?.vendor_id as string) || null;

  const [imageError, setImageError] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [buttonLoad, setButtonLoad] = useState({
    notifyVendor: false,
  });

  // fetch the product by filter
  async function resolveSearchParams() {
    const vendor_id = searchParams.get("vendor_id") || "-1";
    const category = searchParams.get("category") || "-1";
    const product_id = searchParams.get("product_id") || "-1";

    const _filter = { vendor_id, product_id, category };

    setProductFilter(_filter); //Temporarily store filter option in state

    //GET PRODUCT DETAILS FROM BACKEND USING THE FILTER
    dispatch(getPublicProduct(_filter));

    // if the vendor associated to this product is not found, fetch the vendor
    vendor?.vendor_id.toString() !== _filter.vendor_id &&
      dispatch(getPublicVendor({ vendor_id: _filter.vendor_id })); //
  }
  const valid_product = product && product._id.toString() !== "-1";
  // on first page load, fetch product
  useEffect(() => {
    clearRedirectCache("login");
    resolveSearchParams();
  }, []);

  useEffect(() => {
    valid_product && setActiveImage(product.images[0]);
  }, [product]);

  async function notifyVendor() {
    setButtonLoad({ ...buttonLoad, notifyVendor: true });
    if (!isWebSocketConnected) {
      dispatch(connectWebSocket());
    }

    if (!isAuthenticated) {
      cachePageBeforeRedirect("login", window.location.href);
      router.push("/login?role=customer");
    }

    if (isAuthenticated && !customer_id) {
      toast.warn("You can't place order as a Vendor.");
      toast.warn("Use a Customer account to place orders.");
      setButtonLoad({ ...buttonLoad, notifyVendor: false });
      return;
    }

    if (isAuthenticated && customer_id) {
      if (customer_id && vendor && product) {
        const orderDetails = {
          _id: uuidv4(),
          type: "Order Made",
          order_id: "",
          status: "pending" as StatusVariants,
          customer_id, //DONE
          vendor_id: vendor.vendor_id.toString(),
          category: product.category.toLowerCase(),
          product_id: product.product_id,
          vendor_completed_flag: false,
          customer_completed_flag: false,
          createdAt: new Date(),
        };
        await dispatch(makeOrder(orderDetails));
        // dispatch(updateStatusSuccess({ success: "Vendor Notified" }));
      }
    }
    setButtonLoad({ ...buttonLoad, notifyVendor: false });
  }

  if (!product || loadingProduct || !vendor) {
    return <ProductDetailsPageSkeleton />;
  }

  if (!valid_product) {
    if (product.vendor_id.toString() === "-1")
      return (
        <div className="p-5 max-w-[700px] mx-auto  space-y-2">
          <p className="font-medium text-slate-800 text-xl text-center">
            This Vendor, of vendor_id{" "}
            <q className="font-medium text-xl text-slate-500">
              {productFilter?.vendor_id}
            </q>{" "}
            , has no products{" "}
          </p>
          <Link href={`/vendors`}>
            <Button
              text="Look at available vendors with products"
              bgColor="bg-blue-500"
              color="text-white"
            />
          </Link>
        </div>
      );
    if (product.category === "-1")
      return (
        <div className="p-5 max-w-[700px] mx-auto  space-y-2">
          <p className="font-medium text-slate-800 text-xl text-center">
            This Vendor, of vendor_id{" "}
            <q className="font-medium text-xl text-slate-500">
              {productFilter?.vendor_id}
            </q>{" "}
            doesn&apos;t have a product category of{" "}
            <q className="font-medium text-xl text-slate-500">
              {productFilter?.category}
            </q>
          </p>

          <Link href={`/vendors/${productFilter?.vendor_id}`}>
            <Button
              text="View This Vendor Profile"
              bgColor="bg-blue-500"
              color="text-white"
            />
          </Link>
        </div>
      );

    if (product.product_id === "-1")
      return (
        <div className="p-5 max-w-[700px] mx-auto space-y-2">
          <p className="font-medium text-slate-800 text-xl text-center">
            This Product, of product_id{" "}
            <q className="font-medium text-xl text-slate-500">
              {productFilter?.product_id}
            </q>{" "}
            doesn&apos;t exist for this vendor, of vendor_id{" "}
            <q className="font-medium text-xl text-slate-500">
              {productFilter?.vendor_id}
            </q>
          </p>

          <Link href={`/vendors/${productFilter?.vendor_id}`}>
            <Button
              text="View This Vendor Profile"
              bgColor="bg-blue-500"
              color="text-white"
            />
          </Link>
        </div>
      );
  }

  return (
    <div className="bg-slate-100 xs:max-md:pb-20">
      <div className="py-5 xs:max-md:py-1 xs:max-md:pb-10 w-[80%] xs:max-md:w-[95%] mx-auto">
        <ToastContainer />
        <main className="w-ful space-y-5 bg-green-40">
          <div className="sticky z-10 top-0 xs:max-md:hidden bg-white inline-flex rounded-md hover:bg-slate-20">
            <Back />
          </div>
          {/* Product Info  */}
          <section className="p-5 xs:max-md:px-0 rounded-md bg-white space-y-5">
            <h2 className="text-xl xs:max-md:px-5">Product Info</h2>
            <div className="flex xs:max-md:flex-col gap-3">
              {/* Desktop Images */}
              <div className="xs:max-md:hidden w-80 xs:max-md:w-full space-y-2">
                {/* Main Image */}
                <figure className="relative w-full aspect-square h-80 max-h-80 xs:max-md:w-full bg-slate-30 flex items-center justify-center border">
                  {imageError ? (
                    <ImageFallback size="size-20" />
                  ) : (
                    <Image
                      src={
                        activeImage ||
                        "https://picsum.photos/id/300/200/300/?blur=10"
                      }
                      fill={true}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt="Product Preview Image"
                      className="object-scale-down object-botto"
                      onError={() => setImageError(true)}
                    />
                  )}
                </figure>

                {/* Sub Images */}
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={50}
                  slidesPerView={4}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {product.images.map((item) => (
                    <SwiperSlide key={item}>
                      <figure className="relative size-16 min-w-16 border flex items-center justify-center">
                        {imageError ? (
                          <ImageFallback size="size-10" />
                        ) : (
                          <button
                            onClick={() => setActiveImage(item)}
                            className="relative size-full overflow-hidden"
                          >
                            <Image
                              src={
                                item ||
                                "https://picsum.photos/id/300/200/300/?blur=10"
                              }
                              fill={true}
                              sizes="4rem"
                              alt="Product Preview Image"
                              className="object-scale-down transition-all hover:scale-105"
                              onError={() => setImageError(true)}
                            />
                          </button>
                        )}
                      </figure>
                    </SwiperSlide>
                  ))}
                  <SwiperSlide>
                    <div className="size-16 min-w-16"></div>
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* Mobile Images */}
              <div className="hidden xs:max-md:flex gap-5 px-5 w-full overflow-auto no-scrollbar">
                {product.images.map((item) => (
                  <figure
                    key={item}
                    className="relative min-w-[80%] h-[50vh] max-h-80 border flex items-center justify-center"
                  >
                    {imageError ? (
                      <ImageFallback size="size-40" />
                    ) : (
                      <Image
                        src={
                          item ||
                          "https://picsum.photos/id/300/200/300/?blur=10"
                        }
                        priority={item === product.images[0]}
                        fill={true}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        alt="Product Preview Image"
                        className="object-scale-down object-botto"
                        onError={() => setImageError(true)}
                      />
                    )}
                  </figure>
                ))}
              </div>

              {/* Info */}
              <div className="space-y-1 xs:max-md:px-5">
                <h1 className="text-2xl text-slate-400 font-bold xs:max-md:text-xl">
                  {product.details.name}
                </h1>

                <p className="capitalize font-medium text-lg xs:max-md:text-base">
                  Category:{" "}
                  <span className="font-normal text-base">
                    {product.category}
                  </span>
                </p>
                <div className="flex gap-2 items-center hover:underline">
                  <Link
                    href={`/vendors/${product.vendor_id}`}
                    className="text-lg text-blue-500 xs:max-md:underline xs:max-md:text-base"
                  >
                    Associated Vendor: {vendor.storeName}
                  </Link>
                  <ExternalLink
                    size={20}
                    color="#3b82f6"
                    className="xs:max-md:hidden"
                  />
                </div>

                <data
                  value={product.details.price.toFixed(2)}
                  className="text-3xl font-medium"
                >
                  ₦{Math.round(product.details.price).toLocaleString()}
                </data>
                <p className={`${statusColorCode[product.details.status]}`}>
                  {product.details.status}
                </p>
                <div>
                  <p>
                    This vendor&apos;s delivery service is limited to the
                    following locations: <br />
                    <span className="text-slate-500">
                      {" "}
                      {vendor.deliveryRange.join(", ")}
                    </span>
                  </p>
                </div>
                <div className="xs:max-md:hidden space-y-2">
                  <Button
                    animate={false}
                    onClick={notifyVendor}
                    text="Notify Vendor About This Product"
                    bgColor="bg-green-500"
                    color="text-white"
                    loading={buttonLoad.notifyVendor}
                  />
                  <Button
                    animate={false}
                    // onClick={notifyVendor}
                    text="View Vendor Account Details"
                    bgColor="bg-green-500"
                    color="text-white"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Product Description */}
          <section className="rounded-md bg-white">
            <h2 className="p-5 border-b text-xl">Product description</h2>
            <ul className="p-5 list-disc list-inside">
              {product.details.description
                .split(".")
                .filter(Boolean)
                .map((line) => (
                  <li key={line}>{line}</li>
                ))}
            </ul>
          </section>

          {/* Product Specifications */}
          <section className="rounded-md bg-white">
            <h2 className="p-5 border-b text-xl">Product Specifications</h2>
            <ul className="p-5 list-disc list-inside">
              {product.details.specifications
                .split("\n")
                .filter(Boolean)
                .map((line) => (
                  <li key={line}>{line}</li>
                ))}
            </ul>
          </section>

          {/* Product Reviews */}
          <section className="rounded-md bg-white">
            <h2 className="p-5 border-b text-xl">Product Reviews</h2>
            <div className="p-5">Reviews</div>
          </section>
        </main>

        {/* Aside CTA button: For Desktop view */}
        {/* <aside className="xs:max-md:hidden p-5 rounded-md sticky top-24 w- mt-14 bg-white">
          <div className="space-y-2">
            <Button
              animate={false}
              onClick={notifyVendor}
              text="Notify Vendor About This Product"
              bgColor="bg-green-500"
              color="text-white"
              loading={buttonLoad.notifyVendor}
            />

            <Button
              animate={false}
              onClick={notifyVendor}
              text="View Vendor Account Details"
              bgColor="bg-green-500"
              color="text-white"
            />
          </div>
        </aside> */}

        {/* Bottom CTA button: For Mobile View */}
        {(customer_id || vendor_id !== productFilter?.vendor_id) && (
          <div className="hidden xs:max-md:flex fixed bg-slate-100 bottom-0 left-0 right-0 py-2 items-center justify-center">
            <div className="flex flex-wrap items-center gap-1 px-2">
              <Button
                animate={false}
                onClick={notifyVendor}
                text="Notify Vendor About This Product"
                bgColor="bg-green-500 xs:max-md:text-sm"
                color="text-white"
                loading={buttonLoad.notifyVendor}
              />

              <Button
                animate={false}
                // onClick={notifyVendor}
                text="View Vendor Account Details"
                bgColor="bg-green-500 xs:max-md:text-sm"
                color="text-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
