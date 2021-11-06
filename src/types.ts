import { ThemeState } from "./theme/store/types";
import { AuthState } from "./auth/types";
import { TagsState } from "./tags/types";

export interface GlobalState {
  /* modal: IModalState;
    alert: IAlertState;
    
    
    photos: IPhotosState;
    search: ISearchState; */
  auth: AuthState;
  tags: TagsState;
  theme: ThemeState;
}

export type Size = { width: number; height: number };

export type StyleSize = { width: string; height: string };
