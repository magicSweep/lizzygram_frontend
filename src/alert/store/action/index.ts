//import { Color } from "@material-ui/lab/Alert";
import { AlertAction, AlertProps } from "./../../types";

export const showAlertAC = (
  message: string,
  type: AlertProps["type"]
): AlertAction => {
  return {
    type: "SHOW_ALERT",
    message,
    alertType: type,
  };
};

export const hideAlertAC = (id: number): AlertAction => {
  return {
    type: "HIDE_ALERT",
    id,
  };
};

export const deleteAlertAC = (id: number): AlertAction => {
  return {
    type: "DELETE_ALERT",
    id,
  };
};
