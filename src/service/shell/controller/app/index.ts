import { exec } from "../../service/process";
import { parse } from "../../service/args";
import { compose, cond, tap } from "fmagic";
import { main as fakeImports } from "../../model/fakeImports";
import {
  prepareConfigToDeploy,
  prepareConfigToDevelop,
} from "../../model/prepareConfig";

export type Variants =
  | "-fake-imports"
  | "-real-imports"
  | "-prepare-to-deploy"
  | "-prepare-to-develop";

export const main = compose(
  () => parse()[0],
  tap((variant: Variants) => console.log("---------ARGS", variant)),
  cond([
    [
      (variant: Variants) => variant === "-fake-imports",
      () => fakeImports(true),
    ],
    [
      (variant: Variants) => variant === "-real-imports",
      () => fakeImports(false),
    ],
    [
      (variant: Variants) => variant === "-prepare-to-deploy",
      () => {
        fakeImports(false);
        prepareConfigToDeploy();
      },
    ],
    [
      (variant: Variants) => variant === "-prepare-to-develop",
      () => {
        fakeImports(true);
        prepareConfigToDevelop();
      },
    ],
    [
      () => true,
      (variant: Variants) => {
        throw new Error(`Unknown variant ${variant}`);
      },
    ],
  ])
);
