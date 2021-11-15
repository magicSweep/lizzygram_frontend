import {
  FieldValues,
  UseFormRegister,
  FormState,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
  UseFormGetValues,
} from "react-hook-form";
import { useTags } from "../../hook/useTags";
import { useCallback, useEffect } from "react";
import { getDefaultTagsFormState } from "../../helper";

export type UseFormTagCheckboxesProps = {
  clearErrors: UseFormClearErrors<any>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  formState: FormState<FieldValues>;
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
}) => {
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
      console.log("TAGS STATE use effect", tagsFormState);
      setValue("tags", tagsFormState, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  }, [tags]);

  // GET VALUES FROM FORM STATE
  const tagsFormState = watch("tags");

  const error = formState.errors["tags"];

  console.log("TAGS USE EFFECT", error);

  const isError = Boolean(error);

  const helperText = isError === true ? error.message : null;

  return {
    tagsState: { items: tags, error: fetchError, loading },
    tagsFormState,
    onChange,
    isFormError: isError,
    helperText,
  };
};
