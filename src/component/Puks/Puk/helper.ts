export const calcPukWidth = (
  translateX: number,
  wrapperWidth: number,
  isIndexChanged: boolean
) => {
  if (wrapperWidth === 0) return 0;

  if (isIndexChanged) return wrapperWidth;

  const maxWidth = wrapperWidth - 100;
  const absTranslateX = Math.abs(translateX);

  return absTranslateX >= maxWidth ? maxWidth : absTranslateX;
};
