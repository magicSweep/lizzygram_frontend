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

export type SwitchImportProps = {
  pathToFile: string;
  imports: {
    truly: string;
    fake?: string;
  };
  isFake?: boolean;
  content?: string;
  indexes?: {
    truly: number;
    fake: number;
  };
};

export const switchImport_ = (
  existsSync_: typeof existsSync,
  promisify_: typeof promisify
) =>
  compose<SwitchImportProps, Promise<void>>(
    (props: SwitchImportProps) =>
      existsSync_(props.pathToFile) === false
        ? Done.of(`File does not exists | ${props.pathToFile}`)
        : NI_Next.of(props),

    /* map(
      tap((props: SwitchImportProps) => console.log("MAKE FAKE IMPORT", props))
    ), */
    // MAKE FAKE IMPORT AND REMOVE WHITESPACES FROM IMPORTS
    map((props: SwitchImportProps) => ({
      ...props,
      imports: {
        //truly: props.imports.truly.replace(/\s+/g, ""),
        ...props.imports,
        fake: props.imports.truly.replace(
          '";',
          '.fake";'
        ) /* .replace(/\s+/g, "") */,
      },
    })),

    /*  map(
      tap((props: SwitchImportProps) =>
        console.log("GET CONTENT FROM FILE", props)
      )
    ), */
    // GET CONTENT FROM FILE AND REMOVE WHITESPACES
    chain(
      compose(
        async (props: SwitchImportProps) => ({
          ...props,
          content: await promisify_(readFile)(props.pathToFile, {
            encoding: "utf-8",
          }) /* .replace(/\s+/g, ""), */,
        }),
        then(NI_Next.of),
        _catch((err: any) => {
          return Done.of({
            err,
          });
        })
      )
    ),

    then(
      map((props: SwitchImportProps) => ({
        ...props,
        indexes: {
          truly: props.content.indexOf(props.imports.truly),
          fake: props.content.indexOf(props.imports.fake),
        },
      }))
    ),

    then(
      map((props: SwitchImportProps) =>
        cond([
          // already import fake
          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === true && indexes.fake !== -1,
            justReturn,
          ],

          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === true && indexes.fake === -1,
            (props: SwitchImportProps) => ({
              ...props,
              content: props.content.replace(
                props.imports.truly,
                props.imports.fake
              ),
            }),
          ],

          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === false && indexes.fake === -1,
            justReturn,
          ],

          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === false && indexes.fake !== -1,
            (props: SwitchImportProps) => ({
              ...props,
              content: props.content.replace(
                props.imports.fake,
                props.imports.truly
              ),
            }),
          ],

          [
            () => true,
            (props: SwitchImportProps) =>
              Done.of(
                `Bad indexes | ${props.isFake} | ${JSON.stringify(
                  props.indexes
                )}`
              ),
          ],
        ])(props)
      )
    ),

    /*  then(
      map(tap((props: SwitchImportProps) => console.log("--------LOG", props)))
    ), */

    then(
      map(
        (props: SwitchImportProps) =>
          promisify_(writeFile)(props.pathToFile, props.content, {
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

export const switchImport = switchImport_(existsSync, promisify);

/* import { existsSync, readFile, writeFile } from "fs";
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
} from "fmagic";

type Comments = "//" | "/*";

const makeCommentedString = (str: string, comment: Comments) =>
  cond<void, string>([
    [() => comment === "//", () => `//${str}`],
    [() => comment === "/*", () => `/*${str}/`],
  ])();

export type SwitchImportProps = {
  pathToFile: string;
  imports: {
    truly: string;
    trulyCommented: string;
    fake: string;
    fakeCommented: string;
  };
  comment: "//" | "/*";
  isFake: boolean;
  content: string;
  indexes: {
    truly: number;
    trulyCommented: number;
    fake: number;
    fakeCommented: number;
  };
};

export const switchImport_ = (
  existsSync_: typeof existsSync,
  promisify_: typeof promisify
) =>
  compose<SwitchImportProps, Promise<void>>(
    (props: SwitchImportProps) =>
      existsSync_(props.pathToFile) === false
        ? Done.of(`File does not exists | ${props.pathToFile}`)
        : NI_Next.of(props),
    chain(
      compose(
        async (props: SwitchImportProps) => ({
          ...props,
          content: (
            await promisify_(readFile)(props.pathToFile, {
              encoding: "utf-8",
            })
          ).replace(/\s+/g, ""),
        }),
        then(NI_Next.of),
        _catch((err: any) => {
          return Done.of({
            err,
          });
        })
      )
    ),

    then(
      map((props: SwitchImportProps) => ({
        ...props,
        imports: {
          truly: props.imports.truly.replace(/\s+/g, ""),
          trulyCommented: makeCommentedString(
            props.imports.truly,
            props.comment
          ).replace(/\s+/g, ""),
          fake: props.imports.fake.replace(/\s+/g, ""),
          fakeCommented: makeCommentedString(
            props.imports.fake,
            props.comment
          ).replace(/\s+/g, ""),
        },
      }))
    ),

    then(
      map((props: SwitchImportProps) => ({
        ...props,
        indexes: {
          truly: props.content.indexOf(props.imports.truly),
          trulyCommented: props.content.indexOf(props.imports.trulyCommented),
          fake: props.content.indexOf(props.imports.fake),
          fakeCommented: props.content.indexOf(props.imports.fakeCommented),
        },
      }))
    ),
    then(
      map((props: SwitchImportProps) =>
        cond([
          // already import fake
          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === true && indexes.fakeCommented === -1,
            justReturn,
          ],

          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === true && indexes.fakeCommented !== -1,
            (props: SwitchImportProps) => ({
              ...props,
              content: props.content
                .replace(props.imports.fakeCommented, props.imports.fake)
                .replace(props.imports.truly, props.imports.trulyCommented),
            }),
          ],

          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === false && indexes.trulyCommented === -1,
            justReturn,
          ],

          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === false && indexes.trulyCommented !== -1,
            (props: SwitchImportProps) => ({
              ...props,
              content: props.content
                .replace(props.imports.trulyCommented, props.imports.truly)
                .replace(props.imports.fake, props.imports.fakeCommented),
            }),
          ],

          [
            () => true,
            (props: SwitchImportProps) =>
              Done.of(
                `Bad indexes | ${props.isFake} | ${JSON.stringify(
                  props.indexes
                )}`
              ),
          ],
        ])(props)
      )
    ),

    /* then(
      map(tap((props: SwitchImportProps) => console.log("--------LOG", props)))
    ), /

    then(
      map(
        (props: SwitchImportProps) =>
          promisify_(writeFile)(props.pathToFile, props.content, {
            encoding: "utf-8",
          })
        /* tap((props: SwitchImportProps) =>
        //console.log("SAVE", props.pathToFile, props.content)
        
      ) /
      )
    ),

    thenDoneFlat(
      fold(
        (res: any) => console.error(res),
        (res: any) => {}
      )
    )
  );

export const switchImport = switchImport_(existsSync, promisify);
 */
