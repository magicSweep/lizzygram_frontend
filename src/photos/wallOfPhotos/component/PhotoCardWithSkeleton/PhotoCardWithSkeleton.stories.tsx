/* import React, { useState, ComponentProps } from "react";
import PhotoCard from "./../PhotoCard";
import PhotoCardSkeleton from "./../PhotoCardSkeleton";
import PhotoCardWithSkeleton from ".";
import { photos } from "../../../loadPhotos/fake-data/fake.data";
import { Button } from "@mui/material";

export default {
  component: PhotoCard,
  title: "Component/PhotoCardWithSkeleton",
};

const props: any /* ComponentProps<typeof PhotoCard> / = {
  base64: photos[0].base64,
  iconSrc: photos[0].iconSrc,
  aspectRatio: photos[0].aspectRatio,
  favoriteBy: photos[0].favoriteBy,
  id: photos[0].id,
  tags: photos[0].tags,
  description: photos[0].description,
  downloadPhotoUrl: "https://bvwew.com",
  googleDriveId: photos[0].googleDriveId,
  imageExtension: photos[0].imageExtension,
  date: photos[0].date,
  ///
  photoCardWidth: 345,
  photoCardHeight: 194,
  isEditable: true,
  isEditor: true,
  index: 32,
  userUid: "jkFrANbtA4bBEjFsvWWbSOPdt56yt",
  showEditPhotoForm: () => console.log("Show edit form"),
  onImageClick: () => console.log("Image click"),
  //loadingFavorite,
  favoriteReqs: [],
  addFavorite: () => console.log("addFavorite"),
  removeFavorite: () => console.log("removeFavorite"),
};

export const Default = () => {
  const [isSkeleton, setIsSkeleton] = useState(true);

  return (
    <>
      <Button onClick={() => setIsSkeleton((prev) => !prev)}>Toggle</Button>
      <PhotoCardWithSkeleton isSkeleton={isSkeleton} {...props} />
      {/* {isSkeleton === true && (
        <PhotoCardSkeleton photoCardWidth={345} photoCardHeight={194} />
      )}
      {isSkeleton === false && <PhotoCard {...props} />} /}
    </>
  );
};
 */
