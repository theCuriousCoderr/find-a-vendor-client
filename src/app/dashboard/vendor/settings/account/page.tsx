"use client";

import { updateVendorDetails } from "@/app/features/settings/thunk";
import { AppDispatch, RootState } from "@/app/store";
import SettingsEdit from "@/components/SettingsEdit";
import Spinner from "@/components/Spinner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function SettingsAccountPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { authenticatedVendor: vendor } = useSelector(
    (state: RootState) => state.vendors
  );
  const { vendorInfo } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    return () => {
      saveProfileEdits();
    };
  }, []);

  function saveProfileEdits() {
    vendorInfo && dispatch(updateVendorDetails({ vendorInfo: null }));
  }

  if (!vendor || !vendorInfo) {
    return (
      <div>
        <Spinner color="border-t-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <SettingsEdit
        id="name"
        name="Your Account Name"
        value={vendor.acct.name}
        editable={false}
      />
      <SettingsEdit
        id="number"
        name="Your Account Number"
        value={vendor.acct.number}
        editable={false}
      />
      <SettingsEdit id="bank" name="Your Bank Name" value={vendor.acct.bank} editable={false}/>
    </div>
  );
}

export default SettingsAccountPage;
