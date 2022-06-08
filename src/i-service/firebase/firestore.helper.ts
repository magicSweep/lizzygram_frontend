import {
  limit,
  QueryConstraint,
  where,
  startAt,
  orderBy,
  OrderByDirection,
} from "firebase/firestore";
import { compose, elif, justReturn, tap } from "fmagic";
//import { SearchTerms } from "./../../search/types";
import { OrderBy, Constraint } from "./types";

export const makeQueryConstraints_ =
  (
    //numberOfPhotosPerQuery: number,
    where_: typeof where,
    limit_: typeof limit,
    startAt_: typeof startAt,
    orderBy_: typeof orderBy
  ) =>
  (
    //userUid: string,
    constraints: Constraint[],
    startAt: any,
    limit: number,
    orderBy?: OrderBy
  ) =>
    compose<unknown, QueryConstraint[]>(
      /* tap(() =>
        console.log("=============makeQueryConstraints", searchTerms, startAt)
      ), */
      //add age where
      /* elif(
        () => searchTerms.age >= 0,
        () => [where_("yearsOld", "==", searchTerms.age)],
        () => []
      ), */

      () =>
        constraints !== undefined && constraints.length > 0
          ? constraints.map((constraint) =>
              where_(constraint[0], constraint[1], constraint[2])
            )
          : [],
      elif(
        () => orderBy !== undefined,
        (queryConstraints: QueryConstraint[]) =>
          queryConstraints.concat([orderBy_(...orderBy)]),
        justReturn
      ),

      //add start at
      elif(
        () => startAt !== undefined && startAt !== null,
        (queryConstraints: QueryConstraint[]) =>
          queryConstraints.concat([startAt_(startAt)]),
        justReturn
      ),

      elif(
        () => limit !== undefined,
        (queryConstraints: QueryConstraint[]) =>
          queryConstraints.concat([limit_(limit + 1)]),
        justReturn
      )
    )();

export const makeQueryConstraints = makeQueryConstraints_(
  //numberOfPhotosPerQuery,
  where,
  limit,
  startAt,
  orderBy
);

/* import {
  limit,
  QueryConstraint,
  where,
  startAt,
  orderBy,
  OrderByDirection,
} from "firebase/firestore";
import { compose, elif, justReturn, tap } from "fmagic";
import { SearchTerms } from "./../../search/types";
import { OrderBy, Constraint } from "./types";

export const makeQueryConstraints_ =
  (
    //numberOfPhotosPerQuery: number,
    where_: typeof where,
    limit_: typeof limit,
    startAt_: typeof startAt,
    orderBy_: typeof orderBy
  ) =>
  (
    userUid: string,
    constraints: Constraint[],
    startAt: any,
    limit: number,
    orderBy?: OrderBy
  ) =>
    compose<unknown, QueryConstraint[]>(
      /* tap(() =>
        console.log("=============makeQueryConstraints", searchTerms, startAt)
      ), /
      //add age where
      elif(
        () => searchTerms.age >= 0,
        () => [where_("yearsOld", "==", searchTerms.age)],
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
                  return where_(`tags.${tagId}`, "==", true);
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
        (wheres: any[]) =>
          wheres.concat([where_("addedByUserUID", "==", userUid)]),
        justReturn
      ),

      // if only favorites
      elif(
        () => searchTerms.favorites === true,
        (wheres: any[]) =>
          wheres.concat([where_(`favoriteBy.${userUid}`, "==", true)]),
        justReturn
      ),

      elif(
        () => orderBy !== undefined,
        (wheres: any[]) => wheres.concat([orderBy_(...orderBy)]),
        justReturn
      ),

      //add start at
      elif(
        () => startAt !== undefined && startAt !== null,
        (wheres: any[]) => wheres.concat([startAt_(startAt)]),
        justReturn
      ),

      (wheres: any[]) => wheres.concat([limit_(limit + 1)])
    )();

export const makeQueryConstraints = makeQueryConstraints_(
  //numberOfPhotosPerQuery,
  where,
  limit,
  startAt,
  orderBy
);

 */
