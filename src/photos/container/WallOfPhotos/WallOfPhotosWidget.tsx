import React, { ComponentProps, FC, Fragment } from "react";
//import { TTagsData } from "../../store/types";
//import { TPhotosData } from "./../../photos/types";
//import { rootDivId } from "../../../config";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import Button from "@mui/material/Button";
import Page, { PageProps } from "./Page";
import Box from "@mui/system/Box";

export const Wrapper: FC<ComponentProps<typeof Box>> = ({
  className,
  children,
  ...props
}) => (
  <Box
    className={`m-auto pt-5 pb-10 flex flex-wrap justify-center ${
      className ? className : ""
    }`}
    {...props}
  >
    {children}
  </Box>
);

export type WallOfPhotosProps = Omit<
  PageProps,
  "photos" | "isLast" | "pageIndex"
> & {
  photos: Photo<FirestoreDate>[][] | undefined;
  numberOfPages: number;
  isError: boolean;
  isSearch: boolean;
  reLoadPhotos: () => void;
  containerWidth: number;
  loadMorePhotos: () => void;
};
/*  {
  activeObservableIndex: number;
  photos: Photo<FirestoreDate>[][] | undefined;
  loadMorePhotos: () => void;
  reLoadPhotos: () => void;
  hasNextPage: boolean;
  loading: boolean;
  editedPhotoIds: string[];
  //numberOfAddedPhotos: number;
  isError: boolean;
  isSearch: boolean;
  showPhotoSlider: (photoId: string) => void;
  showEditPhotoForm: (photoId: string) => void;
  userUid: string;
  isEditor: boolean;
  //numberOfPhotosPerQuery: number | undefined;
  isShowPhotoSlider: boolean;
  containerWidth: number;
  pageHeight: number;
  numberOfPhotosByPage: number;
}  */

const getPages = ({ photos, numberOfPages, ...props }: WallOfPhotosProps) =>
  /* photos: any[][],
  activeObservableIndex: number,
  showSlider: boolean,
  itemsWrapperHeight: number,
  numberOfItemsByFlex: number,
  loading: boolean,
  hasNextPage: boolean,
  numberOfPhotosPerQuery: number,
  editedPhotoIds: string[],
  userUID: string,
  showPhotoSlider: () => void,
  showEditPhotoForm: () => void */
  {
    if (numberOfPages === 0)
      return (
        <Fragment key={`wrapper_123qewq`}>
          <Page
            photos={[]}
            pageIndex={props.activeObservableIndex}
            isLast={true}
            {...props}
            /*  activeObservableIndex={21}
            //wrapperRef={itemsWrapperRef}
            isShowPhotoSlider={showSlider}
            pageHeight={itemsWrapperHeight}
            numberOfPhotosByPage={numberOfItemsByFlex}
            numberOfPhotosPerQuery={numberOfPhotosPerQuery}
            loading={loading}
            hasNextPage={hasNextPage}
            editedPhotoIds={editedPhotoIds}
            userUID={userUID}
            showPhotoSlider={showPhotoSlider}
            showEditPhotoForm={showEditPhotoForm} */
          />
        </Fragment>
      );

    return photos.map((photosByPage, index) => {
      return (
        <Fragment key={`wrapper_${index}`}>
          <Page
            photos={photosByPage}
            pageIndex={index}
            isLast={index === numberOfPages - 1}
            {...props}
            /* activeObservableIndex={activeObservableIndex}
           //wrapperRef={itemsWrapperRef}
           isShowPhotoSlider={showSlider}
           pageHeight={itemsWrapperHeight}
           numberOfPhotosByPage={numberOfItemsByFlex}
           numberOfPhotosPerQuery={numberOfPhotosPerQuery}
           loading={loading}
           hasNextPage={hasNextPage}
           editedPhotoIds={editedPhotoIds}   
           userUID={userUID}       
           showPhotoSlider={showPhotoSlider}
           showEditPhotoForm={showEditPhotoForm} */
          />
        </Fragment>
      );
    });
  };

const WallOfPhotos: FC<WallOfPhotosProps> = (props) => {
  //console.log("RENDER WallOfPhotoswidget");

  // if error - we add error msg in the end of page
  if (props.isError === true && props.photos === undefined) {
    return (
      <Wrapper textAlign="center" width={props.containerWidth}>
        <p className="text-error">Какая-то ошибка при загрузке фото...</p>
        <Button onClick={props.reLoadPhotos}>Попробовать еще раз</Button>
      </Wrapper>
    );
  }

  // if no photos - show no one photos msg
  if (props.photos !== undefined && props.photos.length === 0) {
    if (props.isSearch === true) {
      return (
        <Wrapper textAlign="center" width={props.containerWidth}>
          <p className="pt-5 text-title">
            Нет ни одной фоты, подходящей под такие параметры поиска...
          </p>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper textAlign="center" width={props.containerWidth}>
          <p className="pt-5  text-title">У нас пока нет ни одной фоты...</p>
        </Wrapper>
      );
    }
  }

  // if no photos and loading, photos and loading, photos and error - render Pages
  const pages = getPages(props);

  return <Wrapper width={props.containerWidth}>{pages}</Wrapper>;
};

export default WallOfPhotos;

/* import React, { ComponentProps, FC, useEffect } from "react";
//import { TTagsData } from "../../store/types";
//import { TPhotosData } from "./../../photos/types";
import PhotoCardSkeletons from "../../component/PhotoCardSkeletons";
import PhotoCards from "./PhotoCards";
import { rootDivId } from "../../../config";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
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
  isError: boolean;
  isSearch: boolean;
  showPhotoSlider: (event: any) => void;
  showEditPhotoForm: () => void;
  //showPhotoDesc: (photo: TPhotoData) => void;
  userUID: string;
  numberOfPhotosPerQuery: number | undefined;
  isShowPhotoSlider: boolean;
}

const WallOfPhotos: FC<WallOfPhotosProps> = compose(
  cond([
    [
      // If we got error on initial photos loading we show error
      ({ isError, photos }: WallOfPhotosProps) =>
        isError === true && photos === undefined,
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
 */
