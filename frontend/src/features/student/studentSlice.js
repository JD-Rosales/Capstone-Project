import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getEnrolledStudents = createAsyncThunk(
  "student/getEnrolledStudents",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        "/api/student/get-students/" + params.classCode,
        {
          headers: { authorization: `Bearer ${params.token}` },
        }
      );

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getActiveEnrolledStudents = createAsyncThunk(
  "student/getActiveEnrolledStudents",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        "/api/student/get-active-students/" + params.classCode,
        {
          headers: { authorization: `Bearer ${params.token}` },
        }
      );

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const suspendAccount = createAsyncThunk(
  "student/suspendAccount",
  async (params, thunkAPI) => {
    try {
      console.log(params);
      const response = await axios.patch(
        "/api/student/suspend-account/" + params.id,
        params,
        {
          headers: { authorization: `Bearer ${params.token}` },
        }
      );

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unsuspendAccount = createAsyncThunk(
  "student/unsuspendAccount",
  async (params, thunkAPI) => {
    try {
      console.log(params);
      const response = await axios.patch(
        "/api/student/unsuspend-account/" + params.id,
        params,
        {
          headers: { authorization: `Bearer ${params.token}` },
        }
      );

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEnrolledStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnrolledStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getEnrolledStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];
      })

      .addCase(getActiveEnrolledStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveEnrolledStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getActiveEnrolledStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];
      })

      .addCase(suspendAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(suspendAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(suspendAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];
      })

      .addCase(unsuspendAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unsuspendAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(unsuspendAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];
      });
  },
});

export const { reset } = studentSlice.actions;
export default studentSlice.reducer;
