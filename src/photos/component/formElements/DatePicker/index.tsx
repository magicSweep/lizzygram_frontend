import React, { FC } from "react";
import { useDatePickerForm, DatePickerFormProps } from "./hook";
import DatePickerWidget from "./DatePicker";
import TextField from "@mui/material/TextField";

export type DatePickerProps = DatePickerFormProps & {
  disabled: boolean;
};

const DatePicker: FC<DatePickerProps> = ({ disabled, ...props }) => {
  const { value, onChange, isError, helperText } = useDatePickerForm(props);

  return (
    <DatePickerWidget
      label="Когда сделан снимок"
      value={value}
      onChange={onChange}
      disabled={disabled}
      maxDate={new Date()}
      minDate={new Date("2018-07-08")}
      renderInput={(params) => (
        <TextField
          {...params}
          error={isError}
          name="date"
          fullWidth
          variant="standard"
          helperText={helperText}
        />
      )}
    />
  );
};

export default DatePicker;
