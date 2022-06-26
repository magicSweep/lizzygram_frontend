/* if (state.numberOfItemsByFlex !== 0) {
    for (let y = 0; y < pages; y++) {
      itemsArrays[y] = items.slice(
        y * state.numberOfItemsByFlex,
        state.numberOfItemsByFlex * (y + 1)
      );
    }
  } */

/* export const getArraysOfItemsByBlocks = (
  items: any[],
  numberOfBlocks: number,
  numberOfItemsInBlock: number,
  numberOfAddedItems: number
) => {
  const itemsArrays: any[][] = [];

  const itemsLength = items.length;

  for (let y = 0; y < numberOfBlocks; y++) {
    itemsArrays[y] = [];
    for (let i = 0; i < numberOfItemsInBlock; i++) {
      if (y === 0 && numberOfAddedItems > 0 && i < numberOfAddedItems) {
        itemsArrays[y].push(null);
      } else {
        //console.log("PUSH", y * numberOfItemsByFlex, i, numberOfAddedPhotos);

        let index = y * numberOfItemsInBlock + i - numberOfAddedItems;

        //console.log("PUSH", index);

        if (index < itemsLength) {
          itemsArrays[y].push(items[index]);
        }
      }
    }
    /* itemsArrays[y] = items.slice(
      y * numberOfItemsByFlex,
      numberOfItemsByFlex * (y + 1)
    ); /
  }

  return itemsArrays;
}; */

/* export const calcContainerWidth = () => {
  // padding 20px, margin 32px
  // 640 - 8
  // - 64
  const bodyWidth = Math.round(document.body.clientWidth);
  return bodyWidth <= 640 ? bodyWidth - 8 : bodyWidth - 64;
  //return Math.round(document.querySelector("main").clientWidth * 0.9);
}; */

export const calcNumberOfItemsByWidth = (
  containerWidth: number,
  cardWidth: number
) => Math.floor(containerWidth / cardWidth);

export const calcItemsWrapperHeight = (
  numberOfItemsByWidth: number,
  numberOfItemsPerPage: number,
  cardHeight: number
) => {
  const numberOfItemsByHeight = Math.floor(
    numberOfItemsPerPage / numberOfItemsByWidth
  );

  return numberOfItemsByHeight * cardHeight;
};

export const calcNumberOfItemsByFlex = (
  numberOfItemsByWidth: number,
  numberOfItemsPerPage: number
) => {
  //const numberOfItemsByWidth = Math.floor(containerWidth / cardWidth);

  return (
    Math.floor(numberOfItemsPerPage / numberOfItemsByWidth) *
    numberOfItemsByWidth
  );
};

/*  const containerWidth = Math.round(document.body.clientWidth * 0.8);
  
      console.log("RESIZE", document.body.clientWidth, containerWidth);
  
      const cardWidth = 200 + 8;
  
      const cardHeight = 150 + 8;
  
      const numberOfItemsByWidth = Math.floor(containerWidth / cardWidth);
  
      const numberOfItemsByHeight = Math.floor(
        numberOfItemsPerPage / numberOfItemsByWidth
      );
  
      const numberOfItemsByFlex =
        Math.floor(numberOfItemsPerPage / numberOfItemsByWidth) *
        numberOfItemsByWidth;
  
      const height = numberOfItemsByHeight * cardHeight;
  
            console.log("numberOfItemsByWidth", numberOfItemsByWidth);
  
            setState({
              height,
              containerWidth,
              numberOfItemsByFlex,
            }); */
