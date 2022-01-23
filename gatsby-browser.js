import * as React from "react";
import { ReduxProvider } from "./src/container/ReduxProvider";
//import { ThemeProvider, EmotionCacheProvider } from "./src/theme";
import ThemeProvider from "./src/theme/container/ThemeProvider";
import EmotionCacheProvider from "./src/theme/container/EmotionCacheProvider";
import "./src/theme/styles/global.css";
import { Layout } from "./src/container/Layout";
import { init } from "./src/firebase/init";

init();

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
