import * as React from "react";
import { ReduxProvider } from "./src/container/ReduxProvider";
import { ThemeProvider, EmotionCacheProvider } from "./src/theme";
//import { EmotionCacheProvider } from "./src/theme/container/EmotionCacheProvider";
import "./src/styles/global.css";
import { Layout } from "./src/container/Layout";

export const wrapRootElement = ({ element }) => {
  return (
    <ReduxProvider>
      <EmotionCacheProvider>
        <ThemeProvider>{element}</ThemeProvider>
      </EmotionCacheProvider>
    </ReduxProvider>
  );
};

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};
