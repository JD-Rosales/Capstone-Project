import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUnactivated = createAsyncThunk(
  "teacher/getUnactivated",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get("/api/teacher/get-unactivated", {
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

export const updateAccountStatus = createAsyncThunk(
  "teacher/updateAccountStatus",
  async (params, thunkAPI) => {
    try {
      const response = await axios.patch(
        "/api/teacher/update-status/" + params.id,
        {},
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

export const getAllTeacher = createAsyncThunk(
  "teacher/getAllTeacher",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get("/api/teacher/get-all", {
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

export const suspendAccount = createAsyncThunk(
  "teacher/suspendAccount",
  async (params, thunkAPI) => {
    try {
      console.log(params);
      const response = await axios.patch(
        "/api/teacher/suspend-account/" + params.id,
        {},
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
  "teacher/unsuspendAccount",
  async (params, thunkAPI) => {
    try {
      console.log(params);
      const response = await axios.patch(
        "/api/teacher/unsuspend-account/" + params.id,
        {},
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

export const teacherSlice = createSlice({
  name: "teacher",
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
      .addCase(getUnactivated.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnactivated.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getUnactivated.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];
      })

      .addCase(updateAccountStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAccountStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(updateAccountStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];
      })

      .addCase(getAllTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getAllTeacher.rejected, (state, action) => {
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

export const { reset } = teacherSlice.actions;
export default teacherSlice.reducer;
