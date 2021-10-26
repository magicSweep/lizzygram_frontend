import React, { ComponentProps, FC } from "react";
import TagCheckbox from "../../component/TagCheckbox";
//import FormFieldWrapper from "../../../component/FormElements/UploadButton/FormFieldWrapper";
//import Typography, { TypographyProps } from "@mui/material/Typography";
import { BoxProps } from "@mui/material/Box";
import { numberOfTagsByType } from "../../../config";
import HeroTitle from "../../../component/HeroTitle";
import { TagsState, TagData, TagsFormState } from "../../types";
import TagSkeleton from "../../component/TagSkeleton";
import { tagTypeToColor } from "../../helper";
import FieldWrapper from "../../../component/FormElements/FieldWrapper";

export type TagCheckboxesProps = ComponentProps<"input"> & {
  tagsFormState?: TagsFormState;
  //onChange: any;
  //disabled: boolean;
  errors?: string[];
  label: string;
};

interface TagsGroupProps extends BoxProps {
  title: string;
  //error: boolean;
  // disabled: boolean;
}

const TagsGroup: FC<TagsGroupProps> = ({
  title,
  color,
  //error,
  //disabled,
  children,
}) => {
  return (
    <>
      <h5 className={`text-${color} text-left text-sm pl-3 select-none`}>
        {title}
      </h5>

      <ul className="flex flex-wrap justify-start pb-3 list-none last:pb-0">
        {children}
      </ul>
    </>
  );
};

const MainContainer: FC<any> = ({ error, children }) => (
  <div
    className={`
          px-4 pb-6 pt-10
          min-h-260
          rounded
          bg-paper
          ${error === true ? "border border-error" : "shadow"}
        `}
  >
    {children}
  </div>
);

const TagWrapper: FC<any> = ({ children }) => (
  <div className="mr-2 pt-3">{children}</div>
);

const makeCheckboxes = (
  handleChange: (event: any) => void,
  tagsState: TagsState,
  //tagsState: any,
  //error: boolean,
  disabled: boolean,
  state?: TagsFormState
) => {
  const feelingTagsElements: any[] = [];
  const withWhoTagsElements: any[] = [];
  const whereTagsElements: any[] = [];

  if (!tagsState.items) throw new Error("No items on tags state");

  tagsState.items.forEach((tagData: TagData, index: number) => {
    let element = (
      <TagWrapper key={tagData.id}>
        <TagCheckbox
          id={tagData.id + tagData.name}
          tagType={tagData.type}
          checked={state !== undefined ? state[tagData.id] : false}
          onChange={handleChange}
          name="tags"
          value={tagData.id}
          disabled={disabled}
          label={tagData.title}
        />
      </TagWrapper>
    );
    switch (tagData.type) {
      case "feeling":
        feelingTagsElements.push(element);
        break;
      case "where":
        whereTagsElements.push(element);
        break;
      case "withWho":
        withWhoTagsElements.push(element);
        break;

      default:
        throw new Error(`No implementation for tag type - ${tagData.type}`);
    }
  });

  return {
    feelingTagsElements,
    withWhoTagsElements,
    whereTagsElements,
  };
};

const makeSkeletons = () => {
  const elements: any[][] = [];

  for (let i in numberOfTagsByType) {
    elements[i] = [];

    for (let y = 0; y < numberOfTagsByType[i]; y++) {
      elements[i].push(
        <TagWrapper key={`skeleton_${i}_${y}`}>
          <TagSkeleton />
        </TagWrapper>
      );
    }
  }

  return {
    feelingTagsElements: elements[0],
    withWhoTagsElements: elements[1],
    whereTagsElements: elements[2],
  };
};

export const getCheckboxes = (
  handleChange: (event: any) => void,
  tagsState: TagsState,
  //tagsState: any,
  error: boolean,
  disabled: boolean,
  tagsFormState?: TagsFormState
) => {
  if (tagsState.error) {
    return (
      <MainContainer>
        <p className="text-center text-error pt-5">
          Упс, тэги не загрузились...
        </p>
      </MainContainer>
    );
  }

  let tagsElements: {
    feelingTagsElements: any[];
    withWhoTagsElements: any[];
    whereTagsElements: any[];
  };

  if (
    tagsState.loading ||
    //tagsState.error ||
    !tagsFormState ||
    !tagsState.items
    //state[items.keys()[0]] === undefined
  ) {
    tagsElements = makeSkeletons();
  } else if (tagsState.items && tagsState.items.length > 0) {
    tagsElements = makeCheckboxes(
      handleChange,
      tagsState,
      //tagsState: any,
      //error,
      disabled,
      tagsFormState
    );
  } else {
    throw new Error("No implementation for that situation");
  }

  return (
    <MainContainer error={error}>
      <TagsGroup
        color={
          error ? "error" : disabled ? "disabled" : tagTypeToColor("feeling")
        }
        title="Настроение:"
      >
        {tagsElements.feelingTagsElements}
      </TagsGroup>
      <TagsGroup
        color={
          error ? "error" : disabled ? "disabled" : tagTypeToColor("withWho")
        }
        title="С кем:"
      >
        {tagsElements.withWhoTagsElements}
      </TagsGroup>
      <TagsGroup
        color={
          error ? "error" : disabled ? "disabled" : tagTypeToColor("where")
        }
        title="Где:"
      >
        {tagsElements.whereTagsElements}
      </TagsGroup>
    </MainContainer>
  );
};

export const TagCheckboxes: FC<TagCheckboxesProps & { tagsState: TagsState }> =
  ({ tagsState, tagsFormState, onChange, disabled, errors, label }) => {
    const isError = errors !== undefined && errors.length > 0 ? true : false;

    const checkboxes = getCheckboxes(
      onChange,
      tagsState,
      isError,
      disabled === true,
      tagsFormState
    );

    //console.log("[TAG CHECKBOXES] RENDER", tagsState, tagsFormState);

    return (
      <FieldWrapper
        id="id"
        //@ts-ignore
        component="fieldset"
        className="border-none bg-paper rounded pt-5 pb-2 w-full"
        error={isError}
        disabled={disabled}
        helperText={isError === true ? errors[0] : ""}
      >
        <HeroTitle>{label}</HeroTitle>

        {checkboxes}
      </FieldWrapper>
    );
  };

export default TagCheckboxes;
