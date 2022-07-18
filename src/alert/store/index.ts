import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertState, AlertProps } from "./../types";

const initialState: AlertState = {
  /* isShow: false,
  type: "info",
  message: "", */
  items: [],
};

let count = 0;

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(
      state,
      action: PayloadAction<{ alertType: AlertProps["type"]; message: string }>
    ) {
      state.items.push({
        id: count,
        open: true,
        type: action.payload.alertType,
        message: action.payload.message,
      });
    },
    hideAlert(state, action: PayloadAction<number>) {
      const alert = state.items.find((alert_) => alert_.id === action.payload);
      (alert as AlertProps).open = false;
      /* state.items = state.items.map((item) => {
            if (item.id === action.payload) {
              return { ...item, open: false };
            }
            return item;
          }) */
    },
    deleteAlert(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  showAlert: showAlertAC,
  hideAlert: hideAlertAC,
  deleteAlert: deleteAlertAC,
} = alertSlice.actions;

export default alertSlice.reducer;
