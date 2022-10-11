import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const getEnrolledStudents = createAsyncThunk('student/getEnrolledStudents', async (data, thunkAPI) => {
  try {
    const response = await axios.get('/api/student/get-students/' + data)
    if (response.data) {
      console.log(response)
      return response.data
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const studentSlice = createSlice({
  name: 'student',
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
      .addCase(getEnrolledStudents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEnrolledStudents.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(getEnrolledStudents.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })
  }
})

export const { reset } = studentSlice.actions
export default studentSlice.reducer