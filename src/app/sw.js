import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({ request, url: { pathname }, sameOrigin }) =>
        request.headers.get("RSC") === "1" &&
        request.headers.get("Next-Router-Prefetch") === "1" &&
        sameOrigin &&
        !pathname.startsWith("/api/"),
      handler: new NetworkFirst({
        cacheName: PAGES_CACHE_NAME.rscPrefetch,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          }),
        ],
        matchOptions,
      }),
    },
    {
      matcher: ({ request, url: { pathname }, sameOrigin }) =>
        request.headers.get("RSC") === "1" &&
        sameOrigin &&
        !pathname.startsWith("/api/"),
      handler: new NetworkFirst({
        cacheName: PAGES_CACHE_NAME.rsc,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          }),
        ],
        matchOptions,
      }),
    },
    {
      matcher: ({ request, url: { pathname }, sameOrigin }) =>
        request.headers.get("Content-Type")?.includes("text/html") &&
        sameOrigin &&
        !pathname.startsWith("/api/"),
      handler: new NetworkFirst({
        cacheName: PAGES_CACHE_NAME.html,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          }),
        ],
        matchOptions,
      }),
    },
    ...defaultCache,
  ],
  // Optional
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

const urlsToCache = ["/", "/~offline"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all(
      urlsToCache.map((entry) => {
        const request = serwist.handleRequest({
          request: new Request(entry),
          event,
        });
        return request;
      })
    )
  );
});

serwist.addEventListeners();
