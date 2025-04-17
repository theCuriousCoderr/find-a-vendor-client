import { AppDispatch, RootState } from "@/app/store";
import productCategories from "@/static-data/productCategories";
import { Check, X } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { updateVendorDetails } from "@/app/features/settings/thunk";
import { Vendor } from "@/types";
import { updateStatusSuccess } from "@/app/features/product/productSlice";

interface AddCategoryModalPropType {
  closeAddCategoryModal: () => void;
}

interface DropDownType {
  isOpen: boolean;
  options: string[];
}

function AddCategoryModal({ closeAddCategoryModal }: AddCategoryModalPropType) {
  const dispatch = useDispatch<AppDispatch>();
  const { authenticatedVendor: vendor } = useSelector(
    (state: RootState) => state.vendors
  );
  const { loading } = useSelector((state: RootState) => state.settings);

  const [categories, setCategories] = useState<string[]>([]);
  const [dropdown, setDropdown] = useState<DropDownType>({
    isOpen: false,
    options: [],
  });

  useEffect(() => {
    vendor && setCategories(vendor.categories);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (categories.length === 5) return;
    const val = e.target.value;
    const _isOpen = Boolean(val);
    let _options = productCategories.filter((category) =>
      category.toLowerCase().includes(val.toLowerCase())
    );
    _options = _options.length === 0 ? [val] : _options;
    setDropdown({
      isOpen: _isOpen,
      options: _options,
    });
  }

  function isSelected(category: string) {
    return new Set(categories).has(category);
  }

  function removeSelected(categoryToRemove: string) {
    return categories.filter((category) => categoryToRemove !== category);
  }

  function removeCategory(categoryToRemove: string) {
    setCategories(removeSelected(categoryToRemove));
  }

  function selectOption(selectedCategory: string) {
    const _isSelected = isSelected(selectedCategory);

    let updatedCategories: string[];
    // removes
    if (_isSelected) {
      const _removeSelected = removeSelected(selectedCategory);
      updatedCategories = _removeSelected;
    }
    // adds
    else {
      if (categories.length === 5) return;
      const addSelected = [...categories, selectedCategory];
      updatedCategories = addSelected;
    }

    setCategories(updatedCategories);
  }

  async function saveCategory() {
    const vendorInfo = { ...vendor, categories } as Vendor;

    if (vendor) {
      try {
        const { message } = await dispatch(
          updateVendorDetails({ vendorInfo })
        ).unwrap();
        if (message === "Vendor Details Updated Successfully") {
          dispatch(
            updateStatusSuccess({ success: "Category Updated Successfully" })
          );
          closeAddCategoryModal();
        }
      } catch (error) {
        return;
      }
    }
  }

  return (
    <div className="fixed z-50 top-0 left-0 h-screen w-full bg-black/80 fle items-center justify-center">
      <div className="mt-20 h-[calc(100vh_-_5rem)] w-full flex items-center justify-center">
        <div className="max-w-[500px] xs:max-md:w-[90%] xs:max-md:max-w-full max-h-[95%] overflow-auto tiny-scrollbar bg-white relative rounded-md">
          <div
            onClick={closeAddCategoryModal}
            className="absolute right-2 top-2 size-8 "
          >
            <button className="size-full hover:bg-slate-100 transition-all bg-white shadow border rounded-md flex items-center justify-center">
              <X size={15} />
            </button>
          </div>
          {/* Info */}
          <div className="p-5 border-b mt-5">
            <p className="text-xl font-bold">Add Products Category</p>
            <p className="text-slate-400">
              Please only add/choose a category that your store fit most into.
              (Maximum of 5)
            </p>
          </div>

          {/* Main */}
          <div className="p-5">
            <p>Add Custom Category</p>

            <div
              ref={inputRef}
              tabIndex={0}
              className="relative flex flex-wrap gap-1 items-center w-full p-2 border rounded-md outline-4 xs:max-md:outline-2 outline-black/30 outline-offset-4 xs:max-md:outline-offset-2"
            >
              {dropdown.isOpen && (
                <ul className="absolute z-30 left-0 top-[110%] w-full max-h-[30vh] overflow-auto tiny-scrollbar bg-white rounded-md shadow border p-2">
                  {dropdown.options.map((option) => {
                    return (
                      <li key={option} className="flex items-center">
                        {isSelected(option) && <Check size={15} />}
                        <button
                          onClick={() => selectOption(option)}
                          className="size-full text-left p-1 rounded-md hover:bg-slate-100 capitalize"
                        >
                          {option}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              {categories.map((category) => {
                return (
                  <div
                    key={category}
                    className="flex gap-1 items-center bg-slate-200 px-1"
                  >
                    <p>{category}</p>
                    <div>
                      <button
                        onClick={() => removeCategory(category)}
                        className="p-1 hover:bg-slate-300"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {
                <div>
                  <input
                    //  onFocus={() => inputRef.current?.focus()}
                    onChange={handleChange}
                    spellCheck={false}
                    autoFocus={true}
                    className="outline-none h-5 w-20"
                    placeholder="Category"
                  />
                </div>
              }
            </div>

            <div className="flex justify-end mt-2">
              <div className="w-20">
                <Button
                  loading={loading}
                  onClick={saveCategory}
                  text="Save"
                  bgColor="bg-blue-500"
                  color="text-white"
                />
              </div>
            </div>

            <div className="mt-5">
              <p className="text-slate-400">Categories to pick from</p>
              <ul
                // initial={{ y: -20, opacity: 0 }}
                // animate={{ y: 0, opacity: 1 }}
                className="relative z-20 overflow-auto tiny-scrollbar max-h-[30%] shadow-sm flex gap-4 flex-wrap"
              >
                {productCategories.map((category) => {
                  return (
                    <li key={category} className="group ">
                      <button
                        onClick={() => selectOption(category)}
                        className="group py-1 px- size-full hover:bg-slate-200/50 flex gap-1 items-center font-light"
                      >
                        <div
                          className={`${
                            isSelected(category) ? "bg-lavender/80" : "bg-white"
                          } size-4 border rounded-sm border-black flex items-center justify-center`}
                        >
                          {!isSelected(category) && (
                            <Check
                              size="15"
                              opacity="0.3"
                              className="group-hover:block hidden"
                            />
                          )}
                          {isSelected(category) && (
                            <Check size="15" color="#FFFFFF" strokeWidth={4} />
                          )}
                        </div>
                        <p className="capitalize text-nowrap">{category}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;
