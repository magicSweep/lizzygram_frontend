import React, { useCallback } from "react";
import { hidePhotoSliderAC, editPhotoStartRequestAC } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useCarousel } from "../../../container/Carousel/hook/useCarousel";
//import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { usePhotos } from "../../hook/usePhotos";
import { GlobalState } from "../../../types";
import { makeDownloadPhotoUrl } from "../../helper";
import { PhotoSliderWithDescProps } from "./PhotoSliderWithDesc";
import { useAuth } from "../../../auth";

/* type Main = {
  activePhoto: Photo<FirestoreDate> | undefined;
  //showEditPhotoForm: ((event?: any) => void) | undefined = undefined;
  //showEditPhotoForm: undefined,
  //editedPhotoIds: string[] = [];
  editedPhotoIds: string[];
  //isEditingActivePhoto: boolean = false;
  isEditingActivePhoto: boolean;
  //isEditableActivePhoto: boolean = false;
  isEditableActivePhoto: boolean;
  //downloadOriginalPhotoUrl: string = "";
  downloadOriginalPhotoUrl: "";
};

const initMain: Main = {
  activePhoto: undefined,
  //showEditPhotoForm: ((event?: any) => void) | undefined = undefined;
  //showEditPhotoForm: undefined,
  //editedPhotoIds: string[] = [];
  editedPhotoIds: [],
  //isEditingActivePhoto: boolean = false;
  isEditingActivePhoto: false,
  //isEditableActivePhoto: boolean = false;
  isEditableActivePhoto: false,
  //downloadOriginalPhotoUrl: string = "";
  downloadOriginalPhotoUrl: "",
}; */

export const usePhotoSlider = (): PhotoSliderWithDescProps => {
  const dispatch = useDispatch();

  //console.log("usePhotoSlider+++++++++++++");

  const { photos, loading, hasNextPage, error, loadMore } = usePhotos();

  const photosLength = photos === undefined ? 0 : photos.length;

  const activePhotoIndex = useSelector<GlobalState, number>(
    (state) => state.photos.activePhotoIndex
  );

  const { userUid } = useAuth();
  /* const userUID = useSelector<GlobalState, string>((state) =>
    state.auth.user ? state.auth.user.uid : ""
  ); */

  const editedPhotoIds = useSelector<GlobalState, string[]>(
    (state) => state.photos.editReqs.reqIds
  );

  const { activeIndex, increaseIndex, decreaseIndex } = useCarousel(
    photosLength,
    activePhotoIndex
  );

  //const mainRef: MutableRefObject<Main> = useRef(initMain);

  const onClose = useCallback(() => dispatch(hidePhotoSliderAC()), []);

  const activePhoto = photos === undefined ? undefined : photos[activeIndex];

  const downloadOriginalPhotoUrl =
    activePhoto === undefined ? "" : makeDownloadPhotoUrl(activePhoto);

  const showEditPhotoForm =
    activePhoto === undefined
      ? () => {}
      : () => dispatch(editPhotoStartRequestAC(activePhoto.id));

  /* 
    mainRef.current.isEditingActivePhoto =
    mainRef.current.editedPhotoIds.includes(mainRef.current.activePhoto.id);

  mainRef.current.isEditableActivePhoto =
    userUID === mainRef.current.activePhoto.photo.addedByUserUID;
  */

  const isEditableActivePhoto =
    activePhoto === undefined ? false : userUid === activePhoto.addedByUserUID;
  const isEditingActivePhoto =
    activePhoto === undefined ? false : editedPhotoIds.includes(activePhoto.id);

  //console.log("usePhotoSlider-----------------");

  return {
    //editedPhotoIds,
    //initActiveIndex: number;
    //photoState: IPhotosState;
    photos,
    loading,
    hasNextPage,
    error,
    loadMorePhotos: loadMore,
    onClose,
    //onToggleDesc,
    isEditableActivePhoto,
    showEditPhotoForm,
    downloadOriginalPhotoUrl,
    activeIndex,
    increaseIndex,
    decreaseIndex,
    activePhoto,
    //showEditPhotoForm?: () => void;
    isEditingActivePhoto,
  };
};
