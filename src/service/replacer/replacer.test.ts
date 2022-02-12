import { ReplacerConfig, replacer_ } from ".";

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

plugins: [
  "gatsby-plugin-postcss",
  "gatsby-plugin-react-helmet",
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: "Photo album, portfolio",
      short_name: "Photo album",
      start_url: "/",
      lang: "ru",
      background_color: "#f7f0eb",
      theme_color: "#a2466c",
      display: "standalone",
      icon: "src/icons/favicon_color_512x512.png",
      theme_color_in_head: false,
    },
  },
  "gatsby-plugin-webpack-bundle-analyser-v2",
],
`;

/* calcPhotosLimitPerQuery(
  photoCardWidth,
  photoCardHeight
) */

describe("", () => {
  test.skip("", () => {
    const indOf = configContent.indexOf(
      '"gatsby-plugin-webpack-bundle-analyser-v2"'
    );

    // 34 - "", 39 - ', 44 - ",", 32 - space, 10 - \n, 9 - \t
    for (let i = 0; i < 5; i++) {
      console.log(
        `CHAR_${i}`,
        configContent[1136 + i],
        " | ",
        configContent[1136 + i].charCodeAt(0)
      );
    }

    expect(indOf).toEqual(1096);
  });
});

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

  test("Remove plugin from config", async () => {
    const iconfig: ReplacerConfig = {
      pathToConfigFile: "hello.ts",
      strPartToIdentify: "plugin-webpack-bundle",
      strStart: "\n",
      strEnd: "\n",
      variants: [
        '//"gatsby-plugin-webpack-bundle-analyser-v2",',
        '"gatsby-plugin-webpack-bundle-analyser-v2",',
      ],
      neededVariantIndex: 0,
      doesIncludeFirstSymbol: false,
      //doesIncludeLastSymbol: true,
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
