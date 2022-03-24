import React, { FC } from "react";
import { useAgeSelectForm, AgeSelectFormProps } from "./hook";
import AgeSelectWidget from "./AgeSelect";

export type DatePickerProps = AgeSelectFormProps & {
  disabled: boolean;
};

const AgeSelect: FC<DatePickerProps> = ({ disabled, ...props }) => {
  const { value, onChange, isError, helperText } = useAgeSelectForm(props);

  return (
    <AgeSelectWidget
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={isError}
      helperText={helperText}
    />
  );
};

export default AgeSelect;
