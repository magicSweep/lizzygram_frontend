import { replacer_ } from ".";

const configContent = `
import { FirestoreFieldsToEdit, EditPhotoWorkerProps } from "./../types";
import { add, edit } from "../api/worker";
import { WorkerRequest } from "lizzygram-common-data/dist/types";

export const addPhotoFormTitle = "Добавить новое фото";
export const editPhotoFormTitle = "Изменить фото";
export const searchPhotoFormTitle = "Поиск фото";

/* OTHER */

//export const lizzyYearsOld = getLizzyYearsOld();

export const lizzyBirthday = new Date("2018-07-08");

// NUMBER OF PHOTOS PER QUERY

export const numberOfPhotosPerQuery = 5;

// WALL OF PHOTOS | USE OBSERVABLE PHOTOS

//export const rootDivId = "wall_of_photos";
//export const idPrefix = "#OBSERVER_";
`;

/* calcPhotosLimitPerQuery(
  photoCardWidth,
  photoCardHeight
) */

describe("replacer_", () => {
  const existsSync = jest.fn(() => true);
  const promisify = jest.fn(
    (func: any) =>
      (...args: any[]) =>
        func(...args)
  );
  const readFile = jest.fn(() => Promise.resolve(configContent));
  const writeFile = jest.fn(() => Promise.resolve());

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("config", async () => {
    const config = {
      pathToConfigFile: "/src/path-to-file.ts",
      strPartToIdentify: "numberOfPhotosPerQuery",
      strStart: "export",
      strEnd: ";",
      variants: [
        "export const numberOfPhotosPerQuery = calcPhotosLimitPerQuery( photoCardWidth, photoCardHeight)",
      ],
      neededVariantIndex: 0,
    };

    const replacer = replacer_(
      existsSync,
      promisify as any,
      readFile as any,
      writeFile as any
    );

    /*  const res = await promisify(readFile)();
    expect(res).toEqual("helo')"); */

    await replacer(config);

    expect(existsSync).toHaveBeenCalledTimes(1);
    expect(promisify).toHaveBeenCalledTimes(2);
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(writeFile).toHaveBeenCalledTimes(1);
    //expect(writeFile).toHaveBeenNthCalledWith(1, "hello");
  });

  test("Fake imports", async () => {
    const iconfig = {
      pathToConfigFile: "hello.ts",
      strPartToIdentify: "api/worker",
      strStart: '"',
      strEnd: ";",
      variants: ['"../api/worker"', '"../api/worker.fake"'],
      neededVariantIndex: 1,
    };

    const existsSync = jest.fn(() => true);
    const promisify = jest.fn(
      (func: any) =>
        (...args: any[]) =>
          func(...args)
    );
    const readFile = jest.fn(() => Promise.resolve(configContent));
    const writeFile = jest.fn(() => Promise.resolve());

    const replacer = replacer_(
      existsSync,
      promisify as any,
      readFile as any,
      writeFile as any
    );

    /*  const res = await promisify(readFile)();
      expect(res).toEqual("helo')"); */

    await replacer(iconfig);

    expect(existsSync).toHaveBeenCalledTimes(1);
    expect(promisify).toHaveBeenCalledTimes(2);
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(writeFile).toHaveBeenCalledTimes(1);

    //expect(writeFile).toHaveBeenNthCalledWith(1, "hello");
  });
});

test("Test some features", () => {
  const chunkIndex = configContent.indexOf("numberOfPhotosPerQuery");
  const startIndex = configContent.lastIndexOf("export", chunkIndex);
  const endIndex = configContent.indexOf(";", chunkIndex);

  const res = configContent.substring(startIndex, endIndex);

  expect(res).toEqual(`export const numberOfPhotosPerQuery = 5`);
});
