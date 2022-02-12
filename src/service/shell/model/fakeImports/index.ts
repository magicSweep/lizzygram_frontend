import { compose } from "fmagic";
import { replacer, ReplacerConfig } from "../../../replacer";
import { join } from "path";

export const main = (isFake: boolean) => {
  const strStart = '"';
  const strEnd = ";";
  const neededVariantIndex = isFake === true ? 1 : 0;

  // "../repository/firestore"
  const photosDbServiceConfig: ReplacerConfig = {
    pathToConfigFile: join(process.cwd(), "src/photos/service/DbService.ts"),
    strPartToIdentify: "repository/firestore",
    strStart,
    strEnd,
    variants: ['"../repository/firestore"', '"../repository/firestore.fake"'],
    neededVariantIndex,
  };

  // "../api/worker"
  const photosWorkerServiceConfig: ReplacerConfig = {
    pathToConfigFile: join(
      process.cwd(),
      "src/photos/service/WorkerService.ts"
    ),
    strPartToIdentify: "api/worker",
    strStart,
    strEnd,
    variants: ['"../api/worker"', '"../api/worker.fake"'],
    neededVariantIndex,
  };

  const authServiceConfig: ReplacerConfig = {
    pathToConfigFile: join(process.cwd(), "src/auth/service/AuthService.ts"),
    strPartToIdentify: "firebase/firebase.auth",
    strStart,
    strEnd,
    variants: [
      '"./../../firebase/firebase.auth"',
      '"./../../firebase/firebase.auth.fake"',
    ],
    neededVariantIndex,
  };

  //import { isUserExists } from "../repository/firestore";
  const authDbServiceConfig: ReplacerConfig = {
    pathToConfigFile: join(process.cwd(), "src/auth/service/DbService.ts"),
    strPartToIdentify: "repository/firestore",
    strStart,
    strEnd,
    variants: ['"../repository/firestore"', '"../repository/firestore.fake"'],
    neededVariantIndex,
  };

  const tagsServiceConfig: ReplacerConfig = {
    pathToConfigFile: join(process.cwd(), "src/tags/service/index.ts"),
    strPartToIdentify: "repository/firestore",
    strStart,
    strEnd,
    variants: ['"../repository/firestore"', '"../repository/firestore.fake"'],
    neededVariantIndex,
  };

  const promises = [
    photosDbServiceConfig,
    photosWorkerServiceConfig,
    authServiceConfig,
    authDbServiceConfig,
    tagsServiceConfig,
  ].map(replacer);

  return Promise.all(promises).catch((err: any) => console.error(err));
};
