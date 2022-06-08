import { AddEditRequests } from "./../types";
import { workerPhotoUrl, photosCollectionName } from "./../../../../../config";
import { addOne } from "./../../../../../i-service/firebase/firestore";

export const workerReq: AddEditRequests["workerReq"] = async (
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
};

/* export const firestoreReq: AddRequests["firestoreReq"] = async (photo) => {
  return addOne(photosCollectionName)(photo) as any;
}; */

export const cleanUpReq: AddEditRequests["cleanUpReq"] = async () => {
  /*  return fetch(cleanUpUrl, {
    method: "get",
  }); */

  return Promise.resolve();
};
