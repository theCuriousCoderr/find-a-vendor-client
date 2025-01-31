"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="p-5">
      <h1 className="text-xl font-medium">
        Here are a selected few of my projects that showcase sample code
        implementations and interactive animations:
      </h1>

      <ol className="list-decimal list-inside space-y-3">
        <li className="hover:underline hover:text-blue-500">
          <Link href="/snapchat">Snapchat</Link>
          <span className="ml-2 px-2 py-1 bg-blue-500 rounded-full text-white text-xs">
            Feature-Implementation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/aeroplane-lid">Aeroplane</Link>
          <span className="ml-2 px-2 py-1 bg-green-500 rounded-full text-white text-xs">
            Animation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/mouse-arrow-toggle">Arrow Mouse-Follow</Link>
          <span className="ml-2 px-2 py-1 bg-green-500 rounded-full text-white text-xs">
            Animation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/mouse-eyes-follow">Eyes Mouse-Follow</Link>
          <span className="ml-2 px-2 py-1 bg-green-500 rounded-full text-white text-xs">
            Animation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/whatsapp-react">WhatsApp React</Link>
          <span className="ml-2 px-2 py-1 bg-blue-500 rounded-full text-white text-xs">
            Feature-Implementation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/aeroplane-trail">Aeroplane trail</Link>
          <span className="ml-2 px-2 py-1 bg-green-500 rounded-full text-white text-xs">
            Animation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/window-resize">Window Resize</Link>
          <span className="ml-2 px-2 py-1 bg-blue-500 rounded-full text-white text-xs">
            Feature-Implementation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/button-resize">Button Resize</Link>
          <span className="ml-2 px-2 py-1 bg-green-500 rounded-full text-white text-xs">
            Animation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/subby">Subby</Link>
          <span className="ml-2 px-2 py-1 bg-green-500 rounded-full text-white text-xs">
            Animation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/saber">Light-Saber Text</Link>
          <span className="ml-2 px-2 py-1 bg-green-500 rounded-full text-white text-xs">
            Animation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/snap">Card Snap</Link>
          <span className="ml-2 px-2 py-1 bg-green-500 rounded-full text-white text-xs">
            Animation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/carousel">Carousel</Link>
          <span className="ml-2 px-2 py-1 bg-green-500 rounded-full text-white text-xs">
            Animation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/add-to-cart">Cart</Link>
          <span className="ml-2 px-2 py-1 bg-green-500 rounded-full text-white text-xs">
            Animation Based
          </span>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/jest">Testing</Link>
          <span className="ml-2 px-2 py-1 bg-green-500 rounded-full text-white text-xs">
            Feature Based
          </span>
        </li>

      </ol>
    </main>
  );
}
