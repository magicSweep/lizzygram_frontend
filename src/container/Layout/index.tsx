import React, { FC } from "react";
import { ThemeSwitch } from "../../theme/component/ThemeSwitch";
import { useMode } from "../../theme/hook/useMode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PaletteOptions } from "@mui/material/styles";
import { AppBar } from "../AppBar";
import { navigate } from "gatsby";
import { useLocation, useNavigate, Redirect } from "@reach/router";
import { useAuth } from "./../../auth";

export interface LayoutProps {
  children: any;
  //darkState: boolean;
  //onThemeChange: () => void;
}

const Banner: FC = () => (
  <Box
    className="text-center relative overflow-hidden"
    sx={{
      background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
      pt: "130px",
      pb: "130px",
      maxHeight: "1000px",
    }}
  >
    {/*  <Logo /> */}
    <Typography sx={{ fontWeight: 600, color: "#fff" }} variant="h4">
      Magic site приветствует тебя
    </Typography>
  </Box>
);

const Footer: FC = () => (
  <div className="py-6 pl-12">
    <Typography variant="body2" color="text.secondary" align="center">
      Copyright © 2021 Made by me
    </Typography>
  </div>
);

type WrapperProps = {
  mode: PaletteOptions["mode"];
  toggleMode: () => void;
  children: any;
};

const Wrapper: FC<WrapperProps> = ({ mode, toggleMode, children }) => (
  <Box
    className="z-10 relative p-5 -mt-16 mx-8 rounded-lg"
    sx={{
      bgcolor: "background.paper",
      minHeight: "600px",
      boxShadow: 4,
    }}
  >
    <ThemeSwitch
      checked={mode === "dark" ? true : false}
      onChange={toggleMode}
    />
    {children}
  </Box>
);

export const Layout: FC<LayoutProps> = ({ children }) => {
  //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { mode, toggleMode } = useMode();

  const location = useLocation();

  const { user } = useAuth();

  let uChildren = children;

  if (
    typeof window !== "undefined" &&
    user === null &&
    !["/", "/faq"].includes(location.pathname)
  ) {
    uChildren = null;

    navigate("/");

    return null;
  }

  /* const user = null;

  if (user === null) return <Redirect to="/" />; */

  console.log("[RENDER LAYOUT]", location.pathname, user);

  return (
    <Box
      className="w-full min-h-full relative overflow-auto"
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <AppBar />

      <Banner />

      <Wrapper mode={mode} toggleMode={toggleMode}>
        {uChildren}
      </Wrapper>

      <Footer />
    </Box>
  );
};
