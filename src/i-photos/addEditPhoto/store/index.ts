import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makePhotoId } from "../../../utils/app";
import { AddEditPhotoState } from "../types";

const initialState: AddEditPhotoState = {
  addReqs: {
    numberOfActiveReqs: 0,
    reqIds: [],
  },
  editReqs: {
    activeReqIds: [],
    reqIds: [],
  },
};

const addEditPhotoSlice = createSlice({
  name: "addEditPhoto",
  initialState,
  reducers: {
    addPhotoRequestStart(state) {
      const newPhotoId = makePhotoId();

      state.addReqs.reqIds.push(newPhotoId);
    },
    addPhotoRequestSend(state) {
      state.addReqs.numberOfActiveReqs = state.addReqs.numberOfActiveReqs + 1;
    },
    addPhotoRequestError(state) {
      state.addReqs.numberOfActiveReqs = state.addReqs.numberOfActiveReqs - 1;
    },
    addPhotoRequestSuccess(state) {
      state.addReqs.numberOfActiveReqs = state.addReqs.numberOfActiveReqs - 1;
    },
    addPhotoRequestEnd(state, action: PayloadAction<string>) {
      state.addReqs.reqIds = state.addReqs.reqIds.filter(
        (v) => v !== action.payload
      );
    },
    editPhotoRequestStart(state, action: PayloadAction<string>) {
      state.editReqs.reqIds.push(action.payload);
    },
    editPhotoRequestSend(state, action: PayloadAction<string>) {
      state.editReqs.activeReqIds.push(action.payload);
    },
    editPhotoRequestError(state, action: PayloadAction<string>) {
      state.editReqs.activeReqIds = state.editReqs.activeReqIds.filter(
        (id) => id !== action.payload
      );
    },
    editPhotoRequestSuccess(state, action: PayloadAction<string>) {
      state.editReqs.activeReqIds = state.editReqs.activeReqIds.filter(
        (id) => id !== action.payload
      );
    },
    editPhotoRequestEnd(state, action: PayloadAction<string>) {
      state.editReqs.reqIds = state.addReqs.reqIds.filter(
        (v) => v !== action.payload
      );
    },
  },
});

export const {
  addPhotoRequestStart: addPhotoRequestStartAC,
  addPhotoRequestSend: addPhotoRequestSendAC,
  addPhotoRequestError: addPhotoRequestErrorAC,
  addPhotoRequestSuccess: addPhotoRequestSuccessAC,
  addPhotoRequestEnd: addPhotoRequestEndAC,
  editPhotoRequestStart: editPhotoRequestStartAC,
  editPhotoRequestSend: editPhotoRequestSendAC,
  editPhotoRequestError: editPhotoRequestErrorAC,
  editPhotoRequestSuccess: editPhotoRequestSuccessAC,
  editPhotoRequestEnd: editPhotoRequestEndAC,
} = addEditPhotoSlice.actions;

export default addEditPhotoSlice.reducer;
