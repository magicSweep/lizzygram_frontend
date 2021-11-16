//import { IModalState, IAlertState, ITagsState } from "./types";
import { ComponentProps } from "react";
import { Action } from "redux";
import Alert from "./container/Alerts/Alert";

// ACTIONS TYPES

export type AlertProps = Omit<
  ComponentProps<typeof Alert>,
  "onClose" | "children"
> & {
  id: number;
};

export type AlertActionTypes = "SHOW_ALERT" | "HIDE_ALERT" | "DELETE_ALERT";

// STATE INTERFACE

export interface AlertState {
  items: AlertProps[];
  /* isShow: boolean;
  type: AlertType;
  message: string; */
}

// ACTIONS
//export type AlertType = "error" | "success" | "info" | "warning";

export interface AlertAction extends Action<AlertActionTypes> {
  type: AlertActionTypes;
  alertType?: AlertProps["type"];
  message?: string;
  id?: number;
}
