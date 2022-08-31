import React, { createContext } from "react";
import { useToken } from "../../hook/useToken";

export const TokenContext = createContext<ReturnType<typeof useToken>>(
  {} as any
);

export const TokenProvider = ({ children }) => {
  const token = useToken();

  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};
