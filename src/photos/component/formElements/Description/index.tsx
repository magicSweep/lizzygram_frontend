import { TextFieldProps } from "@mui/material/TextField";
import React, { FC } from "react";
import DescriptionWidget from "./Description";
import { useDescriptionForm, DescriptionFormProps } from "./hook";

export type DescriptionProps = DescriptionFormProps & {
  disabled: boolean;
};

const Description: FC<DescriptionProps> = ({ disabled, ...props }) => {
  const { ref, onChange, isError, helperText, onBlur } =
    useDescriptionForm(props);

  return (
    <DescriptionWidget
      error={isError}
      helperText={helperText}
      disabled={disabled}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Description;
