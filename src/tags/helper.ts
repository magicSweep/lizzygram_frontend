import { ButtonProps } from "@mui/material/Button";
import { TagType, TagData, TagsFormState } from "./types";
import { FirestoreTagsData } from "./types";

/* export const getDefaultTagsFormState = (
  //setInitState: (initState: TTagsFormState) => void | undefined,
  tagsData: TagData[],
  defaultTagsIds?: string[]
) => {
    const defaultState: TagsFormState = {};
    const length = defaultTagsIds ? defaultTagsIds.length : 0;
    tagsData.forEach((tag) => {
      if (length > 0 && defaultTagsIds.includes(tag.id)) {
        defaultState[tag.id] = true;
      } else {
        defaultState[tag.id] = false;
      }
    });
    //console.log("TAGS DEFAULT STATE", initState);
    //setInitState(initState);
    return defaultState;
}; */

export const getDefaultTagsFormState = (
  //setInitState: (initState: TTagsFormState) => void | undefined,
  tagsData: TagData[],
  tags?: { [name: string]: boolean }
) => {
  const defaultState: TagsFormState = {};

  tagsData.forEach((tag) => {
    if (tags === undefined) defaultState[tag.id] = false;
    else defaultState[tag.id] = tags[tag.id] === true ? true : false;
    /* if (defaultTagsIds.includes(tag.id)) {
        defaultState[tag.id] = true;
      } else {
        defaultState[tag.id] = false;
      } */
  });
  //console.log("TAGS DEFAULT STATE", initState);
  //setInitState(initState);
  return defaultState;
};

export const tagTypeToColor = (tagType: TagType): ButtonProps["color"] => {
  switch (tagType) {
    case "feeling":
      return "info";
    case "where":
      return "secondary";
    case "withWho":
      return "success";
    case "genre":
      return "primary";
    case "details":
      return "warning";

    default:
      throw new Error(`No implementation for type - ${tagType}`);
  }
};

// Return object keys that equals true
/* const trueKeys = (obj: { [key: string]: any }) => {
  const result: string[] = [];
  for (let key in obj) {
    if (obj[key] === true) result.push(key);
  }
  return result;
}; */

export const getDefaultTagsIds = (tags: FirestoreTagsData) => {
  const result: string[] = [];
  for (let tagId in tags) {
    if (tags[tagId] === true) result.push(tagId);
  }
  return result;
};
