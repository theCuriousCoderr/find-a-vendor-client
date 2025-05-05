"use client";

import { AppDispatch, RootState } from "@/app/store";
import AddCategoryModal from "@/components/AddCategoryModal";
// import Back from "@/components/Back";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { Edit3, Trash2, Pointer, TriangleAlert } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { deleteAuthenticatedVendorCategory } from "@/app/features/vendors/thunk";
// import { updateVendorDetails } from "@/app/features/settings/thunk";
import {
  updateStatusError,
  updateStatusSuccess,
} from "@/app/features/status/statusSlice";

interface AddCategoryType {
  isModalOpen: boolean;
  categories: string[];
}

function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { authenticatedVendor: vendor, authenticatedVendorProducts: products } =
    useSelector((state: RootState) => state.vendors);

  const [addCategory, setAddCategory] = useState<AddCategoryType>({
    isModalOpen: false,
    categories: [],
  });

  const [seeCategoryProducts, setSeeCategoryProducts] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState("");
  const [deletingCategory, setDeletingCategory] = useState(false);

  useEffect(() => {
    vendor &&
      setAddCategory({
        isModalOpen: false,
        categories: vendor.categories,
      });
  }, []);

  function openAddCategoryModal() {
    setAddCategory({
      ...addCategory,
      isModalOpen: true,
    });
  }

  function closeAddCategoryModal() {
    setAddCategory({
      ...addCategory,
      isModalOpen: false,
    });
  }

  async function deleteCategory(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    _categoryToDelete: string
  ) {
    e.stopPropagation();
    setDeletingCategory(true);
    if (vendor) {
      const categories = vendor.categories;
      const newCategories = categories.filter(
        (category) => category.toLowerCase() !== _categoryToDelete.toLowerCase()
      );
      const vendorInfo = { ...vendor, categories: newCategories };
      try {
        const { message } = await dispatch(
          deleteAuthenticatedVendorCategory({
            category: categoryToDelete.toLowerCase(),
            vendor: vendorInfo,
          })
        ).unwrap();

        if (message === "Category Deleted") {
          dispatch(
            updateStatusSuccess({
              success: `${categoryToDelete} category deleted`,
            })
          );
          setCategoryToDelete("");
        } else {
          dispatch(
            updateStatusError({
              error: `Failed to delete ${categoryToDelete} category`,
            })
          );
        }
      } catch (error) {
        dispatch(
          updateStatusError({
            error: `Failed to delete ${categoryToDelete} category`,
          })
        );
        return;
      }
    }

    setDeletingCategory(false);
    // setCategoryToDelete("")
  }

  function getCategoryDetails(category: string) {
    try {
      if (products) {
        const productsLength = products[category.toLowerCase()].length;
        return {
          amount: productsLength,
          text: productsLength > 1 ? "products" : "product",
        };
      }
    } catch (error) {
      return {
        amount: 0,
        text: "product",
      };
    }
    return {
      amount: 0,
      text: "product",
    };
  }

  if (!vendor || !products) {
    return (
      <div className="my-10">
        <Spinner color="border-t-blue-500" />
      </div>
    );
  }

  if (vendor.categories.length === 0) {
    return (
      <div className="space-y-5">
        {addCategory.isModalOpen && (
          <AddCategoryModal closeAddCategoryModal={closeAddCategoryModal} />
        )}
        <p className="text-slate-500">
          You have not added any product category yet.
          <br />
          The things you sell
        </p>

        <div className="">
          <Button
            onClick={openAddCategoryModal}
            bgColor="bg-black"
            color="text-white"
            text="Add A Category"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {addCategory.isModalOpen && (
        <AddCategoryModal closeAddCategoryModal={closeAddCategoryModal} />
      )}
      {categoryToDelete && (
        <div className="fixed z-50 top-0 left-0 h-screen w-full bg-lame flex items-center justify-center">
          <div className="bg-slate-50 max-w-[95%] p-5 xs:max-md:p-2 rounded-md shadow-md shadow-slate-900 space-y-5 xs:max-md:space-y-3">
            <p className="text-center font-bold text-xl xs:max-md:text-lg">
              Delete this category?
            </p>
            <div>
              <p className="text-center xs:max-md:text-sm">
                Are you sure you want to delete{" "}
                <q className="font-bold italic">{categoryToDelete}</q> ?
              </p>
              <p className="text-center xs:max-md:text-sm">
                You can&apos;t undo this action.
              </p>
            </div>
            {Number(getCategoryDetails(categoryToDelete).amount) > 0 && (
              <div className="flex items-start gap-3 border-l-4 border-[#e27c51] bg-[#ffe8d9] p-5 xs:max-md:p-3 rounded-sm">
                <div className="size-5 flex items-center justify-center">
                  <TriangleAlert fill="#e15624" stroke="#ffffff" className="" />
                </div>
                <div>
                  <p className="text-[#773d34] font-medium text-lg xs:max-md:text-base">
                    Warning
                  </p>
                  <p className="text-[#773d34] xs:max-md:text-sm">
                    By deleting this category,{" "}
                    {getCategoryDetails(categoryToDelete).amount}{" "}
                    {getCategoryDetails(categoryToDelete).text} under this
                    category will also be deleted.{" "}
                  </p>
                </div>
              </div>
            )}
            <div className="flex justify-center gap-10 xs:max-md:gap-2 mt-2 rounded-md py-2">
              <div className=" bg-[#e22e3b] rounded-md">
                <button
                  onClick={() => setCategoryToDelete("")}
                  className="py-1 px-4 text-sm text-white hover:bg-red-500 rounded-md flex gap-1 items-center justify-center"
                >
                  <p>Cancel</p>
                </button>
              </div>
              <div className="border border-[#e22e3b] rounded-md">
                {deletingCategory ? (
                  <div className="py-1 px-4">
                    <Spinner color="border-t-red-500" />{" "}
                  </div>
                ) : (
                  <button
                    onClick={(e) => deleteCategory(e, categoryToDelete)}
                    className="py-1 px-4 text-sm hover:bg-[#e22e3b]/10 flex gap-1 items-center justify-center"
                  >
                    <p className="text-[#e22e3b]">Delete category</p>
                    <Trash2 size={18} color="#e22e3b" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="xs:max-md:fixed xs:max-md:z-20 bottom-0 left-0 right-0 xs:max-md:bg-black">
        <Button
          onClick={openAddCategoryModal}
          bgColor="bg-black"
          color="text-white"
          text={
            vendor.categories.length >= 1
              ? "Add Another Category"
              : "Add A Category"
          }
        />
      </div>
      <section className="mt-5 xs:max-md:mt-0 ">
        <div>
          <h2 className="text-2xl xs:max-md:text-lg font-medium">
            You have created {vendor.categories.length} product{" "}
            <span>
              {vendor.categories.length > 1 ? "categories" : "category"}
            </span>
          </h2>
          <p className="text-slate-400 text-xl xs:max-md:text-base">
            The things you sell
          </p>
        </div>

        {vendor.categories.length > 0 && (
          <ul className="grid gap-2 xs:max-400:grid-cols-1 400:max-md:grid-cols-2 md:max-lg:grid-cols-2 lg:grid-cols-3 xs:max-md:pb-12">
            {vendor.categories.toSorted().map(
              (category) =>
                Boolean(category) && (
                  <li
                    key={category}
                    className=" rounded-md p-2 hover:bg-slate-100 xs:max-md:bg-slate-1"
                  >
                    {seeCategoryProducts === category ? (
                      <div className="w-full aspect-square max-h-40 flex items-center justify-center bg-slate-100 rounded-md">
                        {" "}
                        <Spinner color="border-t-blue-500" />{" "}
                      </div>
                    ) : (
                      <div>
                        <Link
                          onClick={() => setSeeCategoryProducts(category)}
                          href={`products/${category.toLowerCase()}`}
                          className="relative group flex flex-col w-full aspect-square h-40 max-h-40 items-center justify-center  rounded-md bg-slate-200/50 xs:max-md:text-sm"
                        >
                          {/* pointer  */}
                          <motion.div
                            animate={{ y: [-2, 2] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "easeInOut",
                            }}
                            className=" absolute z-10 size-5 rounded-full flex items-center justify-center"
                          >
                            <Pointer
                              color="#FFFFFF"
                              className="fill-white stroke-black mt-14"
                            />
                          </motion.div>
                          <p className="uppercase">{category}</p>
                          <p className="text-sm text-slate-500">
                            You have {getCategoryDetails(category).amount}{" "}
                            {getCategoryDetails(category).text} here
                          </p>
                        </Link>

                        <div className="flex flex-wrap justify-center gap-5 mt-2 bg-slate-800 rounded-md py-2">
                          <div className="">
                            <button
                              // onClick={() => alert("Coming Soon")}
                              className="p-1 text-sm hover:text-slate-700 text-white xs:max-md:text-slate-700 bg-transparent flex gap-1 items-center justify-center"
                            >
                              {/* <p>Edit Name</p> */}
                              <Edit3 size={18} />
                            </button>
                          </div>
                          <div className="">
                            <button
                              onClick={() => setCategoryToDelete(category)}
                              className="p-1 text-sm hover:text-red-500 text-white bg-transparent xs:max-md:text-red-500 flex gap-1 items-center justify-center"
                            >
                              {/* <p className="text-red-400">Delete</p> */}
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                )
            )}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Page;
