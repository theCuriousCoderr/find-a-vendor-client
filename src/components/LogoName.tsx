import STARTUP_NAME from "@/static-data/startupname";
import { LogoSize } from "@/types";
import { Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

function LogoName({ clx }: LogoSize) {
  return (
    <Link href="/" className={`relative text-black hover:text-blue-900 xs:max-md:hover:text-black ${clx}`}>
      <span className="absolute -right-2 top-1 -z-10 ">
        <Globe size="10" />
      </span>
      {STARTUP_NAME}
    </Link>
  );
}

export default LogoName;
