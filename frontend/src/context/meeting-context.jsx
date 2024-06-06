import { createContext, useState, useEffect } from 'react';

import { notify } from "../lib/alert.js";
import {
  createMeeting,
  getMeetings,
  deleteMeeting,
  updateMeeting,
  getMeetingById,
} from "../service/meeting"


export const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
  const [userMeetings, setUserMeetings] = useState([]);
  const [employeesMeetings, setEmployeesMeetings] = useState([]);

  const handleCreateMeeting = async (MeetingData) => {
    try {
      const result = await createMeeting(MeetingData)
      if (result && result.meeting) {
        const { message, meeting } = result;
        notify(message || "Meeting created successfully", "success");
        setUserMeetings(pre => ([...pre, meeting]));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // console.log(error, 'login error')
      notify(typeof error === "string" ? error : (error.error || "User login failed"), "error");
      return false;
    }
  }

  const handleGetMeeting = async (meetingId) => {
    try {
      const result = await getMeetingById(meetingId);
      if (result) {
        const { message, meeting } = result;
        if (message) {
          notify(message, "success");
          setUserMeetings(pre => ([...pre.map(p => {
            if (p._id === meeting._id) {
              return meeting;
            }
            return p;
          })]));
        }
      }
    } catch (error) {
      notify(typeof error === "string" ? error : (error.error || "Meeting fetch failed"), "error");
    }
  }


  const handleGetMeetings = async (showAlert = true) => {
    try {
      const result = await getMeetings();
      if (result) {
        const { message } = result;
        if (message && showAlert) {
          notify(message, "success");
        }
        if (result.userMeetings) {
          setUserMeetings(result.userMeetings);
        }
        if (result.employeesMeetings) {
          setEmployeesMeetings(result.employeesMeetings)
        }
      }
    } catch (error) {
      if (showAlert) notify(typeof error === "string" ? error : (error.error || "Meetings fetch failed"), "error");
    }
  }


  const handleDeleteMeeting = async (meetingId) => {
    try {
      const result = await deleteMeeting(meetingId);
      if (result) {
        const { message } = result;
        if (message) {
          notify(message, "success");
          setUserMeetings(pre => ([...pre.filter(p => p._id !== meetingId)]));
          setEmployeesMeetings(pre => ([...pre.filter(p => p._id !== meetingId)]))
        }
      }
    } catch (error) {
      notify(typeof error === "string" ? error : (error.error || "Meeting delete failed"), "error");
    }
  }

  const handleUpdateMeeting = async (meetingId, meetingData) => {
    try {
      // console.log(meetingId, MeetingData)
      const result = await updateMeeting(meetingId, meetingData);
      if (result) {
        const { message } = result;
        if (message) {
          notify(message, "success");
          setUserMeetings(pre => ([
            ...pre.filter(p => p._id !== meetingId),
            { ...pre.find(p => p._id === meetingId), ...meetingData }]
          ));
          setEmployeesMeetings(pre => ([
            ...pre.filter(p => p._id !== meetingId),
            { ...pre.find(p => p._id === meetingId), ...meetingData }]
          ))
        }
      }
    } catch (error) {
      notify(typeof error === "string" ? error : (error.error || "Meeting update failed"), "error");
    }
  }


  useEffect(() => {
    handleGetMeetings(false);
  }, []);

  return (
    <MeetingContext.Provider
      value={{
        handleCreateMeeting,
        handleDeleteMeeting,
        handleGetMeeting,
        handleGetMeetings,
        handleUpdateMeeting,
        employeesMeetings,
        userMeetings,
      }}>
      {children}
    </MeetingContext.Provider>
  );
};

