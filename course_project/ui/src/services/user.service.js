import axios from "axios";
import authHeader from "./auth-header";
import { AUTH_API, API } from "../config";

export const getAllUsers = () => {
  return axios.get(AUTH_API + "/users", { headers: authHeader() });
};

export const createUser = (name, password, userRole) => {
  console.log(name, password, userRole);
  return axios.post(
    API + "/users",
    {
      name,
      password,
      userRole,
    },
    { headers: authHeader() }
  );
};

const usersService = { getAllUsers, createUser };
export default usersService;
