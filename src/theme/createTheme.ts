import { red } from "@mui/material/colors";
import {
  createTheme as createMuiTheme,
  PaletteOptions,
} from "@mui/material/styles";

// A custom theme for this app
export const createTheme = (mode: PaletteOptions["mode"]) =>
  createMuiTheme({
    palette: {
      mode,
      /*  primary: {
        main: "#556cd6",
      },
      secondary: {
        main: "#19857b",
      },
      error: {
        main: red.A400,
      }, */
      background: {
        paper: mode === "dark" ? "#424242" : "#fff",
        default: mode === "dark" ? "#303030" : "#fff",
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });
