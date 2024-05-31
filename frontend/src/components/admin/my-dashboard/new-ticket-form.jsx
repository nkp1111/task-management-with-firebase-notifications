import { useState, useContext } from 'react';
import { showInputLabel } from "../../../lib/form.js";
import { TicketContext } from "../../../context/ticket-context.jsx";

export default function NewTicketForm() {
  const [loading, setLoading] = useState(false);
  const [newTicketLocal, setNewTicketLocal] = useState({
    title: "",
    description: "",
    type: "report",
    status: "open",
  });

  const {
    handleCreateTicket,
  } = useContext(TicketContext);

  const handleAddTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleCreateTicket(newTicketLocal);
      setNewTicketLocal({
        title: "",
        description: "",
        type: "report",
        status: "open",
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicketLocal((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="bg-white shadow-md rounded sm:pe-8 pe-2 mb-4 w-[90%] md:mx-0 mx-auto" onSubmit={handleAddTicket} noValidate>
      <h3 className="mb-6 underline">Add New Ticket</h3>

      <div className="mb-6 relative">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input input-bordered w-full"
          onChange={handleInputChange}
          onInput={showInputLabel}
          value={newTicketLocal.title}
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
          value={newTicketLocal.description}
          required
        ></textarea>
        <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Description</span>
      </div>

      <div className="mb-6 relative">
        <select
          className="select select-bordered w-full max-w-xs"
          name="type"
          value={newTicketLocal.type}
          onChange={handleInputChange}
        >
          <option value="request">Request</option>
          <option value="report">Report</option>
          <option value="emergency">Emergency</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="text-white bg-secondary hover:bg-secondary/90 focus:outline-none font-medium rounded-full text-sm w-full px-5 py-3 text-center mt-2 btn disabled:bg-secondary disabled:text-white">
        Add Ticket
        {loading ? <span className="loading loading-spinner loading-sm ms-1"></span> : null}
      </button>
    </form>
  );
}
