import React, { FC } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

export interface AlertProps {
  type: AlertColor;
  open: boolean;
  message: string;
  onClose: (event?: any) => void | undefined;
}

export const Alert: FC<AlertProps> = ({ type, open, message, onClose }) => {
  //console.log("[ALERT WIDGET] RENDER");

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    onClose(event);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={onClose}
        severity={type}
        elevation={6}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
