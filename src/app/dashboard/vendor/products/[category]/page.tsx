"use client";

import { AppDispatch, RootState } from "@/app/store";
import AddProductModal from "@/components/AddProductModal";
// import Back from "@/components/Back";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { Edit3, Pointer, Trash2, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import { deleteAuthenticatedVendorProduct } from "@/app/features/vendors/thunk";
import { updateStatusSuccess } from "@/app/features/status/statusSlice";

interface AddProductType {
  isModalOpen: boolean;
  categories: string[];
}

interface EditProductType {
  isModalOpen: boolean;
  product: Product | null;
}

function Page() {
  const params = useParams<{ category: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { authenticatedVendor: vendor, authenticatedVendorProducts: products } =
    useSelector((state: RootState) => state.vendors);
  const [category, setCategory] = useState("");
  const [addProduct, setAddProduct] = useState<AddProductType>({
    isModalOpen: false,
    categories: [],
  });
  const [editProduct, setEditProduct] = useState<EditProductType>({
    isModalOpen: false,
    product: null,
  });
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState(false);

  async function resolveSearchParams() {
    const _category = params.category;
    setCategory(_category);
  }

  useEffect(() => {
    resolveSearchParams();
  }, []);

  function openAddProductModal() {
    setAddProduct({
      ...addProduct,
      isModalOpen: true,
    });
  }

  function closeAddProductModal() {
    setAddProduct({
      ...addProduct,
      isModalOpen: false,
    });
    setEditProduct({
      isModalOpen: false,
      product: null,
    });
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

  async function deleteProduct(_productToDelete: Product) {
    setDeletingProduct(true);
    try {
      const { message } = await dispatch(
        deleteAuthenticatedVendorProduct(_productToDelete)
      ).unwrap();
      if (message === "Product Deleted Successfully") {
        dispatch(updateStatusSuccess({ success: message }));
        setProductToDelete(null);
      }
    } catch (error) {
      console.error(error);
    }
    setDeletingProduct(false);
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
      {(addProduct.isModalOpen || editProduct.isModalOpen) && (
        <AddProductModal
          category={category}
          productToEdit={editProduct.product}
          closeAddProductModal={closeAddProductModal}
        />
      )}
      {productToDelete && (
        <div className="fixed z-50 top-0 left-0 h-screen w-full bg-lame flex items-center justify-center">
          <div className="bg-slate-50 max-w-[95%] p-5 xs:max-md:p-2 rounded-md shadow-md shadow-slate-900 space-y-5 xs:max-md:space-y-3">
            <p className="text-center font-bold text-xl xs:max-md:text-lg">
              Delete this product?
            </p>
            <div>
              <p className="text-center xs:max-md:text-sm">
                Are you sure you want to delete{" "}
                <q className="font-bold italic">
                  {productToDelete.details.name}
                </q>{" "}
                ?
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
                  Deleting this product will permanently remove it from the{" "}
                  <q className="font-bold italic capitalize">
                    {productToDelete.category}
                  </q>{" "}
                  category.
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-10 xs:max-md:gap-2 mt-2 rounded-md py-2">
              <div className=" bg-[#e22e3b] rounded-md">
                <button
                  onClick={() => setProductToDelete(null)}
                  className="py-1 px-4 text-sm text-white hover:bg-red-500 rounded-md flex gap-1 items-center justify-center"
                >
                  <p>Cancel</p>
                </button>
              </div>
              <div className="border border-[#e22e3b] rounded-md">
                {deletingProduct ? (
                  <div className="py-1 px-4">
                    <Spinner color="border-t-red-500" />{" "}
                  </div>
                ) : (
                  <button
                    onClick={() => deleteProduct(productToDelete)}
                    className="py-1 px-4 text-sm hover:bg-[#e22e3b]/10 flex gap-1 items-center justify-center"
                  >
                    <p className="text-[#e22e3b]">Delete product</p>
                    <Trash2 size={18} color="#e22e3b" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {getCategoryDetails(category).amount !== 0 && (
        <div className="xs:max-md:fixed z-20 bottom-0 left-0 right-0 bg-black">
          <Button
            onClick={openAddProductModal}
            bgColor="bg-black"
            color="text-white"
            text={
              products[category.toLowerCase()].length >= 1
                ? "Add Another Product"
                : "Add A Product"
            }
          />
        </div>
      )}
      <section className="mt-5 xs:max-md:mt-0">
        <h2 className="text-2xl xs:max-md:text-lg font-medium mb-2">
          {getCategoryDetails(category).amount === 0 && (
            <p>
              {" "}
              Your <q className="capitalize text-slate-600">{category}</q>{" "}
              category currently has no {getCategoryDetails(category).text}
            </p>
          )}
          {getCategoryDetails(category).amount > 0 && (
            <p>
              {getCategoryDetails(category).amount}{" "}
              {getCategoryDetails(category).text} found in the{" "}
              <q className="capitalize text-slate-600">{category}</q> category.
            </p>
          )}
        </h2>
        <ul className="grid gap-2 xs:max-400:grid-cols-1 400:max-md:grid-cols-2 md:max-lg:grid-cols-2 lg:grid-cols-3 ">
          {products[category.toLowerCase()] &&
            products[category.toLowerCase()].map((product) => (
              <div
                key={product.details.name}
                className="w-full last:xs:max-md:mb-12"
              >
                <Link
                  href={`/products?vendor_id=${
                    product.vendor_id
                  }&category=${product.category.toLowerCase()}&product_id=${
                    product.product_id
                  }`}
                  className="relative group w-full block bg-green-40 rounded-md xs:max-md:text-sm"
                >
                  {/* pointer  */}
                  <motion.div
                    animate={{ y: [-2, 2] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "easeInOut",
                    }}
                    className=" absolute z-10 size-full rounded-full flex items-center justify-center"
                  >
                    <Pointer
                      color="#FFFFFF"
                      className="fill-white stroke-black mt-5"
                    />
                  </motion.div>
                  <figure className="relative w-full aspect-square h-[30vh]">
                    <Image
                      src={
                        product.images[0].secure_url ||
                        "https://picsum.photos/id/300/200/300"
                      }
                      fill={true}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt="Product Preview Image"
                      className="object-scale-down object-botto"
                    />
                  </figure>
                  <p className="text-base text-center ">
                    {product.details.name}
                  </p>
                </Link>

                <div className="flex justify-center gap-5 mt-2 bg-slate-800 rounded-md py-2">
                  <div className="">
                    <button
                      onClick={() =>
                        setEditProduct({ isModalOpen: true, product })
                      }
                      className="p-1 text-sm hover:text-blue-500 text-white xs:max-md:text-blue-500 bg-transparent flex gap-1 items-center justify-center"
                    >
                      <Edit3 size={18} />
                    </button>
                  </div>
                  <div className="">
                    <button
                      onClick={() => setProductToDelete(product)}
                      className="p-1 text-sm hover:text-red-500 text-white xs:max-md:text-red-500 bg-transparent flex gap-1 items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </ul>
        {getCategoryDetails(category).amount === 0 && (
          <div className=" mt-5 w-full">
            <Button
              onClick={openAddProductModal}
              bgColor="bg-black"
              color="text-white"
              text="Add A Product"
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default Page;
