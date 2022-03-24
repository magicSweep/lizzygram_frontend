import { useCallback } from "react";
import {
  FieldValues,
  UseFormRegister,
  FormState,
  UseFormWatch,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";

export type AgeSelectFormProps = {
  clearErrors: UseFormClearErrors<any>;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  formState: FormState<FieldValues>;
};

export const useAgeSelectForm = ({
  clearErrors,
  setValue,
  register,
  watch,
  formState,
}: AgeSelectFormProps) => {
  const onChange = useCallback((event: any) => {
    clearErrors("age");
    setValue("age", event.target.value);
  }, []);

  register("age");

  // GET VALUES FROM FORM STATE
  const value = watch("age");

  const error = formState.errors["age"];

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
