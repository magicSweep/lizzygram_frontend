import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { useForm } from "react-hook-form";
import FavoritesCheckbox from ".";

export default {
  component: FavoritesCheckbox,
  title: "Search/Form Elements/FavoritesCheckbox",
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
  } = useForm();

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
      <FavoritesCheckbox
        disabled={false}
        label={"Избранные"}
        control={control}
      />
      <Box sx={{ textAlign: "center", p: "20px" }}>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};
