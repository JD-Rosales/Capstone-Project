import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addSemester = createAsyncThunk(
  "semester/addSemester",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post("/api/semester", params, {
        headers: { authorization: `Bearer ${params.token}` },
      });

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

export const getSemesters = createAsyncThunk(
  "semester/getSemester",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get("/api/semester", {
        headers: { authorization: `Bearer ${params.token}` },
      });

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

export const changeActiveSemester = createAsyncThunk(
  "semester/changeActiveSemester",
  async (params, thunkAPI) => {
    try {
      const response = await axios.patch("/api/semester/" + params.id, params, {
        headers: { Authorization: `Bearer ${params.token}` },
      });

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

export const semesterSlice = createSlice({
  name: "semester",
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
      .addCase(addSemester.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSemester.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(addSemester.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];
      })

      .addCase(getSemesters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSemesters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getSemesters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];
      })

      .addCase(changeActiveSemester.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeActiveSemester.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(changeActiveSemester.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];
      });
  },
});

export const { reset } = semesterSlice.actions;
export default semesterSlice.reducer;
