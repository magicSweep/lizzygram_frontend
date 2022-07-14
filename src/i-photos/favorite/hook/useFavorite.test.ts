import { add__, remove__ } from ".";
//import { FavoriteData } from "lizzygram-common-data/dist/types";

const changeFavorites = jest.fn(() => Promise.resolve());
const dispatch = jest.fn();
const favoriteData = {
  userUid2: true,
  userUid3: true,
  userUid4: true,
};

describe("add", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("", async () => {
    const result = await add__(changeFavorites)(dispatch, "userUid")(
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
      photoId: "photoId",
      type: "FAVORITE_REQUEST_START",
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      photo: {
        favoriteBy: {
          userUid: true,
          userUid2: true,
          userUid3: true,
          userUid4: true,
        },
        id: "photoId",
      },
      type: "EDIT_PHOTO",
    });
    expect(dispatch).toHaveBeenNthCalledWith(3, {
      photoId: "photoId",
      type: "FAVORITE_REQUEST_SUCCESS",
      userUid: "userUid",
    });
  });
});

describe("remove", () => {
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
      photoId: "photoId",
      type: "FAVORITE_REQUEST_START",
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      photo: { favoriteBy: { userUid2: true, userUid4: true }, id: "photoId" },
      type: "EDIT_PHOTO",
    });
    expect(dispatch).toHaveBeenNthCalledWith(3, {
      photoId: "photoId",
      type: "FAVORITE_REQUEST_SUCCESS",
      userUid: "userUid3",
    });
  });
});
