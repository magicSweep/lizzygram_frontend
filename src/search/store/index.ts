import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState, SearchTerms } from "./../types";
import { hasTrueValue } from "../../utils/other";

export const initialState: SearchState = {
  terms: {
    tags: undefined,
    age: -1,
    mine: false,
    favorites: false,
  },
  showForm: false,
  isSearch: false,
};

const isSearch = (terms: SearchTerms) => {
  return (
    terms.age !== -1 ||
    terms.mine !== false ||
    terms.favorites !== false ||
    (terms.tags !== undefined && hasTrueValue(terms.tags))
  );
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerms(state, action: PayloadAction<SearchTerms>) {
      state.terms = action.payload;
      state.isSearch = isSearch(action.payload);
    },
    resetSearchTerms(state) {
      state.terms = initialState.terms;
      state.isSearch = false;
    },
    showSearchForm(state) {
      state.showForm = true;
    },
    hideSearchForm(state) {
      state.showForm = false;
    },
  },
});

export const {
  setSearchTerms: setSearchTermsAC,
  resetSearchTerms: resetSearchTermsAC,
  showSearchForm: showSearchFormAC,
  hideSearchForm: hideSearchFormAC,
} = searchSlice.actions;

export default searchSlice.reducer;
