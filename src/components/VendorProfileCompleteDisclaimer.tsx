import React from "react";
import Button from "./Button";
import Link from "next/link";

function VendorProfileCompleteDisclaimer({
  setOpenDisclaimer,
}: {
  setOpenDisclaimer: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className=" bg-pink-100 w-full fixed z-40 top-0 left-0 p-5 xs:max-md:p-5">
      <div className="w-[80%] xs:max-md:w-full mx-auto">
        <p className=" xs:max-md:text- text-red-500 font-medium">
          Dear Vendor,
          <br /> To ensure your store is visible to customers, please complete
          your profile in full. Incomplete profiles will result in your store
          not being displayed, limiting customer access.
          <br />
          Don&apos;t miss out on potential sales — finish your profile today!
        </p>
        <div className="flex justify-end mt-5 gap-2">
          <Link
            onClick={() => setOpenDisclaimer(false)}
            href="/dashboard/vendor/settings/account"
          >
            <Button
              animate={false}
              text="Go to Profile"
              bgColor="bg-blue-500"
              color="text-white"
            />
          </Link>
          <div className="w-20">
            <Button
              onClick={() => setOpenDisclaimer(false)}
              animate={false}
              text="Close"
              bgColor="bg-red-500"
              color="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorProfileCompleteDisclaimer;
