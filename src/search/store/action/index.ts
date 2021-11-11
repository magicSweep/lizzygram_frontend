import { SearchTerms, SearchAction } from "../../types";

export const setSearchTermsAC = (terms: SearchTerms): SearchAction => {
  return {
    type: "SET_SEARCH_TERMS",
    terms,
  };
};

export const resetSearchTermsAC = (): SearchAction => {
  return {
    type: "RESET_SEARCH_TERMS",
  };
};

export const showSearchFormAC = (): SearchAction => {
  return {
    type: "SHOW_SEARCH_FORM",
  };
};

export const hideSearchFormAC = (): SearchAction => {
  return {
    type: "HIDE_SEARCH_FORM",
  };
};
