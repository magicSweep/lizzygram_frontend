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
