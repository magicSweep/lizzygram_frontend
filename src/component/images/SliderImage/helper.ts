//export const calcIsWidthAuto = (width: string) => isNaN(parseInt(width));
export const calcIsWidthAuto = (isWrapperAspectRatioBigger: boolean) =>
  isWrapperAspectRatioBigger === false;

export const calcIsWrapperWider = (
  zoom: number,
  isWidthAuto: boolean,
  wrapperAspectRatio: number,
  photoAspectRatio: number
) => {
  if (zoom === 0) return true;

  // IF OUR WIDTH INITIALLY EQUALS TO 100%, WE DISABLE JUSTIFY CENTER ON ANY ZOOM VALUE
  if (isWidthAuto === true) return false;

  console.log(
    "IS WRAPPER WIDER",
    isWidthAuto,
    zoom,
    wrapperAspectRatio,
    photoAspectRatio
  );
  return wrapperAspectRatio >= photoAspectRatio * ((zoom + 100) / 100);
};

export const calcIsWrapperHigher = (
  zoom: number,
  isWidthAuto: boolean,
  wrapperAspectRatio: number,
  photoAspectRatio: number
) => {
  if (zoom === 0) return true;

  // IF OUR HEIGHT INITIALLY EQUALS TO 100%, WE DISABLE JUSTIFY CENTER ON ANY ZOOM VALUE
  if (isWidthAuto === false) return false;

  const marga = wrapperAspectRatio / photoAspectRatio;

  console.log(
    "IS WRAPPER HIGHER",
    isWidthAuto,
    zoom,
    wrapperAspectRatio,
    photoAspectRatio
  );
  return 1 >= marga * ((zoom + 100) / 100);
};

export const getZoomedImageStyle = (
  isWrapperAspectRatioBigger: boolean,
  zoom: number
) => {
  let height: string, width: string;

  if (isWrapperAspectRatioBigger === true) {
    width = "auto";
    height = `${100 + zoom}%`;
  } else {
    width = `${100 + zoom}%`;
    height = "auto";
  }

  return {
    //cursor: "pointer",
    width,
    height,
  };
};
