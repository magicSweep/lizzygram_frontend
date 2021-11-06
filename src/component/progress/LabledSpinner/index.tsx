import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LabledSpinner({
  label,
  isBackDrop,
  ...props
}: CircularProgressProps & { label?: string; isBackDrop: boolean }) {
  return (
    <div
      className={`
        absolute inset-0 flex justify-center items-center
        ${isBackDrop === true ? "bg-backdrop" : ""}
        `}
    >
      <Box
        className="px-4 py-3 flex flex-nowrap justify-center items-center rounded-md shadow-md"
        bgcolor="background.paper"
      >
        <CircularProgress size={20} thickness={2.8} {...props} />
        {label !== undefined && (
          <Box
            typography="body2"
            className="select-none pl-4"
            color="text.secondary"
          >
            {label}
          </Box>
        )}
      </Box>
    </div>
  );
}
