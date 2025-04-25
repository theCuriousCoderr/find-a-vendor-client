"use client";

export default function getToken() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const refresh_token = localStorage.getItem("refresh_token");
    return { token, refresh_token };
  }
  return { token: null, refresh_token: null };
}
