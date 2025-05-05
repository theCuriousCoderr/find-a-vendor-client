"use client";

import { AppDispatch, RootState } from "@/app/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import STARTUP_NAME from "@/static-data/startupname";
import { GoogleOAuthProvider } from "@react-oauth/google";
import isUserAuthenticated from "@/utils/isUserAuthenticated";
import {
  connectWebSocket,
  updateCustomerNotif,
  updateVendorNotif,
} from "@/app/features/notification/notificationSlice";
import { toast, ToastContainer } from "react-toastify";
import {
  clearSignUpError,
  clearSignUpSuccess,
} from "@/app/features/signup/signupSlice";
import {
  clearLoginError,
  clearLoginSuccess,
} from "@/app/features/login/loginSlice";
import ws, { forceWebSocketReconnect } from "@/utils/connectWebSocket";
import websocketOnMessageHandler from "@/utils/websocketOnMessageHandler";
import {
  getAuthenticatedVendor,
  getAuthenticatedVendorNotifications,
  getAuthenticatedVendorOrders,
} from "@/app/features/vendors/thunk";
import {
  clearStatusError,
  clearStatusSuccess,
} from "@/app/features/status/statusSlice";
import { BroadcastEventType, NotificationType, OrderType } from "@/types";
import {
  updateProductsRound,
  updateVendorsRound,
} from "@/app/features/public/publicSlice";
import { setIsAuthenticated } from "@/app/features/auth/authSlice";
import DesktopHeaderNav from "./DesktopHeaderNav";
import MobileSideNav from "./MobileSideNav";
import {
  getAuthenticatedCustomer,
  getAuthenticatedCustomerNotifications,
  getAuthenticatedCustomerOrders,
} from "@/app/features/customers/thunk";
import LogoName from "./LogoName";
import { Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import Footer from "./Footer";

interface TimerRefType {
  vendors: NodeJS.Timeout | null;
  products: NodeJS.Timeout | null;
}

// this component acts to handle all top-level client-side actions
function ClientWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const [id, setId] = useState({
    vendor: "",
    customer: "",
  });
  const [mounted, setMounted] = useState(false);

  const { isAuthenticated, customer } = useSelector(
    (state: RootState) => state.auth
  );

  const { isWebSocketConnected } = useSelector(
    (state: RootState) => state.notification
  );

  const { error, success: signUpSuccess } = useSelector(
    (state: RootState) => state.signup
  );

  const { error: logInError, success: logInSuccess } = useSelector(
    (state: RootState) => state.login
  );

  const { appStatusError, appStatusSuccess } = useSelector(
    (state: RootState) => state.status
  );

  const timerRef = useRef<TimerRefType>({
    vendors: null,
    products: null,
  });

  const broadcastEventRef = useRef("");
  const [windowHeight, setWindowHeight] = useState(0);
  const [openDisclaimer, setOpenDisclaimer] = useState(false);
  const GOOGLE_AUTH_CLIENT_ID = process.env
    .NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string;

  // scroll offset height for viewport detection
  const viewportDetectionTopOffset = windowHeight * 0.5;

  // handles the infinite scroll data fetch for the vendors page
  function activateVendorsInfiniteScroll() {
    // clear the debounced state for vendors infiniteScroll
    if (timerRef) {
      timerRef.current.vendors = null;
    }

    // select the last vendorsList card
    const lastVendorCard = document.getElementById(
      "isLastVendorCard"
    ) as HTMLElement;
    // if the last vendorsList card has been rendered
    if (lastVendorCard) {
      const lastVendorCardTop =
        lastVendorCard.getBoundingClientRect().top - viewportDetectionTopOffset;
      // if the last vendorsList card is in viewport
      if (lastVendorCardTop > 0 && lastVendorCardTop < windowHeight) {
        // remove its mark as the last
        lastVendorCard.id = "isNotLastVendorCard";
        // update round to fetch more
        dispatch(updateVendorsRound(1));
      }
    }
  }

  // handles the infinite scroll data fetch for the products page
  function activateProductsInfiniteScroll() {
    // clear the debounced state for products infiniteScroll
    if (timerRef) {
      timerRef.current.products = null;
    }

    // select the last productsList card
    const lastProductCard = document.getElementById(
      "isLastProductCard"
    ) as HTMLElement;
    // if the last productsList card has been rendered
    if (lastProductCard) {
      const lastProductCardTop =
        lastProductCard.getBoundingClientRect().top -
        viewportDetectionTopOffset;
      // if the last productsList card is in viewport
      if (lastProductCardTop > 0 && lastProductCardTop < windowHeight) {
        // remove its mark as the last
        lastProductCard.id = "isNotLastProductCard";
        // update round to fetch more
        dispatch(updateProductsRound());
      }
    }
  }

  // controls the infinite scroll debouncing
  function debouncedInfiniteScroll() {
    // if the page url is the "/vendors"
    if (pathname === "/vendors") {
      if (timerRef.current.vendors) {
        clearTimeout(timerRef.current.vendors);
      }
      timerRef.current.vendors = setTimeout(activateVendorsInfiniteScroll, 100);
    }

    // if the page url is the "/products/all"
    if (pathname === "/products/all") {
      if (timerRef.current.products) {
        clearTimeout(timerRef.current.products);
      }
      timerRef.current.products = setTimeout(
        activateProductsInfiniteScroll,
        100
      );
    }
  }

  const isProtectedRoute = pathname.includes("dashboard");

  // activated whenevr any page is reloaded
  useEffect(() => {
    // set the screen height
    if (typeof window !== "undefined") setWindowHeight(window.innerHeight);

    // if the websocket is not connected, reconnect it
    !isWebSocketConnected && dispatch(connectWebSocket());

    // check to see if user is an authenticated customer by cookie
    const customer_id = (isUserAuthenticated()?.customer_id as string) || null;
    // check to see if user is an authenticated vendor by cookie
    const vendor_id = (isUserAuthenticated()?.vendor_id as string) || null;

    // if user is an authenticated customer by cookie, fetch customer details
    if (customer_id) dispatch(getAuthenticatedCustomer());

    // if user is an authenticated vendor by cookie, fetch vendor details
    if (vendor_id) dispatch(getAuthenticatedVendor());

    // if user is not an authenticated vendor/customer by cookie, flag them as unaunthenticated on the frontend
    // the server will handle any unaunthenticated request to aunthenticated routes on the backend
    if (!isUserAuthenticated() && isProtectedRoute) {
      router.push("/");
      dispatch(setIsAuthenticated(false));
    }

    // store the respective user id in state for later reference
    setId({
      vendor: vendor_id ?? "",
      customer: customer_id ?? "",
    });
    setMounted(true);
  }, []);

  // entry point for websocket emit events from the backend into the frontend
  // backend will occassionally emit events to the frontend
  ws.onmessage = (event) => {
    // parse the current event data as type "BroadcastEventType"
    const data = JSON.parse(event.data) as BroadcastEventType;
    // get the current data id
    const data_id = data._id;
    // if the current data id is same as the previous data id, return
    // prevents the same event from being processed more than once
    if (broadcastEventRef.current === data_id) {
      // reset the current data id
      broadcastEventRef.current = "";
      return;
    }
    // if the current data id is not same as the previous data id, save it
    broadcastEventRef.current = data_id;
    // process the received event to know what action to take on the frontend
    const response = websocketOnMessageHandler(data, isAuthenticated);
    let value;
    // takes actions based on the "type" field of the response object
    switch (response.type) {
      // if the type of action is to update notifications
      case "updateNotif":
        customer
          ? dispatch(updateCustomerNotif(parseInt(response.value)))
          : dispatch(updateVendorNotif(parseInt(response.value)));
        break;
      // if the type of action is to display a toast message
      case "toast":
        // display toast only if user is not authenticated
        !isAuthenticated && toast(response.value);
        break;
      // if the type of action is to fetch updated vendor details
      case "updateVendorDetails":
        dispatch(getAuthenticatedVendor());
        break;
      case "orderMade":
        value = response.value as OrderType;
        if (id.vendor && id.vendor === value.vendor_id) {
          dispatch(getAuthenticatedVendorOrders());
        }
        if (id.customer && id.customer === value.customer_id) {
          dispatch(getAuthenticatedCustomerOrders());
        }
        break;
      case "orderUpdated":
        value = response.value as OrderType;
        if (id.vendor && id.vendor === value.vendor_id) {
          dispatch(getAuthenticatedVendorOrders());
        }

        if (id.customer && id.customer === value.customer_id) {
          dispatch(getAuthenticatedCustomerOrders());
        }

        break;
      case "notification":
        value = response.value as NotificationType;
        if (id.vendor && id.vendor === value.vendor_id) {
          dispatch(getAuthenticatedVendorNotifications());
        }

        if (id.customer && id.customer === value.customer_id) {
          dispatch(getAuthenticatedCustomerNotifications());
        }

        break;
      default:
        break;
    }
  };

  ws.onclose = () => {
    forceWebSocketReconnect();
    // dispatch(updateHandshake(false))
  };

  // re-renders the component whenever "isAuthenticated" changes
  useEffect(() => {
    // if user is not authenticated and is on a protected route
    // redirect to home page
    if (!isAuthenticated && isProtectedRoute) {
      router.push("/");
    }
  }, [isAuthenticated]);

  // re-renders the component whenever "appStatusSuccess" changes
  // display global success toast message if the global success state updates
  useEffect(() => {
    Boolean(appStatusSuccess) && toast.success(appStatusSuccess);
    dispatch(clearStatusSuccess());
  }, [appStatusSuccess]);

  // re-renders the component whenever "appStatusError" changes
  // display global error toast message if the global error state updates
  useEffect(() => {
    Boolean(appStatusError) && toast.warn(appStatusError);
    dispatch(clearStatusError());
  }, [appStatusError]);

  useEffect(() => {
    Boolean(signUpSuccess) && toast.success(signUpSuccess);
    dispatch(clearSignUpSuccess());
  }, [signUpSuccess]);

  useEffect(() => {
    Boolean(logInSuccess) && toast.success(logInSuccess);
    dispatch(clearLoginSuccess());
  }, [logInSuccess]);

  useEffect(() => {
    Boolean(error) && toast.warn(error);
    dispatch(clearSignUpError());
  }, [error]);

  useEffect(() => {
    Boolean(logInError) && toast.warn(logInError);
    dispatch(clearLoginError());
  }, [logInError]);

  if (!mounted) {
    return <div></div>;
  }

  return (
    <div className="no-scrollbar h-screen w-full overflow-auto ">
      {/* a disclaimer information to all users on homepage. Show this only once */}
      {openDisclaimer && (
        <div className=" bg-pink-100 w-full fixed z-40 top-0 left-0 p-5 xs:max-md:p-5">
          <div className="w-[80%] xs:max-md:w-full mx-auto">
            <p className=" xs:max-md:text- text-red-500 font-medium">
              {STARTUP_NAME} does not currently facilitate monetary transactions
              between vendors and customers. Instead, customers can browse and
              connect with vendors of their choice. Vendors may then respond,
              and both parties are free to manage their transactions
              independently, using any preferred method. At this stage,
              {STARTUP_NAME} serves solely as a platform for connecting
              customers with vendors.
            </p>
            <div className="flex justify-end mt-5">
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
      )}

      {/* wrapper responsble for the Sign In with Google logic */}
      <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
        {/* container for displaying toast messages */}
        <ToastContainer />
        {/* headers for desktop and mobile */}
        <nav className="sticky w-full top-0 z-30 max-w-[1300px] mx-auto">
          <DesktopHeaderNav />
          <MobileSideNav />
        </nav>
        <div
          // activate infinte scroll for vendorsList and productsList on scroll
          onScroll={debouncedInfiniteScroll}
          className="h-[calc(100%_-_5rem)] w-full overflow-auto tiny-scrollbar bg-green-40"
        >
          {children}
          <Footer />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default ClientWrapper;
