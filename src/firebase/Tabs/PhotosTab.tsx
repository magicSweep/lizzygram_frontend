import Box from "@mui/system/Box";
import { LoadableSearchPhotoForm } from "../../search";
import SearchBtn from "../../search/container/SearchBtn/SearchBtn";
import { usePhotos } from "../../photos";
import { Photo, FirestoreDate } from "../../photos/types";
import {
  collection,
  query,
  where,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import {
  addOne,
  getOne,
  editOne,
  getAllBySearchTerms,
} from "../../photos/repository/firestore";
import { photosCollectionName } from "../../config";
import Button from "@mui/material/Button";
import { getPhoto, addPhoto, editPhoto } from "../../photos/service/DbService";

const getTagElems = (tags: { [id: string]: boolean }) => {
  for (let id in tags) {
    return (
      <p key={`${id}_${Math.random() * 100000}`}>
        {" -"}
        {id} - {tags[id]}
      </p>
    );
  }
};

const getPhotoElem = (photo: Photo<FirestoreDate>, index: number) => {
  return (
    <Box
      typography="body1"
      key={`${photo.id}_${index}`}
      width="300px"
      className="m-1 p-2 overflow-auto bg-green-100"
    >
      <p>id - {photo.id}</p>
      <p>aspectRatio - {photo.aspectRatio}</p>
      <p>srcSet - {photo.srcSet}</p>
      <p>iconSrc - {photo.iconSrc}</p>
      <p>description - {photo.description}</p>
      <p>date - {photo.date.toDate().toUTCString()}</p>
      <p>yearsOld - {photo.yearsOld}</p>
      <p>tags: </p>
      {getTagElems(photo.tags)}
      <p>addedByUserUID - {photo.addedByUserUID}</p>
      <p>googleDriveId - {photo.googleDriveId}</p>
      <p>imageExtention - {photo.imageExtention}</p>
      <p>isActive - {photo.isActive.toString()}</p>
    </Box>
  );
};

const photoId = "1639680164863";

const photoData = {
  id: "1639680164863",
  files: ["hello123.jpb"],
  base64: "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFx",
  aspectRatio: 1.3,
  date: new Date("2020-08-08"),
  description: "We are going home...",
  tags: { ieYx4ke8ms0DJb5APv4u: true, vekwWqVY1222eeXeERmd: true },
  yearsOld: 2,
  googleDriveId: "",
  addedByUserUID: "mdFrANbtA4bBEjFsvWWbSOPdfLB2",
  isActive: true,
  imageExtention: "jpeg",
};

const PhotosTab = () => {
  console.log("-----------RENDER START");

  const {
    loadPhotos,
    loadMore,
    loading,
    error,
    searchState,
    photos,
    hasNextPage,
    nextPageDocRef,
    numberOfAddedPhotoReqs,
    editedPhotosIds,
  } = usePhotos();

  const photosElem = photos === undefined ? null : photos.map(getPhotoElem);

  const testPhoto = async () => {
    /* const db = getFirestore();

    const photosRef = collection(db, photosCollectionName);

    // [where(), where()]
    const wheres = [
      //where("tags.bCcRcxADj2xP9fkSXNpH", "==", true),
      //where("tags.ieYx4ke8ms0DJb5APv4u", "==", true),
      //where("tags.saDWGntDo84EQYG8FGFE", "==", true),
      where("yearsOld", "==", 1),
    ];
    const q = query(photosRef, ...wheres);

    const querySnapshot = await getDocs(q);

    */

    const data = await getAllBySearchTerms(
      {
        tags: undefined /* {
          bCcRcxADj2xP9fkSXNpH: true,
          ieYx4ke8ms0DJb5APv4u: true,
          saDWGntDo84EQYG8FGFE: true,
        } */,
        age: -1,
      },
      undefined,
      35
    );

    /* const photos = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      photos.push({
        id: doc.id,
        ...doc.data(),
      });
      //console.log(doc.id, "=>", doc.data());
    }); */

    console.log("-----PHOTOS", JSON.stringify(data.docs));
  };

  const tryToGetPhotoById = async () => {
    //const db = getFirestore();

    const res = await getPhoto("1600128056213");
    //const res = await setDoc(doc(db, photosCollectionName, photoId), photoData);

    console.log("----TRY TO GET PHOTO BY ID", res);
  };

  const tryToAddPhoto = async () => {
    const db = getFirestore();

    //const res = await setDoc(doc(db, photosCollectionName, photoId), photoData);

    const res = await addPhoto(photoData as any);

    console.log("----TRY TO ADD PHOTO", res);
  };

  const tryToUpdatePhoto = async () => {
    const db = getFirestore();

    /* const photoRef = doc(db, photosCollectionName, photoId);

    const res = await updateDoc(photoRef, {
      googleDriveId: "googleDrive123",
    }); */

    const res = await editPhoto({
      photoId,
      fieldsToUpdate: { googleDriveId: "googleDrive123" } as any,
    });

    console.log("----TRY TO UPDATE PHOTO", res);
  };

  const tryToDeletePhoto = async () => {
    const db = getFirestore();

    const photoRef = doc(db, photosCollectionName, photoId);

    const res = await deleteDoc(photoRef);

    console.log("----TRY TO DELETE PHOTO", res);
  };

  console.log("-----------RENDER", photosElem);

  // search btn
  // search form

  // test add photo
  // test edit photo

  return (
    <Box width="80%" className="m-auto pt-2">
      <Box className="relative w-16 h-16 mx-auto my-2 bg-green-300 rounded-lg">
        <SearchBtn />
      </Box>

      <Box>
        <Button onClick={testPhoto}>test terms</Button>
        <span> | </span>
        <Button onClick={tryToGetPhotoById}>get by id</Button>
        <span> | </span>
        <Button onClick={tryToAddPhoto}>add</Button>
        <span> | </span>
        <Button onClick={tryToUpdatePhoto}>update</Button>
        <span> | </span>
        <Button onClick={tryToDeletePhoto}>delete</Button>
        <span> | </span>
      </Box>

      <LoadableSearchPhotoForm />

      <Box typography="body1" component="h2" textAlign="center">
        Photos state.
      </Box>

      <Box typography="body2">
        <p>- loading - {loading.toString()}</p>
        <p>- error - {error.toString()}</p>
        <p>- hasNextPage - {hasNextPage.toString()}</p>
        <p>
          - nextPageDocRef -{" "}
          {nextPageDocRef === undefined
            ? "undefined"
            : nextPageDocRef === null
            ? "null"
            : nextPageDocRef.toString()}
        </p>
        <p>- numberOfAddedPhotoReqs - {numberOfAddedPhotoReqs.toString()}</p>
        <p>- editedPhotosIds - {editedPhotosIds.toString()}</p>
        <Box typography="body1">Search state:</Box>
        <p>- showForm - {searchState.showForm.toString()}</p>
        <p>- isSearch - {searchState.isSearch.toString()}</p>
        <p>- tags: </p>
        {getTagElems(searchState.terms.tags)}
        <p>- age - {searchState.terms.age}</p>
      </Box>

      <Box
        typography="body1"
        component="h4"
        textAlign="center"
        className="flex p-2 justify-center items-center"
      >
        <p className="mr-3">
          Photos - {photos === undefined ? "undefined" : `${photos.length}`}
        </p>
        <Button onClick={loadMore} disabled={hasNextPage === false}>
          Load more
        </Button>
      </Box>
      <Box
        height="400px"
        className="overflow-auto flex flex-wrap justify-center items-center bg-blue-100"
      >
        {photosElem}
      </Box>

      <Box width="600px" className="m-auto  pt-2">
        <Box typography="body1" component="h4" textAlign="center">
          Photos description.
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - Get all photos related with search state, if search state changes it
          triggers new request.
        </Box>
      </Box>

      <Box width="600px" className="m-auto  pt-2">
        <Box typography="body1" component="h4" textAlign="center">
          Photos rules.
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - If user do not auth, he cann't get photos
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - User cann't get one photo, if he do not author of this photo
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - User cann't edit photo, if he do not author of this photo
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - User cann't remove photo or photos
        </Box>
      </Box>
    </Box>
  );
};

export default PhotosTab;
