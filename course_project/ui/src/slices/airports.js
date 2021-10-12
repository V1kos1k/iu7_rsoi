import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import airportService from "../services/airports.service";

const initialState = {
  airports: null,
};

export const getAllAirports = createAsyncThunk(
  "flight/getAllAirports",
  async ({}, thunkAPI) => {
    try {
      const data = await airportService.getAllAirports();

      console.log(data.data);
      return { airports: data.data };
    } catch (error) {
      console.log("(1)", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return error;
    }
  }
);

const airportSlice = createSlice({
  name: "airport",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllAirports.fulfilled]: (state, action) => {
      state.airports = action.payload.airports;
    },
    [getAllAirports.rejected]: (state, action) => {
      state.airports = null;
    },
  },
});

export const allAirports = (state) => state.airports;

const { reducer } = airportSlice;

export default reducer;
