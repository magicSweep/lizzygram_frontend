import React, { FC } from "react";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

export type MineCheckboxProps = {
  disabled: boolean;
  label: string;
  control: Control<any>;
};

const FavoritesCheckbox: FC<any> = ({
  /* handleChange,
    checked, */
  disabled,
  label,
  control,
}) => {
  return (
    <Controller
      name={"favorites"}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          className="select-none"
          control={
            <Checkbox
              {...field}
              disabled={disabled}
              checked={field.value}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite color="secondary" />}
            />
          }
          disabled={disabled}
          label={label}
          labelPlacement="end"
        />
      )}
    />
  );
};

export default FavoritesCheckbox;
