"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [mouseangleOfRotattion, setMouseangleOfRotattion] = useState(0);

  function mousePos(event: MouseEvent) {
    // get viewport width
    const screenWidth = window.innerWidth;
    // get viewport height
    const screenHeight = window.innerHeight;

    // half the viewport width to get the centre of the horizontal
    const originX = screenWidth / 2;
    // half the viewport height to get the centre of the vertical
    const originY = screenHeight / 2;

    // get the X-position of the mouse relative to the origin coordinates of (originX, originY) - following the cartesian format
    const posX = event.clientX - originX;
    // get the Y-position of the mouse relative to the origin coordinates of (originX, originY) - following the cartesian format
    const posY = originY - event.clientY;

    // use the X-position, Y-position to find the angle inclined to the "vertical"
    let angleOfRotattion = Math.atan(posX / posY) * (180 / Math.PI);

    // handle angle in (neg, neg) quadrant
    if (posX < 0 && posY < 0) {
      angleOfRotattion = 180 + angleOfRotattion;
    }
    // handle angle in (pos, neg) quadrant
    if (posX > 0 && posY < 0) {
      angleOfRotattion = 180 - Math.abs(angleOfRotattion);
    }
    // handle angle in (neg, pos) quadrant
    if (posX < 0 && posY > 0) {
      angleOfRotattion = 360 - Math.abs(angleOfRotattion);
    }

    // apply the calculated "angleOfRotation" to the selected divs
    const divs = document.querySelectorAll<HTMLElement>(".arrow");
    if (divs.length > 0) {
      divs.forEach((element) => {
        element.style.transform = `rotate(${Math.round(angleOfRotattion)}deg)`;
        setMouseangleOfRotattion(Math.round(angleOfRotattion));
      });
    } else {
      setMouseangleOfRotattion(0);
    }
  }

  // controls the input field
  function moveArrow() {
    const divs = document.querySelectorAll<HTMLElement>(".arrow");
    let input = parseInt(
      (document?.getElementById("input") as HTMLInputElement).value
    );
    if (input < 0 || input > 360 || isNaN(input)) {
      input = 0;
    }
    if (divs.length > 0) {
      divs.forEach((el) => {
        el.style.transform = `rotate(${Math.round(input)}deg)`;
        setMouseangleOfRotattion(Math.round(input));
      });
    } else {
      setMouseangleOfRotattion(0);
    }
  }

  return (
    <div
      onMouseMove={mousePos}
      className="h-screen w-full bg-[#15202b] text-white flex items-center justify-center"
    >
      <div className="size-40 bg-stone-500 rounded-full">
        <div className="mt-10 w-[60%] mx-auto h-5 flex items-center justify-between">
          <div className="arrow relative h-full aspect-square rounded-full bg-white">
            <div className="absolute left-[6px] top-1 size-2 bg-black rounded-full"></div>
          </div>
          <div className="arrow relative h-full aspect-square rounded-full bg-white">
            <div className="absolute left-[6px] top-1 size-2 bg-black rounded-full"></div>
          </div>
        </div>
        <div className="relative mt-10 h-8 border border-black rounded-b-full w-[40%] mx-auto bg-black">
          <div className="absolute left-2 w-3 h-3 bg-white"></div>
          <div className="absolute w-3 h-3 right-2 bg-white"></div>
        </div>
      </div>
    </div>
  );
}
