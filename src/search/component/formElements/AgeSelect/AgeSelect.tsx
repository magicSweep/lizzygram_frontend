import React, { FC } from "react";
import { makeOptionsForAgeSelect, IOption } from "./helper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

export interface ISelectProps extends SelectProps {
  //options: IOption[];
  //inputRef?: any;
  helperText?: string;
  error?: boolean;
}

const getMenuItems = (options: IOption[]) => {
  const menuItems: any[] = [];

  options.forEach((option, index) => {
    menuItems.push(
      <MenuItem value={option.value} key={option.value + index}>
        {option.label}
      </MenuItem>
    );
  });

  return menuItems;
};

const optionsInfo = makeOptionsForAgeSelect();

const menuItems = getMenuItems(optionsInfo);

const AgeSelect: FC<ISelectProps> = ({ helperText, error, ...props }) => {
  //console.log("AGE SELECT");

  return (
    <FormControl fullWidth error={error}>
      <InputLabel
        id={`${props.id !== undefined ? props.id : "duper-select1234"}-label`}
      >
        Возраст Лизы на фото:
      </InputLabel>
      <Select
        labelId={`${
          props.id !== undefined ? props.id : "duper-select1234"
        }-label`}
        fullWidth
        name="age"
        variant="standard"
        {...props}
        //id={id}
        /* open={open} */
        /*  onClose={handleClose}
          onOpen={handleOpen} */
        //value={value}
        //onChange={onChange as any}
      >
        {menuItems}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default AgeSelect;
