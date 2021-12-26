import wait from "waait";

export const add = async (data: FormData) => {
  await wait(2000);

  return {
    status: "success",
  };
};

export const edit = async (data: FormData) => {
  await wait(2000);

  return {
    status: "success",
  };
};
