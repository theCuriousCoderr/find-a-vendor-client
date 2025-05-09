import { Filter, Search, X } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import Button from "./Button";
import CustomDropdown from "./CustomDropdown";
import { VendorFilterPropsType } from "@/types";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilter,
  updateFilter,
  updateSearch,
} from "@/app/features/dropdownFilter/dropdownFilterSlice";
import filterOptions from "@/utils/vendors/filterOptions";
import cleanInput from "@/utils/cleanInput";
import CustomArrowDropdown from "./CustomArrowDropdown";
import { AnimatePresence, motion } from "motion/react";
import {
  resetFilteredVendors,
  resetVendorsRound,
  // updateVendorsRound,
} from "@/app/features/public/publicSlice";

function VendorFilter({
  activeDropdown,
  setActiveDropdown,
}: VendorFilterPropsType) {
  const dispatch = useDispatch<AppDispatch>();
  const { vendorFilters } = useSelector(
    (state: RootState) => state.dropdownFilter
  );

  const { vendorsRound } = useSelector((state: RootState) => state.public);
  const [searchFilter, setSearchFilter] = useState("");
  const [openFilterForMobile, setOpenFilterForMobile] = useState(false);

  function removeFilter(item: string) {
    const newFilters = filterOptions(vendorFilters, item);
    dispatch(updateFilter({ type: "vendors", data: newFilters }));
  }

  function clearAppliedFilters() {
    dispatch(resetFilter({ type: "vendors" }));
    dispatch(resetFilteredVendors());
    dispatch(resetVendorsRound());
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    vendorsRound > 1 && dispatch(resetVendorsRound());
    const value = e.target.value;
    setSearchFilter(cleanInput(value));
  }

  function clearSearch() {
    const filterVendorsBySearch = document.getElementById(
      "filterVendorsBySearch"
    ) as HTMLInputElement;
    if (filterVendorsBySearch) {
      setSearchFilter("");
      dispatch(resetFilteredVendors());
      dispatch(resetVendorsRound());
    }
  }

  function filterVendorsBySearch() {
    dispatch(updateSearch({ type: "vendors", data: searchFilter }));
  }

  function openFilter() {
    setOpenFilterForMobile(true);
  }

  function closeFilter() {
    setOpenFilterForMobile(false);
  }

  return (
    <section className="relative bg-gradient-to-r from-purple-300 to-teal-300 py-5 xs:max-md:py-3 xs:max-500:flex xs:max-500:flex-wrap">
      <AnimatePresence>
        {openFilterForMobile && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 left-0 z-30 h-screen overflow-auto tiny-scrollbar w-full bg-white"
          >
            {vendorFilters.length > 0 && (
              <div className="fixed z-30 bottom-0 left-0 w-full bg-red-500">
                <Button
                  onClick={clearAppliedFilters}
                  bgColor="bg-lavender"
                  color="text-white"
                  text="Clear Filter"
                />
              </div>
            )}
            <div className=" sticky z-30 bg-white top-0 p-3">
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-600">Filters</p>
                <div className=" flex items-center justify-end px-2">
                  <button onClick={closeFilter} className="">
                    <X />
                  </button>
                </div>
              </div>

              {/* Applied Filters */}
              <ul className="pt-2 pb-4 flex flex-wrap items-center gap-2">
                {vendorFilters.map((filter) => (
                  <li
                    key={filter}
                    className=" bg-[#F1E6F9] hover:bg-[#EDEBE9] text-[#5c1b86] font-normal flex items-center pl-2"
                  >
                    <span className="p-1 text-xs capitalize">{filter}</span>{" "}
                    <button
                      onClick={() => removeFilter(filter)}
                      className=" px-2 ml-1 hover:bg-slate-300 flex items-center justify-center"
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 pb-20">
              <CustomArrowDropdown
                setActiveDropdown={setActiveDropdown}
                activeDropdown={activeDropdown}
                name="Location"
                multiple={false}
              />
              <CustomArrowDropdown
                setActiveDropdown={setActiveDropdown}
                activeDropdown={activeDropdown}
                name="Products"
                multiple={true}
              />
              <CustomArrowDropdown
                setActiveDropdown={setActiveDropdown}
                activeDropdown={activeDropdown}
                name="Price"
                multiple={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative w-[70%] xs:max-lg:w-[90%] mx-auto bg-white xs:max-500:bg-transparent xs:max-500:shadow-none rounded-md shadow-md shadow-slate-600">
        <div className="absolute z-10 -right-6 top-2 hidden xs:max-500:flex size-6 ">
          <button
            onClick={openFilter}
            className="relative size-full bg-white flex items-center justify-center"
          >
            {Boolean(vendorFilters.length) && (
              <div className="absolute size-2 -right-0 -top-1 bg-lavender rounded-full"></div>
            )}
            <Filter size={20} />
          </button>
        </div>
        {/* Filter by search  */}
        <div className="px-5 xs:max-md:p-2 py-2 border-b xs:max-md:border-none flex xs:max-500:flex-col xs:max-500:items-start xs:max-500:gap-2 items-center justify-between">
          <div className="relative w-full mr-2">
            <div className="xs:max-md:hidden absolute h-full aspect-square flex items-center justify-center">
              <Search />
            </div>
            {/* desktop */}
            <input
              onChange={handleInputChange}
              value={searchFilter}
              id="filterVendorsBySearch"
              autoComplete="off"
              spellCheck={false}
              placeholder="Search by location, products, or minimum price"
              className="xs:max-sm:hidden xs:max-sm:placeholder:text-xs h-12 w-full pl-14 xs:max-md:pl-2  focus-within:outline-[1px] focus-within:outline-peach"
            />
            {/* mobile */}
            <input
              onChange={handleInputChange}
              value={searchFilter}
              id="filterVendorsBySearch"
              autoComplete="off"
              placeholder="Search by location, products, or price"
              className="hidden xs:max-sm:block xs:max-sm:placeholder:text-sm h-12 w-full pl-14 xs:max-md:pl-2  focus-within:outline-[1px] focus-within:outline-peach"
            />
          </div>
          <div className="xs:max-500:w-full">
            {/* desktop */}
            <div className="xs:max-500:hidden flex gap-2">
              {searchFilter.length > 0 && (
                <Button
                  onClick={clearSearch}
                  animate={false}
                  text="Clear"
                  bgColor="bg-red-500"
                  color="text-white"
                />
              )}
              <Button
                onClick={filterVendorsBySearch}
                animate={false}
                text="Search"
                bgColor="bg-[#5c1b86]"
                color="text-white"
              />
            </div>
            {/* mobile */}
            <div className="hidden xs:max-500:block w-full ">
              <button className="size-full py-2 bg-[#5C1B86] hover:bg-[#5C1B86]/50 flex items-center justify-center outline-offset-2">
                <p className="text-white">Search</p>
              </button>
            </div>
          </div>
        </div>

        <div className="xs:max-500:hidden">
          {/* Filter Options by dropdown */}
          <div className="px-5 py-2 flex items-center gap-3">
            <CustomDropdown
              setActiveDropdown={setActiveDropdown}
              activeDropdown={activeDropdown}
              name="Location"
              multiple={false}
            />
            <CustomDropdown
              setActiveDropdown={setActiveDropdown}
              activeDropdown={activeDropdown}
              name="Products"
              multiple={true}
            />
            <CustomDropdown
              setActiveDropdown={setActiveDropdown}
              activeDropdown={activeDropdown}
              name="Price"
              multiple={false}
            />
          </div>

          {/* Applied Filters */}
          <ul className="px-5 pb-4 flex flex-wrap items-center gap-3">
            {vendorFilters.map((filter) => (
              <li
                key={filter}
                className=" bg-[#F1E6F9] hover:bg-[#EDEBE9] text-[#5c1b86] font-normal flex items-center pl-2"
              >
                <span className="p-1 text-sm capitalize">{filter}</span>{" "}
                <button
                  onClick={() => removeFilter(filter)}
                  className=" px-2 ml-1 hover:bg-slate-300"
                >
                  x
                </button>
              </li>
            ))}
            {vendorFilters.length > 0 && (
              <button
                onClick={clearAppliedFilters}
                className="font-bold text-sm text-[#5c1b86] hover:text-red-500 "
              >
                Clear applied filters
              </button>
            )}
            {/* {vendorSearch.length > 0 && (
              <button
                onClick={clearAppliedFilters}
                className="font-bold text-sm text-[#5c1b86] hover:text-red-500 "
              >
                Clear applied search
              </button>
            )} */}
          </ul>
        </div>
      </div>
      <div className="hidden opacity-0 xs:max-500:flex size-6"></div>

      {/* mobile view */}
      <div className="hidden xs:max-500:block w-full">
        {/* Applied Filters */}
        <ul className="px-1 flex flex-wrap text-sm items-center gap-3">
          {vendorFilters.map((filter) => (
            <li
              key={filter}
              className=" bg-[#F1E6F9] hover:bg-[#EDEBE9] text-[#5c1b86] font-normal flex items-center pl-2"
            >
              <span className="p-1 text-sm capitalize">{filter}</span>{" "}
              <button
                onClick={() => removeFilter(filter)}
                className=" px-2 ml-1 hover:bg-slate-300"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default VendorFilter;
