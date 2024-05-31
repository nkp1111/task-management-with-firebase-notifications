import { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { notify } from "../lib/alert.js";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../service/user";
import {
  storeValueInLocalStorage,
  getValueFromLocalStorage,
} from "../lib/store"
import { localStorageUserKey } from "../constant/auth"

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleCreateUser = async (userData) => {
    try {
      const result = await createUser(userData);
      if (result) {
        const { message = "", user } = result;
        storeValueInLocalStorage(localStorageUserKey, user);
        notify(message || "User signed up successfully", "success");
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/employee")
        }
      }
    } catch (error) {
      console.log(error, 'user create error')
      notify(error || "User create failed", "error");
    }
  }

  const handleUpdateUser = async (userId, userData) => {
    try {
      const result = await updateUser(userId, userData);
      if (result) {
        const { message = "", user } = result;
        notify(message || "User updated successfully", "success");
        await handleGetUser(userId);
      }
    } catch (error) {
      console.log(error, 'user updated error')
      notify(error || "User update failed", "error");
    }
  }


  const handleGetUser = async (userId) => {
    try {
      const result = await getUserById(userId);
      if (result) {
        const { message = "", user } = result;
        storeValueInLocalStorage(localStorageUserKey, user);
        setUser(user);
      }
    } catch (error) {
      console.log(error, 'user updated error')
      notify(error || "User update failed", "error");
    }
  }

  useEffect(() => {
    const user = getValueFromLocalStorage(localStorageUserKey)
    if (user) setUser(user);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleCreateUser,
        handleUpdateUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

