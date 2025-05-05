import sizes from "@/utils/imageSizes";
import Image from "next/image";
import React from "react";
import FormatContentList from "@/components/FormatContentList";

const SECURITY_POLICY = [
  {
    title: "Platform Protection",
    type: "list",
    content: [
      "We use modern security practices to protect data, including:",
      "HTTPS encryption for all site traffic",
      "Regular codebase vulnerability scans",
    ],
  },
  {
    title: "Account Security",
    type: "list",
    content: [
      "",
      "Passwords are encrypted using strong hashing.",
      "We encourage strong, unique passwords.",
    ],
  },
  {
    title: "No Payment Data Collected",
    type: "text",
    content:
      "As Find-A-Vendor does not process financial transactions, we never store or request your banking details. All transactions are handled directly between the vendor and customer.",
  },
  {
    title: "Reporting a Security Concern",
    type: "text",
    content:
      "If you notice suspicious activity or believe your account has been compromised, report it immediately.",
  },
  {
    title: "Vendor & Customer Awareness",
    type: "list",
    content: [
      "We provide tips and reminders to help users stay safe, such as:",
      "Verifying vendor authenticity before payment",
      "Avoiding unsolicited links or files",
      "Communicating clearly and keeping records",
    ],
  },
  {
    title: "Continuous Improvement",
    type: "text",
    content:
      "Our security practices evolve with emerging threats and technology. We regularly review and update our protections to stay one step ahead.",
  },
];

function SecurityPage() {
  return (
    <div className="max-w-[1300px] mx-auto mt-20 xs:max-md:mt-2 space-y-32">
      <div className="flex xs:max-md:flex-col xs:max-md:gap-10 w-full justify-between">
        <div className="w-[40%] xs:max-md:w-[90%] xs:max-md:mx-auto space-y-5 xs:max-md:space-y-3">
          <p className="inline-block text-blue-900 bg-blue-500/5 p-3 rounded-md text-3xl xs:max-md:text-xl font-bold ml-5 xs:max-md:ml-0">
            Security Policy
          </p>
          <h1 className="text-5xl xs:max-md:text-3xl font-bold leading-[4rem]">
            Security Is a Shared Responsibility
          </h1>
          <p className="xs:max-md:mt-5 font-light text-xl xs:max-md:text-lg w-[80%] xs:max-md:w-full xs:max-md:text-left">
            At Find-A-Vendor, your trust is our priority. While we do not handle
            payments directly, we take your data security seriously and strive
            to protect both vendors and customers on our platform.
          </p>
          <p className="text-blue-900 font-medium">
            The sole purpose of a Security Policy is to clearly define how an
            organization protects its data, systems, and users from unauthorized
            access, breaches, and other security threats.
          </p>
        </div>

        <div className="relative p-3 xs:max-md:p-2 bg-white rounded-md w-[50%] xs:max-md:mt- xs:max-md:w-[95%] xs:max-md:max-w-full xs:max-md:mx-auto aspect-square">
          <figure className="relative size-full p-3 rounded-md  ">
            <Image
              fill={true}
              src="/banners/security_banner.png"
              alt="security page banner"
              sizes={sizes}
              priority={true}
              className="object-cover rounded-md"
            />
          </figure>
        </div>
      </div>

      <section className="xs:max-md:w-[90%] xs:max-md:mx-auto">
        <ol className="list-decimal space-y-10 xs:max-md:pl-5">
          {SECURITY_POLICY.map((policy) => {
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

export default SecurityPage;
