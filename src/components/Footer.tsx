import React from "react";
import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import LogoName from "@/components/LogoName";
import STARTUP_NAME from "@/static-data/startupname";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  const hide = pathname.includes("/login") || pathname.includes("/signup");

  if (hide) {
    return <div></div>;
  }
  return (
    <footer className="relative bg-white w-full py-20 xs:max-md:pb-5 mt-20">
      <div className="absolute h-10 w-full blur-md bg-[#f2f8f4] -top-5"></div>
      <div className="max-w-[1300px] mx-auto xs:max-md:w-[90%]">
        <div className="flex xs:max-md:flex-col xs:max-md:gap-20 justify-between">
          <div className="flex xs:max-md:flex-col gap-40 xs:max-md:gap-10 w-[60%] xs:max-md:w-full">
            {/* logo */}
            <div>
              <LogoName clx="text-2xl font-medium" />
            </div>
            <div className="flex gap-10">
              {/* company */}
              <div>
                <p className="font-medium mb-3">Company</p>
                <nav>
                  <ul>
                    <li
                      className={`${
                        pathname === "/about" && "text-blue-600"
                      } font-extralight hover:text-blue-600`}
                    >
                      <Link href="/about">About</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* legal */}
              <div>
                <p className="font-medium mb-3">Legal</p>
                <nav>
                  <ul className="space-y-2">
                    <li
                      className={`${
                        pathname === "/terms" && "text-blue-600"
                      } font-extralight hover:text-blue-600`}
                    >
                      <Link href="/terms">Terms</Link>
                    </li>
                    <li
                      className={`${
                        pathname === "/privacy" && "text-blue-600"
                      } font-extralight hover:text-blue-600`}
                    >
                      <Link href="/privacy">Privacy</Link>
                    </li>
                    <li
                      className={`${
                        pathname === "/security" && "text-blue-600"
                      } font-extralight hover:text-blue-600`}
                    >
                      <Link href="/security">Security</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {/* socials */}
          <div className="font-light text-right xs:max-md:text-left space-y-2">
            <div className="flex gap-5 justify-end xs:max-md:justify-start">
              <div className=" hover:text-blue-600 transition-all">
                <Link target="_blank" href="https://x.com/elijahdimeji549">
                  <Twitter />
                </Link>
              </div>
              <div className=" hover:text-blue-600 transition-all">
                <Link target="_blank" href="https://x.com/elijahdimeji549">
                  <Instagram />
                </Link>
              </div>
            </div>
            <p className="">Ibadan, Nigeria</p>
            <p className="">elijahdimeji549@gmail.com</p>
            <p className="">
              <Link
                target="_blank"
                href="https://wa.me/+2347037887923"
                className="hover:text-blue-600 transition-all"
              >
                +2347037887923
              </Link>
            </p>
          </div>
        </div>
        <p className="text-slate-500 text-sm xs:max-md:mt-10">
          <span>&#169;</span> {new Date().getFullYear()} {STARTUP_NAME}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
