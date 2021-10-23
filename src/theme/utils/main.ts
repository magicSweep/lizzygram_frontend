import { themeLocalStorageKey } from "../../config";
import { PaletteOptions } from "@mui/material/styles";
import { compose, elif } from "fmagic";

/* 
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
}
*/

const getInitialMode_ = (themeLocalStorageKey: string) =>
  elif<void, PaletteOptions["mode"]>(
    () => typeof window !== "undefined",
    compose(
      () => window.localStorage.getItem(themeLocalStorageKey),
      (savedMode: string | null) =>
        savedMode !== null && savedMode === "dark" ? "dark" : "light"
    ),
    () => "light"
  );

export const getInitialMode = getInitialMode_(themeLocalStorageKey);

const saveMode_ = (themeLocalStorageKey: string) =>
  elif<PaletteOptions["mode"], void>(
    () => typeof window !== "undefined",
    (mode: PaletteOptions["mode"]) =>
      window.localStorage.setItem(themeLocalStorageKey, mode),
    () => {}
  );

export const saveMode = saveMode_(themeLocalStorageKey);
