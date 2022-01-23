import { useCallback, useEffect, useState } from "react";
import { GlobalState } from "../../../types";
import { useSelector, useDispatch } from "react-redux";
import { PaletteOptions } from "@mui/material/styles";
import { toggleThemeModeAC } from "../..";
import { saveMode } from "../../utils/main";

export const useMode = () => {
  const mode = useSelector<GlobalState, PaletteOptions["mode"]>(
    (state) => state.theme.mode
  );

  const dispatch = useDispatch();

  const toggleMode = () => {
    saveMode(mode === "dark" ? "light" : "dark");
    dispatch(toggleThemeModeAC());
  };

  /* const toggleMode = () => {
    saveMode(mode === "dark" ? "light" : "dark");
    dispatch(toggleThemeModeAC());
  };

  /* const toggleMode = useCallback(() => {
    saveMode(mode === "dark" ? "dark" : "light");
    dispatch(toggleThemeModeAC());
  }, [mode]); /

  useEffect(() => {
    const initialMode = getInitialMode();

    console.log("-----------INITIAL USE EFFECT", initialMode, mode);

    if (initialMode !== mode) dispatch(toggleThemeModeAC());
  }, []); */

  return {
    mode,
    toggleMode,
  };
};
