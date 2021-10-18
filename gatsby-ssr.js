import { ReduxProvider } from "./src/container/ReduxProvider";
import { ThemeProvider } from "./src/theme";
import * as React from "react";

// DO NOT MODIFY THIS IMPORT CAUSE IT'S TRIGGER AN ERROR
export { replaceRenderer } from "./src/theme/utils/replaceRenderer";

export const wrapRootElement = ({ element }) => {
  return (
    <ReduxProvider>
      <ThemeProvider>{element}</ThemeProvider>
    </ReduxProvider>
  );
};

/*  <ReduxProvider>
      <ThemeProvider>{element}</ThemeProvider>
    </ReduxProvider> */
