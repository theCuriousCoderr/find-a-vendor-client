"use client";

import Image from "next/image";
import { useState } from "react";

const imageArray = [
  {
    id: "mountain",
    imageUrl:
      "https://fastly.picsum.photos/id/911/200/300.jpg?hmac=WJrS4QZru3pp2Z3K9wqapHxHCNFU-XPF2tY7gviRMoQ",
  },
  {
    id: "red cloud",
    imageUrl:
      "https://fastly.picsum.photos/id/902/200/300.jpg?hmac=jcXqlZDNedKqsptpWe_80nmMFRvBXBCnWCpzYwJik3g",
  },
  {
    id: "vast grassland",
    imageUrl:
      "https://fastly.picsum.photos/id/66/200/300.jpg?hmac=zvcP8mVCNIMoM5f8iC-xSgDhR1VklmBY2SON28P4TOo",
  },
  {
    id: "sorghum",
    imageUrl:
      "https://fastly.picsum.photos/id/109/200/300.jpg?hmac=wtAwGwuVC3CUO3okhkSJZKm-wZY_evzXIo1F46OtKKo",
  },
  {
    id: "road network",
    imageUrl:
      "https://fastly.picsum.photos/id/576/200/300.jpg?hmac=Uf-okGnisfAphCT3N-WTyzaG-e-r9yvOhY3W43DMWwA",
  },
  {
    id: "dock",
    imageUrl:
      "https://fastly.picsum.photos/id/244/200/300.jpg?hmac=wik1JUmLjSI1ujhC7YXckSJhpxTId-Ul5HF5mcALqC8",
  },
  {
    id: "crater",
    imageUrl:
      "https://fastly.picsum.photos/id/1032/200/300.jpg?hmac=QdMNx6kwGjGtQqK_jCFOZa06MImU1ePTGi3mpwLZmwo",
  },
  {
    id: "sea",
    imageUrl:
      "https://fastly.picsum.photos/id/147/200/300.jpg?hmac=HvL1R0waHTWxScs3tF6eMlLs2JShbg25KJn03eSoqqo",
  },
  {
    id: "tall trees",
    imageUrl:
      "https://fastly.picsum.photos/id/648/200/300.jpg?hmac=yifVKULNJZhxFK2Oav2kDH8G4unUDKn-OebXR1bWOf4",
  },
  {
    id: "valley",
    imageUrl:
      "https://fastly.picsum.photos/id/894/200/300.jpg?hmac=yPKW_JRjZMfmYXpao6QL5LEt2cYJQdesD-zkL-U-UJs",
  },
  {
    id: "green trees",
    imageUrl:
      "https://fastly.picsum.photos/id/324/200/300.jpg?hmac=FV2xXKimSV4_6MgoF29au1Ml3DwqV98U6R1BSmuXXrk",
  },
  {
    id: "calm sea",
    imageUrl:
      "https://fastly.picsum.photos/id/717/200/300.jpg?hmac=OJYQhMLNcYlN5qz8IR345SJ7t6A0vyHzT_RdMxO4dSc",
  },
  {
    id: "bamboo",
    imageUrl:
      "https://fastly.picsum.photos/id/844/200/300.jpg?hmac=FoLTDoQx77auo3mU-LS3Bs5tj69F-FoyzZhwSVv77xk",
  },
  {
    id: "ice",
    imageUrl:
      "https://fastly.picsum.photos/id/256/200/300.jpg?hmac=6-SQmUqIECHQ4QadM7mAYY3sHPH5r_8e2pCBs7V67Sc",
  },
  {
    id: "dog",
    imageUrl:
      "https://fastly.picsum.photos/id/837/200/300.jpg?hmac=Gt-0oRZYfIeEmweMdDSOJI6o3pk0tZitt5LO1KsbLC4",
  },
  {
    id: "tiger",
    imageUrl:
      "https://fastly.picsum.photos/id/593/200/300.jpg?hmac=q_vr9ioph2Tk-PMmB5PpX7uS2nSp2wxpYTktjucc1yQ",
  },
  {
    id: "spider web",
    imageUrl:
      "https://fastly.picsum.photos/id/784/200/300.jpg?hmac=LIWlcHgxQH79XHKNji8Jin_KakntjYyd9VXyckNYFbE",
  },
  {
    id: "classroom",
    imageUrl:
      "https://fastly.picsum.photos/id/192/200/300.jpg?hmac=UAXa6z_MKaSlyDXrwECLl6XBp0jzyV3C2eSvsfMi_uc",
  },
  {
    id: "leaf",
    imageUrl:
      "https://fastly.picsum.photos/id/55/200/300.jpg?hmac=VjTl-6Y6NNyUWof_G17-KlocVl0QuUoxpir1beSTl8A",
  },
  {
    id: "standing man",
    imageUrl:
      "https://fastly.picsum.photos/id/331/200/300.jpg?hmac=p5C3371_uSYqznhNsddJ6h1t3gMS35ijqJoWBTuBRIQ",
  },
];

type ImageProp = {
  id: string;
  imageUrl: string;
};

type SnapPropTypes = {
  image: ImageProp;
  selectedSnaps: ImageProp[];
  setSelectedSnaps: React.Dispatch<React.SetStateAction<ImageProp[]>>;
  handleSelectedSnaps: (e: HTMLInputElement, id: string) => void;
};

// A Component: Represents each image
function Snap({
  image,
  selectedSnaps,
  setSelectedSnaps,
  handleSelectedSnaps,
}: SnapPropTypes) {
  const checkboxSize = "size-4";

  let id: number | NodeJS.Timeout;
  function selectSnap() {
    id = setTimeout(() => {
      setSelectedSnaps([image]);
    }, 1000);
  }

  function cancelSelectSnap() {
    clearTimeout(id);
  }
  return (
    <li
      onMouseDown={selectSnap}
      onMouseUp={cancelSelectSnap}
      className="group relative h-40 w-[25%] max-w-32 cursor-pointer"
    >
      {/* Represents the black cover on hover */}
      <div className="hidden group-hover:block absolute top-0 left-0 z-10 size-full bg-black bg-opacity-50"></div>
      {/* renders the image itself */}
      <figure className="relative size-full">
        <div className="absolute top-1/2 z-10 w-full">
          {/* Represents the image name */}
          <p className="text-center text-white bg-black bg-opacity-50 backdrop-blur-sm">
            {image.id}
          </p>
        </div>
        <Image
          fill={true}
          src={image.imageUrl}
          alt={image.id}
          className="object-cover object-center"
        />
      </figure>
      {/* Represents the checkboxes */}
      {selectedSnaps.length >= 1 && (
        <div
          className={`${checkboxSize} absolute top-0 left-0 size-full z-20 bottom-2 right-2 overflow-hidden`}
        >
          {/* Represents a black cover when a snap is selected */}
          {new Set(selectedSnaps.map((snap) => snap.id)).has(image.id) && (
            <div className="absolute top-0 left-0 size-full bg-black bg-opacity-60"></div>
          )}

          <div
            className={`${checkboxSize} rounded-full overflow-hidden absolute z-10 bottom-3 right-3 flex items-center justify-center`}
          >
            <input
              type="checkbox"
              checked={selectedSnaps?.map((snap) => snap.id).includes(image.id)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSelectedSnaps(e.target, image.id)
              }
              className={`${checkboxSize}`}
            />
          </div>
        </div>
      )}
    </li>
  );
}

// A Component: Represents the header when no image is checked
function UncheckedHeader({
  deletedSnaps,
  setSelectedSnaps,
  setDeletedSnaps,
}: {
  deletedSnaps: string[];
  setSelectedSnaps: React.Dispatch<React.SetStateAction<ImageProp[]>>;
  setDeletedSnaps: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  function handleCheckAll(e: HTMLInputElement) {
    const snaps = imageArray.filter(
      (image) => !new Set(deletedSnaps).has(image.id)
    );
    e.checked ? setSelectedSnaps(snaps) : setSelectedSnaps([]);
  }

  function reset() {
    setDeletedSnaps([]);
  }
  return (
    <div className="h-10 px-4 py-2 flex items-center justify-between border-b border-slate-200 shadow">
      <p className="font-bold text-xl">+</p>
      <p className="font-semibold">Memories</p>

      <div className="size-5 rounded-full flex items-center justify-center">
        <input
          hidden={deletedSnaps.length === imageArray.length}
          // checked={selectedSnaps.length === imageArray.length}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleCheckAll(e.target)
          }
          type="checkbox"
          className="cursor-pointer"
        />
        {deletedSnaps.length === imageArray.length && (
          <button
            onClick={reset}
            className="hover:text-green-500 text-green-400 font-medium"
          >
            Refresh
          </button>
        )}
      </div>
    </div>
  );
}

// A Component: Represents the header when any image is checked
function CheckedHeader({
  selectedSnaps,
  setSelectedSnaps,
}: {
  selectedSnaps: ImageProp[];
  setSelectedSnaps: React.Dispatch<React.SetStateAction<ImageProp[]>>;
}) {
  function cancel() {
    setSelectedSnaps([]);
  }

  function handleCheckAll(e: HTMLInputElement) {
    e.checked ? setSelectedSnaps(imageArray) : setSelectedSnaps([]);
  }
  return (
    <div className="h-10 px-4 py-2 flex items-center justify-between border-b border-slate-200 shadow">
      <div>
        <button
          onClick={cancel}
          className="text-red-500 text-sm hover:underline"
        >
          Cancel
        </button>
      </div>
      <div className="font-semibold">
        {" "}
        {selectedSnaps.length === 1 ? (
          <p> {selectedSnaps.length} Snap Selected </p>
        ) : (
          <p> {selectedSnaps.length} Snaps Selected </p>
        )}
      </div>
      <div className="size-5 rounded-full flex items-center justify-center">
        <input
          checked={selectedSnaps.length === imageArray.length}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleCheckAll(e.target)
          }
          type="checkbox"
        />
      </div>
    </div>
  );
}

// A Component: Represents the Delete/Download panel when an image is selected
function MoreOptions({
  selectedSnaps,
  setSelectedSnaps,
  deletedSnaps,
  setDeletedSnaps,
}: {
  selectedSnaps: ImageProp[];
  setSelectedSnaps: React.Dispatch<React.SetStateAction<ImageProp[]>>;
  deletedSnaps: string[];
  setDeletedSnaps: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  function downloadImages() {
    for (const image of selectedSnaps) {
      fetch(image.imageUrl, {
        method: "GET",
        headers: {},
      })
        .then((response) => {
          response.arrayBuffer().then(function (buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${image.id}.png`); //or any other extension
            document.body.appendChild(link);
            link.click();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function deleteImages() {
    const ssId = selectedSnaps.map((snap) => snap.id).concat(deletedSnaps);
    setDeletedSnaps(ssId);
    setSelectedSnaps([]);
  }

  return (
    <div className="fixed z-50 bottom-0 w-full max-w-[512px] flex gap-5 p-5 slideUp bg-slate-900">
      <div>
        <button
          onClick={deleteImages}
          className="text-white text-sm bg-red-600 px-4 py-1 rounded-sm font-bol hover:bg-opacity-50"
        >
          Delete
        </button>
      </div>
      <div>
        <button
          onClick={downloadImages}
          className="text-white text-sm bg-green-600 px-4 py-1 rounded-sm font-bol hover:bg-opacity-50"
        >
          Download
        </button>
      </div>
    </div>
  );
}

// Represents the whole Layout
export default function Tabs() {
  const [selectedSnaps, setSelectedSnaps] = useState<ImageProp[]>([]);
  const [deletedSnaps, setDeletedSnaps] = useState<string[]>([]);

  function handleSelectedSnaps(e: HTMLInputElement, id: string) {
    if (e.checked) {
      const snap = imageArray.filter((snap) => snap.id === id);
      setSelectedSnaps((prevSelectedSnaps) => [...prevSelectedSnaps, snap[0]]);
    } else {
      const ssId = new Set(
        selectedSnaps.filter((snap) => snap.id !== id).map((snap) => snap.id)
      );
      const newSnaps = imageArray.filter((image) => ssId.has(image.id));
      setSelectedSnaps(newSnaps);
    }
  }

  return (
    <section className="relative h-screen w-full overflow-auto tab max-w-[512px] mx-auto">
      <div className="relative">
        {selectedSnaps.length >= 1 && (
          <MoreOptions
            selectedSnaps={selectedSnaps}
            setSelectedSnaps={setSelectedSnaps}
            deletedSnaps={deletedSnaps}
            setDeletedSnaps={setDeletedSnaps}
          />
        )}
      </div>
      {selectedSnaps.length === 0 ? (
        <UncheckedHeader
          deletedSnaps={deletedSnaps}
          setSelectedSnaps={setSelectedSnaps}
          setDeletedSnaps={setDeletedSnaps}
        />
      ) : (
        <CheckedHeader
          selectedSnaps={selectedSnaps}
          setSelectedSnaps={setSelectedSnaps}
        />
      )}

      <ul className="flex pb-20 flex-wrap w-full justify-between">
        {imageArray
          .filter((image) => !new Set(deletedSnaps).has(image.id))
          .map((image) => (
            <Snap
              key={image.id}
              image={image}
              setSelectedSnaps={setSelectedSnaps}
              selectedSnaps={selectedSnaps}
              handleSelectedSnaps={handleSelectedSnaps}
            />
          ))}
      </ul>
    </section>
  );
}