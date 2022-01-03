import {
  switchImport,
  SwitchImportProps,
} from "../service/switchImports/switchImport";
import {
  tagsServiceImports,
  photoDbImports,
  photoWorkerImports,
  authDbServiceImports,
  authServiceImports,
} from "../service/switchImports";
import { compose } from "fmagic";

//npm run create:func -- Render component/Render
const args: string[] = process.argv.slice(2);

type Args = {
  isFake: boolean;
};

const getArgs = compose<string[], Args>(
  (args: string[]) => args[0],
  (argPair: string) => argPair.split("="),
  (argPair: string[]) => ({
    [argPair[0]]: argPair[1] === "true" ? true : false,
  })
);

const isFake = getArgs(args).isFake;

console.log("IS FAKE", isFake);

tagsServiceImports.isFake = isFake;
photoDbImports.isFake = isFake;
photoWorkerImports.isFake = isFake;
authDbServiceImports.isFake = isFake;
authServiceImports.isFake = isFake;

[
  tagsServiceImports,
  photoDbImports,
  photoWorkerImports,
  authDbServiceImports,
  authServiceImports,
].map(switchImport);
