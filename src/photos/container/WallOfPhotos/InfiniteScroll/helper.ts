export const calcNumberOfItemsPerPage = (
  cardHeight: number,
  cardWidth: number
) => {
  if (typeof window === "undefined") return 0;

  let numberOfItemsPerPage = 0;

  const screenSquare = (window.screen.height * window.screen.width) / 3;

  const cardSquare = cardHeight * cardWidth;

  numberOfItemsPerPage = Math.ceil(screenSquare / cardSquare);

  numberOfItemsPerPage += Math.ceil(numberOfItemsPerPage / 4);

  return numberOfItemsPerPage;
};
