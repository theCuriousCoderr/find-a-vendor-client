"use client";

// import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
// import productsTopPicksCardsInfo from "@/static-data/products-top-picks-cards";
import {
  getAvailableVendors,
  getMostOrderedProducts,
} from "./features/public/thunk";
// import ImageFallback from "@/components/ImageFallback";
import {
  Aperture,
  Badge,
  ChartColumn,
  CheckCheck,
  CircleDollarSign,
  Handshake,
  MessageCircle,
  PackageOpen,
  RefreshCcw,
  Scale,
  // Pointer,
  Search,
  Shield,
  Target,
} from "lucide-react";
import { motion } from "motion/react";
// import Spinner from "@/components/Spinner";
import sizes from "@/utils/imageSizes";
import Footer from "@/components/Footer";

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
    icon: <PackageOpen />,
    content:
      "Customers can see all available vendors for a product — no hidden promotions or biased placements. Vendors are displayed fairly and equally.",
  },
  {
    title: "Verified Vendor Profiles",
    icon: <CheckCheck />,
    content:
      "Every vendor goes through a verification process to ensure legitimacy and accurate business information.",
  },
  {
    title: "Real Customer Reviews",
    icon: <MessageCircle />,
    content:
      "All reviews are from actual customers who interacted with vendors, helping others shop with confidence and vendors build credibility.",
  },
  {
    title: "Up-to-Date Product Information",
    icon: <RefreshCcw />,
    content:
      "Product details and availability are regularly updated to reflect current vendor offerings. No stale listings or false promises.",
  },
  {
    title: "Equal Opportunity for Vendors",
    icon: <Scale />,
    content:
      "Big or small, all vendors have equal chances of being discovered — no paid boosts or unfair visibility algorithms.",
  },
  {
    title: "Customer Choice First",
    icon: <Target />,
    content:
      "The customer always chooses. Find-A-Vendor never pushes a specific seller — selection is based entirely on user preference.",
  },
  {
    title: "Reliable Vendor Metrics",
    icon: <ChartColumn />,
    content:
      "Customers see performance indicators like completed orders, responsiveness, and ratings — vendors earn trust through performance.",
  },
  {
    title: "Dispute Support System",
    icon: <Shield />,
    content:
      "If issues arise, Find-A-Vendor provides a clear path for reporting and resolving conflicts between vendors and customers.",
  },
  {
    title: "No Middleman Pricing",
    icon: <CircleDollarSign />,
    content:
      "Vendors set their own prices and get 100% of their sales. Customers see exactly what each vendor offers — no platform-imposed markups.",
  },
  {
    title: "Community-Driven Trust",
    icon: <Handshake />,
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
  // const [seeAvailableVendors, setSeeAvailableVendors] = useState(false);
  // sets the laoding state for the "Continue" button
  // const [continueTo, setContinueTo] = useState(false);

  useEffect(() => {
    // fetch mostOrderedProducts on page load if it hasn't already been fetched before
    if (!mostOrderedProducts && loadingMostOrderedProducts)
      dispatch(getMostOrderedProducts());

    !vendorsList && dispatch(getAvailableVendors({ round: 1, slice: 15 }));
  }, []);

  return (
    <main className="space-y-32 p-5 xs:max-md:p-0 xs:max-md:w-[90%] max-w-[1300px] mx-auto">
      {/* introduction */}
      <section className="mt-5 xs:max-md:mt-5 flex xs:max-md:flex-col w-full xs:max-md:items-start items-center justify-center gap-20 xs:max-md:gap-10">
        <div className="text-left xs:max-md:text-center w-[60%] xs:max-md:flex flex-col xs:max-md:items-start items-center xs:max-md:w-full space-y-5 pt-10 xs:max-md:pt-0">
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
            Pick your plug. We’ve got options.
            </p>
          </div>

          {/* desktop */}
          <h1 className="xs:max-md:hidden text-5xl xs:max-md:text-4xl font-bold ">
            Find Products and Connect <br />
            With Online Vendors
            <br /> From The Comfort Of Your Home
            <br />
            With Minimal Efforts.
          </h1>
          {/* mobile */}
          <h1 className="md:hidden text-3xl font-bold xs:max-md:text-left">
            Find Products and Connect With Online Vendors From The Comfort Of
            Your Home With Minimal Efforts.
          </h1>
          <h2 className="text-blue-900 font-medium xs:max-md:text-left w-full">
            Explore | Discover | Connect
          </h2>

          <div className="flex w-full flex-wrap gap-5 xs:max-md:gap-2 items-center xs:max-md:justify-start">
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
        <div className="relative p-3 xs:max-md:p-2 bg-white rounded-md w-[40%] xs:max-md:w-[95%] xs:max-md:max-w-full aspect-square">
          <figure className="relative size-full p-3 rounded-md">
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

      {/* what we do */}
      <section>
        <h2 className="text-[3rem] xs:max-md:text-3xl font-bold text-center text-blue-900 xs:max-md:text-left">
          {" "}
          - What We Do -{" "}
        </h2>
        <p className="xs:max-md:mt-5 font-light text-xl xs:max-md:text-lg text-center w-[80%] xs:max-md:w-full mx-auto xs:max-md:text-left">
          {" "}
          “Find-A-Vendor” is a marketplace platform where potential customers
          can discover a product and choose from multiple online, small-scale
          vendors who offer it. It helps customers compare offerings and make
          informed choices, and vendors benefit from public visibility and
          competition, while also having a credible online presence.{" "}
          <span className=" italic text-orange-500 font-light">
            All for free.
          </span>
        </p>
      </section>

      {/* how we do it */}
      <section>
        <h2 className="text-[3rem] xs:max-md:text-3xl font-bold text-center xs:max-md:text-left text-blue-900">
          {" "}
          - How We Do It -{" "}
        </h2>
        <ul className="mt-5 w-[80%] xs:max-md:w-full mx-auto space-y-20">
          {points.map(({ title, icon, content }) => (
            <li
              key={title}
              className="group flex xs:max-md:flex-col even:flex-row-reverse xs:max-md:even:flex-col even:justify-start xs:max-md:even:text-left even:text-right gap-5 xs:max-md:gap-3 items-center xs:max-md:items-start"
            >
              <figure className=" border-slate-200 border-2 transition-all size-24 xs:max-md:size-16 bg-white rounded-xl flex items-center justify-center">
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

      {/* key features */}
      <section>
        <h2 className="text-[3rem] xs:max-md:text-3xl font-bold text-center xs:max-md:text-left text-blue-900">
          {" "}
          - Key Features -{" "}
        </h2>
        <ul className="w-full space-y-[20vh] mt-20 xs:max-md:mt-5">
          {userFeatures.map(({ title, content, img }) => {
            return (
              <li
                key={title}
                className=" group flex xs:max-md:flex-col justify-center gap-10 w-full"
              >
                <div className="w-[30%] xs:max-md:w-full pt-40 xs:max-md:py-0 pb-[30rem] space-y-5 xs:max-md:space-y-2 xs:max-md:pl-0">
                  <p className="font-bold text-4xl xs:max-md:text-2xl">
                    {title}
                  </p>
                  <p className="font-light text-xl xs:max-md:text-lg">{content}</p>
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

      {/*  why choose us */}
      <section>
        <h2 className="text-[3rem] xs:max-md:text-3xl font-bold text-center xs:max-md:text-left text-blue-900">
          {" "}
          - Why Choose Us -{" "}
        </h2>
        <div className="mt-5 flex xs:max-md:flex-col items-center gap-5">
          <div className="w-[70%] xs:max-md:w-full h-full flex flex-col gap-5">
            {/* one, two */}
            <div className="h-1/2 w-full flex xs:max-md:flex-col gap-5">
            {/* one */}
              <div className=" w-1/2 xs:max-md:w-full rounded-xl p-5 space-y-5 bg-white">
                <div className="size-20 border border-slate-200 bg-lame rounded-xl flex items-center justify-center">
                  <Aperture />
                </div>
                <div>
                  <h3 className="font-bold text-3xl xs:max-md:text-2xl">
                    A Space for Growing Vendors
                  </h3>
                  <p className="font-medium text-lg text-slate-500">
                    Not every vendor is a big shot—and that’s okay.
                  </p>
                </div>

                <p className="font-light text-xl xs:max-md:text-lg">
                  Many small or emerging online vendors can easily be drowned
                  out on massive marketplaces like Jumia or Konga. Find-A-Vendor
                  provides them with visibility and a level playing field to
                  grow organically without being overshadowed.
                </p>
              </div>
              {/* two */}
              <div className=" w-1/2 xs:max-md:w-full rounded-xl p-5 space-y-5 bg-white">
                <div className="size-20 border border-slate-200 bg-lame rounded-xl flex items-center justify-center">
                  <CircleDollarSign />
                </div>
                <div>
                  <h3 className="font-bold text-3xl xs:max-md:text-2xl">Zero Cuts, Full Profit</h3>
                  <p className="font-medium text-lg text-slate-500">
                    Vendors keep 100% of what they earn.
                  </p>
                </div>

                <p className="font-light text-xl xs:max-md:text-lg">
                  At Find-A-Vendor, all financial transactions happen directly
                  between customer and vendor. There are no payment gateway
                  fees, no commissions, and absolutely no middlemen. It’s pure
                  profit for the seller—just as it should be.
                </p>
              </div>
            </div>
            {/* three */}
            <div className="h-1/2 w-full rounded-xl p-5 space-y-5 bg-white">
              <div className="size-20 border border-slate-200 bg-lame rounded-xl flex items-center justify-center">
                <Handshake />
              </div>
              <div>
                <h3 className="font-bold text-3xl xs:max-md:text-2xl">
                  Simple Needs, Real Connections
                </h3>
                <p className="font-medium text-lg text-slate-500">
                  Not every customer is looking for a big-brand experience.
                </p>
              </div>

              <p className="font-light text-xl xs:max-md:text-lg">
                Sometimes, people just want to find a small-time vendor who can
                meet their specific, everyday needs without the cost and
                formality of shopping at big stores. Find-A-Vendor bridges that
                gap in a simple, accessible way.
              </p>
            </div>
          </div>
          {/* four */}
          <div className="w-[30%] xs:max-md:w-full rounded-xl borde border-slate-40 p-5 space-y-5 bg-white flex items-center justify-center">
            <div className="space-y-5">
              <div className="size-20 border border-slate-200 bg-lame rounded-xl flex items-center justify-center">
                <Target />
              </div>
              <div>
                <h3 className="font-bold text-3xl xs:max-md:text-2xl">
                  You Decide How Business Happens
                </h3>
                <p className="font-medium text-lg text-slate-500">
                  The power of every transaction lies in your hands.
                </p>
              </div>

              <p className="font-light text-xl xs:max-md:text-lg">
                Both customers and vendors have complete control over how they
                choose to transact—whether it’s the timing, the method, or the
                terms. We stay out of the way so you can do business your way.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
