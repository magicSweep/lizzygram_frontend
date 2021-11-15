import { useCallback } from "react";
import {
  FieldValues,
  UseFormRegister,
  FormState,
  UseFormWatch,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";
import { compose, tap, cond } from "fmagic";

export type DatePickerFormProps = {
  clearErrors: UseFormClearErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  formState: FormState<FieldValues>;
};

export const useDatePickerForm = ({
  clearErrors,
  setValue,
  register,
  watch,
  formState,
}: DatePickerFormProps) => {
  const onChange = useCallback((newValue: any) => {
    clearErrors("date");
    setValue("date", newValue);
  }, []);

  register("date", {
    validate: compose(
      tap((val) => console.log("VALIDATE", val)),
      cond([
        [
          (val: Date | undefined | null) => val === undefined || val === null,
          () => "Пожалуйста, укажите дату съемки, хотя бы примерно.",
        ],
        [
          (val: Date) => val.toString() === "Invalid Date",
          () => "Некорректная дата",
        ],
        [(val: Date) => val > new Date(), () => "Фотка сделана в будущем?"],
        [(val: Date) => val < new Date("2018-07-08"), () => "До дня рождения?"],
        [() => true, () => true],
      ])
    ),
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
