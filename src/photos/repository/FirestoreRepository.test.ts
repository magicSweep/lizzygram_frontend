/* import firebase from "firebase/app";
import { flow } from "lodash-es";
import { then } from "../../utils/func_prog";
import { createQuery } from "./helper";
import { makeReq } from "./FirestoreRepository";

jest.mock("./helper", () => {
  const originalModule = jest.requireActual("./helper");

  return { __esModule: true, ...originalModule, createQuery: jest.fn() };
});

/* class Query {
  _startAt: any[] = [];
  _orderBy: any[] = [];
  _where: any[] = [];
  _limit: any[] = [];

  startAt = (...args: any[]) => {
    this._startAt = args;
    return this;
  };
  orderBy = (...args: any[]) => {
    this._orderBy = args;
    return this;
  };
  where = (...args: any[]) => {
    this._where.push(args);
    return this;
  };
  limit = (...args: any[]) => {
    this._limit = args;
    return this;
  };
} /

const queryFirestore = {
  startAt: jest.fn((...args: any) => queryFirestore),
  orderBy: jest.fn((...args: any) => queryFirestore),
  where: jest.fn((...args: any) => queryFirestore),
  limit: jest.fn((...args: any) => queryFirestore),
  get: jest.fn(),
};

let searchState = {
  tagsIds: ["id1", "id2"],
  yearsOld: 2,
  isSearch: true,
};
let numberOfPhotosPerQuery = 6;
let nextPageDocRef = "";

let querySnapshot = [
  {
    id: "id23",
    data: () => ({
      name: "hello.jpg",
      isActive: true,
    }),
  },
  {
    id: "id34",
    data: () => ({
      name: "bye.jpg",
      isActive: true,
    }),
  },
  {
    id: "id78",
    data: () => ({
      name: "glue.jpg",
      isActive: true,
    }),
  },
];

(createQuery as jest.Mock).mockReturnValue(queryFirestore);

describe("FirestoreRepository", () => {
  afterEach(() => {
    queryFirestore.limit.mockClear();
    queryFirestore.startAt.mockClear();
    queryFirestore.where.mockClear();
    queryFirestore.orderBy.mockClear();
    queryFirestore.get.mockClear();
  });

  test("createQuery", () => {
    const query = (createQuery as jest.Mock)();

    query.startAt("blue");

    expect(query.startAt).toHaveBeenCalledTimes(1);
    expect(query.startAt).toHaveBeenCalledWith("blue");
  });

  describe("makeReq", () => {
    (queryFirestore.get as jest.Mock).mockResolvedValue(querySnapshot);

    test.only("Initial request(searchState same as initial) - we only add sort and limit terms.", async () => {
      const res = await makeReq(
        true,
        searchState,
        numberOfPhotosPerQuery,
        nextPageDocRef
      )();

      expect(queryFirestore.where).toHaveBeenCalledTimes(0);

      expect(queryFirestore.startAt).toHaveBeenCalledTimes(0);

      expect(queryFirestore.orderBy).toHaveBeenCalledTimes(1);
      expect(queryFirestore.orderBy).toHaveBeenCalledWith("_timestamp", "desc");

      expect(queryFirestore.limit).toHaveBeenCalledTimes(1);
      expect(queryFirestore.limit).toHaveBeenCalledWith(
        numberOfPhotosPerQuery + 1
      );

      expect(res).toEqual("hello");
    });

    test("Load more photos(searchState same as initial) - we add sort, limit and startAt terms. ", () => {
      nextPageDocRef = "nextPage";

      makeReq(true, searchState, numberOfPhotosPerQuery, nextPageDocRef)();

      expect(queryFirestore.where).toHaveBeenCalledTimes(0);

      expect(queryFirestore.startAt).toHaveBeenCalledTimes(1);
      expect(queryFirestore.startAt).toHaveBeenCalledWith("nextPage");

      expect(queryFirestore.orderBy).toHaveBeenCalledTimes(1);
      expect(queryFirestore.orderBy).toHaveBeenCalledWith("_timestamp", "desc");

      expect(queryFirestore.limit).toHaveBeenCalledTimes(1);
      expect(queryFirestore.limit).toHaveBeenCalledWith(
        numberOfPhotosPerQuery + 1
      );
    });

    test("Load photos on search(searchState not the same) - we add where terms with tags and yearsOld, limit and startAt terms. ", () => {
      nextPageDocRef = "nextPage";

      makeReq(false, searchState, numberOfPhotosPerQuery, nextPageDocRef)();

      expect(queryFirestore.where).toHaveBeenCalledTimes(3);

      expect(queryFirestore.where).toHaveBeenNthCalledWith(
        1,
        "tags.id1",
        "==",
        true
      );
      expect(queryFirestore.where).toHaveBeenNthCalledWith(
        2,
        "tags.id2",
        "==",
        true
      );
      expect(queryFirestore.where).toHaveBeenNthCalledWith(
        3,
        "yearsOld",
        "==",
        2
      );

      expect(queryFirestore.startAt).toHaveBeenCalledTimes(1);
      expect(queryFirestore.startAt).toHaveBeenCalledWith("nextPage");

      expect(queryFirestore.orderBy).toHaveBeenCalledTimes(0);

      expect(queryFirestore.limit).toHaveBeenCalledTimes(1);
      expect(queryFirestore.limit).toHaveBeenCalledWith(
        numberOfPhotosPerQuery + 1
      );
    });
  });
});

describe("How it works test", () => {
  const asyncFunc = (str: string) => Promise.resolve("Hello" + " " + str);

  //const asyncFunc = async (str: string) => "Hello" + " " + str;

  const func = () => "Bye";

  const run = () =>
    flow(
      func,
      asyncFunc,
      then((str: string) => str + "!!!")
    );

  test("", async () => {
    const res = await run()();

    expect(res).toEqual("Hello Bye!!!");
  });
});
 */
