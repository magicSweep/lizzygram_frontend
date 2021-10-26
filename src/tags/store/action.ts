import { TagsAction, TagData } from "./../types";

export const tagsRequestStartAC = (): TagsAction => {
  return {
    type: "TAGS_REQUEST_START",
  };
};

export const tagsRequestSuccessAC = (items: TagData[]): TagsAction => {
  return {
    type: "TAGS_REQUEST_SUCCESS",
    items,
  };
};

export const tagsRequestErrorAC = (): TagsAction => {
  return {
    type: "TAGS_REQUEST_ERROR",
  };
};
