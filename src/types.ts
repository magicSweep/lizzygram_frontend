import { ThemeState } from "./theme/store/types";
import { AuthState } from "./auth/types";
import { TagsState } from "./tags/types";
//import { PhotosState } from "./photos/types";
import { LoadPhotosState } from "./i-photos/loadPhotos/types";
import { AddEditPhotoState } from "./i-photos/addEditPhoto/types";
import { SearchState } from "./search/types";
import { AlertState } from "./alert/types";
import { FavoriteState } from "./i-photos/favorite/types";
import { PhotoSliderState } from "./i-photos/photoSlider/types";

export interface GlobalState {
  /* modal: IModalState; */
  alert: AlertState;
  loadPhotos: LoadPhotosState;
  addEditPhoto: AddEditPhotoState;
  //photos: PhotosState;
  search: SearchState;
  auth: AuthState;
  tags: TagsState;
  theme: ThemeState;
  favorite: FavoriteState;
  photoSlider: PhotoSliderState;
}

export type Size = { width: number; height: number };

export type StyleSize = { width: string; height: string };
