import { Reducer, Action } from "redux";
import { TagsState, TagsAction } from "./../types";

const tagsInitialState: TagsState = {
  items: undefined,
  loading: true,
  error: false,
};

const reducer: Reducer<TagsState, TagsAction> = (
  state = tagsInitialState,
  action
) => {
  switch (action.type) {
    case "TAGS_REQUEST_START":
      return {
        items: undefined,
        loading: true,
        error: false,
      };
    case "TAGS_REQUEST_SUCCESS":
      return {
        items: action.items,
        loading: false,
        error: false,
      };
    case "TAGS_REQUEST_ERROR":
      return {
        items: undefined,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
