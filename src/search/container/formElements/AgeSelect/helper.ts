//import { lizzyYearsOld } from "../../../config";
import { getLizzyYearsOld } from "../../../../utils/app";

export type IOption = {
  value: string;
  label: string;
};

export const makeOptionsForAgeSelect = () => {
  const options: IOption[] = [{ value: "-1", label: "Любой" }];

  const lizzyYearsOld = getLizzyYearsOld();

  for (let i = 0; i <= lizzyYearsOld; i++) {
    switch (i) {
      case 0:
        options.push({ value: "0", label: "Меньше года" });
        break;
      case 1:
        options.push({ value: "1", label: "1 год" });
        break;
      case 2:
        options.push({ value: "2", label: "2 года" });
        break;
      case 3:
        options.push({ value: "3", label: "3 года" });
        break;
      case 4:
        options.push({ value: "4", label: "4 года" });
        break;
      case 5:
        options.push({ value: "5", label: "5 лет" });
        break;
      case 6:
        options.push({ value: "6", label: "6 лет" });
        break;
      case 7:
        options.push({ value: "7", label: "7 лет" });
        break;
      case 8:
        options.push({ value: "8", label: "8 лет" });
        break;
      case 9:
        options.push({ value: "9", label: "9 лет" });
        break;
      case 10:
        options.push({ value: "10", label: "10 лет" });
        break;
      case 11:
        options.push({ value: "11", label: "11 лет" });
        break;
      case 12:
        options.push({ value: "12", label: "12 лет" });
        break;
      case 13:
        options.push({ value: "13", label: "13 лет" });
        break;
      case 14:
        options.push({ value: "14", label: "14 лет" });
        break;
      case 15:
        options.push({ value: "15", label: "15 лет" });
        break;
      case 16:
        options.push({ value: "16", label: "16 лет" });
        break;

      default:
        throw new Error(`No implementation or bad data | ${i}`);
    }
  }

  return options;
};
