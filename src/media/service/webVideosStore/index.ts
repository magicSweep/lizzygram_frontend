import { videoStoreUrl } from "../../../config";

export const upload = async (formData: FormData, token: string) => {
  // header Authorization: "Tilly 3l;skrfwe"
  const res = await fetch(videoStoreUrl, {
    method: "post",
    body: formData,
    headers: {
      Authorization: `Tilli-Dilli ${token}`,
    },
  });

  return res.json();
};

export const cleanup = async () => {};
