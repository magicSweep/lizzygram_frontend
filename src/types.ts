import { ThemeState } from "./theme/store/types";
import { AuthState } from "./auth/types";

export interface GlobalState {
  /* modal: IModalState;
    alert: IAlertState;
    
    tags: ITagsState;
    photos: IPhotosState;
    search: ISearchState; */
  auth: AuthState;
  theme: ThemeState;
}
