import { cond } from "fmagic";
import React, { FC } from "react";
import SliderImage from "../../../../component/images/SliderImage";
//import LabledSpinner from "../../../../component/progress/LabledSpinner";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";

export type SliderChildrenProps = {
  photos: Photo<FirestoreDate>[] | undefined;
  photosLoading: boolean;
  //photosError: boolean;
  activeIndex: number;
  zoom: number;
  isEditingActivePhoto: boolean;
};

const ErrorMsg: FC<{ msg: string; isBackDrop?: boolean }> = ({
  msg,
  isBackDrop,
}) => {
  return (
    <div
      className={`
          absolute inset-0 flex justify-center items-center
          ${isBackDrop === true ? "bg-backdrop" : ""}
          `}
    >
      <div className="px-4 py-3 flex flex-nowrap justify-center items-center rounded-md shadow-md bg-error">
        <p className="select-none pl-4 text-white">{msg}</p>
      </div>
    </div>
  );
};

const isLast = (arr: any[], number: number) => number === arr.length - 1;

const SliderChildren: FC<SliderChildrenProps> = cond<SliderChildrenProps, any>([
  /*  [
    ({ photos, photosLoading }: SliderChildrenProps) =>
      photos === undefined && photosLoading === true,
    () => <LabledSpinner label="Загружаются фотки..." isBackDrop={false} />,
  ],

  [
    ({ photosError }: SliderChildrenProps) => photosError === true,
    () => <ErrorMsg msg="Упс, какая-то ошибочка..." isBackDrop={false} />,
  ], */

  [({ photos }: SliderChildrenProps) => photos === undefined, () => null],

  /* [
    ({ photos }: SliderChildrenProps) =>
    photos !== undefined && photos.length === 0,
    () => <p>No one photos yet...</p>,
  ], */

  [
    ({ photos }: SliderChildrenProps) => photos !== undefined,
    ({
      photos,
      photosLoading,
      activeIndex,
      zoom,
      isEditingActivePhoto,
    }: SliderChildrenProps) => (
      <SliderImage
        base64={(photos as Photo<FirestoreDate>[])[activeIndex].base64}
        photoAspectRatio={
          (photos as Photo<FirestoreDate>[])[activeIndex].aspectRatio
        }
        imageExtension={
          (photos as Photo<FirestoreDate>[])[activeIndex].imageExtension
        }
        src={(photos as Photo<FirestoreDate>[])[activeIndex].src}
        srcSet={(photos as Photo<FirestoreDate>[])[activeIndex].srcSet}
        zoom={zoom}
        isLoading={
          isEditingActivePhoto === true ||
          (photosLoading === true &&
            isLast(photos as Photo<FirestoreDate>[], activeIndex) === true)
        }
        //Применяем изменения
        loadText={isEditingActivePhoto === true ? "" : "Загружаем еще фото..."}
        /* src="" */
        alt="Фотография"
      />
    ),
  ],
]);

export default SliderChildren;
