import { exec } from "../../service/process";
import { parse } from "../../service/args";
import { compose, cond, tap } from "fmagic";
import { main as fakeImports } from "../../model/fakeImports";
import { main as prepareConfig } from "../../model/prepareConfig";

export type Variants = "-fake-imports" | "-real-imports" | "-prepare-to-deploy";

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
        prepareConfig();
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
