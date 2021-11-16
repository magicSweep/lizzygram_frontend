import { ThemeState } from "./theme/store/types";
import { AuthState } from "./auth/types";
import { TagsState } from "./tags/types";
import { PhotosState } from "./photos/types";
import { SearchState } from "./search/types";
import { AlertState } from "./alert/types";

export interface GlobalState {
  /* modal: IModalState; */
  alert: AlertState;

  photos: PhotosState;
  search: SearchState;
  auth: AuthState;
  tags: TagsState;
  theme: ThemeState;
}

export type Size = { width: number; height: number };

export type StyleSize = { width: string; height: string };
