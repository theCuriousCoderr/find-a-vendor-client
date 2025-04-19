import getCloudinaryUrl from "@/utils/getCloudinaryUrl";
import { X } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { addAuthenticatedVendorProduct } from "@/app/features/vendors/thunk";
import analyseProductImage from "@/utils/analyseProductImage";
import { AddProductStateType } from "@/types";
import AddProductFormField from "./AddProductFormField";
import GenerateProductDetailsWithAI from "./GenerateProductDetailsWithAI";
import AddProductImageList from "./AddProductImageList";
import { GeminiAnalyseProductImageResponseType } from "@/types";
import { updateStatusSuccess } from "@/app/features/status/statusSlice";

interface AddProductModalPropType {
  category: string;
  closeAddProductModal: () => void;
}

function AddProductModal({
  category,
  closeAddProductModal,
}: AddProductModalPropType) {
  const dispatch = useDispatch<AppDispatch>();
  const { authenticatedVendor: vendor, authenticatedVendorProducts: products } =
    useSelector((state: RootState) => state.vendors);
  const inputLabelRef = useRef<HTMLLabelElement>(null);
  const [addingProductImage, setAddingProductImage] = useState(false);
  const [product, setProduct] = useState<AddProductStateType>({
    images: [
      // "https://res.cloudinary.com/dmiianrhe/image/upload/v1742115240/findAVendor/dii7eoohv2ixnldles8p.jpg",
      // "https://res.cloudinary.com/dmiianrhe/image/upload/v1744294536/tkghnkbl9n1veswcajc2.jpg",
      // "https://res.cloudinary.com/dmiianrhe/image/upload/v1744294536/findAVendor/tkghnkbl9n1veswcajc2.jpg"
    ],
    name: "",
    description: "",
    price: "",
    specifications: "",
  });

  const [thinkingAI, setThinkingAI] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);

  function openFileWindow() {
    (inputLabelRef.current as HTMLLabelElement).click();
  }

  async function handleAddImage(e: ChangeEvent<HTMLInputElement>) {
    setAddingProductImage(true);
    const files = e.target.files;
    if (files) {
      const image_urls = await getCloudinaryUrl(files);
      const existingUrls = product.images;
      setProduct({ ...product, images: [...existingUrls, ...image_urls] });
    }
    setAddingProductImage(false);
  }

  function deleteAddedImage(id: string) {
    const existingUrls = product.images.filter((image) => image !== id);
    setProduct({ ...product, images: existingUrls });
  }

  function handleProductDetailsChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const val = e.target.value;
    const name = e.target.name;
    setProduct({ ...product, [name]: val });
  }

  function clearAllProductDetails() {
    setProduct({
      ...product,
      name: "",
      description: "",
      price: "",
      specifications: "",
    });
  }

  async function analyseImageWithGemini() {
    setThinkingAI(true);
    try {
      const response = await analyseProductImage(product.images[0], false);
      const productSpecifications = response["Item Specifications"];
      const isProductSpecificationsPresent = productSpecifications.length > 0;
      setProduct({
        ...product,
        name: response["Product Name"],
        description: response["Item Description"],
        specifications: isProductSpecificationsPresent
          ? productSpecifications.join("\n\n")
          : "",
      });
    } catch (error) {
      console.error(error);
      const response = error as GeminiAnalyseProductImageResponseType;
      setProduct({
        ...product,
        name: response["Product Name"],
        description: response["Item Description"],
        specifications: response["Item Specifications"].join("\n\n"),
      });
    }

    setThinkingAI(false);
  }

  function generateProductObject() {
    return {
      category: category.toLowerCase(),
      vendor_id: vendor ? vendor.vendor_id : "",
      product_id: (totalVendorProducts() + 1).toString(),
      images: product.images,
      deliveryRange: vendor ? vendor.deliveryRange : [],
      details: {
        name: product.name,
        description: product.description,
        specifications: product.specifications,
        price: Number(product.price),
        status: "In stock",
      },
    };
  }

  async function addProduct(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setAddingProduct(true);
    try {
      const imagesLength = product.images.length;
      const name = product.name;
      const price = product.price;
      if (!imagesLength || !name || !price) return;

      const productToAdd = generateProductObject();

      const { message } = await dispatch(
        addAuthenticatedVendorProduct(productToAdd)
      ).unwrap();
      if (message === "Product Added Successfully") {
        dispatch(updateStatusSuccess({ success: message }));
        closeAddProductModal();
      }
    } catch (error) {
      console.error(error);
    }

    setAddingProduct(false);
  }

  function totalVendorProducts() {
    if (products) {
      const totalProductsLength = Object.entries(products)
        .map((val) => val[1])
        .flat().length;

      return totalProductsLength;
    }
    return 0;
  }

  return (
    <div className="fixed z-50 top-0 left-0 h-screen w-full bg-slate-400 fle items-center justify-center">
      <div className="mt-20 h-[calc(100vh_-_5rem)] w-full flex items-center justify-center">
        <div className="w-[50%] max-w-[500px]  xs:max-md:w-[90%] xs:max-md:max-w-full  max-h-[95%] overflow-auto tiny-scrollbar bg-white pb-5 relative rounded-md">
          {/* close modal */}
          <div
            onClick={closeAddProductModal}
            className="absolute right-2 top-2 size-8 "
          >
            <button className="size-full hover:bg-slate-100 transition-all bg-white shadow border rounded-md flex items-center justify-center">
              <X size={15} />
            </button>
          </div>

          {/* add a product text */}
          <div className="p-5 border-b">
            <p className="text-xl font-bold">Add A Product</p>
          </div>

          {/* user-based actions  */}
          <div className="p-5 space-y-5">
            <div className="space-y-5">
              {/* product images list */}
              <div className="space-y-2">
                <p className="text-slate-400">Add Product Image(s)</p>
                <AddProductImageList
                  productImages={product.images}
                  deleteAddedImage={deleteAddedImage}
                  thinkingAI={thinkingAI}
                  addingProductImage={addingProductImage}
                  openFileWindow={openFileWindow}
                  inputLabelRef={inputLabelRef}
                  handleAddImage={handleAddImage}
                />
              </div>

              {/* ask AI */}
              {product.images.length > 0 && (
                <GenerateProductDetailsWithAI
                  analyseImageWithGemini={analyseImageWithGemini}
                  thinkingAI={thinkingAI}
                />
              )}
            </div>

            {/* add product form */}
            {product.images.length > 0 && (
              <AddProductFormField
                addProduct={addProduct}
                thinkingAI={thinkingAI}
                addingProduct={addingProduct}
                // setAddingProduct={setAddingProduct}
                product={product}
                handleProductDetailsChange={handleProductDetailsChange}
                clearAllProductDetails={clearAllProductDetails}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
