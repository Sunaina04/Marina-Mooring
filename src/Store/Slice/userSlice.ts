import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../Store'
import { InitialState } from '../../Type/CommonType'
import { UserData } from '../../Type/ApiTypes'

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as InitialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      const data = action.payload
      state.userData = data
    },
    setToken: (state, action: PayloadAction<string>) => {
      const data = action.payload
      state.token = data
    },
    setLogout: () => {
      return {} as InitialState
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen
    },
  },
})

export const { setLogout, setUserData, setOpen, toggleSidebar, setToken } = userSlice.actions
export const selectSidebar = (state: RootState) => state.user.sidebar
export default userSlice.reducer
