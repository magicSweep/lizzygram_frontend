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
