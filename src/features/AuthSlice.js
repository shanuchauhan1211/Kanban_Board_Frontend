import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInApi, SignupApi } from "./AuthApi";

const initialState = {
  userToken: localStorage.getItem("jwt") || null,
  user:null,
  loading: false,
};

export const SignupAsync = createAsyncThunk(
  "auth/signUp",
  async (details, { rejectWithValue }) => {
    try {
      const response = await SignupApi(details);
      console.log("Signup Response:", response);
      
      return response; 
    } catch (error) {
      return rejectWithValue(error.message || "Signup error");
    }
  }
);

export const logInAsync = createAsyncThunk(
  "auth/logIn",
  async (data, { rejectWithValue }) => {
    try {
      const response = await logInApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Login error");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      state.userToken = null;
      state.user=null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignupAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SignupAsync.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(SignupAsync.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(logInAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logInAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.userToken = action?.payload?.jwt;
      localStorage.setItem("jwt", action?.payload?.jwt);
      localStorage.setItem("user", JSON.stringify(action?.payload?.result));

     
    });
    builder.addCase(logInAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logout } = authSlice.actions;
export const AuthUser = (state) => state.auth;
export default authSlice.reducer;
