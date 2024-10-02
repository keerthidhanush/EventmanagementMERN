import React, { useState, useEffect } from 'react';
import styles from './admin.module.css';

const Admin = () => {
  const [events, setEvents] = useState([]); // To store all events
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    functionType: '',
    telephone: '',
  });
  const [isEditing, setIsEditing] = useState(false); // Track if editing an event
  const [currentEventId, setCurrentEventId] = useState(null); // Track the current event ID being edited
  const [currentPage, setCurrentPage] = useState(1); // Track current page for pagination
  const eventsPerPage = 3; // Display 3 events per page

  // Fetch all events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const data = await response.json();
        setEvents(data); // Set the events state with the fetched data
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents(); // Call the function to fetch events
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(isEditing ? `http://localhost:5000/api/events/${currentEventId}` : "http://localhost:5000/api/events", {
        method: isEditing ? "PUT" : "POST", // Use PUT for editing
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newEvent = await response.json();
        if (isEditing) {
          // Update the events list with edited event
          setEvents(events.map(event => (event._id === currentEventId ? newEvent.eventDetail : event)));
        } else {
          // Add the new event to the list
          setEvents([...events, newEvent.eventDetail]);
        }
        // Clear form data
        setFormData({
          name: '',
          date: '',
          location: '',
          functionType: '',
          telephone: '',
        });
        setIsEditing(false); // Reset editing state
      } else {
        console.error("Error adding/editing event:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (index, eventId) => {
    try {
      await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "DELETE",
      });

      const updatedEvents = events.filter((_, i) => i !== index);
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Function to populate form for editing
  const editEvent = (event) => {
    setFormData({
      name: event.name,
      date: event.date.split('T')[0], // Format the date
      location: event.location,
      functionType: event.functionType,
      telephone: event.telephone,
    });
    setIsEditing(true); // Set editing state to true
    setCurrentEventId(event._id); // Store current event ID for later use
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const nextPage = () => {
    if (currentPage < Math.ceil(events.length / eventsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <nav className={styles.navbar}>
        <h1>Admin Dashboard</h1>
        <div className={styles.navLinks}>
          <a href="/">Logout</a>
        </div>
      </nav>

      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.eventForm}>
          <h2>{isEditing ? "Edit Event" : "Manage Events"}</h2>
          <label>
            Event Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </label>
          <label>
            Function Type:
            <select name="functionType" value={formData.functionType} onChange={handleChange} required>
              <option value="">Select Function Type</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Telephone:
            <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required />
          </label>
          <button type="submit">{isEditing ? "Edit Event" : "Add Event"}</button>
        </form>

        <ul className={styles.eventList}>
          <h3>Event List</h3>
          {currentEvents.map((event, index) => (
            <li key={event._id} className={styles.eventItem}>
              <strong>Event Name:</strong> {event.name} <br />
              <strong>Date:</strong> {event.date} <br />
              <strong>Location:</strong> {event.location} <br />
              <strong>Function Type:</strong> {event.functionType} <br />
              <strong>Telephone:</strong> {event.telephone} <br />
              <button onClick={() => editEvent(event)} className={styles.editBtn}>Edit</button>
              <button onClick={() => handleDelete(index, event._id)} className={styles.delBtn}>Delete</button>
            </li>
          ))}
          <div className={styles.pagination}>
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {Math.ceil(events.length / eventsPerPage)}</span>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(events.length / eventsPerPage)}>Next</button>
        </div>
        </ul>

        
      </div>
    </div>
  );
};

export default Admin;
