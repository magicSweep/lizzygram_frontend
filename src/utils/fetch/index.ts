export const get = (url: string, options: RequestInit = {} as any) => {
  return fetch(url, {
    method: "get",
    ...options,
  });
};

export const post = (
  url: string,
  // "a=1"
  data: any,
  options: RequestInit = {} as any
) => {
  return fetch(url, {
    method: "post",
    body: data,
    ...options,
  });
};

/* export const postFormData = (
  url: string,
  data: FormData,
  options: RequestInit = {} as any
) => {
  //const headers = options.headers !== undefined ? options.headers : {};
  //headers["Content-Type"] = "multipart/form-data";

  return fetch(url, {
    method: "post",
    body: data,
    ...options,
  });
}; */

/* export const sendPostWithJsonResponse = async (
  url: string,
  data: FormData,
  headers?: { [key: string]: string }
) => {
  const response = await post(url, data, headers);

  if (response.status !== 200) throw new Error("Bad response");

  return await response.json();
};

export const sendGetWithJsonResponse = async (url: string) => {
  const response = await fetch(url);

  if (response.status !== 200) throw new Error("Bad response");

  return await response.json();
}; */

/* export const get = (url: string, headers?: any) => {
  //if we use FormData, it add headers by themselve
  return fetch(url, {
    method: "get",
    headers: headers,
  });
};

export const post = (url: string, data: FormData, headers?: any) => {
  //if we use FormData, it add headers by themselve
  return fetch(url, {
    method: "post",
    headers: headers,
    body: data,
  });
}; */

/*   status = (response: Response) => {
        //console.log(response);
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      };
    
      json = (response: Response) => {
        return response.json();
      }; */
