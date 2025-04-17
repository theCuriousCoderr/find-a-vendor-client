import React from "react";

type ColorVariants =
  | "border-t-white"
  | "border-t-blue-500"
  | "border-t-red-500";
  
function Spinner({ color = "border-t-white" }: { color?: ColorVariants }) {
  return (
    <div
      className={`size-5 mx-auto rounded-full border-2 border-transparent ${color} animate-spin`}
    ></div>
  );
}

export default Spinner;
