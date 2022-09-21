import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  width: 240,
  isError: false,
  isSuccess: false,
  isLoading: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
    changeWidth: (state, action) => {
      state.width = action.payload
    }
  }
})

export const { reset, changeWidth } = sidebarSlice.actions
export default sidebarSlice.reducer