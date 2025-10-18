import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  scope: "/",
  sw: "sw.js",
  reloadOnOnline: true,
});

export default withPWA({
  // Your Next.js config
});
