import React, { createContext, useState, useEffect } from 'react';

import { notify } from "../lib/alert.js";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../service/user";
import {
  storeValueInLocalStorage,
} from "../lib/store"
import { localStorageUserKey } from "../constant/auth"

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleCreateUser = async (userData) => {
    try {
      const result = await createUser(userData);
      if (result) {
        const { message = "", user } = result;
        storeValueInLocalStorage(localStorageUserKey, user);
        notify(message || "User signed up successfully", "success");
      }
    } catch (error) {
      console.log(error, 'user create error')
      notify(error || "User create failed", "error");
    }
  }


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleCreateUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

