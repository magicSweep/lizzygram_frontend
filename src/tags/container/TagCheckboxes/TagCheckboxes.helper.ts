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
import { TagDataGroupedByType } from "./TagCheckboxes";
import { tagsData } from "../../mock/data";
import { ButtonProps } from "@mui/material";

/* export const titleByTagType = (tagType: TagType): string => {
  switch (tagType) {
    case "feeling":
      return "Настроение";
    case "where":
      return "Где";
    case "withWho":
      return "С кем";
    case "genre":
      return "Жанр";
    case "details":
      return "Детали";

    default:
      throw new Error(`No implementation for type - ${tagType}`);
  }
}; */

export const makeGroupedTags = (tags: TagData[]) => {
  const tagsGrouped: TagDataGroupedByType[] = [];

  // {[type: TagType]: TagData[]}
  const tagsByType: { [type: string]: TagData[] } = {};

  for (let tag of tags) {
    if (tagsByType[tag.type] === undefined) {
      tagsByType[tag.type] = [];
    }

    tagsByType[tag.type].push(tag);
  }

  for (let type of Object.keys(tagsByType)) {
    tagsGrouped.push({
      type: type as TagType,
      tags: tagsByType[type],
    });
  }

  return tagsGrouped;
};
