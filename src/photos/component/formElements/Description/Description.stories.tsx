import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Description from ".";

export default {
  component: Description,
  title: "Photos/Form Elements/Description",
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

  /* const onChange = useCallback((event: any) => {
    const newValue = event.target.value;
    clearErrors("desc");
    setValue("desc", newValue);
  }, []); */
  /* 
  const { ref, onChange } = register("desc", {
    validate: (val: any) => {
      console.log("VALIDATE", val);
      if (val !== undefined && val.length < 5) return "Too small...";
      return true;
    },
  }); */

  // GET VALUES FROM FORM STATE
  //const value = watch("desc");

  const onSubmit = (data: any) => console.log("[SUBMIT]", data);

  /* const error = formState.errors["desc"];

  console.log("ERROR", error);

  const isError = Boolean(error);

  const helperText = isError === true ? error.message : null; */

  return (
    <form className="w-3/5 m-auto" onSubmit={handleSubmit(onSubmit)}>
      <Description
        formState={formState}
        register={register}
        validate={() => true}
        disabled={false}
      />
      <Box sx={{ textAlign: "center", p: "20px" }}>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};
