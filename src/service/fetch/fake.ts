import { addPhotoUrl, editPhotoUrl } from "../../config";
import wait from "waait";

export const post = async (url: string, data: FormData, headers: any) => {
  await wait(2000);

  if (url === addPhotoUrl) {
    return {
      json: async () => {
        //await wait(500);
        return {
          status: "success",
        };
      },
    };
  }

  if (url === editPhotoUrl) {
    return {
      json: async () => {
        //await wait(500);
        return {
          status: "success",
        };
      },
    };
  }

  throw new Error(`No implementation for url - ${url}`);
};
