import { ReduxProvider } from "./src/container/ReduxProvider";
import { ThemeProvider } from "./src/theme";
import * as React from "react";
import "./src/styles/global.css";
import { Layout } from "./src/container/Layout";

// DO NOT MODIFY THIS IMPORT CAUSE IT'S TRIGGER AN ERROR
export { replaceRenderer } from "./src/theme/utils/replaceRenderer";

export const wrapRootElement = ({ element }) => {
  return (
    <ReduxProvider>
      <ThemeProvider>{element}</ThemeProvider>
    </ReduxProvider>
  );
};

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};
