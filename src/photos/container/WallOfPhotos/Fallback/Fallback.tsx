import React, { FC } from "react";
import PhotoCardSkeletons from "../../../component/PhotoCardSkeletons";

const Fallback: FC<{ numberOfPhotosPerQuery: number }> = ({
  numberOfPhotosPerQuery,
}) => {
  return (
    <div className={`m-auto pt-5 pb-10 flex flex-wrap justify-between`}>
      <PhotoCardSkeletons numberOfSkeletons={numberOfPhotosPerQuery} />
    </div>
  );
};

export default Fallback;
