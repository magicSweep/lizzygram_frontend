import { set, compose } from "fmagic";
import { getOnlyTrueTags, getYearsOld } from "../../../../utils/app";
import { AddPhotoFormData, AddPhotoWorkerData, Photo } from "./../../../types";

export const makeAddPhotoWorkerData = (
  formData: AddPhotoFormData,
  userUid: string,
  photoId: string
): AddPhotoWorkerData => {
  return {
    file: formData.photoFile[0],
    userUid: userUid,
    id: photoId,
  };
};

export const makeAddPhotoData = (
  formData: AddPhotoFormData,
  userUid: string,
  photoId: string
  //operationType: "edit" | "add"
) =>
  compose<unknown, Photo<Date>>(
    () => ({
      id: photoId,
      addedByUserUID: userUid,
      isActive: false,
    }),
    set("description", formData.desc ? formData.desc : ""),
    set("tags", getOnlyTrueTags(formData.tags)),
    set("date", new Date(formData.date)),
    set("yearsOld", (photo: any) => getYearsOld(photo.date)),
    set("_timestamp", new Date())
    /* (photo) => ({
      ...photo,
      description: formData.desc ? formData.desc : "",
    }), 
    (photo) => ({
      ...photo,
      tags: getOnlyTrueTags(formData.tags),
    }),
    (photo) => ({
      ...photo,
      date: new Date(formData.date),
    }),
    (photo) => ({
      ...photo,
      yearsOld: getYearsOld(photo.date),
    }),
    (photo) => ({
      ...photo,
      _timestamp: new Date(),
    }) */
  );

/* export const makeAddPhotoData = (
  formData: IAddPhotoFormData,
  userUid: string,
  photoId: string
  //operationType: "edit" | "add"
) =>
  compose(
    () => ({
      id: photoId,
      addedByUserUID: userUid,
      isActive: false,
    }),
    (photo) => ({
      ...photo,
      description: formData.desc ? formData.desc : "",
    }),
    (photo) => ({
      ...photo,
      tags: getOnlyTrueTags(formData.tags),
    }),
    (photo) => ({
      ...photo,
      date: new Date(formData.date),
    }),
    (photo) => ({
      ...photo,
      yearsOld: getYearsOld(photo.date),
    }),
    (photo) => ({
      ...photo,
      _timestamp: new Date(),
    })
  ); */

/* {const description = formData.desc ? formData.desc : "";

  const tags = getOnlyTrueTags(formData.tags);

  const photoDate = fromStrToDate(formData.date);

  //console.log("!!! MAKE ADD PHOTO DATA | DATE", photoDate, formData.date);

  const yearsOld = getYearsOld(photoDate);

  //console.log("!!! MAKE ADD PHOTO DATA | yearsOld", yearsOld);

  const _timestamp = new Date();

  return {
    date: photoDate,
    tags,
    yearsOld,
    description,
    base64: "",
    files: [],
    aspectRatio: 0,
    srcSet: "",
    iconSrc: "",
    src: "",
    _timestamp,
    googleDriveId: "",
    addedByUserUID: "",
    isActive: false,
    imageExtention: "jpeg",
  }; 
};*/
