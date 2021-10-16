import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";
import UsersService from "../services/user.service";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);

      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ name, password, userRole }, thunkAPI) => {
    try {
      const data = await UsersService.createUser(name, password, userRole);

      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async ({}, thunkAPI) => {
    try {
      const data = await UsersService.getAllUsers();

      return { users: data.data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  user: user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null },
  users: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.user.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.user.isLoggedIn = false;
      state.user = null;
    },
    // getAllUsers
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload.users;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.user = null;
    },
    // createUser
    [createUser.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const isUseLoggedIn = (state) => state.auth?.user?.isLoggedIn;
export const userInfo = (state) => state.auth?.user?.user;
export const userRole = (state) => state.auth?.user?.role;
export const allUsers = (state) => state.auth.users;

const { reducer } = authSlice;
export default reducer;
