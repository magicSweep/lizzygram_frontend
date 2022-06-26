import { ReduxProvider } from "./src/container/ReduxProvider";
import ThemeProvider from "./src/theme/container/ThemeProvider";
//import { ThemeProvider } from "./src/theme";
import * as React from "react";
import "./src/theme/styles/global.css";
import Layout from "./src/container/Layout";
import ErrorBoundary from "./src/component/ErrorBoundary";

// DO NOT MODIFY THIS IMPORT CAUSE IT'S TRIGGER AN ERROR
export { replaceRenderer } from "./src/theme/utils/replaceRenderer";

export const wrapRootElement = ({ element }) => {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <ThemeProvider>{element}</ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};

export const onRenderBody = ({ setBodyAttributes }) => {
  setBodyAttributes({
    className: "bg-paper",
  });
};
