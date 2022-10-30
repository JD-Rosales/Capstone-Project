import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const addAssignment = createAsyncThunk('teacher/addAssignment', async (params, thunkAPI) => {
  try {
    const response = await axios.post('/api/assignments/add-assignment/', params, {
      headers: { authorization: `Bearer ${params.token}` },
    })

    if (response.data) {
      return response.data
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const assignmentSlice = createSlice({
  name: 'assignment',
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
      .addCase(addAssignment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAssignment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(addAssignment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })
  }
})

export const { reset } = assignmentSlice.actions
export default assignmentSlice.reducer