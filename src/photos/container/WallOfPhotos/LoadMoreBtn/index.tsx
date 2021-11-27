import Button from "@mui/material/Button";
import { FC } from "react";
import { Photo, FirestoreDate } from "../../../types";

export interface ILoadMoreBtnProps {
  photos: Photo<FirestoreDate>[] | undefined;
  hasNextPage: boolean;
  onLoadMore: any;
  //error: any;
  loading: boolean;
}

const LoadMoreBtn: FC<ILoadMoreBtnProps> = ({
  photos,
  hasNextPage,
  onLoadMore,
  //error,
  loading,
}) => {
  if (/* error === true || */ loading === true) return null;

  if (photos === undefined) return null;

  if (hasNextPage === false) return null;

  return (
    <div className="text-center pt-4 pb-5">
      <Button color="secondary" onClick={onLoadMore}>
        Загрузить еще...
      </Button>
    </div>
  );
};

export default LoadMoreBtn;
