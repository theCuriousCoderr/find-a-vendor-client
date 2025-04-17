"use client";

import { RootState } from "@/app/store";
import SettingsEdit from "@/components/SettingsEdit";
import Spinner from "@/components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

function Page() {
  const { authenticatedVendor: vendor } = useSelector(
    (state: RootState) => state.vendors
  );

  if (!vendor) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <SettingsEdit
        id="name"
        name="Your Account Name"
        value={vendor?.acct.name}
      />
      <SettingsEdit
        id="number"
        name="Your Account Number"
        value={vendor?.acct.number}
      />
      <SettingsEdit id="bank" name="Your Bank Name" value={vendor?.acct.bank} />
    </div>
  );
}

export default Page;
