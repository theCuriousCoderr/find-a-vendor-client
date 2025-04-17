import React from "react";

function LoadMore() {
  return (
    <div className="fixed w-full flex justify-center z-20 bottom-5 left-0">
      <p className="py-2 px-4 rounded-full bg-black/50 text-white backdrop-blur-sm border border-slate-500">
        Loading More ...{" "}
      </p>
    </div>
  );
}

export default LoadMore;
