import { getAllBySearchTerms, addOne, editOne, getOne } from "./firestore.fake";
import { photos as photosToAdd } from "../mock/fake.data";

let searchTerms = {
  tags: undefined,
  age: -1,
};

jest.setTimeout(8000);

describe("getAllBySearchTerms", () => {
  test("Load photos and load more", async () => {
    let resPhotos = await getAllBySearchTerms(searchTerms, undefined, 5);

    //expect(res.hasNextPage).toEqual(true);
    //expect(res.nextPageDocRef).toEqual("332399");

    expect(resPhotos.docs.length).toEqual(5);

    const cursor = resPhotos.cursor;

    resPhotos = await getAllBySearchTerms(searchTerms, resPhotos.cursor, 5);

    //expect(res.hasNextPage).toEqual(false);
    //expect(res.nextPageDocRef).toEqual("");

    expect(resPhotos.docs[0].id).toEqual(cursor.id);
  });

  test("Load photos with search conditions and load more", async () => {
    let resPhotos = await getAllBySearchTerms(
      {
        tags: undefined,
        age: 2,
      },
      undefined,
      5
    );

    //expect(res.hasNextPage).toEqual(true);
    //expect(res.nextPageDocRef).toEqual("332399");

    expect(resPhotos.docs.length).toEqual(5);

    resPhotos = await getAllBySearchTerms(
      {
        tags: undefined,
        age: 2,
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
  test.only("", async () => {
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
