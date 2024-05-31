import axios from 'axios';

import { serverUrl } from "../constant/auth"

const TICKET_URL = serverUrl + "/api/ticket";

/**
 * Create a new ticket
 * @param {object} ticketData - Data for the new ticket
 */
export const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(TICKET_URL, ticketData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Get tickets for the current user and their employees (if admin)
 */
export const getTickets = async () => {
  try {
    const response = await axios.get(TICKET_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Delete a ticket by ID
 * @param {string} ticketId - ID of the ticket to delete
 */
export const deleteTicket = async (ticketId) => {
  try {
    const response = await axios.delete(`${TICKET_URL}/${ticketId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Update a ticket by ID
 * @param {string} ticketId - ID of the ticket to update
 * @param {object} ticketData - Data to update
 */
export const updateTicket = async (ticketId, ticketData) => {
  try {
    const response = await axios.patch(`${TICKET_URL}/${ticketId}`, ticketData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Get a ticket by ID
 * @param {string} ticketId - ID of the ticket to fetch
 */
export const getTicketById = async (ticketId) => {
  try {
    const response = await axios.get(`${TICKET_URL}/${ticketId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
