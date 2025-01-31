"use client";

import Link from "next/link";
import { useState } from "react";

function BouncingLid() {
  function openLid() {
    const lid = document.getElementById("lid");
    const frame = document.getElementById("frame");
    lid?.classList.remove("lid-bounce");
    lid?.classList.add("lid-open");
    lid?.classList.add("transition-all");

    setTimeout(() => {
      const cloud = document.getElementById("cloud");
      cloud?.classList.remove("hidden");
      lid?.classList.add("transition-all");
    }, 800);

    setTimeout(() => {
      const window = document.getElementById("window");
      window?.classList.add("scale");
      frame.style.display = "none"
      
    }, 700);
  }

  return (
    <div
      id="lid"
      className="lid-bounce transition-all relative -top-[10px] size-full bg-gray-200 border border-slate-400 rounded-full p-2"
    >
      <div className="relative size-full bg-slate-200 rounded-full shadow flex items-center justify-center">
        <div>
          <button
            onClick={openLid}
            className="px-2 py-1 text-sm rounded-md bg-gradient-to-t from-purple-700 to-blue-700"
          >
            Tap to open
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");

  function submitForm() {
    const inputs = document.querySelectorAll<HTMLInputElement>(".ip");
    if (inputs.length > 0) {
      inputs.forEach((item) => {
        alert(`${item.id}: ${item.value}`);
      });
    }
  }

  return (
    <div className="overflow-hidden h-screen w-full bg-[#15202b] text-white flex items-center justify-center ">
      <div className="size-full">
        <div className="absolute size-full">
          <video className="size-full object-cover" muted autoPlay loop>
            <source src="/cloud.mp4" className="size-full" />
          </video>
        </div>
        <div className="absolute size-full flex items-center justify-center">
          <div
            id="cloud"
            className="hidden transition-all bg-black bg-opacity-10 backdrop-blur-md p-10 rounded-lg "
          >
            <div className="text-center text-sm">
              <p>Find available flights in one go.</p>
              <p className="text-blue-800 font-medium">Easy and Fast</p>
            </div>
            <form className="space-y-2 mt-5">
              <div>
                <div>
                  <label htmlFor="email" className="text-xs">
                    Email address
                  </label>
                </div>
                <div>
                  <input
                    id="Email Address"
                    className="bg-slate-200 w-full rounded-md px-2 py-1 text-slate-500 ip"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="email" className="text-xs">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    onChange={() => setShowPassword(!showPassword)}
                    type="checkbox"
                    className="peer absolute size-3 right-2 top-2"
                  />
                  {showPassword && (
                    <input
                      id="Passowrd"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                      className=" bg-slate-200 w-full rounded-md px-2 py-1 text-slate-500 ip"
                    />
                  )}
                  {!showPassword && (
                    <input
                      id="Passowrd"
                      type="password"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                      className=" bg-slate-200 w-full rounded-md px-2 py-1 text-slate-500 ip "
                    />
                  )}
                </div>
              </div>
              <div className="text-right text-xs text-blue-900 underline">
                <Link href="/">Forgot Password</Link>
              </div>
              <div>
                <button
                  onClick={submitForm}
                  className="w-full py-2 text-xs rounded-full bg-purple-600 hover:bg-purple-900"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        id="window"
        className="overflow-hidden absolute semi  size-full flex items-center justify-center transition-all"
      >
        <div className="absolute size-full flex items-center justify-center">
          <div id="frame" className="relative w-[300px] aspect-[9/14] mx-auto">
            <div className="absolute left-0 size-full border-[2rem] border-slate-200 rounded-full flex items-center justify-center shadow">
              <div className="relative z-10 size-full border-[1rem] border-sky-400 bg-transparent rounded-full overflow-hidden">
                <BouncingLid />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
