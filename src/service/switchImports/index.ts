import { SwitchImportProps } from "./switchImport";
import { join } from "path";

const pathToPhotosServices = join(process.cwd(), "src/photos/service");
const pathToAuthServices = join(process.cwd(), "src/auth/service");
const pathToTagsServices = join(process.cwd(), "src/tags/service");

export const photoWorkerImports: SwitchImportProps = {
  pathToFile: `${pathToPhotosServices}/WorkerService.ts`,
  imports: {
    truly: 'import { add, edit } from "../api/worker";',
  },
};

export const photoDbImports: SwitchImportProps = {
  pathToFile: `${pathToPhotosServices}/DbService.ts`,
  imports: {
    truly: `"../repository/firestore";`,
  },
};

export const authServiceImports: SwitchImportProps = {
  pathToFile: `${pathToAuthServices}/AuthService.ts`,
  imports: {
    truly: `"./../../firebase/firebase.auth";`,
  },
};

export const authDbServiceImports: SwitchImportProps = {
  pathToFile: `${pathToAuthServices}/DbService.ts`,
  imports: {
    truly: '"../repository/firestore";',
  },
};

export const tagsServiceImports: SwitchImportProps = {
  pathToFile: `${pathToTagsServices}/index.ts`,
  imports: {
    truly: '"../repository/firestore";',
  },
};

//[tagsServiceImports as SwitchImportProps].map(switchImport);
