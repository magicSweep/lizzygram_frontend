import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./../../src/theme";
//import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import ThemeSwitch from "../../src/theme/component/ThemeSwitch";
import CssBaseline from "@mui/material/CssBaseline";
import { applyTheme } from "../../src/theme/tailwind/utils";

const Layout = ({ children, darkState, onThemeChange }) => {
  return (
    <Box minHeight="100%" minWidth="100%" /* bgcolor="background.paper" */>
      <Box
        //width="50px"
        //height="50px"
        //borderRadius="50%"
        paddingX="4px"
        paddingY="12px"
        position="fixed"
        bottom="50px"
        right="100px"
        zIndex={4000}
        bgcolor="transparent"
      >
        <ThemeSwitch checked={darkState} onChange={onThemeChange} />
      </Box>
      {children}
    </Box>
  );
};

const MaterialThemeProvider = (storyFn) => {
  const [darkState, setDarkState] = useState(false);

  const theme = createTheme(darkState === true ? "dark" : "light");

  applyTheme(darkState === true ? "dark" : "light");

  const handleThemeChange = () => {
    setDarkState((prevDarkState) => !prevDarkState);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout darkState={darkState} onThemeChange={handleThemeChange}>
        {storyFn()}
      </Layout>
    </ThemeProvider>
  );
};
export default MaterialThemeProvider;
