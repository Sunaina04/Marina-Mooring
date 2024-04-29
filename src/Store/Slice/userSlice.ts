import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { UserData } from "../../Type/ApiTypes";
import { INITIAl_STATE } from "../../Type/CommonType";

const initialState: INITIAl_STATE = {
  token: undefined,
  userData: undefined,
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
