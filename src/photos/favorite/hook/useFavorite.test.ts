import { add__, remove__ } from ".";
//import { FavoriteData } from "lizzygram-common-data/dist/types";

const changeFavorites = jest.fn(() => Promise.resolve());
const dispatch = jest.fn();
const favoriteData = {
  userUid2: true,
  userUid3: true,
  userUid4: true,
};

const batch = (callback: any) => callback();

describe("add", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("", async () => {
    const result = await add__(changeFavorites, batch)(dispatch, "userUid")(
      "photoId",
      favoriteData as any
    );

    expect(changeFavorites).toHaveBeenCalledTimes(1);
    expect(changeFavorites).toHaveBeenNthCalledWith(1, {
      fieldsToUpdate: {
        favoriteBy: {
          userUid: true,
          userUid2: true,
          userUid3: true,
          userUid4: true,
        },
      },
      photoId: "photoId",
    });

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      payload: "photoId",
      type: "favorite/favoritePhotoStartRequest",
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      payload: {
        favoriteBy: {
          userUid: true,
          userUid2: true,
          userUid3: true,
          userUid4: true,
        },
        id: "photoId",
      },
      type: "loadPhotos/editPhoto",
    });
    expect(dispatch).toHaveBeenNthCalledWith(3, {
      type: "favorite/favoritePhotoSuccessRequest",
      payload: "photoId",
    });
  });
});

describe.only("remove", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("", async () => {
    const result = await remove__(changeFavorites)(dispatch, "userUid3")(
      "photoId",
      favoriteData as any
    );

    expect(changeFavorites).toHaveBeenCalledTimes(1);
    expect(changeFavorites).toHaveBeenNthCalledWith(1, {
      fieldsToUpdate: { favoriteBy: { userUid2: true, userUid4: true } },
      photoId: "photoId",
    });

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      payload: "photoId",
      type: "favorite/favoritePhotoStartRequest",
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      payload: {
        favoriteBy: { userUid2: true, userUid4: true },
        id: "photoId",
      },
      type: "loadPhotos/editPhoto",
    });
    expect(dispatch).toHaveBeenNthCalledWith(3, {
      type: "favorite/favoritePhotoSuccessRequest",
      payload: "photoId",
    });
  });
});
