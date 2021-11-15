import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { FC } from "react";

const Description: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      id="desc-123"
      label="Необязательный комментарий"
      /*  error={formErrors.desc ? true : false}
        helperText={formErrors.desc && formErrors.desc.message}
        disabled={uploadLoading === true} */
      fullWidth
      multiline
      rows={3}
      variant="outlined"
      name={"desc"}
      {...props}
      /*  inputRef={descProps.ref}
        onChange={descProps.onChange}
        onBlur={descProps.onBlur} */
    />
  );
};

export default Description;
