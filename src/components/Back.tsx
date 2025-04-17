import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Back() {
  const router = useRouter();
  return (
    <div className="">
      <button
        onClick={() => router.back()}
        className="flex items-center text-xl py-1 pr-2 rounded-md hover:bg-slate-200"
      >
        <ChevronLeft />
        Back
      </button>
    </div>
  );
}

export default Back;
