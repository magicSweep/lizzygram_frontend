//import { Color } from "@material-ui/lab/Alert";
import { ThemeAction, ThemeActionTypes } from "./types";
import { PaletteOptions } from "@mui/material/styles";

export const setThemeModeAC = (mode: PaletteOptions["mode"]): ThemeAction => {
  return {
    type: "SET_MODE",
    mode,
  };
};
