import Box from "@mui/system/Box";
import { useTags } from "../../tags";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import { tagsCollectionName } from "../../config";
import Button from "@mui/material/Button";

const TagsTab = () => {
  const { loading, error, tags, reLoad } = useTags();

  const tagsElements =
    tags === undefined
      ? null
      : tags.map((tag, i) => {
          return (
            <Box key={`${tag.name}_${i}`} width="230px" className="p-2">
              <Box typography="body2">id - {tag.id}</Box>
              <Box typography="body2">title - {tag.title}</Box>
              <Box typography="body2">type - {tag.type}</Box>
              <Box typography="body2">name - {tag.name}</Box>
            </Box>
          );
        });

  const tryToGetOneTag = async () => {
    const db = getFirestore();

    const tagRef = doc(db, tagsCollectionName, "bCcRcxADj2xP9fkSXNpH");

    const res = await getDoc(tagRef);

    console.log("----TRY TO GET ONE TAG", res);
  };

  const tryToAddTag = async () => {
    const db = getFirestore();

    const res = await addDoc(collection(db, tagsCollectionName), {
      title: "Los Angeles",
      type: "super-puper",
      name: "USA",
    });

    console.log("----TRY TO ADD TAG", res);
  };

  const tryToUpdateTag = async () => {
    const db = getFirestore();

    const tagRef = doc(db, tagsCollectionName, "bCcRcxADj2xP9fkSXNpH");

    const res = await updateDoc(tagRef, {
      type: "super-puper",
    });

    console.log("----TRY TO UPDATE TAG", res);
  };

  const tryToDeleteTag = async () => {
    const db = getFirestore();

    const tagRef = doc(db, tagsCollectionName, "bCcRcxADj2xP9fkSXNpH");

    const res = await deleteDoc(tagRef);

    console.log("----TRY TO DELETE TAG", res);
  };

  return (
    <Box width="900px" className="m-auto pt-2">
      <Box>
        <Button onClick={tryToGetOneTag}>get one</Button>
        <span> | </span>
        <Button onClick={tryToAddTag}>add</Button>
        <span> | </span>
        <Button onClick={tryToUpdateTag}>update</Button>
        <span> | </span>
        <Button onClick={tryToDeleteTag}>delete</Button>
        <span> | </span>
      </Box>
      <Box>
        <Box typography="body1">Tags state:</Box>
        <Box typography="body2">-loading - {loading}</Box>
        <Box typography="body2">-error - {error}</Box>

        <Box className="flex flex-wrap justify-center items-center">
          {tagsElements}
        </Box>
      </Box>

      <Box width="500px" className="m-auto">
        <Box typography="body1" component="h4" textAlign="center">
          Tags.
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - If user do not auth, he cann't get tags
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - User cann't get one tag (he can only get all)
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - User cann't remove tags
        </Box>
      </Box>
    </Box>
  );
};

export default TagsTab;
