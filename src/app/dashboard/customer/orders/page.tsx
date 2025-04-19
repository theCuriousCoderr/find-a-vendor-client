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

function CustomerOrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams()
  const {
    authenticatedCustomerOrders: orders,
    loadingAuthenticatedCustomerOrders,
  } = useSelector((state: RootState) => state.customers);
  const [selectedOrder, setSelectedOrder] = useState("");

  async function resolveSearchParams() {
    const _selectedOrder = (searchParams.get("selectedOrder") || "")

    if (_selectedOrder) {
      setSelectedOrder(_selectedOrder);
    }
  }

  useEffect(() => {
    if (orders.length === 0) dispatch(getAuthenticatedCustomerOrders());
    resolveSearchParams();
  }, []);

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
  if (orders.length === 0) {
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
    <div>
      <ul className="gap-2 grid grid-cols-3 500:max-md:grid-cols-2 md:max-lg:grid-cols-2 xs:max-md:grid-cols-1">
        {orders.map((order) => {
          return (
            <li key={order._id}>
              <CustomerOrderCard order={order} selectedOrder={selectedOrder} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CustomerOrdersPage;
