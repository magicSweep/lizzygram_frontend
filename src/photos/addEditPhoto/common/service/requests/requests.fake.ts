import { AddEditRequests } from "./../types";
import wait from "waait";

export const mainWorkerReq: AddEditRequests["mainWorkerReq"] = async () => {
  await wait(2000);

  return {
    base64: "base64",
    aspectRatio: 1.4,
    imageExtension: "jpeg",
    googleDriveId: "googleDriveId",
    webImagesInfo: {
      ids: ["asdfa320", "sfdafd720", "sdppou1080"],
      urls: new Map([
        [320, "http://localhost:3000/hello-320.jpg"],
        [800, "http://localhost:3000/hello-720.jpg"],
        [1280, "http://localhost:3000/hello-1080.jpg"],
      ]),
    },
  };
};

/* export const firestoreReq: AddEditRequests["firestoreReq"] = async () => {
  await wait(2000);

  return;
}; */

export const cleanUpWorkerReq: AddEditRequests["cleanUpWorkerReq"] =
  async () => {
    await wait(100);

    return;
  };
