import { Action, Reducer } from "redux";
import { ThemeState, ThemeAction } from "./types";

const themeInitialState: ThemeState = {
  mode: "light",
};

export const themeReducer: Reducer<ThemeState, ThemeAction> = (
  state = themeInitialState,
  action: ThemeAction
) => {
  switch (action.type) {
    case "TOGGLE_MODE":
      return {
        mode: state.mode === "light" ? "dark" : "light",
      };

    default:
      return state;
  }
};
