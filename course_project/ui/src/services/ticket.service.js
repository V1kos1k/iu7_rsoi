import axios from "axios";
import authHeader from "./auth-header";
import { API } from "../config";

export const getAllTickets = () => {
  return axios.get(API + "/ticket", { headers: authHeader() });
};

export const buyTicket = (seatNo, flightUid) => {
  return axios.post(
    `${API}/ticket/${flightUid}`,
    {
      seatNo,
    },

    { headers: authHeader() }
  );
};

export const deleteTicket = (seatNo, flightUid, ticketUid) => {
  return axios.delete(`${API}/ticket/${flightUid}/${ticketUid}`, {
    headers: authHeader(),
    data: {
      seatNo,
    },
  });
};

export const getMiles = () => {
  return axios.get(API + "/users/user", { headers: authHeader() });
};

const flightService = { getAllTickets, buyTicket, deleteTicket, getMiles };

export default flightService;
