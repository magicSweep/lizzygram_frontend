import { useCallback, useState } from "react";
import { GlobalState } from "../../../types";
import { useSelector, useDispatch } from "react-redux";
import { PaletteOptions } from "@mui/material/styles";
import { toggleThemeModeAC } from "../..";

export const useMode = () => {
  const mode = useSelector<GlobalState, PaletteOptions["mode"]>(
    (state) => state.theme.mode
  );

  const dispatch = useDispatch();

  const toggleMode = useCallback(() => dispatch(toggleThemeModeAC()), []);

  return {
    mode,
    toggleMode,
  };
};
