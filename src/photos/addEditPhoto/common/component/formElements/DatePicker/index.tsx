import React, { FC } from "react";
import { useDatePickerForm, DatePickerFormProps } from "./hook";
import DatePickerWidget from "./../../../../../../component/formElements/DatePicker";
import TextField from "@mui/material/TextField";
import { maxDate, minDate } from "../../../../../../config";

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
      maxDate={maxDate}
      minDate={minDate}
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
