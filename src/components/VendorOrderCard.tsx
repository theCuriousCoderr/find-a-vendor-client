"use client";

import { Customer, OrderType, StatusVariants } from "@/types";
import statusColorCode from "@/utils/statusColorCode";
import { CircleHelp, Phone, TriangleAlert, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import statusMessage from "@/utils/statusMessage";
import Link from "next/link";
import formattedOrderCardDate from "@/utils/formattedOrderCardDate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { updateOrder } from "@/app/features/order/thunk";
import { getCustomerInfo } from "@/app/features/vendors/thunk";
import Image from "next/image";
import OrderCardsButton from "./OrderCardsButton";

function VendorOrderCard({
  order,
  selectedOrder,
}: {
  order: OrderType;
  selectedOrder: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [showHelpText, setShowHelpText] = useState(false);
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  // const [updating, setUpdating] = useState(false);

  function toggleShowHelpText() {
    setShowHelpText(!showHelpText);
  }

  function _updateOrderStatus(updateType: StatusVariants) {
    dispatch(updateOrder({ order: { ...order, status: updateType } }));
  }

  function _updateVendorCompletedFlag() {
    dispatch(updateOrder({ order: { ...order, vendor_completed_flag: true } }));
  }

  useEffect(() => {
    _getCustomerInfo();
  }, []);

  async function _getCustomerInfo() {
    if (customerInfo) {
      return;
    }
    try {
      const { customer } = await dispatch(
        getCustomerInfo({ customer_id: order.customer_id })
      ).unwrap();
      if (customer) {
        setCustomerInfo(customer);
      } else {
        setCustomerInfo(null);
      }
    } catch (error) {
      setCustomerInfo(null);
    }
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
      {customerInfo && showCustomerInfo && (
        <div className="fixed z-50 top-0 left-0 h-screen w-full bg-slate-400 flex items-center justify-center">
          <div className="bg-slate-50 max-w-[95%] mt-5 p-5 xs:max-md:p-2 rounded-md shadow-md shadow-slate-900 space-y-5 xs:max-md:space-y-3">
            <p className="text-left font-bold text-xl xs:max-md:text-lg">
              Customer Info
            </p>

            <div className="flex items-center gap-2">
              <figure className="relative size-10 rounded-full shimmer">
                <Image
                  fill={true}
                  src={customerInfo.photo}
                  alt="Customer Photo"
                  className="object-cover rounded-full"
                />
              </figure>
              <div>
                <p className="">
                  {customerInfo.lastName} {customerInfo.firstName}
                </p>
                <p className="text-slate-500 text-sm">{customerInfo.email}</p>
              </div>
            </div>
            <Link target="_blank" href={`https://wa.me/${customerInfo.phone}`}>
              <p className="my-2 text-[#00A884] text-sm font-medium underline">
                Chat customer on WhatsApp
              </p>
            </Link>
            <div className="flex items-center gap-2 fill-black">
              <Phone size={15} /> <p className="text-sm text-slate-500">{customerInfo.phone}</p>
            </div>

            <div className="flex items-start gap-3 border-l-4 border-[#e27c51] bg-[#ffe8d9] p-5 xs:max-md:p-3 rounded-sm">
              <div className="size-5 flex items-center justify-center">
                <TriangleAlert fill="#e15624" stroke="#ffffff" className="" />
              </div>
              <div>
                <p className="text-cente xs:max-md:text-sm">
                  It is the vendor responsibility to reach out to a customer who
                  made an order.
                </p>
                <p className="text-cente xs:max-md:text-sm">
                  You can from there decide with them how you choose to
                  transact.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCustomerInfo(false)}
                className="border text-black px-2 py-1 rounded-md text-sm border-black hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative flex gap-2 items-start">
        <div className="size-6 rounded-full bg-lime-400/50 flex items-center justify-center mt-1">
          <Zap size={20} strokeWidth={1} />
        </div>
        <div className="text-sm">
          <p>New order received.</p>
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
                {statusMessage(order.status, "vendor")}
                {order.status === "delivered" && (
                  <p className="text-slate-500">
                    The associated customer needs to also mark this order as{" "}
                    <q>Received</q> before the status can change to{" "}
                    <q>Completed</q>
                  </p>
                )}
                {order.status === "received" && (
                  <p className="text-slate-500">
                    You need to also mark this order as <q>Delivered</q> before
                    the status can change to <q>Completed</q>
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <p className="text-slate-600">
            {formattedOrderCardDate(order?.createdAt || new Date())}
          </p>
        </div>
      </div>
      <div className="flex gap-1">

        {/* View */}
        <div>
          <Link
            href={`/products?vendor_id=${order.vendor_id}&category=${order.category}&product_id=${order.product_id}`}
          >
            <OrderCardsButton type="view" />
          </Link>
        </div>

        {/* Decline */}
        {order.status === "pending" && (
          <OrderCardsButton
            type="decline"
            onClick={() => _updateOrderStatus("rejected")}
          />
        )}

        {/* Accept */}
        {order.status === "pending" && (
          <OrderCardsButton
            type="accept"
            onClick={() => _updateOrderStatus("ongoing")}
          />
        )}

        {/* Customer */}
        {(order.status === "ongoing" ||
          order.status === "delivered" ||
          order.status === "received") && (
          <OrderCardsButton
            type="customer"
            onClick={() => setShowCustomerInfo(true)}
          />
        )}

        {/* Delivered */}
        {(order.status === "ongoing" || order.status === "received") && (
          <OrderCardsButton
            type="delivered"
            onClick={_updateVendorCompletedFlag}
            disabled={order.vendor_completed_flag}
          />
        )}
        
      </div>
    </article>
  );
}

export default VendorOrderCard;
