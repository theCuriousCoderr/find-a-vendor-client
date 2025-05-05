"use client";

import { updateVendorDetails } from "@/app/features/settings/thunk";
import { AppDispatch, RootState } from "@/app/store";
import SettingsEdit from "@/components/SettingsEdit";
import Spinner from "@/components/Spinner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function SettingsProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
 
 const { authenticatedVendor:vendor } = useSelector((state: RootState) => state.vendors);
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
        id="storeName"
        name="Your Store's Name"
        value={vendorInfo.storeName}
      />
      <SettingsEdit
        id="storeTag"
        name="Your Store's Tag"
        value={`${vendorInfo.storeTag}`}
      />

      <SettingsEdit
        id="categories"
        name="Your Store's Categories"
        value={vendorInfo.categories.join(", ")}
      />

      <div className="flex gap-10 xs:max-md:gap-5 flex-wrap">
        <SettingsEdit
          id="state"
          name="Your Store's State"
          value={vendorInfo.location.state}
        />
        <SettingsEdit
          id="city"
          name="Your Store's City"
          value={vendorInfo.location.city}
        />
        <SettingsEdit
          id="country"
          name="Your Store's Country"
          value={vendorInfo.location.country}
        />
      </div>

      <SettingsEdit
        id="joined"
        name="You joined"
        value={vendorInfo.joined}
        editable={false}
      />

      <div className="flex gap-10 xs:max-md:gap-5 flex-wrap">
        <SettingsEdit
          id="instagram"
          name="Your Store's instagram"
          value={`${vendorInfo.socials.instagram}`}
        />
        <SettingsEdit
          id="twitter"
          name="Your Store's twitter"
          value={`${vendorInfo.socials.twitter}`}
        />
        <SettingsEdit
          id="whatsapp"
          name="Your Store's whatsapp"
          value={`${vendorInfo.socials.whatsapp}`}
        />
      </div>

      <SettingsEdit
        id="phone"
        name="Your Store's Phone"
        value={`${vendorInfo.phone}`}
      />
      <SettingsEdit
        id="deliveryRange"
        name="Your Store's Delivery Range"
        value={vendorInfo.deliveryRange.join(", ")}
      />
      <SettingsEdit
        id="minPrice"
        name="Minimum Price of an item"
        value={vendorInfo.minPrice.toString()}
      />
    </div>
  );
}

export default SettingsProfilePage;
