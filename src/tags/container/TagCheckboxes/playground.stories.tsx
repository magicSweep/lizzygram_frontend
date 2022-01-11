import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
//import { tagsData, state as initTagsState, defaultTagsIds } from "./data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TagCheckboxes from ".";
import { tagsValidate } from "../../rules";
import { useTags } from "../../hook/useTags";
import { getDefaultTagsFormState } from "../../helper";

export default {
  component: TagCheckboxes,
  title: "Tags/Playground",
  decorators: [
    (story: any) => (
      <Box width="600px" m="auto" pt="20px">
        {story()}
      </Box>
    ),
  ],
};

const Form = () => {
  const {
    handleSubmit,
    formState,
    register,
    setValue,
    clearErrors,
    watch,
    getValues,
  } = useForm();

  /*  const { tags } = useTags();

  const onChange = (event: any) => {
    const tagsState = getValues("tags");

    const newState = {
      ...tagsState,
      [event.target.value]: event.target.checked,
    };

    console.log("[ON CHANGE]", tagsState, event.target, newState);

    //clearErrors("tags");
    setValue("tags", newState);
  };

  register("tags", {
    validate: validateTags,
  });

  // SET INIT FORM TAGS STATE
  useEffect(() => {
    console.log("TAGS STATE use effect");
    if (tags !== undefined) {
      const tagsFormState = getInitTagsState(tags);
      //console.log("TAGS INIT STATE", tagsFormState);
      setValue("tags", tagsFormState, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  }, [tags]);

  // GET VALUES FROM FORM STATE
  const tagsFormState = watch("tags"); */
  useEffect(() => {
    return () => console.log("DESTROY ---");
  }, []);

  console.log("[RENDER FORM]", formState);

  const onSubmit = (data) => console.log("[SUBMIT]", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TagCheckboxes
        label="Опишите фото с помощью тэгов:"
        getValues={getValues}
        setValue={setValue}
        register={register}
        watch={watch}
        clearErrors={clearErrors}
        formState={formState}
        defaultTags={{
          vekwWqVY1yYRd3XeER12: true,
          ybrq9aFZlTk71akoH7Lz: true,
          WX6CY5kGx4FXvdZR6g8E: true,
        }}
        disabled={false}
        validate={tagsValidate}
      />

      <Box sx={{ textAlign: "center", p: "20px" }}>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};

export const Default = () => <Form />;

const BForm = () => {
  const { register, handleSubmit, getValues, watch, setValue } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  /*  const { onChange } = register("name", {
    onChange: (event: any) => {
      setValue("name", event.target.value);
    },
  }); */

  //const value = watch("name");

  console.log("[RENDER FORM]", getValues("variant"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        В каких годах произошли самые известные извержения вулкана Кракатау?
      </p>
      <p>
        <input
          type="checkbox"
          {...register("variant", {
            validate: (val: any) => {
              console.log("VALIEDATE", val);
              return true;
            },
          })}
          value={1417}
        />{" "}
        1417
      </p>
      <p>
        <input type="checkbox" {...register("variant")} value={1680} /> 1680
      </p>
      <p>
        <input type="checkbox" {...register("variant")} value={1883} /> 1883
      </p>
      <p>
        <input type="checkbox" {...register("variant")} value={1934} /> 1934
      </p>
      <p>
        <input type="checkbox" {...register("variant")} value={2010} /> 2010
      </p>
      <p>
        <input type="submit" value="Отправить" />
      </p>
    </form>
  );
};

/*  <form onSubmit={handleSubmit(onSubmit)}>
      <input value={value} onChange={onChange} placeholder="First name" />

      <input type="submit" />
    </form> */

export const NativeMultipleCheckboxes = () => <BForm />;

const FForm = () => {
  const { register, handleSubmit, getValues, watch, setValue } = useForm({
    defaultValues: { name: "" },
  });
  const onSubmit = (data) => alert(JSON.stringify(data));

  const onChange = (event: any) => {
    console.log("ON CHange", event.target.value);
    setValue(
      "name",
      event.target.value /*, {
      shouldTouch: true,
      shouldDirty: true,
    } */
    );
  };

  const firstName = register(
    "name" /*,  {
    onChange: (event: any) => {
      console.log("ON CHange", event.target.value);
      setValue("name", event.target.value, {
        shouldTouch: true,
        shouldDirty: true,
      });
    },
  } */
  );

  const value = watch("name");

  console.log("[RENDER FORM]");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input value={value} onChange={onChange} placeholder="First name" />

      <input type="submit" />
    </form>
  );
};

export const CustomField = () => <FForm />;
