import { useState, useContext } from 'react'
import DeleteIcon from "../../../assets/delete-trash.svg";
import EditPencilIcon from "../../../assets/edit-pencil.svg";
import { showInputLabel } from "../../../lib/form";

import { TicketContext } from "../../../context/ticket-context.jsx";


export default function ViewTickets({ user }) {

  const [showMyTicket, setShowMyTicket] = useState(true);
  const {
    handleDeleteTicket,
    handleUpdateTicket,
    employeesTickets,
    userTickets,
  } = useContext(TicketContext);
  const [ticketUpdateData, setTicketUpdateData] = useState({
    title: "",
    description: "",
    type: "report",
    status: "open",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketUpdateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleModalOpen = (ticket) => {
    document.getElementById(`update_ticket_${ticket._id}`)?.showModal()
    setTicketUpdateData({
      title: ticket.title || "",
      description: ticket.description || "",
      type: ticket.type || "report",
      status: ticket.status || "open",
    })
  }

  const ticketsToShow = showMyTicket ? userTickets : employeesTickets;

  return (
    <article className='w-[90%] md:mx-0 mx-auto sm:px-8 px-2'>
      <div className="flex justify-start gap-2 mb-6">

        {user?.role === "admin" ? (
          <>
            <h3 className={`${showMyTicket ? "underline" : "cursor-pointer"}`}
              onClick={() => !showMyTicket && setShowMyTicket(true)}
            >My tickets</h3>
            <h4 className={`${showMyTicket ? "cursor-pointer" : "underline"}`}
              onClick={() => showMyTicket && setShowMyTicket(false)}
            >Employee tickets</h4>
          </>
        ) : (
          <h3 className="underline">My tickets</h3>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-gray-300">
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ticketsToShow?.map((ticket, index) => (
              <tr key={ticket._id} className={`${ticket.type === "emergency" ? "bg-red-50" : ticket.type === "report" ? "bg-blue-50" : "bg-green-50"}`}>
                <th>{index + 1}</th>
                <td>{ticket.title} </td>
                <td>{ticket.description.slice(0, 100)}</td>
                <td>{ticket.type}</td>
                <td>{ticket.status}</td>
                <td className='flex gap-4 items-center'>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button className='flex gap-1 items-center tooltip border border-gray-500 rounded-full w-8 h-8 i justify-center' data-tip="Edit" aria-label='Edit' onClick={() => handleModalOpen(ticket)}>
                    <img src={EditPencilIcon} alt="." />
                  </button>
                  <dialog id={`update_ticket_${ticket._id}`} className="modal w-full">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Edit ticket -{ticket._id}</h3>
                      <p className="py-4">Title: {ticket.title}</p>

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
                              value={ticketUpdateData.title}
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
                              value={ticketUpdateData.description}
                            ></textarea>
                            <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Description</span>
                          </div>

                          <div className="mb-6 relative">
                            <select
                              className="select select-bordered w-full max-w-xs"
                              name="type"
                              value={ticketUpdateData.type}
                              onChange={handleInputChange}
                            >
                              <option value="request">Request</option>
                              <option value="report">Report</option>
                              <option value="emergency">Emergency</option>
                            </select>
                          </div>

                          <div className="mb-6 relative">
                            <select
                              className="select select-bordered w-full max-w-xs"
                              name="status"
                              value={ticketUpdateData.status}
                              onChange={handleInputChange}
                            >
                              <option value="open">Open</option>
                              <option value="closed">Closed</option>
                            </select>
                          </div>


                          <button onClick={() => handleUpdateTicket(ticket._id, ticketUpdateData)} className="btn btn-secondary me-2">Update ticket</button>

                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-secondary text-secondary-content">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>

                  <button className='flex gap-1 items-center tooltip border border-gray-500 rounded-full w-8 h-8 i justify-center' data-tip="Delete" aria-label='Delete' onClick={() => handleDeleteTicket(ticket._id)}>
                    <img src={DeleteIcon} alt="." />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}
