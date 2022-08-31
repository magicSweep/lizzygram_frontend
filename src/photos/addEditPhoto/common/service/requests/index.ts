import { AddEditRequests } from "./../types";
import { workerPhotoUrl, cleanUpUrl } from "./../../../../../config";
import { addOne } from "./../../../../../service/firebase/firestore";

export const mainWorkerReq: AddEditRequests["mainWorkerReq"] = async (
  formData: FormData,
  token: string
) => {
  // header Authorization: "Tilly 3l;skrfwe"
  const res = await fetch(workerPhotoUrl, {
    method: "post",
    body: formData,
    headers: {
      Authorization: `Tilli-Dilli ${token}`,
    },
  });

  return res.json();
};

/* export const firestoreReq: AddRequests["firestoreReq"] = async (photo) => {
  return addOne(photosCollectionName)(photo) as any;
}; */

export const cleanUpWorkerReq: AddEditRequests["cleanUpWorkerReq"] = async (
  data
) => {
  return fetch(cleanUpUrl, {
    method: "delete",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
