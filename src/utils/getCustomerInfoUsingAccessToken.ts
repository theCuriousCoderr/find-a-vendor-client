import { GoogleAuthResponseType } from "@/types";
import axios from "axios";

async function getCustomerInfoUsingAccessToken(access_token: string) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );

    const data = response.data as GoogleAuthResponseType;
    const userInfo = {
      firstName: data?.given_name || "",
      lastName: data?.family_name || "",
      password: process.env.NEXT_PUBLIC_GOOGLE_SSO_PASSWORD as string,
      email: data.email,
      isEmailVerified: data?.verified_email || false,
      photo: data?.picture || "",
      phone: "",
    };
    return userInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getCustomerInfoUsingAccessToken;
