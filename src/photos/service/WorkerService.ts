import { add, edit } from "../api/worker";
import { FirestoreFieldsToEdit, EditPhotoWorkerProps } from "./../types";
import { WorkerRequest } from "lizzygram-common-data/dist/types";

export const editPhoto = async (data: EditPhotoWorkerProps) => {
  const formData = new FormData();

  if (data.description !== undefined)
    formData.append("description", data.description);

  if (data.date !== undefined) formData.append("date", data.date);
  //formData.append("yearsOld", data.yearsOld ? `${data.yearsOld}` : "");

  if (data.tags !== undefined) formData.append("tags", data.tags);

  formData.append("photoId", data.photoId);
  formData.append("userUid", data.userUid);
  formData.append("file", data.photoFile);

  return edit(formData);

  /* const res = await post(editPhotoUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //console.log("ADD RESPONSE", res);

  return res.json(); */
};

/* export const editPhoto = async (
  data: EditPhotoWorkerProps
) => {
  const formData = new FormData();

  if (data.description !== undefined)
    formData.append("description", data.description);

  if (data.date !== undefined) formData.append("date", data.date.toUTCString());
  //formData.append("yearsOld", data.yearsOld ? `${data.yearsOld}` : "");

  if (data.tags !== undefined)
    formData.append("tags", JSON.stringify(data.tags));

  formData.append("photoId", data.photoId);
  formData.append("userUid", data.userUid);
  formData.append("file", data.photoFile);

  return edit(formData);

  /* const res = await post(editPhotoUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //console.log("ADD RESPONSE", res);

  return res.json(); /
}; */

export const addPhoto = async (data: WorkerRequest) => {
  /* const formData = makePhotoFormData({
      id: data.photoId,
      userUid: data.userUid,
      file: data.photoFormData.photoFile[0],
    }); */

  const formData = new FormData();

  formData.append("photoId", data.photoId);
  formData.append("userUid", data.userUid);
  formData.append("file", data.photoFile);

  return add(formData);
  /* const res = await post(addPhotoUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //console.log("ADD RESPONSE", res);

  return res.json(); */
};
