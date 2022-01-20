import React, { FC, useCallback, useEffect } from "react";
import TagCheckboxesWidget from "./TagCheckboxes";
import { UseFormTagCheckboxesProps, useFormTagsCheckboxes } from "./hook";

export const TagCheckboxes: FC<
  UseFormTagCheckboxesProps & { label: string; disabled: boolean }
> = ({ label, disabled, ...props }) => {
  const otherProps = useFormTagsCheckboxes(props);

  console.log("[RENDER TAGS CHECKBOX] ");

  return (
    <TagCheckboxesWidget label={label} disabled={disabled} {...otherProps} />
  );
};

export default TagCheckboxes;
