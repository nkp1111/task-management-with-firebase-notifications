import axios from 'axios';

import { serverUrl } from "../constant/auth"

const MEETING_URL = serverUrl + "/api/meeting";

/**
 * Create a new meeting
 * @param {object} meetingData - Data for the new meeting
 */
export const createMeeting = async (meetingData) => {
  try {
    const response = await axios.post(MEETING_URL, meetingData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Get meetings for the current user and their employees (if admin)
 */
export const getMeetings = async () => {
  try {
    const response = await axios.get(MEETING_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Delete a meeting by ID
 * @param {string} meetingId - ID of the meeting to delete
 */
export const deleteMeeting = async (meetingId) => {
  try {
    const response = await axios.delete(`${MEETING_URL}/${meetingId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Update a meeting by ID
 * @param {string} meetingId - ID of the meeting to update
 * @param {object} meetingData - Data to update
 */
export const updateMeeting = async (meetingId, meetingData) => {
  try {
    const response = await axios.patch(`${MEETING_URL}/${meetingId}`, meetingData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Get a meeting by ID
 * @param {string} meetingId - ID of the meeting to fetch
 */
export const getMeetingById = async (meetingId) => {
  try {
    const response = await axios.get(`${MEETING_URL}/${meetingId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
