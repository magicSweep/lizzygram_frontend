import { PaletteOptions } from "@mui/material/styles";
import { Action, Reducer } from "redux";

export type ThemeState = {
  mode: PaletteOptions["mode"];
};

export type ThemeActionTypes = "SET_MODE";

export type ThemeAction = Action<ThemeActionTypes> & {
  mode: PaletteOptions["mode"];
};
