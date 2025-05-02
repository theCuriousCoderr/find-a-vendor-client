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
import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import Back from "@/components/Back";
import ImageFallback from "@/components/ImageFallback";
import { useRouter, useSearchParams } from "next/navigation";
import {
  cachePageBeforeRedirect,
  clearRedirectCache,
} from "@/utils/cachePageBeforeRedirect";
import { makeOrder } from "../features/order/thunk";
import { toast, ToastContainer } from "react-toastify";
import { getPublicProduct, getPublicVendor } from "../features/public/thunk";
import isUserAuthenticated from "@/utils/isUserAuthenticated";
import sizes from "@/utils/imageSizes";
import AddReviewModal from "@/components/AddReviewModal";

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
    selectedProductReviews: productReviews,
  } = useSelector((state: RootState) => state.public);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [productFilter, setProductFilter] = useState<ProductFilter | null>(
    null
  );
  const [openReviewModal, setOpenReviewModal] = useState(false); // controls the open/close of the "write reviews" UI modal
  const [reviewSlice, setReviewSlice] = useState(3); // controls the "Load More Reviews" slice increase

  const customer_id = (isUserAuthenticated()?.customer_id as string) || null; // check to see if user is an authenticated customer

  const vendor_id = (isUserAuthenticated()?.vendor_id as string) || null; // check to see if user is an authenticated vendor

  const [imageError, setImageError] = useState(false); // boolean fallback for image load error
  const [activeImage, setActiveImage] = useState(""); // desktop view: the product image to show on the big section
  const [buttonLoad, setButtonLoad] = useState({
    notifyVendor: false, // to control the loading state of the "Notify Vendor" button loading state
  });

  // resolve the url search params to get the filter queries
  async function resolveSearchParams() {
    const vendor_id = searchParams.get("vendor_id") || "-1"; // associated vendor_id
    const category = searchParams.get("category") || "-1"; // associated category
    const product_id = searchParams.get("product_id") || "-1"; //associated product_id

    const _filter = { vendor_id, product_id, category };

    setProductFilter(_filter); //Temporarily store filter option in state

    dispatch(getPublicProduct(_filter)); // use the constructed filter to get the associated product details from server

    // associated vendor details is needed. Fetch vendor if the vendor associated to this product is not found
    vendor?.vendor_id.toString() !== _filter.vendor_id &&
      dispatch(getPublicVendor({ vendor_id: _filter.vendor_id }));
  }

  const valid_product = product && product._id.toString() !== "-1"; // check if a product search is a valid one

  useEffect(() => {
    clearRedirectCache("login");
    resolveSearchParams(); // resolve the search params to fetch the filter queries
  }, []);

  // desktop view: updates the product image to show on the big section when the product details changes
  useEffect(() => {
    valid_product && setActiveImage(product.images[0]);
  }, [product]);

  // triggered when the "Notify Vendor About This Product" is clicked
  async function notifyVendor() {
    // set loading state for "Notify Vendor" button
    setButtonLoad({ ...buttonLoad, notifyVendor: true });

    // a user who is not authenticated can't notify a vendor about an order
    if (!isAuthenticated) {
      cachePageBeforeRedirect("login", window.location.href);
      router.push("/login?role=customer");
      return;
    }

    // a user account who is not a customer can't notify a vendor about an order
    if (!customer_id) {
      toast.warn("You can't place order as a Vendor.");
      toast.warn("Use a Customer account to place orders.");
      setButtonLoad({ ...buttonLoad, notifyVendor: false });
      return;
    }

    // only a user who is a customer can notify a vendor about an order
    if (customer_id) {
      // only process to make an order if all necessary information are ready
      if (customer_id && vendor && product) {
        // construct the order details from the necessary information
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

        // send the constructed order details to the server for processing
        await dispatch(makeOrder(orderDetails));
      }
    }

    // remove loading state for "Notify Vendor" button
    setButtonLoad({ ...buttonLoad, notifyVendor: false });
  }

  // triggered to control the open/close of the "write reviews" UI modal
  function toggleReviewModal(state: "open" | "close") {
    if (state === "open") setOpenReviewModal(true);
    if (state === "close") setOpenReviewModal(false);
  }

  // triggered to increase the reviews slice, "load more reviews"
  function loadMoreReviews() {
    setReviewSlice(reviewSlice + 3);
  }

  // show a loading screen if necessary information are still loading
  if (!product || loadingProduct || !vendor) {
    return <ProductDetailsPageSkeleton />;
  }

  // show appropriate screen if any of the product filter options is invalid
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

  // show appropriate UI if necessary information has loaded and product filter options are valid
  return (
    <div className="bg-slate-100 xs:max-md:pb-20 max-w-[1300px] mx-auto">
      {/* The UI pop-up modal to write reviews */}
      {openReviewModal && (
        <AddReviewModal
          toggleReviewModal={toggleReviewModal}
          product={product}
        />
      )}

      <div className="py-5 xs:max-md:py-1 xs:max-md:pb-10 w-[80%] xs:max-md:w-[95%] mx-auto">
        <ToastContainer /> {/* for showing toast notifications */}
        <main className="w-ful space-y-5 bg-green-40">
          {/* sticky back button shown on desktop view */}
          <div className="sticky z-10 top-0 xs:max-md:hidden bg-white inline-flex rounded-md hover:bg-slate-20">
            <Back />
          </div>
          {/* Product Info Section  */}
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
                {/* name */}
                <h1 className="text-2xl text-slate-400 font-bold xs:max-md:text-xl">
                  {product.details.name}
                </h1>

                <p className="capitalize font- text-lg xs:max-md:text-base">
                  Category:{" "}
                  <span className="font-bold text-base text-slate-400">
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
                </div>
              </div>
            </div>
          </section>

          {/* Product Description Section */}
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

          {/* Product Specifications Section */}
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

          {/* Product Reviews Section */}
          <section className="rounded-md bg-white">
            <h2 className="p-5 border-b text-xl">Product Reviews</h2>
            <ul className="p-5 space-y-5">
              {/* show if there are no reviews  */}
              {(productReviews?.length || 0) === 0 && (
                <div>
                  <p className="text-lg text-slate-400 mb-2">No reviews yet.</p>
                  <div className="flex gap-5 xs:max-md:gap-2  items-center">
                    <div>
                      <button
                        onClick={() => toggleReviewModal("open")}
                        className="border bg-gray-900 hover:bg-gray-700 text-white disabled:text-slate-50  px-4 py-2 xs:max-md:px-2 rounded-md text-sm border-black"
                      >
                        Write Review
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* the reviews to show after slicing */}
              {(productReviews?.length || 0) > 0 &&
                productReviews.slice(0, reviewSlice).map((review) => {
                  return (
                    <li
                      key={review.review_id}
                      className="bg-slate-50 p-5 xs:max-md:p-2 rounded-md"
                    >
                      {/* reviewee */}
                      <div className="flex gap-2 items-center">
                        <figure className="relative size-10 bg-white rounded-full">
                          <Image
                            fill={true}
                            src={review.photo}
                            alt="Reviewer Image"
                            sizes={sizes}
                            className="rounded-full object-cover"
                          />
                        </figure>
                        <p className="font-bold">{review.name}</p>
                      </div>
                      {/* ratings */}
                      <div className="flex gap-2 items-center">
                        <div className="flex">
                          {Array(review.rating)
                            .fill(0)
                            .map((_, index) => (
                              <Star
                                key={index}
                                size={20}
                                fill="#facc15"
                                strokeWidth={1}
                              />
                            ))}
                          {Array(5 - review.rating)
                            .fill(0)
                            .map((_, index) => (
                              <Star key={index} size={20} strokeWidth={1} />
                            ))}
                        </div>

                        <span className="text-lg  text-slate-500 font-medium">
                          {review.rating.toFixed(1)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">{review.title}</p>
                        <p className="font-light">{review.content}</p>
                      </div>
                    </li>
                  );
                })}

              {/* "Write review" button, "Load more review" button */}
              {(productReviews?.length || 0) > 0 && (
                <div className="flex gap-5 xs:max-md:gap-2  items-center">
                  <div>
                    <button
                      onClick={() => toggleReviewModal("open")}
                      className="border bg-gray-900 hover:bg-gray-700 text-white disabled:text-slate-50  px-4 py-2 xs:max-md:px-2 rounded-md text-sm border-black"
                    >
                      Write Review
                    </button>
                  </div>
                  {(productReviews?.length || 0) > reviewSlice && (
                    <div>
                      <button
                        onClick={loadMoreReviews}
                        className="border hover:bg-gray-200 text-gray-900 disabled:text-slate-50  px-4 py-2 xs:max-md:px-2  rounded-md text-sm border-black"
                      >
                        Load More Review
                      </button>
                    </div>
                  )}
                </div>
              )}
            </ul>
          </section>
        </main>
        {/* fixed bottom CTA button; shown in Mobile View */}
        {(customer_id || vendor_id !== productFilter?.vendor_id) && (
          <div className="hidden xs:max-md:flex fixed bg-slate-100 bottom-0 left-0 right-0 py-2 items-center justify-center">
            <div className="flex w-full flex-wrap items-center gap-1 px-2">
              <Button
                animate={false}
                onClick={notifyVendor}
                text="Notify Vendor About This Product"
                bgColor="bg-green-500 xs:max-md:text-sm"
                color="text-white"
                loading={buttonLoad.notifyVendor}
              />

              {/* <Button
                animate={false}
                // onClick={notifyVendor}
                text="View Vendor Account Details"
                bgColor="bg-green-500 xs:max-md:text-sm"
                color="text-white"
              /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
