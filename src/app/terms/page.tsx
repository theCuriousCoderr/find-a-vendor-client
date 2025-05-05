import sizes from "@/utils/imageSizes";
import Image from "next/image";
import React from "react";
import FormatContentList from "@/components/FormatContentList";

const TERMS = [
  {
    title: "Platform Role",
    type: "text",
    content:
      "Find-A-Vendor acts as a directory and connection service between customers and vendors. We do not handle or interfere in transactions or disputes. All payments, deliveries, and communications occur directly between the buyer and the vendor.",
  },
  {
    title: "Vendor Responsibilities",
    type: "text",
    content:
      "Vendors are solely responsible for the accuracy of their listings, the quality of their products, and the fulfillment of customer expectations. Misrepresentation may result in suspension or removal from the platform.",
  },
  {
    title: "Customer Responsibilities",
    type: "text",
    content:
      "Customers agree to interact respectfully with vendors and to ensure that all payments and agreements are clear and mutually understood.",
  },
  {
    title: "Prohibited Conduct",
    type: "list",
    content: [
      "You may not use Find-A-Vendor to:",
      "Mislead or defraud users",
      "Sell illegal or prohibited goods",
      "Violate intellectual property rights",
      "Post spam or malicious content",
    ],
  },
  {
    title: "Account Termination",
    type: "text",
    content:
      "We reserve the right to terminate or suspend any account at our discretion if it violates our policies or causes harm to the community.",
  },
  {
    title: "Dispute Resolution",
    type: "text",
    content:
      "Find-A-Vendor does not mediate disputes. However, we may review serious complaints to consider removing a vendor or customer from the platform.",
  },
  {
    title: "Updates to These Terms",
    type: "text",
    content:
      "We may update these Terms from time to time. Continued use of the platform after changes are made signifies your agreement to the revised terms.",
  },
];

function TermsPage() {
  return (
    <div className="max-w-[1300px] mx-auto mt-20 xs:max-md:mt-2 space-y-32">
      <div className="flex xs:max-md:flex-col xs:max-md:gap-10 w-full justify-between">
        <div className="w-[40%] xs:max-md:w-[90%] xs:max-md:mx-auto space-y-5 xs:max-md:space-y-3">
          <p className="inline-block text-blue-900 bg-blue-500/5 p-3 rounded-md text-3xl xs:max-md:text-xl font-bold ml-5 xs:max-md:ml-0">
            Terms of Service
          </p>
          <h1 className="text-5xl xs:max-md:text-3xl font-bold leading-[4rem]">
            Welcome to Find-A-Vendor
          </h1>
          <p className="xs:max-md:mt-5 font-light text-xl xs:max-md:text-lg w-[80%] xs:max-md:w-full xs:max-md:text-left">
            These Terms of Service ("Terms") govern your access to and use of
            the Find-A-Vendor platform, operated to connect customers with
            independent vendors. By using our services, you agree to be bound by
            these Terms.
          </p>
          <p className="text-blue-900 font-medium">
          The sole purpose of a Terms of Service (ToS) is to define the legal agreement between a service provider (like a website or app) and its users.
          </p>
        </div>

        <div className="relative p-3 xs:max-md:p-2 bg-white rounded-md w-[50%] xs:max-md:mt- xs:max-md:w-[95%] xs:max-md:max-w-full xs:max-md:mx-auto aspect-square">
          <figure className="relative size-full p-3 rounded-md  ">
            <Image
              fill={true}
              src="/banners/terms_banner.avif"
              alt="terms of service page banner"
              sizes={sizes}
              priority={true}
              className="object-cover rounded-md"
            />
          </figure>
        </div>
      </div>

      <section className="xs:max-md:w-[90%] xs:max-md:mx-auto">
        <ol className="list-decimal space-y-10 xs:max-md:pl-5">
          {TERMS.map((term) => {
            return (
              <li key={term.title} className="">
                <p className="font-bold text-xl text-slate-600">{term.title}</p>
                <div className="font-light text-xl xs:max-md:text-lg text-slate-700">
                  {term.type === "text" && term.content}
                  {term.type === "list" && (
                    <FormatContentList content={term.content as string[]} />
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

export default TermsPage;
