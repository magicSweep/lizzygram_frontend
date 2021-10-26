import { ButtonProps } from "@mui/material/Button";
import { TagType, TagData, TagsFormState } from "./types";
import { FirestoreTagsData } from "./types";

export const getInitTagsState = (
  //setInitState: (initState: TTagsFormState) => void | undefined,
  tagsData?: TagData[],
  defaultTagsIds?: string[]
) => {
  if (tagsData !== undefined) {
    const initState: TagsFormState = {};
    const length = defaultTagsIds ? defaultTagsIds.length : 0;
    tagsData.forEach((tag) => {
      if (length > 0 && defaultTagsIds.includes(tag.id)) {
        initState[tag.id] = true;
      } else {
        initState[tag.id] = false;
      }
    });
    //console.log("TAGS DEFAULT STATE", initState);
    //setInitState(initState);
    return initState;
  }
};

export const tagTypeToColor = (tagType: TagType): ButtonProps["color"] => {
  switch (tagType) {
    case "feeling":
      return "secondary";
    case "where":
      return "warning";
    case "withWho":
      return "success";

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
