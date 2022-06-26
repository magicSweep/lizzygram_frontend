import React, { FC } from "react";
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
    className={`m-auto w-80 pt-10 pb-10 flex flex-wrap justify-center items-center text-center ${
      className ? className : ""
    }`}
  >
    {children}
  </div>
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
    editedPhotoIds,
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

  // if no photos and loading, photos and loading, photos and error - render Pages
  //const pages = getPages(props);

  //return <Wrapper width={props.containerWidth}>{pages}</Wrapper>;
  return (
    <div className="pt-10 pb-10">
      <div ref={containerRef} className="m-auto w-9/12">
        <Blocks
          blockHeight={blockHeight}
          activeObservableIndex={visibleBlockIndex}
          hasNextPage={hasNextPage}
          loading={loading}
          isShowPhotoSlider={isShowPhotoSlider}
          numberOfBlocks={numberOfBlocks}
        >
          <PhotoCards
            photos={photos}
            loading={loading}
            numberOfAddedPhotos={numberOfAddedPhotos}
            numberOfPhotosInBlock={numberOfItemsInBlock}
            editedPhotoIds={editedPhotoIds}
            /* photos={photos}
            loading={loading} */
          />
        </Blocks>
      </div>
    </div>
  );
};

export default WallOfPhotos;
