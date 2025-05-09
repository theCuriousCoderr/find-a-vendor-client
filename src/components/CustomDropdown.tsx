import { CustomDropdownPropsType, Vendor } from "@/types";
import { Check, ChevronDown } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { updateFilter } from "@/app/features/dropdownFilter/dropdownFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { motion } from "motion/react";
import filterVendors from "@/utils/vendors/filterVendors";
// import { Vendor } from "@/app/features/vendors/interface";
// import { updateFilteredVendors } from "@/app/features/vendors/vendorsSlice";
import updateCustomDropdownOptions from "@/utils/vendors/updateCustomDropdownOptions";
import statesOfNigeria from "@/static-data/statesOfNigeria";
import priceFilterOptions from "@/static-data/priceFilterOptions";
// import getVendorsProductsRange from "@/utils/vendors/getVendorsProductsRange";
import productCategories from "@/static-data/productCategories";
import { updateFilteredVendors } from "@/app/features/public/publicSlice";
import vendors from "@/static-data/vendors";

type OptionsKey = "Location" | "Products" | "Price";

// For Vendors
function CustomDropdown({
  setActiveDropdown,
  activeDropdown,
  name,
  multiple,
}: CustomDropdownPropsType) {
  const dispatch = useDispatch();
  const { vendorFilters } = useSelector((state: RootState) => state.dropdownFilter);
  // const { vendors } = useSelector((state: RootState) => state.vendors);
  const productsOption = productCategories;
  const [options, setOptions] = useState({
    Location: statesOfNigeria,
    Products: productsOption,
    Price: priceFilterOptions,
  });

  productCategories

  const [dropDownState, setDropDownState] = useState({
    isOpen: false,
    selectedDropdown: [""],
  });

  function handleProductsFilter(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") {
      setOptions({ ...options, Products: productsOption });
      return;
    }
    const newProductsOption = productsOption.filter((product) =>
      product.toLowerCase().includes(value.toLowerCase())
    );
    setOptions({ ...options, Products: newProductsOption });
  }

  // useEffect(() => {
  //   const productsOption = getVendorsProductsRange(vendors as Vendor[]);
  //   setOptions({
  //     Location: statesOfNigeria,
  //     Products: productsOption,
  //     Price: priceFilterOptions,
  //   });
  // }, []);

  useEffect(() => {
    if (activeDropdown !== name) {
      setDropDownState({ ...dropDownState, isOpen: false });
    }
  }, [activeDropdown]);

  useEffect(() => {
    const newSelectedDropdown = updateCustomDropdownOptions(
      vendorFilters,
      options[name as OptionsKey]
    );
    setDropDownState({
      ...dropDownState,
      selectedDropdown: newSelectedDropdown,
    });
  }, [vendorFilters]);

  function toggleDropDownIsOpen() {
    const isOpen = dropDownState.isOpen;
    setDropDownState({ ...dropDownState, isOpen: !isOpen });
    !isOpen && setActiveDropdown(name);
  }

  function closeDropDown() {
    setDropDownState({ ...dropDownState, isOpen: false });
    setOptions({
      Location: statesOfNigeria,
      Products: productsOption,
      Price: priceFilterOptions,
    });
  }

  function isSelected(option: string) {
    return (
      new Set(dropDownState.selectedDropdown).has(option) &&
      new Set(vendorFilters).has(option)
    );
  }

  function selectOption(option: string) {
    let selectedOptions = dropDownState.selectedDropdown.filter(Boolean);
    let _filterOptions: string[];
    // if option is selected already, remove it
    if (new Set(selectedOptions).has(option)) {
      selectedOptions = multiple
        ? selectedOptions.filter((_option) => _option !== option)
        : [""];
      _filterOptions = vendorFilters.filter((_option) => _option !== option);
    }
    // if option hasn't been selected already, add it
    else {
      selectedOptions = multiple ? [...selectedOptions, option] : [option];
      _filterOptions = multiple
        ? vendorFilters
        : vendorFilters.filter(
            (filter) => !new Set(options[name as OptionsKey]).has(filter)
          );
      _filterOptions = [..._filterOptions, option];
    }
   
    dispatch(updateFilter({type: "vendors", data: _filterOptions}));
    setDropDownState({
      isOpen: multiple,
      selectedDropdown: selectedOptions,
    });
    applyFilter(_filterOptions);
  }

  function applyFilter(filterOptions: string[]) {
    const filteredVendors = filterVendors(vendors as Vendor[], filterOptions);
    dispatch(updateFilteredVendors({ filteredVendors: filteredVendors }));
  }

  const isFilterSelected = Boolean(
    dropDownState.selectedDropdown.filter((option) => Boolean(option)).length
  );

  return (
    <div className="">
      {dropDownState.isOpen && (
        <div
          onClick={closeDropDown}
          className="fixed z-10 top-0 left-0 size-full"
        ></div>
      )}

      <button
        onClick={toggleDropDownIsOpen}
        className={`${
          dropDownState.isOpen ? "bg-slate-200/50" : "bg-white"
        } relative z-20 flex border hover:border-peach transition-all p-1 font-light`}
      >
        {isFilterSelected && (
          <div className="absolute size-2 -right-1 -top-1 bg-lavender rounded-full"></div>
        )}
        {name}
        <span>
          <ChevronDown strokeWidth="1" />
        </span>
      </button>

      {/* Dropdown field */}
      {dropDownState.isOpen && (
        <motion.ul
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute z-20 max-h-48 overflow-auto tiny-scrollbar bg-white shadow-sm"
        >
          {name === "Products" && (
            <li className="sticky z-10 top-0">
              <input
                autoFocus={true}
                onChange={handleProductsFilter}
                className="w-full p-2 border"
                placeholder="Search"
                type="search"
              />
            </li>
          )}
          {options[name as OptionsKey].map((option) => {
            return (
              <li key={option} className="group ">
                <button
                  onClick={() => selectOption(option)}
                  className="group py-1 px-4 size-full hover:bg-slate-200/50 flex gap-2 items-center font-light"
                >
                  <div
                    className={`${
                      isSelected(option) ? "bg-lavender/80" : "bg-white"
                    } size-5 border  border-black flex items-center justify-center`}
                  >
                    {!isSelected(option) && (
                      <Check
                        size="15"
                        opacity="0.3"
                        className="group-hover:block hidden"
                      />
                    )}
                    {isSelected(option) && (
                      <Check size="15" color="#FFFFFF" strokeWidth={4} />
                    )}
                  </div>
                  <p className="capitalize text-nowrap">{option}</p>
                </button>
              </li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
}

export default CustomDropdown;
