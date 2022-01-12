import { makeAddPhotoData } from "./helper";
//import { AddPhotoFormData } from "./../../../types";

export const formData = {
  desc: "Go to hell...",
  date: "2019-05-06",
  tags: {
    hello: true,
    bye: false,
  },
  id: "super-puper-id",
};

describe("makeAddPhotoData", () => {
  test("", () => {
    const res = makeAddPhotoData(formData as any, "super_user_id", "photoId");

    // we can not check all object cause _timestamp make Date.now
    expect(res.addedByUserUID).toEqual("super_user_id");
    expect(res.date.toUTCString()).toEqual("Mon, 06 May 2019 00:00:00 GMT");
    expect(res.description).toEqual("Go to hell...");
    expect(res.id).toEqual("photoId");
    expect(res.isActive).toEqual(false);
    expect(res.tags).toEqual({ hello: true });
    expect(res.yearsOld).toEqual(0);

    /* const result = {
      _timestamp: "2021-08-21T22:46:27.296Z",
      addedByUserUID: "super_user_id",
      date: "2019-05-06T00:00:00.000Z",
      description: "Go to hell...",
      id: "super-puper-id",
      isActive: false,
      tags: { hello: true },
      yearsOld: 0,
    }; */
  });
});
