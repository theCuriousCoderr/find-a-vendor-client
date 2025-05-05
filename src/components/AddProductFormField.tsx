import React, { ChangeEvent, FormEvent } from "react";
import Input from "./Input";
import { AddProductStateType, Product } from "@/types";
import Button from "./Button";

interface AddProductFormFieldType {
  addProduct: (e: FormEvent<HTMLFormElement>) => void;
  editProduct:(e: FormEvent<HTMLFormElement>) => void;
  productToEdit?: Product | null;
  thinkingAI: boolean;
  addingProduct: boolean;
  product: AddProductStateType;
  handleProductDetailsChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  clearAllProductDetails: () => void;
}

function AddProductFormField({
  addProduct,
  editProduct,
  productToEdit,
  thinkingAI,
  addingProduct,
  product,
  handleProductDetailsChange,
  clearAllProductDetails,
}: AddProductFormFieldType) {
  return (
    <form onSubmit={(e) => { productToEdit ? editProduct(e) : addProduct(e) }} className="space-y-1">
     
      <div className="space-y-2">
        <Input
          disabled={thinkingAI}
          value={product.name}
          required={true}
          placeholder="Premium Yoga Mat Bundle"
          onChange={handleProductDetailsChange}
          name="name"
          label="Product Name"
          labelStyle="text-base"
          labelGap="space-y-1"
        />

        <div className="space-y-1">
          <label
            htmlFor="productDescription"
            className={`text-base xs:max-md:text-base`}
          >
            - Product Description
          </label>
          <textarea
            disabled={thinkingAI}
            value={product.description}
            placeholder="Extra thick 6mm eco-friendly yoga mat with alignment lines, carrying strap, and cleaning spray. Includes microfiber towel."
            onChange={handleProductDetailsChange}
            id="description"
            name="description"
            className="disabled:placeholder:text-slate-300/70 text-slate-600 placeholder:text-slate-300 disabled:text-slate-300/70 w-full h-32 p-2 border rounded-md outline-4 xs:max-md:outline-2 outline-black/30 outline-offset-4 xs:max-md:outline-offset-2"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="productDescription"
            className={`text-base xs:max-md:text-base`}
          >
            - Product Specifications
          </label>
          <textarea
            disabled={thinkingAI}
            value={product.specifications}
            placeholder="Extra thick 6mm eco-friendly yoga mat with alignment lines, carrying strap, and cleaning spray. Includes microfiber towel."
            onChange={handleProductDetailsChange}
            id="specifications"
            name="specifications"
            className="disabled:placeholder:text-slate-300/70 text-slate-600 placeholder:text-slate-300 disabled:text-slate-300/70 w-full h-32 p-2 border rounded-md outline-4 xs:max-md:outline-2 outline-black/30 outline-offset-4 xs:max-md:outline-offset-2"
          />
        </div>

        <Input
          disabled={thinkingAI}
          value={product.price.toString()}
          required={true}
          onChange={handleProductDetailsChange}
          name="price"
          label="Product Price (₦)"
          labelStyle="text-base"
          labelGap="space-y-1"
          placeholder="1000"
        />
      </div>
      {/* submit button */}
      <div className="flex justify-end">
        {product.images.length > 0 ? (
          <div className="flex gap-2 mt-5">
            <div>
              <button
                type="button"
                onClick={clearAllProductDetails}
                className="py-2 px-4 hover:bg-slate-300 text-nowrap"
              >
                Clear All
              </button>
            </div>
            <Button
              loading={thinkingAI || addingProduct}
              text={productToEdit ? "Edit Product" : "Add Product"}
              bgColor="bg-blue-500"
              color="text-white"
            />
          </div>
        ) : (
          <p className="py-2 px-4 bg-slate-200 text-slate-300 text-nowrap">
            {productToEdit ? "Edit Product" : "Add Product"}
          </p>
        )}
      </div>
    </form>
  );
}

export default AddProductFormField;
