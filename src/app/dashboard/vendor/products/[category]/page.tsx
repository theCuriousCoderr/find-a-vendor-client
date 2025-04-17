"use client";

import { RootState } from "@/app/store";
import AddProductModal from "@/components/AddProductModal";
// import Back from "@/components/Back";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { Edit3, Pointer, Trash2 } from "lucide-react";
import Image from "next/image";

interface AddProductType {
  isModalOpen: boolean;
  categories: string[];
}

function Page({ params }: { params: Promise<{ category: string }> }) {
  const { authenticatedVendor: vendor, authenticatedVendorProducts: products } =
    useSelector((state: RootState) => state.vendors);
  const [category, setCategory] = useState("");
  const [addProduct, setAddProduct] = useState<AddProductType>({
    isModalOpen: false,
    categories: [],
  });

  async function resolveSearchParams() {
    const { category: _category } = await params;
    setCategory(_category);
  }

  useEffect(() => {
    resolveSearchParams();
    console.log(products);
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
  }

  function getCategoryDetails(category: string) {
    try {
      if (products) {
        const productsLength = products[category.toLowerCase()].length;
        return {
          amount: productsLength,
          text: productsLength > 1 ? "Products" : "Product",
        };
      }
    } catch (error) {
      return {
        amount: 0,
        text: "Product",
      };
    }
    return {
      amount: 0,
      text: "Product",
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
      {addProduct.isModalOpen && (
        <AddProductModal
          category={category}
          closeAddProductModal={closeAddProductModal}
        />
      )}
      {getCategoryDetails(category).amount !== 0 && (
        <div className="xs:max-md:fixed z-20 bottom-0 left-0 right-0 bg-black">
          <Button
            onClick={openAddProductModal}
            bgColor="bg-black"
            color="text-white"
            text="Add A Product"
          />
        </div>
      )}
      <section className="mt-5 xs:max-md:mt-0">
        <h2 className="text-2xl xs:max-md:text-lg font-medium mb-2">
          You Have {getCategoryDetails(category).amount}{" "}
          {getCategoryDetails(category).text} Under{" "}
          <q className="capitalize text-slate-600">{category}</q> category
          {/* {JSON.stringify(products)} */}
        </h2>
        <ul className="grid grid-cols-4 gap-10 xs:max-400:grid-cols-1">
          {products[category.toLowerCase()] &&
            products[category.toLowerCase()].map((product) => (
              <div key={product.details.name} className="last:xs:max-md:mb-12">
                <Link
                  // onClick={() => setSeeCategoryProducts(category)}
                  href={`products/${category.toLowerCase()}`}
                  className="relative group w-full aspect-square bg-green-500 rounded-md xs:max-md:text-sm"
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
                  <figure className="relative w-full aspect-square max-h-40 bg-white shimmer">
                    <Image
                      src={
                        product.images[0] ||
                        "https://picsum.photos/id/300/200/300/?blur=10"
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
                  {/* <p className="uppercase">{category}</p>
                  <p className="text-sm text-slate-500">
                    You have {getCategoryDetails(category).amount}{" "}
                    {getCategoryDetails(category).text} here
                  </p> */}
                </Link>

                <div className="flex justify-center gap-5 mt-2 bg-slate-800 rounded-md py-2">
                  <div className="">
                    <button className="p-1 text-sm text-slate-200 hover:bg-slate-300/50 flex gap-1 items-center justify-center">
                      <p>Edit</p>
                      <Edit3 size={18} />
                    </button>
                  </div>
                  <div className="">
                    <button
                      // onClick={(e) => deleteCategory(e, category)}
                      className="p-1 text-sm hover:bg-red-500/50 flex gap-1 items-center justify-center"
                    >
                      <p className="text-red-400">Delete</p>
                      <Trash2 size={18} color="#f87171" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {getCategoryDetails(category).amount === 0 && (
            <div className="bg-black mt-5">
              <Button
                onClick={openAddProductModal}
                bgColor="bg-black"
                color="text-white"
                text="Add A Product"
              />
            </div>
          )}
        </ul>
      </section>
    </div>
  );
}

export default Page;
