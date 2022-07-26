import React, { createContext } from "react";
import { useWallOfPhotos } from "../../hook/useWallOfPhotos";

export const WallOfPhotosContext = createContext<
  ReturnType<typeof useWallOfPhotos>
>({} as any);

export const WallOfPhotosProvider = ({ children }) => {
  const state = useWallOfPhotos();

  /* const toggleTheme = () => {
    setState((state) => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
    }));
  }; */

  return (
    <WallOfPhotosContext.Provider value={state}>
      {children}
    </WallOfPhotosContext.Provider>
  );
};
