import React, { FC } from "react";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { Story } from "@storybook/react";
import { useEditor } from "./hook/useEditor";
//import useAuthSubscribe from "./hook/useAuthSubscribe";
import AuthAppBarBtn from "./container/AuthAppBarBtn";

export default {
  title: "AuthModule",
  component: AuthAppBarBtn,
};

const Auth = () => {
  //useAuthSubscribe();

  const { isAuth, user, loading, userUid, onChangeEditorStatus } = useEditor();

  return (
    <>
      <Box className="flex h-20 items-center justify-center ">
        <AuthAppBarBtn />
      </Box>
      <Box>
        <Box typography="h6" className="pl-4">
          Auth state:{" "}
        </Box>
        <Box component="ul" className="pl-8">
          <Box component="li">- isAuth - {JSON.stringify(isAuth)}</Box>
          <Box component="li">- loading - {JSON.stringify(loading)}</Box>
          <Box component="li">- userUid - {JSON.stringify(userUid)}</Box>
          <Box component="li"> - user - {JSON.stringify(user)}</Box>
        </Box>
      </Box>
    </>
  );
};

export const Default = () => <Auth />;
