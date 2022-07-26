import { AddRequests } from "./../types";
import {
  //workerPhotoUrl,
  photosCollectionName,
} from "./../../../../../../../../../config";
import { addOne } from "./../../../../../../../../../service/firebase/firestore";
export {
  workerReq,
  cleanUpReq,
} from "../../../../../../../common/service/requests";

/* export const workerReq: AddRequests["workerReq"] = async (
  formData: FormData,
  token: string
) => {
  // header Authorization: "Tilly 3l;skrfwe"
  const res = await fetch(workerPhotoUrl, {
    method: "post",
    body: formData,
    headers: {
      Authorization: `Tilli ${token}`,
    },
  });

  return res.json();
}; */

export const firestoreReq: AddRequests["firestoreReq"] = async (photo) => {
  return addOne(photosCollectionName)(photo) as any;
};
/* 
export const cleanUpReq: AddRequests["cleanUpReq"] = async () => {
  /*  return fetch(cleanUpUrl, {
    method: "get",
  }); /

  return Promise.resolve();
}; */
