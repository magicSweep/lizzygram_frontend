import { isEqual, trim } from "lodash-es";
import { getOnlyTrueTags, getYearsOld } from "../../../../utils/app";
import { Photo, EditPhotoFormData, FirestoreDate } from "./../../../types";
import { SearchTerms } from "../../../../search/types";
import { FirestoreTagsData } from "./../../../../tags/types";
import { Done, map, Next, chain, compose } from "fmagic";
import { isEmptyObj } from "../../../../utils/other";

export const makeEditPhotoData = (
  formData: EditPhotoFormData, //IEditPhotoFormData
  photo: Photo<FirestoreDate>
  //operationType: "edit" | "add"
) =>
  compose<unknown, any>(
    /* () => {
      console.log(
        "IS DATE EQUALS",
        new Date(formData.date),
        photo.date.toDate()
      );
    }, */
    () =>
      formData.date &&
      new Date(formData.date).toDateString() !==
        photo.date.toDate().toDateString()
        ? { date: new Date(formData.date) }
        : {},
    /*   (fieldsToUpdate: any) =>
      fieldsToUpdate.date
        ? { ...fieldsToUpdate, yearsOld: getYearsOld(fieldsToUpdate.date) }
        : fieldsToUpdate, */
    (fieldsToUpdate: any) =>
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
          result.isDone === true
            ? fieldsToUpdate
            : { ...fieldsToUpdate, tags: result.value }
      )(),
    (fieldsToUpdate: any) =>
      fieldsToUpdate.date
        ? { ...fieldsToUpdate, yearsOld: getYearsOld(fieldsToUpdate.date) }
        : fieldsToUpdate,

    /*  formData.tags
        ? { ...fieldsToUpdate, tags: getOnlyTrueTags(formData.tags) }
        : fieldsToUpdate, */
    (fieldsToUpdate: any) =>
      formData.desc && trim(formData.desc) !== trim(photo.description)
        ? { ...fieldsToUpdate, description: formData.desc }
        : fieldsToUpdate
  );

export const isInSearchTerms = (
  searchTerms: SearchTerms,
  fieldsToUpdate: any
) => {
  if (fieldsToUpdate.date !== undefined) {
    const age = getYearsOld(fieldsToUpdate.date);
    if (searchTerms.age >= 0 && searchTerms.age !== age) return false;
  }

  if (
    fieldsToUpdate.tags !== undefined &&
    searchTerms.tags !== undefined &&
    isEmptyObj(searchTerms.tags) === false
  ) {
    if (!isEqual(fieldsToUpdate.tags, searchTerms.tags)) {
      return false;
    }
  }

  return true;
};
