import { useState, useContext } from 'react';
import { showInputLabel } from "../../../lib/form.js";
import { MeetingContext } from "../../../context/meeting-context.jsx";
import { EmployeeContext } from "../../../context/employee-context.jsx";
import BasicDateTimePicker from "./date-time-picker.jsx";
import dayjs from "dayjs";

const millisecondsInHour = 1000 * 60 * 60;

export default function NewMeeting({ user }) {

  const { employees, handleFetchEmployees } = useContext(EmployeeContext);

  const [loading, setLoading] = useState(false);
  const [newMeetingLocal, setNewMeetingLocal] = useState({
    title: "",
    description: "",
    startTime: dayjs(new Date()),
    endTime: dayjs(new Date(Date.now() + millisecondsInHour)), // 1 hour from start
    attendees: [], // employee id of employees
  });

  const {
    handleCreateMeeting,
  } = useContext(MeetingContext);

  const handleAddMeeting = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newMeetingCreateData = {
        ...newMeetingLocal,
        startTime: newMeetingLocal.startTime.toDate(),
        endTime: newMeetingLocal.endTime.toDate(),
      }
      // if new meeting created reset meeting data
      const result = await handleCreateMeeting(newMeetingCreateData);
      if (result) {
        setNewMeetingLocal({
          title: "",
          description: "",
          startTime: dayjs(new Date()),
          endTime: dayjs(new Date(Date.now() + millisecondsInHour)), // 1 hour from start
          attendees: [], // employee id of employees
        });
      }
    } catch (error) {
      console.error('Error creating Meeting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeetingLocal((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleDateTimeChange = (newValue, type) => {
    if (type === "start") {
      setNewMeetingLocal(pre => ({ ...pre, startTime: newValue }))
    } else {
      setNewMeetingLocal(pre => ({ ...pre, endTime: newValue }))
    }
  }

  const handleAttendeesChange = (employeeId) => {
    const employeesAttendMeet = newMeetingLocal.attendees.find(empId => empId === employeeId);
    if (employeesAttendMeet) {
      // remove from attending list
      const newEmployeesAttendList = newMeetingLocal.attendees.filter(empId => empId !== employeeId);
      setNewMeetingLocal(pre => ({ ...pre, attendees: newEmployeesAttendList }))
    } else {
      // add to attending list
      setNewMeetingLocal(pre => ({ ...pre, attendees: [...pre.attendees, employeeId] }));
    }
  }

  return (
    <article className="bg-white shadow-md rounded sm:p-8 p-2 mb-4 w-[90%] md:mx-0 mx-auto">
      <h3 className="mb-6 underline">Book New Meeting</h3>

      <form className="bg-white mb-4 md:mx-0 mx-auto" onSubmit={handleAddMeeting} noValidate>

        <div className="mb-6 relative">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="input input-bordered w-full"
            onChange={handleInputChange}
            onInput={showInputLabel}
            value={newMeetingLocal.title}
            required
          />
          <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Title</span>
        </div>

        <div className="mb-6 relative">
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            onChange={handleInputChange}
            onInput={showInputLabel}
            value={newMeetingLocal.description}
            required
          ></textarea>
          <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Description</span>
        </div>


        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <BasicDateTimePicker
            label={"Meeting start time"}
            type={"start"}
            value={newMeetingLocal.startTime}
            handleOnChange={handleDateTimeChange}
          />
          <BasicDateTimePicker
            label={"Meeting end time"}
            type={"end"}
            value={newMeetingLocal.endTime}
            handleOnChange={handleDateTimeChange}
          />
        </div>

        {employees && employees.length > 0 ? (
          <div className="mb-6 relative">
            <details className="dropdown w-full">
              <summary className="m-1 btn btn-block">Attendees</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full">
                {employees.map(emp => (
                  <li key={emp._id} className={`hover:bg-gray-100 focus:bg-gray-200 p-2 cursor-pointer ${newMeetingLocal.attendees.includes(emp._id) ? "bg-blue-300 hover:bg-blue-400 focus:bg-blue-500" : "bg-inherit"}`}
                    onClick={() => handleAttendeesChange(emp._id)}>
                    {emp?.name?.firstName + " " + emp?.name?.lastName} ({emp.email})
                  </li>
                ))}
              </ul>
            </details>

            <ul className="p-2 shadow max-h-64 overflow-y-auto z-[1] bg-base-100 rounded-box w-full">
              {newMeetingLocal.attendees.map(empId => {
                const employeeData = employees.find(emp => emp._id === empId);
                const employeeName = employeeData?.name?.firstName + " " + employeeData?.name?.lastName;
                return (
                  <li
                    key={employeeData._id}
                    className={`hover:bg-red-100 focus:bg-red-200 px-2 cursor-pointer group flex items-center transition-all duration-500 ease-out`}
                    onClick={() => handleAttendeesChange(employeeData._id)}>
                    <span className="inline-block py-2">{employeeName} ({employeeData.email})</span>
                    <span className={`group-hover:inline-block ms-auto hidden text-2xl transition-all duration-500 ease-out`}>&times;</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}


        <button type="submit" disabled={loading} className="text-primary-content bg-primary hover:bg-primary/90 focus:outline-none font-medium rounded-full text-sm w-full px-5 py-3 text-center mt-2 btn disabled:bg-primary disabled:text-primary-content">
          Add Meeting
          {loading ? <span className="loading loading-spinner loading-sm ms-1"></span> : null}
        </button>
      </form>
    </article>
  )
}
