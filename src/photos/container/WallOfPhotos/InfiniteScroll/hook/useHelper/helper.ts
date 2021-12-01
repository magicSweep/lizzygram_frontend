/* if (state.numberOfItemsByFlex !== 0) {
    for (let y = 0; y < pages; y++) {
      itemsArrays[y] = items.slice(
        y * state.numberOfItemsByFlex,
        state.numberOfItemsByFlex * (y + 1)
      );
    }
  } */

export const getItemsArrays = (
  items: any[],
  pages: number,
  numberOfItemsByFlex: number,
  numberOfAddedPhotos: number
) => {
  const itemsArrays = [];

  const itemsLength = items.length;

  for (let y = 0; y < pages; y++) {
    itemsArrays[y] = [];
    for (let i = 0; i < numberOfItemsByFlex; i++) {
      if (y === 0 && numberOfAddedPhotos > 0 && i < numberOfAddedPhotos) {
        itemsArrays[y].push(null);
      } else {
        //console.log("PUSH", y * numberOfItemsByFlex, i, numberOfAddedPhotos);

        let index = y * numberOfItemsByFlex + i - numberOfAddedPhotos;

        //console.log("PUSH", index);

        if (index < itemsLength) {
          itemsArrays[y].push(items[index]);
        }
      }
    }
    /* itemsArrays[y] = items.slice(
      y * numberOfItemsByFlex,
      numberOfItemsByFlex * (y + 1)
    ); */
  }

  return itemsArrays;
};

export const calcContainerWidth = () => {
  return Math.round(document.body.clientWidth * 0.9);
  //return Math.round(document.querySelector("main").clientWidth * 0.9);
};

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
