import { cond } from "fmagic";
import React, { FC } from "react";
import SliderImage, {
  SliderImageProps,
} from "../../../../component/images/SliderImage";
import LabledSpinner from "../../../../component/progress/LabledSpinner";
import { Photo, FirestoreDate } from "../../../types";

export type SliderChildrenProps = {
  photos: Photo<FirestoreDate>[];
  photosLoading: boolean;
  photosError: boolean;
  activeIndex: number;
  zoom: number;
  isEditableActivePhoto: boolean;
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
        <p className="select-none pl-4 text-body">{msg}</p>
      </div>
    </div>
  );
};

const isLast = (arr: any[], number: number) => number === arr.length - 1;

const SliderChildren: FC<SliderChildrenProps> = cond([
  [
    ({ photos, photosLoading }: SliderChildrenProps) =>
      photos === undefined && photosLoading === true,
    () => <LabledSpinner label="Загружаются фотки..." isBackDrop={false} />,
  ],

  [
    ({ photosError }: SliderChildrenProps) => photosError === true,
    () => <ErrorMsg msg="Упс, какая-то ошибочка..." isBackDrop={false} />,
  ],

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
      isEditableActivePhoto,
    }: SliderChildrenProps) => (
      <SliderImage
        base64={photos[activeIndex].base64}
        photoAspectRatio={photos[activeIndex].aspectRatio}
        src={photos[activeIndex].src}
        zoom={zoom}
        isLoading={
          isEditableActivePhoto === true ||
          (photosLoading === true && isLast(photos, activeIndex) === true)
        }
        loadText={
          isEditableActivePhoto === true
            ? "Применяем изменения..."
            : "Загружаем еще фото..."
        }
        /* src="" */
        alt="Лиза что-то делает"
      />
    ),
  ],
]);

export default SliderChildren;
