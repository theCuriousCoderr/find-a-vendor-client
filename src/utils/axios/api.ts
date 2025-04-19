"use client";

import axios, { AxiosError } from "axios";
import { SERVER_URL } from "../getEnvUrl";
import { clearUniqueString, getUniqueString } from "../getUUID";

const API_BASE_URL = SERVER_URL;
let cacheRequestPrints: string[] = [];
let prevMessage = "";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies to be sent with requests
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    config.headers["X-Request-Print"] = getUniqueString();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    const status = response.status;
    const message = response.data.message;

    const isSameRequest =
      status === 200 &&
      message === "Same Request" &&
      cacheRequestPrints.length > 0;
    const isOldResponse =
      message !== prevMessage && cacheRequestPrints.length > 0;
    let cacheResponse = response;

    if (isSameRequest) {
      if (isOldResponse) {
        clearUniqueString();
      }

      cacheResponse = JSON.parse(cacheRequestPrints[0]);
    }

    // If the response is good, just return it
    if (message !== "Same Request") {
      // prevMessage = message;
      cacheRequestPrints = [JSON.stringify(response)];
    }

    // clearUniqueString();
    prevMessage = message;
    return cacheResponse;
  },
  (error) => {
    const _error = error as AxiosError;
    const data = _error.response?.data as { redirectUrl: string };
    // If you receive a 3xx error, redirect the user
    if (_error.response && _error.response.status === 302) {
      window.location.href = data.redirectUrl;
    }
    // if (_error.response && _error.response.status === 403) {
    //   window.location.href = window.location.origin;
    // }
    clearUniqueString();
    return Promise.reject(error);
  }
);

export default api;
