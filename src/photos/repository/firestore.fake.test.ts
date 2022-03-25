import {
  getAllBySearchTerms,
  addOne,
  editOne,
  getOne,
  searchPhotoFilter,
} from "./firestore.fake";
import { photos as photosToAdd } from "../mock/fake.data";
import { photos as initPhotos } from "../mock/photos.db";

let searchTerms = {
  tags: undefined,
  age: -1,
  mine: false,
  favorites: false,
};

let userUid = "jkFrANbtA4bBEjFsvWWbSOPdt56yt";

jest.setTimeout(8000);

/////////////////////////////////

describe("searchPhotoFilter", () => {
  test("", () => {
    let searchTerms = {
      tags: {},
      age: -1,
      mine: true,
      favorites: true,
    };

    /* const photo = {
      yearsOld: -1,
      addedByUserUID: "123",
      favoriteBy: {
        123: true,
      },
    }; */

    //const result = searchPhotoFilter(searchTerms, "123")(photo);
    const result = initPhotos.filter(
      searchPhotoFilter(searchTerms, "jkFrANbtA4bBEjFsvWWbSOPdt56yt")
    );

    expect(result.length).toEqual(2);
    //expect(result).toEqual("hello");
  });
});

///////////////////////////////////

describe("getAllBySearchTerms", () => {
  test("Load photos and load more", async () => {
    let resPhotos = await getAllBySearchTerms(
      userUid,
      searchTerms,
      undefined,
      5
    );

    //expect(res.hasNextPage).toEqual(true);
    //expect(res.nextPageDocRef).toEqual("332399");

    expect(resPhotos.docs.length).toEqual(5);

    const cursor = resPhotos.cursor;

    resPhotos = await getAllBySearchTerms(
      userUid,
      searchTerms,
      resPhotos.cursor,
      5
    );

    //expect(res.hasNextPage).toEqual(false);
    //expect(res.nextPageDocRef).toEqual("");

    expect(resPhotos.docs[0].id).toEqual(cursor.id);
  });

  test("Load photos with search conditions and load more", async () => {
    let resPhotos = await getAllBySearchTerms(
      userUid,
      {
        tags: undefined,
        age: 2,
        mine: false,
        favorites: false,
      },
      undefined,
      5
    );

    //expect(res.hasNextPage).toEqual(true);
    //expect(res.nextPageDocRef).toEqual("332399");

    expect(resPhotos.docs.length).toEqual(5);

    resPhotos = await getAllBySearchTerms(
      userUid,
      {
        tags: undefined,
        age: 2,
        mine: false,
        favorites: false,
      },
      resPhotos.cursor,
      5
    );

    //expect(res.hasNextPage).toEqual(true);
    //expect(res.nextPageDocRef).toEqual("332399");

    expect(resPhotos.docs.length).toEqual(2);
  });
});

describe("getOne", () => {
  test("", async () => {
    const res = await getOne("1609866733918");

    expect(res.googleDriveId).toEqual("1rD94UnpAjw-PnPaqDPpdBTsjzqKxeeTA");
  });
});

describe("addOne", () => {
  test("", async () => {
    await addOne(photosToAdd[0]);

    const res = await getOne(photosToAdd[0].id);

    expect(res.aspectRatio).toEqual(0.71);
  });
});

describe("editOne", () => {
  test("", async () => {
    const photoId = "1609866733918";
    const date = Date.now();

    let res = await getOne(photoId);

    expect(res.tags).toEqual({
      WX6CY5kGx4FXvdZR6g8E: true,
      rNNyXhgNJUjsbGFzVGAL: true,
      saDWGntDo84EQYG8FGFE: true,
    });

    expect(res.description).toEqual("");

    await editOne({
      photoId,
      fieldsToUpdate: {
        tags: {
          WX6CY5kGx4FXvdZR6g8E: true,
          saDWGntDo84EQYG8FGFE: true,
          ieYx4ke8ms0DJb5APv4u: true,
        },
        description: "New super description",
        date: new Date(date),
      },
    });

    res = await getOne(photoId);

    expect(res.tags).toEqual({
      WX6CY5kGx4FXvdZR6g8E: true,
      saDWGntDo84EQYG8FGFE: true,
      ieYx4ke8ms0DJb5APv4u: true,
    });

    expect(res.description).toEqual("New super description");
  });
});
