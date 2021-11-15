export const isFileInputEmpty = (fileList?: FileList) => {
  return (
    fileList === undefined ||
    fileList instanceof FileList !== true ||
    fileList.length < 1
  );
};

// max - file size in MB, value - file size in bytes
export const maxFileSizeMB = (max: number, val: number) =>
  fromBytesToMB(val) <= max;

// @type - MIME type like image/jpeg or application/json
export const isValidFileFormat = (formats: string[], type: string) => {
  const format = type.split("/")[1];

  return formats.includes(format);
};

export const fromBytesToMB = (bytes: number) => {
  if (bytes === 0) return 0;

  return bytes / (1024 * 1024);
};
