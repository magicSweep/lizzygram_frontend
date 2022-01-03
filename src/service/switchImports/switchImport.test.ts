import { join } from "path";
import { switchImport_ } from "./switchImport";

const fileContent = `
import { add, edit } from "../api/worker.fake";
import { FirestoreFieldsToEdit } from "./../types";
import { WorkerRequest } from "lizzygram-common-data/dist/types";
`;

describe("", () => {
  test("", async () => {
    const workerPhotosService = join(
      process.cwd(),
      "src/photos/service/WorkerService.ts"
    );

    //const comment = "/*";
    const importTruly = '"../api/worker";';
    //const importFake = 'import { add, edit } from "../api/worker.fake";';

    const returnPromisify = jest.fn();
    const promisify_ = jest.fn(() => returnPromisify);
    const existsSync = jest.fn();

    returnPromisify.mockResolvedValue(undefined);

    returnPromisify.mockResolvedValueOnce(fileContent);

    const switchImport = switchImport_(existsSync, promisify_ as any);

    await switchImport({
      pathToFile: workerPhotosService,
      imports: {
        truly: importTruly,
        fake: "",
      },
      isFake: true,
      content: "",
      indexes: {} as any,
    });

    /*  const blue = () =>
      Promise.resolve(`
    hello 
    bye     true
  `);

    expect((await blue()).replace(/\s+/g, "")).toEqual("hello");
 */
    expect(returnPromisify).toHaveBeenLastCalledWith(
      workerPhotosService,
      // CHANGE COMMENTS MANUALLY
      fileContent.replace(/\s+/g, ""),
      {
        encoding: "utf-8",
      }
    );

    //expect(await promisify_()()).toEqual("hello");
  });
});

describe.skip("Test features", () => {
  const str = `
import { FirestoreFieldsToEdit } from "./../types";
import { add, edit } from "../api/worker.fake";
//import { add, edit } from "../api/worker";
import { WorkerRequest } from "lizzygram-common-data/dist/types";
`;

  const searchFakeImport = (str: string) => searchImport(str, ".fake");

  const searchImport = async (str: string, name: string) => {
    let indexOfFake = str.indexOf(name);

    let endIndex = str.indexOf(";", indexOfFake);

    let strPart = str.substring(0, endIndex + 1);

    let startIndex = strPart.lastIndexOf("import");

    return strPart.substring(startIndex);
  };

  test("", async () => {
    let result = await searchFakeImport(str);

    expect(result).toEqual('import { add, edit } from "../api/worker.fake";');

    result = await searchImport(str, 'worker"');

    expect(result).toEqual('import { add, edit } from "../api/worker";');
  });

  test("", async () => {
    let indexOf = str.indexOf('//import { add, edit } from "../api/worker";');

    expect(indexOf).toEqual(101);
  });
});

/* import { join } from "path";
import { switchImport_ } from "./switchImport";

const fileContent = `
import { add, edit } from "../api/worker.fake";
import { FirestoreFieldsToEdit } from "./../types";
import { WorkerRequest } from "lizzygram-common-data/dist/types";
/*import { 
  add, 
  edit } from "../api/worker";/
`;

describe("", () => {
  test("", async () => {
    const workerPhotosService = join(
      process.cwd(),
      "src/photos/service/WorkerService.ts"
    );

    const comment = "/*";
    const importTruly = 'import { add, edit } from "../api/worker";';
    const importFake = 'import { add, edit } from "../api/worker.fake";';

    const returnPromisify = jest.fn();
    const promisify_ = jest.fn(() => returnPromisify);
    const existsSync = jest.fn();

    returnPromisify.mockResolvedValue(undefined);

    returnPromisify.mockResolvedValueOnce(fileContent);

    const switchImport = switchImport_(existsSync, promisify_ as any);

    await switchImport({
      pathToFile: workerPhotosService,
      imports: {
        truly: importTruly,
        trulyCommented: "",
        fake: importFake,
        fakeCommented: "",
      },
      comment,
      isFake: true,
      content: "",
      indexes: {} as any,
    });

    /*  const blue = () =>
      Promise.resolve(`
    hello 
    bye     true
  `);

    expect((await blue()).replace(/\s+/g, "")).toEqual("hello");
 /
    expect(returnPromisify).toHaveBeenLastCalledWith(
      workerPhotosService,
      // CHANGE COMMENTS MANUALLY
      fileContent.replace(/\s+/g, ""),
      {
        encoding: "utf-8",
      }
    );

    //expect(await promisify_()()).toEqual("hello");
  });
});

describe.skip("Test features", () => {
  const str = `
import { FirestoreFieldsToEdit } from "./../types";
import { add, edit } from "../api/worker.fake";
//import { add, edit } from "../api/worker";
import { WorkerRequest } from "lizzygram-common-data/dist/types";
`;

  const searchFakeImport = (str: string) => searchImport(str, ".fake");

  const searchImport = async (str: string, name: string) => {
    let indexOfFake = str.indexOf(name);

    let endIndex = str.indexOf(";", indexOfFake);

    let strPart = str.substring(0, endIndex + 1);

    let startIndex = strPart.lastIndexOf("import");

    return strPart.substring(startIndex);
  };

  test("", async () => {
    let result = await searchFakeImport(str);

    expect(result).toEqual('import { add, edit } from "../api/worker.fake";');

    result = await searchImport(str, 'worker"');

    expect(result).toEqual('import { add, edit } from "../api/worker";');
  });

  test("", async () => {
    let indexOf = str.indexOf('//import { add, edit } from "../api/worker";');

    expect(indexOf).toEqual(101);
  });
});

 */
