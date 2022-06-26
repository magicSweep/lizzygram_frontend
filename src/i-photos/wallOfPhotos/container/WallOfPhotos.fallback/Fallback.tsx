import React, { FC } from "react";
import PhotoCardSkeleton from "../../component/PhotoCardSkeleton";

const Fallback: FC<{
  numberOfPhotosPerQuery: number;
  photoCardHeight: number;
  photoCardWidth: number;
}> = ({ numberOfPhotosPerQuery, photoCardHeight, photoCardWidth }) => {
  console.log("RENDER ", numberOfPhotosPerQuery, [
    ...Array(numberOfPhotosPerQuery).keys(),
  ]);

  const skeletons = [...Array(numberOfPhotosPerQuery).keys()].map((v, i) => {
    return (
      <div key={`item_skeleton_${v}_ ${i}`} className="p-2">
        <PhotoCardSkeleton
          photoCardHeight={photoCardHeight}
          photoCardWidth={photoCardWidth}
        />
      </div>
    );
  });

  /* <div className={`m-auto pt-5 pb-10 w-9/12 `}>
      <div className={`w-full flex flex-wrap justify-around`}>
        <PhotoCardSkeletons numberOfSkeletons={numberOfPhotosPerQuery} />
      </div>
    </div> */

  return (
    <div className="m-auto pt-10 pb-10 w-9/12">
      <div className="w-full flex flex-wrap justify-around">{skeletons}</div>
    </div>
    /*  <div className={`m-auto pt-5 pb-10 flex flex-wrap justify-between`}>
      <PhotoCardSkeletons numberOfSkeletons={numberOfPhotosPerQuery} />
    </div> */
  );
};

export default Fallback;
