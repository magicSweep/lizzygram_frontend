import React, { FC } from "react";
import { ThemeSwitch } from "../../theme/component/ThemeSwitch";
import { useMode } from "../../theme/hook/useMode";
import Box from "@mui/material/Box";

export interface LayoutProps {
  children: any;
  //darkState: boolean;
  //onThemeChange: () => void;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { mode, toggleMode } = useMode();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: "100%",
        minHeight: "100%",
        position: "relative",
        overflow: "auto",
      }}
    ></Box>
  );
};
