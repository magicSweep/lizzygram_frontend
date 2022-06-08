//import { DatePicker } from "@mui/lab";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import { compose, tap, cond } from "fmagic";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from ".";

export default {
  component: DatePicker,
  title: "Photos/Form Elements/DatePicker",
};

export const Default = () => {
  const {
    handleSubmit,
    formState,
    register,
    setValue,
    clearErrors,
    watch,
    getValues,
  } = useForm();

  const onSubmit = (data: any) => console.log("[SUBMIT]", data);

  return (
    <form className="w-3/5 m-auto" onSubmit={handleSubmit(onSubmit)}>
      <DatePicker
        clearErrors={clearErrors}
        setValue={setValue}
        register={register}
        watch={watch}
        formState={formState}
        disabled={false}
        validate={() => true}
      />
      <Box sx={{ textAlign: "center", p: "20px" }}>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};

/* export const Test = () => {
  const {
    handleSubmit,
    formState,
    register,
    setValue,
    clearErrors,
    watch,
    getValues,
  } = useForm();

  const onChange = useCallback((newValue: any) => {
    clearErrors("date");
    setValue("date", newValue);
  }, []);

  const { ref } = register("date", {
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

  const onSubmit = (data: any) => console.log("[SUBMIT]", data);

  const error = formState.errors["date"];

  console.log("ERROR", error);

  const isError = Boolean(error);

  const helperText = isError === true ? error.message : null;

  return (
    <form className="w-3/5 m-auto" onSubmit={handleSubmit(onSubmit)}>
      <DatePicker
        label="Когда сделан снимок"
        value={value}
        onChange={onChange}
        disabled={false}
        maxDate={new Date()}
        minDate={new Date("2018-07-08")}
        renderInput={(params) => (
          <TextField
            {...params}
            error={isError}
            name="date"
            fullWidth
            variant="standard"
            helperText={helperText}
          />
        )}
      />
      <Box sx={{ textAlign: "center", p: "20px" }}>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};
 */
