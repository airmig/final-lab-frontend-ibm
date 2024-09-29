// Import necessary modules from React library
import React, { useEffect } from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

import Landing_Page from './Components/Landing_Page/LandingPage';
import SignUp from './Components/Sign_Up/SIgn_Up';
import Login from './Components/Login/Login'
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation'
import Notification from './Components/Notification/Notification';
import BookingConsultation from './Components/BookingConsultation';
import ReviewForm from './Components/RevieForm/ReviewForm';
import ProfileForm from './Components/ProfileCard/ProfileForm';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';
// Function component for the main App
function App() {

  // Render the main App component
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar/>

          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define individual Route components for different pages */}
            <Route path="/" element={<Landing_Page/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/appointments" element={<BookingConsultation />} />
            <Route path="/reviews" element={<ReviewForm/>} />
            <Route path="/profile" element={<ProfileForm/>} />
            <Route path="/reports" element={<ReportsLayout/>}/>
          </Routes>
          <Notification/>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;