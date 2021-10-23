/* import React, { useCallback, useState } from "react";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  getFirestore,
  Firestore,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { compose, then, _catch } from "fmagic";

const collectionName = "users";

const onClick_ = (
  setResult: any,
  getFirestore_: typeof getFirestore,
  getDocs_: typeof getDocs,
  collection_: typeof collection,
  collectionName: string
) =>
  compose(
    () => setResult("...Loading"),
    () => getFirestore_(),
    (db: Firestore) => getDocs_(collection_(db, collectionName)),
    then((querySnapshot: QuerySnapshot<DocumentData>) => {
      let newResult = "";

      querySnapshot.forEach((doc) => {
        newResult += `${doc.id} | `;
      });
    }),
    then(setResult),
    _catch((err) => setResult(err.message))
  );

const GetAllUsers = () =>
  compose(
    () => useState(""),
    ([result, setResult]: any) => ({
      result,
      onClick: useCallback(
        onClick_(setResult, getFirestore, getDocs, collection, collectionName),
        []
      ),
    }),
    ({ result, onClick }: any) => (
      <div style={{ padding: "10px" }}>
        <button onClick={onClick}>Get users</button>
        {result && (
          <p
            style={{
              display: "block",
              padding: "5px",
              border: "1px solid black",
            }}
          >
            {result}
          </p>
        )}

        <ul>
          <li>
            <p>No one can get all users from users</p>
          </li>
        </ul>
      </div>
    )
  );


//const onSubmit_ = (setResult: any, )

const GetUserByUID = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const id = event.target.querySelector("input[name='userId']").value;

    //console.log("Submit", id);

    try {
      setResult("...Loading");

      const db = getFirestore();

      const userRef = doc(db, collectionName, userUid);

      const userSnap = await getDoc(userRef);

      const res = await getFirestoreDb()
        .collection(collectionName)
        .doc(id)
        .get();

      setResult(`Success | ${res.id}`);
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <form onSubmit={onSubmit}>
        <input
          style={{ height: "34px" }}
          type="submit"
          value="Try to get user by uid"
        />
        <input
          style={{ marginLeft: "10px" }}
          name="userId"
          placeholder="User uid"
        />
      </form>

      {result && (
        <p
          style={{
            display: "block",
            padding: "5px",
            border: "1px solid black",
          }}
        >
          {result}
        </p>
      )}

      <ul>
        <li>
          <p>It must return user if we use our uid.</p>
        </li>
        <li>
          <p>If we use not our uid it must return error</p>
        </li>
      </ul>
    </div>
  );
};

const TryToAddUser = () => {
  const [result, setResult] = useState("");
  const onClick = async () => {
    try {
      setResult("...Loading");
      const res = await getFirestoreDb().collection(collectionName).add({
        hello: true,
      });

      setResult(`Success | ${res.id}`);
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <button onClick={onClick}>Try to add user</button>
      {result && (
        <p
          style={{
            display: "block",
            padding: "5px",
            border: "1px solid black",
          }}
        >
          {result}
        </p>
      )}
      <ul>
        <li>
          <p>No one can add user.</p>
        </li>
      </ul>
    </div>
  );
};

const TryToDeleteUser = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const id = event.target.querySelector("input[name='userId']").value;

    //console.log("Submit", id);

    try {
      setResult("...Loading");
      await getFirestoreDb().collection(collectionName).doc(id).delete();

      setResult(`Success deleted | ${id}`);
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <form onSubmit={onSubmit}>
        <input
          style={{ height: "34px" }}
          type="submit"
          value="Try to delete user"
        />
        <input
          style={{ marginLeft: "10px" }}
          name="userId"
          placeholder="User id"
        />
      </form>

      {result && (
        <p
          style={{
            display: "block",
            padding: "5px",
            border: "1px solid black",
          }}
        >
          {result}
        </p>
      )}
      <ul>
        <li>
          <p>No one can delete user.</p>
        </li>
      </ul>
    </div>
  );
};

const TryToEditUser = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const id = event.target.querySelector("input[name='userId']").value;

    //console.log("Submit", id);

    try {
      setResult("...Loading");
      await getFirestoreDb().collection(collectionName).doc(id).update({
        hello: "Blue valentine",
      });

      setResult(`Success edited | ${id}`);
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <form onSubmit={onSubmit}>
        <input
          style={{ height: "34px" }}
          type="submit"
          value="Try to edit user"
        />
        <input
          style={{ marginLeft: "10px" }}
          name="userId"
          placeholder="User id"
        />
      </form>

      {result && (
        <p
          style={{
            display: "block",
            padding: "5px",
            border: "1px solid black",
          }}
        >
          {result}
        </p>
      )}

      <ul>
        <li>
          <p>No one can edit user.</p>
        </li>
      </ul>
    </div>
  );
};

const UsersTab = () => {
  return (
    <div style={{ padding: "30px" }}>
      <GetAllUsers />

      <GetUserByUID />

      <TryToAddUser />

      <TryToEditUser />

      <TryToDeleteUser />
    </div>
  );
};

export default UsersTab;
 */
