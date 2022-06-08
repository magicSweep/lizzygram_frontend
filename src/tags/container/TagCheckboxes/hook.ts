import {
  FieldValues,
  UseFormRegister,
  FormState,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
  UseFormGetValues,
} from "react-hook-form";
import useTags from "../../hook/useTags";
import { useCallback, useEffect, useRef, MutableRefObject } from "react";
import { getDefaultTagsFormState } from "../../helper";
import { TagsFormState } from "../../types";

export type UseFormTagCheckboxesProps = {
  clearErrors: UseFormClearErrors<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  formState: FormState<any>;
  defaultTags: { [name: string]: boolean } | undefined;
  validate: ((val?: any) => string | boolean) | undefined;
};

export const useFormTagsCheckboxes = ({
  getValues,
  setValue,
  register,
  watch,
  formState,
  clearErrors,
  defaultTags,
  validate,
}: UseFormTagCheckboxesProps) => {
  const { tags, error: fetchError, loading } = useTags();

  const onChange = useCallback((event: any) => {
    const tagsState = getValues("tags");

    const newState = {
      ...tagsState,
      [event.target.value]: event.target.checked,
    };

    //console.log("[ON CHANGE]", tagsState, event.target, newState);

    clearErrors("tags");
    setValue("tags", newState);
  }, []);

  register("tags", {
    validate,
  });

  // SET INIT FORM TAGS STATE
  useEffect(() => {
    //console.log("TAGS STATE use effect");
    if (tags !== undefined) {
      const tagsFormState = getDefaultTagsFormState(tags, defaultTags);
      //console.log("TAGS STATE use effect");
      setValue("tags", tagsFormState, {
        shouldValidate: false,
        shouldDirty: true,
        //shouldTouch: true,
      });
    }
  }, [tags]);

  ///////////////////////////
  // this cicle is made cause we can render field if we
  const defaultTagsFormState: MutableRefObject<TagsFormState | undefined> =
    useRef();

  if (defaultTagsFormState.current === undefined && tags !== undefined) {
    defaultTagsFormState.current = getDefaultTagsFormState(tags, defaultTags);
  }
  /////////////////////////////

  // GET VALUES FROM FORM STATE
  const tagsFormState = watch("tags", defaultTagsFormState.current);

  //console.log("[USE FORM TAGS CHECKBOX] ", defaultTagsFormState.current);

  const error = formState.errors["tags"];

  //console.log("TAGS USE EFFECT", error);

  const isError = Boolean(error);

  const helperText = isError === true ? error.message : null;

  return {
    tagsState: { items: tags, error: fetchError, loading },
    tagsFormState,
    handleChange: onChange,
    isFormError: isError,
    helperText,
  };
};
