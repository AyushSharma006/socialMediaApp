import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {_id: "67da7ff9578f664d56e4aa45",
    username: "ayushsharma",
    email: "ayushsharma@gmail.com",
    password: "12345",
    profilePicture: " ",
    coverPicture: " ",
    followers: [],
    followings: ["67de6e8cb7199fb80b57439c"],
    isAdmin: false,
    createdAt: { $date: { $numberLong: "1742372857368" } },
    updatedAt: { $date: { $numberLong: "1742372857368" } },
    __v: { $numberInt: "0" },},
  isLoading: false,
  error: false,
};

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        userData
      );
      return response.data; // Return the user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors properly
    }
  }
);

const authSlice = createSlice({

  name: "auth",
  initialState,

  reducers: {
    handleLogout: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Store user data
        state.error = false;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || true;
      });
  },
  
});

export const { handleLogout } = authSlice.actions;
export default authSlice.reducer;

