import React, { FC } from "react";
import { ThemeSwitch } from "../../theme/component/ThemeSwitch";
import { useMode } from "../../theme/hook/useMode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PaletteOptions } from "@mui/material/styles";
import { AppBar } from "../AppBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "../../component/Link";
/* import { navigate } from "gatsby";
import { useLocation, useNavigate, Redirect } from "@reach/router";
import { useAuth } from "./../../auth";
 */
import { AlertsLoadableWrapper } from "../../alert";
import { globalTitle } from "../../config";

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
      {globalTitle}
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

const Wrapper: FC<WrapperProps> = ({ mode, toggleMode, children }) => {
  const matches = useMediaQuery("(min-width:450px)");

  return (
    <Box
      className={`z-10 relative p-5 -mt-16 ${
        matches === false ? "mx-1" : "mx-8"
      } rounded-lg`}
      sx={{
        bgcolor: "background.paper",
        minWidth: "400px",
        minHeight: "600px",
        boxShadow: 4,
      }}
    >
      <div className="flex justify-between items-center">
        <ThemeSwitch
          checked={mode === "dark" ? true : false}
          onChange={toggleMode}
        />
        <Link className="text-right" to="/faq">
          FAQ по работе сайта.
        </Link>
      </div>
      {children}
    </Box>
  );
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { mode, toggleMode } = useMode();

  /* const location = useLocation();

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
  } */

  //console.log("[RENDER LAYOUT]");

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
        {children}
      </Wrapper>

      <Footer />

      <AlertsLoadableWrapper />
    </Box>
  );
};
