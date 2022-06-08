import { SearchTerms, SearchPhotoFormData } from "../../types";

export const isDiffSearchState = (
  prevSearchTerms: SearchTerms,
  data: SearchPhotoFormData
) => {
  // compare mine
  if (prevSearchTerms.mine !== data.mine) return true;

  // compare favorite
  if (prevSearchTerms.favorites !== data.favorites) return true;

  // compare age
  if (prevSearchTerms.age !== parseInt(data.age)) return true;

  // compare tags
  if (prevSearchTerms.tags === undefined) return true;

  for (let tagId in data.tags) {
    if (prevSearchTerms.tags[tagId] !== data.tags[tagId]) return true;
  }

  return false;
};
