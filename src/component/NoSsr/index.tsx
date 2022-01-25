import React, { FC } from "react";
//import NoSsr from "@mui/material/NoSsr";

const NoSsr: FC<{ children: any; fallback?: any }> = ({
  children,
  fallback,
}) => {
  const isSsr = typeof window === "undefined";

  if (isSsr === true) {
    if (fallback !== undefined) return fallback;
    return null;
  }

  return children;
};

export default NoSsr;
