import { post } from "../../service/fetch";
import { WorkerRequestBody } from "./../types";
import { addPhotoUrl, editPhotoUrl } from "./../../config";
//import { post } from "../../service/fetch/fake";

export const editPhoto = async (data: WorkerRequestBody) => {
  const formData = new FormData();

  formData.append("description", data.description ? data.description : "");
  formData.append("date", data.date ? data.date : "");
  //formData.append("yearsOld", data.yearsOld ? `${data.yearsOld}` : "");
  formData.append("tags", data.tags ? data.tags : "");

  formData.append("photoId", data.photoId);
  formData.append("userUid", data.userUid);
  formData.append("file", data.photoFile);

  const res = await post(editPhotoUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //console.log("ADD RESPONSE", res);

  return res.json();
};

export const addPhoto = async (data: WorkerRequestBody) => {
  /* const formData = makePhotoFormData({
      id: data.photoId,
      userUid: data.userUid,
      file: data.photoFormData.photoFile[0],
    }); */

  const formData = new FormData();

  formData.append("photoId", data.photoId);
  formData.append("userUid", data.userUid);
  formData.append("file", data.photoFile);

  const res = await post(addPhotoUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //console.log("ADD RESPONSE", res);

  return res.json();

  /* if (resData.status === "error") {
    throw new Error(`Server return some error - ${resData.data}`);
  } */
};
