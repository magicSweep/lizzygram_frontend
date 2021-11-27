import { FC } from "react";
//import PhotoCard from "../../../component/PhotoCard";
import PhotoCard from "../../../component/PhotoCard";
import PhotoCardSkeletons, {
  PhotoCardSkeleton,
} from "../../../component/PhotoCardSkeletons";
//import { numberOfPhotosPerQuery } from "../../../../../config";
//import classes from "./PhotoCards.module.scss";
//import Card from "@material-ui/core/Card";
import { Photo, FirestoreDate } from "../../../types";
import { getDoesRenderElements } from "./helper";

export interface PageProps {
  //tagsState: ITagsState;
  loading: boolean;
  pageHeight: number;
  numberOfPhotosByPage: number;
  pageIndex: number;
  numberOfPhotosPerQuery: number;
  isShowPhotoSlider: boolean;
  activeObservableIndex: number;
  photos: Photo<FirestoreDate>[];
  showPhotoSlider: (event: MouseEvent) => void;
  showEditPhotoForm: () => void;
  //showPhotoDesc: (photo: TPhotoData) => void;
  userUID: string;
  editedPhotoIds: string[];
  //numberOfAddedPhotos: number;
  hasNextPage: boolean;
  isLast: boolean;
  cardWidth: number;
  cardHeight: number;
}
