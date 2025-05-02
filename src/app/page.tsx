"use client";

import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
// import productsTopPicksCardsInfo from "@/static-data/products-top-picks-cards";
import {
  getAvailableVendors,
  getMostOrderedProducts,
} from "./features/public/thunk";
// import ImageFallback from "@/components/ImageFallback";
import {
  Badge,
  // Pointer,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
// import Spinner from "@/components/Spinner";
import sizes from "@/utils/imageSizes";

// skeleton loader for most ordered products on desktop view
// function DesktopMostOrderedProductsSkeleton() {
//   return (
//     <ul className="xs:max-md:hidden flex justify-center mt-10">
//       {productsTopPicksCardsInfo.slice(0, 5).map((pick) => (
//         <li
//           key={pick.id}
//           className={`${pick.top} ${pick.rotation} border-2 border-slate-100 hover:z-10 hover:scale-110 hover:rotate-0 transition-all relative -mx-5 h-[10%] min-h-60 aspect-square rounded-xl overflow-hidden`}
//         >
//           <figure
//             className={` relative size-full bg-slate-300 animate-pulse flex items-center justify-center`}
//           >
//             <ImageFallback size="size-20" />
//           </figure>
//         </li>
//       ))}
//     </ul>
//   );
// }

// skeleton loader for most ordered products on mobile view
// function MobileMostOrderedProductsSkeleton() {
//   return (
//     <section className="md:hidden flex w-full relative justify-center mt-10 overflow-hidden">
//       <div className="absolute z-20 bg-slate-50 w-[110%] h-10 -top-5 rounded-[50%]"></div>
//       <div className="absolute z-20 bg-slate-50 w-[110%] h-10 -bottom-5 rounded-[50%]"></div>
//       <div className="flex gap-5 w-full overflow-y-hidden overflow-auto no-scrollbar shimmer">
//         {new Array(10).fill(0).map((product, index) => (
//           <figure
//             key={product + index}
//             className={`hover:z-10 hover:scale-110 border-x border-slate-400 bg-white hover:rotate-0 transition-all relative size-60 min-w-60 rounded-xl overflow-hidden flex items-center justify-center`}
//           >
//             <ImageFallback size="size-20" />
//           </figure>
//         ))}
//       </div>
//     </section>
//   );
// }

// // most ordered products on desktop view
// function DesktopMostOrderedProducts() {
//   const [imageError, setImageError] = useState(false);
//   const { mostOrderedProducts } = useSelector(
//     (state: RootState) => state.public
//   );
//   return (
//     <div>
//       <ul className="xs:max-md:hidden flex justify-center mt-10">
//         {mostOrderedProducts &&
//           mostOrderedProducts.slice(0, 5).map((product, index) => (
//             <li
//               key={product._id}
//               className={`${productsTopPicksCardsInfo[index].top} ${productsTopPicksCardsInfo[index].rotation} border-2 border-slate-100 hover:z-10 hover:scale-110 transition-all relative -mx-5 hover:border-slate-500 h-[10%] min-h-60 aspect-square rounded-xl overflow-hidden`}
//             >
//               <Link href={`/vendors/${product.vendor_id}`}>
//                 <figure className={` relative size-full bg-white`}>
//                   <div className="absolute z-10 top-2 left-2 bg-black/30 backdrop-blur-sm text-white p-1 rounded-md">
//                     @{product.vendor_id}
//                   </div>
//                   <Image
//                     src={
//                       imageError ? "/image-load-error.png" : product.images[0]
//                     }
//                     fill={true}
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     alt={product.details.name}
//                     className={`${
//                       imageError ? "object-contain" : "object-contain"
//                     }`}
//                     onError={() => setImageError(true)}
//                   />
//                 </figure>
//               </Link>
//             </li>
//           ))}
//       </ul>

//       <ul className="xs:max-md:hidden flex justify-center mt-10">
//         {mostOrderedProducts &&
//           mostOrderedProducts.slice(5).map((product, index) => (
//             <li
//               key={product._id}
//               className={`${productsTopPicksCardsInfo[index].top} ${productsTopPicksCardsInfo[index].rotation} border-2 border-slate-100 hover:z-10 hover:scale-110 transition-all relative -mx-5 hover:border-slate-500 h-[10%] min-h-60 aspect-square rounded-xl overflow-hidden`}
//             >
//               <Link href={`/vendors/${product.vendor_id}`}>
//                 <figure className={` relative size-full bg-white`}>
//                   <div className="absolute z-10 top-2 left-2 bg-black/30 backdrop-blur-sm text-white p-1 rounded-md">
//                     @{product.vendor_id}
//                   </div>
//                   <Image
//                     src={
//                       imageError ? "/image-load-error.png" : product.images[0]
//                     }
//                     fill={true}
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     alt={product.details.name}
//                     className={`${
//                       imageError ? "object-contain" : "object-contain"
//                     }`}
//                     onError={() => setImageError(true)}
//                   />
//                 </figure>
//               </Link>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }

// // most ordered products on movile view
// function MobileMostOrderedProducts() {
//   const [imageError, setImageError] = useState(false);
//   const { mostOrderedProducts } = useSelector(
//     (state: RootState) => state.public
//   );
//   const [selectedProduct, setSelectedProduct] = useState("");
//   return (
//     <section className="md:hidden flex w-full relative justify-center mt-10 overflow-">
//       <div className="absolute z-20 bg-slate-50 w-[110%] h-12 -top-7 rounded-[50%] border-b-2 border-slate-200"></div>
//       <div className="absolute z-20 bg-slate-50 w-[110%] h-12 -bottom-7 rounded-[50%] border-t-2 border-slate-200"></div>
//       <ul className="flex gap-5 w-full overflow-y-hidden overflow-auto no-scrollbar shimmer">
//         {mostOrderedProducts &&
//           mostOrderedProducts.map((product) => (
//             <li
//               key={product._id}
//               className={`hover:z-10 border-x border-slate-400 hover:rotate-0 transition-all relative size-60 min-w-60 rounded-xl overflow-hidden`}
//             >
//               {selectedProduct !== product._id.toString() ? (
//                 <Link
//                   href={`/vendors/${product.vendor_id}`}
//                   onClick={() => setSelectedProduct(product._id.toString())}
//                   className="size-full"
//                 >
//                   <figure className="relative size-full flex items-center justify-center">
//                     <motion.div
//                       animate={{ y: [-2, 2] }}
//                       transition={{
//                         repeat: Infinity,
//                         duration: 1,
//                         ease: "easeInOut",
//                       }}
//                       className="absolute z-10 size-5 rounded-full flex items-center justify-center"
//                     >
//                       <Pointer
//                         color="#FFFFFF"
//                         className="fill-white stroke-black"
//                       />
//                     </motion.div>
//                     <div className="absolute z-10 top-10 left-2 bg-black/30 backdrop-blur-sm text-white p-1 rounded-md">
//                       @{product.vendor_id}
//                     </div>
//                     <Image
//                       src={
//                         imageError ? "/image-load-error.png" : product.images[0]
//                       }
//                       fill={true}
//                       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                       alt={product.details.name}
//                       className={`${
//                         imageError ? "object-contain" : "object-cover"
//                       } bg-white`}
//                       onError={() => setImageError(true)}
//                     />
//                   </figure>
//                 </Link>
//               ) : (
//                 <div className="size-full bg-black flex items-center justify-center">
//                   <Spinner />
//                 </div>
//               )}
//             </li>
//           ))}
//       </ul>
//     </section>
//   );
// }

const points = [
  {
    title: "Transparent Vendor Listings",
    icon: "🛍️",
    content:
      "Customers can see all available vendors for a product — no hidden promotions or biased placements. Vendors are displayed fairly and equally.",
  },
  {
    title: "Verified Vendor Profiles",
    icon: "✅",
    content:
      "Every vendor goes through a verification process to ensure legitimacy and accurate business information.",
  },
  {
    title: "Real Customer Reviews",
    icon: "🗣️",
    content:
      "All reviews are from actual customers who interacted with vendors, helping others shop with confidence and vendors build credibility.",
  },
  {
    title: "Up-to-Date Product Information",
    icon: "📦",
    content:
      "Product details and availability are regularly updated to reflect current vendor offerings. No stale listings or false promises.",
  },
  {
    title: "Equal Opportunity for Vendors",
    icon: "⚖️",
    content:
      "Big or small, all vendors have equal chances of being discovered — no paid boosts or unfair visibility algorithms.",
  },
  {
    title: "Customer Choice First",
    icon: "🎯",
    content:
      "The customer always chooses. Find-A-Vendor never pushes a specific seller — selection is based entirely on user preference.",
  },
  {
    title: "Reliable Vendor Metrics",
    icon: "📊",
    content:
      "Customers see performance indicators like completed orders, responsiveness, and ratings — vendors earn trust through performance.",
  },
  {
    title: "Dispute Support System",
    icon: "🛡️",
    content:
      "If issues arise, Find-A-Vendor provides a clear path for reporting and resolving conflicts between vendors and customers.",
  },
  {
    title: "No Middleman Pricing",
    icon: "💸",
    content:
      "Vendors set their own prices and get 100% of their sales. Customers see exactly what each vendor offers — no platform-imposed markups.",
  },
  {
    title: "Community-Driven Trust",
    icon: "🤝",
    content:
      "Our platform thrives on honest interactions. Both customers and vendors build trust through consistent, transparent engagement.",
  },
];

const userFeatures = [
  {
    title: "AI-Powered Product Detail Generation",
    content:
      "Vendors can leverage AI to automatically generate product details by simply uploading an image—making it faster and easier to add items to their catalog",
    img: "/AI-Enable-Product-Details.png",
  },
  {
    title: "Real-Time Notification Events",
    content:
      "Both vendors and customers receive instant notifications—ranging from product order placements to review submissions to cancelled orders—so everyone stays in the loop.",
    img: "/vendor-notif.png",
  },
  {
    title: "Real-Time Order Tracking",
    content:
      "Vendors and customers can both track orders in real time—whether they’re pending, in progress, delivered, received, canceled, or rejected. Stay informed at every step.",
    img: "/vendor-order.png",
  },
];

// app entry point, defaults to "/"
export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  // redux state to handle all public data that can be viewed by visiting users
  const { loadingMostOrderedProducts, mostOrderedProducts, vendorsList } =
    useSelector((state: RootState) => state.public);

  // sets the laoding state for the "See available vendors" button
  const [seeAvailableVendors, setSeeAvailableVendors] = useState(false);
  // sets the laoding state for the "Continue" button
  // const [continueTo, setContinueTo] = useState(false);


  useEffect(() => {
    // fetch mostOrderedProducts on page load if it hasn't already been fetched before
    if (!mostOrderedProducts && loadingMostOrderedProducts)
      dispatch(getMostOrderedProducts());

    !vendorsList && dispatch(getAvailableVendors({ round: 1, slice: 15 }));
  }, []);

  return (
    <main className="overflow- space-y-32 p-5">
      <section className="mt-5 xs:max-md:mt-5 flex xs:max-md:flex-col items-center justify-center gap-20 xs:max-md:gap-20">
        <div className="text-left xs:max-md:text-center w-[60%] xs:max-md:flex flex-col items-center xs:max-md:w-[90%] xs:max-md:mx-auto space-y-5 pt-10 xs:max-md:pt-0">
          {/* badge */}
          <div className="group px-4 py-3 bg-blue-900 hover:bg-black transition-all rounded-full inline-flex gap-3 items-center">
            <div className="relative size-5 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
                className=" bg-white fill-white rounded-full"
              >
                <Badge />
              </motion.div>
              <div className="absolute z-10 size-full flex items-center justify-center">
                <Search size={10} />
              </div>
            </div>
            <p className="text-white font-medium xs:max-md:text-xs">
              Vendors at your fingertips.
            </p>
          </div>

          <h1 className="xs:max-md:hidden text-5xl xs:max-md:text-4xl font-bold ">
            Find Products and Connect <br />
            With Online Vendors
            <br /> From The Comfort Of Your Home
            <br />
            With Minimal Efforts.
          </h1>
          <h1 className="md:hidden text-3xl font-bold">
            Find Products and Connect With Online Vendors From The Comfort Of
            Your Home With Minimal Efforts.
          </h1>
          <h2 className="text-blue-900 font-medium">
            Explore | Discover | Connect
          </h2>

          <div className="flex w-full flex-wrap gap-5 xs:max-md:gap-2 items-center xs:max-md:justify-center">
            <div>
              <Link href="/vendors">
                <button className="border border-gray-900 hover:bg-gray-300 text-gray-900 disabled:text-slate-50 px-4 py-2 xs:max-md:px-2 rounded-md text-lg xs:max-md:text-sm">
                  Browse available vendors
                </button>
              </Link>
            </div>
            <div>
              <Link href="/products/all">
                <button className="border border-gray-900 hover:bg-gray-300 text-gray-900 disabled:text-slate-50 px-4 py-2 xs:max-md:px-2 rounded-md text-lg xs:max-md:text-sm">
                  Browse available products
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative p-3 xs:max-md:p-2 bg-white rounded-md w-[40%] xs:max-md:mt- xs:max-md:w-[95%] xs:max-md:max-w-full max-w-[400px] aspect-square">
          <figure className="relative size-full p-3 rounded-md  ">
            <Image
              fill={true}
              src="/home_banner.avif"
              alt="home banner"
              sizes={sizes}
              priority={true}
              className="object-cover rounded-md"
            />
          </figure>
        </div>
      </section>

      <section>
        <h2 className="text-[3rem] xs:max-md:text-3xl font-bold text-center text-blue-900">
          {" "}
          - What we do -{" "}
        </h2>
        <p className="xs:max-md:mt-5 font-light text-xl xs:max-md:text-lg text-center w-[80%] xs:max-md:w-[90%] mx-auto">
          {" "}
          “Find-A-Vendor” is a platform where potential customers can discover a
          product and choose from multiple online, small-scale vendors who offer
          it. It helps customers compare offerings and make informed choices,
          and vendors benefit from public visibility and competition, while also
          having a credible online presence.{" "}
          <span className=" italic text-orange-500 font-light">
            All for free.
          </span>
        </p>
      </section>

      <section>
        <h2 className="text-[3rem] xs:max-md:text-3xl font-bold text-center text-blue-900">
          {" "}
          - How we do it -{" "}
        </h2>
        <ul className="mt-5 w-[80%] xs:max-md:w-[90%] mx-auto space-y-20">
          {points.map(({ title, icon, content }) => (
            <li
              key={title}
              className="group flex xs:max-md:flex-col even:flex-row-reverse xs:max-md:even:flex-col even:justify-start xs:max-md:even:text-left even:text-right gap-5 xs:max-md:gap-3 items-center xs:max-md:items-start"
            >
              <figure className=" border-slate-500 border-2 transition-all size-24 xs:max-md:size-16 bg-white rounded-xl flex items-center justify-center">
                {icon}
              </figure>
              <div className="space-y-2 w-[50%] xs:max-md:w-full">
                <p className="font-bold text-2xl ">{title}</p>
                <p className="font-light text-xl xs:max-md:text-lg">
                  {content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-[3rem] xs:max-md:text-3xl font-bold text-center text-blue-900">
          {" "}
          - Key Features Designed for You -{" "}
        </h2>
        <ul className=" w-full p-1 space-y-[20vh] mt-20">
          {userFeatures.map(({ title, content, img }) => {
            return (
              <li
                key={title}
                className=" group flex xs:max-md:flex-col justify-center gap-10 w-full"
              >
                <div className="w-[30%] xs:max-md:w-[90%] pt-40 xs:max-md:py-0 pb-[30rem] space-y-5 xs:max-md:pl-3">
                  <p className="font-bold text-4xl xs:max-md:text-2xl">
                    {title}
                  </p>
                  <p className="font-light text-xl">{content}</p>
                </div>

                <div className="size-[30rem] xs:max-md:w-[80%] xs:max-md:h-[80vh] xs:max-md:mx-auto rounded-tl-lg sticky xs:max-md:static top-[10vh]">
                  <figure className="relative size-full rounded-tl-lg">
                    <Image
                      fill={true}
                      src={`/user-features${img}`}
                      alt={title}
                      sizes={sizes}
                      className="object-contain object-bottom rounded-tl-lg"
                    />
                  </figure>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
