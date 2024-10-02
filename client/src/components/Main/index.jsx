import React, { useState } from "react";
import styles from "./styles.module.css";

const Main = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    name: "",
    telephone: "",
    eventLocation: "",
    functionType: "",
  });
  const [events, setEvents] = useState([]);

  const addEvent = async (eventData) => {
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      if (response.status === 201) {
        console.log("Event added successfully", data);
        setEvents((prevEvents) => [...prevEvents, data.eventDetail]);
      } else {
        console.error("Error adding event:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const home = () => {
    setStep(step - 2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEvent(formData);
    setFormData({
      date: "",
      location: "",
      name: "",
      telephone: "",
      eventLocation: "",
      functionType: "",
    });
    setStep(3);
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Event Management</h1>
        <div className={styles.contact_login}>
          <a href="http://localhost:3000/login">Login</a>
        </div>
      </nav>

      <div className={styles.content}>
        <div className={styles.form_container}>
          {step === 1 && (
            <form>
              <h2>Step 1: Select Event Date and Location</h2>
              <label>
                Date:<br />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </label>
              <br />
              <label>
                Location:<br />
                <input type="text" name="location" value={formData.location} onChange={handleChange} required style={{ width: '300px' }} />
              </label>
              <br />
              <button type="button" onClick={nextStep}>Next</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <h2>Step 2: Fill in Event Details</h2>
              <label>
                Name:<br />
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <br />
              <label>
                Telephone:<br />
                <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required style={{ width: '300px' }} />
              </label>
              <br />
              <label>
                Event Location:<br />
                <input type="text" name="eventLocation" value={formData.eventLocation} onChange={handleChange} required />
              </label>
              <br />
              <label>
                Function Type:<br />
                <select name="functionType" value={formData.functionType} onChange={handleChange} required style={{ width: '300px' }}>
                  <option value="">Select Function Type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <br />
              <div className={styles.buttonContainer}>
                <button type="button" onClick={prevStep}>Back</button>
                <button type="submit">Confirm</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className={styles.success_message}>
              <h2>Event Successfully Registered!</h2>
              <p>Thank you for registering your event.</p>
              <h3>Your Events</h3>
              <ul>
                {events.map((event, index) => (
                  <li key={index}>
                    <strong>Event Name:</strong> {event.name} <br />
                    <strong>Date:</strong> {event.date} <br />
                    <strong>Location:</strong> {event.location} <br />
                    <strong>Function Type:</strong> {event.functionType} <br />
                    <strong>Telephone:</strong> {event.telephone}
                    <hr />
                  </li>
                ))}
              </ul>
              <div className={styles.buttonContainer}>
                <button type="button" onClick={home}>Home</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
