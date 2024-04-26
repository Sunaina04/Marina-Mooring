import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { INITIAl_STATE } from "./types";
import { UserData } from "../../Services/Authentication/AuthTypes";

const initialState: INITIAl_STATE = {
  token: null,
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      const data = action.payload;
      state.userData = data;
    },

    setLogout: () => {
      return initialState;
    },
  },
});

export const { setLogout, setUserData } = userSlice.actions;

export default userSlice.reducer;
export const token = (state: RootState) => state?.user?.token;
console.log("TOKEN" , token);