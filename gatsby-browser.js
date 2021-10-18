import * as React from "react";
import { ReduxProvider } from "./src/container/ReduxProvider";
import { ThemeProvider, EmotionCacheProvider } from "./src/theme";
//import { EmotionCacheProvider } from "./src/theme/container/EmotionCacheProvider";

export const wrapRootElement = ({ element }) => {
  return (
    <ReduxProvider>
      <EmotionCacheProvider>
        <ThemeProvider>{element}</ThemeProvider>
      </EmotionCacheProvider>
    </ReduxProvider>
  );
};

/*  <ReduxProvider>
      <EmotionCacheProvider>
        <ThemeProvider>{element}</ThemeProvider>
      </EmotionCacheProvider>
    </ReduxProvider> */
