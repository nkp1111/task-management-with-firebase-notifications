import DeleteIcon from "../../../assets/delete-trash.svg";
import EditPencilIcon from "../../../assets/edit-pencil.svg";
import { showInputLabel } from "../../../lib/form";
import { format } from "date-fns";
import { useState } from "react";
import dayjs from "dayjs";


const millisecondsInHour = 1000 * 60 * 60;

export default function ViewMeetingTable({
  meetings,
  handleDeleteMeeting,
  handleUpdateMeeting,
}) {

  const [meetingUpdateData, setMeetingUpdateData] = useState({
    title: "",
    description: "",
    startTime: dayjs(new Date()),
    endTime: dayjs(new Date(Date.now() + millisecondsInHour)), // 1 hour from start
    attendees: [], // employee id of employees
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingUpdateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleModalOpen = (meeting) => {
    document.getElementById(`update_meeting_${meeting._id}`)?.showModal()
    setMeetingUpdateData({
      title: "",
      description: "",
      startTime: dayjs(new Date()),
      endTime: dayjs(new Date(Date.now() + millisecondsInHour)), // 1 hour from start
      attendees: [], // employee id of employees
    })
  }

  return (
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr className="bg-gray-300 ">
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Starting</th>
          <th>Ending</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {meetings?.map((meeting, index) => (
          <tr key={meeting._id}>
            <th>{index + 1}</th>
            <td>{meeting.title} </td>
            <td>{meeting.description.slice(0, 100)}</td>
            <td>{format(meeting.startTime, "dd MMM YYY hh:mm a")}</td>
            <td>{format(meeting.endTime, "dd MMM YYY hh:mm a")}</td>
            <td className='flex gap-4 items-center'>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button className='flex gap-1 items-center tooltip border border-gray-500 rounded-full w-8 h-8 i justify-center' data-tip="Edit" aria-label='Edit' onClick={() => handleModalOpen(meeting)}>
                <img src={EditPencilIcon} alt="." />
              </button>
              <dialog id={`update_meeting_${meeting._id}`} className="modal w-full">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Edit meeting -{meeting._id}</h3>
                  <p className="py-4">Title: {meeting.title}</p>

                  <div className="modal-action justify-center mx-auto">
                    <form method="dialog">

                      <div className="mb-6 relative">
                        <input
                          type="text"
                          name="title"
                          placeholder="Title"
                          className="input input-bordered w-full"
                          onChange={handleInputChange}
                          onInput={showInputLabel}
                          value={meetingUpdateData.title}
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
                          value={meetingUpdateData.description}
                        ></textarea>
                        <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Description</span>
                      </div>

                      <button onClick={() => handleUpdateMeeting(meeting._id, meetingUpdateData)} className="btn btn-secondary me-2">Update meeting</button>

                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-secondary text-secondary-content">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>

              <button className='flex gap-1 items-center tooltip border border-gray-500 rounded-full w-8 h-8 i justify-center' data-tip="Delete" aria-label='Delete' onClick={() => handleDeleteMeeting(meeting._id)}>
                <img src={DeleteIcon} alt="." />
              </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
