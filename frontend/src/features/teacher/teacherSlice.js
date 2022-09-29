import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  students: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const getStudents = createAsyncThunk('teacher/getStudents', async (data, thunkAPI) => {
  try {
    const response = await axios.post('/api/teacher/get-students', data)
    if (response.data) {
      return response.data
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.students = action.payload
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.students = []
      })
  }
})

export const { reset } = teacherSlice.actions
export default teacherSlice.reducer