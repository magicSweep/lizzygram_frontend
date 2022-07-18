import { createSlice } from "@reduxjs/toolkit";
import { PaletteOptions } from "@mui/material/styles";
import { ThemeState, ThemeAction } from "./types";

const initialMode: PaletteOptions["mode"] = "light";
//const initialMode: PaletteOptions["mode"] = getInitialMode();

//console.log("-----INITIAL THEME MODE", initialMode);

const initialState: ThemeState = {
  mode: initialMode,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme: toggleThemeAC } = themeSlice.actions;

export default themeSlice.reducer;
