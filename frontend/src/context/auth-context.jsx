import React, { createContext, useState, useEffect } from 'react';

import { notify } from "../lib/alert.js";
import {
  login,
  logout,
} from "../service/auth"
import {
  storeValueInLocalStorage,
  getValueFromLocalStorage,
  clearValueFromLocalStorage,
} from "../lib/store"
import { localStorageUserKey } from "../constant/auth"
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const handleLogin = async (loginData) => {
    try {
      const result = await login(loginData)
      if (result) {
        const { message, user, error } = result;
        if (error) {
          notify(error, "error");
          return;
        }
        notify(message || "User login successfully", "success");
        storeValueInLocalStorage(localStorageUserKey, user);
        navigate("/admin");

      }
    } catch (error) {
      // console.log(error, 'login error')
      notify(typeof error === "string" ? error : (error.error || "User login failed"), "error");
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
      clearValueFromLocalStorage(localStorageUserKey)
      notify("User logout successfully", "success");
      navigate("/login")
    } catch (error) {
      notify(typeof error === "string" ? error : (error.error || "User logout failed"), "error");
    }
  }



  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

