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
  register: UseFormRegister<any>;
  formState: FormState<any>;
  validate: ((val?: any) => string | boolean) | undefined;
};

export const fieldName = "desc";

export const useDescriptionForm = ({
  register,
  formState,
  validate,
}: DescriptionFormProps) => {
  const { ref, onChange, onBlur } = register(fieldName, {
    validate,
  });

  const error = formState.errors[fieldName];

  //console.log("ERROR", error);

  const isError = Boolean(error);

  const helperText = isError === true ? (error as any).message : null;

  return {
    ref,
    onChange,
    isError,
    helperText,
    onBlur,
    fieldName,
  };
};
