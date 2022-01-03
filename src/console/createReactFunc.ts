import { compose } from "fmagic";
import { join } from "path";
import { FuncInfo, createFunc } from "../service/createReactFunc";

const pathToSrc = join(process.cwd(), "src");

//npm run create:func photos/component/Render
//const args: string[] = process.argv.slice(2);
const getFuncInfo_ = (pathToSrc: string) =>
  compose<void, FuncInfo>(
    () => process.argv.slice(2)[0],
    (arg: string) => arg.split("/"),
    (pathParts: string[]) => ({
      name: pathParts.pop(),
      pathToDir: `${pathToSrc}/${pathParts.join("/")}`,
    })
  );

const getFuncInfo = getFuncInfo_(pathToSrc);

//console.log("FUNC INFO", getFuncInfo());

createFunc(getFuncInfo());
