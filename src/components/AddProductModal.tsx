import getCloudinaryUrl from "@/utils/getCloudinaryUrl";
import { X } from "lucide-react";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  addAuthenticatedVendorProduct,
  editAuthenticatedVendorProduct,
} from "@/app/features/vendors/thunk";
import analyseProductImage from "@/utils/analyseProductImage";
import { AddProductStateType, Product } from "@/types";
import AddProductFormField from "./AddProductFormField";
import GenerateProductDetailsWithAI from "./GenerateProductDetailsWithAI";
import AddProductImageList from "./AddProductImageList";
import { GeminiAnalyseProductImageResponseType } from "@/types";
import {
  updateStatusError,
  updateStatusSuccess,
} from "@/app/features/status/statusSlice";
import { AxiosError } from "axios";

interface AddProductModalPropType {
  category: string;
  productToEdit?: Product | null;
  closeAddProductModal: () => void;
}

function AddProductModal({
  category,
  productToEdit,
  closeAddProductModal,
}: AddProductModalPropType) {
  const dispatch = useDispatch<AppDispatch>();
  const { authenticatedVendor: vendor, authenticatedVendorProducts: products } =
    useSelector((state: RootState) => state.vendors);
  const inputLabelRef = useRef<HTMLLabelElement>(null);
  const [addingProductImage, setAddingProductImage] = useState(false);
  const [product, setProduct] = useState<AddProductStateType>({
    images: [
      {
        original_filename: "bag-3",
        public_id: "findAVendor/products/bag-3_qza68s",
        resource_type: "image",
        secure_url:
          "https://res.cloudinary.com/dvc76hnjd/image/upload/v1746412224/findAVendor/products/bag-3_qza68s.jpg",
        signature: "f99dc37ef7a30cdc37b1ef5b94c071859d9a3af2",
      },
    ],
    name: "",
    description: "",
    specifications: "",
    price: 0,
  });

  const [thinkingAI, setThinkingAI] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      const { name, description, price, specifications } =
        productToEdit.details;
      const images = productToEdit.images;
      setProduct({ images, name, description, price, specifications });
    }
  }, []);

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
    const existingUrls = product.images.filter(
      (image) => image.public_id !== id
    );
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
      price: 0,
      specifications: "",
    });
  }

  async function analyseImageWithGemini() {
    setThinkingAI(true);
    try {
      const response = await analyseProductImage(
        product.images[0].secure_url,
        false
      );
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
      product_id: productToEdit
        ? productToEdit.product_id
        : (totalVendorProducts() + 1).toString(),
      images: product.images,
      deliveryRange: vendor ? vendor.deliveryRange : [],
      details: {
        name: product.name,
        description: product.description,
        specifications: product.specifications,
        price: Number(product.price),
        status: productToEdit ? productToEdit.details.status : "In stock",
      },
    };
  }

  async function addProduct(e: FormEvent<HTMLFormElement>) {
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
      dispatch(
        updateStatusError({
          error: "Failed to add product. \nPlease try again",
        })
      );
      console.error(error);
    }

    setAddingProduct(false);
  }

  async function editProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAddingProduct(true);
    try {
      const imagesLength = product.images.length;
      const name = product.name;
      const price = product.price;
      if (!imagesLength || !name || !price) return;

      const productToEdit = generateProductObject();

      const { message } = await dispatch(
        editAuthenticatedVendorProduct(productToEdit)
      ).unwrap();
      if (message === "Product Editted Successfully") {
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
                <div>
                  <p className="text-slate-500">Add Product Image(s)</p>
                  <p className="text-slate-400 text-xs">
                    For better visual consistency and appearance, we recommend
                    uploading images with a white background, or close enough.
                  </p>
                </div>

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
                editProduct={editProduct}
                productToEdit={productToEdit}
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
