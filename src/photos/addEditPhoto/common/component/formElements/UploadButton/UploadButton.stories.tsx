import React, { useCallback } from "react";
import { Story } from "@storybook/react";
import UploadButton from ".";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

export default {
  component: UploadButton,
  title: "Photos/Form Elements/UploadButton",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
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

  /* const error = formState.errors["desc"];

  console.log("ERROR", error);

  const isError = Boolean(error);

  const helperText = isError === true ? error.message : null; */

  return (
    <form className="w-3/5 m-auto" onSubmit={handleSubmit(onSubmit)}>
      <UploadButton
        watch={watch}
        setValue={setValue}
        clearErrors={clearErrors}
        formState={formState}
        register={register}
        disabled={false}
        validate={() => true}
      />
      <Box sx={{ textAlign: "center", p: "20px" }}>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};

/* export const FullExample = () => {
  const {
    handleSubmit,
    formState,
    register,
    setValue,
    clearErrors,
    watch,
    getValues,
  } = useForm();

  /*  const onChange = useCallback((event: any) => {
    const newValue = event.target.file;
    clearErrors("photoFile");
    setValue("photoFile", newValue);
  }, []); /

  const { ref, ...field } = register("photoFile", {
    validate: (val: any) => {
      console.log("VALIDATE", val);
      // if (val !== undefined && val.length < 5) return "Too small...";
      return true;
    },
  });

  // GET VALUES FROM FORM STATE
  //const value = watch("photoFile");

  const onSubmit = (data: any) => console.log("[SUBMIT]", data);

  const error = formState.errors["photoFile"];

  console.log("ERROR", error);

  const isError = Boolean(error);

  const helperText = isError === true ? error.message : null;

  return (
    <form className="w-3/5 m-auto" onSubmit={handleSubmit(onSubmit)}>
      {/* <Description formState={formState} register={register} disabled={false} /> /}
      <UploadButton
        inputRef={ref}
        //onChange={onChange}
        {...field}
        error={isError}
        helperText={helperText}
      />
      <Box sx={{ textAlign: "center", p: "20px" }}>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
}; */

/* const Template: Story<UploadButtonProps> = (args) => <UploadButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "super-id",
  inputRef: undefined,
  error: false,
  disabled: false,
};

export const Success = Template.bind({});
Success.args = {
  id: "super-id",
  //success: true,
  label: "Добавить фоту",
  name: "photoFile",
  inputRef: undefined,
  error: false,
  disabled: false,
  helperText: "Вы добавили - hello.jpg",
};

export const Error = Template.bind({});
Error.args = {
  id: "super-id",

  label: "Добавить фоту",
  name: "photoFile",
  inputRef: undefined,
  error: true,
  disabled: false,
  helperText: "А где фота?",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "super-id",

  label: "Добавить фоту",
  name: "photoFile",
  inputRef: undefined,
  error: false,
  disabled: true,
  helperText: "А где фота?",
};
 */
