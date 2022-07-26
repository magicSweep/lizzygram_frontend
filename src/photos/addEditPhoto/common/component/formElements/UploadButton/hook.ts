import { useCallback } from "react";
import {
  FieldValues,
  UseFormRegister,
  FormState,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type UploadBtnFormProps = {
  clearErrors: UseFormClearErrors<any>;
  setValue: UseFormSetValue<any>;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  formState: FormState<any>;
  validate: ((val?: any) => string | boolean) | undefined;
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
  validate,
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
    validate,
  });

  const error = formState.errors["photoFile"];

  //console.log("ERROR", error);

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
