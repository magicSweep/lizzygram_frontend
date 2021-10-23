/* import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout } from "../../container/Layout";
import { useAuth } from "../hook/useAuth";
import { Tabs } from "../../component/Tabs";
import PhotoTab from "./PhotoTab";
import TagsTab from "./TagsTab";
import UsersTab from "./UsersTab";
import { GlobalState } from "../../types";
import { AuthState } from "../types";
import initApp from "../../service/firebase/initApp";

export default {
  component: Tabs,
  title: "Auth/Index",
};

// CONFIG FIRESTORE
initApp();

const ShowAuthState = () => {
  const authState = useSelector<GlobalState, AuthState>((state) => state.auth);

  let authStateElem = undefined;

  if (authState) {
    authStateElem = [];

    for (let prop in authState) {
      authStateElem.push(
        <p>
          {prop} -
          {typeof (authState as any)[prop] === "object"
            ? JSON.stringify((authState as any)[prop])
            : (authState as any)[prop]}
        </p>
      );
    }
  }

  return (
    <div className="p-5 border-2 border-solid border-blue-300">
      <h4>Auth state</h4>
      {JSON.stringify(authState)}
    </div>
  );
};

export const Default = () => {
  useAuth();

  return (
    <Layout>
      <Tabs titles={["Auth", "Photo", "Tags", "Users"]}>
        <div style={{ padding: "30px" }}>
          <div>
            <ShowAuthState />

            <br />
            <br />

            <h3>SignIn:</h3>
            <p style={{ padding: "15px" }}>
              We must sign in user with google account and on success send
              additional request to check if user in users collection and save
              result to local storage.
            </p>

            <h3>Firestore Rules:</h3>
            <p style={{ padding: "15px" }}>
              <ul>
                <li>User can read if he is auth</li>
                <li>User can add/edit only if he exists in users collection</li>
                <li>User can edit if addByUser = user.uid</li>
              </ul>
            </p>
          </div>
        </div>

        <PhotoTab />

        <TagsTab />

        <UsersTab />
      </Tabs>
    </Layout>
  );
};
 */
