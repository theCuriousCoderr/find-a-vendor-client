"use client";

import isUserAuthenticated from "@/utils/isUserAuthenticated";
import { Star, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import Spinner from "./Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { addReview, getProductReviews } from "@/app/features/review/thunk";
import { Product } from "@/types";
import { getAuthenticatedCustomerNotifications } from "@/app/features/customers/thunk";
// import { getPublicProduct } from "@/app/features/public/thunk";

interface AddReviewModalPropType {
  toggleReviewModal: (state: "open" | "close") => void;
  product: Product;
}

const reviews = [
  {
    title: "Solid Purchase for the Price",
    content:
      "For the price point, you really can’t beat this. It’s sturdy, performs well, and looks great too. I’ve been using it daily and it hasn’t disappointed. Would definitely buy again if needed!",
    name: "Sophia M.",
    rating: 5,
  },
];

function AddReviewModal({
  toggleReviewModal,
  product,
}: AddReviewModalPropType) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [review, setReview] = useState({
    review_id: "",
    title: "",
    content: "",
    name: "",
    photo: "",
    rating: 3,
  });

  const [submittingReview, setSubmittingReview] = useState(false);

  function updateReview(key: string, value: string | number) {
    setReview({ ...review, [key]: value });
  }

  async function submitReview(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittingReview(true);
    const _isUserAuthenticated = isUserAuthenticated();
    if (!_isUserAuthenticated) {
      router.push("/login?role=customer");
      return;
    }
    await dispatch(addReview({ ...review, ...product }));
    await dispatch(
      getProductReviews({
        vendor_id: product.vendor_id.toString(),
        category: product.category,
        product_id: product.product_id,
      })
    );
    await dispatch(getAuthenticatedCustomerNotifications())

    setSubmittingReview(false);
    toggleReviewModal("close")
  }
  return (
    <div className="fixed z-50 top-0 left-0 h-screen w-full bg-black/80 fle items-center justify-center">
      <div className="h-full w-full flex items-center justify-center">
        <form
          onSubmit={submitReview}
          className="w-[50%] max-w-[500px] xs:max-md:w-[90%] xs:max-md:max-w-full max-h-[95%] overflow-auto tiny-scrollbar bg-white relative rounded-md"
        >
          <div
            onClick={() => toggleReviewModal("close")}
            className="absolute right-2 top-2 size-8 "
          >
            <button className="size-full hover:bg-slate-100 transition-all bg-white shadow border rounded-md flex items-center justify-center">
              <X size={15} />
            </button>
          </div>
          {/* Info */}
          <div className="p-5 border-b mt-5">
            <p className="text-xl font-bold">Add Products Review</p>
          </div>
          <div className="p-5 space-y-5">
            <div>
              <p className="font-medium">Overall rating</p>
              <ul className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((id) => (
                  <li key={id} onClick={() => updateReview("rating", id)}>
                    <button
                      type="button"
                      className="p-1 border hover:bg-slate-200 size-full"
                    >
                      <Star
                        size={20}
                        fill={`${review.rating >= id ? "#facc15" : "#ffffff"}`}
                        strokeWidth={1}
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <p className="text-xs font-light mt-1">Click to rate</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="reviewTitle" className="font-medium">
                Review Title
              </label>

              <input
                id="reviewTitle"
                placeholder={reviews[0].title}
                onChange={(e) => updateReview("title", e.target.value)}
                className="disabled:placeholder:text-slate-300/70 disabled:text-slate-300/70 text-slate-600 placeholder:text-slate-300 w-full h-12 px-3 xs:max-2xl:h-10 border rounded-md outline-4 xs:max-md:outline-2 outline-black/30 outline-offset-4 xs:max-md:outline-offset-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="reviewContent" className="font-medium">
                Review Content
              </label>

              <textarea
                id="reviewContent"
                placeholder={reviews[0].content}
                onChange={(e) => updateReview("content", e.target.value)}
                className="disabled:placeholder:text-slate-300/70 disabled:text-slate-300/70 text-slate-600 placeholder:text-slate-300 w-full h-28 p-2 xs:max-2xl:h-20 border rounded-md outline-4 xs:max-md:outline-2 outline-black/30 outline-offset-4 xs:max-md:outline-offset-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                disabled={submittingReview}
                className="border bg-gray-900 hover:bg-gray-700 text-white disabled:text-slate-50  px-4 py-2 xs:max-md:px-2 rounded-md text-sm border-black"
              >
                {submittingReview ? (
                  <Spinner color="border-t-white" />
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
}

export default AddReviewModal;
