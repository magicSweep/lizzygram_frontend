import * as React from "react";
import { ReduxProvider } from "./src/container/ReduxProvider";
//import { ThemeProvider, EmotionCacheProvider } from "./src/theme";
import ThemeProvider from "./src/theme/container/ThemeProvider";
import EmotionCacheProvider from "./src/theme/container/EmotionCacheProvider";
// @fontsource/roboto
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./src/theme/styles/global.css";
import Layout from "./src/container/Layout";
import { init } from "./src/firebase/init.fake";

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

export const onClientEntry = () => {
  window.addEventListener("load", () => {
    if (document.body.classList.contains("bg-paper") === false)
      document.body.classList.add("bg-paper");
  });
};
