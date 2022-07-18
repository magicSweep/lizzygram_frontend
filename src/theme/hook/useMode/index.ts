import { useCallback, useEffect, useState } from "react";
import { GlobalState } from "../../../types";
import { useSelector, useDispatch } from "react-redux";
import { PaletteOptions } from "@mui/material/styles";
import { toggleThemeAC } from "../..";
import { saveMode, getInitialMode } from "../../utils/main";

let init = false;

export const useMode = () => {
  const mode = useSelector<GlobalState, PaletteOptions["mode"]>(
    (state) => state.theme.mode
  );

  const dispatch = useDispatch();

  const toggleMode = () => {
    saveMode(mode === "dark" ? "light" : "dark");
    dispatch(toggleThemeAC());
  };

  /* const toggleMode = () => {
    saveMode(mode === "dark" ? "light" : "dark");
    dispatch(toggleThemeAC());
  };

  /* const toggleMode = useCallback(() => {
    saveMode(mode === "dark" ? "dark" : "light");
    dispatch(toggleThemeAC());
  }, [mode]); */

  useEffect(() => {
    if (init === false) {
      const initialMode = getInitialMode();

      //console.log("-----------INITIAL USE EFFECT", initialMode, mode);

      if (initialMode !== mode) dispatch(toggleThemeAC());

      init = true;
    }
  }, []);

  return {
    mode,
    toggleMode,
  };
};
