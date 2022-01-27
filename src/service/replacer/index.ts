import { existsSync, readFile, writeFile } from "fs";
import { join } from "path";
import { promisify } from "util";
import {
  cond,
  compose,
  NI_Next,
  Done,
  map,
  then,
  chain,
  fold,
  thenDoneFlat,
  _catch,
  justReturn,
  tap,
  elif,
} from "fmagic";

// REPLACE PARTS OF FILE
// FOR EXAMPLE IMPORTS: from "../hello" to "../hello.fake"
// OR CONFIG: from const hello = "dev" to const hello = "prod"

type ReplacerData = ReplacerConfig & {
  content: string;
  newContent: string;
  fullSearchedString: string;
};

export type ReplacerConfig = {
  pathToConfigFile: string;
  // unique part of string(for example variable name)
  strPartToIdentify: string;
  // with what world starts string
  strStart: string;
  // with what symbol ends string(;)
  strEnd: string;
  // va
  variants: string[];
  // needed variant index
  neededVariantIndex: number;
};

// numberOfPhotosPerQuery from number to calcPhotosLimitPerQuery
export const replacer_ = (
  existsSync_: typeof existsSync,
  promisify_: typeof promisify,
  readFile_: typeof readFile,
  writeFile_: typeof writeFile
) =>
  compose<ReplacerConfig, Promise<void>>(
    (config: ReplacerConfig) =>
      existsSync_(config.pathToConfigFile) === false
        ? Done.of(`File does not exists | ${config.pathToConfigFile}`)
        : NI_Next.of(config),
    // GET CONTENT FROM FILE
    chain(
      compose(
        async (config: ReplacerConfig) => ({
          ...config,
          content: await promisify_(readFile_)(config.pathToConfigFile, {
            encoding: "utf-8",
          }),
        }),
        then(NI_Next.of),
        _catch((err: any) => {
          return Done.of({
            err,
          });
        })
      )
    ),

    // Get full string with
    then(
      map((data: ReplacerData) => {
        const chunkIndex = data.content.indexOf(data.strPartToIdentify);
        const startIndex = data.content.lastIndexOf(data.strStart, chunkIndex);
        const endIndex = data.content.indexOf(data.strEnd, chunkIndex);

        data.fullSearchedString = data.content.substring(startIndex, endIndex);

        return data;
      })
    ),

    // Analyze if need to do anything
    then(
      chain((data: ReplacerData) => {
        const isNeedChanges =
          data.fullSearchedString.replace(/\s+/g, "") !==
          data.variants[data.neededVariantIndex].replace(/\s+/g, "");

        return isNeedChanges === true
          ? NI_Next.of(data)
          : Done.of("No need to change...");
      })
    ),

    // Replace string
    then(
      map((data: ReplacerData) => ({
        ...data,
        newContent: data.content.replace(
          data.fullSearchedString,
          data.variants[data.neededVariantIndex]
        ),
      }))
    ),

    then(
      map(
        (data: ReplacerData) =>
          promisify_(writeFile_)(data.pathToConfigFile, data.newContent, {
            encoding: "utf-8",
          })
        /* tap((props: SwitchImportProps) =>
        //console.log("SAVE", props.pathToFile, props.content)
        
      ) */
      )
    ),

    thenDoneFlat(
      fold(
        (res: any) => console.error(res),
        (res: any) => {}
      )
    )
  );

export const replacer = replacer_(existsSync, promisify, readFile, writeFile);
