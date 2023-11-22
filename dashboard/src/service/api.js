import axios from "axios";

const URL = "http://localhost:4500";

export const authenticatesSignup = async (data) => {
  try {
    return await axios.post(`${URL}/signup`, data);
  } catch (error) {
    console.log("Error while calling request", error);
  }
};
export const authenticateslogin = async (data) => {
  try {
    return await axios.post(`${URL}/login`, data);
  } catch (error) {
    console.log("Error while calling request", error);
    return error.response;
  }
};
