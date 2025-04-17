"use client";

import React from "react";
import { store } from "@/app/store";
import { Provider } from "react-redux";

function ReduxWrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxWrapper;
