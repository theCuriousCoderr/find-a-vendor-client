"use client";

import { getAuthenticatedCustomerOrders } from "@/app/features/customers/thunk";
import { AppDispatch, RootState } from "@/app/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerOrderCard from "@/components/CustomerOrderCard";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import Button from "@/components/Button";
import { useSearchParams } from "next/navigation";
import {
  Blocks,
  Boxes,
  FilterX,
  PackageCheck,
  PackageMinus,
  PackagePlus,
  PackageX,
} from "lucide-react";
import { StatusVariants } from "@/types";
import statusColorCode from "@/utils/statusColorCode";

const FILTERS = [
  {
    icon: <Boxes size={20} />,
    text: "all",
  },
  {
    icon: <PackagePlus size={20} />,
    text: "pending",
  },
  {
    icon: <Blocks size={20} />,
    text: "ongoing",
  },
  {
    icon: <PackageMinus size={20} />,
    text: "delivered",
  },
  {
    icon: <PackageCheck size={20} />,
    text: "completed",
  },
  {
    icon: <PackageX size={20} />,
    text: "rejected",
  },
  {
    icon: <PackageX size={20} />,
    text: "cancelled",
  },
];

function CustomerOrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const {
    authenticatedCustomerOrders: orders,
    loadingAuthenticatedCustomerOrders,
  } = useSelector((state: RootState) => state.customers);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [orderFilter, setOrderFilter] = useState<StatusVariants | "all">("all");

  async function resolveSearchParams() {
    const _selectedOrder = searchParams.get("selectedOrder") || "";

    if (_selectedOrder) {
      setSelectedOrder(_selectedOrder);
    }
  }

  useEffect(() => {
    if ((orders?.length || 0) === 0) dispatch(getAuthenticatedCustomerOrders());
    resolveSearchParams();
  }, []);

  function filterOrdersList() {
    if (orderFilter === "all") return orders;
    return orders.filter((order) => order.status === orderFilter);
  }

  function getTextColor(text: StatusVariants | "all") {
    return statusColorCode(text).color;
  }

  // fetching orders loading state
  if (loadingAuthenticatedCustomerOrders) {
    return (
      <div className="my-10 w-full flex flex-col items-center justify-center">
        <Spinner color="border-t-blue-500" />
        <p>Fetching orders ... </p>
      </div>
    );
  }

  //  if orders length is 0
  if ((orders?.length || 0) === 0) {
    return (
      <div className="my-10 w-full flex flex-col items-center justify-center space-y-2">
        <p>No orders </p>
        <Link href={`/vendors`} className="w-full">
          <Button
            text="View available vendors"
            bgColor="bg-blue-500"
            color="text-white"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
    <nav>
      <p className="capitalize text-nowrap mb-2 ml-2 hidden xs:max-md:block">
        {orderFilter} orders
      </p>
      <ul className="flex justify-between xs:max-md:justify-normal w-full overflow-auto tiny-scrollbar gap-5 xs:max-md:gap-2 xs:max-md:pb-2">
        {FILTERS.map((filter) => {
          return (
            <li key={filter.text}>
              <button
                onClick={() =>
                  setOrderFilter(filter.text as StatusVariants | "all")
                }
                className={`${
                  orderFilter === filter.text
                    ? `border-slate-500 ${getTextColor(
                        filter.text
                      )} bg-[#1e1e1e]`
                    : "text-slate-400"
                } flex items-center text-sm gap-1 px-2 py-1 xs:max-md:p-2 rounded-full border hover:bg-[#1e1e1e] `}
              >
                {filter.icon}
                <p className="capitalize text-nowrap xs:max-md:hidden">
                  {filter.text} orders
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>

    {filterOrdersList().length > 0 && (
      <ul className="gap-2 grid grid-cols-3 500:max-md:grid-cols-2 md:max-lg:grid-cols-2 xs:max-md:grid-cols-1">
        {filterOrdersList().map((order) => {
          return (
            <li key={order._id} className="">
              <CustomerOrderCard order={order} selectedOrder={selectedOrder} />
            </li>
          );
        })}
      </ul>
    )}

    {filterOrdersList().length === 0 && (
      <div className="h-[30vh] w-full flex flex-col items-center justify-center">
        <div className="size-20 bg-slate-500/20 rounded-full flex items-center justify-center">
          <FilterX />
        </div>
        <p className="py-5 text-slate-500">No order matches this filter</p>
      </div>
    )}
  </div>
  );
}

export default CustomerOrdersPage;
