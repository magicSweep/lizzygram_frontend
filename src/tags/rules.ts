import { compose, elif, tap } from "fmagic";
import { TagsFormState } from "./types";

// tagsState = {tags: string[]}

/* export const validateTags = compose<TagsFormState, boolean | string>(
  tap(() => console.log("[VALIDATE TAGS]")),
  elif(
    ({ tags }: TagsFormState) => Array.isArray(tags),
    ({ tags }: TagsFormState) => tags.length > 0,
    () => false
  ),
  (isTap: boolean) => isTap || "Добавьте хотя бы один тэг."
);
*/
const hasTrueValue = (obj: any) => {
  for (let prop in obj) {
    if (obj[prop] === true) return true;
  }

  return false;
};

export const tagsValidate = compose<TagsFormState, boolean | string>(
  elif(
    (tags?: TagsFormState) => typeof tags === "object",
    hasTrueValue,
    () => false
  ),
  (isTap: boolean) => isTap || "Добавьте хотя бы один тэг."
);

export const tagsRules = {
  validate: tagsValidate,
};
