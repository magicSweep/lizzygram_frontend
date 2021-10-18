import React, { FC, Fragment } from "react";
import { Helmet } from "react-helmet";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as ThemeMuiProvider } from "@mui/material/styles";
import { createTheme } from "../../createTheme";

type ThemeProviderProps = {
  children: any;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const theme = createTheme("light");

  console.log("RENDER THEME PROVIDER");

  return (
    <Fragment>
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeMuiProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeMuiProvider>
    </Fragment>
  );
};
