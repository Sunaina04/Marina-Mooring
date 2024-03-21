import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { ApiPayload, INITIAl_STATE, PropertyUpdate } from "./types";
import { UserData } from "../../Services/authentication/types";

const initialState: INITIAl_STATE = {
  token: null,
  userData: null,
  isLoginOpened: false,
  showProfileMenu: false,
  profileMenuOpenedTab: null,
  apiPayload: null,
  isFiltered: false,
  isOverlayOpen: false,
  guestToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setApiPayload: (state, action: PayloadAction<ApiPayload[] | null>) => {
      state.apiPayload = action.payload;
    },

    setUserData: (state, action: PayloadAction<UserData>) => {
      const data = action.payload;
      state.userData = data;
    },

    setLogout: () => {
      return initialState;
    },

    setLoginModal: (state, action: PayloadAction<boolean>) => {
      state.isLoginOpened = action.payload;
    },

    setProfileModal: (state, action: PayloadAction<boolean>) => {
      state.showProfileMenu = action.payload;
    },

    setProfileMenuTab: (state, action: PayloadAction<string>) => {
      state.profileMenuOpenedTab = action.payload;
    },

    setOverlay: (state, action: PayloadAction<boolean>) => {
      state.isOverlayOpen = action.payload;
    },

  },
});

export const {
  setLogout,
  setUserData,
  setLoginModal,
  setProfileModal,
  setProfileMenuTab,
  setApiPayload,
  setOverlay,
} = userSlice.actions;

export default userSlice.reducer;
export const token = (state: RootState) => state?.user?.token;