//import { Color } from "@material-ui/lab/Alert";
import { ThemeAction, ThemeActionTypes } from "./types";
//import { PaletteOptions } from "@mui/material/styles";

export const toggleThemeModeAC = (): ThemeAction => {
  return {
    type: "TOGGLE_MODE",
  };
};
