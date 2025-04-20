"use client";

import {
  updateSignUpError,
  updateSignUpLoading,
  updateRole,
} from "@/app/features/signup/signupSlice";
import { signUpCustomer, signUpVendor } from "@/app/features/signup/thunk";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import STARTUP_NAME from "@/static-data/startupname";
import { CustomerInfo, RolesType } from "@/types";
import getCustomerInfoUsingAccessToken from "@/utils/getCustomerInfoUsingAccessToken";
import { getVendorLocation } from "@/utils/getVendorLocation";
import verifiedEmail from "@/utils/verifiedEmails";
import { verifyEmail } from "@/utils/verifyEmail";
import { useGoogleLogin } from "@react-oauth/google";
import { CheckCircle2Icon, CircleX, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function VendorSignUp() {
  const [vendorInfo, setVendorInfo] = useState({
    email: "",
    storeName: "",
    storeTag: "arike_collections",
    password: "",
  });

  const [emailVerify, setEmailVerify] = useState("");
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const { oppositeRole, loading } = useSelector(
    (state: RootState) => state.signup
  );

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "storeTag" && value === "") {
      value = "arike_collections";
    }
    setVendorInfo({ ...vendorInfo, [name]: value });
  }

  function switchRole() {
    dispatch(updateRole({ role: oppositeRole }));
  }

  async function submitVendorSignUpForm(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Go to Login page")
    return
    setEmailVerify("");
    dispatch(updateSignUpLoading(true));
    const _storeTag = vendorInfo.storeName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");
    const joined = new Date().toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    const location = await getVendorLocation();
    const _vendorInfo = {
      ...vendorInfo,
      storeTag: _storeTag,
      joined,
      location,
    };
    const emailVerification = await verifyEmail(_vendorInfo.email);
    verifiedEmail.saveStatus(_vendorInfo.email, emailVerification);
    setEmailVerify(emailVerification as string);
    dispatch(updateSignUpLoading(false));

    try {
      if (emailVerification === "valid") {
        const { vendor_id } = await dispatch(
          signUpVendor(_vendorInfo)
        ).unwrap();
        if (vendor_id) {
          router.push(`/dashboard/vendor/products`);
        }
      } else {
        dispatch(updateSignUpError("Invalid Email"));
      }
    } catch (error) {
      router.push("/signup?role=customer");
    }
  }

  return (
    <form onSubmit={submitVendorSignUpForm} className="w-full space-y-5">
      {/* switch role: show on mobile, hide on desktop*/}
      <p className="hidden xs:max-md:block w-full text-center bg-blue-500/10 py-1 rounded-md">
        <Link
          href={`/signup?role=${oppositeRole}`}
          onClick={switchRole}
          className="text-blue-500 font-medium hover:underline underline-offset-2 text-center w-full text-xs"
        >
          Switch to Sign Up page for a{" "}
          <span className="capitalize">{oppositeRole} </span>
        </Link>
      </p>

      {/* Store Name */}
      <Input
        name="storeName"
        label="Store Name"
        placeholder="Arike Collections"
        onChange={handleInputChange}
      />

      {/* Store Email */}
      <div className="relative bg-gree">
        <div className="absolute size-5 -right-6 bottom-3 mt-4">
          {emailVerify === "valid" && (
            <CheckCircle2Icon size={20} color="#16a34a" />
          )}
          {emailVerify === "invalid" && <CircleX size={20} color="#FF0000" />}
        </div>
        <Input
          name="email"
          label="Your Email"
          type="email"
          placeholder="johndoe123@gmail.com"
          onChange={handleInputChange}
        />
      </div>

      {/* Password */}
      <Input
        name="password"
        label="Password"
        onChange={handleInputChange}
        onIconClick={toggleShowPassword}
        iconClickEffect={showPassword}
        Icon1={EyeOff}
        Icon2={Eye}
      />

      {/* Signup Button */}
      <div>
        <Button
          animate={false}
          text="Sign Up as a Vendor"
          bgColor="bg-black"
          color="text-white"
          loading={loading}
        />
      </div>

      {/* switch role: show on desktop, hide on mobile*/}
      <p className="xs:max-md:hidden w-full text-center">
        <Link
          href={`/signup?role=${oppositeRole}`}
          onClick={switchRole}
          className="text-blue-500 font-medium hover:underline underline-offset-2 text-center w-full"
        >
          Switch to Sign Up page for a{" "}
          <span className="capitalize">{oppositeRole} </span>
        </Link>
      </p>
    </form>
  );
}

function CustomerSignUp() {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    isEmailVerified: false,
    photo: "",
    phone: "",
  });

  const [emailVerify, setEmailVerify] = useState("");
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const { oppositeRole, loading } = useSelector(
    (state: RootState) => state.signup
  );

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    setCustomerInfo({ ...customerInfo, [name]: value });
  }

  function switchRole() {
    dispatch(updateRole({ role: oppositeRole }));
  }

  async function proceedWithGoogleSignIn(access_token: string) {
    const userInfo = await getCustomerInfoUsingAccessToken(access_token);
    if (userInfo) {
      dispatch(signUpCustomer(userInfo));
    }
  }

  const continueWithGoogle = useGoogleLogin({
    onSuccess: (data: { access_token: string }) =>
      proceedWithGoogleSignIn(data.access_token),
    onError: (error) => console.error("Login Failed:", error),
  });

  async function submitCustomerSignUpForm(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Go to Login page")
    return
    setEmailVerify("");
    dispatch(updateSignUpLoading(true));
    const emailVerification = await verifyEmail(customerInfo.email);
    verifiedEmail.saveStatus(customerInfo.email, emailVerification);
    setEmailVerify(emailVerification as string);
    dispatch(updateSignUpLoading(false));

    try {
      if (emailVerification === "valid") {
        const { customer_id } = await dispatch(
          signUpCustomer(customerInfo)
        ).unwrap();
        if (customer_id) {
          router.push(`/dashboard/customer/orders`);
        }
      } else {
        dispatch(updateSignUpError("Invalid Email"));
      }
    } catch (error) {
      router.push("/signup?role=customer");
    }
  }

  return (
    <form onSubmit={submitCustomerSignUpForm} className="w-full space-y-5">
      {/* switch role: show on mobile, hide on desktop*/}
      <p className="hidden xs:max-md:block w-full text-center bg-blue-500/10 py-1 rounded-md">
        <Link
          href={`/signup?role=${oppositeRole}`}
          onClick={switchRole}
          className="text-blue-500 font-medium hover:underline underline-offset-2 text-center w-full text-xs"
        >
          Switch to Sign Up page for a{" "}
          <span className="capitalize">{oppositeRole} </span>
        </Link>
      </p>

      <div>
        <button
          onClick={() => { return; continueWithGoogle() }}
          type="button"
          className="size-full border rounded-md flex items-center justify-center gap-3 py-2 hover:bg-slate-100"
        >
          <figure className="relative size-5">
            <Image
              fill={true}
              sizes="20px"
              src="/google-logo.png"
              alt="Google Icon"
              className="object-contain object-center"
            />
          </figure>
          <p>Continue with Google</p>
        </button>
      </div>

      <div className="relative flex items-center">
        <hr className="w-full" />
        <p className="absolute w-full flex justify-center text-sm text-slate-400">
          <span className="bg-slate-50 px-2">OR</span>
        </p>
      </div>

      {/* Email */}
      <div className="relative">
        <div className="absolute size-5 -right-6 bottom-3 mt-4">
          {emailVerify === "valid" && (
            <CheckCircle2Icon size={20} color="#16a34a" />
          )}
          {emailVerify === "invalid" && <CircleX size={20} color="#FF0000" />}
        </div>
        <Input
          name="email"
          label="Your Email"
          type="email"
          placeholder="johndoe123@gmail.com"
          onChange={handleInputChange}
        />
      </div>

      {/* Password */}
      <Input
        name="password"
        label="Password"
        onChange={handleInputChange}
        onIconClick={toggleShowPassword}
        iconClickEffect={showPassword}
        Icon1={EyeOff}
        Icon2={Eye}
      />

      {/* Signup Button */}
      <div>
        <Button
          animate={false}
          text="Sign Up as a Customer"
          bgColor="bg-black"
          color="text-white"
          loading={loading}
        />
      </div>

      {/* switch role: show on desktop, hide on mobile*/}
      <p className="xs:max-md:hidden w-full text-center">
        <Link
          href={`/signup?role=${oppositeRole}`}
          onClick={switchRole}
          className="text-blue-500 font-medium hover:underline underline-offset-2 text-center w-full"
        >
          Switch to Sign Up page for a{" "}
          <span className="capitalize">{oppositeRole || "Vendor"} </span>
        </Link>
      </p>
    </form>
  );
}

function SignUp() {
  const { activeRole, redirect } = useSelector(
    (state: RootState) => state.signup
  );
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [windowHeight, setWindowHeight] = useState(0);
  const [alreadyHaveAnAccount, setAlreadyHaveAnAccount] = useState(false);

  const viewportHeightIsBig = windowHeight > 700;

  function setWindowHeightRef() {
    const newInnerHeight = window.innerHeight;
    if (newInnerHeight === windowHeight) return;
    setWindowHeight(newInnerHeight);
  }

  useEffect(() => {
    if (typeof window !== "undefined") setWindowHeightRef();

    resolveSignUpSearchParams();

    window.addEventListener("resize", setWindowHeightRef);
    return () => {
      window.removeEventListener("resize", setWindowHeightRef);
    };
  }, []);

  async function resolveSignUpSearchParams() {
    let _role = (searchParams.get("role") || "vendor") as RolesType;
    if (activeRole === _role) return;
    if (_role !== "vendor" && _role !== "customer") {
      router.push("/signup?role=vendor");
      _role = "vendor";
    }
    dispatch(updateRole({ role: _role }));
  }

  if (activeRole === "" || redirect) {
    return (
      <div className="fixed z-30 w-full -mt-20 h-screen flex items-center justify-center">
        <Spinner color="border-t-blue-500" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="z-20 w-full h-[calc(100vh_-_10rem)] h-scree xs:max-md:static xs:max-md:h-auto xs:max-md:mt-5 overflow-auto flex items-center justify-center">
        <div
          className={`${
            viewportHeightIsBig ? "h-auto" : "h-full overflow-auto no-scrollbar"
          } flex flex-col gap-5 items-center space-y-2 xs:max-md:pb-20`}
        >
          <h1 className="font-bold text-3xl xs:max-md:text-2xl text-center mx-auto px-10">
            Join <q className="">{STARTUP_NAME}</q> today! <br /> ... as a{" "}
            <span className="capitalize text-peach underline">
              {activeRole || "Customer"}
            </span>
          </h1>

          <div className="mx-auto w-[70%]">
            {activeRole === "vendor" ? <VendorSignUp /> : <CustomerSignUp />}
          </div>
        </div>

        {/* bottom section */}
        <div className="fixed bg-white bottom-0 left-0 w-full border-t h-20 xs:max-2xl:h-12 flex items-center justify-center">
          {alreadyHaveAnAccount ? (
            <Spinner color="border-t-blue-500" />
          ) : (
            <Link
              onClick={() => setAlreadyHaveAnAccount(true)}
              href={`/login?role=${activeRole}`}
              className="text-blue-500 font-medium hover:underline underline-offset-2 text-center xs:max-md:text-sm px-2"
            >
              Already have an account? Log In as a{" "}
              <span className="capitalize">{activeRole || "Customer"}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
