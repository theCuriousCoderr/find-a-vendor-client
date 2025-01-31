"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function Label() {
  return (
    <figure className={`drop relative size-[28px] bg-white border shadow-md`}>
      <Image
        fill={true}
        src="/salmon.png"
        alt="Ginger-Soy Salmon Fillet"
        className="object-contain"
      />
    </figure>
  );
}

function Cart() {
  const [cartState, setCartState] = useState({
    count: 0,
    cartCount: 0,
  });

  const [showOtherElements, setShowOtherElements] = useState(true);

  function toggleShowOtherElements() {
    setShowOtherElements(!showOtherElements);
  }

  function incrementCount() {
    const newCount = cartState.count + 1;

    setTimeout(() => {
      setCartState({ count: newCount, cartCount: newCount });
    }, 700);
    setCartState({ ...cartState, count: newCount });
    startAnimation("add");
  }

  function decrementCount() {
    const newCount = Math.max(cartState.count - 1, 0);

    setTimeout(() => {
      setCartState({ count: newCount, cartCount: newCount });
    }, 700);
    setCartState({ ...cartState, count: newCount });
    startAnimation("subtract");
  }

  function startAnimation(flag: string) {
    const drop = document.getElementById("drop");
    const reverseDrop = document.getElementById("reverse-drop");
    const primaryCount = document.getElementById("primary-count");
    const primaryCart = document.getElementById("primary-cart");
    const secondaryCount = document.getElementById("secondary-count");
    const secondaryCart = document.getElementById("secondary-cart");
    const cart = document.getElementById("cart");
    if (drop && flag === "add") {
      const figureElement = (
        <figure className="drop relative size-[28px] bg-white border shadow-md">
          <Image
            fill={true}
            src="/salmon.png"
            alt="Ginger-Soy Salmon Fillet"
            className="object-contain"
          />
        </figure>
      );
      const root = createRoot(drop);
      setTimeout(() => {
        root.render(figureElement);
      }, 100);
    }

    if (reverseDrop && flag === "subtract") {
      const figureElement = (
        <figure className="reverse-drop relative size-[28px] bg-white border shadow-md">
          <Image
            fill={true}
            src="/salmon.png"
            alt="Ginger-Soy Salmon Fillet"
            className="object-contain"
          />
        </figure>
      );
      const root = createRoot(reverseDrop);
      setTimeout(() => {
        root.render(figureElement);
      }, 100);
    }
    if (
      primaryCount &&
      secondaryCount &&
      primaryCart &&
      secondaryCart &&
      cart
    ) {
      secondaryCount.style.display = "block";
      primaryCount.classList.add("animate-count-delay");
      secondaryCount.classList.add("animate-count");

      const id1 = setTimeout(() => {
        primaryCount.classList.remove("animate-count-delay");
        secondaryCount.classList.remove("animate-count");
        secondaryCount.style.display = "none";

        secondaryCart.style.display = "block";
        primaryCart.classList.add("animate-count-delay");
        secondaryCart.classList.add("animate-count");

        cart.classList.add("ping");
      }, 500);

      setTimeout(() => {
        clearTimeout(id1);
        primaryCart.classList.remove("animate-count-delay");
        secondaryCart.classList.remove("animate-count");
        secondaryCart.style.display = "none";
        cart.classList.remove("ping");
      }, 700);
    }
  }

  return (
    <main className="h-screen w-full flex items-center justify-center">
      <section className="min-w-[310px] max-w-[400px] w-[30%] bg-black rounded-t-[2rem] rounded-b-[1.7rem] shadow-lg">
        <div className="flex items-center text-white gap-3 p-5">
          <input
            checked={showOtherElements}
            onChange={toggleShowOtherElements}
            type="checkbox"
            className="size-5"
          />
          Show Other Elements
        </div>
        {/* white cart pop up */}
        <div className="relative bg-white size-full rounded-b-3xl rounded-t-[2rem] border border-slate-500/20 py-2 px-10 xs:max-md:px-5 pb-20">
          <div className="w-[10%] aspect-[1/0.2] rounded-full bg-slate-300 mx-auto"></div>
          {showOtherElements && (
            <section>
              {/* Food Image */}
              <figure className="relative mt-5 w-full mx-auto aspect-[1/1] bg-purple-200/10">
                <Image
                  fill={true}
                  src="/salmon.png"
                  alt="Ginger-Soy Salmon Fillet"
                  className="object-contain"
                />
              </figure>
              {/* Food details */}
              <div className="py-5 border-b">
                <h1 className="font-extrabold text-gray-800 text-xl">
                  Ginger-Soy Salmon Fillet
                </h1>
                <h2 className="text-gray-800 text-sm font-medium">
                  edamame, cucumber, avocado, herbs, white rice
                </h2>
                <p className="font-bold text-gray-700 text-xl">$9.95</p>
              </div>
              {/* Food Options */}
              <div className="mt-2">
                <div className="flex justify-between items-center pb-2">
                  <p className="font-bold text-gray-700 text">Options</p>
                  <h2 className="p-1 rounded-full border text-xs">Optional</h2>
                </div>
                <div className="p-1 space-y-1 max-h-20 pb-10 overflow-auto no-scrollBar">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex justify-between items-center bg-purple-200/10 p-2 border border-slate-200/20 rounded-md"
                    >
                      <div>
                        <p className="font-bold text-gray-700 text-sm">
                          Vegan {item}
                        </p>
                        <p className="font-bold text-gray-700 text-xs">+0.00</p>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className="size-5 border border-red-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          {/* CTA */}
          <section className="absolute pt-5 bg-white/70 backdrop-blur-sm z-10 flex gap-[20px] items-center bottom-5 left-0 w-full">
            <div className="relative w-[300px] mx-auto flex">
              <div
                id="drop"
                className="absolute -z-10 top-3 left-[100px] size-[28px]"
              ></div>

              <div
                id="reverse-drop"
                className="absolute -z-10 top-3 right-[55px] size-[28px]"
              ></div>

              {/* Add/Minus */}
              <div className="w-[200px] bg-purple-50 rounded-full flex items-center justify-between">
                <div className="w-[30%] flex items-center justify-center">
                  <button
                    onClick={decrementCount}
                    className="size-full hover:bg-purple-200/40 p-3 rounded-full"
                  >
                    -
                  </button>
                </div>
                <div className="relative w-[30%] flex items-center justify-center font-medium text-lg overflow-hidden bg-yellow-">
                  <p id="secondary-count" className="absolute overflow-hidden">
                    {Math.max(cartState.count - 1, 0)}
                  </p>
                  <p
                    id="primary-count"
                    className="relative z-10 overflow-hidden"
                  >
                    {cartState.count}
                  </p>
                </div>
                <div className="w-[30%] flex items-center justify-center">
                  <button
                    //   onClick={() => {setTimeout(() => {incrementCount()}, 100)} }
                    onClick={incrementCount}
                    className="size-full hover:bg-purple-200/40 p-3 rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Cart/Counter */}
              <div className="flex w-[100px] items-center justify-center">
                <div
                  id="cart"
                  className="size-[40px] flex items-center justify-center "
                >
                  🛒
                </div>
                <div className="relative w-10 h-5 flex items-center justify-center font-medium overflow-hidden">
                  <p id="secondary-cart" className="absolute overflow-hidden">
                    {Math.max(cartState.cartCount - 1, 0)}
                  </p>
                  <p
                    id="primary-cart"
                    className="relative z-10 overflow-hidden"
                  >
                    {cartState.cartCount}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Cart;
