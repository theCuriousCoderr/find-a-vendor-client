"use client";

import React from "react";
import { motion } from "framer-motion";

// function page() {
//   return (
//     <div className="fixed top-0 left-0 h-screen w-full z-50 bg-white">
//       <div className="absolute top-0 left-0 h-screen w-full z-[100] bg-gradient-to-br from-gray-800 from-[20%] to-black/95">
//         <div className="absolute size-full flex items-center justify-center font-black text-[50vh] bg-gradient-to-r from-gray-700/60 from-[10%] to-black bg-clip-text scale-y-150">
//           <p className="text-transparent">NIKE</p>
//         </div>
//         <div className="absolute -bottom-[22rem] -left-48 -rotate-[25deg] w-[60vw] aspect-square bg-white/40 flex items-end">
//           <svg
//             viewBox="0 0 192.76 192.76"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             transform="rotate(0)"
//             stroke-width="0.00192756"
//           >
//             <defs>
//               <linearGradient
//                 id="gradientFill"
//                 x1="0%"
//                 y1="0%"
//                 x2="100%"
//                 y2="0%"
//               >
//                 <stop
//                   offset="0%"
//                   stopColor="#c084fc"
//                   className="bg-purple-400"
//                 />{" "}
//                 {/* Light Purple */}
//                 <stop
//                   offset="80%"
//                   stopColor="#ec4899"
//                   className="bg-pink-500"
//                 />{" "}
//                 {/* Light Pink */}
//                 <stop
//                   offset="100%"
//                   stopColor="#fcd34d"
//                   className="bg-amber-300"
//                 />{" "}
//                 {/* Orange */}
//               </linearGradient>

//               {/* Mask to reveal the checkmark */}
//               <mask id="reveal-mask">
//                 <motion.rect
//                   initial={{ width: 0 }}
//                   animate={{ width: 200 }} // Large enough to cover the logo
//                   transition={{
//                     duration: 1,
//                     ease: "circIn",
//                   }}
//                   x="-20"
//                   y="-20"
//                   height="200"
//                   fill="white"
//                   className="border"
//                 />
//               </mask>
//             </defs>
//             <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//             <g
//               id="SVGRepo_tracerCarrier"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke="#ff4d4d"
//               stroke-width="3.469608"
//             ></g>
//             <g id="SVGRepo_iconCarrier" mask="url(#reveal-mask)">
//               <g fillRule="evenodd" clipRule="evenodd">
//                 <path
//                   fill=""
//                   d="M0 0h192.756v192.756H0V0z"
//                   className="border"
//                 ></path>
//                 <path
//                   className="scale-105"
//                   id="mark"
//                   fill="url(#gradientFill)"
//                   d="M42.741 71.477c-9.881 11.604-19.355 25.994-19.45 36.75-.037 4.047 1.255 7.58 4.354 10.256 4.46 3.854 9.374 5.213 14.264 5.221 7.146.01 14.242-2.873 19.798-5.096 9.357-3.742 112.79-48.659 112.79-48.659.998-.5.811-1.123-.438-.812-.504.126-112.603 30.505-112.603 30.505a24.771 24.771 0 0 1-6.524.934c-8.615.051-16.281-4.731-16.219-14.808.024-3.943 1.231-8.698 4.028-14.291z"
//                 />
//               </g>
//             </g>
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }


function page() {
  return (
    <div className="fixed top-0 left-0 h-screen w-full z-50 bg-white">
      <div className="absolute top-0 left-0 h-screen w-full z-[100] bg-gradient-to-br from-gray-800 from-[20%] to-black/95">
        <div className="absolute size-full flex items-center justify-center font-black text-[50vh] bg-gradient-to-r from-gray-700/60 from-[10%] to-black bg-clip-text scale-y-150">
          <p className="text-transparent">NIKE</p>
        </div>
        <div className="absolute -bottom-[22rem] -left-48 -rotate-[25deg] w-[60vw] aspect-square bg-white/40 flex items-end">
          <svg
            viewBox="0 0 192.76 192.76"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            transform="rotate(0)"
            stroke-width="0.00192756"
          >
            <defs>
              <linearGradient
                id="gradientFill"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="#c084fc"
                  className="bg-purple-400"
                />{" "}
                {/* Light Purple */}
                <stop
                  offset="80%"
                  stopColor="#ec4899"
                  className="bg-pink-500"
                />{" "}
                {/* Light Pink */}
                <stop
                  offset="100%"
                  stopColor="#fcd34d"
                  className="bg-amber-300"
                />{" "}
                {/* Orange */}
              </linearGradient>

              {/* Mask to reveal the checkmark */}
              <mask id="reveal-mask">
                <motion.rect
                  initial={{ width: 0 }}
                  animate={{ width: 200 }} // Large enough to cover the logo
                  transition={{
                    duration: 1,
                    ease: "circIn",
                  }}
                  x="-20"
                  y="-20"
                  height="200"
                  fill="white"
                  className="border"
                />
              </mask>
            </defs>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="#ff4d4d"
              stroke-width="3.469608"
            ></g>
            <g id="SVGRepo_iconCarrier" mask="url(#reveal-mask)">
              <g fillRule="evenodd" clipRule="evenodd">
                <path
                  fill=""
                  d="M0 0h192.756v192.756H0V0z"
                  className="border"
                ></path>
                <path
                  className="scale-105"
                  id="mark"
                  fill="url(#gradientFill)"
                  d="M42.741 71.477c-9.881 11.604-19.355 25.994-19.45 36.75-.037 4.047 1.255 7.58 4.354 10.256 4.46 3.854 9.374 5.213 14.264 5.221 7.146.01 14.242-2.873 19.798-5.096 9.357-3.742 112.79-48.659 112.79-48.659.998-.5.811-1.123-.438-.812-.504.126-112.603 30.505-112.603 30.505a24.771 24.771 0 0 1-6.524.934c-8.615.051-16.281-4.731-16.219-14.808.024-3.943 1.231-8.698 4.028-14.291z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
export default page;
