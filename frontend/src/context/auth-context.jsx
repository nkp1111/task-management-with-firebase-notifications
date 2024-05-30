import React, { createContext, useState, useEffect } from 'react';

import { notify } from "../lib/alert.js";
import {
  login,
  logout,
} from "../service/auth"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (loginData) => {
    try {
      const result = await login(loginData)
      console.log('login success', result);
      notify("User login successfully", "success");
    } catch (error) {
      console.log(error, 'login error')
      notify(error || "User login failed", "error");
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      notify("User logout successfully", "success");
    } catch (error) {
      notify(error || "User logout failed", "error");
    }
  }



  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

