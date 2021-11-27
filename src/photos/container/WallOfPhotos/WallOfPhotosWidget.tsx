import React, { ComponentProps, FC, useEffect } from "react";
//import { TTagsData } from "../../store/types";
//import { TPhotosData } from "./../../photos/types";
import PhotoCardSkeletons from "../../component/PhotoCardSkeletons";
import PhotoCards from "./PhotoCards";
import { rootDivId } from "../../../config";
import { FirestoreDate, Photo } from "../../types";
import { cond, compose, elif } from "fmagic";
import Button from "@mui/material/Button";
import { showAlertAC } from "../../../alert";

const Wrapper: FC<ComponentProps<"div">> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={`w-11/12 m-auto pt-5 pb-10 flex flex-wrap justify-center ${
      className ? className : ""
    }`}
    {...props}
  >
    {children}
  </div>
);

export interface WallOfPhotosProps {
  //tagsState: ITagsState;
  indexObservable: number;
  photos: Photo<FirestoreDate>[] | undefined;
  loadMorePhotos: () => void;
  reLoadPhotos: () => void;
  hasNextPage: boolean;
  loading: boolean;
  //addPhotoLoading: boolean;
  // requests - photos that is changing at this time
  editedPhotoIds: string[];
  // requests - photos that been added at this time
  numberOfAddedPhotos: number;
  error: boolean;
  isSearch: boolean;
  showPhotoSlider: (event: any) => void;
  showEditPhotoForm: () => void;
  //showPhotoDesc: (photo: TPhotoData) => void;
  userUID: string;
  numberOfPhotosPerQuery: number | undefined;
  isShowPhotoSlider: boolean;
}

const WallOfPhotos: FC<WallOfPhotosProps> = compose(
  /* ({ error, photos, isShowPhotoSlider }: WallOfPhotosProps) =>
    useEffect(() => {
      if (error === true && photos !== undefined) {
        showAlertAC("Какая-то ошибка при загрузке фото...", "error");
      }
    }, [error]), */
  cond([
    [
      // If we got error on initial photos loading we show error
      ({ error, photos }: WallOfPhotosProps) =>
        error === true && photos === undefined,
      ({ reLoadPhotos }: WallOfPhotosProps) => (
        <div className="w-500 m-auto text-center pt-5">
          <p className="text-error p-6">Какая-то ошибка при загрузке фото...</p>
          <Button onClick={reLoadPhotos}>Попробовать еще раз</Button>
        </div>
      ),
    ],

    [
      // If photo slider is opened we only render cards as skeletons and do not react on loading and
      // other events
      ({ isShowPhotoSlider }: WallOfPhotosProps) => isShowPhotoSlider === true,
      (props: WallOfPhotosProps) => <PhotoCards {...props} />,
    ],

    [
      ({ loading, photos }: WallOfPhotosProps) =>
        loading === true && photos === undefined,
      ({ numberOfPhotosPerQuery }: WallOfPhotosProps) => (
        <PhotoCardSkeletons numberOfSkeletons={numberOfPhotosPerQuery} />
      ),
    ],

    [
      ({ loading, photos }: WallOfPhotosProps) =>
        loading === true && photos.length === 0,
      ({ numberOfPhotosPerQuery }: WallOfPhotosProps) => (
        <PhotoCardSkeletons numberOfSkeletons={numberOfPhotosPerQuery} />
      ),
    ],

    [
      ({ photos }: WallOfPhotosProps) => photos.length === 0,
      elif(
        ({ isSearch }: WallOfPhotosProps) => isSearch === true,
        () => (
          <p className="pt-5 text-title">
            Нет ни одной фоты, подходящей под такие параметры поиска...
          </p>
        ),
        () => (
          <p className="pt-5  text-title">У нас пока нет ни одной фоты...</p>
        )
      ),
    ],

    [
      ({ photos }: WallOfPhotosProps) => photos.length > 0,
      (props: WallOfPhotosProps) => (
        <>
          <PhotoCards {...props} />
          {props.loading === true && (
            <PhotoCardSkeletons
              numberOfSkeletons={props.numberOfPhotosPerQuery}
            />
          )}
        </>
      ),
    ],

    [
      () => true,
      (props: WallOfPhotosProps) => console.error("It can't be...", props),
    ],
  ]),

  (content: JSX.Element) => <Wrapper id={rootDivId}>{content}</Wrapper>
);

export default WallOfPhotos;
