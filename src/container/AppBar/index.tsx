import useScrollTrigger from "@mui/material/useScrollTrigger";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, { memo, lazy, Suspense } from "react";
import { Logo } from "../../component/Logo";
import Fallback from "../../auth/container/AuthAppBarBtn/AuthAppBarBtnFallback";
import LoadableSearchBtn from "../../search/container/SearchBtn";
import NoSsr from "../../component/NoSsr";

const LazyAuthAppBarBtn = lazy(
  () => import("../../auth/container/AuthAppBarBtn")
);

const AppBar = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  let isShowSearchBtn = false;

  if (typeof window !== "undefined" && location.pathname === "/") {
    isShowSearchBtn = true;
  }

  return (
    <MuiAppBar
      sx={{
        width: "100%",
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
      }}
      elevation={trigger ? 4 : 0}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: "1140px",
          m: "auto",
          minHeight: "70px",
          justifyContent: "space-between",
        }}
      >
        <Logo />

        {isShowSearchBtn === true && <LoadableSearchBtn />}

        <NoSsr fallback={<Fallback />}>
          <Suspense fallback={<Fallback />}>
            <LazyAuthAppBarBtn />
          </Suspense>
        </NoSsr>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
