import React, { useState } from "react";
import ImageFallback from "./ImageFallback";
import { Star } from "lucide-react";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import Spinner from "./Spinner";

function ProductCard({
  index,
  product,
  productsLength,
}: {
  index: number;
  product: Product;
  productsLength: number;
}) {
  const [imageError, setImageError] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const isLastProductCard = index === productsLength - 1;
  function constructProductUrl(
    vendor: string,
    category: string,
    item_id: string
  ) {
    return `/products?vendor_id=${vendor}&category=${category}&product_id=${item_id}`;
  }
  return (
    <article
      id={
        isLastProductCard
          ? "isLastProductCard"
          : `isNotLastProductCard/${product._id}`
      }
      className=" border-red-40 group bg-black/5 hover:bg-black/10 shimmer  relative cursor-pointer hover:shadow-md rounded-md overflow-hidden shadow-sm"
    >
      {redirecting && (
        <div className="cursor-default absolute z-10 size-full bg-white/70 rounded-md flex space-y-2 items-center px-2"></div>
      )}
      <Link
        href={constructProductUrl(
          product.vendor_id.toString(),
          product.category,
          product.product_id.toString()
        )}
        onClick={() => setRedirecting(true)}
      >
        {/* <div className="absolute z-10 bg-white border text-xl size-full flex items-center justify-center rounded-md">{index + 1}</div> */}
        <figure className="w-full bg-white aspect-square h-[50vh] max-h-80 relative  flex items-center justify-center">
          {redirecting && (
            <div className="absolute bg-slate-200 z-10 size-full flex items-center justify-center rounded-t-md">
              <Spinner color="border-t-blue-500" />
            </div>
          )}

          {imageError ? (
            <ImageFallback size="size-20" />
          ) : (
            <Image
              src={
                product.images[0].secure_url ||
                "https://picsum.photos/id/300/200/300/?blur=10"
              }
              fill={true}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt="Vendor Product Preview"
              className="object-contain "
              onError={() => setImageError(true)}
            />
          )}
        </figure>
        <div className=" p-2 flex flex-col justify-between bg-red-40 w-full aspect-[1/0.8] min-h-[calc(100%_-_20rem)] xs:max-md:aspect-auto xs:max-md:gap-3  xs:max-md:min-h-0 xs:max-md:h-auto">
          <p className="text-peach font-medium">{product.details.name}</p>

          <div className="flex items-center bg-ye">
            <Star fill="#FACC15" stroke="#EAB308" size="20" /> <span>4.7</span>{" "}
            <span>(250 reviews)</span>
          </div>

          <p> Price: ₦{Math.round(product.details.price).toLocaleString()}</p>

          <p>
            Delivery Range:{" "}
            <span className="text-sm text-slate-500">
              {product.deliveryRange.join(", ")}
            </span>
          </p>
          <div className="">
            <p className="inline-flex p-1 text-nowrap bg-[#ff7070] rounded-md text-xs text-white capitalize">
              {product.category}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
