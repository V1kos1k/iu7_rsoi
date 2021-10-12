import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import flightService from "../services/flight.service";

const initialState = {
  flights: null,
  currentFlight: null,
  planes: null,
  statistics: null,
};

export const getPlanes = createAsyncThunk(
  "flight/getPlanes",
  async ({}, thunkAPI) => {
    try {
      const data = await flightService.getPlanes();

      return { planes: data.data };
    } catch (error) {
      console.log("(2)", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      // thunkAPI.dispatch(logout());
      return error;
    }
  }
);

export const getStatistics = createAsyncThunk(
  "flight/getStatistics",
  async ({}, thunkAPI) => {
    try {
      const data = await flightService.getStatistics();

      return { statistics: data.data };
    } catch (error) {
      console.log("(2)", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      // thunkAPI.dispatch(logout());
      return error;
    }
  }
);

const searchPlane = (planeCode, planeArr) =>
  planeArr.find((item) => planeCode === item.planeCode);

export const getAllFlights = createAsyncThunk(
  "flight/getAllFlights",
  async ({}, thunkAPI) => {
    try {
      const data = await flightService.getAllFlights();

      return { flights: data.data.flight };
    } catch (error) {
      console.log("(1)", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      // thunkAPI.dispatch(logout());
      return error;
    }
  }
);

export const getFlight = createAsyncThunk(
  "flight/getFlight",
  async ({ flightUid }, thunkAPI) => {
    try {
      const data = await flightService.getFlight(flightUid);
      // const dataPlane = await thunkAPI.dispatch(getPlanes());
      const dataPlane = await flightService.getPlanes();

      console.log("dataPlane", dataPlane);
      const currentPlane = searchPlane(
        data.data.flight.planeCode,
        dataPlane.data
      );
      return {
        currentFlight: { ...data.data, plane: currentPlane },
        planes: dataPlane.data,
      };
    } catch (error) {
      console.log("(2)", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      // thunkAPI.dispatch(logout());
      return error;
    }
  }
);

export const buyTicket = createAsyncThunk(
  "flight/buyTicket",
  async ({ seatNo, flightUid }, thunkAPI) => {
    try {
      const data = await flightService.buyTicket(seatNo, flightUid);

      console.log(data);
      return { response: data.data };
    } catch (error) {
      console.log("(1)", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      // thunkAPI.dispatch(logout());
      return error;
    }
  }
);

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    // getAllFlight: (state, action) => {
    //   return { flights: action.payload };
    // },
  },
  extraReducers: {
    [getAllFlights.fulfilled]: (state, action) => {
      state.flights = action.payload.flights;
    },
    [getAllFlights.rejected]: (state, action) => {
      state.flights = null;
    },
    //
    [getFlight.fulfilled]: (state, action) => {
      state.currentFlight = action.payload.currentFlight;
    },
    [getFlight.rejected]: (state, action) => {
      state.flight = null;
    },
    //
    [getPlanes.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.planes = action.payload.planes;
    },
    [getPlanes.rejected]: (state, action) => {
      state.planes = null;
    },
    // buyTicket
    [buyTicket.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [buyTicket.rejected]: (state, action) => {
      console.log(action);
    },
    // statistics
    [getStatistics.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.statistics = action.payload.statistics;
    },
    [getStatistics.rejected]: (state, action) => {
      state.statistics = null;
    },
  },
});

export const allFlights = (state) => state.flight.flights;
export const currentFlight = (state) => state.flight.currentFlight;
export const allStatistics = (state) => state.flight.statistics;

const { reducer } = flightSlice;

export default reducer;
