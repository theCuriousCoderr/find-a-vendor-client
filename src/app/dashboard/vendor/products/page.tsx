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
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {addCategory.isModalOpen && (
        <AddCategoryModal closeAddCategoryModal={closeAddCategoryModal} />
      )}
      {categoryToDelete && (
        <div className="fixed z-30 top-0 left-0 h-screen w-full bg-slate-400 flex items-center justify-center">
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
                  category will also be deleted{" "}
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-10 xs:max-md:gap-2 mt-2 rounded-md py-2">
              <div className="border border-slate-400">
                <button
                  onClick={() => setCategoryToDelete("")}
                  className="py-1 px-4 text-sm text-slate-500 hover:bg-slate-300/50 flex gap-1 items-center justify-center"
                >
                  <p>Cancel</p>
                </button>
              </div>
              <div className="bg-[#e22e3b]">
                {deletingCategory ? (
                  <div className="py-1 px-4">
                    <Spinner />{" "}
                  </div>
                ) : (
                  <button
                    onClick={(e) => deleteCategory(e, categoryToDelete)}
                    className="py-1 px-4 text-sm hover:bg-red-500 flex gap-1 items-center justify-center"
                  >
                    <p className="text-white">Delete category</p>
                    <Trash2 size={18} color="#ffffff" />
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
          text="Add A Category"
        />

        {/* <div className="hidden bg-slate-200 xs:max-md:flex justify-center">
          <Back />
        </div> */}
      </div>
      <section className="mt-5 xs:max-md:mt-0 ">
        <div>
          <h2 className="text-2xl xs:max-md:text-lg font-medium">
            You have <q>{vendor.categories.length}</q> Categories of Products
          </h2>
          <p className="text-slate-400 text-xl xs:max-md:text-base">
            The things you sell
          </p>
        </div>

        {vendor.categories.length === 0 && (
          <div>
            <p className="text-slate-500">
              You have not added any product categories yet.
              <br />
              The things you sell
            </p>
            <p className="text-slate-500">
              Add at least one (1) category to your vendor profile.
            </p>
            <p className="text-slate-500">
              You can also go to{" "}
              <q className="text-slate-600 font-medium">Settings</q>{" "}
              <span>-&gt;</span>{" "}
              <q className="text-slate-600 font-medium">Profile</q>{" "}
              <span>-&gt;</span>{" "}
              <q className="text-slate-600 font-medium">
                Your Store&apos;s Categories
              </q>
            </p>
          </div>
        )}

        {vendor.categories.length > 0 && (
          <ul className="grid gap-2 xs:max-400:grid-cols-1 400:max-md:grid-cols-2 md:max-lg:grid-cols-2 lg:grid-cols-3 xs:max-md:pb-12">
            {vendor.categories.map(
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
                          className="relative group flex flex-col w-full aspect-square max-h-40 items-center justify-center  rounded-md bg-slate-200/50 xs:max-md:text-sm"
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

                        <div className="flex justify-center gap-5 mt-2 bg-slate-800 rounded-md py-2">
                          <div className="">
                            <button
                              onClick={() => alert("Coming Soon")}
                              className="p-1 text-sm text-slate-200 hover:bg-slate-300/50 flex gap-1 items-center justify-center"
                            >
                              <p>Edit Name</p>
                              <Edit3 size={18} />
                            </button>
                          </div>
                          <div className="">
                            <button
                              onClick={() => setCategoryToDelete(category)}
                              className="p-1 text-sm hover:bg-red-500/50 flex gap-1 items-center justify-center"
                            >
                              <p className="text-red-400">Delete</p>
                              <Trash2 size={18} color="#f87171" />
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
