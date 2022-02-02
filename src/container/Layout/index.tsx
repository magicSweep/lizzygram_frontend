import React, { FC, lazy, Suspense } from "react";
//import ThemeSwitch from "../../theme/component/ThemeSwitch";
import { useMode } from "../../theme/hook/useMode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PaletteOptions } from "@mui/material/styles";
import AppBar from "../AppBar";
//import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "../../component/Link";
import AlertsLoadableWrapper from "../../alert/container/Alerts";
import { globalTitle } from "../../config";
//import loadable from "@loadable/component";
//import NoSsr from "@mui/material/NoSsr";
import NoSsr from "../../component/NoSsr";

const LoadableThemeSwitch = lazy(
  () => import("../../theme/component/ThemeSwitch")
);

export interface LayoutProps {
  children: any;
  //darkState: boolean;
  //onThemeChange: () => void;
}

const Banner: FC = () => (
  <Box
    className="text-center relative overflow-hidden"
    sx={{
      background: "linear-gradient(105deg, #2196f3 20%, #21cbf3 90%)",
      pt: "90px",
      pb: "100px",
      maxHeight: "1000px",
    }}
  >
    {/*  <Logo /> */}
    <Typography
      sx={{ userSelect: "none", fontWeight: 600, color: "#fff" }}
      variant="h4"
    >
      {globalTitle}
    </Typography>
  </Box>
);

const Footer: FC = () => (
  <div className="py-6 px-4">
    <Box typography="body2" className="text-center">
      Copyright © 2021 Made by me
    </Box>
  </div>
);

type WrapperProps = {
  mode: PaletteOptions["mode"];
  toggleMode: () => void;
  children: any;
};

const Wrapper: FC<WrapperProps> = ({ mode, toggleMode, children }) => {
  //const matches = useMediaQuery("(min-width:450px)", { defaultMatches: true });

  let isShowFaqLink = false;

  //console.log("[RENDER LAYOUT WRAPPER]", mode);

  if (
    typeof window !== "undefined" &&
    location.pathname.indexOf("/faq") === -1
  ) {
    isShowFaqLink = true;
  }

  /*  className={`z-10 relative p-5 -mt-16 ${
        matches === false ? "mx-1" : "mx-8"
      } rounded-lg bg-paper`} */
  return (
    <Box
      className={`z-10 relative pt-5 -mt-16 mx-1 sm:mx-8 rounded-lg bg-paper`}
      sx={{
        bgcolor: "background.paper",
        minWidth: "356px",
        minHeight: "400px",
        boxShadow: 4,
      }}
    >
      <div className="flex min-h-34 px-4 justify-between items-center">
        <NoSsr fallback={<div className="h-8"></div>}>
          <Suspense fallback={<div className="h-8"></div>}>
            <LoadableThemeSwitch
              checked={mode === "dark" ? true : false}
              onChange={toggleMode}
            />
          </Suspense>
        </NoSsr>
        {/* <NoSsr>
          <ThemeSwitch
            checked={mode === "dark" ? true : false}
            onChange={toggleMode}
          />
        </NoSsr> */}
        {isShowFaqLink === true && (
          <Link className="text-right" to="/faq">
            FAQ по работе сайта.
          </Link>
        )}
      </div>
      {children}
    </Box>
  );
};

const Layout: FC<LayoutProps> = ({ children }) => {
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
      className="w-full min-h-full relative overflow-auto bg-paper"
      /* sx={{
        bgcolor: "background.paper",
      }} */
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

export default Layout;
