"use client";

import CustomDropdown from "@/components/CustomDropdown";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  removeFilterOption,
  resetFilter,
} from "../features/dropdownFilter/dropdownFilterSlice";
import VendorCard from "@/components/VendorCard";
import Button from "@/components/Button";
import VendorFilter from "@/components/VendorFilter";

function PublicCatalogue() {
  const [activeDropdown, setActiveDropdown] = useState("");

  return (
    <main>
      {/* filter section */}
      <VendorFilter
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
      <h1 className="px-5 text-3xl font-medium py-2">
        A preview list of different vendors, their products and other details
      </h1>
      <section className="flex flex-wrap gap-y-5 justify-between md:justify-normal md:gap-x-5 p-5 xs:max-md:px-3">
        <VendorCard id="1" />
        <VendorCard id="2" />
        <VendorCard id="3" />
        <VendorCard id="9" />
        <VendorCard id="5" />
        <VendorCard id="6" />
        <VendorCard id="7" />
        <VendorCard id="8" />
      </section>
    </main>
  );
}

export default PublicCatalogue;
