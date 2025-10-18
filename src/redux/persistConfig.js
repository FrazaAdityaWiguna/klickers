import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

export const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey:
        process.env.NEXT_PUBLIC_PERSIST_SECRET_KEY ||
        "DEFAULT_PASSWORD_SUPER_SECRETP",
      onError: function (error) {
        console.error("Encryption error:", error);
      },
    }),
  ],
  whitelist: ["theme"], // nama slice yang mau dipersist
};
