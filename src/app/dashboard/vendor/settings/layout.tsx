"use client";

import Link from "next/link";
import React, { useState } from "react";

const settingsTab = [
 
  {
    label: "Profile",
    
    url: "profile",
  },
  {
    label: "Account",
   
    url: "account",
  },
];

function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("Profile");
  return (
    <div className="space-y-5">
      <p className="text-red-500 font-medium text-sm text-center mb-2">All changes made will take effect when you leave this <q>Settings</q> page.</p>
      <ul className="flex">
        {settingsTab.map((tab) => {
          return (
            <li
              onClick={() => setActiveTab(tab.label)}
              key={tab.label}
              className={`${
                activeTab === tab.label
                  ? "bg-black text-slate-200"
                  : "bg-transparent hover:text-blue-500"
              } group w-24 h-10 rounded-md`}
            >
              <Link
                href={tab.url}
                className=" size-full flex items-center justify-center text-center"
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
        
      </ul>
      <section>{children}</section>
    </div>
  );
}

export default SettingsLayout;
