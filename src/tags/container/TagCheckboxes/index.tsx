import { FC, useCallback, useEffect } from "react";
import TagCheckboxesWidget, { TagCheckboxesProps } from "./TagCheckboxes";
import { useTags } from "../../hook/useTags";
import { validateTags } from "../../rules";
import { getInitTagsState } from "../../helper";

export type UseFormTagCheckboxesProps = TagCheckboxesProps & {
  getValues: any;
  setValue: any;
  register: any;
  watch: any;
};

export const useFormTagsCheckboxes = (
  getValues: any,
  setValue: any,
  register: any,
  watch: any
) => {
  const { tags, error, loading } = useTags();

  const onChange = useCallback((event: any) => {
    const tagsState = getValues("tags");

    const newState = {
      ...tagsState,
      [event.target.value]: event.target.checked,
    };

    //console.log("[ON CHANGE]", tagsState, event.target, newState);

    //clearErrors("tags");
    setValue("tags", newState);
  }, []);

  register("tags", {
    validate: validateTags,
  });

  // SET INIT FORM TAGS STATE
  useEffect(() => {
    //console.log("TAGS STATE use effect");
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
  const tagsFormState = watch("tags");

  return {
    tagsState: { items: tags, error, loading },
    tagsFormState,
    onChange,
  };
};

export const TagCheckboxes: FC<UseFormTagCheckboxesProps> = ({
  getValues,
  setValue,
  register,
  watch,
  ...props
}) => {
  const otherProps = useFormTagsCheckboxes(
    getValues,
    setValue,
    register,
    watch
  );

  //console.log("[RENDER TAGS CHECKBOX] ");

  return <TagCheckboxesWidget {...props} {...otherProps} />;
};

export default TagCheckboxes;

/* export const TagCheckboxes: FC<TagCheckboxesProps> = ({ ...props }) => {
  const { tags, error, loading } = useTags();

  //loading, data, queryError, tagsState
  console.log("[RENDER TAGS CHECKBOX] ", tags, error, loading);

  return (
    <TagCheckboxesWidget
      tagsState={{ items: tags, error, loading }}
      {...props}
    />
  );
};

export default TagCheckboxes; */
