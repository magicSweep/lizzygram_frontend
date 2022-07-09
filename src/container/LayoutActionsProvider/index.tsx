import React, { createContext } from "react";
import { useLayoutActionsOnScroll } from "../../hook/useLayoutActionsOnScroll";

export const LayoutActionsContext = createContext<
  ReturnType<typeof useLayoutActionsOnScroll>
>({
  showElements: true,
  elevationAppBar: false,
});

export const LayoutActionsProvider = ({ children }) => {
  const state = useLayoutActionsOnScroll();

  /* const toggleTheme = () => {
    setState((state) => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
    }));
  }; */

  return (
    <LayoutActionsContext.Provider value={state}>
      {children}
    </LayoutActionsContext.Provider>
  );
};
