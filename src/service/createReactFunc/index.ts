import { compose, then, _catch } from "fmagic";
import { existsSync, mkdir, writeFile } from "fs";
import { promisify } from "util";

export type FuncInfo = {
  name: string;
  pathToDir: string;
};

export const createFunc = compose<FuncInfo, Promise<void>>(
  async (info: FuncInfo) => {
    await createDir(info.pathToDir);
    return info;
  },
  then(async ({ pathToDir, name }: FuncInfo) => {
    await Promise.all([
      createMainFile(name, pathToDir),
      createStoriesFile(name, pathToDir),
      createTestFile(name, pathToDir),
    ]);

    return { pathToDir, name };
  }),
  then(({ pathToDir, name }: FuncInfo) =>
    console.log(`[SUCCESS CREATED] ${pathToDir}/${name}`)
  ),
  _catch((err: any) => console.error(err))
);

export const createDir = async (pathToDir: string): Promise<void> => {
  if (existsSync(pathToDir) === false) {
    await promisify(mkdir)(pathToDir);
  }

  return;
};

export const createMainFile = async (
  name: string,
  pathToDir: string
): Promise<void> => {
  const content = `import React, {FC} from 'react';

export type ${name}Props = {}

const ${name}: FC<${name}Props> = ({}) => {

  return (<></>);
};

export default ${name};
        `;

  const fileName = pathToDir + "/" + name + ".tsx";

  //console.log(fileName);
  //console.log(content);

  /* , (error: any) => {
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись main файла завершена. Содержимое файла:");
    } */
  return promisify(writeFile)(fileName, content);
};

export const createStoriesFile = (
  name: string,
  pathToDir: string
): Promise<void> => {
  const content = `import ${name}, {${name}Props} from "./${name}";
        
export default {
    component: ${name},
    title: "Component/${name}",
};

const Template = (args: ${name}Props) => (<${name} {...args} />)

export const Default = Template.bind({});

Default.args = {}
        `;

  const fileName = pathToDir + "/" + name + ".stories.tsx";

  //console.log(fileName);
  //console.log(content);

  /* , (error: any) => {
      if (error) throw error; // если возникла ошибка
      console.log(
        "Асинхронная запись stories файла завершена. Содержимое файла:"
      );
    } */
  return promisify(writeFile)(fileName, content);
};

export const createTestFile = (
  name: string,
  pathToDir: string
): Promise<void> => {
  const content = `
import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import ${name} from "./${name}";

describe("${name}", () => {

  let _render = null;
  
  describe("Snapshots", () => {
  
      beforeEach(() => {
      
          _render = render(<${name} />);
      
      });

      afterEach(cleanup)
  
      test("matches snapshot", () => {
        const { baseElement } = _render;
        expect(baseElement).toMatchSnapshot();
      });
  
  });

});
      `;

  const fileName = pathToDir + "/" + name + ".test.tsx";

  //console.log(fileName);
  //console.log(content);

  /* , (error: any) => {
    if (error) throw error; // если возникла ошибка
    console.log("Асинхронная запись тестогого файла завершена.");
  } */
  return promisify(writeFile)(fileName, content);
};

/* const fs = require("fs");

const args: string[] = process.argv.slice(2);

//npm run create:func -- Render component/Render
class CreateReactFuncTS {
  mainDir: string = "./src/";
  funcName: string = "";
  funcFileName: string = "";
  dir: string = "";

  constructor(funcName: string, dir: string) {
    if (funcName && dir) {
      let funcFirstLetter = funcName[0];
      let funcOtherLetters = funcName.substring(1);

      //this.funcName = funcFirstLetter.toLowerCase() + funcOtherLetters;
      this.funcName = funcFirstLetter.toUpperCase() + funcOtherLetters;
      this.funcFileName = funcFirstLetter.toUpperCase() + funcOtherLetters;

      //TODO check if first char in dir equal "/"
      //TODO check if last char in dir equal "/"
      this.dir = this.mainDir + dir;

      this.create();
    } else {
      throw new Error("Empty funcName or dir...");
    }
  }

  create(): void {
    //create class name dir
    this.createDir();
    //create class file
    this.createClassFile();
    //create scss file
    //this.createScssFile();
    this.createSoriesFile();
    //create .test file
    this.createTestFile();
  }

  createDir(): void {
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }
  }

  createClassFile(): void {
    const content = `import React from 'react';
import classes from './${this.funcFileName}.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
//import { styled, makeStyles, Theme } from "@material-ui/core/styles";
//import { compose, sizing, positions } from "@material-ui/system";


interface I${this.funcFileName}Props  {
    
}

/*const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: props => ({}),
  })
)/

const ${this.funcName} = ({}: ${this.funcFileName}Props) => {

  return (
        
        <div className={classes.root}></div>
            
    );
};

export default ${this.funcName};
        `;

    const fileName = this.dir + "/" + this.funcFileName + ".tsx";

    //console.log(fileName);
    //console.log(content);

    fs.writeFile(fileName, content, (error: any) => {
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись main файла завершена. Содержимое файла:");
    });
  }

  createSoriesFile(): void {
    const content = `import React from "react";
import ${this.funcFileName}, {I${this.funcFileName}Props} from "./${this.funcFileName}";
        
export default {
    component: ${this.funcFileName},
    title: "Component/${this.funcFileName}",
    decorators: [],
    //decorators: [ (story) => <div>{story()}</div> ],
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

const Template = (args: I${this.funcFileName}Props) => (<${this.funcFileName} {...args} />)

export const Default = Template.bind({});

(Default as any).args = {
  onClick: () => console.log("on click")
}
        `;

    const fileName = this.dir + "/" + this.funcFileName + ".stories.js";

    //console.log(fileName);
    //console.log(content);

    fs.writeFile(fileName, content, (error: any) => {
      if (error) throw error; // если возникла ошибка
      console.log(
        "Асинхронная запись stories файла завершена. Содержимое файла:"
      );
    });
  }


  createScssFile(): void {
    const content = `.${this.funcFileName}{
            
}`;

    const fileName = this.dir + "/" + this.funcFileName + ".module.scss";

    //console.log(fileName);
    //console.log(content);

    fs.writeFile(fileName, content, (error: any) => {
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись css файла завершена. Содержимое файла:");
    });
  }

  createTestFile(): void {
    const content = `
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import ${this.funcFileName} from "./${this.funcFileName}";
import classes from './${this.funcFileName}.module.scss';


describe("${this.funcFileName}", () => {

    let _render = null;
    
    describe("Snapshots", () => {
    
        beforeEach(() => {
        
            _render = render(<${this.funcFileName} />);
        
        });

        afterEach(cleanup)
    
        test("matches snapshot", () => {
          const { baseElement } = _render;
          expect(baseElement).toMatchSnapshot();
        });
    
    });

});

        `;

    const fileName = this.dir + "/" + this.funcFileName + ".test.js";

    //console.log(fileName);
    //console.log(content);

    fs.writeFile(fileName, content, (error: any) => {
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись тестогого файла завершена.");
    });
  }
}

new CreateReactFuncTS(args[0], args[1]);

export default CreateReactFuncTS;
 */
