import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/offline", // halaman fallback saat offline
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.example\.com\/.*/,
      handler: new NetworkFirst({
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
      }),
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: new CacheFirst({
        cacheName: "image-cache",
        plugins: [
          {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          },
        ],
      }),
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
      handler: new StaleWhileRevalidate({
        cacheName: "google-fonts",
      }),
    },
  ],
});

serwist.addEventListeners();
