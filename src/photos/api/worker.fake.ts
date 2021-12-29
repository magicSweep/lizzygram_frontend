import wait from "waait";
import { WorkerResponse } from "lizzygram-common-data/dist/types";

export const add = async (data: FormData): Promise<WorkerResponse> => {
  await wait(2000);

  return {
    status: "success",
  };
};

export const edit = async (data: FormData): Promise<WorkerResponse> => {
  await wait(2000);

  return {
    status: "success",
  };
};
