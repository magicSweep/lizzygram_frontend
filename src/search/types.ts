import { Action } from "redux";
import { FirestoreTagsData, TagsFormState } from "./../tags/types";

export interface SearchTerms {
  tags?: FirestoreTagsData;
  age: number;
}

export type SearchPhotoFormData = {
  age: string;
  tags: TagsFormState;
};

export interface SearchState {
  terms: SearchTerms;
  showForm: boolean;
  isSearch: boolean;
}

export type SearchActionTypes =
  | "SET_SEARCH_TERMS"
  | "RESET_SEARCH_TERMS"
  | "SHOW_SEARCH_FORM"
  | "HIDE_SEARCH_FORM";

export interface SearchAction extends Action<SearchActionTypes> {
  type: SearchActionTypes;
  terms?: SearchTerms;
  showForm?: boolean;
}
