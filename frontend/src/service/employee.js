import axios from 'axios';

import { serverUrl } from "../constant/auth"


/**
 * Create employees
 * @param {string} userId - Admin user ID
 * @param {Array} employees - List of employees to create
 */
export const createEmployees = async (userId, employees) => {
  try {
    const response = await axios.post(`${serverUrl}/api/user/${userId}/employees`, { employees }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Get employees for an admin
 * @param {string} userId - Admin user ID
 */
export const getEmployees = async (userId) => {
  try {
    const response = await axios.get(`${serverUrl}/api/user/${userId}/employees`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Delete an employee
 * @param {string} userId - Admin user ID
 * @param {string} employeeId - Employee ID to delete
 */
export const deleteEmployee = async (userId, employeeId) => {
  try {
    const response = await axios.delete(`${serverUrl}/api/user/${userId}/employees/${employeeId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Update an employee
 * @param {string} userId - Admin user ID
 * @param {string} employeeId - Employee ID to update
 * @param {object} employeeData - Data to update
 */
export const updateEmployee = async (userId, employeeId, employeeData) => {
  try {
    const response = await axios.patch(`${serverUrl}/api/user/${userId}/employees/${employeeId}`, employeeData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Get an employee by ID
 * @param {string} userId - Admin user ID
 * @param {string} employeeId - Employee ID to fetch
 */
export const getEmployee = async (userId, employeeId) => {
  try {
    const response = await axios.get(`${serverUrl}/api/user/${userId}/employees/${employeeId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
