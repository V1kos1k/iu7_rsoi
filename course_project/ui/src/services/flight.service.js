import axios from "axios";
import authHeader from "./auth-header";
import { API } from "../config";

export const getAllFlights = () => {
  return axios.get(API + "/flight", { headers: authHeader() });
};

export const getFlight = (flightUid) => {
  return axios.get(`${API}/flight/${flightUid}`, { headers: authHeader() });
};

export const getPlanes = () => {
  return axios.get(`${API}/plane`, { headers: authHeader() });
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

export const getStatistics = () =>
  axios.get(API + "/statistics", { headers: authHeader() });

const flightService = {
  getAllFlights,
  getFlight,
  getPlanes,
  buyTicket,
  getStatistics,
};

export default flightService;
