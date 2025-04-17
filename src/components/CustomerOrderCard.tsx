"use client";

import { OrderType, StatusVariants } from "@/types";
import statusColorCode from "@/utils/statusColorCode";
import { CircleHelp, Zap } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import statusMessage from "@/utils/statusMessage";
import Link from "next/link";
import formattedOrderCardDate from "@/utils/formattedOrderCardDate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { updateOrder } from "@/app/features/order/thunk";

function CustomerOrderCard({
  order,
  selectedOrder,
}: {
  order: OrderType;
  selectedOrder: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [showHelpText, setShowHelpText] = useState(false);

  function toggleShowHelpText() {
    setShowHelpText(!showHelpText);
  }

  function _updateOrderStatus(updateType: StatusVariants) {
    dispatch(updateOrder({ order: { ...order, status: updateType } }));
  }

  function _updateCustomerCompletedFlag() {
    dispatch(
      updateOrder({ order: { ...order, customer_completed_flag: true } })
    );
  }

  if (selectedOrder.toString() === order.order_id.toString()) {
    if (typeof window !== "undefined") {
      const order = document.getElementById(
        `order/${selectedOrder.toString()}`
      ) as HTMLElement;
      if (order) {
        order.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <article
      id={`order/${order.order_id}`}
      className={`${
        selectedOrder.toString() === order.order_id.toString()
          ? "bg-black/5 border-black"
          : "bg-slate-50"
      } border p-2 rounded-md space-y-2`}
    >
      <div className="relative flex gap-2 items-start">
        <div className="size-6 rounded-full bg-lime-400/50 flex items-center justify-center mt-1">
          <Zap size={20} strokeWidth={1} />
        </div>
        <div className="text-sm">
          <p>You placed an order.</p>
          <div className="flex items-center gap-1">
            <div
              className={`size-2 rounded-full border ${
                statusColorCode(order.status).bgColor
              }`}
            ></div>
            <p className={`${statusColorCode(order.status).color} capitalize`}>
              {order.status}
            </p>
            <div className=" size-3 flex items-center justify-center">
              <button
                onClick={toggleShowHelpText}
                className="size-full flex items-center justify-center"
              >
                <CircleHelp size={20} />
              </button>
            </div>
          </div>
          <AnimatePresence>
            {showHelpText && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute z-10 p-1 border bg-white"
              >
                {statusMessage(order.status, "customer")}
                {order.status === "received" && <p className="text-slate-500">The associated vendor needs to also mark this order as <q>Delivered</q> before the status can change to <q>Completed</q></p> }
                {order.status === "delivered" && <p className="text-slate-500">You need to also mark this order as <q>Received</q> before the status can change to <q>Completed</q></p> }
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-slate-600">
            {formattedOrderCardDate(order?.createdAt || new Date())}
          </p>
          {/* <p className="text-slate-400">At 12:08 AM - April 14, 2025</p> */}
        </div>
      </div>
      <div className="flex gap-1">
        <div>
          <Link
            href={`/products?vendor_id=${order.vendor_id}&category=${order.category}&product_id=${order.product_id}`}
          >
            <button className="border px-2 py-1 rounded-md text-sm border-black hover:bg-slate-300">
              View
            </button>
          </Link>
        </div>
        {order.status === "pending" && (
          <div>
            <button
              onClick={() => _updateOrderStatus("cancelled")}
              className="border bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md text-sm border-black"
            >
              Cancel
            </button>
          </div>
        )}

        {(order.status === "ongoing" || order.status === "delivered" ) && (
          <div>
            <button
              disabled={order.customer_completed_flag}
              onClick={_updateCustomerCompletedFlag}
              className="border bg-[#16A34A] hover:bg-green-700 disabled:bg-[#16A34A]/30 text-white px-2 py-1 rounded-md text-sm border-black"
            >
              Received
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default CustomerOrderCard;
