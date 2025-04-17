import type { Metadata } from "next";
import "./globals.css";

import ReduxWrapper from "@/components/ReduxWrapper";
import ClientWrapper from "@/components/ClientWrapper";
import STARTUP_NAME from "@/static-data/startupname";

export const metadata: Metadata = {
  title: `${STARTUP_NAME} | Marketplace for Online Vendors and Customers`,
  description: `${STARTUP_NAME} connects vendors and customers in a dynamic marketplace where users can discover products, compare vendors, and make informed purchasing decisions.`,
  keywords:
    "vendor marketplace, vendors, customers, marketplace platform, online shopping, product discovery, e-commerce",
  authors: [
    {
      name: "Olalekan Oladimeji",
      url: "https://olalekan-oladimeji-portfolio.vercel.app/",
    },
  ],

  // Open Graph Metadata (for social media sharing)
  openGraph: {
    title: `${STARTUP_NAME} | Marketplace for Online Vendors and Customers`,
    description: `Connect with vendors and discover the best products in the ${STARTUP_NAME} marketplace. Shop, compare, and choose the right vendor for your needs.`,
    url: "https://olalekan-oladimeji-portfolio.vercel.app/", // Replace with your actual URL
    siteName: STARTUP_NAME,
    images: [
      {
        url: "https://fastly.picsum.photos/id/433/4752/3168.jpg?hmac=Og-twcmaH_j-JNExl5FsJk1pFA7o3-F0qeOblQiJm4s", // Replace with an actual image URL
        width: 1200,
        height: 630,
        alt: `${STARTUP_NAME} Marketplace`,
      },
    ],
    type: "website",
  },

  // Twitter Card Metadata
  // twitter: {
  //   card: "summary_large_image",
  //   title: "VendorSphere | Marketplace for Vendors and Customers",
  //   description: "VendorSphere connects customers with a wide range of vendors, helping you discover products and make better purchasing decisions.",
  //   image: "https://vendorsphere.com/twitter-card.jpg", // Replace with an actual image URL
  //   site: "@VendorSphere", // Replace with your Twitter handle
  // },

  // Favicon
  icons: {
    icon: "/favicon.ico", // Replace with your favicon location
  },

  // Additional meta for robots and social sharing
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-[1300px] mx-auto bg-slate-50">
        {/* redux wrapper to handle global state management */}
        <ReduxWrapper>
          {/* client wrapper to handle top-level `use client` stateful codes */}
          <ClientWrapper>{children}</ClientWrapper>
        </ReduxWrapper>
      </body>
    </html>
  );
}
