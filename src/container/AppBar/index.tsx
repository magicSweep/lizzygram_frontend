import useScrollTrigger from "@mui/material/useScrollTrigger";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Logo } from "../../component/Logo";
import AuthAppBarBtn from "../../auth/container/AuthAppBarBtn";
import { LoadableSearchBtn } from "../../search";

export const AppBar = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

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

        <LoadableSearchBtn />

        <AuthAppBarBtn />
      </Toolbar>
    </MuiAppBar>
  );
};
