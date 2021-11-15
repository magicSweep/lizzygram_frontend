import { useCallback } from "react";
import {
  FieldValues,
  UseFormRegister,
  FormState,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  isFileInputEmpty,
  isValidFileFormat,
  maxFileSizeMB,
} from "./validation";

export type UploadBtnFormProps = {
  clearErrors: UseFormClearErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  formState: FormState<FieldValues>;
};

/* type FileInputValues =
  | {
      value: string;
      files: FileList;
    }
  | undefined
  | null;
 */
export const useUploadBtnForm = ({
  watch,
  register,
  formState,
  clearErrors,
  setValue,
}: UploadBtnFormProps) => {
  /* const onChange = useCallback((event: any) => {
    clearErrors("photoFile");
    setValue("photoFile", {
      value: event.target.value,
      files: event.target.files,
    });
  }, []); */

  const { ref, ...fields } = register("photoFile", {
    validate: (fileList: FileList | undefined | null) => {
      console.log("VALIDATE", fileList);
      if (fileList === undefined || fileList === null) return "А где фота?";

      if (fileList instanceof FileList !== true || fileList.length < 1)
        return "И где фота?";

      if (maxFileSizeMB(21, fileList[0].size) === false)
        return "Максимальный размер файла 21 Mb.";

      if (isValidFileFormat(["jpeg", "png", "jpg"], fileList[0].type) === false)
        return "Файл должен быть типа: jpeg, png, jpg";

      return true;
    },
  });

  const error = formState.errors["photoFile"];

  console.log("ERROR", error);

  const isError = Boolean(error);

  const helperText = isError === true ? error.message : null;

  /* const values:
    | {
        value: string;
        files: FileList;
      }
    | undefined = watch("photoFile"); */
  const files = watch("photoFile");

  return {
    ref,
    files,
    isError,
    helperText,
    fields,
  };
};
