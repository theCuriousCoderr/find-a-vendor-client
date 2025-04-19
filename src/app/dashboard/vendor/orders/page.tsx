"use client";

import { getAuthenticatedVendorOrders } from "@/app/features/vendors/thunk";
import { AppDispatch, RootState } from "@/app/store";
import Spinner from "@/components/Spinner";
import VendorOrderCard from "@/components/VendorOrderCard";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function VendorOrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams()
  const {
    authenticatedVendorOrders: orders,
    loadingAuthenticatedVendorOrders,
  } = useSelector((state: RootState) => state.vendors);

  const [selectedOrder, setSelectedOrder] = useState("");

  async function resolveSearchParams() {
   
    const _selectedOrder = (searchParams.get("selectedOrder") || "")
    if (_selectedOrder) {
      setSelectedOrder(_selectedOrder);
    }
  }

  useEffect(() => {
    if (orders.length === 0) dispatch(getAuthenticatedVendorOrders());
    resolveSearchParams();
  }, []);

  if (loadingAuthenticatedVendorOrders) {
    return (
      <div className="my-10 w-full flex flex-col items-center justify-center">
        <Spinner color="border-t-blue-500" />
        <p>Fetching orders ... </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="my-10 w-full flex flex-col items-center justify-center">
        <p>No orders </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="gap-2 grid grid-cols-3 500:max-md:grid-cols-2 md:max-lg:grid-cols-2 xs:max-md:grid-cols-1">
        {orders.map((order) => {
          return (
            <li key={order._id} className="">
              <VendorOrderCard order={order} selectedOrder={selectedOrder} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default VendorOrdersPage;
