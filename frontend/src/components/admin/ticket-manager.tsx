import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketManager = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });

  useEffect(() => {
    // Fetch tickets on component mount
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('/api/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleAddTicket = async () => {
    try {
      const response = await axios.post('/api/tickets', newTicket);
      setTickets([...tickets, response.data]);
      setNewTicket({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };

  const handleDeleteTicket = async (id) => {
    try {
      await axios.delete(`/api/tickets/${id}`);
      setTickets(tickets.filter((ticket) => ticket._id !== id));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div>
      <h2>Manage Tickets</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTicket.title}
          onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTicket.description}
          onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
        />
        <button onClick={handleAddTicket}>Add Ticket</button>
      </div>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            {ticket.title} - {ticket.description}
            <button onClick={() => handleDeleteTicket(ticket._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketManager;
