import axios from "axios";
import authHeader from "./auth-header";
import { API } from "../config";

export const getAllAirports = () => {
  return axios.get(API + "/airport", { headers: authHeader() });
};

const airportService = { getAllAirports };

export default airportService;
