import { Action, Reducer } from "redux";

export type LTagType = "where" | "withWho" | "feeling";
export type PTagType = "genre" | "details" | "where";
export type TagType = LTagType | PTagType;
//export type TagType = "where" | "withWho" | "feeling";

export interface TagCheckbox {
  title: string;
  name: string;
  type: TagType;
}

export interface TagData extends TagCheckbox {
  id: string;
}

export type TagsFormState = { [id: string]: boolean };

export type FirestoreTagsData = { [id: string]: boolean };

// STORE

export type TagsActionTypes =
  | "TAGS_REQUEST_START"
  | "TAGS_REQUEST_SUCCESS"
  | "TAGS_REQUEST_ERROR";

export interface TagsState {
  items: TagData[] | undefined;
  loading: boolean;
  error: boolean;
}

export interface TagsAction extends Action<TagsActionTypes> {
  type: TagsActionTypes;
  items?: TagData[];
}

/* export interface TagsDb {
  getTags: () => Promise<TagData[]>;
} */
