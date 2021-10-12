import axios from "axios";
import authHeader from "./auth-header";
import { AUTH_API } from "../config";

const login = async (username, password) => {
  try {
    const response = await axios.get(AUTH_API, {
      auth: {
        username,
        password,
      },
    });
    const userData = {
      username,
      accessToken: response.headers["authorization"].split(" ")[1],
      role: response.headers.role,
    };
    if (response.headers) {
      console.log("гыук", userData);
      localStorage.setItem("user", JSON.stringify(userData)); // здесь должен быть параметр accessToken, точнее токен нужно записать в этот параметр
    }
    return userData;
  } catch (err) {
    throw err;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
