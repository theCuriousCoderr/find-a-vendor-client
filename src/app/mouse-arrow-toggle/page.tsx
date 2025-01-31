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
      // console.log(angleOfRotattion)
      angleOfRotattion = Math.abs(angleOfRotattion) >= 0 ? 360 + Math.abs(angleOfRotattion) : 360 - Math.abs(angleOfRotattion)
      // angleOfRotattion = 360 - Math.abs(angleOfRotattion)
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
      className="h-screen w-full bg-[#15202b] text-white"
    >
      <div className="absolute size-full flex items-center justify-center">
        <div className="absolute size-full flex flex-col items-center justify-center -mt-40 mr-7 text-xl font-bold text-orange-600">
          <div>
            <input
              id="input"
              onChange={moveArrow}
              placeholder="Enter a number from 0 - 360"
              className="text-sm font-normal p-2 placeholder:text-[12px] rounded-sm bg-slate-200"
            />
          </div>
          <p>{mouseangleOfRotattion}°</p>
        </div>

        

        <figure
          className={`arrow relative size-10 bg-red-50 rounded-[50%] origin-center flex items-center justify-center transition-all duration-200  `}
        >
          <Image fill={true} src="/arrow.png" alt="Arrow" />
        </figure>
      </div>
    </div>
  );
}
