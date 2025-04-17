import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import ImageFallback from "./ImageFallback";
import { VendorCardType } from "@/types";
import Spinner from "./Spinner";

function VendorCard({ index, vendor, vendorsLength }: VendorCardType) {
  const [imageError, setImageError] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const tagsLength = vendor.categories.length;
  const extraTags = tagsLength - 2;
  const isLastVendorCard = index === vendorsLength - 1;
  const categories = vendor.categories.toSorted((a, b) => a.length - b.length);

  return (
    <article
      id={
        isLastVendorCard
          ? "isLastVendorCard"
          : `isNotLastVendorCard/${vendor.vendor_id}`
      }
      className={`size-full group bg-black/5 rounded-t-md hover:bg-black/10 shimmer relative cursor-pointer hover:shadow-md rounded-md overflow-hidde shadow-sm xs:max-md:border xs:max-md:border-slate-300`}
    >
     
      {redirecting && (
        <div className="cursor-default absolute z-10 size-full bg-white/70 rounded-md flex space-y-2 items-center px-2"></div>
      )}
      <Link
        href={`/vendors/${vendor.vendor_id}`}
        onClick={() => setRedirecting(true)}
        className="size-full rounded-t-md"
      >
        <figure className="w-full aspect-square max-h-80 relative ">
          {redirecting && (
            <div className="absolute bg-slate-200 z-10 size-full flex items-center justify-center rounded-t-md">
              <Spinner color="border-t-blue-500" />
            </div>
          )}
          {imageError ? (
            <ImageFallback size="size-20" />
          ) : (
            <Image
              src={vendor.banner}
              fill={true}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt="Vendor Product Preview"
              className="object-cover object-botto rounded-t-md"
              onError={() => setImageError(true)}
            />
          )}
        </figure>
        <div className="p-2 flex flex-col justify-between bg-red-40 w-full aspect-[1/0.8] min-h-[calc(100%_-_20rem)] xs:max-md:aspect-auto xs:max-md:gap-2 xs:max-md:min-h-0 xs:max-md:h-auto">
          <div className="flex items-center gap-2">
            <figure className="relative size-10 p-4 bg-slate-100 rounded-md flex items-center justify-center">
              {imageError ? (
                <ImageFallback size="size-6" />
              ) : (
                <Image
                  src={vendor.logo}
                  fill={true}
                  sizes="40px"
                  alt="Vendor Product Preview"
                  className="object-cover rounded-md"
                  onError={() => setImageError(true)}
                />
              )}
            </figure>
            <p className="text-peach font-medium">{vendor.storeName}</p>
          </div>

          <div className="flex items-center bg-ye">
            <Star fill="#FACC15" stroke="#EAB308" size="20" /> <span>4.7</span>{" "}
          </div>

          <p>Minimum Price Of Any Item: <span className="text-sm text-slate-500">₦{vendor.minPrice.toLocaleString()}</span></p>

          <p>
            Where I deliver to:{" "}
            <span className="text-sm text-slate-500">
              {vendor.deliveryRange.join(", ")}
            </span>
          </p>

          <div className="relative flex flex-co items-start gap-1">
            {/* <p>What I sell:</p> */}
            <ul className="flex flex-wrap items-center gap-1 xs:max-md:hidden">
              {categories.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="p-1 text-nowrap bg-[#ff7070] rounded-md text-xs text-white"
                >
                  {tag}
                </span>
              ))}

              {extraTags > 0 && (
                <span className="text-[#ff7070] group rounded-full text-sm font-medium">
                  <ul className="hidden absolute group-hover:flex transition-all flex-wrap z-20 left-0 top-[110%]">
                    {categories.map((tag) => (
                      <li
                        key={tag}
                        className="bg-black text-white text-xs p-[2px]"
                      >
                        {tag},{" "}
                      </li>
                    ))}
                  </ul>
                  +{extraTags}
                </span>
              )}
            </ul>

            <ul className="flex flex-wrap items-center gap-1 md:hidden">
              {categories.map((tag) => (
                <span
                  key={tag}
                  className="p-1 text-nowrap bg-[#ff7070] rounded-md text-xs text-white"
                >
                  {tag}
                </span>
              ))}

            </ul>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default VendorCard;
