import { webPhotosStoreUrl } from "../../../config";

export const upload = async (formData: FormData, token: string) => {
  // header Authorization: "Tilly 3l;skrfwe"
  const res = await fetch(webPhotosStoreUrl, {
    method: "post",
    body: formData,
    headers: {
      Authorization: `Tilli-Dilli ${token}`,
    },
  });

  return res.json();
};

export const cleanup = async () => {};
