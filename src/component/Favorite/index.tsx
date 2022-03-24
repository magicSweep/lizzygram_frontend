import React, { FC, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoadingWrapperWidget from "../LoadingWrapper/LoadingWrapperWidget";

export type FavoriteProps = {
  loading: boolean;
  add: () => Promise<void>;
  remove: () => Promise<void>;
  isFavorite: boolean;
};

const Favorite: FC<FavoriteProps> = ({ loading, add, remove, isFavorite }) => {
  //const [loading, setLoading] = useState(false);

  /* const add_ = async () => {
    setLoading(true);

    await add();

    setLoading(false);
  }; */

  return (
    <Tooltip title={"Избранное"}>
      <span className="relative">
        {isFavorite === true && (
          <IconButton
            disabled={loading}
            onClick={remove}
            aria-label="повернуть экран"
          >
            <FavoriteIcon sx={{ fill: "white" }} fontSize="small" />
          </IconButton>
        )}

        {isFavorite === false && (
          <IconButton
            disabled={loading}
            onClick={add}
            aria-label="повернуть экран"
          >
            <FavoriteBorderIcon sx={{ fill: "white" }} fontSize="small" />
          </IconButton>
        )}

        {loading === true && (
          <LoadingWrapperWidget
            circle={true}
            transparentBg={true}
            thickness={10.6}
          />
        )}
      </span>
    </Tooltip>
  );
};

export default Favorite;
