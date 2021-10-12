import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import flightReducer from "./slices/flight";
import ticketReducer from "./slices/ticket";
import airportsReducer from "./slices/airports";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  flight: flightReducer,
  ticket: ticketReducer,
  airports: airportsReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
