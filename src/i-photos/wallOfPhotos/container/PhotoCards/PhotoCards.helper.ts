export const getSlicedArrayOfPhotos = (
  items: any[],
  //itemsLength: number,
  numberOfAdded: number,
  //numberOfBlocks: number,
  blockIndex: number,
  numberOfPhotosInBlock: number
) => {
  let result: any[] = [];

  // do we have added photos
  if (numberOfAdded > 0) {
    // do we have added photos in that row
    if (numberOfAdded > (blockIndex as number) * numberOfPhotosInBlock) {
      // how many exactly
      const fNumberOfAdded =
        numberOfAdded - (blockIndex as number) * numberOfPhotosInBlock;

      for (let i = 0; i < numberOfPhotosInBlock; i++) {
        if (i < fNumberOfAdded) {
          result.push(null);
        } else {
          const index = blockIndex * numberOfPhotosInBlock + i - numberOfAdded;
          result.push(items[index]);
        }
      }
    } else {
      for (let i = 0; i < numberOfPhotosInBlock; i++) {
        const index = blockIndex * numberOfPhotosInBlock + i - numberOfAdded;
        if (index < items.length) result.push(items[index]);
      }
    }
  } else {
    // slice
    result = items.slice(
      (blockIndex as number) * numberOfPhotosInBlock,
      ((blockIndex as number) + 1) * numberOfPhotosInBlock
    );
  }

  return result;
};
