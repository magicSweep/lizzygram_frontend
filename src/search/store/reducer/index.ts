import { SearchState, SearchAction, SearchTerms } from "./../../types";
import { Reducer } from "redux";
//import { FirestoreTagsData } from "./../../../tags/types";
import { hasTrueValue } from "../../../utils/other";

export const initSearchState: SearchState = {
  terms: {
    tags: undefined,
    age: -1,
  },
  showForm: false,
  isSearch: false,
};

const isSearch = (terms: SearchTerms) => {
  return (
    terms.age !== -1 || (terms.tags !== undefined && hasTrueValue(terms.tags))
  );
};

const reducer: Reducer<SearchState, SearchAction> = (
  state = initSearchState,
  action
) => {
  switch (action.type) {
    case "SET_SEARCH_TERMS":
      if (!action.terms) throw new Error("No search state on action");
      return {
        ...state,
        terms: { ...action.terms },
        isSearch: isSearch(action.terms),
      };

    case "RESET_SEARCH_TERMS":
      return {
        ...initSearchState,
        terms: {
          ...initSearchState.terms,
        },
      };

    case "SHOW_SEARCH_FORM":
      return {
        ...state,
        showForm: true,
      };

    case "HIDE_SEARCH_FORM":
      return {
        ...state,
        showForm: false,
      };

    default:
      return state;
  }
};

export default reducer;
