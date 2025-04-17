// import axios from "axios";

import verifiedEmail from "./verifiedEmails";

export async function verifyEmail(
  emailToTest: string
): Promise<"valid" | "invalid"> {
  const cachedEmailVerifyStatus = verifiedEmail.getStatus(emailToTest);
  if (cachedEmailVerifyStatus) {
    console.log("Cache Hit");
    return cachedEmailVerifyStatus as "valid" | "invalid";
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const value = regex.test(emailToTest) ? "valid" : "invalid";
      resolve(value);
    }, 1000);
  });

  // try {
  //   const response = await axios.get(
  //     `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.NEXT_PUBLIC_ABSTRACT_API_EMAIL_VALIDATION_KEY}&email=${emailToTest}`
  //   );
  //   if (response.data.deliverability) {
  //     const deliverability = response.data.deliverability;
  //     return deliverability === "DELIVERABLE" ? "valid" : "invalid";
  //   } else {
  //     return "invalid";;
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return "invalid";;
  // }
}
