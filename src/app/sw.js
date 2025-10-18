import { Serwist, StaleWhileRevalidate, ExpirationPlugin } from "serwist";
import { defaultCache } from "@serwist/next/worker";

const cacheStrategies = [
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get("RSC") === "1" &&
      request.headers.get("Next-Router-Prefetch") === "1" &&
      sameOrigin &&
      !pathname.startsWith("/api/"),
    handler: new StaleWhileRevalidate({
      cacheName: "pages-rsc-prefetch",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get("RSC") === "1" &&
      sameOrigin &&
      !pathname.startsWith("/api/"),
    handler: new StaleWhileRevalidate({
      cacheName: "pages-rsc",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get("Content-Type")?.includes("text/html") &&
      sameOrigin &&
      !pathname.startsWith("/api/"),
    handler: new StaleWhileRevalidate({
      cacheName: "pages",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [...cacheStrategies, ...defaultCache],
  // Optional
  fallbacks: {
    entries: [
      {
        url: "/offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
