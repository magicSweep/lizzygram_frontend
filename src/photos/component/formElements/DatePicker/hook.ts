import { useCallback } from "react";
import {
  FieldValues,
  UseFormRegister,
  FormState,
  UseFormWatch,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";

export type DatePickerFormProps = {
  clearErrors: UseFormClearErrors<any>;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  formState: FormState<FieldValues>;
  validate: ((val?: any) => string | boolean) | undefined;
};

export const useDatePickerForm = ({
  clearErrors,
  setValue,
  register,
  watch,
  formState,
  validate,
}: DatePickerFormProps) => {
  const onChange = useCallback((newValue: any) => {
    clearErrors("date");
    setValue("date", newValue);
  }, []);

  register("date", {
    validate,
  });

  // GET VALUES FROM FORM STATE
  const value = watch("date");

  const error = formState.errors["date"];

  //console.log("ERROR", error);

  const isError = Boolean(error);

  const helperText = isError === true ? error.message : null;

  return {
    value,
    onChange,
    isError,
    helperText,
  };
};
