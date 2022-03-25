import React, { FC } from "react";
import { Controller, Control } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export type MineCheckboxProps = {
  disabled: boolean;
  label: string;
  control: Control<any>;
};

const MineCheckbox: FC<MineCheckboxProps> = ({
  /* handleChange,
    checked, */
  disabled,
  label,
  control,
}) => {
  return (
    <Controller
      name={"mine"}
      control={control}
      render={({ field }) => {
        return (
          <FormControlLabel
            className="select-none"
            control={
              <Checkbox
                checked={field.value}
                {...field}
                disabled={disabled}
                color="warning"
              />
            }
            disabled={disabled}
            label={label}
            labelPlacement="end"
          />
        );
      }}
    />
  );
};

export default MineCheckbox;
