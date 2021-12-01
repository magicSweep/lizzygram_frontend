import { compose, tap, cond, elif } from "fmagic";
import { maxFileSizeMB, isValidFileFormat } from "./helper/validation";

// DATE

export const dateValidate = cond<any, boolean | string>([
  [(val: Date) => val.toString() === "Invalid Date", () => "Некорректная дата"],
  [(val: Date) => val > new Date(), () => "Фотка сделана в будущем?"],
  [(val: Date) => val < new Date("2018-07-08"), () => "До дня рождения?"],
  [() => true, () => true],
]);

export const dateValidateOnEdit = elif(
  (val: Date | undefined | null) => val === undefined || val === null,
  () => true,
  dateValidate
);

export const dateValidateOnAdd = elif(
  (val: Date | undefined | null) => val === undefined || val === null,
  () => "Пожалуйста, укажите дату съемки, хотя бы примерно.",
  dateValidate
);

// DESCRIPTION

export const descValidate = (val: any) => {
  //console.log("VALIDATE", val);
  if (val !== undefined && val.length > 2000) return "Слишком длинно...";
  return true;
};

// PHOTO FILE

const photoValidate = (fileList: FileList | undefined | null) => {
  if (maxFileSizeMB(21, fileList[0].size) === false)
    return "Максимальный размер файла 21 Mb.";

  if (isValidFileFormat(["jpeg", "png", "jpg"], fileList[0].type) === false)
    return "Файл должен быть типа: jpeg, png, jpg";

  return true;
};

export const photoFileValidateOnAdd = (
  fileList: FileList | undefined | null
) => {
  //console.log("VALIDATE", fileList);
  if (fileList === undefined || fileList === null) return "А где фота?";

  if (fileList instanceof FileList !== true || fileList.length < 1)
    return "И где фота?";

  return photoValidate(fileList);
};

export const photoFileValidateOnEdit = (
  fileList: FileList | undefined | null
) => {
  //console.log("VALIDATE", fileList);
  if (fileList === undefined || fileList === null) return true;

  if (fileList instanceof FileList !== true || fileList.length < 1) return true;

  return photoValidate(fileList);
};
