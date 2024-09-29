import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import { v4 as uuidv4 } from 'uuid';


const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctorData, setDoctorData] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  useEffect(()=>{
    setAppointments([]);
    console.log('getting data for', name);
    let appointment_data = JSON.parse(localStorage.getItem(name));
    if (appointment_data !== null){
      setAppointments((appointments)=>[appointments]);
    }
    let doctor_data = JSON.parse(localStorage.getItem('doctorData'));
    if (doctor_data !== null){
      setDoctorData(doctor_data);
    }
  },
  [])

  useEffect(()=>{
    console.log('appointments', appointments.length);
    console.log('doctorData', doctorData);
  },[appointments])

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    localStorage.removeItem(name);
    const existingDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const updatedDoctorData = existingDoctorData.filter((doctor) => doctor.name !== name);
    localStorage.setItem('doctorData', JSON.stringify(updatedDoctorData));

    setAppointments(updatedAppointments);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    const newDoctor = {
      name: appointmentData.doctorName,
    }
    const existingDoctorData = JSON.parse(localStorage.getItem('doctorData')) || [];
    existingDoctorData.push(newDoctor);

    const updatedAppointments = [...appointments, newAppointment];

    setAppointments(updatedAppointments);
    setDoctorData(existingDoctorData);
    localStorage.setItem(name, JSON.stringify(updatedAppointments));
    localStorage.setItem('doctorData', JSON.stringify(existingDoctorData));
    setShowModal(false);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>


      <div className="doctor-card-options-container">
       <Popup
          style={{ backgroundColor: '#FFFFFF', width: '50%', height: '50%' }}
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '80vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
              <center><br/>
               <a className="book-appoinment-btn" lassName="close" onClick={close}>
                    CLOSE WINDOW
                </a></center>
            </div>
          )}
        </Popup> 
      </div>
    </div>
  );
};

export default DoctorCard;
