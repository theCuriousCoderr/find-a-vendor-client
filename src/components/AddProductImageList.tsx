import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent } from "react";
import Spinner from "./Spinner";

interface AddProductImageListType {
  productImages: string[];
  deleteAddedImage: (id: string) => void;
  thinkingAI: boolean;
  addingProductImage: boolean;
  openFileWindow: () => void;
  inputLabelRef: React.RefObject<HTMLLabelElement>;
  handleAddImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

function AddProductImageList({
  productImages,
  deleteAddedImage,
  thinkingAI,
  addingProductImage,
  openFileWindow,
  inputLabelRef,
  handleAddImage,
}: AddProductImageListType) {
  return (
    <ul className="flex flex-wrap gap-2 items-center">
      {productImages.map((image, index) => {
        return (
          <li key={image} className="relative size-20 rounded-md shimmer">
            {image && (
              <div className="absolute z-10 size-5 top-0 right-0">
                <button
                  onClick={() => deleteAddedImage(image)}
                  className="size-full bg-white hover:bg-red-300 flex items-center justify-center"
                >
                  <Trash2 size={15} color="#ef4444" />{" "}
                </button>
              </div>
            )}
            <figure className="relative size-full">
              {index === 0 && thinkingAI && (
                <div className="absolute z-10 size-full opacity-90 shimmer flex items-center justify-center">
                  <p className="text-xs text-slate-500">Scanning</p>
                </div>
              )}
              {image && (
                <Image
                  fill={true}
                  sizes="80px"
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="rounded-md object-cover"
                />
              )}
            </figure>
          </li>
        );
      })}

      {addingProductImage ? (
        <div className=" size-10 flex items-center ">
          <Spinner color="border-t-blue-500" />
        </div>
      ) : (
        <li>
          <button onClick={openFileWindow} className="size-10">
            <label
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                return;
              }}
              ref={inputLabelRef}
              htmlFor="ola"
              className="cursor-pointer border bg-slate-50 hover:bg-slate-100 size-full border-dashed border-slate-300 rounded-md flex items-center justify-center"
            >
              {" "}
              <Plus />
            </label>
            <input
              onChange={handleAddImage}
              hidden
              id="ola"
              name="ola"
              type="file"
              multiple={true}
              accept="image/*"
            />
          </button>
        </li>
      )}
    </ul>
  );
}

export default AddProductImageList;
