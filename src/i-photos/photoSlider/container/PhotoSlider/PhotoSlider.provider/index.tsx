import React, { createContext } from "react";
import { usePhotoSlider } from "../../../hook/usePhotoSlider";

export const PhotoSliderContext = createContext<
  ReturnType<typeof usePhotoSlider>
>({} as any);

export const PhotoSliderProvider = ({ children }) => {
  const state = usePhotoSlider();

  /* const toggleTheme = () => {
    setState((state) => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
    }));
  }; */

  return (
    <PhotoSliderContext.Provider value={state}>
      {children}
    </PhotoSliderContext.Provider>
  );
};
