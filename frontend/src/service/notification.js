import axios from 'axios';

import { serverUrl } from "../constant/auth"

const NOTIFICATION_URL = serverUrl + "/api/notification/send";

/**
 * Receive notification
 * @param {object} token - registration token
 */
export const receiveNotification = async (token) => {
  try {
    const response = await axios.post(NOTIFICATION_URL, { token }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};