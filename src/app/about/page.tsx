import sizes from "@/utils/imageSizes";
import Image from "next/image";
import React from "react";

function AboutPage() {
  return (
    <div className="max-w-[1300px] mx-auto mt-20 xs:max-md:mt-2 space-y-32">
      <div className="flex xs:max-md:flex-col xs:max-md:gap-10 w-full justify-between">
        <div className="w-[40%] xs:max-md:w-[90%] xs:max-md:mx-auto space-y-5 xs:max-md:space-y-3">
          <p className="inline-block text-blue-900 bg-blue-500/5 p-3 rounded-md text-3xl xs:max-md:text-xl font-bold ml-5 xs:max-md:ml-0">
            Our Mission
          </p>
          <h1 className="text-5xl xs:max-md:text-3xl font-bold leading-[4rem]">
            To help everyday, small-to-medium sized online vendors grow by
            making it easy for customers to find and connect with them.
          </h1>
          <p className="text-blue-900 font-medium">
            ... because not every great vendor is on Jumia. And that’s the
            point.
          </p>
        </div>

        <div className="relative p-3 xs:max-md:p-2 bg-white rounded-md w-[50%] xs:max-md:mt- xs:max-md:w-[95%] xs:max-md:max-w-full xs:max-md:mx-auto aspect-square">
          <figure className="relative size-full p-3 rounded-md  ">
            <Image
              fill={true}
              src="/banners/about_banner.avif"
              alt="about page banner"
              sizes={sizes}
              priority={true}
              className="object-cover rounded-md"
            />
          </figure>
        </div>
      </div>

      {/* why ? */}
      <section className="xs:max-md:w-[90%] xs:max-md:mx-auto">
        {/* desktop */}
        <h2 className="xs:max-md:hidden text-[3rem] xs:max-md:text-3xl font-bold text-center text-blue-900">
          {" "}
          - Cut the Middleman. Find Who You Need, Faster -
        </h2>
        {/* mobile */}
        <h2 className="hidden xs:max-md:block text-[3rem] xs:max-md:text-3xl font-bold text-blue-900">
          {" "}
          - Cut the Middleman.
          <br /> Find Who You Need, Faster -
        </h2>
        {/* desktop */}
        <p className="xs:max-md:hidden xs:max-md:mt-5 font-light text-xl xs:max-md:text-lg w-[80%] text-center xs:max-md:text-left xs:max-md:w-full mx-auto">
          {" "}
          Tired of having to know someone who knows someone who maybe knows a
          vendor—just to make an inquiry or get access to a product? Yeah, we
          get it. It’s exhausting. At Find-A-Vendor, we’re here to simplify that
          process. No more unnecessary back-and-forths or long referral chains.
          We give you a direct line to the vendors you’re looking for, so you
          can get what you need—faster and easier. Referrals are great, but only
          if the person you ask actually knows someone. If they don’t? The cycle
          just keeps going.
          <br /> Find-A-Vendor is your go-to-first option; your shortcut to
          reliable vendors without the middleman.
        </p>
        {/* mobile */}
        <p className="hidden xs:max-md:block xs:max-md:mt-5 font-light text-xl xs:max-md:text-lg w-[80%] text-center xs:max-md:text-left xs:max-md:w-full mx-auto">
          {" "}
          Tired of having to know someone who knows someone who maybe knows a
          vendor—just to make an inquiry or get access to a product? Yeah, we
          get it. It’s exhausting.
          <br />
          <br /> At Find-A-Vendor, we’re here to simplify that process. No more
          unnecessary back-and-forths or long referral chains. We give you a
          direct line to the vendors you’re looking for, so you can get what you
          need—faster and easier.
          <br />
          <br /> Referrals are great, but only if the person you ask actually
          knows someone. If they don’t? The cycle just keeps going.
          <br /> Find-A-Vendor is your go-to-first option; your shortcut to
          reliable vendors without the middleman.
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
