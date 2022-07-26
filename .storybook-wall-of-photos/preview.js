import { action } from "@storybook/addon-actions";
import { addDecorator } from "@storybook/react";
//import ThemeProvider from "./decorator/ThemeProvider";
import "../src/theme/styles/global.css";
import ReduxProvider from "./decorator/ReduxProvider";
import { init } from "../src/service/firebase/init.fake";
import ThemeProvider from "./decorator/ThemeProvider";

addDecorator(ReduxProvider);
addDecorator(ThemeProvider);

init();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
