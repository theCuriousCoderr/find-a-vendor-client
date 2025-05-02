"use client";

import React, { useState } from "react";
import Spinner from "./Spinner";

interface OrderCardsButtonType {
  type: "view" | "decline" | "cancel" | "accept" | "received" | "customer" | "delivered";
  onClick?: () => void;
  disabled?: boolean;
}

const options = {
  view: {
    style:
      "border px-2 py-1 rounded-md text-sm border-black hover:bg-slate-300",

    text: "View",
  },
  decline: {
    style:
      "border bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md text-sm border-black",

    text: "Decline",
  },
  cancel: {
    style:
      "border bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md text-sm border-black",

    text: "Cancel",
  },
  accept: {
    style:
      "border bg-[#16A34A] hover:bg-green-700 text-white px-2 py-1 rounded-md text-sm border-black",

    text: "Accept",
  },
  received: {
    style:
      "border bg-[#16A34A] hover:bg-green-700 text-white px-2 py-1 rounded-md text-sm border-black",

    text: "Received",
  },
  customer: {
    style:
      "border bg-[#2563EB] hover:bg-blue-700 text-white px-2 py-1 rounded-md text-sm border-black",
    text: "Customer",
  },
  delivered: {
    style:
      "border bg-[#16A34A] hover:bg-green-700 disabled:bg-[#16A34A]/30 text-white disabled:text-slate-50  px-2 py-1 rounded-md text-sm border-black disabled:border-white",
    text: "Delivered",
  },
};
function OrderCardsButton({ type, onClick, disabled }: OrderCardsButtonType) {
  const [isClicked, setIsClicked] = useState(false);

  function _isClicked() {
    type !== "customer" && setIsClicked(true);
    onClick && onClick();
  }
  return (
    <div>
      <button
        disabled={disabled || isClicked}
        onClick={_isClicked}
        className={options[type].style}
      >
        {isClicked ? (
          <Spinner
            color={type === "view" ? "border-t-blue-500" : "border-t-white"}
          />
        ) : (
          <span> {options[type].text}</span>
        )}
      </button>
    </div>
  );
}

export default OrderCardsButton;
