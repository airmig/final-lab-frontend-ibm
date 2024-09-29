import { useEffect, useState } from "react";
import "./ReportsLayout.css";
import Popup from "reactjs-popup";

export default function ReportsLayout() {
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
                        <h1><strong>Reports</strong></h1>
                    </th>
                </tr>
                <tr>
                    <td>Id</td>
                    <td>Doctor Name</td>
                    <td>Doctor Specialty</td>
                    <td>View Report</td>
                    <td>Download Report</td>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appt, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td> {/* Serial Number */}
                        <td>{appt.doctorName}</td> {/* Doctor Name */}
                        <td>{appt.doctorSpeciality}</td> {/* Doctor Specialty */}
                        <td>

            <input className="button" type="button" value="View Report" />
       </td>
                        <td><input className="button" type="button" value="Download Report" /></td> {/* Review Given */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
