"use client";

import { useEffect } from "react";

export default function SerwistRegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      const wb = async () => {
        try {
          const registration = await navigator.serviceWorker.register(
            "/sw.js",
            {
              scope: "/",
            }
          );
          console.log("✅ Serwist registered:", registration.scope);
        } catch (error) {
          console.error("❌ Serwist registration failed:", error);
        }
      };

      wb();
    }
  }, []);

  return null;
}
