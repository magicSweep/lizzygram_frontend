import { isEqual, trim } from "lodash-es";
import { getOnlyTrueTags, calcYearsOld } from "../../../../utils/app";
import {
  //Photo,
  EditPhotoFormData,
  EditPhotoWorkerProps,
  //FirestoreDate,
  FirestoreFieldsToEdit,
} from "./../../../types";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { SearchTerms } from "../../../../search/types";
import { FirestoreTagsData } from "./../../../../tags/types";
import {
  Done,
  map,
  Next,
  chain,
  compose,
  tap,
  cond,
  elif,
  set,
  justReturn,
} from "fmagic";
import { isEmptyObj } from "../../../../utils/other";

export const makeEditPhotoWorkerProps = (
  fieldsToUpdate: FirestoreFieldsToEdit,
  photoId: string,
  userUid: string,
  photoFile: File
) =>
  compose<void, EditPhotoWorkerProps>(
    () => ({}),
    /* tap((data: any) =>
      console.log("makeEditPhotoWorkerProps", data, fieldsToUpdate)
    ), */
    elif(
      () => fieldsToUpdate.description !== undefined,
      set("description", fieldsToUpdate.description),
      justReturn
    ),
    elif(
      () => fieldsToUpdate.date !== undefined,
      set("date", () => fieldsToUpdate.date.toUTCString()),
      justReturn
    ),
    elif(
      () => fieldsToUpdate.tags !== undefined,
      set("tags", JSON.stringify(fieldsToUpdate.tags)),
      justReturn
    ),
    set("photoId", photoId),
    set("userUid", userUid),
    set("photoFile", photoFile)
  )();

export const makeEditPhotoData = (
  formData: EditPhotoFormData, //IEditPhotoFormData
  photo: Photo<FirestoreDate>
  //operationType: "edit" | "add"
) =>
  compose<unknown, FirestoreFieldsToEdit>(
    /* () => {
      console.log(
        "IS DATE EQUALS",
        new Date(formData.date),
        photo.date.toDate()
      );
    }, */
    () =>
      formData.date !== undefined &&
      formData.date !== null &&
      new Date(formData.date).toDateString() !==
        photo.date.toDate().toDateString()
        ? { date: new Date(formData.date) }
        : {},
    /*   (fieldsToUpdate: any) =>
      fieldsToUpdate.date
        ? { ...fieldsToUpdate, yearsOld: getYearsOld(fieldsToUpdate.date) }
        : fieldsToUpdate, */
    (fieldsToUpdate: FirestoreFieldsToEdit) =>
      compose(
        () => getOnlyTrueTags(formData.tags),
        (tags: FirestoreTagsData) =>
          Object.keys(tags).length > 0 ? Next.of(tags) : Done.of(null),
        chain((tags: FirestoreTagsData) =>
          isEqual(tags, getOnlyTrueTags(photo.tags))
            ? Done.of(null)
            : Next.of(tags)
        ),
        (result: Next<FirestoreTagsData> | Done) =>
          result.__IS_DONE === true
            ? fieldsToUpdate
            : { ...fieldsToUpdate, tags: result.value }
      )(),
    (fieldsToUpdate: FirestoreFieldsToEdit) =>
      fieldsToUpdate.date
        ? { ...fieldsToUpdate, yearsOld: calcYearsOld(fieldsToUpdate.date) }
        : fieldsToUpdate,

    /*  formData.tags
        ? { ...fieldsToUpdate, tags: getOnlyTrueTags(formData.tags) }
        : fieldsToUpdate, */
    (fieldsToUpdate: FirestoreFieldsToEdit) =>
      formData.desc && trim(formData.desc) !== trim(photo.description)
        ? { ...fieldsToUpdate, description: formData.desc }
        : fieldsToUpdate
  )();

export const isInSearchTerms = (
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
    } */

    for (let id in searchTerms.tags) {
      if (searchTerms.tags[id] === true && fieldsToUpdate.tags[id] !== true) {
        return false;
      }
    }
  }

  return true;
};
