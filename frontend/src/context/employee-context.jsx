import { createContext, useState, useEffect } from 'react';

import { notify } from "../lib/alert.js";
import {
  createEmployees,
  getEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployee,
} from "../service/employee";
import {
  getValueFromLocalStorage,
} from "../lib/store"
import { localStorageUserKey } from "../constant/auth"

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(null);

  const handleCreateEmployees = async (newEmployees = []) => {
    try {
      // find admin
      const user = getValueFromLocalStorage(localStorageUserKey);
      if (!user) {
        notify("Please sign in first.", "info");
        return;
      }
      const { _id: userId, role } = user;
      if (role === "employee") {
        notify("Employee can't perform operation on another employee", "warning");
        return;
      }
      // if admin found
      const result = await createEmployees(userId, newEmployees);
      if (result) {
        setEmployees(pre => ([...pre, ...result.employeesAdded]));
        notify(result.message || "Employees created successfully", "success");
      }
    } catch (error) {
      console.log(error, 'Employee create error')
      notify(error || "Employee create failed", "error");
    }
  }

  const handleFetchEmployees = async (showAlert = true) => {
    try {
      // find admin
      const user = getValueFromLocalStorage(localStorageUserKey);
      if (!user) {
        if (showAlert) notify("Please sign in first.", "info");
        return;
      }
      const { _id: userId, role } = user;
      if (role === "employee") {
        if (showAlert) notify("Employee can't perform operation on another employee", "warning");
        return;
      }
      const result = await getEmployees(userId);
      if (result.message) {
        if (result.employees) setEmployees(result.employees);
        if (showAlert) notify(result.message, "success");
      }
    } catch (error) {
      console.log(error, 'Employees fetch error')
      notify(error || "Employees fetch failed", "error");
    }
  };

  const handleDeleteEmployees = async (employeeId) => {
    try {
      // find admin
      const user = getValueFromLocalStorage(localStorageUserKey);
      if (!user) {
        notify("Please sign in first.", "info");
        return;
      }
      const { _id: userId, role } = user;
      if (role === "employee") {
        notify("Employee can't perform operation on another employee", "warning");
        return;
      }
      const result = await deleteEmployee(userId, employeeId);
      if (result?.message) {
        notify(result.message, "success");
      }
    } catch (error) {
      console.log(error, 'Employee delete error')
      notify(error || "Employee delete failed", "error");
    }
  };


  const handleGetEmployee = async (employeeId) => {
    try {
      // find admin
      const user = getValueFromLocalStorage(localStorageUserKey);
      if (!user) {
        notify("Please sign in first.", "info");
        return;
      }
      const { _id: userId, role } = user;
      if (role === "employee") {
        notify("Employee can't perform operation on another employee", "warning");
        return;
      }
      const result = await getEmployee(userId, employeeId);
      if (result?.message) {
        notify(result.message, "success");
      }
    } catch (error) {
      console.log(error, 'Employee fetch error')
      notify(error || "Employee fetch failed", "error");
    }
  };


  const handleUpdateEmployee = async (employeeId, employeeData) => {
    try {
      // find admin
      const user = getValueFromLocalStorage(localStorageUserKey);
      if (!user) {
        notify("Please sign in first.", "info");
        return;
      }
      const { _id: userId, role } = user;
      if (role === "employee") {
        notify("Employee can't perform operation on another employee", "warning");
        return;
      }
      if (!employeeData.phone) {
        delete employeeData.phone;
      }
      const result = await updateEmployee(userId, employeeId, employeeData);
      if (result.message) {
        notify(result.message, "success");
        handleFetchEmployees(false);
      }
    } catch (error) {
      console.log(error, 'Employee update error')
      notify(error || "Employee update failed", "error");
    }
  };

  useEffect(() => {
    handleFetchEmployees(false);
  }, []);


  return (
    <EmployeeContext.Provider
      value={{
        employees,
        handleCreateEmployees,
        handleDeleteEmployees,
        handleFetchEmployees,
        handleGetEmployee,
        handleUpdateEmployee,
      }}>
      {children}
    </EmployeeContext.Provider>
  );
};

