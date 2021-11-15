import React, { FC } from "react";
import FormControl, { FormControlProps } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

export interface FieldWrapperProps extends FormControlProps {
  id: string;
  error: boolean;
  disabled: boolean;
  success?: boolean;
  helperText?: string;
  children: any;
}

const FieldWrapper: FC<FieldWrapperProps> = ({
  id,
  error,
  disabled,
  success,
  helperText,
  children,
  ...props
}) => {
  return (
    <FormControl error={error} disabled={disabled} {...props}>
      {children}
      <FormHelperText
        sx={{
          color:
            error !== true && disabled !== true && success === true
              ? "success.main"
              : undefined,
        }}
        id={`${id}-text`}
      >
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default FieldWrapper;
