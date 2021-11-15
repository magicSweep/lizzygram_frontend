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
};

export const useDescriptionForm = ({
  register,
  formState,
}: DescriptionFormProps) => {
  const { ref, onChange, onBlur } = register("desc", {
    validate: (val: any) => {
      console.log("VALIDATE", val);
      if (val !== undefined && val.length > 2000) return "Слишком длинно...";
      return true;
    },
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
