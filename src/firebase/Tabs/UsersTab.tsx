import Box from "@mui/system/Box";
import { useTags } from "../../tags";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import { usersCollectionName } from "../../config";
import Button from "@mui/material/Button";

const UsersTab = () => {
  const tryToGetAllUsers = async () => {
    const db = getFirestore();

    const res = await getDocs(collection(db, usersCollectionName));

    console.log("----TRY TO GET All USERs", res);
  };

  const tryToGetOneUser = async () => {
    const db = getFirestore();

    const userRef = doc(
      db,
      usersCollectionName,
      "mdFrANbtA4bBEjFsvWWbSOPdfLB2"
    );

    const res = await getDoc(userRef);

    console.log("----TRY TO GET ONE USER", res);
  };

  const tryToAddUser = async () => {
    const db = getFirestore();

    const res = await addDoc(collection(db, usersCollectionName), {
      title: "Los Angeles",
      type: "super-puper",
      name: "USA",
    });

    console.log("----TRY TO ADD USER", res);
  };

  const tryToUpdateUser = async () => {
    const db = getFirestore();

    const userRef = doc(
      db,
      usersCollectionName,
      "mdFrANbtA4bBEjFsvWWbSOPdfLB2"
    );

    const res = await updateDoc(userRef, {
      type: "super-puper",
    });

    console.log("----TRY TO UPDATE USER", res);
  };

  const tryToDeleteUser = async () => {
    const db = getFirestore();

    const userRef = doc(
      db,
      usersCollectionName,
      "mdFrANbtA4bBEjFsvWWbSOPdfLB2"
    );

    const res = await deleteDoc(userRef);

    console.log("----TRY TO DELETE USER", res);
  };

  return (
    <Box width="600px" className="m-auto pt-2">
      <Button onClick={tryToGetAllUsers}>get all</Button>
      <span> | </span>
      <Button onClick={tryToGetOneUser}>get one</Button>
      <span> | </span>
      <Button onClick={tryToAddUser}>add</Button>
      <span> | </span>
      <Button onClick={tryToUpdateUser}>update</Button>
      <span> | </span>
      <Button onClick={tryToDeleteUser}>delete</Button>
      <span> | </span>

      <Box width="500px" className="m-auto">
        <Box typography="body1" component="h4" textAlign="center">
          Users.
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - User can get only it's own record. Any other actions not allowed
        </Box>
      </Box>
    </Box>
  );
};

export default UsersTab;
