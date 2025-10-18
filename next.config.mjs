import withSerwistInit from "@serwist/next";
import { execSync } from "child_process";

// Use git commit hash as cache version
const revision = execSync("git rev-parse HEAD", { encoding: "utf8" })
  .trim()
  .slice(0, 7);

const withSerwist = withSerwistInit({
  swSrc: "app/sw.js",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV !== "production",
  register: true,
  additionalPrecacheEntries: [
    { url: "/", revision },
    { url: "/~offline", revision },
  ],
});

export default withSerwist({
  // Next Configuration
});
