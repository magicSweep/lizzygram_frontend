import { Action, Reducer } from "redux";
import { AlertState, AlertAction, AlertProps } from "./../../types";

const alertInitialState: AlertState = {
  /* isShow: false,
  type: "info",
  message: "", */
  items: [],
};

let count = 0;

const reducer: Reducer<AlertState, AlertAction> = (
  state = alertInitialState,
  action: AlertAction
) => {
  switch (action.type) {
    /*  case "SHOW_ALERT":
      count++;
      let isExistHideAlert = false;
      const newItems = state.items.map((item) => {
        if (item.open === false && isExistHideAlert === false) {
          isExistHideAlert = true;
          return {
            ...item,
            open: true,
            type: action.alertType as AlertProps["type"],
            message: action.message as string,
          };
        }

        return item;
      });

      if (isExistHideAlert === false) {
        newItems.push({
          id: count,
          open: true,
          type: action.alertType as AlertProps["type"],
          message: action.message as string,
        });
      }

      return {
        items: newItems,
      }; */
    case "SHOW_ALERT":
      count++;
      return {
        items: [
          ...state.items,
          {
            id: count,
            open: true,
            type: action.alertType as AlertProps["type"],
            message: action.message as string,
          },
        ],
      };

    case "HIDE_ALERT":
      /*  return {
        items: state.items.map((item) => {
          if (item.id === action.id) {
            return { ...item, open: false };
          }
          return item;
        }),
      }; */
      return {
        items: state.items.map((item) => {
          if (item.id === action.id) {
            return { ...item, open: false };
          }
          return item;
        }),
      };

    case "DELETE_ALERT":
      /*  return {
           items: state.items.map((item) => {
             if (item.id === action.id) {
               return { ...item, open: false };
             }
             return item;
           }),
         }; */
      return {
        items: state.items.filter((item) => item.id !== action.id),
      };
    default:
      return state;
  }
};

export default reducer;
