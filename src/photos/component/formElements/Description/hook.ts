import {
  FieldValues,
  UseFormRegister,
  FormState,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";

export type DescriptionFormProps = {
  //clearErrors: UseFormClearErrors<FieldValues>;
  //setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  formState: FormState<FieldValues>;
  validate: ((val?: any) => string | boolean) | undefined;
};

export const useDescriptionForm = ({
  register,
  formState,
  validate,
}: DescriptionFormProps) => {
  const { ref, onChange, onBlur } = register("desc", {
    validate,
  });

  const error = formState.errors["desc"];

  //console.log("ERROR", error);

  const isError = Boolean(error);

  const helperText = isError === true ? error.message : null;

  return {
    ref,
    onChange,
    isError,
    helperText,
    onBlur,
  };
};
