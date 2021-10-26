import React, { FC, ComponentProps } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FieldWrapper from "./../FieldWrapper";

export interface UploadButtonProps extends ComponentProps<"input"> {
  id: string;
  label: string;
  inputRef: any;
  error: boolean;
  helperText?: string;
  fileList?: FileList;
}

const UploadButton: FC<UploadButtonProps> = ({
  id,
  fileList,
  label,
  //name,
  inputRef,
  error,
  disabled,
  helperText,
  ...props
}) => {
  let fHelperText = helperText;

  if (error === false && fileList !== undefined && fileList.length > 0) {
    if (fileList.length > 1) {
      throw new Error(`Multiple files not implemented`);
    }
    fHelperText = `Вы добавили файл - ${fileList[0].name}`;
  }

  //console.log("RENDER UPLOAD BUTTON", error);

  return (
    <FieldWrapper
      id={id}
      error={error}
      success={true}
      disabled={disabled}
      helperText={fHelperText}
    >
      <input
        ref={inputRef}
        //name={name}
        accept="image/*"
        className="hidden"
        id={id}
        type="file"
        disabled={disabled}
        {...props}
      />
      <Button
        //@ts-ignore
        component="label"
        htmlFor={id}
        color={error === true ? "error" : "primary"}
        startIcon={
          <AddIcon
            fontSize="small"
            color={
              error === true
                ? "error"
                : disabled === true
                ? "disabled"
                : "primary"
            }
          />
        }
        disabled={disabled}
        variant="outlined"
        size="small"
      >
        {label}
      </Button>
    </FieldWrapper>
  );
};

export default UploadButton;
