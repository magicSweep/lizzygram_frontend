import { ThemeState } from "./theme/store/types";
import { AuthState } from "./auth/types";
import { TagsState } from "./tags/types";
//import { PhotosState } from "./photos/types";
import { LoadPhotosState } from "./photos/loadPhotos/types";
import { AddEditPhotoState } from "./photos/addEditPhoto/types";
import { SearchState } from "./search/types";
import { AlertState } from "./alert/types";
import { FavoriteState } from "./photos/favorite/types";
import { PhotoSliderState } from "./photos/photoSlider/types";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";

/* id: any;
    base64: string;
    files: string[];
    aspectRatio: number;
    srcSet: string;
    iconSrc: string;
    src: string;
    _timestamp: Date | FirestoreDate;
    description: string;
    date: T;
    yearsOld: number;
    tags: TagsData;
    googleDriveId: string;
    imageExtension: ImgExt;
    addedByUserUID: string;
    favoriteBy?: FavoriteData;
    isActive: boolean; */
export type Video = Omit<
  Photo<FirestoreDate>,
  | "base64"
  | "files"
  | "aspectRation"
  | "srcSet"
  | "iconsSrc"
  | "src"
  | "googleDriveId"
  | "imageExtension"
> & {
  thumbnailsUrl: string;
  videoId: string;
};

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
