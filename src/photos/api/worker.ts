import { post as post_ } from "../../utils/fetch";
import { addPhotoUrl, editPhotoUrl } from "./../../config";
import { WorkerResponse } from "lizzygram-common-data/dist/types";
//import { post } from "../../service/fetch/fake";

export const post = async (url: string, formData: FormData) => {
  const res = await post_(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //console.log("ADD RESPONSE", res);

  return res.json();
};

export const edit_ =
  (editPhotoUrl: string, post: any) =>
  (formData: FormData): WorkerResponse => {
    return post(editPhotoUrl, formData);
  };

export const edit = edit_(editPhotoUrl, post);

export const add_ =
  (addPhotoUrl: string, post: any) =>
  (formData: FormData): WorkerResponse => {
    return post(addPhotoUrl, formData);
  };

export const add = add_(addPhotoUrl, post);
