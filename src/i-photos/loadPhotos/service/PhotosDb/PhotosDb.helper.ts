import { compose, elif, justReturn, tap } from "fmagic";
import { SearchTerms } from "./../../../../search/types";
import { Constraint } from "../../../../i-service/firebase/types";

export const makeConstraints = (userUid: string, searchTerms: SearchTerms) =>
  compose<unknown, Constraint[]>(
    /* tap(() =>
          console.log("=============makeQueryConstraints", searchTerms, startAt)
        ), */
    //add age where
    elif(
      () => searchTerms.age >= 0,
      () => [["yearsOld", "==", searchTerms.age]],
      () => []
    ),

    //add tags where
    elif(
      () => searchTerms.tags !== undefined,
      (wheres: any[]) =>
        compose(
          () =>
            Object.keys(searchTerms.tags).map((tagId) => {
              if (searchTerms.tags[tagId] === true)
                return [`tags.${tagId}`, "==", true];
            }),
          (tagsWhere: any[]) =>
            tagsWhere.filter((where) => where !== undefined),
          (tagsWhere: any[]) => wheres.concat(tagsWhere)
        )(),
      justReturn
    ),

    // if only mine photos
    elif(
      () => searchTerms.mine === true,
      (wheres: any[]) => {
        wheres.push(["addedByUserUID", "==", userUid]);
        return wheres;
      },
      justReturn
    ),

    // if only favorites
    elif(
      () => searchTerms.favorites === true,
      (wheres: any[]) => {
        wheres.push([`favoriteBy.${userUid}`, "==", true]);
        return wheres;
      },
      justReturn
    )
  )();
