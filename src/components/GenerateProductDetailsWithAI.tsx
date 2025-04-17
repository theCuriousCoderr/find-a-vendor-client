import React from "react";

interface GenerateProductDetailsWithAiType {
  analyseImageWithGemini: () => Promise<void>;
  thinkingAI: boolean;
}

function GenerateProductDetailsWithAI({
  analyseImageWithGemini,
  thinkingAI,
}: GenerateProductDetailsWithAiType) {
  return (
    <div className="space-y-5">
      <div className="">
        <button
          type="button"
          onClick={analyseImageWithGemini}
          className="pr-4 border p-1 group flex gap-1 items-center rounded-md "
        >
          <figure
            className={`size-7 flex items-center justify-center rounded-full ${
              thinkingAI && "bg-gradient-to-r"
            } transition-all group-hover:bg-gradient-to-r from-blue-400 to-purple-400`}
          >
            <svg
              focusable="false"
              viewBox="0 -960 960 960"
              height="20"
              width="20"
              className={`${
                thinkingAI && "AI_bubble"
              } group-hover:fill-white group-hover:scale-75 duration-[1000ms] fill-slate-700 group-hover:rotate-180 transition-all`}
            >
              <path d="M480-80q2,0 2-2q0-82 31-154t85-126t126-85t154-31q2,0 2-2t-2-2q-82,0-154-31T598-598T513-724T482-878q0-2-2-2t-2,2q0,82-31,154T362-598T236-513T82-482q-2,0-2,2t2,2q82,0 154,31t126,85t85,126T478-82q0,2 2,2Z"></path>
            </svg>
          </figure>
          <p
            className={`${
              thinkingAI && "animate-pulse"
            } font-medium text-slate-500 text-sm`}
          >
            {thinkingAI ? "Analyzing ..." : "Generate product details with AI"}
          </p>
        </button>
      </div>

      <div className="relative flex items-center">
        <hr className="w-full" />
        <p className="absolute w-full flex justify-center text-sm text-slate-400">
          <span className="bg-white px-2">OR</span>
        </p>
      </div>
    </div>
  );
}

export default GenerateProductDetailsWithAI;
