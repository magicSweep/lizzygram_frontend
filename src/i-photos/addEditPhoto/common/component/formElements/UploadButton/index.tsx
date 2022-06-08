import { TextFieldProps } from "@mui/material/TextField";
import React, { FC } from "react";
import UploadButtonWidget from "./../../../../../../component/formElements/UploadButton";
import { useUploadBtnForm, UploadBtnFormProps } from "./hook";

export type DescriptionProps = UploadBtnFormProps & {
  disabled: boolean;
};

const UploadButton: FC<DescriptionProps> = ({ disabled, ...props }) => {
  const { ref, fields, files, isError, helperText } = useUploadBtnForm(props);

  return (
    <UploadButtonWidget
      inputRef={ref}
      error={isError}
      fileList={files}
      /*  value={value}
      onChange={onChange} */
      helperText={helperText}
      disabled={disabled}
      {...fields}
    />
  );
};

export default UploadButton;
