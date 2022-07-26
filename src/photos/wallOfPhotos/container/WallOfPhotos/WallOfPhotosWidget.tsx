import React, { FC, memo } from "react";
import Button from "@mui/material/Button";
import PhotoCards from "../PhotoCards";
import { useInfiniteScroll, Blocks } from "../../../../infiniteScroll";
//import { useWallOfPhotosContext } from "../../hook/useWallOfPhotosContext";
import { useWallOfPhotos } from "../../hook/useWallOfPhotos";
//import { DownloadOriginalPhotoData } from "../../../types";

export const Wrapper: FC<{ className?: string; children: any }> = ({
  className,
  children,
}) => (
  <div
    className={`m-auto w-80 flex flex-wrap justify-center items-center text-center ${
      className ? className : ""
    }`}
  >
    {children}
  </div>
);

/* type ContentProps = Omit<ReturnType<typeof useInfiniteScroll>, "containerRef"> &
  Pick<
    ReturnType<typeof useWallOfPhotosContext>,
    | "error"
    | "photos"
    | "reLoadPhotos"
    | "isSearch"
    | "hasNextPage"
    | "loading"
    | "isShowPhotoSlider"
  >;

function areEqual(prevProps, nextProps) {
  /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    /

  return (
    prevProps.blockHeight === nextProps.blockHeight &&
    prevProps.visibleBlockIndex === nextProps.visibleBlockIndex &&
    prevProps.isShowPhotoSlider === nextProps.isShowPhotoSlider &&
    prevProps.photos === nextProps.photos &&
    prevProps.loading === nextProps.loading &&
    prevProps.numberOfBlocks === nextProps.numberOfBlocks &&
    prevProps.numberOfAddedPhotos === nextProps.numberOfAddedPhotos &&
    prevProps.numberOfItemsInBlock === nextProps.numberOfItemsInBlock
  );
} */

let contentCount = 0;

export type WallOfPhotosProps = ReturnType<typeof useWallOfPhotos>;

export type GetContentProps = WallOfPhotosProps &
  Omit<ReturnType<typeof useInfiniteScroll>, "containerRef">;

const getContent = (
  /* {
    error,
    photos,
    reLoadPhotos,
    isSearch,
    blockHeight,
    visibleBlockIndex,
    hasNextPage,
    loading,
    isShowPhotoSlider,
    numberOfBlocks,
    numberOfItemsInBlock,
  } */ { reLoadPhotos, numberOfItemsInBlock, ...props }: GetContentProps
) => {
  contentCount++;

  console.log("[RENDER WALL OF PHOTOS CONTENT]", contentCount);

  if (numberOfItemsInBlock === 0) return null;

  // if error - we add error msg in the end of page
  if (props.error === true && props.photos === undefined) {
    return (
      <Wrapper>
        <p className="text-error">Какая-то ошибка при загрузке фото...</p>
        <Button onClick={reLoadPhotos}>Попробовать еще раз</Button>
      </Wrapper>
    );
  }

  // if no photos - show no one photos msg
  if (props.photos !== undefined && props.photos.length === 0) {
    if (props.isSearch === true) {
      return (
        <Wrapper>
          <p className="pt-10 text-title">
            Нет ни одной фоты, подходящей под такие параметры поиска...
          </p>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <p className="pt-10  text-title">У нас пока нет ни одной фоты...</p>
        </Wrapper>
      );
    }
  }

  return (
    <div className="m-auto w-9/12">
      <Blocks
        items={props.photos}
        blockHeight={props.blockHeight}
        activeObservableIndex={props.visibleBlockIndex}
        hasNextPage={props.hasNextPage}
        loading={props.loading}
        isShowPhotoSlider={props.isShowPhotoSlider}
        numberOfBlocks={props.numberOfBlocks}
      >
        <PhotoCards numberOfPhotosInBlock={numberOfItemsInBlock} {...props} />
      </Blocks>
    </div>
  );
};

const padding = 16;

const WallOfPhotos: FC<WallOfPhotosProps> = (props) => {
  //console.log("RENDER WallOfPhotoswidget");

  /* const {
    photos,
    error,
    numberOfPhotosPerQuery,
    photoCardWidth,
    photoCardHeight,
    hasNextPage,
    numberOfAddedPhotos,
    loading,
    loadMorePhotos,
    reLoadPhotos,
    isSearch,
    isShowPhotoSlider,
    //editedPhotoIds,
  } = useWallOfPhotosContext(); */

  const { containerRef, ...infiniteScrollProps } = useInfiniteScroll(
    props.photos,
    props.numberOfPhotosPerQuery,
    props.photoCardWidth + padding,
    props.photoCardHeight + padding,
    props.hasNextPage,
    props.numberOfAddedPhotos,
    props.loading,
    props.loadMorePhotos
  );

  const content = getContent({
    ...infiniteScrollProps,
    ...props,
  });

  console.log(
    "[RENDER WALL OF PHOTOS WIDGET]",
    infiniteScrollProps.numberOfBlocks,
    infiniteScrollProps.blockHeight,
    infiniteScrollProps.numberOfItemsInBlock
  );

  /* const content = getContent(
    isInit,
    error,
    photos,
    reLoadPhotos,
    isSearch,
    blockHeight,
    visibleBlockIndex,
    hasNextPage,
    loading,
    isShowPhotoSlider,
    numberOfBlocks,
    numberOfItemsInBlock
  ); */

  // if no photos and loading, photos and loading, photos and error - render Pages
  //const pages = getPages(props);

  //return <Wrapper width={props.containerWidth}>{pages}</Wrapper>;
  return (
    <div className="pt-10 pb-10">
      <div ref={containerRef} className="m-auto w-9/12 h-0" />
      {content}
    </div>
  );
};

export default WallOfPhotos;

/* import React, { FC, memo } from "react";
import Button from "@mui/material/Button";
import PhotoCards from "../PhotoCards";
import { useInfiniteScroll, Blocks } from "../../../../infiniteScroll";
import { useWallOfPhotosContext } from "../../hook/useWallOfPhotosContext";
//import { DownloadOriginalPhotoData } from "../../../types";

export const Wrapper: FC<{ className?: string; children: any }> = ({
  className,
  children,
}) => (
  <div
    className={`m-auto w-80 flex flex-wrap justify-center items-center text-center ${
      className ? className : ""
    }`}
  >
    {children}
  </div>
);

type ContentProps = Omit<ReturnType<typeof useInfiniteScroll>, "containerRef"> &
  Pick<
    ReturnType<typeof useWallOfPhotosContext>,
    | "error"
    | "photos"
    | "reLoadPhotos"
    | "isSearch"
    | "hasNextPage"
    | "loading"
    | "isShowPhotoSlider"
  >;

function areEqual(prevProps, nextProps) {
  /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    /

  return (
    prevProps.blockHeight === nextProps.blockHeight &&
    prevProps.visibleBlockIndex === nextProps.visibleBlockIndex &&
    prevProps.isShowPhotoSlider === nextProps.isShowPhotoSlider &&
    prevProps.photos === nextProps.photos &&
    prevProps.loading === nextProps.loading &&
    prevProps.numberOfBlocks === nextProps.numberOfBlocks &&
    prevProps.numberOfAddedPhotos === nextProps.numberOfAddedPhotos &&
    prevProps.numberOfItemsInBlock === nextProps.numberOfItemsInBlock
  );
}

let contentCount = 0;

const Content: FC<ContentProps> = memo(
  ({
    error,
    photos,
    reLoadPhotos,
    isSearch,
    blockHeight,
    visibleBlockIndex,
    hasNextPage,
    loading,
    isShowPhotoSlider,
    numberOfBlocks,
    numberOfItemsInBlock,
  }) => {
    contentCount++;

    console.log("[RENDER WALL OF PHOTOS CONTENT]", contentCount);

    // if error - we add error msg in the end of page
    if (error === true && photos === undefined) {
      return (
        <Wrapper>
          <p className="text-error">Какая-то ошибка при загрузке фото...</p>
          <Button onClick={reLoadPhotos}>Попробовать еще раз</Button>
        </Wrapper>
      );
    }

    // if no photos - show no one photos msg
    if (photos !== undefined && photos.length === 0) {
      if (isSearch === true) {
        return (
          <Wrapper>
            <p className="pt-10 text-title">
              Нет ни одной фоты, подходящей под такие параметры поиска...
            </p>
          </Wrapper>
        );
      } else {
        return (
          <Wrapper>
            <p className="pt-10  text-title">У нас пока нет ни одной фоты...</p>
          </Wrapper>
        );
      }
    }

    return (
      <div className="m-auto w-9/12">
        <Blocks
          items={photos}
          blockHeight={blockHeight}
          activeObservableIndex={visibleBlockIndex}
          hasNextPage={hasNextPage}
          loading={loading}
          isShowPhotoSlider={isShowPhotoSlider}
          numberOfBlocks={numberOfBlocks}
        >
          <PhotoCards
            //photos={photos}
            //loading={loading}
            //numberOfAddedPhotos={numberOfAddedPhotos}
            numberOfPhotosInBlock={numberOfItemsInBlock}
            //editedPhotoIds={editedPhotoIds}
            /* photos={photos}
            loading={loading} /
          />
        </Blocks>
      </div>
    );
  },
  areEqual
);

const padding = 16;

const WallOfPhotos: FC = () => {
  //console.log("RENDER WallOfPhotoswidget");

  const {
    photos,
    error,
    numberOfPhotosPerQuery,
    photoCardWidth,
    photoCardHeight,
    hasNextPage,
    numberOfAddedPhotos,
    loading,
    loadMorePhotos,
    reLoadPhotos,
    isSearch,
    isShowPhotoSlider,
    //editedPhotoIds,
  } = useWallOfPhotosContext();

  const {
    visibleBlockIndex,
    numberOfBlocks,
    blockHeight,
    numberOfItemsInBlock,
    containerRef,
  } = useInfiniteScroll(
    photos,
    numberOfPhotosPerQuery,
    photoCardWidth + padding,
    photoCardHeight + padding,
    hasNextPage,
    numberOfAddedPhotos,
    loading,
    loadMorePhotos
  );

  console.log(
    "[RENDER WALL OF PHOTOS WIDGET]",
    numberOfBlocks,
    blockHeight,
    numberOfItemsInBlock
  );

  /* const content = getContent(
    isInit,
    error,
    photos,
    reLoadPhotos,
    isSearch,
    blockHeight,
    visibleBlockIndex,
    hasNextPage,
    loading,
    isShowPhotoSlider,
    numberOfBlocks,
    numberOfItemsInBlock
  ); /

  // if no photos and loading, photos and loading, photos and error - render Pages
  //const pages = getPages(props);

  //return <Wrapper width={props.containerWidth}>{pages}</Wrapper>;
  return (
    <div className="pt-10 pb-10">
      <div ref={containerRef} className="m-auto w-9/12 h-0" />
      {numberOfItemsInBlock !== 0 && (
        <Content
          error={error}
          photos={photos}
          reLoadPhotos={reLoadPhotos}
          isSearch={isSearch}
          blockHeight={blockHeight}
          visibleBlockIndex={visibleBlockIndex}
          hasNextPage={hasNextPage}
          loading={loading}
          isShowPhotoSlider={isShowPhotoSlider}
          numberOfBlocks={numberOfBlocks}
          numberOfItemsInBlock={numberOfItemsInBlock}
        />
      )}
    </div>
  );
};

export default WallOfPhotos;
 */
