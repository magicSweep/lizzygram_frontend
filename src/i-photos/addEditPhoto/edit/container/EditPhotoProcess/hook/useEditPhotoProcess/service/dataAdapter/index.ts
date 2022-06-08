import {
  makeIconSrc,
  makeSrc,
  makeSrcSet,
  makeTagsData,
} from "../../../../../../../common/service/dataAdapter";
import { DataAdapter, FieldsToUpdateFromForm } from "./../types";
import {
  BuildFor,
  ImgExt,
  MainResponseData,
  Photo,
} from "lizzygram-common-data/dist/types";
import { EditPhotoFormData } from "../../../../../../../types";
import {
  calcYearsOld,
  getOnlyTrueTags,
} from "../../../../../../../../../utils/app";
import { buildFor } from "../../../../../../../../../config";
import { isEmptyObj } from "../../../../../../../../../utils/other";
import { chain, compose, Done, NI_Next } from "fmagic";
import { FirestoreTagsData } from "../../../../../../../../../tags/types";
import { isEqual, trim } from "lodash-es";

export { makeWorkerReqData } from "../../../../../../../common/service/dataAdapter";

/* export const isInSearchTerms = (
  searchTerms: SearchTerms,
  fieldsToUpdate: any
) => {
  if (fieldsToUpdate.date !== undefined) {
    const age = calcYearsOld(fieldsToUpdate.date);
    if (searchTerms.age >= 0 && searchTerms.age !== age) return false;
  }

  if (
    fieldsToUpdate.tags !== undefined &&
    searchTerms.tags !== undefined &&
    isEmptyObj(searchTerms.tags) === false
  ) {
    /* if (!isEqual(fieldsToUpdate.tags, searchTerms.tags)) {
      return false;
    } /

    for (let id in searchTerms.tags) {
      if (searchTerms.tags[id] === true && fieldsToUpdate.tags[id] !== true) {
        return false;
      }
    }
  }

  return true;
}; */

export const isNeedWorkerReq: DataAdapter["isNeedWorkerReq"] = (photoFile) =>
  photoFile !== undefined ? photoFile.length > 0 : false;

export const isNeedFirestoreReq: DataAdapter["isNeedFirestoreReq"] = (
  fieldsToUpdate
) => !isEmptyObj(fieldsToUpdate);

export const makeFieldsToUpdate_: (
  buildFor: BuildFor
) => DataAdapter["makeFieldsToUpdate"] = (buildFor) => (formData, currPhoto) =>
  compose<unknown, FieldsToUpdateFromForm>(
    /* () => {
    console.log(
      "IS DATE EQUALS",
      new Date(formData.date),
      photo.date.toDate()
    );
  }, */
    () =>
      console.log(
        "MAKE FIELDS TO UPDATE",
        new Date(formData.date).toDateString(),
        currPhoto.date.toDate().toDateString()
      ),
    () =>
      formData.date !== undefined &&
      formData.date !== null &&
      new Date(formData.date).toDateString() !==
        currPhoto.date.toDate().toDateString()
        ? { date: new Date(formData.date) }
        : {},
    /*   (fieldsToUpdate: any) =>
    fieldsToUpdate.date
      ? { ...fieldsToUpdate, yearsOld: getYearsOld(fieldsToUpdate.date) }
      : fieldsToUpdate, */
    (fieldsToUpdate: FieldsToUpdateFromForm) =>
      compose(
        () => getOnlyTrueTags(formData.tags),
        (tags: FirestoreTagsData) =>
          Object.keys(tags).length > 0 ? NI_Next.of(tags) : Done.of(null),
        chain((tags: FirestoreTagsData) =>
          isEqual(tags, getOnlyTrueTags(currPhoto.tags))
            ? Done.of(null)
            : NI_Next.of(tags)
        ),
        (result: NI_Next<FirestoreTagsData> | Done) =>
          result.__IS_DONE === true
            ? fieldsToUpdate
            : { ...fieldsToUpdate, tags: result.value }
      )(),
    (fieldsToUpdate: FieldsToUpdateFromForm) =>
      fieldsToUpdate.date
        ? {
            ...fieldsToUpdate,
            yearsOld:
              buildFor === "lizzygram" ? calcYearsOld(fieldsToUpdate.date) : 0,
          }
        : fieldsToUpdate,

    /*  formData.tags
      ? { ...fieldsToUpdate, tags: getOnlyTrueTags(formData.tags) }
      : fieldsToUpdate, */
    (fieldsToUpdate: FieldsToUpdateFromForm) =>
      formData.desc && trim(formData.desc) !== trim(currPhoto.description)
        ? { ...fieldsToUpdate, description: formData.desc }
        : fieldsToUpdate
  )();

export const makeFirestoreReqData: DataAdapter["makeFirestoreReqData"] = (
  formFieldsToUpdate,
  //userUid: string,
  photoId,
  workerResponseData
) => {
  /* const srcSet = makeSrcSet(webImagesInfo.urls);
    const iconSrc = makeIconSrc(webImagesInfo.urls);
    const src = makeSrc(webImagesInfo.urls); */

  //const tags = makeTagsData(formData.tags);

  const workerFieldsToUpdate: Partial<Photo<any>> = {};

  //const formFieldsToUpdate: Partial<Photo<any>> = {};

  if (workerResponseData !== undefined) {
    workerFieldsToUpdate.srcSet = makeSrcSet(
      workerResponseData.webImagesInfo.urls
    );
    workerFieldsToUpdate.iconSrc = makeIconSrc(
      workerResponseData.webImagesInfo.urls
    );
    workerFieldsToUpdate.src = makeSrc(workerResponseData.webImagesInfo.urls);
    workerFieldsToUpdate.googleDriveId = workerResponseData.googleDriveId;
    workerFieldsToUpdate.base64 = workerResponseData.base64;
    workerFieldsToUpdate.files = workerResponseData.webImagesInfo.ids;
    workerFieldsToUpdate.aspectRatio = workerResponseData.aspectRatio;
    workerFieldsToUpdate.imageExtention = workerResponseData.imageExtention;
  }

  /*  if (formData.date !== undefined) {
      formFieldsToUpdate.date = formData.date;
      formFieldsToUpdate.yearsOld =
        buildFor === "lizzygram" ? calcYearsOld(formData.date) : 0;
    } */

  const fieldsToUpdate: Partial<Photo<any>> = {
    //id: photoId,
    /* base64: base64,
      files: webImagesInfo.ids,
      aspectRatio: aspectRatio,
      src,
      srcSet,
      iconSrc, */
    _timestamp: new Date(),

    ...workerFieldsToUpdate,
    ...formFieldsToUpdate,

    /* description: formData.desc,
      date: formData.date,
      yearsOld,
      tags,
      googleDriveId: googleDriveId,
      imageExtention: imageExtention as ImgExt, */
    //addedByUserUID: userUid,
    //isActive: true,
  };

  return {
    fieldsToUpdate,
    photoId,
  };
};

export const makeFieldsToUpdate = makeFieldsToUpdate_(buildFor);
