import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import AgeSelect from ".";

export default {
  component: AgeSelect,
  title: "Search/Form Elements/AgeSelect",
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
  } = useForm({
    defaultValues: {
      age: "-1",
    } as any,
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
      <AgeSelect
        clearErrors={clearErrors}
        setValue={setValue}
        register={register}
        watch={watch}
        formState={formState}
        disabled={false}
      />
      <Box sx={{ textAlign: "center", p: "20px" }}>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};
