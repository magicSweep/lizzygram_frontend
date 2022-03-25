import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { useCallback, FC } from "react";
import { useForm, Controller, Control } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MineCheckbox from ".";

export default {
  component: MineCheckbox,
  title: "Search/Form Elements/MineCheckbox",
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
    control,
  } = useForm({
    defaultValues: {
      mine: true,
    },
  });

  /* const onChange = useCallback((event: any) => {
    const newValue = event.target.value;
    clearErrors("age");
    setValue("age", newValue);
  }, []);

  register("age", {
    validate: (val: any) => {
      console.log("VALIDATE", val);
      return true;
    },
  }); */

  /* const { ref, ...fields } = register("age", {
    validate: (val: any) => {
      console.log("VALIDATE", val);
      return true;
    },
  }); */

  // GET VALUES FROM FORM STATE
  //const value = watch("age");

  const onSubmit = (data: any) => console.log("[SUBMIT]", data);

  /* const error = formState.errors["age"];

  console.log("ERROR", error);

  const isError = Boolean(error);

  const helperText = isError === true ? error.message : null; */

  return (
    <form className="w-3/5 m-auto" onSubmit={handleSubmit(onSubmit)}>
      <MineCheckbox
        /* register={register}
        setValue={setValue}
        watch={watch} */
        disabled={false}
        label={"Мои фотки"}
        control={control}
      />
      <Box sx={{ textAlign: "center", p: "20px" }}>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};
