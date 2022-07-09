//import useScrollTrigger from "@mui/material/useScrollTrigger";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, { memo, lazy, Suspense, FC, ComponentProps } from "react";
import { Logo } from "../../component/Logo";
import Fallback from "../../auth/container/AuthAppBarBtn/AuthAppBarBtnFallback";
import LoadableSearchBtn from "../../search/container/SearchBtn";
import NoSsr from "../../component/NoSsr";
//import { useScrollTriggerContext } from "../../hook/useScrollTriggerContext";
import Slide from "@mui/material/Slide";
import { useLayoutActionsContext } from "../../hook/useLayoutActionsContext";

const LazyAuthAppBarBtn = lazy(
  () => import("../../auth/container/AuthAppBarBtn")
);

const AppBar: FC = () => {
  const { elevationAppBar, showElements } = useLayoutActionsContext();

  let isShowSearchBtn = false;

  if (typeof window !== "undefined" && location.pathname === "/") {
    isShowSearchBtn = true;
  }

  return (
    <Slide appear={false} direction="down" in={showElements}>
      <MuiAppBar
        sx={{
          width: "100%",
          //backgroundColor: "#2196F3",
          //height: "50px",
          background: "linear-gradient(45deg, #2196F3 20%, #21CBF3 90%)",
        }}
        elevation={elevationAppBar ? 4 : 0}
      >
        <Toolbar
          variant="dense"
          sx={{
            width: "100%",
            maxWidth: "1140px",
            m: "auto",
            minHeight: "50px",
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
    </Slide>
  );
};

export default AppBar;
