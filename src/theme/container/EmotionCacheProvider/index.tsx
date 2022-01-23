/* eslint-disable import/prefer-default-export */
/* import React from "react";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache } from "./../../utils/createEmotionCache";
//import createCache from "@emotion/cache";

//export const createEmotionCache = () => createCache({ key: "css" });

const cache = createEmotionCache();

export const EmotionCacheProvider = ({ children }) => {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}; */
import React, { FC } from "react";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache } from "./../../utils/createEmotionCache";

export type EmotionCacheProviderProps = {
  children: any;
};

const cache = createEmotionCache();

const EmotionCacheProvider: FC<EmotionCacheProviderProps> = ({ children }) => {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default EmotionCacheProvider;
