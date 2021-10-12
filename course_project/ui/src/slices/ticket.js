import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import ticketService from "../services/ticket.service";

const initialState = {
  tickets: null,
  miles: null,
};

export const getMiles = createAsyncThunk(
  "flight/getMiles",
  async ({}, thunkAPI) => {
    try {
      const data = await ticketService.getMiles();

      console.log(data.data.balance);
      return { miles: data.data.balance };
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

export const getAllTickets = createAsyncThunk(
  "flight/getAllTickets",
  async ({}, thunkAPI) => {
    try {
      const data = await ticketService.getAllTickets();

      console.log(data.data);
      return { tickets: data.data.ticket };
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

export const deleteTicket = createAsyncThunk(
  "flight/deleteTicket",
  async ({ seatNo, flightUid, ticketUid }, thunkAPI) => {
    try {
      const data = await ticketService.deleteTicket(
        seatNo,
        flightUid,
        ticketUid
      );

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

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllTickets.fulfilled]: (state, action) => {
      state.tickets = action.payload.tickets;
    },
    [getAllTickets.rejected]: (state, action) => {
      state.tickets = null;
    },
    // deleteTicket
    [deleteTicket.fulfilled]: (state, action) => {
      console.log(action.state);
    },
    [deleteTicket.rejected]: (state, action) => {
      console.log(action.state);
    },
    // getMiles
    [getMiles.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.miles = action.payload.miles;
    },
    [getMiles.rejected]: (state, action) => {
      console.log(action.state);
    },
  },
});

export const allTickets = (state) => state.ticket.tickets;
export const getUserMiles = (state) => state.ticket.miles;

const { reducer } = ticketSlice;

export default reducer;
