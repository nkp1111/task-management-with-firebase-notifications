import axios from 'axios';

import { serverUrl } from "../constant/auth"

const AUTH_URL = serverUrl + "/api/user/auth"

export const login = async (body) => {
  try {
    const response = await axios.post(`${AUTH_URL}/`, body, {
      withCredentials: true, // To include cookies
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${AUTH_URL}/`, {
      withCredentials: true, // To include cookies
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

