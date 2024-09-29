import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [apptDate, setDate] = useState(null);
    const [apptTime, setTime] = useState(null);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber, apptDate, apptTime, doctorName, doctorSpeciality });
      setName('');
      setPhoneNumber('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apptDate">Date:</label>
          <input
            type="date"
            id="apptDate"
            value={apptDate}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apptTime">Time:</label>
          <input
            type="time"
            id="apptTime"
            value={apptTime}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm
