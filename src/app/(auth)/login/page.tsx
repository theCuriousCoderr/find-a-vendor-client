"use client";

import {
  updateLoginError,
  updateLogInLoading,
  updateLoginRole,
} from "@/app/features/login/loginSlice";
import { logInCustomer, logInVendor } from "@/app/features/login/thunk";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import STARTUP_NAME from "@/static-data/startupname";
import { RolesType } from "@/types";
import getCustomerInfoUsingAccessToken from "@/utils/getCustomerInfoUsingAccessToken";
import verifiedEmail from "@/utils/verifiedEmails";
import { verifyEmail } from "@/utils/verifyEmail";
import { useGoogleLogin } from "@react-oauth/google";
import { CheckCircle2Icon, CircleX, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function VendorLogIn() {
  const [vendorInfo, setVendorInfo] = useState({
    email: "martilo@gmail.com",
    password: "jama_jama",
  });

  const [emailVerify, setEmailVerify] = useState("");
  const [switchForm, setSwitchForm] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const { oppositeRole, loading } = useSelector(
    (state: RootState) => state.login
  );

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    setVendorInfo({ ...vendorInfo, [name]: value });
  }

  function switchRole() {
    dispatch(updateLoginRole({ role: oppositeRole }));
    setSwitchForm(true);
  }

  async function submitVendorLogInForm(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailVerify("");
    dispatch(updateLogInLoading(true));
    const emailVerification = await verifyEmail(vendorInfo.email);
    verifiedEmail.saveStatus(vendorInfo.email, emailVerification);
    setEmailVerify(emailVerification as string);
    dispatch(updateLogInLoading(false));

    try {
      if (emailVerification === "valid") {
        const { vendor_id } = await dispatch(logInVendor(vendorInfo)).unwrap();
        if (vendor_id) router.push(`/dashboard/vendor/products`);
      } else {
        dispatch(updateLoginError("Invalid Email"));
      }
    } catch (error) {
      router.push("/login?role=vendor");
    }
  }

  return (
    <form onSubmit={submitVendorLogInForm} className="w-full space-y-5">
      {/* switch role: show on mobile, hide on desktop*/}
      <div className="hidden xs:max-md:block w-full text-center bg-blue-500/10 py-1 rounded-md">
        {switchForm ? (
          <Spinner color="border-t-blue-500" />
        ) : (
          <Link
            href={`/login?role=${oppositeRole}`}
            onClick={switchRole}
            className="text-blue-500 font-medium hover:underline underline-offset-2 text-center w-full text-xs"
          >
            Switch to Log In page for a{" "}
            <span className="capitalize">{oppositeRole} </span>
          </Link>
        )}
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
        readOnly={true}
        value={vendorInfo.email}
          name="email"
          label="Your Email"
          type="email"
          placeholder="johndoe123@gmail.com"
          onChange={handleInputChange}
        />
      </div>

      {/* Password */}
      <Input
      readOnly={true}
      value={vendorInfo.password}
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
          text="Log In as a Vendor"
          bgColor="bg-black"
          color="text-white"
          loading={loading}
        />
      </div>

      {/* switch role: show on desktop, hide on mobile*/}
      <div className="xs:max-md:hidden w-full text-center">
        {switchForm ? (
          <Spinner color="border-t-blue-500" />
        ) : (
          <Link
            href={`/login?role=${oppositeRole}`}
            onClick={switchRole}
            className="text-blue-500 font-medium hover:underline underline-offset-2 text-center w-full"
          >
            Switch to Log In page for a{" "}
            <span className="capitalize">{oppositeRole} </span>
          </Link>
        )}
      </div>
    </form>
  );
}

function CustomerLogIn() {
  const [customerInfo, setCustomerInfo] = useState({
    email: "segunsunday619@gmail.com",
    password: "GOOGLE_SSO",
  });

  const [emailVerify, setEmailVerify] = useState("");
  const [switchForm, setSwitchForm] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const { oppositeRole, loading } = useSelector(
    (state: RootState) => state.login
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
    dispatch(updateLoginRole({ role: oppositeRole }));
    setSwitchForm(true);
  }

  async function proceedWithGoogleSignIn(access_token: string) {
    const userInfo = await getCustomerInfoUsingAccessToken(access_token);
    if (userInfo)
      dispatch(
        logInCustomer({ email: userInfo.email, password: userInfo.password })
      );
  }

  const continueWithGoogle = useGoogleLogin({
    onSuccess: (data: { access_token: string }) =>
      proceedWithGoogleSignIn(data.access_token),
    onError: (error) => console.error("Login Failed:", error),
  });

  async function submitCustomerLogInForm(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailVerify("");
    dispatch(updateLogInLoading(true));
    const emailVerification = await verifyEmail(customerInfo.email);
    verifiedEmail.saveStatus(customerInfo.email, emailVerification);
    setEmailVerify(emailVerification as string);
    dispatch(updateLogInLoading(false));

    try {
      if (emailVerification === "valid") {
        const { customer_id } = await dispatch(
          logInCustomer(customerInfo)
        ).unwrap();
        if (customer_id) {
          router.push(`/dashboard/customer/orders`);
        }
      } else {
        dispatch(updateLoginError("Invalid Email"));
      }
    } catch (error) {
      router.push("/login?role=customer");
    }
  }

  return (
    <form onSubmit={submitCustomerLogInForm} className="w-full space-y-5">
      {/* switch role: show on mobile, hide on desktop*/}
      <p className="hidden xs:max-md:block w-full text-center bg-blue-500/10 py-1 rounded-md">
        {switchForm ? (
          <Spinner color="border-t-blue-500" />
        ) : (
          <Link
            href={`/login?role=${oppositeRole}`}
            onClick={switchRole}
            className="text-blue-500 font-medium hover:underline underline-offset-2 text-center w-full text-xs"
          >
            Switch to Log In page for a{" "}
            <span className="capitalize">{oppositeRole} </span>
          </Link>
        )}
      </p>

      <div>
        <button
          onClick={() => {
            return;
            continueWithGoogle();
          }}
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
          readOnly={true}
          value={customerInfo.email}
          name="email"
          label="Your Email"
          type="email"
          placeholder="johndoe123@gmail.com"
          onChange={handleInputChange}
        />
      </div>

      {/* Password */}
      <Input
        readOnly={true}
        value={customerInfo.password}
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
          text="Log In as a Customer"
          bgColor="bg-black"
          color="text-white"
          loading={loading}
        />
      </div>

      {/* switch role */}
      <p className="xs:max-md:hidden w-full text-center">
        {switchForm ? (
          <Spinner color="border-t-blue-500" />
        ) : (
          <Link
            href={`/login?role=${oppositeRole}`}
            onClick={switchRole}
            className="text-blue-500 font-medium hover:underline underline-offset-2 text-center w-full"
          >
            Switch to Log In page for a{" "}
            <span className="capitalize">{oppositeRole} </span>
          </Link>
        )}
      </p>
    </form>
  );
}

function LogIn() {
  const { activeRole, redirect } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [windowHeight, setWindowHeight] = useState(0);
  const [dontHaveAnAccount, setDontHaveAnAccount] = useState(false);

  const viewportHeightIsBig = windowHeight > 700;

  function setWindowHeightRef() {
    console.log("resize");
    const newInnerHeight = window.innerHeight;
    if (newInnerHeight === windowHeight) return;
    setWindowHeight(newInnerHeight);
  }

  useEffect(() => {
    if (typeof window !== "undefined") setWindowHeightRef();
    resolveLogInSearchParams();
    window.addEventListener("resize", setWindowHeightRef);
    return () => {
      window.removeEventListener("resize", setWindowHeightRef);
    };
  }, []);

  async function resolveLogInSearchParams() {
    let _role = (searchParams.get("role") || "customer") as RolesType;
    if (activeRole === _role) return;
    if (_role !== "vendor" && _role !== "customer") {
      router.push("/login?role=customer");
      _role = "customer";
    }
    dispatch(updateLoginRole({ role: _role }));
  }

  if (activeRole === "" || redirect) {
    return (
      <div className="fixed z-30 w-full -mt-20 h-screen flex flex-col items-center justify-center">
        <Spinner color="border-t-blue-500" />
        {redirect && <p>Redirecting you to your dashboard ...</p>}
      </div>
    );
  }

  return (
    <div className="">
      <div className="z-20 w-full h-[calc(100vh_-_10rem)] h-scree xs:max-md:static xs:max-md:h-auto xs:max-md:mt-5 overflow-auto flex items-center justify-center">
        <div
          className={` ${
            viewportHeightIsBig ? "h-auto" : "h-full overflow-auto no-scrollbar"
          }  flex flex-col gap-5 items-center space-y-2 xs:max-md:pb-20`}
        >
          <h1 className="font-bold text-3xl xs:max-md:text-2xl text-center mx-auto ">
            Log in to <q className="">{STARTUP_NAME}</q> <br /> ... as a{" "}
            <span className="capitalize text-peach underline">
              {activeRole}
            </span>
          </h1>
          <div className="w-[90%]">
            {activeRole === "vendor" ? <VendorLogIn /> : <CustomerLogIn />}
          </div>
        </div>

        {/* bottom section */}
        <div className="fixed bg-white bottom-0 left-0 w-full border-t h-20 xs:max-2xl:h-12 flex items-center justify-center">
          {dontHaveAnAccount ? (
            <Spinner color="border-t-blue-500" />
          ) : (
            <Link
              onClick={() => setDontHaveAnAccount(true)}
              href={`/signup?role=${activeRole}`}
              className="text-blue-500 font-medium hover:underline underline-offset-2 text-center xs:max-md:text-sm px-2"
            >
              Don&apos;t have an account? Sign Up as a{" "}
              <span className="capitalize">{activeRole}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default LogIn;
