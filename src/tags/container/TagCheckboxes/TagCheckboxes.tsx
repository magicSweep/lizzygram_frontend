import React, { ComponentProps, FC, useMemo, Fragment } from "react";
import TagCheckbox from "../../component/TagCheckbox";
//import FormFieldWrapper from "../../../component/FormElements/UploadButton/FormFieldWrapper";
//import Typography, { TypographyProps } from "@mui/material/Typography";
import { BoxProps } from "@mui/material/Box";
import { numberOfTagsByType, tagsTitleByType } from "../../../config";
import HeroTitle from "../../../component/HeroTitle";
import { TagsState, TagData, TagsFormState, TagType } from "../../types";
import TagSkeleton from "../../component/TagSkeleton";
import { tagTypeToColor } from "../../helper";
import FieldWrapper from "../../../component/formElements/FieldWrapper";
import { compose, cond, elif } from "fmagic";
import { makeGroupedTags } from "./TagCheckboxes.helper";

export const TagWrapper: FC<any> = ({ children }) => (
  <div className="mr-2 pt-3">{children}</div>
);

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
        {`${title}:`}
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
          shadow
          ${error === true ? "border border-error" : ""}
      `}
  >
    {children}
  </div>
);

const makeCheckboxElementsByType = (
  handleChange: (event: any) => void,
  groupedTags: TagCheckboxesData["groupedTags"],
  disabled: boolean,
  tagsFormState: TagsFormState
) => {
  const checkboxesByType: TagCheckboxesData["checkboxElements"] = [];

  for (let data of groupedTags) {
    let elements = [];

    for (let y = 0; y < data.tags.length; y++) {
      let tagData = data.tags[y];

      elements.push(
        <TagWrapper key={tagData.id}>
          <TagCheckbox
            id={tagData.id + tagData.name}
            tagType={tagData.type}
            checked={tagsFormState[tagData.id]}
            onChange={handleChange}
            name="tags"
            value={tagData.id}
            disabled={disabled}
            label={tagData.title}
          />
        </TagWrapper>
      );
    }

    checkboxesByType.push({
      type: data.type as TagType,
      jsxElements: elements,
    });
  }

  return checkboxesByType;
};

const makeSkeletonElementsByType =
  (): TagCheckboxesData["checkboxElements"] => {
    const skeletonsByType: TagCheckboxesData["checkboxElements"] = [];

    for (let data of numberOfTagsByType) {
      let elements = [];

      for (let y = 0; y < data.quantity; y++) {
        elements.push(
          <TagWrapper key={`skeleton_${data.type}_${y}`}>
            <TagSkeleton />
          </TagWrapper>
        );
      }

      skeletonsByType.push({
        type: data.type as TagType,
        jsxElements: elements,
      });
    }

    return skeletonsByType;
  };

//////////////////////////////

export type TagCheckboxesProps = ComponentProps<"input"> & {
  tagsFormState?: TagsFormState;
  label: string;
  tagsState: TagsState;
  handleChange: (event: any) => void;
  isFormError: boolean;
  helperText: string;
};

export type TagDataGroupedByType = {
  //title: string;
  type: TagType;
  tags: TagData[];
  //color: BoxProps["color"];
};

export type TagCheckboxesData = TagCheckboxesProps & {
  groupedTags: TagDataGroupedByType[] | null;
  jsxErrorElement?: any;
  // checkbox or skeletons
  checkboxElements?: {
    type: TagType;
    jsxElements: any[];
  }[];
  content?: any;
};

export const TagsError = () => (
  <p className="text-center text-error pt-5">Упс, тэги не загрузились...</p>
);

export const TagCheckboxes: FC<TagCheckboxesProps> = compose<
  TagCheckboxesProps,
  any
>(
  (props: TagCheckboxesProps) => ({
    ...props,
    groupedTags: useMemo(
      () =>
        props.tagsState.items === undefined
          ? null
          : makeGroupedTags(props.tagsState.items),
      [props.tagsState.items]
    ),
  }),
  cond<TagCheckboxesData, TagCheckboxesData>([
    [
      (data: TagCheckboxesData) => data.tagsState.error === true,
      (data: TagCheckboxesData) => ({
        ...data,
        jsxErrorElement: <TagsError />,
      }),
    ],
    [
      (data: TagCheckboxesData) =>
        data.tagsState.items === undefined ||
        data.tagsState.loading ||
        data.tagsFormState === undefined,
      (data: TagCheckboxesData) => ({
        ...data,
        checkboxElements: makeSkeletonElementsByType(),
      }),
    ],
    [
      (data: TagCheckboxesData) => data.tagsState.items !== undefined,
      (data: TagCheckboxesData) => ({
        ...data,
        checkboxElements: makeCheckboxElementsByType(
          data.handleChange,
          data.groupedTags,
          data.disabled,
          data.tagsFormState
        ),
      }),
    ],
  ]),
  elif(
    (data: TagCheckboxesData) => data.jsxErrorElement !== undefined,
    (data: TagCheckboxesData) => ({
      ...data,
      content: <MainContainer>{data.jsxErrorElement}</MainContainer>,
    }),
    (data: TagCheckboxesData) => ({
      ...data,
      content: (() => {
        const tagGroupElems = data.checkboxElements.map((tagGroup, i) => (
          <Fragment key={`${tagGroup.type}_${i}`}>
            <TagsGroup
              color={
                data.isFormError === true
                  ? "error"
                  : data.disabled
                  ? "disabled"
                  : tagTypeToColor(tagGroup.type)
              }
              title={tagsTitleByType[tagGroup.type]}
            >
              {tagGroup.jsxElements}
            </TagsGroup>
          </Fragment>
        ));

        return (
          <MainContainer error={data.isFormError}>
            {tagGroupElems}
          </MainContainer>
        );
      })(),
    })
  ),
  (data: TagCheckboxesData) => (
    <FieldWrapper
      id="id"
      //@ts-ignore
      component="fieldset"
      className={`
        pt-5 pb-2 w-full
        bg-paper
        border-none
      `}
      error={data.isFormError}
      disabled={data.disabled}
      helperText={data.helperText}
    >
      <HeroTitle>{data.label}</HeroTitle>

      {data.content}
    </FieldWrapper>
  )
);

/*   {
      const tagGroupElems = data.checkboxElements.map((tagGroup) => (
        <TagsGroup
          color={
            data.isFormError === true
              ? "error"
              : data.disabled
              ? "disabled"
              : tagTypeToColor(tagGroup.type)
          }
          title={tagsTitleByType[tagGroup.type]}
        >
          {tagGroup.jsxElements}
        </TagsGroup>
      ));

      return (
        <FieldWrapper
          id="id"
          //@ts-ignore
          component="fieldset"
          className={`
          pt-5 pb-2 w-full
          bg-paper
          border-none
        `}
          error={data.isFormError}
          disabled={data.disabled}
          helperText={data.helperText}
        >
          <HeroTitle>{data.label}</HeroTitle>

          <MainContainer error={data.isFormError}>
            {tagGroupElems}
          </MainContainer>
        </FieldWrapper>
      );
    } */

export default TagCheckboxes;
