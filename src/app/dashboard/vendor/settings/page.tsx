"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/vendor/settings/profile");
  }, []);
}

export default SettingsPage;
