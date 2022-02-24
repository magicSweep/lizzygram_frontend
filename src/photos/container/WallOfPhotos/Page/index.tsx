import React, { FC } from "react";
import PhotoCard from "../../../component/PhotoCard";
import PhotoCardSkeletons, {
  PhotoCardSkeleton,
} from "../../../component/PhotoCardSkeletons";
//import { numberOfPhotosPerQuery } from "../../../../../config";
//import classes from "./PhotoCards.module.scss";
//import Card from "@material-ui/core/Card";
//import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { getDoesRenderElements } from "./helper";
//import { compose } from "fmagic";
import PhotoCards, { PhotoCardsProps } from "../PhotoCards";
import { Box } from "@mui/system";

export type PageProps = PhotoCardsProps & {
  //tagsState: ITagsState;
  loading: boolean;
  pageHeight: number;
  numberOfPhotosByPage: number;
  pageIndex: number;
  //numberOfPhotosPerQuery: number;
  isShowPhotoSlider: boolean;
  activeObservableIndex: number;
  //photos: Photo<FirestoreDate>[];
  //showPhotoSlider: (photoId: string) => void;
  //showEditPhotoForm: (photoId: string) => void;
  //showPhotoDesc: (photo: TPhotoData) => void;
  //userUid: string;
  //editedPhotoIds: string[];
  //numberOfAddedPhotos: number;
  hasNextPage: boolean;
  isLast: boolean;
  //cardWidth: number;
  //cardHeight: number;
};

export const getPhotoElements = ({
  doesRenderElements,
  isLast,
  loading,
  ...props
}: PageProps & { doesRenderElements: boolean }) => {
  if (doesRenderElements === false) return null;

  if (isLast === true && loading === true) {
    // @ts-ignore
    return (
      <PhotoCardSkeletons numberOfSkeletons={props.numberOfPhotosByPage} />
    );
  }

  return <PhotoCards {...props} />;
};

/* 
  LAST PAGE AND HEIGHT: Cause we set height: "auto" to last page 
it cause a zero height when we scroll from last page to top. We decide 
do nothing with that.
*/
const Page: FC<PageProps> = (props: PageProps) => {
  const doesRenderElements = getDoesRenderElements(
    props.pageIndex,
    props.activeObservableIndex,
    props.hasNextPage,
    props.isLast,
    props.loading,
    props.isShowPhotoSlider
  );

  const photoElements = getPhotoElements({ ...props, doesRenderElements });

  /* console.group("[RENDER PAGE]");
  console.log("doesRenderElements", doesRenderElements);
  console.log("isLast", props.isLast);
  console.log("loading", props.loading);
  console.log("photos", props.photos);
  console.groupEnd(); */

  return (
    <Box
      height={props.isLast === true ? "auto" : props.pageHeight}
      id={`OBSERVER_TARGET__${props.pageIndex}`}
      data-observer-index={`${props.pageIndex}`}
      className="flex justify-around flex-wrap w-full"
    >
      {photoElements}
    </Box>
  );
};

export default Page;
