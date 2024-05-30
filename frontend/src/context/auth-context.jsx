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


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const handleLogin = async (loginData) => {
    try {
      const result = await login(loginData)
      if (result) {
        const { message, user } = result;
        notify(message || "User login successfully", "success");
        storeValueInLocalStorage(localStorageUserKey, user);
      }
    } catch (error) {
      console.log(error, 'login error')
      notify(error || "User login failed", "error");
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
      clearValueFromLocalStorage(localStorageUserKey)
      notify("User logout successfully", "success");
    } catch (error) {
      notify(error || "User logout failed", "error");
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

