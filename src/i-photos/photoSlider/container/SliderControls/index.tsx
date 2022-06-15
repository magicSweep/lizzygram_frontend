import SliderControlsWidget from "../../component/SliderControls";
import { usePhotoSliderContext } from "../../hook/usePhotoSliderContext";

const SliderControls = () => {
  const {
    photosLength,
    increaseIndex,
    decreaseIndex,
    activePhotoIndex: activeIndex,
    hasNextPage,
    fetchMore,
  } = usePhotoSliderContext();

  return (
    <SliderControlsWidget
      itemsLength={photosLength}
      increaseIndex={increaseIndex}
      decreaseIndex={decreaseIndex}
      activeIndex={activeIndex}
      fetchMore={fetchMore}
      hasNextPage={hasNextPage}
    />
  );
};

export default SliderControls;
