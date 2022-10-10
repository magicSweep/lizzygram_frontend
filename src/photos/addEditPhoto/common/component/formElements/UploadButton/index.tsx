import { TextFieldProps } from "@mui/material/TextField";
import React, { FC } from "react";
import UploadButtonWidget from "./../../../../../../component/formElements/UploadButton";
import { useUploadBtnForm, UploadBtnFormProps } from "./hook";

export { fieldName } from "./hook";

export type UploadButtonProps = UploadBtnFormProps & {
  disabled: boolean;
};

const UploadButton: FC<UploadButtonProps> = ({ disabled, ...props }) => {
  const { ref, fields, files, isError, helperText } = useUploadBtnForm(props);

  return (
    <UploadButtonWidget
      inputRef={ref}
      error={isError}
      fileList={files}
      /*  value={value}
      onChange={onChange} */
      helperText={helperText as any}
      disabled={disabled}
      {...fields}
    />
  );
};

export default UploadButton;
