import { ButtonPropsType } from "@/types";
import React from "react";
import { motion } from "motion/react";
import Spinner from "./Spinner";

function Button({
  animate = false,
  text,
  bgColor,
  color,
  onClick,
  loading,
}: ButtonPropsType) {
  const btnStyles =
    "hover:bg-opacity-80 xs:max-md:hover:bg-opacity-100 disabled:bg-opacity-80 size-full px-4 py-2 rounded-md border-black disabled:border-white";

  return (
    <div className="w-full flex">
      <div className="w-full">
        {animate ? (
          <motion.button
            onClick={() => {
              onClick && onClick();
            }}
            disabled={loading}
            initial={{ width: "100%" }}
            whileHover={{ width: ["110%", "90%", "105%", "95%", "100%"] }}
            className={`${bgColor} ${color} ${btnStyles} ${
              loading && "bg-slate-300"
            } `}
          >
            {loading ? <Spinner /> : text}
          </motion.button>
        ) : (
          <button
            onClick={() => {
              onClick && onClick();
            }}
            disabled={loading}
            className={`${bgColor} ${color} ${btnStyles} ${
              loading && "bg-slate-300"
            }`}
          >
            {loading ? <Spinner /> : text}
          </button>
        )}
      </div>
    </div>
  );
}

export default Button;
