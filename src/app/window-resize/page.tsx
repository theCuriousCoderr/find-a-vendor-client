"use client";

import { useEffect, useState } from "react";

// started 1:40 AM
export default function WindowResize() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const currentWidth = window.innerWidth;
    setWindowWidth(currentWidth);
  }, []);
  
  function handleResize(e: any) {
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    const bar = document.getElementById("bar");
    const mouseXPosition = e.clientX;
    if (mouseXPosition === 0) {
      return;
    }
    const mouseXPositionInPercentage = Math.round(
      (mouseXPosition / windowWidth) * 100
    );
    const reminder = 100 - mouseXPositionInPercentage;

    if (left && right && bar) {
      left.style.width = `${mouseXPositionInPercentage.toString()}%`;
      right.style.width = `${reminder.toString()}%`;
      bar.style.left = `${mouseXPositionInPercentage.toString()}%`;
      bar.style.cursor = "grabbing";
    }
  }

  function dragEnd() {
    const bar = document.getElementById("bar");
    if (bar) {
        bar.style.cursor = "ew-resize";
    }
  }

  function addCursorType() {
    const bar = document.getElementById("bar");
    if (bar) {
        bar.style.cursor = "grabbing";
    }
  }

  return (
    <main className="relative h-screen w-full flex">
      <div id="left" className={`w-[30%] h-full bg-green-500 p-10 space-y-5`}>
        <h1 className="text-4xl">LEFT SECTION OF THE SCREEN:</h1>
        <p className="text-2xl">
          Amid the chaos of the bustling city streets, where the sound of
          honking horns blended with the chatter of countless voices and the
          faint melody of a distant street performer, she stood motionless, lost
          in thought, her mind weaving through a labyrinth of memories and
          dreams, wondering if the choices she had made were leading her closer
          to the life she had envisioned or merely farther away from the person
          she once was.
        </p>
      </div>
      <div
        onDrag={(e) => {
          e.preventDefault();
          handleResize(e);
        }}
        onDragEnd={dragEnd}
        onMouseDown={addCursorType}
        id="bar"
        className={`left-[30%] absolute h-full w-[1%] bg-black hover:cursor-ew-resize`}
      ></div>
      <div id="right" className={`w-[70%] h-full bg-red-500 p-10 space-y-5`}>
        <h1 className="text-4xl">RIGHT SECTION OF THE SCREEN:</h1>
        <p className="text-2xl">
          Under the vast expanse of a starlit sky, where the cool night breeze
          carried the scent of blooming jasmine and the faint whispers of
          distant waves crashing against the shore, he walked along the winding
          path, each step accompanied by the quiet crunch of gravel beneath his
          feet, as his thoughts wandered between the bittersweet memories of the
          past and the uncertain promises of the future.
        </p>
      </div>
    </main>
  );
}
