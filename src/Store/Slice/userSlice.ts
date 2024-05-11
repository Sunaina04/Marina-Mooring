import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../Store'
import { UserData } from '../../Type/ApiTypes'
import { InitialState } from '../../Type/CommonType'

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as InitialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      const data = action.payload
      state.userData = data
    },
    setLogout: () => {
      return {} as InitialState
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
  },
})

export const { setLogout, setUserData,setOpen, toggleSidebar } = userSlice.actions
export const selectSidebar = (state: RootState) => state.user.sidebar;
export const token = (state: RootState) => state?.user?.token
export default userSlice.reducer
