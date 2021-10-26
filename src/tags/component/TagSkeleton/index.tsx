import Skeleton from "@mui/material/Skeleton";

const TagSkeleton = () => (
  <Skeleton
    //className={classes.skeleton}
    variant="rectangular"
    animation="wave"
    width={120}
    height={24}
  />
);

export default TagSkeleton;
