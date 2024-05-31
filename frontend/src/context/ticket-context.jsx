import { createContext, useState, useEffect } from 'react';

import { notify } from "../lib/alert.js";
import {
  createTicket,
  getTickets,
  deleteTicket,
  updateTicket,
  getTicketById,
} from "../service/ticket"


export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [userTickets, setUserTickets] = useState([]);
  const [employeesTickets, setEmployeesTickets] = useState([]);

  const handleCreateTicket = async (ticketData) => {
    try {
      const result = await createTicket(ticketData)
      if (result) {
        const { message, ticket } = result;
        notify(message || "User login successfully", "success");
        setUserTickets(pre => ([...pre, ticket]));
      }
    } catch (error) {
      // console.log(error, 'login error')
      notify(typeof error === "string" ? error : (error.error || "User login failed"), "error");
    }
  }

  const handleGetTicket = async (ticketId) => {
    try {
      const result = await getTicketById(ticketId);
      if (result) {
        const { message, ticket } = result;
        if (message) {
          notify(message, "success");
          setUserTickets(pre => ([...pre.map(p => {
            if (p._id === ticket._id) {
              return ticket;
            }
            return p;
          })]));
        }
      }
    } catch (error) {
      notify(typeof error === "string" ? error : (error.error || "User logout failed"), "error");
    }
  }


  const handleGetTickets = async (showAlert = true) => {
    try {
      const result = await getTickets();
      if (result) {
        const { message } = result;
        if (message && showAlert) {
          notify(message, "success");
        }
        if (result.userTickets) {
          setUserTickets(result.userTickets);
        }
        if (result.employeesTickets) {
          setEmployeesTickets(result.employeesTickets)
        }
      }
    } catch (error) {
      notify(typeof error === "string" ? error : (error.error || "User logout failed"), "error");
    }
  }


  const handleDeleteTicket = async (ticketId) => {
    try {
      const result = await deleteTicket(ticketId);
      if (result) {
        const { message } = result;
        if (message) {
          notify(message, "success");
          setUserTickets(pre => ([...pre.filter(p => p._id !== ticketId)]));
          setEmployeesTickets(pre => ([...pre.filter(p => p._id !== ticketId)]))
        }
      }
    } catch (error) {
      notify(typeof error === "string" ? error : (error.error || "User logout failed"), "error");
    }
  }

  const handleUpdateTicket = async (ticketId, ticketData) => {
    try {
      // console.log(ticketId, ticketData)
      const result = await updateTicket(ticketId, ticketData);
      if (result) {
        const { message } = result;
        if (message) {
          notify(message, "success");
          setUserTickets(pre => ([
            ...pre.filter(p => p._id !== ticketId),
            { ...pre.find(p => p._id === ticketId), ...ticketData }]
          ));
          setEmployeesTickets(pre => ([
            ...pre.filter(p => p._id !== ticketId),
            { ...pre.find(p => p._id === ticketId), ...ticketData }]
          ))
        }
      }
    } catch (error) {
      notify(typeof error === "string" ? error : (error.error || "User logout failed"), "error");
    }
  }


  useEffect(() => {
    handleGetTickets(false);
  }, []);

  return (
    <TicketContext.Provider
      value={{
        handleCreateTicket,
        handleDeleteTicket,
        handleGetTicket,
        handleGetTickets,
        handleUpdateTicket,
        employeesTickets,
        userTickets,
      }}>
      {children}
    </TicketContext.Provider>
  );
};

