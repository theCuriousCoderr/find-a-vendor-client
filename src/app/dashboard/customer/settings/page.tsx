"use client";

import { updateCustomerDetails } from "@/app/features/settings/thunk";
import { AppDispatch, RootState } from "@/app/store";
import SettingsEdit from "@/components/SettingsEdit";
import Spinner from "@/components/Spinner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {
  const dispatch = useDispatch<AppDispatch>();

  const { authenticatedCustomer: customer } = useSelector(
    (state: RootState) => state.customers
  );
  const { customerInfo } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    return () => {
      saveProfileEdits();
    };
  }, []);

  function saveProfileEdits() {
    customerInfo && dispatch(updateCustomerDetails({ customerInfo: null }));
  }

  if (!customer || !customerInfo) {
    return (
      <div>
        <Spinner color="border-t-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <p className="text-red-500 font-medium text-sm text-center mb-2">
        All changes made will take effect when you leave this <q>Settings</q>{" "}
        page.
      </p>
      <div className="space-y-5">
        <SettingsEdit
          id="firstName"
          name="First Name"
          value={customerInfo.firstName}
        />
        <SettingsEdit
          id="lastName"
          name="Last Name"
          value={customerInfo.lastName}
        />

        <SettingsEdit id="email" name="Email" value={customerInfo.email} />

        <SettingsEdit
          id="phone"
          name="WhatsApp Phone Number"
          value={customerInfo.phone}
        />
      </div>
    </div>
  );
}

export default Page;
