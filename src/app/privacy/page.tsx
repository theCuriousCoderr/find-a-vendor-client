import FormatContentList from "@/components/FormatContentList";
import sizes from "@/utils/imageSizes";
import Image from "next/image";
import React from "react";

const PRIVACY_POLICY = [
  {
    title: "Information We Collect",
    type: "list",
    content: [
      "We do not collect payment or banking information, as all transactions happen off-platform. We collect limited personal information such as:",
      "Name",
      "Contact details (email, phone)",
      "Business information (for vendors)",
    ],
  },
  {
    title: "How We Use Your Information",
    type: "list",
    content: [
      "We use your information to:",
      "Create and manage your account",
      "Improve platform experience",
      "Communicate updates and platform-related notices",
    ],
  },
  //   {
  //     title: "Data Sharing",
  //     type: "list",
  //     content: [
  //       "We do not sell or rent your data. We only share it:",
  //       "With your consent",
  //       "If required by law",
  //       "With service providers strictly for internal operations",]
  //   },
  {
    title: "Cookies & Tracking",
    type: "text",
    content:
      "We use cookies to understand site usage, improve performance, and provide relevant suggestions.",
  },
  {
    title: "Your Rights",
    type: "list",
    content: [
      "You have the right to:",
      "Access or update your personal info",
      "Request deletion of your account",
      "Opt out of marketing communications",
    ],
  },
  {
    title: "Data Retention",
    type: "text",
    content:
      "We retain your data only as long as needed for the purposes outlined in this policy.",
  },
];

function PrivacyPage() {
  return (
    <div className="max-w-[1300px] mx-auto mt-20 xs:max-md:mt-2 space-y-32">
      <div className="flex xs:max-md:flex-col xs:max-md:gap-10 w-full justify-between">
        <div className="w-[40%] xs:max-md:w-[90%] xs:max-md:mx-auto space-y-5 xs:max-md:space-y-3">
          <p className="inline-block text-blue-900 bg-blue-500/5 p-3 rounded-md text-3xl xs:max-md:text-xl font-bold ml-5 xs:max-md:ml-0">
            Privacy Policy
          </p>
          <h1 className="text-5xl xs:max-md:text-3xl font-bold leading-[4rem]">
            Your Privacy Matters
          </h1>
          <p className="xs:max-md:mt-5 font-light text-xl xs:max-md:text-lg w-[80%] xs:max-md:w-full xs:max-md:text-left">
            At Find-A-Vendor, we’re committed to protecting your privacy and
            being transparent about how we use your information.
          </p>
          <p className="text-blue-900 font-medium">
            The sole purpose of a Privacy Policy is to inform users about how
            their personal data is collected, used, stored, and protected when
            they interact with a website, app, or service.
          </p>
        </div>

        <div className="relative p-3 xs:max-md:p-2 bg-white rounded-md w-[50%] xs:max-md:mt- xs:max-md:w-[95%] xs:max-md:max-w-full xs:max-md:mx-auto aspect-square">
          <figure className="relative size-full p-3 rounded-md  ">
            <Image
              fill={true}
              src="/banners/privacy_banner.avif"
              alt="privacy page banner"
              sizes={sizes}
              priority={true}
              className="object-cover rounded-md"
            />
          </figure>
        </div>
      </div>

      <section className="xs:max-md:w-[90%] xs:max-md:mx-auto">
        <ol className="list-decimal space-y-10 xs:max-md:pl-5">
          {PRIVACY_POLICY.map((policy) => {
            return (
              <li key={policy.title} className="">
                <p className="font-bold text-xl text-slate-600">
                  {policy.title}
                </p>
                <div className="font-light text-xl xs:max-md:text-lg text-slate-700">
                  {policy.type === "text" && policy.content}
                  {policy.type === "list" && (
                    <FormatContentList content={policy.content as string[]} />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

export default PrivacyPage;
