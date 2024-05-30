import axios from 'axios';

import { serverUrl } from "../constant/auth"

const USER_URL = serverUrl + "/api/user";
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${USER_URL}`, userData, {
      withCredentials: true, // To include cookies
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${USER_URL}/${userId}`, {
      withCredentials: true, // To include cookies
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.patch(`${USER_URL}/${userId}`, userData, {
      withCredentials: true, // To include cookies
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${USER_URL}/${userId}`, {
      withCredentials: true, // To include cookies
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
