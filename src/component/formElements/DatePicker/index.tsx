import React, { FC } from "react";
//import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import ruLocale from "date-fns/locale/ru";

const DatePicker: FC<DatePickerProps> = (props) => {
  //const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <MuiDatePicker
        /* label="Helper text example"
         value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }} */
        {...props}
        mask="__.__.____"
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
