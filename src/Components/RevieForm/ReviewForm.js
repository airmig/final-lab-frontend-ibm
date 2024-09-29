import { useEffect, useState } from "react";
import "./ReviewForm.css";
import Popup from "reactjs-popup";
import GiveReviews from "./GiveReviews";

export default function ReviewForm() {
    const [appointments, setAppt] = useState([]);
    const doctorData = JSON.parse(localStorage.getItem('doctorData')) || [];
    const [showModal, setShowModal] = useState(false);
    const [submittedMessage, setMessage] = useState('');

    useEffect(() => {
        const appt_data = [];
        for (let doctor of doctorData) {
            console.log('Doctor:', doctor.name);
            const appointment = JSON.parse(localStorage.getItem(doctor.name));
            console.log('Appointment:', appointment);
            
            // Check if appointment is valid
            if (appointment) {
                appt_data.push(appointment[0]);
            } else {
                console.warn(`No appointment found for doctor: ${doctor}`);
            }
        }
        setAppt(appt_data);
    }, []);

    function setSubmittedMessage(value){
        setMessage(value);
        
    }

    useEffect(() => {
        console.log('Appointments:', appointments);
    }, [appointments]);

    return (
        <table style={{marginTop: '100px', marginLeft: '20px'}}>
            <thead>
                <tr>
                    <th colSpan="5" style={{textAlign:'left'}}>
                        <h1><strong>Reviews</strong></h1>
                    </th>
                </tr>
                <tr>
                    <td>Id</td>
                    <td>Doctor Name</td>
                    <td>Doctor Specialty</td>
                    <td>Provide Feedback</td>
                    <td>Review Given</td>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appt, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td> {/* Serial Number */}
                        <td>{appt.doctorName}</td> {/* Doctor Name */}
                        <td>{appt.doctorSpeciality}</td> {/* Doctor Specialty */}
                        <td>

                        <Popup
          style={{ backgroundColor: '#FFFFFF', width: '50%', height: '50%' }}
          trigger={
            <input className="button" type="button" value="Provide feedback" />
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '80vh', overflow: 'scroll' }}>
              <div>
                <GiveReviews submittedMessage={submittedMessage} setSubmittedMessage={setSubmittedMessage} doctorName={appt.doctorName}/>
              </div>

            
              <center><br/>
               <a className="book-appoinment-btn" lassName="close" onClick={close}>
                    CLOSE WINDOW
                </a></center>
            </div>
          )}
        </Popup> </td>
                        <td>{submittedMessage.doctorName === appt.doctorName && submittedMessage.review}</td> {/* Review Given */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
